from django.urls import path, include
from .views import AlumniViewSet, BatchListAPIView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("alumni", AlumniViewSet, basename="alumni")


urlpatterns = [
    path('', include(router.urls)),
    path('batches/', BatchListAPIView.as_view()),
]
