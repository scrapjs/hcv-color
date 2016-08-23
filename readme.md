# HCG (color model)
> Color model [HCG](https://github.com/acterhd/hcg-color/blob/master/convert/hcg.js) is an alternative to [HSV and HSL](https://en.wikipedia.org/wiki/HSL_and_HSV), derived by Munsell color system.

## HCG (Article)

### Description
HCG - is HSV/HSL based color model. This color model use 3 channel: H, C, and G. Changing mixed gray color, instead of changing the brightness (luminance). This differs from the other color models, such as HSV and HSL.

### Behavior
Color model HCG has its own behavior. When you change the second channel (chroma), hue is mixed with a selected shade of gray (third channel). In this regard, there are some features in the conversion of RGB. If the C channel is set to 1, the G channel becomes undefined. If channel C is set to 0, the hue channel H is undefined. In this connection, RGB value must be chosen so that it was not a fully chromatic, nor completely achromatic.

### Motivation
This color model is set up to complement the set of color models such as HSB and HSL (and some other). This color model also reveals the essence of the color models, such as the value of the chroma. This color model solves the question: what kind of gray are mixed in the selected color shade, and how.

### Visualization
<img src="images/diagram.png" alt="#" height="200">

Figure 1. HCG diagram and visual shader

Color model HCG has shades of gray in the middle, while the hue shades are not shaded at the edges of the cylinder (like HSV). This means that the HCG relies still on the hue. This is useful when you want to change the mixed shade of gray, without changing the value saturation.

### Simple conversion between HCG and RGB

The whole algorithm for obtaining RGB color that is similar to the mixed hue (pure RGB) with a shade of gray, as the blending coefficient used chroma. The expression `G * (1 - C)` is the minimum value of RGB, and the value of channel C (chroma) is the delta of the minimum and maximum values of RGB. For these and crosstalk can find the inverse of H, C and G of RGB.

```c++
struct rgb {
	double r;
	double g;
	double b;
};

struct hcg {
	double h;
	double c;
	double g;
};

struct hsv {
	double h;
	double s;
	double v;
};

rgb hcg2rgb(hcg &HCG) {
	double h = fmod(HCG.h * 6.0, 6.0);
	double C = HCG.c;
	double X = C * (1.0 - abs(fmod(h, 2.0) - 1.0));
	rgb pRGB;
	if (h < 1.0) { pRGB.r = C; pRGB.g = X; pRGB.b = 0; } else
	if (h < 2.0) { pRGB.r = X; pRGB.g = C; pRGB.b = 0; } else
	if (h < 3.0) { pRGB.r = 0; pRGB.g = C; pRGB.b = X; } else
	if (h < 4.0) { pRGB.r = 0; pRGB.g = X; pRGB.b = C; } else
	if (h < 5.0) { pRGB.r = X; pRGB.g = 0; pRGB.b = C; } else
	             { pRGB.r = C; pRGB.g = 0; pRGB.b = X; }
	double m = HCG.g * (1.0 - HCG.c);
	rgb RGB;
	RGB.r = pRGB.r + m;
	RGB.g = pRGB.g + m;
	RGB.b = pRGB.b + m;
	return RGB;
}

hcg rgb2hcg(rgb &RGB) {
	double m = fmin(RGB.r, fmin(RGB.g, RGB.b));
	double M = fmax(RGB.r, fmax(RGB.g, RGB.b));
	double C = M - m, h = 0.0, G = 0.0;
	if (C > 0.0) {
		if (M == RGB.r) {
			h = (RGB.g - RGB.b) / C + (RGB.b > RGB.g ? 6.0 : 0.0);
		}
		else if (M == RGB.g) {
			h = (RGB.b - RGB.r) / C + 2.0;
		}
		else {
			h = (RGB.r - RGB.g) / C + 4.0;
		}
	}
	if (C < 1.0) {
		G = m / (1 - C);
	}
	hcg HCG;
	HCG.h = h / 6.0;
	HCG.c = C;
	HCG.g = G;
	return HCG;
}

hcg hsv2hcg(hsv &HSV) {
	hcg HCG;
	HCG.h = HSV.h;
	HCG.c = HSV.s * HSV.v;
	HCG.g = (HSV.v - HCG.c) / (1.0 - HCG.c);
	return HCG;
}

hsv hcg2hsv(hcg &HCG) {
	hsv HSV;
	HSV.h = HCG.h;
	HSV.v = HCG.c + HCG.g * (1.0 - HCG.c);
	HSV.s = HCG.c / HSV.v;
	return HSV;
}
```

### Conclusion
This color model is fairly easy to learn, easy to implement and has a variety of applications. For example a color picker, or editing graphics. It may also help in the virtual vision.

### Reference
-	HSL and HSV (https://en.wikipedia.org/wiki/HSL_and_HSV)
-	Munsell color model (https://en.wikipedia.org/wiki/Munsell_color_system)
-	Github repository (https://github.com/acterhd/hcg-color)


----------
## HCG (support)

### Demonstration and calculators

Here I will publish only own or known works with HCG.

+ Visualized [HCG cylinder](https://plot.ly/~acterhd/8/)
+ Shadertoy visual demo of [HCG](https://www.shadertoy.com/view/ltSXRV), [HSL](https://www.shadertoy.com/view/XtjXRK), [HSV](https://www.shadertoy.com/view/4dVXDd), [Color Picker](https://www.shadertoy.com/view/ldK3Wh)

----------

## Contributors and thanks

- acterhd (acterhd@gmail.com) - Author
