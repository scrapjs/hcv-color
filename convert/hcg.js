// https://github.com/acterhd/hcg-color
// Made by acterhd, 2015-2016 year

(function () {
    'use strict';

    // RGB functions
    var rgb2hcg = (rgb) => {
        var [r, g, b] = [rgb[0] / 255, rgb[1] / 255, rgb[2] / 255];
        var [min, max] = [Math.min(r, g, b), Math.max(r, g, b)];
        var [h, c, gr] = [0, max - min, 0];
        if (c < 1) gr = min / (1 - c);
        if (c > 0) {
            switch (max) {
                case r: h = (g - b) / c + (g < b ? 6 : 0); break;
                case g: h = (b - r) / c + 2; break;
                case b: h = (r - g) / c + 4; break;
            }
            h /= 6;
        }
        return [h * 360, c * 100, gr * 100];
    };

    var hcg2rgb = (hcg) => {
        var modf = (a, n) => ((a % n) + n) % n;
        var [h, c, gr] = [hcg[0] / 60, hcg[1] / 100, hcg[2] / 100];
        if (c <= 0) return [gr * 255, gr * 255, gr * 255];
        var [q, m] = [c * (1 - Math.abs((h % 2) - 1)), (1 - c) * gr];
        var [mod, arr] = [Math.floor(h) % 6, [c, q, 0, 0, q, c]];
        var [r, g, b] = [arr[modf(mod, 6)], arr[modf(mod - 2, 6)], arr[modf(mod - 4, 6)]];
        return [(r + m) * 255, (g + m) * 255, (b + m) * 255];
    };

    // HSV functions
    var hcg2hsv = (hcg) => {
        var c = hcg[1] / 100,
            g = hcg[2] / 100;
        var v = c + g * (1 - c), res;
        if (v > 0) {
            var f = c / v;
            res = [hcg[0], f * 100, v * 100];
        } else {
            res = [hcg[0], 0, v * 100];
        }
        return res;
    };

    var hsv2hcg = (hsv) => {
        var s = hsv[1] / 100,
            v = hsv[2] / 100;
        var c = s * v, res;
        if (c < 1) {
            var f = (v - c) / (1 - c);
            res = [hsv[0], c * 100, f * 100];
        } else {
            res = [hsv[0], c * 100, 0];
        }
        return res;
    };

    // HSL functions
    var hcg2hsl = (hcg) => {
        var c = hcg[1] / 100,
            g = hcg[2] / 100;
        var l = g * (1 - c) + 0.5 * c, s = 0;
        if (l < 1 && l > 0) {
            if (l < 0.5) {
                s = c / (2 * l);
            } else {
                s = c / (2 * (1 - l));
            }
        }
        return [hcg[0], s * 100, l * 100];
    };

    var hsl2hcg = (hsl) => {
        var s = hsl[1] / 100,
            l = hsl[2] / 100;
        var c = 0, res;
        if (l < 0.5) {
            c = 2 * s * l;
        } else {
            c = 2 * s * (1 - l);
        }
        if (c < 1) {
            var f = (l - 0.5 * c) / (1 - c);
            res = [hsl[0], c * 100, f * 100];
        } else {
            res = [hsl[0], c * 100, 0];
        }
        return res;
    };

    // HWB functions
    var hcg2hwb = (hcg) => {
        var c = hcg[1] / 100,
            g = hcg[2] / 100;
        var v = c + g * (1 - c);
        return [hcg[0], (v - c) * 100, (1 - v) * 100];
    };

    var hwb2hcg = (hwb) => {
        var w = hwb[1] / 100,
            b = hwb[2] / 100;
        var v = 1 - b,
            c = v - w,
            g = 0;
        if (c < 1) {
            g = (v - c) / (1 - c);
        }
        return [hwb[0], c * 100, g * 100];
    };

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
