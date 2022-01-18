from rest_framework.generics import ListAPIView
from app_alumni.filters import AlumniFilter
from app_alumni.models import Alumni
from app_alumni.serializers import AlumniSerializer
from django_filters import rest_framework as filters
from django.db.models import Count
from common.views import LoggerAPIView


class AlumniListAPIView(ListAPIView):
    serializer_class = AlumniSerializer
    queryset = Alumni.objects.all().order_by('-id')
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = AlumniFilter
    ordering_fields = ('name', 'id', 'session')


class BatchListAPIView(LoggerAPIView):
    
    def get(self, request):
        batches = Alumni.objects.values('session').annotate(students=Count('session')).distinct()

        batch_data = []
        for batch in batches:
            batch_data.append({
                "session": batch["session"],
                "students": batch["students"],
            })
        return self.send_200(batch_data)
