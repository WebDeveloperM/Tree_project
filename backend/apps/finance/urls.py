from django.urls import path
from finance.views import (
    CardAPIView,
    CardListView,
    PaymentCreateView,
    InvestorOrdersApiView
)

urlpatterns = [
    path('cards/', CardAPIView.as_view()),
    path('cardslist/', CardListView.as_view()),
    path('payments/', PaymentCreateView.as_view()),
    path('investor-orders/', InvestorOrdersApiView.as_view())
]
