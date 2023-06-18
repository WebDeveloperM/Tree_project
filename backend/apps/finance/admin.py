from django.contrib import admin

from .models import *

# Register your models here.
@admin.register(Card)
class CardAdmin(admin.ModelAdmin):
    ...
@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    ...
