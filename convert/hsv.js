// https://github.com/acterhd/hcg-color
// Made by acterhd, 2015-2016 year

(function () {
    'use strict';

    // RGB functions
    var rgb2hsv = (rgb) => {
        var [r, g, b] = [rgb[0] / 255, rgb[1] / 255, rgb[2] / 255];
        var [min, max] = [Math.min(r, g, b), Math.max(r, g, b)];
        var [h, c, v] = [0, max - min, max], s = c / v;
        if (c > 0) {
            switch (max) {
                case r: h = (g - b) / c + (g < b ? 6 : 0); break;
                case g: h = (b - r) / c + 2; break;
                case b: h = (r - g) / c + 4; break;
            }
            h /= 6;
        }
        return [h * 360, s * 100, v * 100];
    };

    var hsv2rgb = (hsv) => {
        var mod = (a, n) => ((a % n) + n) % n;
        var [h, s, v] = [hsv[0] / 60, hsv[1] / 100, hsv[2] / 100], c = s * v;
        var [q, m] = [c * (1 - Math.abs((h % 2) - 1)), v - c];
        var [md, arr] = [Math.floor(h) % 6, [c, q, 0, 0, q, c]];
        var [r, g, b] = [arr[mod(md, 6)], arr[mod(md - 2, 6)], arr[mod(md - 4, 6)]];
        return [(r + m) * 255, (g + m) * 255, (b + m) * 255];
    };

    // HSL
    var hsl2hsv = (hsl) => {
        var [s, l] = [hsl[1] / 100, hsl[2] / 50];
        s *= (l <= 1) ? l : 2 - l;
        var v = (l + s) / 2, sv = 0;
        if (l > 0) sv = (2 * s) / (l + s);
        return [hsl[0], sv * 100, v * 100];
    }

    var hsv2hsl = (hsv) => {
        var [s, v] = [hsv[1] / 100, hsv[2] / 100];
        var l = (2 - s) * v, sl = s * v; sl /= (l <= 1) ? l : 2 - l, sl = sl || 0;
        return [hsv[0], sl * 100, l * 50];
    };

    // HWB
    var hwb2hsv = (hwb) => {
        var [w, b] = [hwb[1] / 100, hwb[2] / 100];
        return [hwb[0], (1 - w / (1 - b)) * 100, (1 - b) * 100];
    }

    var hsv2hwb = (hsv) => {
        var [s, v] = [hsv[1] / 100, hsv[2] / 100];
        return [hsv[0], (1 - s) * v * 100, (1 - v) * 100];
    };

    // Exports
    var exports = this;

    // NodeJS support
    if (typeof module !== 'undefined') {
        exports = module.exports = {};
    }

    // RGB export
    exports.rgb2hsv = rgb2hsv;
    exports.hsv2rgb = hsv2rgb;

    // HSL export
    exports.hsl2hsv = hsl2hsv;
    exports.hsv2hsl = hsv2hsl;

    // HWB export
    exports.hwb2hsv = hwb2hsv;
    exports.hsv2hwb = hsv2hwb;

}).call(this);
