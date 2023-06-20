from django.urls import path
from main.views import PlantCreateListView, OrderCreateListView, AllJobsAPIView

urlpatterns = [
<<<<<<< HEAD
    path('plant/',PlantCreateListView.as_view(),name='plant'),
    path('order/',OrderListView.as_view(),name='order'),
 
=======
    path('plant/', PlantCreateListView.as_view(), name='plant'),
    path('order/', OrderCreateListView.as_view(), name='order'),
    path('all-jobs/', AllJobsAPIView.as_view(), name='all-jobs'),

>>>>>>> 6e9e5b58a17433944177bf3ffd2f36774a03db3f
]
