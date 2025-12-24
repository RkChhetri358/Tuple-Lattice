# serializers.py
from rest_framework import serializers
from .models import Artwork, Listing

class ArtworkSerializer(serializers.ModelSerializer):
    file_url = serializers.SerializerMethodField()
    # Add these two lines to get names instead of IDs
    owner_name = serializers.ReadOnlyField(source='owner.username')
    artist_name = serializers.ReadOnlyField(source='artist.username')

    class Meta:
        model = Artwork
        # Add 'owner_name' and 'artist_name' to your fields list
        fields = ['token_id', 'title', 'description', 'file_url', 'owner_name', 'artist_name']

    def get_file_url(self, obj):
        if obj.file:
            # Note: Ensure the view passes 'request' in context
            return self.context['request'].build_absolute_uri(obj.file.url)
        return None

class ListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = "__all__"