from django.urls import path
from main.views import *


urlpatterns = [
    path('plant/',PlantCreateListView.as_view(),name='plant'),
    path('order/',OrderCreateListView.as_view(),name='order'),
 
]


