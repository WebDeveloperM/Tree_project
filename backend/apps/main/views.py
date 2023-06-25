from main.serializers import PlantSerializer, OrderSerializer, OrderChangeSerializer
from django.db.models import Q
from rest_framework.response import Response
from rest_framework.views import APIView
from main.models import Plant, Order
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import status
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
        order = Order.objects.get(id=request.data.get("id"))
        print(order)
        if order.status == Order.CREATED:
            order.status = Order.IN_PROCESS
            order.farmer = request.user
            order.save()
            return Response({"msg": "OK"}, 200)
        return Response({'status': 'Order not found'}, 404)
    


# class OrderDoneView(APIView):
#     def post(self, request):
#         order = Order.objects.get(id=request.data.get("id"))
        # try:
        #     order = Order.objects.get(pk=pk)
        # except Order.DoesNotExist:
        #     return Response(status=status.HTTP_404_NOT_FOUND)

        # if order.status != Order.IN_PROCESS:
        #     return Response({'error': 'Order not in process'},
        #                     status=status.HTTP_400_BAD_REQUEST)

        # order.status = Order.DONE
        # order.save()

        # return Response({'status': 'Order done'},
        #                 status=status.HTTP_200_OK)

    
    
    




