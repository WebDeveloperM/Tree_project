from django.urls import path
from .views import *

urlpatterns = [
    path('cards/', CardCreateListView.as_view(), name='card'),
    path('payments/', PaymentCreateListView.as_view(), name='payment'),
]
