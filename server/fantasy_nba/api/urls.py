from django.conf.urls import url
from django.contrib import admin

from app import views

urlpatterns = [
    url(r'^player/(\d+)$', view = views.player_view),
    url(r'^player/compare/(\d+)/(\d+)$', admin.site.urls),
    url(r'^team$', admin.site.urls),
    url(r'^team/compare/(\d+)/(\d+)$', admin.site.urls),
]