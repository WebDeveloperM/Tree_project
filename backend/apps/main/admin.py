import secrets

from django.contrib import admin

from .forms.orders import OrderForm
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
    list_display = ('type', 'farmer', 'investor')
    list_filter = ('status', 'payment')


@admin.register(Order)
class OrderAdmin(AuthorMixin, admin.ModelAdmin):
    form = OrderForm
    list_display = ('status', 'count', 'farmer')

    fields = ('count', 'location')

    list_filter = ('status', 'count', 'farmer')
    fields = ('count', 'location')

    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)

        if change:
            return

        plants = list(Plant.objects.filter(order=None)[:obj.count])
        for plant in plants:
            plant.order = obj
            plant.status = Plant.IN_ORDER

        Plant.objects.bulk_update(plants, ['order', 'status'])
