from django.shortcuts import render
from rest_framework import generics
from .models import Card,Payment
from .serializers import CardSerializer,PaymentSerializer

   
class CardCreateListView(generics.ListCreateAPIView):
       queryset = Card.objects.all()
       serializer_class = CardSerializer


class PaymentCreateListView(generics.ListCreateAPIView):
       queryset = Payment.objects.all()
       serializer_class = PaymentSerializer


