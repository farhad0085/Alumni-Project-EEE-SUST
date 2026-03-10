from django.db import models
from common.models import TrackingModel
from ckeditor_uploader.fields import RichTextUploadingField


class Event(TrackingModel):
    title = models.CharField(max_length=255)
    date = models.DateField(null=True, blank=True)
    time = models.TimeField(null=True, blank=True)
    location = models.CharField(max_length=255, null=True, blank=True)
    banner = models.ImageField(upload_to="events/banners", null=True, blank=True)
    summary = models.TextField(max_length=255, null=True, blank=True)
    description = RichTextUploadingField(null=True, blank=True)

    def __str__(self):
        return f"{self.title} ({self.date})"
