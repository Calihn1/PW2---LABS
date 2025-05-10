def esEscalar(m):
    d = m[0][0] 
    for i in range(len(m)):
        for j in range(len(m)):
            if i != j:
                if m[i][j] != 0:
                    print(m[i][j])
                    return False
            elif m[i][j] != d:
                print(m[i][j])
                return False
    return True

def esUnitaria(m):
  return m[0][0] == 1 and esEscalar(m)



m = [
    [2, 0, 0],
    [0, 2, 0],
    [0, 0, 2]
]

print(esUnitaria(m))  
