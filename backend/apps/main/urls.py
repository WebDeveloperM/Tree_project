from django.urls import path
from main.views import PlantCreateListView, OrderListView, OrderStatusView, OrderDoneApiView, AllPlant

urlpatterns = [
    path('plant/', PlantCreateListView.as_view()),
    path('order/', OrderListView.as_view()),

    path('order-change/', OrderStatusView.as_view()),
    path('order-done/', OrderDoneApiView.as_view()),

    path("allplant/", AllPlant.as_view())

]
