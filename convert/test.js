/* eslint-disable dot-notation */
var assert = require('assert');
var bro = require('../convert/hcg');

assert.deepEqual(bro.hcg2rgb([0, 50, 100]), [255, 127.5, 127.5]);
assert.deepEqual(bro.rgb2hcg([255, 127.5, 127.5]), [0, 50, 100]);
