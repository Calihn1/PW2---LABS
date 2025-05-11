from interpreter import draw
from chessPictures import *
from picture import *

tablero = square.negative()
tablero = tablero.join(square)
tablero = tablero.join(tablero)
tablero = tablero.join(tablero)

draw(tablero)