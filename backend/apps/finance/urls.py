from django.urls import path
from .views import *

urlpatterns = [
    path('cards/', CardCreateListView.as_view(), name='card'),
    path('paymets/', PaymentCreateListView.as_view(), name='payment'),
]
