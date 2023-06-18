from rest_framework import serializers
from users.models import User, Token
from users.models import SmsCode
from rest_framework.exceptions import ParseError
from datetime import datetime
from rest_framework.response import Response


# import random


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

   #
   # phone = validated_data.data.get('phone')
   #      dispatch_id = validated_data.data.get('dispatch_id')
   #      code = validated_data.data.get('verification_code')
   #      sms_code = SmsCode.objects.filter(dispatch_id=dispatch_id).first()
   #
   #      if not sms_code or sms_code.code != code:
   #          raise ParseError('Verification code incorrect. Try again.', 400)
   #
   #      user, created = User.objects.update_or_create(phone=phone, email=phone, username=phone)
   #      user.last_login = datetime.now()
   #      user.save()
   #
   #      if created:
   #          token = Token.objects.create(user=user)
   #      else:
   #          t = Token.objects.filter(user=user).first()
   #          t.key = tokens.generate()
   #          t.expires_at = expires_default()
   #          t.save()
   #          token = t
   #      SmsCode.objects.exclude(id=1).delete()
   #      user_serializer = UserSerializer(instance=user).data
   #      return Response({"user": user_serializer, "token": token.key}, 201)