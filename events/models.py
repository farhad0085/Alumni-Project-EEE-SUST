from django.db import models
from common.models import TrackingModel


class Event(TrackingModel):
    title = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    date = models.DateField(null=True, blank=True)
    time = models.TimeField(null=True, blank=True)
    location = models.CharField(max_length=255, null=True, blank=True)
    banner = models.ImageField(upload_to="events/banners", null=True, blank=True)

    def __str__(self):
        return f"{self.title} ({self.date})"
