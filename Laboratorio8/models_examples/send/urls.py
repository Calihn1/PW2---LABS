from django.contrib import path, include
from . import views

urlpatters=[
    path('',views,index),
]