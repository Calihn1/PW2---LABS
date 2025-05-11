from interpreter import draw
from chessPictures import *
from picture import *

def generarTablero():
    tab = square.negative()

    for i in range(1, 8):
        if i % 2 == 0:
            tab = tab.join(square.negative()) 
        else:
            tab = tab.join(square)

    tab = tab.up(tab.verticalMirror())
    return tab


tablero = generarTablero()
draw(tablero)