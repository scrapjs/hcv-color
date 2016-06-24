// Made by acterhd, 2015-2016 year

(function () {
    'use strict';

    // Utility
    function mod(a, n) {
        return ((a % n) + n) % n;
    }

    // RGB functions
    function rgb2hcg(rgb) {
        var r = rgb[0] / 255;
        var g = rgb[1] / 255;
        var b = rgb[2] / 255;
        var max = Math.max(Math.max(r, g), b);
        var min = Math.min(Math.min(r, g), b);
        var chroma = (max - min);
        var grayscale;
        var hue;
        if (chroma < 1) {
            grayscale = min / (1 - chroma);
        } else {
            grayscale = 0;
        }
        if (chroma > 0) {
            if (max === r) {
                hue = mod((g - b) / chroma, 6);
            } else
                if (max === g) {
                    hue = 2 + (b - r) / chroma;
                } else {
                    hue = 4 + (r - g) / chroma;
                }
            hue /= 6;
            hue = mod(hue, 1);
        } else {
            hue = 0;
        }
        return [hue * 360, chroma * 100, grayscale * 100];
    }

    function hcg2rgb(hcg) {
        var h = hcg[0] / 360;
        var c = hcg[1] / 100;
        var g = hcg[2] / 100;
        if (c === 0.0) {
            return [g * 255, g * 255, g * 255];
        }
        var hi = mod(h, 1) * 6;
        var v = mod(hi, 1);
        var pure = [0, 0, 0];
        var w = 1 - v;
        switch (Math.floor(hi)) {
            case 0:
                pure[0] = 1; pure[1] = v; pure[2] = 0; break;
            case 1:
                pure[0] = w; pure[1] = 1; pure[2] = 0; break;
            case 2:
                pure[0] = 0; pure[1] = 1; pure[2] = v; break;
            case 3:
                pure[0] = 0; pure[1] = w; pure[2] = 1; break;
            case 4:
                pure[0] = v; pure[1] = 0; pure[2] = 1; break;
            default:
                pure[0] = 1; pure[1] = 0; pure[2] = w;
        }
        var mg = (1.0 - c) * g;
        var rgb = [
            (c * pure[0] + mg) * 255,
            (c * pure[1] + mg) * 255,
            (c * pure[2] + mg) * 255
        ];
        return rgb;
    }

    // HSV functions
    function hcg2hsv(hcg) {
        var c = hcg[1] / 100;
        var g = hcg[2] / 100;
        var v = c + g * (1.0 - c);
        var res;
        if (v > 0.0) {
            var f = c / v;
            res = [hcg[0], f * 100, v * 100];
        } else {
            res = [hcg[0], 0, v * 100];
        }
        return res;
    }

    function hsv2hcg(hsv) {
        var s = hsv[1] / 100;
        var v = hsv[2] / 100;
        var c = s * v;
        var res;
        if (c < 1.0) {
            var f = (v - c) / (1 - c);
            res = [hsv[0], c * 100, f * 100];
        } else {
            res = [hsv[0], c * 100, 0];
        }
        return res;
    }

    // HSL functions
    function hcg2hsl(hcg) {
        var c = hcg[1] / 100;
        var g = hcg[2] / 100;
        var l = g * (1.0 - c) + 0.5 * c;
        var s = 0;
        if (l < 1.0 && l > 0.0) {
            if (l < 0.5) {
                s = c / (2 * l);
            } else {
                s = c / (2 * (1 - l));
            }
        }
        return [hcg[0], s * 100, l * 100];
    }

    function hsl2hcg(hsl) {
        var s = hsl[1] / 100;
        var l = hsl[2] / 100;
        var c = 0;
        if (l < 0.5) {
            c = 2.0 * s * l;
        } else {
            c = 2.0 * s * (1.0 - l);
        }
        var res;
        if (c < 1.0) {
            var f = (l - 0.5 * c) / (1.0 - c);
            res = [hsl[0], c * 100, f * 100];
        } else {
            res = [hsl[0], c * 100, 0];
        }
        return res;
    }

    // HWB functions
    function hcg2hwb(hcg) {
        var c = hcg[1] / 100;
        var g = hcg[2] / 100;
        var v = c + g * (1.0 - c);
        return [hcg[0], (v - c) * 100, (1 - v) * 100];
    }

    function hwb2hcg(hwb) {
        var w = hwb[1] / 100;
        var b = hwb[2] / 100;
        var v = 1 - b;
        var c = v - w;
        var g = 0;
        if (c < 1) {
            g = (v - c) / (1 - c);
        }
        return [hwb[0], c * 100, g * 100];
    }

    // Exports
    var exports = this;

    // NodeJS support
    if (typeof module !== 'undefined') {
        exports = module.exports = {};
    }

    // RGB export
    exports.rgb2hcg = rgb2hcg;
    exports.hcg2rgb = hcg2rgb;

    // HSV export
    exports.hsv2hcg = hsv2hcg;
    exports.hcg2hsv = hcg2hsv;

    // HSL export
    exports.hsl2hcg = hsl2hcg;
    exports.hcg2hsl = hcg2hsl;

    // HWB export
    exports.hwb2hcg = hwb2hcg;
    exports.hcg2hwb = hcg2hwb;
}).call(this);
