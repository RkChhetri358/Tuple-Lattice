from django.contrib import admin
from .models import User, Artwork, Listing

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'role', 'wallet_address')

@admin.register(Artwork)
class ArtworkAdmin(admin.ModelAdmin):
    list_display = ('token_id', 'title', 'artist', 'royalty_percentage', 'metadata_uri')

@admin.register(Listing)
class ListingAdmin(admin.ModelAdmin):
    list_display = ('artwork', 'seller', 'price', 'active')
