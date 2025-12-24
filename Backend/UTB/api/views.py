from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny
from django.views.decorators.csrf import csrf_exempt

from .models import Artwork, Listing,User
from .blockchain import mint_art_artist, primary_sale, list_for_resale, buy_resale,w3
from .serializers import ArtworkSerializer

# --- FUNCTION BASED VIEW (Decorators) ---

@csrf_exempt
@api_view(['POST'])
@authentication_classes([]) 
@permission_classes([AllowAny]) 
def mint_art_api(request):
    try:
        # 1. Get both files (the asset and the thumbnail)
        file_obj = request.FILES.get('file') 
        cover_obj = request.FILES.get('cover_image') # New line
        data = request.data
        
        if not file_obj:
            return Response({"error": "No asset file uploaded"}, status=400)

        # 2. Blockchain Minting
        # Added cover_obj to the parameters
        token_id = mint_art_artist(
            private_key=data.get("private_key"),
            royalty=int(data.get("royalty")),
            primary_price=int(data.get("primary_price")),
            title=data.get("title"),
            description=data.get("description"),
            file_obj=file_obj,
            cover_obj=cover_obj  # New parameter passed to blockchain.py
        )

        # 3. Fetch and Respond
        artwork = Artwork.objects.get(token_id=token_id)

        return Response({
            "token_id": token_id, 
            "file_url": artwork.file.url,
            "cover_url": artwork.cover_image.url if artwork.cover_image else None, # New
            "status": "Minted and Saved Successfully"
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
            # 1. Execute on Blockchain
            receipt = primary_sale(
                token_id=data.get("token_id"),
                private_key=data.get("private_key"),
                distributor_address=data.get("distributor_address"),
                price=data.get("price")
            )
            
            # 2. Update Database (If blockchain succeeded)
            if receipt['status'] == 1:
                artwork = Artwork.objects.get(token_id=data.get("token_id"))
                
                # Identify the buyer
                buyer_address = data.get("distributor_address")
                buyer_user, _ = User.objects.get_or_create(
                    wallet_address__iexact=buyer_address,
                    defaults={'username': f"Collector_{buyer_address[:6]}", 'role': 'user'}
                )

                # UPDATE THE OWNER
                artwork.owner = buyer_user
                artwork.save()

                # Record the historical sale in Listings (optional but good for history)
                Listing.objects.create(
                    artwork=artwork,
                    seller=artwork.artist,
                    price=float(data.get("price")) / 10**18,
                    active=False # It's not active because it's already sold
                )

                return Response({
                    "status": "Primary purchase complete", 
                    "new_owner": buyer_user.username,
                    "tx_hash": receipt['transactionHash'].hex()
                })
            else:
                return Response({"error": "Blockchain transaction failed"}, status=400)

        except Exception as e:
            return Response({"error": str(e)}, status=400)

class ListForResale(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            data = request.data
            # 1. Blockchain Transaction
            receipt = list_for_resale(
                token_id=data.get("token_id"),
                private_key=data.get("private_key"),
                price=data.get("price")
            )

            # 2. Update DB Listing
            artwork = Artwork.objects.get(token_id=data.get("token_id"))
            Listing.objects.update_or_create(
                artwork=artwork,
                defaults={"price": float(data.get("price")) / 10**18, "active": True}
            )
            return Response({"status": "Resale listed", "tx_hash": receipt['transactionHash'].hex()})
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