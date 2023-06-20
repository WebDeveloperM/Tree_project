from django.urls import path
from main.views import PlantCreateListView, OrderListView

urlpatterns = [
    path('plant/', PlantCreateListView.as_view()),
    path('order/', OrderListView.as_view()),
]
