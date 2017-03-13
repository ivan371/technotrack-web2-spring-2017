from django.shortcuts import render

def vklogin(request):
    return render(request,'core/login-vk.html')
