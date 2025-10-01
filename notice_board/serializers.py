from rest_framework import serializers
from notice_board.models import Notice


class NoticeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notice
        fields = ["id", "title", "description", "date", "pdf"]
