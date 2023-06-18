from django.db import models
from django.contrib.auth.models import AbstractUser
from users.queryset.user import UserManager


class User(AbstractUser):
    INVESTOR = 'investor'
    FARMER = 'farmer'

    TYPES = (
        (INVESTOR, 'Investor'),
        (FARMER, 'Farmer')
    )

    username = models.CharField(max_length=200, unique=True)
    phone = models.CharField(max_length=15, unique=True)
    code = models.CharField(null=True, blank=True, unique=True)
    type = models.CharField(max_length=50, choices=TYPES)
    region = models.CharField(max_length=250)
    objects = UserManager()


    class Meta(AbstractUser.Meta):
        db_table = 'users_user'
        app_label = 'users'
