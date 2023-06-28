from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models import CASCADE
from main.models import BaseModel


class User(AbstractUser):
    INVESTOR = 'investor'
    FARMER = 'farmer'

    TYPES = (
        (INVESTOR, 'Investor'),
        (FARMER, 'Farmer')
    )
    REQUIRED_FIELDS = ['phone', 'email', 'region']

    phone = models.CharField(max_length=15, unique=True)
    type = models.CharField(max_length=50, choices=TYPES, default=FARMER)
    region = models.CharField(max_length=250)
    dispatch_id = models.TextField(null=True, blank=True)

    class Meta(AbstractUser.Meta):
        db_table = 'users_user'
        app_label = 'users'

    def __str__(self):
        return f'{self.type}, {self.phone}'

class SmsCode(BaseModel):
    dispatch_id = models.CharField(max_length=8)
    code = models.CharField(max_length=4)
    # user = models.ForeignKey('users.User', on_delete=CASCADE, related_name='sms_codes')

    def __str__(self):
        return self.code

    class Meta:
        db_table = 'main_codes'
