from django.urls import path
from finance.views import (
    CardAPIView,
    CardListView,
    PaymentCreateListView,
    InvestorOrdersApiView
)

urlpatterns = [
    path('cards/', CardAPIView.as_view()),
    path('cardslist/', CardListView.as_view()),
    path('payments/', PaymentCreateListView.as_view()),
    path('investor-orders', InvestorOrdersApiView.as_view())
]
