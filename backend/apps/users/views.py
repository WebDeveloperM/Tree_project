from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from users.models import User, SmsCode
from rest_framework.exceptions import ParseError
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from .serializers import UserSerializer

from django.conf import settings
from users.utils.send_code import send_code
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
        return Response(urlRoots, 200)


class RegisterView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        phone = request.data.get('phone')
        type = request.data.get('type')
        region = request.data.get('region')
        user = User.objects.filter(phone=phone).first()
        if user:
            res = send_code(request.data['phone'])
            user.dispatch_id = res['dispatch_id']
            user.save()
            return Response(UserSerializer(user).data, 201)
        res = send_code(request.data['phone'])
        user = User.objects.create(phone=phone, email=phone, username=phone, type=type, region=region,
                                             dispatch_id=res['dispatch_id'])
        return Response(UserSerializer(user).data, 201)


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
        }, 201)


class UserView(APIView):
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data, 200)


class LogoutView(APIView):
    def get(self, request):
        request.user.delete()
        return Response({"massage": "Logout successfully !!!!"}, 200)
