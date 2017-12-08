from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
import sqlite3

from fantasy_nba.settings import DATABASES


def db_connect():
    conn = sqlite3.connect(DATABASES['default']['NAME'])
    conn.row_factory = sqlite3.Row
    return conn


def db_disconnect(conn):
    conn.close()


def db_provider(func):
    def func_wrapper(*args, **kwargs):
        conn = sqlite3.connect(DATABASES['default']['NAME'])
        conn.row_factory = sqlite3.Row
        func_ret = func(conn, *args, **kwargs)
        conn.close()
        return Response(func_ret)
    return func_wrapper


@api_view(['GET'])
@db_provider
def player_by_id(conn, req, playerID, format=None):
    query = f'SELECT * FROM Players WHERE playerID="{playerID}"'
    row = conn.execute(query).fetchone()
    player_data = dict((k, row[k]) for k in row.keys())
    return player_data


@api_view(['GET'])
@db_provider
def all_players(conn, req, format=None):
    query = f'SELECT * FROM Players LIMIT 50'
    rows = conn.execute(query).fetchall()
    player_data = [dict((k, row[k]) for k in row.keys()) for row in rows]
    return player_data


@api_view(['GET'])
@db_provider
def team_by_id(conn, req, teamID, format=None):
    query = f'SELECT * FROM Teams WHERE teamID="{teamID.upper()}"'
    row = conn.execute(query).fetchone()
    team_data = dict((k, row[k]) for k in row.keys())
    return team_data


@api_view(['GET'])
@db_provider
def game_by_id(conn, req, gameID, format=None):
    query = f'SELECT * FROM Schedule WHERE gameID="{gameID}"'
    row = conn.execute(query).fetchone()
    game_data = dict((k, row[k]) for k in row.keys())
    return game_data


@api_view(['GET'])
@db_provider
def games_by_week(conn, req, week, format=None):
    query = f'SELECT * FROM Games WHERE week={week}'
    rows = conn.execute(query).fetchall()
    game_data = [dict((k, row[k]) for k in row.keys()) for row in rows]
    return game_data


@api_view(['GET'])
@db_provider
def games_by_teamID(conn, req, teamID, format=None):
    query = f'SELECT * FROM Games WHERE homeTeamID="{teamID.upper()}" OR awayTeamID="{teamID.upper()}"'
    rows = conn.execute(query).fetchall()
    game_data = [dict((k, row[k]) for k in row.keys()) for row in rows]
    return game_data


@api_view(['GET'])
@db_provider
def games_by_teamID_week(conn, req, teamID, week, format=None):
    query = f'SELECT * FROM Games WHERE week={week} AND (homeTeamID="{teamID.upper()}" OR awayTeamID="{teamID.upper()}")'
    rows = conn.execute(query).fetchall()
    game_data = [dict((k, row[k]) for k in row.keys()) for row in rows]
    return game_data


@api_view(['GET'])
@db_provider
def player_stats_last5(conn, req, playerID, format=None):
    query = f'SELECT * FROM Gamelog WHERE playerID="{playerID}" ORDER BY SUBSTR(gameID, 0, 8) DESC LIMIT 5'
    rows = conn.execute(query).fetchall()
    last5data = [dict((k, row[k]) for k in row.keys()) for row in rows]
    return last5data


@api_view(['GET'])
@db_provider
def player_stats_season(conn, req, playerID, format=None):
    query = f'SELECT * FROM Gamelog WHERE playerID="{playerID}" ORDER BY SUBSTR(gameID, 0, 8)'
    rows = conn.execute(query).fetchall()
    last5data = [dict((k, row[k]) for k in row.keys()) for row in rows]
    return last5data
