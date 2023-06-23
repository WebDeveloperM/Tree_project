from main.serializers import PlantSerializer, OrderSerializer, OrderProcessSerializer, OrderChangeSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from main.models import Plant, Order
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.generics import get_object_or_404


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
        }, 200)
    
class OrderListView(APIView):
    def get(self, request):
        orders = Order.objects.filter(status=Order.CREATED)
        serialiser = OrderSerializer(orders, many=True)
        return Response(serialiser.data, 200)

class OrderStatusView(APIView):
    def patch(self, request):
        try:
            order = Order.objects.get(id=request.data.get("id"))
            print(order)
            order.status = Order.IN_PROCESS
            order.farmer = request.user
            order.save()
            return Response({"msg": "OK"}, 200)
        except Order.DoesNotExist:
            return Response({'status': 'Order not found'}, 404)
