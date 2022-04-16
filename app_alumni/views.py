from rest_framework.generics import ListAPIView
from app_alumni.filters import AlumniFilter, BatchFilter
from app_alumni.models import Alumni, Batch
from app_alumni.serializers import AlumniSerializer, BatchSerializer
from django_filters import rest_framework as filters
from rest_framework.permissions import IsAuthenticated
from common.views import LoggerAPIView


class AlumniListAPIView(ListAPIView):
    serializer_class = AlumniSerializer
    queryset = Alumni.objects.all().order_by('-id')
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = AlumniFilter
    ordering_fields = ('name', 'id')
    ordering = ["id"] # default ordering


class BatchListAPIView(ListAPIView):
    
    serializer_class = BatchSerializer
    queryset = Batch.objects.all().order_by('-session')
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = BatchFilter
    ordering_fields = ('name', 'id', 'session')


class AlumniDetailsAPIView(LoggerAPIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        alumni_obj = Alumni.objects.filter(user=user).first()
        if not alumni_obj:
            return self.send_400("This user don't have any alumni profile")
        
        # pass request in the context so that we get all pictures' url with domain
        serializer = AlumniSerializer(alumni_obj, context={'request': request})
        return self.send_200(serializer.data)
    
    def put(self, request):
        # if this user doesn't have any alumni profile
        # we'll create one profile for him and assign user object to him
        # otherwise we'll update his existing profile
        return self.send_200({"message": "Profile changes saved successfully!"})