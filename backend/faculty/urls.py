from django.urls import path, include
from rest_framework.routers import DefaultRouter
from faculty.views import FacultyViewSet, LabViewSet, ProjectViewSet


router = DefaultRouter()
router.register("faculty", FacultyViewSet, basename="faculty")
router.register("labs", LabViewSet, basename="labs")
router.register("projects", ProjectViewSet, basename="projects")

urlpatterns = [
    path("", include(router.urls)),
]
