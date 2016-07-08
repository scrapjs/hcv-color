// https://github.com/acterhd/hcg-color
// Made by acterhd, 2015-2016 year

(function () {
    'use strict';

    let utils = require("./utils");

    // RGB functions
    let rgb2hwb = (rgb) => {
        let [r, g, b] = utils.mult(rgb, utils.rgbd);
        let [min, max] = [
            Math.min(r, g, b),
            Math.max(r, g, b)
        ];
        let [h, c] = [
            0,
            max - min
        ];
        let w = Math.min(r, g, b);
        let bl = 1 - Math.max(r, g, b);
        if (c > 0)
            h = [
                (g - b) / c + (g < b ? 6 : 0),
                (b - r) / c + 2,
                (r - g) / c + 4
            ][[r, g, b].indexOf(max)];
        return utils.mult([h, w, bl], utils.hsxm);
    };

    let hwb2rgb = (hwb) => {
        let [h, w, bl] = utils.mult(hwb, utils.hsxd);
        let ra = w + bl;
        if (ra > 1) {
            w /= ra;
            bl /= ra;
        }
        let c = 1 - w - bl;
        let [q, m] = [
            c * (1 - Math.abs((h % 2) - 1)),
            w
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

    // Exports
    let exports = this;

    // NodeJS support
    if (typeof module !== 'undefined') {
        exports = module.exports = {};
    }

    // RGB export
    exports.rgb2hwb = rgb2hwb;
    exports.hwb2rgb = hwb2rgb;

}).call(this);
