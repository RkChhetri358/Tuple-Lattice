from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny
from django.views.decorators.csrf import csrf_exempt

from .models import Artwork, Listing
from .blockchain import mint_art_artist, primary_sale, list_for_resale, buy_resale

# --- FUNCTION BASED VIEW (Decorators) ---

@csrf_exempt
@api_view(['POST'])
@authentication_classes([]) # Removes 401
@permission_classes([AllowAny]) # Removes 403
def mint_art_api(request):
    try:
        data = request.data
        token_id = mint_art_artist(
            private_key=data.get("private_key"),
            royalty=int(data.get("royalty")),
            primary_price=int(data.get("primary_price")),
            title=data.get("title"),
            description=data.get("description"),
            metadata_uri=data.get("metadata_uri")
        )
        return Response({"token_id": token_id, "status": "Minted Successfully"})
    except Exception as e:
        return Response({"error": str(e)}, status=400)

# --- CLASS BASED VIEWS (Attributes) ---

class PrimaryPurchase(APIView):
    authentication_classes = [] # Fixes 401
    permission_classes = [AllowAny] # Fixes 403

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
            
            # 2. Update Database
            artwork = Artwork.objects.get(token_id=data.get("token_id"))
            Listing.objects.create(
                artwork=artwork,
                seller=artwork.artist,
                price=float(data.get("price")) / 10**18, # Convert Wei to ETH for DB
                active=False
            )
            return Response({"status": "Primary purchase complete", "tx_hash": receipt['transactionHash'].hex()})
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

            # 2. Update DB
            listing = Listing.objects.get(artwork__token_id=data.get("token_id"), active=True)
            listing.active = False
            listing.save()

            return Response({"status": "Resale purchased", "tx_hash": receipt['transactionHash'].hex()})
        except Exception as e:
            return Response({"error": str(e)}, status=400)