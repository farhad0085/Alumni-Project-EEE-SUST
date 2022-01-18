from django.urls import path
from .views import AlumniListAPIView, BatchListAPIView


urlpatterns = [
    path('alumnies/', AlumniListAPIView.as_view()),
    path('batches/', BatchListAPIView.as_view()),
]
