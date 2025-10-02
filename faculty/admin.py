from django.contrib import admin
from faculty.models import Faculty, Lab, Project


@admin.register(Faculty)
class FacultyAdmin(admin.ModelAdmin):
    list_display = ("name", "designation", "role", "email", "phone")
    list_filter = ["role"]
    search_fields = ["name", "email"]


@admin.register(Lab)
class LabAdmin(admin.ModelAdmin):
    list_display = ("name", "created_at", "updated_at")
    search_fields = ("name",)

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "created_at", "updated_at")
    search_fields = ("title",)
