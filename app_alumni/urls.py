from django.urls import path
from .views import *


urlpatterns = [
    path('alumnies/', AlumniListAPIView.as_view()),
    path('alumni/<int:pk>', AlumniRetrieveAPIView.as_view()),
    path('batches/', BatchListAPIView.as_view()),
    path('alumni-details/', AlumniDetailsAPIView.as_view()),
]
