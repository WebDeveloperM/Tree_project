from django.urls import path
from main.views import PlantCreateListView, OrderCreateListView, AllJobsAPIView

urlpatterns = [
    path('plant/', PlantCreateListView.as_view(), name='plant'),
    path('order/', OrderCreateListView.as_view(), name='order'),
    path('all-jobs/', AllJobsAPIView.as_view(), name='all-jobs'),

]
