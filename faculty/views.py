from rest_framework import viewsets
from common.paginations import StandardResultsSetPagination
from faculty.models import Faculty, Lab, Project
from faculty.serializers import FacultySerializer, LabSerializer, ProjectSerializer


class FacultyViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Faculty.objects.all().order_by("role", "name")
    serializer_class = FacultySerializer


class LabViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Lab.objects.all().order_by("-created_at")
    serializer_class = LabSerializer
    pagination_class = StandardResultsSetPagination


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.all().order_by("-created_at")
    serializer_class = ProjectSerializer
    pagination_class = StandardResultsSetPagination
