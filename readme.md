# HCG
> HCG (HCT) is a color model based on [HSV and HSL](https://en.wikipedia.org/wiki/HSL_and_HSV), designed with regard to [Munsell system](https://en.wikipedia.org/wiki/Munsell_color_system), which represents any color by mixing a pure tone with a shade of gray, which results in more intuitive way of picking colors and better mixing results.

<img src="/images/munsell.jpg?raw=true" alt="Munsell model" width="300">

### Color pickers
- [HCG color picker](http://acterhd.github.io/hcg-color/colorpicker/index.html) <br>
- [HCG color picker (Shadertoy)](https://www.shadertoy.com/view/ldK3Wh) <br>


### Info
HCG color model represents _Hue_, _Chroma_ and _Grays_ channels. The main idea behind the color space is to be able to change the shade of gray without affecting  saturation.

Unlike the HSV and HSL, HCG does only one mixing of a hue tones with a grayscale tones. In other words, that reflects the ratio between the pure tone and a neutral shade of gray, whereas HSL and HSV models describe how much the color is bright. In that, with HCG you can just pick a tone and change it’s lightness within all the available range for the constant chroma (see [demo](http://acterhd.github.io/hcg-color/colorpicker/index.html)), whereas in HSL changing the lightness causes shift of chroma, as the lightness spans from pure white to pure black.

##### HCG/HCT:
<img src="/images/figure1.png?raw=true" alt="HCG model" width="400">
<img src="/images/figure2.png?raw=true" alt="HCG model" width="400">

_Fact 1_. The _Chroma_ channel is descibed in the wikipedia [article on HSV and HSL](https://en.wikipedia.org/wiki/HSL_and_HSV#Hue_and_chroma) color spaces, but only used as an intermediate value for calculations.

_Fact 2_. If to draw a line from the black corner to the white corner in the color cube and build a cylinder based on the cube’s corners, that cylinder will represent the HCG model.

![Cube](/images/cube.png?raw=true "Cube")

##### Comparison of values:
![Conversions](/images/table2.png?raw=true "Conversions table")

### Reference
- [Wikipedia (HSV/HSL)](https://en.wikipedia.org/wiki/HSL_and_HSV)

### Convertors
- Original convertor in `convert/hcg.js`.

### Found clones
- https://github.com/siteroller/ColorRoller-MooTools-Color-Picker (HSG/HSW)

