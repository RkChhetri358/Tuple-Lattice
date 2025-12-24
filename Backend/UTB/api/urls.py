from django.urls import path
from .views import mint_art_api, PrimaryPurchase, ListForResale, BuyResale

urlpatterns = [
    path("mint/", mint_art_api),
    path("primary-buy/", PrimaryPurchase.as_view()),
    path("list/", ListForResale.as_view()),
    path("buy/", BuyResale.as_view()),
]
