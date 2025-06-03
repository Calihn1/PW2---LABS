# accounts/decorators.py
from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect
from django.contrib import messages

def travel_admin_required(view_func):
    @login_required(login_url='login')
    def _wrapped_view(request, *args, **kwargs):
        if not request.user.email.lower().endswith('@admin.travel'):
            messages.error(request, "Acceso denegado. No tienes permisos de administrador.")
            return redirect('index')  
        return view_func(request, *args, **kwargs)
    return _wrapped_view