from django.db.models import Q
from main.serializers import PlantSerializer, OrderSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from main.models import Plant, Order
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


class OrderProcessApiView(APIView):
    def post(self, request):
        id = request.data.get("id", None)
        print(id)
        # order =

        return  Response({"msg": "Ok"})

        # order = Order.objects.filter(Q(id=request.data.get("id")) & Q(status=Order.CREATED) & Q(farmer=None)).first()
        # serializer = OrderProcessSerializer(instance, data=request.data)
        # serializer.is_valid(raise_exception=True)
        # serializer.save(id=request.data.get("id"), user=request.user)
        # return Response(serializer.data)

# class OrderProcessApiView(APIView):
#     def post(self, request):
#         # instance = get_object_or_404(Order, id=request.data.get("id"))
#         instance = Order.objects.filter(Q(id=request.data.get("id")) & Q(status=Order.CREATED) & Q(farmer=None)).first()
#         serializer = OrderProcessSerializer(instance, data=request.data)
#         serializer.is_valid(raise_exception=True)
#         serializer.save(id=request.data.get("id"), user=request.user)
#         return Response(serializer.data)
