from django.shortcuts import render
from rest_framework import generics
from finance.models import Card, Payment
from main.models import Plant
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import CardSerializer, PaymentSerializer


class CardCreateListView(APIView):

    def post(self, request):
        number = request.data.get("number")
        due_date = request.data.get("due_date")
        card = Card.objects.filter(user=request.user).first()
        if not card:
            card = Card.objects.create(number=number, due_date=due_date, user=request.user)
            serializer = CardSerializer(card)
            return Response(serializer.data)
        serializer = CardSerializer(card)
        return Response(serializer.data)


class PaymentCreateListView(APIView):

    def post(self, request):
        PLANT_PRICE = 5  # plant price = 5 $
        count = request.data.get('count', None)
        card = Card.objects.filter(user=request.user).first()
        if not card:
            return Response({"message": "Card not found"})
        payment = Payment.objects.create(user=request.user, card=card, count=count, amount=PLANT_PRICE * count)
        Plant.objects.bulk_create([
            Plant(type='oak', investor=request.user, payment=payment)
            for _ in range(count)
        ])

        serializer = PaymentSerializer(payment)
        return Response(serializer.data)
