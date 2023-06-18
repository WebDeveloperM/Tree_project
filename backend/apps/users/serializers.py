from rest_framework import serializers
from .models import User
from phonenumber_field.phonenumber import PhoneNumber


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'phone', 'code')

    def create(self, validated_data):
        phone = validated_data.pop('phone', None)
        code = validated_data.pop('code', None)
        if len(phone) == 12:
            instance = self.Meta.model(phone=phone, code=code, **validated_data)
            instance.save()
            print(instance)
            return instance
        raise ValueError("The phone number must be at least 12 characters long")

