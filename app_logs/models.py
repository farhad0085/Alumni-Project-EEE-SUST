from django.db import models


class Log(models.Model):
    log_level = models.CharField(max_length=10, blank=True, null=True)
    message = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
