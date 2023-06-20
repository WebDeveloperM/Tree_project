from rest_framework import serializers
from main.models import Plant, Order
from users.serializers import UserSerializer
from users.models import User


class PlantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plant
        fields = ('id', 'order', 'image', "payment_id")


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('status', 'location')

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret["count"] = instance.count
        ret["amount"] = instance.count * 5
        return ret
