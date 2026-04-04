from django.db import models
from django.utils import timezone
from common.models import TrackingModel


class Notice(TrackingModel):
    title = models.CharField(max_length=255, null=True)
    description = models.TextField(null=True, blank=True)
    date = models.DateField(default=timezone.now)
    pdf = models.FileField(upload_to="notices/pdfs", blank=True, null=True,
        help_text="Optional: Upload a circular/notice as PDF")

    def __str__(self):
        return f"{self.title} ({self.date})"
