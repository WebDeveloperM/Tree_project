from rest_framework import serializers
from users.models import User, Token
from users.models import SmsCode
from rest_framework.exceptions import ParseError
from datetime import datetime
from rest_framework.response import Response


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'phone')

    # def create(self, validated_data):
    #     phone = validated_data.get('phone', None)
    #
    #     print(phone in int, "6"*88)
    #     if len(phone) == 12:
    #
    #         instance = self.Meta.model(phone=phone, code=code, **validated_data)
    #         instance.save()
    #         return instance
    #     raise ValueError("The phone number must be at least 12 characters long")
