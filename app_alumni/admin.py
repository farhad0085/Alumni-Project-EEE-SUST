from django.contrib import admin
from .models import Address, Batch, Picture, Alumni
from django.utils.html import format_html


class AddressAdmin(admin.ModelAdmin):
    list_display = ['address', 'city', 'state', 'zip_code', 'created_at', 'updated_at']


class BatchAdmin(admin.ModelAdmin):
    list_display = ['session', 'batch_name', 'total_students', 'created_at', 'updated_at']
    ordering = ['session']


class AlumniAdmin(admin.ModelAdmin):
    list_display = [
        'name', 'registration_number', 'batch', 'passing_year', 'contact_number',
        'email', 'is_employed', 'company', 'is_featured', 'image_tag'
    ]
    list_filter = ["batch", "passing_year", "is_employed", "is_featured"]
    search_fields = ['name', 'contact_number', 'email']

    def image_tag(self, obj):
        if obj.profile_picture:
            return format_html('<img src="{}" height="50px" />'.format(obj.profile_picture.picture.url))
        return None
    image_tag.short_description = 'Profile Picture'


class PictureAdmin(admin.ModelAdmin):
    list_display = ['picture', 'image_preview', 'created_at', 'updated_at']


admin.site.register(Picture, PictureAdmin)
admin.site.register(Alumni, AlumniAdmin)
admin.site.register(Address, AddressAdmin)
admin.site.register(Batch, BatchAdmin)
