# serializers.py
from rest_framework import serializers
from .models import Artwork, Listing

class ArtworkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artwork
        fields = "__all__"

class ListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = "__all__"
