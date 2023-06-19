from django.contrib import admin

from .models import *
from main.admin import AuthorMixin


# Register your models here.
@admin.register(Card)
class CardAdmin(AuthorMixin, admin.ModelAdmin):
    list_display = ('user', 'number', 'due_date')


@admin.register(Payment)
class PaymentAdmin(AuthorMixin, admin.ModelAdmin):
    list_display = ('user', 'count', 'amount')

    def has_change_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False
