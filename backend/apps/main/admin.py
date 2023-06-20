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
    ...

@admin.register(Order)
class OrderAdmin(AuthorMixin, admin.ModelAdmin):
    form = OrderForm
    list_display = ('status', 'count', 'farmer')
    fields = ('latitude', 'longitude', 'count', 'location')

    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)

        if change:
            return

        plants = list(Plant.objects.filter(order=None)[:obj.count])
        for plant in plants:
            plant.order = obj
            plant.status = Plant.IN_ORDER

        Plant.objects.bulk_update(plants, ['order', 'status'])
