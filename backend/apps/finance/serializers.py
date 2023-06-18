from rest_framework import serializers

from main.models import Plant
from .models import Card, Payment


class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ('id', 'number', 'due_date', 'user')


class PaymentSerializer(serializers.ModelSerializer):
    def create(self, data):
        user = self.context['request'].user
        data['user'] = user
        instance = super().create(data)

        Plant.objects.bulk_create([
            Plant(type='oak', investor=user, payment=instance)
            for _ in range(instance.count)
        ])
        return instance

    class Meta:
        model = Payment
        fields = ('id', 'card', 'count', 'amount')
