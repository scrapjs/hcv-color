// https://github.com/acterhd/hcg-color
// Made by acterhd, 2015-2016 year

(function () {
    'use strict';

    // RGB functions
    let rgb2hsv = (rgb) => {
        let [r, g, b] = [rgb[0] / 255, rgb[1] / 255, rgb[2] / 255];
        let [min, max] = [Math.min(r, g, b), Math.max(r, g, b)];
        let [h, c, v] = [0, max - min, max], s = c / v;
        if (c > 0) h = [(g - b) / c + (g < b ? 6 : 0), (b - r) / c + 2, (r - g) / c + 4][[r, g, b].indexOf(max)];
        return [h * 60, s * 100, v * 100];
    };

    let hsv2rgb = (hsv) => {
        let mod = (a, n) => ((a % n) + n) % n;
        let [h, s, v] = [hsv[0] / 60, hsv[1] / 100, hsv[2] / 100], c = s * v;
        let [q, m] = [c * (1 - Math.abs((h % 2) - 1)), v - c];
        let [md, arr] = [Math.floor(h) % 6, [c, q, 0, 0, q, c]];
        let [r, g, b] = [arr[mod(md, 6)], arr[mod(md - 2, 6)], arr[mod(md - 4, 6)]];
        return [(r + m) * 255, (g + m) * 255, (b + m) * 255];
    };

    // HSL
    let hsl2hsv = (hsl) => {
        let [s, l] = [hsl[1] / 100, hsl[2] / 50];
        s *= (l <= 1) ? l : 2 - l;
        let v = (l + s) / 2, sv = 0;
        if (l > 0) sv = (2 * s) / (l + s);
        return [hsl[0], sv * 100, v * 100];
    }

    let hsv2hsl = (hsv) => {
        let [s, v] = [hsv[1] / 100, hsv[2] / 100];
        let l = (2 - s) * v, sl = s * v; sl /= (l <= 1) ? l : 2 - l, sl = sl || 0;
        return [hsv[0], sl * 100, l * 50];
    };

    // HWB
    let hwb2hsv = (hwb) => {
        let [w, b] = [hwb[1] / 100, hwb[2] / 100];
        let cn = w + b >= 1, v = cn ? w/(w+b) : (1 - b), s = (cn || b >= 1) ? 0 : (1 - w / (1 - b));
        return [hwb[0], 100 * s, 100 * v];
    }

    let hsv2hwb = (hsv) => {
        let [s, v] = [hsv[1] / 100, hsv[2] / 100];
        return [hsv[0], (1 - s) * v * 100, (1 - v) * 100];
    };

    // Exports
    let exports = this;

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
