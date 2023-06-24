from django.db.models import Q
from main.serializers import PlantSerializer, OrderSerializer, OrderDoneSerializer
from rest_framework.views import APIView
from main.models import Plant, Order
from rest_framework.response import Response


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
        order = Order.objects.get(id=request.data.get("id"))
        print(order)
        if order.status == Order.CREATED:
            order.status = Order.IN_PROCESS
            order.farmer = request.user
            order.save()
            return Response({"msg": "OK"}, 200)
        return Response({'status': 'Order not found'}, 404)


class OrderDoneApiView(APIView):
    def post(self, request):
        order_id = request.data.get("order_id", None)
        instance = Order.objects.filter(Q(id=order_id) & Q(status=Order.IN_PROCESS)).first()
        serializer = OrderDoneSerializer(instance, data=request.data, context={'user': request.user})
        serializer.is_valid(raise_exception=True)
        serializer.save(data=request.data)
        return Response(serializer.data, 201)


class AllPlant(APIView):
    def get(self, request):
        id = request.data.get("id")
        plants = Plant.objects.filter(Q(order__id=id))
        return  Response(PlantSerializer(plants, many=True).data)