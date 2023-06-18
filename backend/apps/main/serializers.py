from rest_framework import serializers
from main.models import Plant, Order


class PlantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plant
        fields = ('id', 'type', 'order', 'user', 'image', "payment_id")


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('farmer', 'latitude', 'longitude', 'status')
    # def create(self, validated_data):
    #     plants_data = validated_data.pop('plants')
    #     order = Order.objects.create(**validated_data)
    #     for plant_data in plants_data:
    #         Plant.objects.create(order=order, **plant_data)
    #     return order.count() if order.objects else None
    # def get_count(self, obj, data):
    #     user = self.context['request'].user
    #     data['user'] = user
    #
    #     Plant.objects.bulk_create(
    #         Plant(type='oak', investor=user, count=)
    #     )
    #     return obj.plant.count() if obj.plant else None

    # def get_plant(self, obj):
    #     return obj.plant
    # if obj.plant:

    # Plant.objects.bu
