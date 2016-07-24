
let assert = require("assert");
let convert = require("../convert/index");

console.log(convert.rgb2hcg(convert.hcg2rgb([0.6, 0.5, 1.0])));
