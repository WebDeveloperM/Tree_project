from django.shortcuts import render
from main.serializers import *
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework import status
from rest_framework.generics import get_object_or_404
from main.models import Plant, Order


class PlantCreateListView(APIView):
    def get(self, request):
        base = Plant.objects.filter(investor=request.user)
        done = base.filter(status=Plant.DONE)
        in_order = base.filter(status=Plant.IN_ORDER)
        created = base.filter(status=Plant.CREATED)

        return Response({
            "in_order": in_order.count(),
            "created": created.count(),
            "total": base.count(),
            "results": PlantSerializer(done, many=True).data
        })



class OrderListView(generics.ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class OrderStatusView(APIView):
    def patch(self, request):
        order = Order.objects.get(id=request.data.get("id"))
        print(order)
        if order.status == Order.CREATED:
            order.status = Order.IN_PROCESS
            order.farmer = request.user
            order.save()
            return Response({"msg": "OK"}, 200)
        return Response({'status': 'Order not found'}, 404)
    



