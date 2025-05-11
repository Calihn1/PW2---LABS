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

def generarPiezas(isNegative):
    piezas = [knight, bishop, queen, king, bishop, knight, rock]

    if(not isNegative):
        tab = square.negative()
        tab = tab.under(rock)

        for i in range(0,7):
            if i % 2 == 0:
                tab = tab.join(square.under(piezas[i]))
            else:
                casilla = square.negative()
                tab = tab.join(casilla.under(piezas[i]))

        return tab 
               


tablero = generarPiezas(False)
draw(tablero)