# HCG (color model)
> Color model HCG is an alternative to [HSV and HSL](https://en.wikipedia.org/wiki/HSL_and_HSV), derived by Munsell color system.

<img src="/images/figure1.png?raw=true" alt="HCG model" width="300">
<img src="/images/figure2.png?raw=true" alt="HCG model" width="300">

### Description
Unlike the others, it adjusts the color hue and shade of gray. The HCG can change the whitish-yellow to grayish-yellow in just one shift slider. Changing channels HCG (channel "G") does not affect the brightness of a color shade HSV and HSL, but only changes the brightness of the mixed color of gray. Channel "C" is the coefficient of color, chromatic color depends on it.

### Motivation
The color model describes how a color can be color. For example. Either he is pure red, or admixed with gray shades. Either he is completely gray. Other color models can be said as far as he is light as it is dark, and so on, while the HCG can be described as pure color. Because of this difference can be derived pure colors and mixed a shade of gray.

### Websites

+ [Official webpage](http://acterhd.github.io/hcg-color/)

### Convertors

+ Original convertor in [`./convert/hcg.js`](https://github.com/acterhd/hcg-color/blob/master/convert/hcg.js).
+ Converter https://github.com/scijs/color-space
+ Converter https://github.com/Qix-/color-convert
+ Plugin for D3 https://github.com/d3/d3-hcg

### Demonstration and calculators

+ Shadertoy visual demo of [HCG](https://www.shadertoy.com/view/ltSXRV), [HSL](https://www.shadertoy.com/view/XtjXRK), [HSV](https://www.shadertoy.com/view/4dVXDd), [Color Picker](https://www.shadertoy.com/view/ldK3Wh)
+ You can try HCG converter https://tonicdev.com/npm/hcg-color
+ You can try color picker in [official webpage](http://acterhd.github.io/hcg-color/)

### Install by npm

```
npm install hcg-color
```

Here is npm module: [hcg-color](https://www.npmjs.com/package/hcg-color)

### Where is located converter?

Here is main library [`./convert/hcg.js`](https://github.com/acterhd/hcg-color/blob/master/convert/hcg.js)

### Can you simplify?

HSV and HSL will later, but now you can found in [JS file](https://github.com/acterhd/hcg-color/blob/master/convert/hcg.js). 

```
//Hue conversions
/////////////////

func rgb2hue (rgb, c, M)
  if c == 0
    return 0

  if M == rgb[0]
    return ((rgb[1] - rgb[2]) / c) % 6
  if M == rgb[1]
    return (rgb[2] - rgb[0]) / c + 2
  if M == rgb[2]
    return (rgb[0] - rgb[1]) / c + 4

  return 0



func hue2rgb (hue6, c)
  x = c * (1 - Math.abs(hue6 % 2 - 1))
  if (0 <= hue6) return [c, x, 0]
  if (1 <= hue6) return [x, c, 0]
  if (2 <= hue6) return [0, c, x]
  if (3 <= hue6) return [0, x, c]
  if (4 <= hue6) return [x, 0, c]
  if (5 <= hue6) return [c, 0, x]
  return [0, 0, 0]



//RGB and HCG conversions
/////////////////////////


//rgb should be in [0..1]
func rgb2hcg (rgb)
  var h, c, g
  var M, m

  m = min(rgb[0], rgb[1], rgb[2])
  M = max(rgb[0], rgb[1], rgb[2])
  c = M - m
  h = rgb2hue(rgb, c, M)
  g = m / (1 - c)

  return [h, c, g]



//first channel should be in [0..6], another two in [0..1]
func hcg2rgb (hcg)
  var rgbp = hue2rgb(hcg[0], hcg[1])
  var m = hcg[2] * (1 - hcg[1])
  return [rgbp[0] + m, rgbp[1] + m, rgbp[2] + m]
```
