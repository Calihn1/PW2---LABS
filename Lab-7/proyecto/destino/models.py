from django.db import models

# Create your models here.
class Destination(models.Model):
    nombreCiudad = models.CharField(max_length=100)
    descripcionCiudad = models.TextField()
    imagenCiudad = models.ImageField(upload_to='pics')
    precioTour = models.IntegerField()
    ofertaTour = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['id']