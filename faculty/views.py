from rest_framework import viewsets
from faculty.models import Faculty
from faculty.serializers import FacultySerializer


class FacultyViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Faculty.objects.all().order_by("role", "name")
    serializer_class = FacultySerializer
