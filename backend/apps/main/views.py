from django.shortcuts import render
from main.serializers import PlantSerializer, OrderSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework import status
from main.models import Plant, Order


# class PlantCreateListView(generics.ListCreateAPIView):
#     queryset = Plant.objects.all()
#     serializer_class = PlantSerializer
#
# class PlantCreateListView(APIView):
#     def get(self, request):
#         base = Plant.objects.filter(investor=request.user)
#         done = base.filter(status=Plant.DONE)
#         in_order = base.filter(status=Plant.IN_ORDER)
#         created = base.filter(status=Plant.CREATED)

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


class OrderListView(APIView):
    def get(self, request):
        orders = Order.objects.filter(status=Order.CREATED)
        serialiser = OrderSerializer(orders, many=True)
        return Response(serialiser.data, status=status.HTTP_200_OK)
