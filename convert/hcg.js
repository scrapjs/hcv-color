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
        var mod = (a, n) => ((a % n) + n) % n;
        var [h, c, gr] = [hcg[0] / 60, hcg[1] / 100, hcg[2] / 100];
        if (c <= 0) return [gr * 255, gr * 255, gr * 255];
        var [q, m] = [c * (1 - Math.abs((h % 2) - 1)), (1 - c) * gr];
        var [md, arr] = [Math.floor(h) % 6, [c, q, 0, 0, q, c]];
        var [r, g, b] = [arr[mod(md, 6)], arr[mod(md - 2, 6)], arr[mod(md - 4, 6)]];
        return [(r + m) * 255, (g + m) * 255, (b + m) * 255];
    };

    // HSV functions
    var hcg2hsv = (hcg) => {
        var [c, g] = [hcg[1] / 100, hcg[2] / 100], v = c + g * (1 - c), s = 0;
        if (v > 0) s = c / v;
        return [hcg[0], s * 100, v * 100];
    };

    var hsv2hcg = (hsv) => {
        var [s, v] = [hsv[1] / 100, hsv[2] / 100], c = s * v, gr = 0;
        if (c < 1) gr = (v - c) / (1 - c);
        return [hsv[0], c * 100, gr * 100];
    };

    // HSL functions
    var hcg2hsl = (hcg) => {
        var [c, gr] = [hcg[1] / 100, hcg[2] / 100], l = gr * (1 - c) + 0.5 * c, s = 0;
        if (l > 0 && l < 1) s = c / (1 - Math.abs(2 * l - 1));
        return [hcg[0], s * 100, l * 100];
    };

    var hsl2hcg = (hsl) => {
        var [s, l] = [hsl[1] / 100, hsl[2] / 100], c = (1 - Math.abs(2 * l - 1)) * s, gr = 0;
        if (c < 1) gr = (l - 0.5 * c) / (1 - c);
        return [hsl[0], c * 100, gr * 100];
    };

    // HWB functions
    var hcg2hwb = (hcg) => {
        var [c, g] = [hcg[1] / 100, hcg[2] / 100], v = c + g * (1 - c);
        return [hcg[0], (v - c) * 100, (1 - v) * 100];
    };

    var hwb2hcg = (hwb) => {
        var [w, b] = [hwb[1] / 100, hwb[2] / 100];
        var v = 1 - b, c = v - w, g = 0;
        if (c < 1) g = (v - c) / (1 - c);
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
