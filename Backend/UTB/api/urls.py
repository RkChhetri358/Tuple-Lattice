from django.urls import path
from .views import mint_art_api, PrimaryPurchase, ListForResale, BuyResale, ArtworkListView, WalletActivityView

urlpatterns = [
    path("mint/", mint_art_api),
    path("primary-buy/", PrimaryPurchase.as_view()),
    path("list/", ListForResale.as_view()),
    path("buy/", BuyResale.as_view()),
    path('artworks/', ArtworkListView.as_view(), name='artwork-list'),
    path('activity/<str:wallet_address>/', WalletActivityView.as_view(), name='wallet-activity'),
]
