from django.urls import path
from .views import AlumniListAPIView


urlpatterns = [
    path('alumnies/', AlumniListAPIView.as_view()),
]
