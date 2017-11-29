from django.conf.urls import url
from django.contrib import admin
from . import views

urlpatterns = [
    url(r'^player/(?P<playerID>[a-zA-Z0-9]+)$', view=views.player_by_id),
    url(r'^players$', view=views.all_players),
    url(r'^team/(?P<teamID>[a-zA-Z]+)$', view=views.team_by_id),
    url(r'^game/(?P<gameID>[A-Za-z0-9]+)$', view=views.game_by_id),
    url(r'^games/week/(?P<week>\d+)$', view=views.games_by_week),
    url(r'^games/team/(?P<teamID>[a-z]+)$', view=views.games_by_teamID),
    url(r'^games/team/(?P<teamID>[a-z]+)/week/(?P<week>\d+)$', view=views.games_by_teamID_week),
]
