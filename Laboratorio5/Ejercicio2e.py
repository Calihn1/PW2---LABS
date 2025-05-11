from interpreter import draw
from chessPictures import *
from picture import *

tablero = square.negative()

for i in range(1, 8):
   if i % 2 == 0:
      tablero = tablero.join(square.negative()) 
   else:
      tablero = tablero.join(square)

draw(tablero)