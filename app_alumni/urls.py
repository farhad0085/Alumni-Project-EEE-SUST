from django.urls import path
from .views import AlumniDetailsAPIView, AlumniListAPIView, BatchListAPIView


urlpatterns = [
    path('alumnies/', AlumniListAPIView.as_view()),
    path('batches/', BatchListAPIView.as_view()),
    path('alumni-details/', AlumniDetailsAPIView.as_view()),
]
