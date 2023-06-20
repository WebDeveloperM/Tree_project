from django.contrib import admin

from .models import *
from main.admin import AuthorMixin
from django.conf import settings


# Register your models here.
@admin.register(Card)
class CardAdmin(AuthorMixin, admin.ModelAdmin):
    list_display = ('user', 'number', 'due_date')


@admin.register(Payment)
class PaymentAdmin(AuthorMixin, admin.ModelAdmin):
    list_display = ('user', 'count', 'amount')

    def has_change_permission(self, request, obj=None):
        if settings.SMS_CODE_ACTIVE:
            return False
        return True

    def has_delete_permission(self, request, obj=None):
        if settings.SMS_CODE_ACTIVE:
            return False
        return True
