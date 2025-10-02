from django.urls import path, include
from rest_framework.routers import DefaultRouter
from faculty.views import FacultyViewSet


router = DefaultRouter()
router.register("faculty", FacultyViewSet, basename="faculty")

urlpatterns = [
    path("", include(router.urls)),
]
