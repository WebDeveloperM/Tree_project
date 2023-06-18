from django.contrib import admin

from .models import *
from main.admin import AuthorMixin


# Register your models here.
@admin.register(Card)
class CardAdmin(AuthorMixin, admin.ModelAdmin):
    ...


@admin.register(Payment)
class PaymentAdmin(AuthorMixin, admin.ModelAdmin):
    ...
