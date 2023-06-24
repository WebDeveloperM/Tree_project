from django.urls import path
from main.views import PlantCreateListView, OrderListView, OrderProcessApiView, OrderDoneApiView, AllOrders, AllPlants

urlpatterns = [
    path('plant/', PlantCreateListView.as_view()),
    path('order/', OrderListView.as_view()),
    path('order-process/', OrderProcessApiView.as_view()),
    path('order-done/', OrderDoneApiView.as_view()),
    path('allorders/', AllOrders.as_view()),
    path('allplants/', AllPlants.as_view())
]
