from finance.models import Card, Payment
from main.models import Plant
from rest_framework.views import APIView
from rest_framework.response import Response
from finance.serializers import (
    CardSerializer,
    PaymentSerializer,
    CardListSerializer,
    InvestorOrdersSerializer
)
from django.db.models import Q


class CardAPIView(APIView):
    def post(self, request):
        number = request.data.get("number")
        due_date = request.data.get("due_date")
        card = Card.objects.filter(Q(number=number) & Q(due_date=due_date)).first()

        if not card:
            card = Card.objects.create(number=number, due_date=due_date, user=request.user)
            serializer = CardSerializer(card)
            return Response(serializer.data, 201)
        serializer = CardSerializer(card)
        return Response(serializer.data, 200)


class CardListView(APIView):
    def get(self, request):
        card = Card.objects.filter(user=request.user)
        serialiser = CardListSerializer(card, many=True)
        return Response(serialiser.data, 200)


class PaymentCreateView(APIView):

    def post(self, request):
        PLANT_PRICE = 5  # plant price = 5 $
        count = request.data.get('count', None)
        card = Card.objects.filter(user=request.user).first()
        if not card:
            return Response({"message": "Card not found"}, 404)
        payment = Payment.objects.create(user=request.user, card=card, count=count, amount=PLANT_PRICE * count)
        Plant.objects.bulk_create([
            Plant(type='oak', investor=request.user, payment=payment)
            for _ in range(count)
        ])

        serializer = PaymentSerializer(payment)
        return Response(serializer.data, 201)


class InvestorOrdersApiView(APIView):
    def get(self, request):
        payments = Payment.objects.filter(user=request.user)
        serializer = InvestorOrdersSerializer(payments, many=True)
        return Response(serializer.data, 200)
