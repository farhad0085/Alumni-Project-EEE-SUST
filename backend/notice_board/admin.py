from django.contrib import admin
from .models import Notice


@admin.register(Notice)
class NoticeAdmin(admin.ModelAdmin):
    list_display = ["title", "date", "pdf"]
    list_filter = ["date"]
    search_fields = ["title"]

