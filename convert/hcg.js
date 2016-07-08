// https://github.com/acterhd/hcg-color
// Made by acterhd, 2015-2016 year

(function () {
    'use strict';

    let utils = require("./utils");

    // RGB functions
    let rgb2hcg = (rgb) => {
        let [r, g, b] = utils.mult(rgb, utils.rgbd);
        let [min, max] = [
            Math.min(r, g, b),
            Math.max(r, g, b)
        ];
        let [h, gr, c] = [0, 0, max - min];
        if (c < 1)
            gr = min / (1 - c);
        if (c > 0)
            h = [
                (g - b) / c + (g < b ? 6 : 0),
                (b - r) / c + 2,
                (r - g) / c + 4
            ][[r, g, b].indexOf(max)];
        return utils.mult([h, c, gr], utils.hsxm);
    };

    let hcg2rgb = (hcg) => {
        let [h, c, gr] = utils.mult(hcg, utils.hsxd);
        if (c <= 0)
            return utils.mult([0, 0, 0].fill(gr), utils.rgbm);
        let [q, m] = [
            c * (1 - Math.abs((h % 2) - 1)),
            (1 - c) * gr
        ];
        let [md, arr] = [
            Math.floor(h) % 6,
            [c, q, 0, 0, q, c]
        ];
        let [r, g, b] = [
            arr[utils.mod(md, 6)],
            arr[utils.mod(md - 2, 6)],
            arr[utils.mod(md - 4, 6)]
        ];
        return utils.mult(utils.add([r, g, b], m), utils.rgbm);
    };

    // HSV functions
    let hcg2hsv = (hcg) => {
        let [c, g] = utils.mult([hcg[1], hcg[2]], utils.sxd);
        let v = c + g * (1 - c), s = 0;
        if (v > 0) s = c / v;
        return utils.mult([hcg[0], s, v], utils.sxm);
    };

    let hsv2hcg = (hsv) => {
        let [s, v] = utils.mult([hsv[1], hsv[2]], utils.sxd);
        let c = s * v, gr = 0;
        if (c < 1) gr = (v - c) / (1 - c);
        return utils.mult([hsv[0], c, gr], utils.sxm);
    };

    // HSL functions
    let hcg2hsl = (hcg) => {
        let [c, gr] = utils.mult([hcg[1], hcg[2]], utils.sxd);
        let l = gr * (1 - c) + 0.5 * c, s = 0;
        if (l > 0 && l < 1) s = c / (1 - Math.abs(2 * l - 1));
        return utils.mult([hcg[0], s, l], utils.sxm);
    };

    let hsl2hcg = (hsl) => {
        let [s, l] = utils.mult([hsl[1], hsl[2]], utils.sxd);
        let c = (1 - Math.abs(2 * l - 1)) * s, gr = 0;
        if (c < 1) gr = (l - 0.5 * c) / (1 - c);
        return utils.mult([hsl[0], c, gr], utils.sxm);
    };

    // HWB functions
    let hcg2hwb = (hcg) => {
        let [c, g] = utils.mult([hcg[1], hcg[2]], utils.sxd);
        let v = c + g * (1 - c);
        return utils.mult([hcg[0], (v - c), (1 - v)], utils.sxm);
    };

    let hwb2hcg = (hwb) => {
        let [w, b] = utils.mult([hwb[1], hwb[2]], utils.sxd);
        let r = w + b;
        if (r >= 1) {
            w /= r;
            b /= r;
        }
        let c = 1 - b - w, g = 0;
        if (c < 1) g = w / (1 - c);
        return utils.mult([hwb[0], c, g], utils.sxm);
    };

    // Exports
    let exports = this;

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
