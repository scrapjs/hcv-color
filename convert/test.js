/* eslint-disable dot-notation */
var assert = require('assert');
var convert = require('./');

let RGB = convert.hcg2rgb([120, 50, 100]);
let HCG = convert.rgb2hcg([127.5, 255, 127.5]);

console.log(RGB);
console.log(HCG);

assert.deepEqual(RGB, [127.5, 255, 127.5]);
assert.deepEqual(HCG, [120, 50, 100]);
