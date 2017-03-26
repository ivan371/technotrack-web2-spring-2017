from django.shortcuts import render

def accounts(request):
    return render(request,'core/login-vk.html')

def index(request):
    return render(request,'core/index.html')
