
import requests
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .models import User

from rest_framework.views import APIView
from .serializers import UserSerializer
import jwt
import datetime


class ApiInfo(APIView):
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
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        print(serializer.data)
        return Response(serializer.data)


class LoginView(APIView):
    def post(self, request):
        phone = request.data['phone']
        code = request.data['code']

        user = User.objects.filter(phone=phone).first()

        if user is None:
            raise AuthenticationFailed("User not found")

        payload = {
            "id": user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }
        token = jwt.encode(payload, 'secret', algorithm='HS256')

        response = Response()
        response.set_cookie(key="token", value=token, httponly=True)
        response.data = {
            "id": user.id,
            "phone": user.phone,
            'token': token
        }
        return response


class UserView(APIView):
    def post(self, request):
        token = request.COOKIES.get("token")
        # token = request.data["token"]
        print(token, '*' * 8)
        if not token:
            raise AuthenticationFailed("You don't authenticated!")
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("You don't authenticated!")

        user = User.objects.filter(id=payload['id']).first()

        serializer = UserSerializer(user)

        return Response(serializer.data)


class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('token')
        response.data = {
            "message": "Logout successfull!"
        }

        return response
