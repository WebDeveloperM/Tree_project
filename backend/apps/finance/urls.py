from django.urls import path
from .views import *

urlpatterns = [
    path('create_cards/', CardCreateListView.as_view(), name='card'),
    path('payments/', PaymentCreateListView.as_view(), name='payment'),
]
