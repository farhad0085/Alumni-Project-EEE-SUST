from django.contrib import admin
from .models import Address, Picture, Alumni
from django.utils.html import format_html

class AddressAdmin(admin.ModelAdmin):
    list_display = ['address', 'city', 'state', 'zip_code', 'created_at', 'updated_at']


class AlumniAdmin(admin.ModelAdmin):
    list_display = [
        'name', 'session', 'passing_year', 'contact_number',
        'email', 'is_employed', 'company', 'is_featured', 'image_tag'
    ]
    list_filter = ["session", "passing_year", "is_employed", "is_featured"]
    search_fields = ['name', 'contact_number', 'email']

    def image_tag(self, obj):
        if obj.profile_picture:
            return format_html('<img src="{}" height="50px" />'.format(obj.profile_picture.picture.url))
        return None
    image_tag.short_description = 'Profile Picture'



class PictureAdmin(admin.ModelAdmin):
    list_display = ['picture']


admin.site.register(Picture, PictureAdmin)
admin.site.register(Alumni, AlumniAdmin)
admin.site.register(Address, AddressAdmin)
