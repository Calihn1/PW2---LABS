"""
URL configuration for proyecto project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# proyecto/urls.py
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from destino import views as destino_views 

urlpatterns = [
    path('', destino_views.index, name="index"), # Root URL points to index
    path('destinos/', include('destino.urls')),  # URLs for the 'destino' app
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls')), # URLs for the 'accounts' app
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)