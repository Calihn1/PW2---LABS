from interpreter import draw
from chessPictures import *
from picture import *

def generarTablero():
    tab = square.negative()
    tab = tab.join(square)
    tab = tab.join(tab)
    tab = tab.join(tab)

    tab = tab.up(tab.verticalMirror())
    tab = tab.up(tab)
    return tab


tablero = generarTablero()
draw(tablero)