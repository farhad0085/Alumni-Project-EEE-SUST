from .models import Log
from django.contrib import admin, messages
from django.shortcuts import render, redirect
from django.urls import path, reverse
from django.utils import timezone


class LogAdmin(admin.ModelAdmin):
    list_display = ['log_level', '_message', 'created_at']
    list_filter = ['log_level', 'created_at']
    search_fields = ['message']
    ordering = ["-created_at"]
    change_list_template = "admin/app_logs/logs_change_list.html"

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('delete-old-logs/', self.admin_site.admin_view(self.delete_old_logs_view), name='delete_old_logs_view'),
        ]
        return custom_urls + urls
    
    
    def delete_old_logs_view(self, request):
        end_date = timezone.now() - timezone.timedelta(days=30)
        logs_to_delete = Log.objects.filter(created_at__date__lte=end_date)
        total_rows = logs_to_delete.count()

        if request.method == 'POST':
            logs_to_delete.delete()
            messages.success(request, f'Successfully deleted {total_rows} log(s)!')
            return redirect(reverse('admin:delete_old_logs_view'))

        context = {
            'end_date': end_date,
            'total_rows': total_rows,
            'title': 'Confirm Log Deletion',
            **self.admin_site.each_context(request),  # Include necessary context
        }

        return render(request, 'admin/app_logs/confirm_delete_logs.html', context)

    def has_change_permission(self, request, obj=None):
        return False
    
    def has_import_permission(self, request):
        return False
    
    def has_add_permission(self, request):
        return False

    def _message(self, obj):
        return obj.message[:120]
    
    _message.short_description = 'Message'
    _message.admin_order_field = 'message'


admin.site.register(Log, LogAdmin)
