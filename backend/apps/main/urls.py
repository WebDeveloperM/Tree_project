from django.urls import path
from django.urls import path
from main.views import PlantCreateListView, OrderListView, OrderStatusView

urlpatterns = [
    path('plant/', PlantCreateListView.as_view()),
    path('order/', OrderListView.as_view()),
    path('order-change/', OrderStatusView.as_view()),
    # path('orders-done/',OrderDoneView.as_view(), name='order_done'),
]
