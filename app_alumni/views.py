from rest_framework.generics import ListCreateAPIView
from app_alumni.models import Alumni
from app_alumni.serializers import AlumniSerializer


class AlumniListCreateAPIView(ListCreateAPIView):
    serializer_class = AlumniSerializer
    
    def get_queryset(self):
        featured_alumnies = Alumni.objects.filter(is_featured=True)
        if featured_alumnies:
            return featured_alumnies[:20]
        return Alumni.objects.all()[:20]
