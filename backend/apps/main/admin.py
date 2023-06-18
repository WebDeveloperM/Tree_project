from django.contrib import admin

from .models import Plant, Order

# Register your models here.


@admin.register(Plant)
class PlantAdmin(admin.ModelAdmin):
    ...

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    ...