from rest_framework import serializers
from main.models import Plant, Order

class PlantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plant
        fields = ('id', 'type', 'order', 'user', 'image', "payment_id")



class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('id', 'discount', 'discount_reason')
