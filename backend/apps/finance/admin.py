from django.contrib import admin

from .models import *
from main.admin import AuthorMixin

from main.models import Plant


# Register your models here.
@admin.register(Card)
class CardAdmin(AuthorMixin, admin.ModelAdmin):
    list_display = ('user', 'number', 'due_date')
    fields = ('number', 'due_date', 'user')


@admin.register(Payment)
class PaymentAdmin(AuthorMixin, admin.ModelAdmin):
    list_display = ('user', 'count', 'amount')
    fields = ('user', 'card', 'count', 'amount')

    def has_change_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

    # def save_model(self, request, obj, form, change):
    #     obj.user = request.user
    #     instance = super().save_model(request, obj, form, change)
    #
    #     obj.objects.bulk_create([
    #         Plant(type='oak', investor=request.user, payment=obj)
    #         for _ in range(obj.count)
    #     ])
    #
    #     return instance

    def save_model(self, request, obj, form, change):
        obj.user = request.user
        instance = super().save_model(request, obj, form, change)

        obj.plants.bulk_create([
            Plant(type='oak', investor=request.user, payment=instance)
            for _ in range(instance.count)
        ])

        return instance
