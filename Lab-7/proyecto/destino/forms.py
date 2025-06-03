from django import forms
from .models import Destination

class DestinationForm(forms.ModelForm):
    class Meta:
        model = Destination
        fields = [
            'nombreCiudad',
            'descripcionCiudad',
            'imagenCiudad',
            'precioTour',
            'ofertaTour',
        ]
        widgets = {
            'nombreCiudad': forms.TextInput(attrs={'class': 'form-control'}),
            'descripcionCiudad': forms.Textarea(attrs={'class': 'form-control', 'rows': 3}),
            'imagenCiudad': forms.ClearableFileInput(attrs={'class': 'form-control'}),
            'precioTour': forms.NumberInput(attrs={'class': 'form-control'}),
            'ofertaTour': forms.CheckboxInput(attrs={'class': 'form-check-input'}),
        }