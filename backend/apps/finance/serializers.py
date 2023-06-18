from rest_framework import serializers
from .models import Card,Payment
   
class CardSerializer(serializers.ModelSerializer):
       class Meta:
           model = Card
           fields = ('id', 'number', 'due_date', 'user')

class PaymentSerializer(serializers.ModelSerializer):
      class Meta:
            model = Payment
            fields = ('id','user','card','count','amount')

