from django.conf.urls import url
from django.contrib import admin
from . import views

urlpatterns = [
    url(r'^player/(?P<playerID>\d+)$', view=views.player_by_id),
    url(r'^players$', view=views.all_players),
    url(r'^team/(?P<teamID>\d+)$', view=views.Team.as_view()),
    url(r'^game/(?P<gameID>\d+)$', view=views.Game.as_view()),
    url(r'^games/week/(?P<week>\d+)$', view=views.games_by_week),
    url(r'^games/team/(?P<teamID>\d+)$', view=views.games_by_teamID),
]
