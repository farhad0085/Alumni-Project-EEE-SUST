from django.contrib import admin
from .models import Faculty


@admin.register(Faculty)
class FacultyAdmin(admin.ModelAdmin):
    list_display = ("name", "designation", "role", "email", "phone")
    list_filter = ["role"]
    search_fields = ["name", "email"]
