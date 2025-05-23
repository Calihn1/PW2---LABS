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

def generarPiezas():
    piezas = [knight, bishop, queen, king, bishop, knight, rock]
    
    tab = square.negative()
    tab = tab.under(rock)

    for i in range(0,7):
        if i % 2 == 0:
            tab = tab.join(square.under(piezas[i]))
        else:
            casilla = square.negative()
            tab = tab.join(casilla.under(piezas[i]))
    
    return tab

def generarPeones():

    peon = square
    peon = peon.under(pawn)

    peon2 = square.negative()
    peon2 = peon2.under(pawn)
    
    peones = peon.join(peon2)
    peones = peones.join(peones)
    peones = peones.join(peones)

    return peones
               

tablero = generarPiezas()
tablero = tablero.up(generarPeones())

tablero = tablero.up(generarTablero())

tablero = tablero.up(generarPeones().negative())
tablero = tablero.up(generarPiezas().negative())

draw(tablero)