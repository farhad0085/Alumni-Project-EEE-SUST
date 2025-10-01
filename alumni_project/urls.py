from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static


# change django administration texts
admin.site.site_header = "EEE SUST Alumni Association" # change login page title
admin.site.index_title = "EEE SUST Alumni Association" # change admin "Site administration" text
admin.site.site_title = "EEE SUST Alumni Association Admin Panel" # change html title


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('user.urls')),
    path('api/', include('app_alumni.urls')),
    path('api/notice/', include('notice_board.urls')),

]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
