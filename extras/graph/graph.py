import numpy as np
from mpl_toolkits.mplot3d import Axes3D
import matplotlib.pyplot as plt
from math import *

def hcg2rgb(hcg):
    if hcg[1] == 0.0:
        return [hcg[2], hcg[2], hcg[2]]
    
    h = (hcg[0] % (pi * 2)) / pi * 3
    v = h % 1
    pure = [0, 0, 0]
    
    w = 1 - v
    hs = floor(h)
    if hs == 0:
        pure[0] = 1
        pure[1] = v 
        pure[2] = 0 
    elif hs == 1:
        pure[0] = w
        pure[1] = 1 
        pure[2] = 0 
    elif hs == 2:
        pure[0] = 0 
        pure[1] = 1 
        pure[2] = v 
    elif hs == 3:
        pure[0] = 0 
        pure[1] = w 
        pure[2] = 1
    elif hs == 4:
        pure[0] = v 
        pure[1] = 0 
        pure[2] = 1 
    else:
        pure[0] = 1 
        pure[1] = 0 
        pure[2] = w

    mg = (1.0 - hcg[1]) * hcg[2]
    rgb = [hcg[1] * pure[0] + mg, hcg[1] * pure[1] + mg, hcg[1] * pure[2] + mg]
    return rgb;


def randrange(n, vmin, vmax):
    return (vmax - vmin)*np.random.rand(n) + vmin

fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')
n = 100
#for c, m, zl, zh in [('r', 'o', -50, -25), ('b', '^', -30, -5)]:
#    xs = randrange(n, 23, 32)
#    ys = randrange(n, 0, 100)
#    zs = randrange(n, zl, zh)
#    ax.scatter(xs, ys, zs, c=c, marker=m)

for dp in range(0, 7):
    for rp in range(0, 12):
        for hp in range(0, 7):
            deg = pi * 2.0 * (rp / 12.0)
            hf = (hp / 7.0)
            df = (dp / 7.0)
            h = 1.0 * hf
            d = 1.0 * df
            sx = cos(deg) * d
            sz = sin(deg) * d
            sy = h
            col = hcg2rgb([deg, hf, df])
            ax.scatter(sx* 1.0, sz* 1.0, sy, c=col, marker='o', s=48, hatch='', linewidth='0')
    
ax.set_xlabel('X Label')
ax.set_ylabel('Y Label')
ax.set_zlabel('Z Label')

plt.show()