from rest_framework.generics import ListAPIView
from app_alumni.filters import AlumniFilter
from app_alumni.models import Alumni
from app_alumni.serializers import AlumniSerializer
from django_filters import rest_framework as filters


class AlumniListAPIView(ListAPIView):
    serializer_class = AlumniSerializer
    queryset = Alumni.objects.all().order_by('-id')
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = AlumniFilter
    ordering_fields = ('name', 'id', 'session')
