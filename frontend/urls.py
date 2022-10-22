from .views import home
from django.urls import path
from rest_framework import routers

routers.DefaultRouter

urlpatterns = [
    path('', home, name='home')
]