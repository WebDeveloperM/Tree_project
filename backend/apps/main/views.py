from main.serializers import PlantSerializer, OrderSerializer, OrderProcessSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
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
        }, 200)


class OrderListView(APIView):
    def get(self, request):
        orders = Order.objects.filter(status=Order.CREATED)
        serialiser = OrderSerializer(orders, many=True)
        return Response(serialiser.data, 200)


class OrderProcessApiView(APIView):
    def post(self, request):
        id = request.data.get("id", None)
        order = Order.objects.filter(id=id).first()
        print(order, '8' * 10)
        if not order:
            return Response({"error": "Order not found"}, 404)
        order_list = Order.objects.update(farmer=request.user, status=Order.IN_PROCESS)
        serializer = OrderProcessSerializer(order_list)
        return Response(serializer.data, 201)
