from django.shortcuts import render

def accounts(request):
    return render(request,'core/login-vk.html')
