# HCG (color model)
> Color model [HCG](https://github.com/acterhd/hcg-color/blob/master/convert/hcg.js) is an alternative to [HSV and HSL](https://en.wikipedia.org/wiki/HSL_and_HSV), derived by Munsell color system.

<img src="/images/figure1.png?raw=true" alt="HCG model" width="300">
<img src="/images/figure2.png?raw=true" alt="HCG model" width="300">

### Description
Unlike the others, it adjusts the color hue and shade of gray. The HCG can change the whitish-yellow to grayish-yellow in just one shift slider. Changing channels HCG (channel "G") does not affect the brightness of a color shade HSV and HSL, but only changes the brightness of the mixed color of gray. Channel "C" is the coefficient of color, chromatic color depends on it.

### Motivation
The color model describes how a color can be color. For example. Either he is pure red, or admixed with gray shades. Either he is completely gray. Other color models can be said as far as he is light as it is dark, and so on, while the HCG can be described as pure color. Because of this difference can be derived pure colors and mixed a shade of gray.

### Convertors

+ Original convertor in [`./convert/hcg.js`](https://github.com/acterhd/hcg-color/blob/master/convert/hcg.js).
+ Converter https://github.com/scijs/color-space
+ Converter https://github.com/Qix-/color-convert
+ Plugin for D3 https://github.com/d3/d3-hcg
+ Converter https://github.com/satya164/pigment
+ Plug-in for Less https://github.com/acterhd/less-hcg
+ Atom Editor (plugin) https://github.com/abe33/atom-pigments

### Demonstration and calculators

+ I visualized [HCG cylinder](https://plot.ly/~acterhd/8/)
+ Shadertoy visual demo of [HCG](https://www.shadertoy.com/view/ltSXRV), [HSL](https://www.shadertoy.com/view/XtjXRK), [HSV](https://www.shadertoy.com/view/4dVXDd), [Color Picker](https://www.shadertoy.com/view/ldK3Wh)
+ You can try HCG converter https://tonicdev.com/npm/hcg-color

### Install by npm

```
npm install hcg-color
```

Here is npm module: [hcg-color](https://www.npmjs.com/package/hcg-color)

### API

Coming soon new API. 
