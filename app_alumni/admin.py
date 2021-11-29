from django.contrib import admin
from .models import Picture, Alumni


class AlumniAdmin(admin.ModelAdmin):
    list_display = ['name', 'session', 'passing_year', 'contact_number', 'email', 'is_employed', 'company']
    list_filter = ["session", "passing_year", "is_employed"]
    search_fields = ['name', 'contact_number', 'email']


class PictureAdmin(admin.ModelAdmin):
    list_display = ['picture']


admin.site.register(Picture, PictureAdmin)
admin.site.register(Alumni, AlumniAdmin)