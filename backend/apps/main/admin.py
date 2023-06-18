import secrets

from django.contrib import admin

from .models import Plant, Order


class AuthorMixin:
    def save_model(self, request, obj, form, change):
        if change:
            obj.updated_by = request.user
        else:
            obj.created_by = request.user

        super().save_model(request, obj, form, change)


@admin.register(Plant)
class PlantAdmin(AuthorMixin, admin.ModelAdmin):
    ...


@admin.register(Order)
class OrderAdmin(AuthorMixin, admin.ModelAdmin):
    list_display = ('status', 'count', 'farmer')
    fields = ('latitude', 'longitude', 'count')