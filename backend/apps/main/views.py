from django.shortcuts import render
from main.serializers import PlantSerializer,OrderSerializer
from rest_framework import generics
from main.models import *
# from rest_framework.response import Response
# from rest_framework.views import APIView
# from main.models import Plant


# Create your views here.

class PlantCreateListView(generics.ListCreateAPIView):
    queryset = Plant.objects.all()
    serializer_class = PlantSerializer



class OrderCreateListView(generics.ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer




