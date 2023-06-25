from django.contrib import admin

from .models import *
from main.admin import AuthorMixin
from django.conf import settings


# Register your models here.
from main.models import Plant


@admin.register(Card)
class CardAdmin(AuthorMixin, admin.ModelAdmin):
    list_display = ('user', 'number', 'due_date')
    fields = ('number', 'due_date', 'user')


@admin.register(Payment)
class PaymentAdmin(AuthorMixin, admin.ModelAdmin):
    list_display = ('user', 'count', 'amount')
    fields = ('user', 'card', 'count', 'amount')

    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)

        if change:
            return

        Plant.objects.bulk_create([
            Plant(type='oak', investor=obj.user, payment=obj)
            for _ in range(obj.count)
        ])

    def has_change_permission(self, request, obj=None):
        return not settings.SMS_CODE_ACTIVE

    def has_delete_permission(self, request, obj=None):
        return not settings.SMS_CODE_ACTIVE
