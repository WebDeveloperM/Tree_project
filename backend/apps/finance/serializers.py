from rest_framework import serializers

from users.serializers import UserSerializer
from finance.models import Card, Payment


class CardSerializer(serializers.ModelSerializer):
    # def create(self, request):
    #     user = request.data['user']
    #     print(user)
    #     return {"msg": "created"}

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret["user"] = UserSerializer(instance.user).data
        return ret

    class Meta:
        model = Card
        fields = ('id', 'number', 'due_date', 'user')


class PaymentSerializer(serializers.ModelSerializer):
    # def create(self, data):
    #     user = self.context['request'].user
    #     data['user'] = user
    #     instance = super().create(data)
    #
    #     Plant.objects.bulk_create([
    #         Plant(type='oak', investor=user, payment=instance)
    #         for _ in range(instance.count)
    #     ])
    #
    #     return instance
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret["card"] = CardSerializer(instance.card).data
        return ret

    class Meta:
        model = Payment
        fields = ('id', 'card', 'count', 'amount')
