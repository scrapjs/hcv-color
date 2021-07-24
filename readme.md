# HCV (color model)

> Color model [HCV](https://github.com/helixd2s/hcv-color/blob/master/convert/index.js) is an alternative to [HSV and HSL](https://en.wikipedia.org/wiki/HSL_and_HSV), derived by Munsell color system.

## Revision for 2021, rename to HCV finally

Formerly named as `HCG`, I decided to rename this color model as `HCV` (Hue, Chroma, Value). It should to help avoid confusion with `Human Chorionic Gonadotropin` terminology. Unfortunately, this will not completely eliminate the historical confusion. And many libraries are likely to keep their original name. Therefore, the color model will still retain the deprecated outdated name `HCG` as an alternative. 

## Revision for 2020 

### [Actual Repository](https://github.com/helixd2s/hcv-color)

I found new use cases for HCV in 2020 years... I will also provide corrections and descriptions. 


### Inverse your RGB color...

Normal RGB equal normal HCV conversion i.e. `H % 360deg, C (between 0.0 and 1.0), G (between 0.0 and 1.0)`.
But invert RGB equal to `(H + 180deg) % 360deg, C, 1.0 - G`. 
Why? Because minimal value of RGB inverts into maximal, maximal value of RGB inverts into minimal, but Chroma doesn't changing... 
About 180deg rotate, currently I don't want give any mathematical proof, but there is has known facts from internets (for example, here https://stackoverflow.com/questions/1165107/how-do-i-invert-a-colour). 


### Dark and light theme

When I watch that or such video (https://www.youtube.com/watch?v=qimopjP6YoM), I understand that HCV color space can be used for dark and light themes themes. The point is that HCV reference values can allow you to make correct dark and light themes, using offsets in the "G" channel. The higher, the lighter, and vice versa. In this case, the colored parts of the site will remain colored or close to that. 

```scss
.dark-theme {
  filter: invert(100%) hue-rotate(180deg);
  color: rgb(0, 0, 127);
  //color: rgb(127, 127, 255);
}

.light-theme {
  color: rgb(0, 0, 127);
}
```

Can be represented as... 

```scss
.light-theme {
  $mod: 0; /* dark font */
  color: hcv(240, 50, $mod);
}

.dark-theme {
  $mod: 100; /* light font */
  color: hcv(240, 50, $mod);
}
```

The HCV color model can play a key role in such dark and light themes as in a twitter post (https://twitter.com/steveschoger/status/1151160261170126850). 

## HCV (Article)

### Description
HCV - is HSV/HSL based color model. This color model use 3 channel: H, C, and G. Changing mixed gray color, instead of changing the brightness (luminance). This differs from the other color models, such as HSV and HSL.

### Behavior
The HCV color model is a relatively new color model standing next to RGB, HSV, HSL or HWB. It has its own distinctive features. The color model is represented by the mixing ratio of "H" (hue) and "G" (grayscale), where chromaticity depends on the "C" (chroma) channel. And how much higher the "C" value (chroma) is, so closer the color is to the pure value of hue. Lower "C" (chroma) values make the color gray and depend on the "G" channel. Unlike HSV, a color at a high "C" (chroma) value does not become black when the last channel (aka "G" channel) decreases, but changes only the mixed dominance value (e.g. whitish becomes darker and colored remains colored). There is also a difference from HSL where changing the "G" channel affects only grey tint, while hue and mixing ratio (channel "C", chroma) are preserved. However, conversion from RGB has its limitations. For example, absolutely chromatic values do not allow calculating the "G" channel (grayscale). Conversely, grayscale values (when R = G = B) do not allow to calculate "H" (hue).    

### Visualization
<img src="images/diagram.png" alt="#" height="200">

Figure 1. HCV diagram...

Color model HCV has shades of gray in the middle, while the hue shades are not shaded at the edges of the cylinder (like HSV). This means that the HCV relies still on the hue. This is useful when you want to change the mixed shade of gray, without changing the value saturation.

### TODO: Required More Visuals
For me needs time for more visualize examples and representations. Also needs theming example. 

### Simple conversion between HCV and RGB
The whole algorithm for obtaining RGB color that is similar to the mixed hue (pure RGB) with a shade of gray, as the blending coefficient used chroma. The expression `G * (1 - C)` is the minimum value of RGB, and the value of channel C (chroma) is the delta of the minimum and maximum values of RGB. For these and crosstalk can find the inverse of H, C and G of RGB. The full version of conversion from HCV to RGB and back is presented in `convert/index.js` file. Some simplifications have also been made. 

### More color model conversions 

There presented NOT all possible color models conversions, but in general I was presented. 
- https://github.com/helixd2s/hollow-color (author-made)
- https://github.com/helixd2s/hcv-color/blob/master/convert/index.js (original)
- https://github.com/Qix-/color-convert/blob/master/conversions.js (color-convert)
- https://github.com/colorjs/color-space/blob/master/hcg.js (color-space by colorjs)
- https://github.com/scijs/color-space
- https://github.com/Qix-/color-convert
- https://github.com/d3/d3-hcg
- https://github.com/satya164/pigment
- https://github.com/gka/chroma.js/

### Used in projects

- https://codepen.io/meodai/full/zdgXJj (color distribution visualization)
- https://farbvelo.elastiq.ch/ (color palette generator)
- https://github.com/abe33/atom-pigments 

### Conclusion?
This color model is fairly easy to learn, easy to implement and has a variety of applications. For example a color picker, or editing graphics. It may also help in the virtual vision.

### Reference
-	HSL and HSV (https://en.wikipedia.org/wiki/HSL_and_HSV)
-	Munsell color model (https://en.wikipedia.org/wiki/Munsell_color_system)
-	Github repository (https://github.com/helixd2s/hcg-color)

### Historical oversight or matrix glitch (2013)

Main remark - currently renamed as `HCV`. 

It is not known for certain who first came up with this color model. I only know that the idea of this color model came exactly in the same years as the author of MasterColorPicker (but I learned about it only much later). This oddity shows that this reality is clearly prone to matrix glitches. I thought for a long time whether it was worth writing about this in this document, and after many years I decided to restore this historical justice. List this project on a separate list (apart) as part of the sample collectible program.

- http://softmoon-webware.com/MasterColorPicker_instructions.php
- https://github.com/SoftMoonWebWare/MasterColorPicker

From my old email message... By MasterColorPicker author. 
```
I "invented" the HCG (Hue Chroma Gray) color model in 2012-2013 while
developing my MasterColorPicker JavaScript software package.  I was trying
to come up with a way to map/chart the "websafe" colors in a way that
related them, like I could not find elsewhere.  Some guy had come close (I
would have to do internet research now to remember who, and I am busy and
lazy at the moment) and introduced me to the idea that many of these
colors had the same Hue.  I arranged them on the map/chart a bit
differently, and came up with a circular (color wheel) representation.  I
strove to understand how to mathematically produce them and map them
computationally (on a JavaScript powered HTML5 canvas) rather than being
limited to a fixed size image that must be downloaded separately, looking
at other color models and color spaces and mapping their numerical values
over my visual map, trying to find correspondences.  Only when I looked at
the RGB values did I see said relationships.  I also looked at concepts
like color complements, split complements, and analogous colors.  I noted
that there were 6 sets of websafe colors that shared the same hue, defined
a complete triangle visually, and were complements and split complements.
 Out of that came the formulas to map the websafe colors.  Then I realized
I could use those formulas to create the HCG color space, and adjust the
density of colors computationally mapped onto the canvas, and also adjust
the "focal hue" on the map, and also the other full-triangle sets of hues,
and create a powerful color picker.  I call it the "RainbowMeistro
Harmonic Color Picker" because it helps a user choose colors with hues
that go together, with the same greyscale and chroma.  See:
SoftMoon-WebWare.com/MasterColorPicker_instructions.php
for the demo. (MasterColorPicker must be capitalized as such in the URL)

This package has been available on the internet on my website
(SoftMoon-WebWare.com) and on the JSClasses.com repository since 2013, two
years before you claim the Munsell-system created it.  There was also a
reference to the package on GitHub, and maybe even the HCG code in 2013,
but I had problems with GitHub's interface, and dropped it for a while.
Now it is back on GitHub (SoftMoonWebWare/MasterColorPicker)  It would be
nice if you could please give me proper credit, if you plan on being an
accurate source of info.  However, it has always seemed to me that this is
not a system I "invented", although a Google search years ago turned up
nothing relevant but my single web page.  It is just another was to
describe the RGB system.

I am currently working on further developing my MasterColorPicker project.
 Hope you like it.  Aloha!
```

### The investigation dragged on

This color model now raises more questions than answers. Many details were lost, other details remained only in the pictures in not the best quality. The true whole absolute truth can no longer be found. The investigation dragged on for 6 long years. And the idea as such has existed for about 8 years (at the time of writing these lines in the readme, `04.03.2021`). In the early years, there were attempts to get to the bottom of the truth, but in the end there were only hypotheses and theories (smells of REN-TV).
