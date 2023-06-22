from django.urls import path
from main.views import PlantCreateListView, OrderListView, OrderProcessApiView

urlpatterns = [
    path('plant/', PlantCreateListView.as_view()),
    path('order/', OrderListView.as_view()),
    path('order-process/', OrderProcessApiView.as_view()),

]
