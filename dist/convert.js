(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// https://github.com/acterhd/hcg-color
// Made by acterhd, 2015-2016 year

(function () {
    'use strict';

    let utils = require("./utils");

    // RGB functions
    let rgb2hcg = rgb => {
        let [r, g, b] = utils.mult(rgb, utils.rgbd);
        let [min, max] = [Math.min(r, g, b), Math.max(r, g, b)];
        let [h, gr, c] = [0, 0, max - min];
        if (c < 1) gr = min / (1 - c);
        if (c > 0) h = [(g - b) / c + (g < b ? 6 : 0), (b - r) / c + 2, (r - g) / c + 4][[r, g, b].indexOf(max)];
        return utils.mult([h, c, gr], utils.hsxm);
    };

    let hcg2rgb = hcg => {
        let [h, c, gr] = utils.mult(hcg, utils.hsxd);
        if (c <= 0) return utils.mult([0, 0, 0].fill(gr), utils.rgbm);
        let [q, m] = [c * (1 - Math.abs(h % 2 - 1)), (1 - c) * gr];
        let [md, arr] = [utils.mod(Math.floor(h), 6), [c, q, 0, 0, q, c]];
        let [r, g, b] = [arr[utils.mod(md, 6)], arr[utils.mod(md - 2, 6)], arr[utils.mod(md - 4, 6)]];
        return utils.mult(utils.add([r, g, b], m), utils.rgbm);
    };

    // HSV functions
    let hcg2hsv = hcg => {
        let [c, g] = utils.mult([hcg[1], hcg[2]], utils.sxd);
        let v = c + g * (1 - c),
            s = 0;
        if (v > 0) s = c / v;
        return utils.mult([hcg[0], s, v], utils.sxm);
    };

    let hsv2hcg = hsv => {
        let [s, v] = utils.mult([hsv[1], hsv[2]], utils.sxd);
        let c = s * v,
            gr = 0;
        if (c < 1) gr = (v - c) / (1 - c);
        return utils.mult([hsv[0], c, gr], utils.sxm);
    };

    // HSL functions
    let hcg2hsl = hcg => {
        let [c, gr] = utils.mult([hcg[1], hcg[2]], utils.sxd);
        let l = gr * (1 - c) + 0.5 * c,
            s = 0;
        if (l > 0 && l < 1) s = c / (1 - Math.abs(2 * l - 1));
        return utils.mult([hcg[0], s, l], utils.sxm);
    };

    let hsl2hcg = hsl => {
        let [s, l] = utils.mult([hsl[1], hsl[2]], utils.sxd);
        let c = (1 - Math.abs(2 * l - 1)) * s,
            gr = 0;
        if (c < 1) gr = (l - 0.5 * c) / (1 - c);
        return utils.mult([hsl[0], c, gr], utils.sxm);
    };

    // HWB functions
    let hcg2hwb = hcg => {
        let [c, g] = utils.mult([hcg[1], hcg[2]], utils.sxd);
        let v = c + g * (1 - c);
        return utils.mult([hcg[0], v - c, 1 - v], utils.sxm);
    };

    let hwb2hcg = hwb => {
        let [w, b] = utils.mult([hwb[1], hwb[2]], utils.sxd);
        let r = w + b;
        if (r >= 1) {
            w /= r;
            b /= r;
        }
        let c = 1 - b - w,
            g = 0;
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

},{"./utils":6}],2:[function(require,module,exports){
// https://github.com/acterhd/hcg-color
// Made by acterhd, 2015-2016 year

(function () {
    'use strict';

    let utils = require("./utils");

    // RGB functions
    let rgb2hsl = rgb => {
        let [r, g, b] = utils.mult(rgb, utils.rgbd);
        let [min, max] = [Math.min(r, g, b), Math.max(r, g, b)];
        let [h, c] = [0, max - min];
        let l = (min + max) / 2,
            s = 0;
        if (l > 0 && l < 1) s = c / (1 - Math.abs(2 * l - 1));
        if (c > 0) h = [(g - b) / c + (g < b ? 6 : 0), (b - r) / c + 2, (r - g) / c + 4][[r, g, b].indexOf(max)];
        return utils.mult([h, s, l], utils.hsxm);
    };

    let hsl2rgb = hsl => {
        let [h, s, l] = utils.mult(hsl, utils.hsxd);
        let c = (1 - Math.abs(2 * l - 1)) * s;
        let [q, m] = [c * (1 - Math.abs(h % 2 - 1)), l - c / 2];
        let [md, arr] = [utils.mod(Math.floor(h), 6), [c, q, 0, 0, q, c]];
        let [r, g, b] = [arr[utils.mod(md, 6)], arr[utils.mod(md - 2, 6)], arr[utils.mod(md - 4, 6)]];
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

},{"./utils":6}],3:[function(require,module,exports){
// https://github.com/acterhd/hcg-color
// Made by acterhd, 2015-2016 year

(function () {
    'use strict';

    let utils = require("./utils");

    // RGB functions
    let rgb2hsv = rgb => {
        let [r, g, b] = utils.mult(rgb, utils.rgbd);
        let [min, max] = [Math.min(r, g, b), Math.max(r, g, b)];
        let [h, c, v] = [0, max - min, max],
            s = 0;
        if (v > 0) s = c / v;
        if (c > 0) h = [(g - b) / c + (g < b ? 6 : 0), (b - r) / c + 2, (r - g) / c + 4][[r, g, b].indexOf(max)];
        return utils.mult([h, s, v], utils.hsxm);
    };

    let hsv2rgb = hsv => {
        let [h, s, v] = utils.mult(hsv, utils.hsxd);
        let c = s * v;
        let [q, m] = [c * (1 - Math.abs(h % 2 - 1)), v - c];
        let [md, arr] = [utils.mod(Math.floor(h), 6), [c, q, 0, 0, q, c]];
        let [r, g, b] = [arr[utils.mod(md, 6)], arr[utils.mod(md - 2, 6)], arr[utils.mod(md - 4, 6)]];
        return utils.mult(utils.add([r, g, b], m), utils.rgbm);
    };

    // HSL
    let hsl2hsv = hsl => {
        let [s, l] = utils.mult([hsl[1], hsl[2] * 2], utils.sxd);
        s *= l <= 1 ? l : 2 - l;
        let v = (l + s) / 2,
            sv = 0;
        if (l > 0) sv = 2 * s / (l + s);
        return utils.mult([hsl[0], sv, v], utils.sxm);
    };

    let hsv2hsl = hsv => {
        let [s, v] = utils.mult([hsv[1], hsv[2]], utils.sxd);
        let l = (2 - s) * v,
            sl = s * v;
        sl /= l <= 1 ? l : 2 - l;
        sl = sl || 0;
        return utils.mult([hsv[0], sl, l / 2], utils.sxm);
    };

    // HWB
    let hwb2hsv = hwb => {
        let [w, b] = utils.mult([hwb[1], hwb[2]], utils.sxd);
        let cn = w + b >= 1,
            v = cn ? w / (w + b) : 1 - b,
            s = 0;
        if (!cn && b < 1) s = 1 - w / (1 - b);
        return utils.mult([hwb[0], s, v], utils.sxm);
    };

    let hsv2hwb = hsv => {
        let [s, v] = utils.mult([hsv[1], hsv[2]], utils.sxd);
        let w = (1 - s) * v,
            bl = 1 - v;
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

},{"./utils":6}],4:[function(require,module,exports){
// https://github.com/acterhd/hcg-color
// Made by acterhd, 2015-2016 year

(function () {
    'use strict';

    let utils = require("./utils");

    // RGB functions
    let rgb2hwb = rgb => {
        let [r, g, b] = utils.mult(rgb, utils.rgbd);
        let [min, max] = [Math.min(r, g, b), Math.max(r, g, b)];
        let [h, c] = [0, max - min];
        let w = Math.min(r, g, b);
        let bl = 1 - Math.max(r, g, b);
        if (c > 0) h = [(g - b) / c + (g < b ? 6 : 0), (b - r) / c + 2, (r - g) / c + 4][[r, g, b].indexOf(max)];
        return utils.mult([h, w, bl], utils.hsxm);
    };

    let hwb2rgb = hwb => {
        let [h, w, bl] = utils.mult(hwb, utils.hsxd);
        let ra = w + bl;
        if (ra > 1) {
            w /= ra;
            bl /= ra;
        }
        let c = 1 - w - bl;
        let [q, m] = [c * (1 - Math.abs(h % 2 - 1)), w];
        let [md, arr] = [utils.mod(Math.floor(h), 6), [c, q, 0, 0, q, c]];
        let [r, g, b] = [arr[utils.mod(md, 6)], arr[utils.mod(md - 2, 6)], arr[utils.mod(md - 4, 6)]];
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

},{"./utils":6}],5:[function(require,module,exports){
// Unify to single extension
Object.assign(exports, require("./hcg"), require("./hsv"), require("./hsl"), require("./hwb"));

},{"./hcg":1,"./hsl":2,"./hsv":3,"./hwb":4}],6:[function(require,module,exports){
// https://github.com/acterhd/hcg-color
// Made by acterhd, 2015-2016 year

(function () {
    'use strict';

    exports.mult = (arr, m) => arr.map((e, i) => {
        return e * (m instanceof Array ? m[i] : m);
    });
    exports.add = (arr, m) => arr.map((e, i) => {
        return e + (m instanceof Array ? m[i] : m);
    });
    exports.mod = (a, n) => (a % n + n) % n;
    exports.hsxd = [1 / 60, 1 / 100, 1 / 100];
    exports.hsxm = [60, 100, 100];
    exports.sxd = 1 / 100;
    exports.sxm = [1, 100, 100];
    exports.rgbd = 1 / 255;
    exports.rgbm = 255;
})();

},{}],7:[function(require,module,exports){

let context = {};
Object.assign(context, require("./convert"));
if (typeof exports != "undefined") Object.assign(exports, context);
if (typeof window != "undefined") window.convert = context;

},{"./convert":5}]},{},[7]);
