from django.shortcuts import render
from django.http import JsonResponse

# Create your views here.

def player_view(self, request):
    response = {
        "result": "Success",
    }
    print(self.query_params)
    return JsonResponse(response)