from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Q
from django.contrib.auth.hashers import make_password
from rest_framework import status
from django.contrib.auth import authenticate

from .models import Artwork, Listing,User
from .blockchain import mint_art_artist, primary_sale, list_for_resale, buy_resale,w3,ensure_marketplace_approval
from .serializers import ArtworkSerializer,ListingSerializer

# --- FUNCTION BASED VIEW (Decorators) ---

@csrf_exempt
@api_view(['POST'])
@authentication_classes([]) 
@permission_classes([AllowAny]) 
def mint_art_api(request):
    try:
        file_obj = request.FILES.get('file') 
        cover_obj = request.FILES.get('cover_image')
        data = request.data
        private_key = data.get("private_key") # Extract key
        
        if not file_obj:
            return Response({"error": "No asset file uploaded"}, status=400)

        # --- ADDED: Ensure Approval on Mint ---
        ensure_marketplace_approval(private_key)

        token_id = mint_art_artist(
            private_key=private_key,
            royalty=int(data.get("royalty")),
            primary_price=int(data.get("primary_price")),
            title=data.get("title"),
            description=data.get("description"),
            file_obj=file_obj,
            cover_obj=cover_obj
        )

        artwork = Artwork.objects.get(token_id=token_id)
        return Response({
            "token_id": token_id, 
            "status": "Minted and Approved Successfully"
        }, status=201)
        
    except Exception as e:
        return Response({"error": str(e)}, status=400)

# --- CLASS BASED VIEWS (Attributes) ---

class PrimaryPurchase(APIView):
    authentication_classes = [] 
    permission_classes = [AllowAny] 

    def post(self, request):
        try:
            data = request.data
            token_id = data.get("token_id")
            
            # 1. Fetch the Artwork to find the Artist
            artwork = Artwork.objects.get(token_id=token_id)
            artist_user = artwork.artist # This is the person who must approve
            
            # NOTE: For existing tokens 1 & 2 to work, the Artist must have 
            # called setApprovalForAll. In your production app, this happens 
            # automatically in the Minting view now.
            
            # 2. Execute on Blockchain
            receipt = primary_sale(
                token_id=token_id,
                private_key=data.get("private_key"), # Buyer's Key
                distributor_address=data.get("distributor_address"),
                price=data.get("price")
            )
            
            if receipt['status'] == 1:
                # ... rest of your database update logic ...
                buyer_address = data.get("distributor_address")
                buyer_user, _ = User.objects.get_or_create(
                    wallet_address__iexact=buyer_address,
                    defaults={'username': f"Collector_{buyer_address[:6]}", 'role': 'user'}
                )

                artwork.owner = buyer_user
                artwork.save()

                # Close any active listing for this token
                Listing.objects.filter(artwork=artwork, active=True).update(active=False)

                return Response({
                    "status": "Primary purchase complete", 
                    "new_owner": buyer_user.username,
                    "tx_hash": receipt['transactionHash'].hex()
                })
            else:
                return Response({"error": "Blockchain transaction failed. Likely missing Artist Approval."}, status=400)

        except Exception as e:
            return Response({"error": str(e)}, status=400)

class ListForResale(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            data = request.data
            private_key = data.get("private_key")

            # --- ADDED: Ensure Approval before Listing ---
            ensure_marketplace_approval(private_key)

            receipt = list_for_resale(
                token_id=data.get("token_id"),
                private_key=private_key,
                price=data.get("price")
            )

            artwork = Artwork.objects.get(token_id=data.get("token_id"))
            seller = artwork.owner 

            Listing.objects.update_or_create(
                artwork=artwork,
                defaults={
                    "seller": seller,
                    "price": float(data.get("price")) / 10**18, 
                    "active": True
                }
            )
            return Response({"status": "Resale listed & Approved", "tx_hash": receipt['transactionHash'].hex()})
        except Exception as e:
            return Response({"error": str(e)}, status=400)

class BuyResale(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            data = request.data
            # 1. Blockchain Transaction
            receipt = buy_resale(
                token_id=data.get("token_id"),
                private_key=data.get("private_key"),
                price=data.get("price")
            )

            # 2. Update Database (Only if transaction succeeded)
            if receipt['status'] == 1:
                # Find the listing
                listing = Listing.objects.get(artwork__token_id=data.get("token_id"), active=True)
                
                # Identify the new buyer from the private key used
                buyer_address = w3.eth.account.from_key(data.get("private_key")).address
                new_owner, _ = User.objects.get_or_create(
                    wallet_address__iexact=buyer_address,
                    defaults={'username': f"Buyer_{buyer_address[:6]}", 'role': 'user'}
                )

                # Update the Artwork owner
                artwork = listing.artwork
                artwork.owner = new_owner
                artwork.save()

                # Close the listing
                listing.active = False
                listing.save()

                return Response({
                    "status": "Resale purchased successfully", 
                    "new_owner": new_owner.username,
                    "tx_hash": receipt['transactionHash'].hex()
                })
            else:
                return Response({"error": "On-chain transaction failed"}, status=400)

        except Exception as e:
            return Response({"error": str(e)}, status=400)
        
class ArtworkListView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def get(self, request):
        # Fetch all artworks from newest to oldest
        artworks = Artwork.objects.all().order_by('-id')
        
        # Pass the 'request' in context so get_file_url can build the absolute URI
        serializer = ArtworkSerializer(artworks, many=True, context={'request': request})
        
        return Response(serializer.data)
    
class WalletActivityView(APIView):
    def get(self, request, wallet_address):
        # Filter artworks where wallet is artist OR owner
        artworks = Artwork.objects.filter(
            Q(artist__wallet_address__iexact=wallet_address) | 
            Q(owner__wallet_address__iexact=wallet_address)
        ).distinct().order_by('-id')

        serializer = ArtworkSerializer(artworks, many=True, context={'request': request})
        
        return Response({
            "wallet": wallet_address,
            "artworks": serializer.data
        })
    

class SignupView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        data = request.data
        
        # --- DEBUG PRINTS START ---
        print("\n--- DEBUG: Signup Attempt ---")
        print(f"Full Data Received: {data}")
        print(f"Username: {data.get('username')}")
        print(f"Role: {data.get('role')}")
        # Check if the key is 'wallet' or 'wallet_address' from React
        print(f"Wallet from 'wallet_address' key: {data.get('wallet_address')}")
        print(f"Wallet from 'wallet' key: {data.get('wallet')}")
        # --- DEBUG PRINTS END ---

        try:
            # Check if user already exists
            if User.objects.filter(username=data.get('username')).exists():
                print("DEBUG: Signup failed - Username exists")
                return Response({"error": "Username already taken"}, status=status.HTTP_400_BAD_REQUEST)
            
            if User.objects.filter(email=data.get('email')).exists():
                print("DEBUG: Signup failed - Email exists")
                return Response({"error": "Email already registered"}, status=status.HTTP_400_BAD_REQUEST)

            # Create the user
            # We use .get('wallet_address') because that's what your React state uses
            user = User.objects.create(
                username=data.get('username'),
                email=data.get('email'),
                password=make_password(data.get('password')),
                role=data.get('role', 'user'),
                wallet_address=data.get('wallet_address') or data.get('wallet'),
            )
            
            print(f"DEBUG: User created successfully! ID: {user.id}, Wallet: {user.wallet_address}")
            return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
        
        except Exception as e:
            print(f"DEBUG: Exception occurred: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        


class LoginView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        user = authenticate(username=username, password=password)
        
        # Check if user exists and is specifically an instance of your custom User
        if user is not None and isinstance(user, User):
            return Response({
                "message": "Login successful",
                "username": user.username,
                "role": user.role,           # Now recognized
                "wallet": user.wallet_address, # Now recognized
                "email": user.email
            }, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        

class ActiveListingsView(APIView):
    def get(self, request):
        # Get the role from query parameters (e.g., ?role=user)
        user_role = request.query_params.get('role')
        
        listings = Listing.objects.filter(active=True).select_related('artwork', 'seller')

        if user_role == "distributor":
            # Distributor sees only what Artists have listed
            listings = listings.filter(seller__role="artist")
        
        elif user_role == "user":
            # Normal user sees only what Distributors have listed
            listings = listings.filter(seller__role="distributor")

        serializer = ListingSerializer(listings, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)