# HCG (color model)
> Color model [HCG](https://github.com/acterhd/hcg-color/blob/master/convert/hcg.js) is an alternative to [HSV and HSL](https://en.wikipedia.org/wiki/HSL_and_HSV), derived by Munsell color system.

### Visualization

<img src="/images/diagram.png?raw=true" alt="HCG model" width="400">

HCG gray (achromatic) inside, and colors (chromatic) outside.

### Description
Unlike the others, it adjusts the color hue and shade of gray. The HCG can change the whitish-yellow to grayish-yellow in just one shift slider. Changing channels HCG (channel "G") does not affect the brightness of a color shade HSV and HSL, but only changes the brightness of the mixed color of gray. Channel "C" is the coefficient of color, chromatic color depends on it.

### Motivation
The color model describes how a color can be color. For example. Either he is pure red, or admixed with gray shades. Either he is completely gray. Other color models can be said as far as he is light as it is dark, and so on, while the HCG can be described as pure color. Because of this difference can be derived pure colors and mixed a shade of gray.

### Simple conversion between HCG and RGB
```
# From
hcg2rgb [h<6..0>, c<1..0>, gr<1..0>]
    pure_rgb<0..1, 0..1, 0..1> = rgb_from_hue(h)
    m<0..1> = gr * (1 - c)
    return [pure_rgb * c + m]

# To
rgb2hcg [r<1..0>, g<1..0>, b<1..0>]
    M<0..1> = max(r, g, b)
    m<0..1> = min(r, g, b)
    c<0..1> = M - m
    h<0..6> = c > 0 ? hue_from_rgb(r, g, b) : 0
    g<0..1> = c < 1 ? m / (1 - c) : 0
    return [h, c, g]
```

----------
## HCG (implementation)

### Convertors

+ Original convertor in [`./convert/hcg.js`](https://github.com/acterhd/hcg-color/blob/master/convert/hcg.js).
+ Converter https://github.com/scijs/color-space
+ Converter https://github.com/Qix-/color-convert
+ Plugin for D3 https://github.com/d3/d3-hcg
+ Converter https://github.com/satya164/pigment
+ Plug-in for Less https://github.com/acterhd/less-hcg
+ Atom Editor (plugin) https://github.com/abe33/atom-pigments

### Demonstration and calculators

+ Visualized [HCG cylinder](https://plot.ly/~acterhd/8/)
+ Shadertoy visual demo of [HCG](https://www.shadertoy.com/view/ltSXRV), [HSL](https://www.shadertoy.com/view/XtjXRK), [HSV](https://www.shadertoy.com/view/4dVXDd), [Color Picker](https://www.shadertoy.com/view/ldK3Wh)
+ Try HCG converter https://tonicdev.com/npm/hcg-color

----------
## HCG (API)

### Install by npm

```
npm install hcg-color
```

Here is npm module: [hcg-color](https://www.npmjs.com/package/hcg-color)

### API

```
// where "hsx" - any color model of ["hcg", "hsv", "hsl", "hwb"]
convert.hsx2rgb([360..0, 100..0, 100..0]); // return [255..0, 255..0, 255..0]
convert.rgb2hsx([255..0, 255..0, 255..0]); // return [360..0, 100..0, 100..0]
convert.hsx2hsx([360..0, 100..0, 100..0]); // return [360..0, 100..0, 100..0]
```
