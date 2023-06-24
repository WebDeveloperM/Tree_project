from django.db.models import Q
from rest_framework import serializers
from main.models import Plant, Order

from users.serializers import UserSerializer


class PlantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plant
        fields = ('id', 'order', 'image', 'status', "payment_id")


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('id', 'status', 'location')

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret["count"] = instance.count
        ret["amount"] = instance.count * 5
        return ret


class OrderDoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('id', 'status', 'location')

    def update(self, instance, data):
        order_id = data['data']['order_id']
        plant_id = data['data']['plant_id']
        Plant.objects.filter(Q(id = plant_id)).update(status=Plant.DONE)

        plants_count =  Plant.objects.filter(Q(order__id = order_id) & Q(status=Plant.DONE)).count()
        order_obj_count = Order.objects.filter(id=order_id).count()
        if plants_count == order_obj_count:
            print("urraaa")
        print("Hammasi done emas unda")
        # Order.objects.filter(Q(id = order_id) & Q(status=Order.IN_PROCESS)).update(status=Order.DONE)
        return instance

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret["count"] = instance.count
        ret["amount"] = instance.count * 5
        return ret

# class OrderProcessSerializer(serializers.ModelSerializer):
#     def update(self, instance, data):
#         Order.objects.filter(Q(id=data.get("id")) & Q(status=Order.CREATED) & Q(farmer=None)).update(
#             status=Order.IN_PROCESS,
#             farmer=data.get("user"))
#         instance = super().update(instance, data)
#         return instance
#
#     def to_representation(self, instance):
#         ret = super().to_representation(instance)
#         ret["farmer"] = UserSerializer(instance.farmer).data
#         return ret
#
#     class Meta:
#         model = Order
#         fields = ('id', 'status', 'location', 'farmer')
