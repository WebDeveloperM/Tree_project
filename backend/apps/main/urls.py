from django.urls import path
from django.urls import path
from main.views import (PlantCreateListView,
                        OrderListView,
                        OrderStatusView,
                        OrderDoneApiView,
                        FarmerOrderApiView,
                        AllPlant
                        )

urlpatterns = [
    path('plant/', PlantCreateListView.as_view()),
    path('order/', OrderListView.as_view()),
    path('order-change/', OrderStatusView.as_view()),
    path('orders-done/', OrderDoneApiView.as_view(), name='order_done'),
    path('farmer-oreder/', FarmerOrderApiView.as_view()),

    path("allplant/", AllPlant.as_view())
]
