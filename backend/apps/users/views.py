from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import AllowAny
from users.models import User, SmsCode
from rest_framework.exceptions import ParseError
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from .serializers import UserSerializer
from rest_framework import status

from django.conf import settings
# from users.utils.send_code import send_code
import datetime


class ApiInfo(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        urlRoots = [{
            "Get_info_url": "/",
            "Register page": "register",
            "Login page": "login",
            "User Info": 'user-info',
            'Logout': 'logout'
        }]
        return Response(urlRoots)


class RegisterView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        phone = request.data.get('phone')
        type = request.data.get('type')
        region = request.data.get('region')

        if settings.SMS_CODE_ACTIVE:
            # res = send_code(request.data['phone'])
            res = {"msg": "ok"}
            return Response(res, 201)

            # WITHOUT ESKIZ API DEFAULT CODE is 0000, but worked when already have fixtures

        # SmsCode.objects.create(dispatch_id="12345678", code="1111", user=1)
        user = User.objects.filter(phone=phone).first()
        if user:
            return Response({"message": "Thes user alredy registered"})
        User.objects.update_or_create(phone=phone, email=phone, username=phone, type=type, region=region)
        fake_data = {
            "message_status": {
                "status": "success",
                "message": "Waiting for SMS provider"
            },
            "dispatch_id": 12345678,
            "phone": phone
        }
        return Response(fake_data, 201)


class LoginView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        phone = request.data.get('phone')
        dispatch_id = request.data.get('dispatch_id')
        code = request.data.get('code')
        sms_code = SmsCode.objects.filter(dispatch_id=dispatch_id).first()

        if not sms_code or sms_code.code != code:
            raise ParseError('Verification code incorrect. Try again.', 400)

        user, created = User.objects.update_or_create(phone=phone, email=phone, username=phone)
        user.last_login = datetime.datetime.now()
        user.save()

        token, _ = Token.objects.get_or_create(user=user)

        return Response({
            'user': UserSerializer(user).data,
            'token': token.key,
        })


class UserView(APIView):
    def post(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


class LogoutView(APIView):
    def get(self, request):
        request.user.auth_token.delete()
        return Response({"massage": "Logout successfully !!!!"}, status=status.HTTP_200_OK)
