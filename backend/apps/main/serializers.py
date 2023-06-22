from rest_framework import serializers
from main.models import Plant, Order


class PlantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plant
        fields = ('id', 'order', 'image', "payment_id")


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('id', 'status', 'location')

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret["count"] = instance.count
        ret["amount"] = instance.count * 5
        return ret


class OrderProcessSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('id', 'status', 'location')
