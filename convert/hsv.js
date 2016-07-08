// https://github.com/acterhd/hcg-color
// Made by acterhd, 2015-2016 year

(function () {
    'use strict';

    let utils = require("./utils");

    // RGB functions
    let rgb2hsv = (rgb) => {
        let [r, g, b] = utils.mult(rgb, utils.rgbd);
        let [min, max] = [
            Math.min(r, g, b),
            Math.max(r, g, b)
        ];
        let [h, c, v] = [0, max - min, max], s = 0;
        if (v > 0) s = c / v;
        if (c > 0)
            h = [
                (g - b) / c + (g < b ? 6 : 0),
                (b - r) / c + 2,
                (r - g) / c + 4
            ][[r, g, b].indexOf(max)];
        return utils.mult([h, s, v], utils.hsxm);
    };

    let hsv2rgb = (hsv) => {
        let [h, s, v] = utils.mult(hsv, utils.hsxd);
        let c = s * v;
        let [q, m] = [
            c * (1 - Math.abs((h % 2) - 1)),
            v - c
        ];
        let [md, arr] = [
            utils.mod(Math.floor(h), 6),
            [c, q, 0, 0, q, c]
        ];
        let [r, g, b] = [
            arr[utils.mod(md, 6)],
            arr[utils.mod(md - 2, 6)],
            arr[utils.mod(md - 4, 6)]
        ];
        return utils.mult(utils.add([r, g, b], m), utils.rgbm);
    };

    // HSL
    let hsl2hsv = (hsl) => {
        let [s, l] = utils.mult([hsl[1], hsl[2] * 2], utils.sxd);
        s *= (l <= 1) ? l : 2 - l;
        let v = (l + s) / 2, sv = 0;
        if (l > 0) sv = (2 * s) / (l + s);
        return utils.mult([hsl[0], sv, v], utils.sxm);
    }

    let hsv2hsl = (hsv) => {
        let [s, v] = utils.mult([hsv[1], hsv[2]], utils.sxd);
        let l = (2 - s) * v, sl = s * v;
        sl /= (l <= 1) ? l : 2 - l;
        sl = sl || 0;
        return utils.mult([hsv[0], sl, l / 2], utils.sxm);
    };

    // HWB
    let hwb2hsv = (hwb) => {
        let [w, b] = utils.mult([hwb[1], hwb[2]], utils.sxd);
        let cn = w + b >= 1,
            v = cn ? w/(w+b) : (1 - b), s = 0;
        if(!cn && b < 1) s = (1 - w / (1 - b));
        return utils.mult([hwb[0], s, v], utils.sxm);
    }

    let hsv2hwb = (hsv) => {
        let [s, v] = utils.mult([hsv[1], hsv[2]], utils.sxd);
        let w = (1 - s) * v, bl = 1 - v;
        return utils.mult([hsv[0], w, bl], utils.sxm);
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
