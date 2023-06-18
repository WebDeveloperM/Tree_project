from rest_framework import serializers
from .models import User
import random


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'phone', "code")

    def create(self, validated_data):
        phone = validated_data.pop('phone', None)
        code = str(random.randint(0, 2814749767106558635674786786384))[:4]

        if len(phone) == 12:
            instance = self.Meta.model(phone=phone, code=code, **validated_data)
            instance.save()
            return instance
        raise ValueError("The phone number must be at least 12 characters long")

