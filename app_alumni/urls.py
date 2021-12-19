from django.urls import path, include
from .views import AlumniListCreateAPIView


urlpatterns = [
    path('alumnies/', AlumniListCreateAPIView.as_view()),
]
