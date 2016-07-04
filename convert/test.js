/* eslint-disable dot-notation */
var assert = require('assert');
var convert = require('./hcg');

assert.deepEqual(convert.hcg2rgb([0, 50, 100]), [255, 127.5, 127.5]);
assert.deepEqual(convert.rgb2hcg([255, 127.5, 127.5]), [0, 50, 100]);
