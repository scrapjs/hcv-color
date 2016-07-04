// https://github.com/acterhd/hcg-color
// Made by acterhd, 2015-2016 year

(function () {
    'use strict';

    // RGB functions
    function rgb2hcg(rgb) {
        var r = rgb[0] / 255,
            g = rgb[1] / 255,
            b = rgb[2] / 255;
        var max = Math.max(r, g, b),
            min = Math.min(r, g, b),
            c = (max - min),
            gr = 0,
            h = 0;
        if (c < 1) { gr = min / (1 - c); }
        if (c > 0) {
            switch (max) {
                case r: h = (g - b) / c + (g < b ? 6 : 0); break;
                case g: h = (b - r) / c + 2; break;
                case b: h = (r - g) / c + 4; break;
            }
            h /= 6;
        }
        return [h * 360, c * 100, gr * 100];
    }

    function hcg2rgb(hcg) {
        var h  = hcg[0] / 360 * 6,
            c  = hcg[1] / 100,
            gr = hcg[2] / 100;
        if (c === 0.0) {
            return [gr * 255, gr * 255, gr * 255];
        }
        var i = Math.floor(h),
            f = h - i,
            p = 0,
            q = c * (1 - f),
            t = c * f,
            mod = i % 6,
            r = [c, q, p, p, t, c][mod],
            g = [t, c, c, q, p, p][mod],
            b = [p, p, t, c, c, q][mod],
            m = (1 - c) * gr;
        return [
            (r + m) * 255,
            (g + m) * 255,
            (b + m) * 255
        ];
    }

    // HSV functions
    function hcg2hsv(hcg) {
        var c = hcg[1] / 100,
            g = hcg[2] / 100;
        var v = c + g * (1.0 - c), res;
        if (v > 0.0) {
            var f = c / v;
            res = [hcg[0], f * 100, v * 100];
        } else {
            res = [hcg[0], 0, v * 100];
        }
        return res;
    }

    function hsv2hcg(hsv) {
        var s = hsv[1] / 100,
            v = hsv[2] / 100;
        var c = s * v, res;
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
        var c = hcg[1] / 100,
            g = hcg[2] / 100;
        var l = g * (1.0 - c) + 0.5 * c, s = 0;
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
        var s = hsl[1] / 100,
            l = hsl[2] / 100;
        var c = 0, res;
        if (l < 0.5) {
            c = 2.0 * s * l;
        } else {
            c = 2.0 * s * (1.0 - l);
        }
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
        var c = hcg[1] / 100,
            g = hcg[2] / 100;
        var v = c + g * (1.0 - c);
        return [hcg[0], (v - c) * 100, (1 - v) * 100];
    }

    function hwb2hcg(hwb) {
        var w = hwb[1] / 100,
            b = hwb[2] / 100;
        var v = 1 - b,
            c = v - w,
            g = 0;
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
