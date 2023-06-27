from rest_framework import serializers

from users.serializers import UserSerializer
from finance.models import Card, Payment


class CardListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ('id', 'number', 'due_date')


class CardSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        return ret

    class Meta:
        model = Card
        fields = ('id', 'number', 'due_date')

class PaymentSerializer(serializers.ModelSerializer):

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret["card"] = CardSerializer(instance.card).data
        return ret

    class Meta:
        model = Payment
        fields = ('id', 'card', 'count', 'amount')

class InvestorOrdersSerializer(serializers.ModelSerializer):

    class Meta:
        model = Payment
        fields = ('id', 'count', 'amount')
