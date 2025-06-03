# destino/views.py
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from accounts.decorators import travel_admin_required
from .models import Destination
from .forms import DestinationForm
from django.contrib import messages 

@login_required(login_url='login')
def index(request):
    dests = Destination.objects.all()
    is_admin = request.user.email.lower().endswith('@admin.travel')
    return render(request, "index.html", {'dests': dests, 'is_admin_user': is_admin})

@travel_admin_required
def destinationCreate(request):
    form = DestinationForm(request.POST or None, request.FILES or None)
    if request.method == 'POST' and form.is_valid():
        form.save()
        messages.success(request, "Destino agregado exitosamente.")
        return redirect('DestinationList')
    
    context = {
        'form': form
    }
    return render(request, 'destinationCreate.html', context)

@travel_admin_required
def destinationEdit(request, myID):
    obj = get_object_or_404(Destination, id=myID)
    
    if request.method == 'POST':
        form = DestinationForm(request.POST, request.FILES, instance=obj)
        if form.is_valid():
            form.save()
            messages.success(request, "Destino modificado exitosamente.")
            return redirect('DestinationList')
    else:
        form = DestinationForm(instance=obj)
    
    context = {
        'form': form,
        'editing': True
    }
    return render(request, 'destinationCreate.html', context)

@travel_admin_required
def destinationDelete(request, myID):
    obj = get_object_or_404(Destination, id=myID)
    if request.method == 'POST':
        if 'eliminar' in request.POST:
            obj.delete()
            messages.success(request, f"Destino '{obj.nombreCiudad}' eliminado.")
        return redirect('DestinationList')
        
    context = {
        'objeto': obj
    }
    return render(request, 'destinationDelete.html', context)

@travel_admin_required
def destinationList(request):
    destinations = Destination.objects.all()
    
    if request.method == 'POST':
        destination_id = request.POST.get('id', '')
        if 'modificar' in request.POST:
            return redirect('DestinationEdit', myID=destination_id)
        elif 'eliminar' in request.POST:
            return redirect('DestinationDelete', myID=destination_id)
    
    context = {
        'objectList': destinations
    }
    return render(request, 'destinationList.html', context)