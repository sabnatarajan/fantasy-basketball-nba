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


class Player(APIView):
    """
    Player information
    """

    def get(self, req, playerID, format=None):
        conn = db_connect()
        query = f'SELECT * FROM Players WHERE PlayerID={playerID}'
        row = conn.execute(query).fetchone()
        player_data = dict((k, row[k]) for k in row.keys())
        db_disconnect(conn)
        return Response(player_data)


@api_view(['GET'])
def player_by_id(req, playerID, format=None):
    conn = db_connect()
    query = f'SELECT * FROM Players WHERE PlayerID={playerID}'
    row = conn.execute(query).fetchone()
    player_data = dict((k, row[k]) for k in row.keys())
    db_disconnect(conn)
    return Response(player_data)


@api_view(['GET'])
def all_players(req, format=None):
    conn = db_connect()
    query = f'SELECT * FROM Players'
    rows = conn.execute(query).fetchall()
    player_data = [dict((k, row[k]) for k in row.keys()) for row in rows]
    db_disconnect(conn)
    return Response(player_data)


class Team(APIView):
    """
    Team Information
    """

    def get(self, req, teamID, format=None):
        conn = db_connect()
        query = f'SELECT * FROM ActiveTeams WHERE TeamID={teamID}'
        row = conn.execute(query).fetchone()
        team_data = dict((k, row[k]) for k in row.keys())
        db_disconnect(conn)
        return Response(team_data)


class Game(APIView):
    """
    Game Information
    """

    def get(self, req, gameID, format=None):
        conn = db_connect()
        query = f'SELECT * FROM Games WHERE GameID={gameID}'
        row = conn.execute(query).fetchone()
        team_data = dict((k, row[k]) for k in row.keys())
        db_disconnect(conn)
        return Response(team_data)


@api_view(['GET'])
def games_by_week(req, week, format=None):
    conn = db_connect()
    query = f'SELECT * FROM Games WHERE Week={week}'
    rows = conn.execute(query).fetchall()
    team_data = [dict((k, row[k]) for k in row.keys()) for row in rows]
    db_disconnect(conn)
    return Response(team_data)

@api_view(['GET'])
def games_by_teamID(req, teamID, format=None):
    conn = db_connect()
    query = f'SELECT * FROM Games WHERE HomeTeamID={teamID} OR AwayTeamID={teamID}'
    rows = conn.execute(query).fetchall()
    team_data = [dict((k, row[k]) for k in row.keys()) for row in rows]
    db_disconnect(conn)
    return Response(team_data)