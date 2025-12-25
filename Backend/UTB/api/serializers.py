# serializers.py
from rest_framework import serializers
from .models import Artwork, Listing

class ArtworkSerializer(serializers.ModelSerializer):
    file_url = serializers.SerializerMethodField()
    cover_url = serializers.SerializerMethodField() # Add this
    owner_name = serializers.ReadOnlyField(source='owner.username')
    artist_name = serializers.ReadOnlyField(source='artist.username')

    class Meta:
        model = Artwork
        fields = [
            'token_id', 'title', 'description', 
            'file_url', 'cover_url', 'owner_name', 'artist_name'
        ]

    def get_file_url(self, obj):
        if obj.file:
            return self.context['request'].build_absolute_uri(obj.file.url)
        return None

    def get_cover_url(self, obj):
        if obj.cover_image:
            return self.context['request'].build_absolute_uri(obj.cover_image.url)
        return None
        return None

class ListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = "__all__"