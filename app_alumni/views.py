from rest_framework.generics import ListAPIView
from app_alumni.filters import AlumniFilter, BatchFilter
from app_alumni.models import Alumni, Batch
from app_alumni.serializers import AlumniSerializer, BatchSerializer
from django_filters import rest_framework as filters
from rest_framework import viewsets
from common.paginations import StandardResultsSetPagination


class AlumniViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = AlumniSerializer
    queryset = Alumni.objects.all().order_by('-id')
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = AlumniFilter
    ordering_fields = ('name', 'id')
    pagination_class = StandardResultsSetPagination
    ordering = ["id"] # default ordering


class BatchListAPIView(ListAPIView):
    serializer_class = BatchSerializer
    queryset = Batch.objects.all().order_by('-session')
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = BatchFilter
    ordering_fields = ('name', 'id', 'session')
