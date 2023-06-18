from django.urls import path
from main.views import PlantListView


urlpatterns = [
    path('', PlantListView.as_view(), name='main')
]


