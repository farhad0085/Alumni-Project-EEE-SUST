from rest_framework import viewsets
from common.paginations import StandardResultsSetPagination
from events.models import Event
from events.serializers import EventSerializer


class EventViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Event.objects.all().order_by("-date", "-time")
    serializer_class = EventSerializer
    pagination_class = StandardResultsSetPagination
