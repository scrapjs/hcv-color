// https://github.com/acterhd/hcg-color
// Made by acterhd, 2015-2016 year

(function () {
    'use strict';

    // RGB functions
    let rgb2hwb = (rgb) => {
        let [r, g, b] = [rgb[0] / 255, rgb[1] / 255, rgb[2] / 255];
        let [min, max] = [Math.min(r, g, b), Math.max(r, g, b)];
        let [h, c] = [0, max - min], w = Math.min(r, g, b), bl = 1 - Math.max(r, g, b);
        if (c > 0) h = [(g - b) / c + (g < b ? 6 : 0), (b - r) / c + 2, (r - g) / c + 4][[r, g, b].indexOf(max)];
    	return [h * 60, w * 100, bl * 100];
    };

    let hwb2rgb = (hwb) => {
        let mod = (a, n) => ((a % n) + n) % n;
        let [h, w, bl] = [hwb[0] / 60, hwb[1] / 100, hwb[2] / 100], c = (1 - w - bl);
        let [q, m] = [c * (1 - Math.abs((h % 2) - 1)), w];
        let [md, arr] = [Math.floor(h) % 6, [c, q, 0, 0, q, c]];
        let [r, g, b] = [arr[mod(md, 6)], arr[mod(md - 2, 6)], arr[mod(md - 4, 6)]];
        return [(r + m) * 255, (g + m) * 255, (b + m) * 255];
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
