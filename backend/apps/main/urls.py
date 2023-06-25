from django.urls import path
from main.views import *


urlpatterns = [
    path('plant/', PlantCreateListView.as_view()),
    path('order/', OrderListView.as_view()),
    path('order-change/', OrderStatusView.as_view()),
   
]


