from django.urls import path
from .views import mint_art_api, PrimaryPurchase, ListForResale, BuyResale, ArtworkListView, WalletActivityView,SignupView,LoginView,ActiveListingsView

urlpatterns = [
    path("mint/", mint_art_api),
    path("primary-buy/", PrimaryPurchase.as_view()),
    path("buy/", BuyResale.as_view()),
    path("list/", ListForResale.as_view()),
    path('artworks/', ArtworkListView.as_view(), name='artwork-list'),
    path('wallet-activity/<str:wallet_address>/', WalletActivityView.as_view(), name='wallet-activity'),
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('active-listings/', ActiveListingsView.as_view(), name='active-listings'),

]
