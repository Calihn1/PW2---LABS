# destino/urls.py
from django.urls import path
from . import views

urlpatterns = [
    
    path('agregar/', views.destinationCreate, name="DestinationCreate"),
    path('editar/<int:myID>/', views.destinationEdit, name='DestinationEdit'),
    path('eliminar/<int:myID>/', views.destinationDelete, name='DestinationDelete'),
    path('lista/', views.destinationList, name='DestinationList'),
]