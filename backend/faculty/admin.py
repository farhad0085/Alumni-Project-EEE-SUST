from django.contrib import admin
from django.utils.html import format_html
from .models import Lab, Project, Faculty


@admin.register(Lab)
class LabAdmin(admin.ModelAdmin):
    list_display = ("name", "thumbnail_tag")
    readonly_fields = ("thumbnail_tag",)

    def thumbnail_tag(self, obj):
        if obj.thumbnail:
            return format_html(
                '<img src="{}" style="width: 80px; height:auto; object-fit:cover;" />',
                obj.thumbnail.url
            )
        return "-"
    thumbnail_tag.short_description = "Thumbnail"


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "thumbnail_tag")
    readonly_fields = ("thumbnail_tag",)

    def thumbnail_tag(self, obj):
        if obj.thumbnail:
            return format_html(
                '<img src="{}" style="width: 80px; height:auto; object-fit:cover;" />',
                obj.thumbnail.url
            )
        return "-"
    thumbnail_tag.short_description = "Thumbnail"


@admin.register(Faculty)
class FacultyAdmin(admin.ModelAdmin):
    list_display = ("name", "role", "gender", "photo_tag")
    readonly_fields = ("photo_tag",)

    def photo_tag(self, obj):
        if obj.photo:
            return format_html(
                '<img src="{}" style="width: 60px; height:auto; object-fit:cover;" />',
                obj.photo.url
            )
        return "-"
    photo_tag.short_description = "Photo"
