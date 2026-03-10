from rest_framework import viewsets
from notice_board.models import Notice
from .serializers import NoticeSerializer
from common.paginations import StandardResultsSetPagination


class NoticeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Notice.objects.all().order_by('-id')
    serializer_class = NoticeSerializer
    pagination_class = StandardResultsSetPagination
