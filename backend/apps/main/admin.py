from pprint import pprint

import requests
from django.conf import settings
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
    list_display = ('type', 'farmer', 'status', 'investor', 'image')
    list_filter = ('status', 'payment')
    fields = ('type', 'order', 'investor', 'farmer', 'image', 'payment', 'status')


@admin.register(Order)
class OrderAdmin(AuthorMixin, admin.ModelAdmin):
    form = OrderForm
    list_display = ('status', 'count', 'farmer')
    fields = ('count', 'location', 'address')


    def save_model(self, request, obj, form, change):
        url = f"https://maps.googleapis.com/maps/api/geocode/json?latlng={obj.location}&key={settings.MAPS_API_KEY}"
        response = requests.get(url).json()
        print(response)
        obj.address = response["results"][0]["formatted_address"]
        super().save_model(request, obj, form, change)

        if change:
            return

        plants = list(Plant.objects.filter(order=None)[:obj.count])
        for plant in plants:
            plant.order = obj
            plant.status = Plant.IN_ORDER

        Plant.objects.bulk_update(plants, ['order', 'status'])
