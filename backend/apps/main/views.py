from django.shortcuts import render
from main.serializers import PlantSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from main.models import Plant


# Create your views here.

class PlantListView(APIView):
    def get(self, request):
        plants = Plant.objects.all()
        serializer = PlantSerializer(plants, many=True)
        return Response(serializer.data)
