from django.db import models
from django.contrib.auth.models import AbstractUser

from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = (
        ('artist', 'Artist'),
        ('distributor', 'Distributor'),
        ('user', 'User'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    wallet_address = models.CharField(
            max_length=42, 
            unique=True, 
            null=True,   # Add this
            blank=True   # Add this
        )

    groups = models.ManyToManyField(
        Group,
        related_name="custom_user_set",  # unique related_name to avoid clash
        blank=True,
        help_text="The groups this user belongs to.",
        verbose_name="groups"
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name="custom_user_permissions_set",  # unique related_name
        blank=True,
        help_text="Specific permissions for this user.",
        verbose_name="user permissions"
    )



class Artwork(models.Model):
    

class Listing(models.Model):
    artwork = models.ForeignKey(Artwork, on_delete=models.CASCADE)
    seller = models.ForeignKey(User, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=18, decimal_places=8)
    active = models.BooleanField(default=True)



class AddAsset(models.Model):
    asset_name = models.CharField(max_length=255)
    asset_type = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    creation_date = models.DateTimeField(auto_now_add=True)
    asset_price = models.DecimalField(max_digits=18, decimal_places=8)
    asset_file = models.CharField(max_length=255)
    description = models.TextField()
    royalty_percentage = models.DecimalField(max_digits=5, decimal_places=2)
    asset_photo = models.CharField(max_length=255)
