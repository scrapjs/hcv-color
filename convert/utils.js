// https://github.com/acterhd/hcg-color
// Made by acterhd, 2015-2016 year

(function () {
    'use strict';

    exports.mult = (arr, m) => arr.map((e, i) => {return e * (m instanceof Array ? m[i] : m);});
    exports.add = (arr, m) => arr.map((e, i) => {return e + (m instanceof Array ? m[i] : m);});
    exports.mod = (a, n) => ((a % n) + n) % n;
    exports.hsxd = [1/60, 1/100, 1/100];
    exports.hsxm = [60, 100, 100];
    exports.sxd = 1/100;
    exports.sxm = [1, 100, 100];
    exports.rgbd = 1 / 255;
    exports.rgbm = 255;
})();
