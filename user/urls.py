from django.urls import path
from .views import *


urlpatterns = [
    path('login/', LoginView.as_view(), name="login_url"),
    path('register/', RegisterAPIView.as_view()),
]
