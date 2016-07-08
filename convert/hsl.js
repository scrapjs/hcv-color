// https://github.com/acterhd/hcg-color
// Made by acterhd, 2015-2016 year

(function () {
    'use strict';

    let utils = require("./utils");

    // RGB functions
    let rgb2hsl = (rgb) => {
        let [r, g, b] = utils.mult(rgb, utils.rgbd);
        let [min, max] = [
            Math.min(r, g, b),
            Math.max(r, g, b)
        ];
        let [h, c] = [0, max - min];
        let l = (min + max) / 2, s = 0;
        if (l > 0 && l < 1) s = c / (1 - Math.abs(2 * l - 1));
        if (c > 0)
            h = [
                (g - b) / c + (g < b ? 6 : 0),
                (b - r) / c + 2,
                (r - g) / c + 4
            ][[r, g, b].indexOf(max)];
        return utils.mult([h, s, l], utils.hsxm);
    };

    let hsl2rgb = (hsl) => {
        let [h, s, l] = utils.mult(hsl, utils.hsxd);
        let c = (1 - Math.abs(2 * l - 1)) * s;
        let [q, m] = [
            c * (1 - Math.abs((h % 2) - 1)),
            l - c / 2
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

    // Exports
    let exports = this;

    // NodeJS support
    if (typeof module !== 'undefined') {
        exports = module.exports = {};
    }

    // RGB export
    exports.rgb2hsl = rgb2hsl;
    exports.hsl2rgb = hsl2rgb;

}).call(this);
