from django.contrib import admin
from .models import Address, Batch, Picture, Alumni
from django.utils.html import format_html
from django.db import models
from django.contrib.admin.widgets import AdminFileWidget
from django.utils.safestring import mark_safe


class AddressAdmin(admin.ModelAdmin):
    list_display = ['address', 'city', 'state', 'zip_code', 'created_at', 'updated_at']


class BatchAdmin(admin.ModelAdmin):
    list_display = ['session', 'batch_name', 'total_students', 'created_at', 'updated_at']
    ordering = ['session']


class AdminImageWidget(AdminFileWidget):

    def render(self, name, value, attrs=None, renderer=None):
        print("called")
        output = []

        if value and getattr(value, "url", None):
            image_url = value.url
            file_name = str(value)

            output.append(
                f' <a href="{image_url}" target="_blank">'
                f'  <img src="{image_url}" alt="{file_name}" width="150" height="150" '
                f'style="object-fit: cover;"/> </a>')

        output.append(super(AdminFileWidget, self).render(name, value, attrs, renderer))
        return mark_safe(u''.join(output))


class PictureInlineAdmin(admin.TabularInline):
    model = Alumni.pictures.through
    formfield_overrides = {
        models.ImageField: {'widget': AdminImageWidget}
    }


class AlumniAdmin(admin.ModelAdmin):
    list_display = [
        'name', 'batch', 'passing_year', 'contact_number',
        'email', 'is_employed', 'company', 'is_featured', 'image_tag'
    ]
    list_filter = ["batch", "passing_year", "is_employed", "is_featured"]
    search_fields = ['name', 'contact_number', 'email']
    inlines = [PictureInlineAdmin]

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
