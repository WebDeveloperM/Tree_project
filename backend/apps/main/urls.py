from django.urls import path
from django.urls import path
from main.views import (PlantCreateListView,
                        OrderListView,
                        OrderListPercentApiView,
                        OrderStatusView,
                        OrderDoneApiView,
                        FarmerOrderApiView,
                        LastOrdersApiView,
                        FullOrderDataApiView,
                        AllPlant
                        )

urlpatterns = [
    path('plant/', PlantCreateListView.as_view()),
    path('order/', OrderListView.as_view()),
    path('order-percent/', OrderListPercentApiView.as_view()),
    path('order-change/', OrderStatusView.as_view()),
    path('orders-done/', OrderDoneApiView.as_view(), name='order_done'),
    path('farmer-order/', FarmerOrderApiView.as_view()),
    path('full-order-data/', FullOrderDataApiView.as_view()),
    path('last-orders/', LastOrdersApiView.as_view()),

    path("allplant/", AllPlant.as_view())
]
