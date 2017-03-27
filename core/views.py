from django.shortcuts import render, HttpResponse
import json

def accounts(request):
    return render(request,'core/login-vk.html')

def index(request):
    return render(request,'core/index.html')

def myid(request):
    return HttpResponse (json.dumps(request.user.id), content_type="application/json")
