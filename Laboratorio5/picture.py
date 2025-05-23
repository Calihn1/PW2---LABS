from colors import *
class Picture:
  def __init__(self, img):
    self.img = img;

  def __eq__(self, other):
    return self.img == other.img

  def _invColor(self, color):
    if color not in inverter:
      return color
    return inverter[color]

  def verticalMirror(self):
    """ Devuelve el espejo vertical de la imagen """
    vertical = []
    for value in self.img:
      vertical.append(value[::-1])

    return Picture(vertical)

  def horizontalMirror(self):
    """ Devuelve el espejo horizontal de la imagen """
    
    return Picture(self.img[::-1])

  def negative(self):
    """ Devuelve un negativo de la imagen """

    negativo = [
      ''.join(self._invColor(pix) for pix in linea)
      for linea in self.img
    ]

    return Picture(negativo)

  def join(self, p):
    """ Devuelve una nueva figura poniendo la figura del argumento 
        al lado derecho de la figura actual """
    juntos = []

    for linea_self, linea_p in zip(self.img, p.img):
      juntos.append(linea_self + linea_p)

    return Picture(juntos)

  def up(self, p): 
    arriba = p.img + self.img

    return Picture(arriba)

  def under(self, p):
    """ Devuelve una nueva figura poniendo la figura p sobre la
        figura actual """
    
    nuevo = []
    
    for l_self, l_p in zip( self.img, p.img):
      cadena = ""

      for pixel_s, pixel_p in zip(l_self, l_p):
        if pixel_p != " ":
          cadena += pixel_p
        else:
          cadena += pixel_s
      
      nuevo.append(cadena)
        
    return Picture(nuevo)
  
  def horizontalRepeat(self, n):
    """ Devuelve una nueva figura repitiendo la figura actual al costado
        la cantidad de veces que indique el valor de n """
    nuevo = []

    for linea in self.img:
      nuevaLinea = linea * n
      nuevo.append(nuevaLinea)

    return Picture(nuevo)
    
  def verticalRepeat(self, n):

    filas = []

    for _ in range(n):
      for linea in self.img :
        filas.append(linea)

    return Picture(filas)

  #Extra: Sólo para realmente viciosos 
  def rotate(self):
    """Devuelve una figura rotada en 90 grados, puede ser en sentido horario
    o antihorario"""

    flipped = self.img[::-1]

    rotadas = [''.join(col) for col in zip (*flipped)]
    return Picture(rotadas)
