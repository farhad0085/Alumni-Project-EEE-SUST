from rest_framework import serializers
from django.conf import settings


SEARCH_PATTERN = f'src="{settings.MEDIA_URL}{settings.CKEDITOR_UPLOAD_PATH}'
REPLACE_WITH = f'src="{settings.WEBSITE_URL}{settings.MEDIA_URL}{settings.CKEDITOR_UPLOAD_PATH}'

class FixAbsolutePathSerializer(serializers.Field):

    def to_representation(self, value):
        text = value.replace(SEARCH_PATTERN, REPLACE_WITH)
        return text