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

(function () {
    var context = window; //typeof exports != "undefined" ? exports : window;
    Object.assign(context, require("./slider"), require("./wheel"), require("./template"));
    var convert = require("./convert");

    class Picker {
        constructor() {
            this.wheel = new Wheel(200, 200);
            this.container = $("<div>").addClass("color-container");
            this.fields = $("<div>").addClass("color-fields");
            this.sliders = $("<div>").addClass("color-sliders");
            this.wheels = $("<div>").addClass("color-wheels");

            this.field = $("<div>").addClass("color-field");
            this.fill = $("<div>").addClass("color-fill");

            this.hcg = [0, 0.5, 1];
            this.hSlider = new HueSlider(300, 30);
            this.cSlider = new ChromaSlider(300, 30);
            this.gSlider = new GraySlider(300, 30);

            this.wheel.bindChannels(this.hcg);
            this.hSlider.bindChannels(this.hcg);
            this.cSlider.bindChannels(this.hcg);
            this.gSlider.bindChannels(this.hcg);

            this.wheel.appendTo(this.wheels[0]);
            this.hNum = $("<input>").attr({ "type": "number", "min": 0, "max": 360, "step": 0.1, "value": 0 }).addClass("color-number");
            this.cNum = $("<input>").attr({ "type": "number", "min": 0, "max": 100, "step": 0.1, "value": 50 }).addClass("color-number");
            this.gNum = $("<input>").attr({ "type": "number", "min": 0, "max": 100, "step": 0.1, "value": 100 }).addClass("color-number");

            this.hSlider.appendTo(this.sliders[0]);this.sliders.append(this.hNum);this.sliders.append("<br>");
            this.cSlider.appendTo(this.sliders[0]);this.sliders.append(this.cNum);this.sliders.append("<br>");
            this.gSlider.appendTo(this.sliders[0]);this.sliders.append(this.gNum);this.sliders.append("<br>");
            this.sliders.append("<br>");

            this.fields.append(this.field);
            this.fields.append(this.fill);

            this.hNum.on("input", () => {
                if (this.hNum[0].value != null) this.hcg[0] = this.hNum[0].value / 360;this.fix();
            });
            this.cNum.on("input", () => {
                if (this.cNum[0].value != null) this.hcg[1] = this.cNum[0].value / 100;this.fix();
            });
            this.gNum.on("input", () => {
                if (this.gNum[0].value != null) this.hcg[2] = this.gNum[0].value / 100;this.fix();
            });

            this.container.append(this.wheels);
            this.container.append(this.fields);
            this.container.append(this.sliders);

            this.fix = () => {
                if (this.hcg[0] != this.hNum[0].value) this.hNum[0].value = this.hcg[0] * 360;
                if (this.hcg[1] != this.cNum[0].value) this.cNum[0].value = this.hcg[1] * 100;
                if (this.hcg[2] != this.gNum[0].value) this.gNum[0].value = this.hcg[2] * 100;

                var rgb = convert.hcg2rgb([this.hcg[0] * 360, this.hcg[1] * 100, this.hcg[2] * 100]);
                this.fill[0].style.backgroundColor = `rgb(${ Math.round(rgb[0]) }, ${ Math.round(rgb[1]) }, ${ Math.round(rgb[2]) })`;
                this.field[0].innerHTML = `
                    <br>
                    ${ this.fill[0].style.backgroundColor } <br>
                    <br>
                    hcg(${ Math.round(this.hcg[0] * 360) }, ${ Math.round(this.hcg[1] * 100) }%, ${ Math.round(this.hcg[2] * 100) }%)<br>
                    <br>
                `;

                requestAnimationFrame(this.fix);
            };
            this.fix();
        }

        appendTo(el) {
            el.appendChild(this.container[0]);
        }

        appendBefore(e) {
            e.parentNode.insertBefore(this.container[0], e);
        }
    }

    context.Picker = Picker;
})();

},{"./convert":5,"./slider":8,"./template":9,"./wheel":10}],8:[function(require,module,exports){

(function () {
    var convert = require("./convert");

    class Layer {
        constructor(e) {
            this.canvas = e.canvas;
            this.ctx = this.canvas.getContext(e.type);
            this.gl = this.ctx;
            this.ondraw = e.draw || function () {};
            this.oninit = e.init || function () {};
            this.onresize = e.resize || function () {};
            this.init(this.ctx, this.canvas);
            this.resize(e.width, e.height);
        }

        init() {
            this.oninit.call(this, this.ctx, this);
        }

        resize(w, h) {
            if (w) this.canvas.width = w;
            if (h) this.canvas.height = h;
            this.onresize.call(this, this.ctx, this.canvas.width, this.canvas.height, this);
        }

        draw() {
            this.ondraw.call(this, this.ctx, this, Array.from(arguments));
            return this.canvas;
        }
    }

    class HueSlider {
        constructor(w, h, preset) {
            this.canvas = document.createElement("canvas");
            this.ctx = this.canvas.getContext("2d");
            this.width = 0;
            this.height = 0;
            this.ratio = 1;
            this.dragging = false;
            this.thumb = { x: 0, y: 0 };
            this.channels = [0, 0.5, 1];
            this.layers = [];
            this.initialized = false;
            this.ch = [0, 1, 2];
            this.func = typeof convert != "undefined" ? convert.hcg2rgb : function () {};
            this.shaderFunc = `
            vec3 hcg2rgb( in vec3 c ){
                vec3 rgb = clamp( abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0, 0.0, 1.0 );
                return mix(vec3(c.z), rgb, c.y);
            }
            `;
            this.shaderPart = `
            rgba.xyz += hcg2rgb(vec3((centroid.x * 0.5 + 0.5 - drop) / range, cg));
            rgba.w += 1.0;
            `;
            if (preset) preset.call(this);
            this.init();
            this.resize(w, h);

            requestAnimationFrame(function render() {
                this.draw();
                requestAnimationFrame(render.bind(this), this.canvas);
            }.bind(this), this.canvas);
        }

        init() {
            if (this.initialized) return this;
            var that = this;
            this.canvas.classList.add("color-input");
            this.canvas.addEventListener("mousedown", function (ev) {
                var point = convertPointFromPageToNode(that.canvas, ev.pageX, ev.pageY);
                if (that.hitTest(point.x, point.y)) {
                    that.dragging = true;
                }
                ev.preventDefault();
            });
            document.addEventListener("mousemove", function (ev) {
                var point = convertPointFromPageToNode(that.canvas, ev.pageX, ev.pageY);
                if (that.dragging) {
                    if (that.oninput) that.oninput.call(that);
                    that.controlThumbMove(point.x, point.y);
                }
            });
            document.addEventListener("mouseup", function (ev) {
                var point = convertPointFromPageToNode(that.canvas, ev.pageX, ev.pageY);
                if (that.dragging) {
                    if (that.onchange) that.onchange.call(that);
                }
                that.dragging = false;
            });
            this.layers.push(new Layer({
                canvas: document.createElement("canvas"),
                type: "webgl",
                init: function (gl) {
                    var vertex = gl.createShader(gl.VERTEX_SHADER);
                    gl.shaderSource(vertex, `
                        precision mediump float;
                        attribute vec2 vertices01;

                        void main(){
                            gl_Position = vec4(vertices01 * 2.0 - 1.0, 0.0, 1.0);
                        }
                    `);
                    gl.compileShader(vertex);
                    if (!gl.getShaderParameter(vertex, gl.COMPILE_STATUS)) {
                        console.error(gl.getShaderInfoLog(vertex));
                        return null;
                    }

                    var fragment = gl.createShader(gl.FRAGMENT_SHADER);
                    gl.shaderSource(fragment, `
                        precision mediump float;
                        uniform vec2 resolution;

                        const float PI = 3.14159265359;
                        ${ that.shaderFunc }

                        uniform vec2 cg;
                        //const float gray = 1.0;

                        void main(){
                            vec4 rgba = vec4(0.0);

                            {
                                vec2 coord01 = gl_FragCoord.xy / resolution.xy;
                                float rate = resolution.x / resolution.y;
                                vec2 centroid = coord01 * 2.0 - 1.0;
                                centroid.y *= -1.0;
                                //centroid.x *= rate;

                                vec2 center = vec2(0.0);

                                float weight = 10.0 / resolution.y + 0.001;
                                float rangeValue = 20.0;
                                float range = (1.0 - rangeValue / resolution.x);
                                float drop  = rangeValue / resolution.x / 2.0;

                                if(
                                    centroid.x < range &&
                                    centroid.x >= -range &&
                                    centroid.y < weight &&
                                    centroid.y >= -weight
                                ){
                                    ${ that.shaderPart }
                                }
                            }

                            gl_FragColor = vec4(rgba);
                        }
                    `);
                    gl.compileShader(fragment);
                    if (!gl.getShaderParameter(fragment, gl.COMPILE_STATUS)) {
                        console.error(gl.getShaderInfoLog(fragment));
                        return null;
                    }

                    var shaderProgram = gl.createProgram();
                    gl.attachShader(shaderProgram, vertex);
                    gl.attachShader(shaderProgram, fragment);
                    gl.linkProgram(shaderProgram);
                    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
                        console.error("Could not initialise shaders");
                    }
                    gl.useProgram(shaderProgram);
                    this.shaderProgram = shaderProgram;

                    this.guniform = gl.getUniformLocation(shaderProgram, "cg");
                    this.runiform = gl.getUniformLocation(shaderProgram, "resolution");
                    this.vattr = gl.getAttribLocation(shaderProgram, "vertices01");
                    gl.enableVertexAttribArray(this.vattr);

                    this.buffer = gl.createBuffer();
                    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
                    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0]), gl.STATIC_DRAW);
                },
                resize: function (gl, w, h) {},
                draw: this.wheelDraw.bind(this)
            }));
            this.layers.push(new Layer({
                canvas: document.createElement("canvas"),
                type: "2d",
                init: function (ctx) {},
                resize: function () {},
                draw: this.thumbDraw.bind(this)
            }));
            return this;
        }

        bindChannels(a) {
            this.channels = a;
        }

        appendTo(e) {
            e.appendChild(this.canvas);
        }

        appendBefore(e) {
            e.parentNode.insertBefore(this.canvas, e);
        }

        wheelDraw(gl, layer, args) {
            var canvas = gl.canvas;
            var width = this.canvas.clientWidth || this.width;
            var height = this.canvas.clientHeight || this.height;
            var ratio = this.canvas.width / this.width;

            gl.uniform2f(layer.runiform, width * ratio, height * ratio);
            gl.uniform2f(layer.guniform, this.channels[this.ch[1]], this.channels[this.ch[2]]);
            gl.viewport(0, 0, width * ratio, height * ratio);
            gl.clearColor(0.0, 0.0, 0.0, 0.0);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            gl.bindBuffer(gl.ARRAY_BUFFER, layer.buffer);
            gl.vertexAttribPointer(layer.vattr, 2, gl.FLOAT, false, 0, 0);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        }

        thumbDraw(ctx) {
            var canvas = ctx.canvas;
            var width = this.canvas.clientWidth || this.width;
            var height = this.canvas.clientHeight || this.height;
            var ratio = this.canvas.width / width;

            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.save();
            ctx.scale(ratio, ratio);
            ctx.beginPath();
            ctx.arc(this.thumb.x, this.thumb.y, 8, 0, 2 * Math.PI, false);
            ctx.closePath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
            var rgb = this.func([this.channels[0] * 360, this.channels[1] * 100, this.channels[2] * 100]);
            ctx.fillStyle = `rgb(${ Math.round(rgb[0]) }, ${ Math.round(rgb[1]) }, ${ Math.round(rgb[2]) })`;
            ctx.fill();
            ctx.stroke();
            ctx.restore();
        }

        setThumb() {
            var circ = [this.channels[this.ch[0]]]; //this.getCircleCoordinate(mx, my);
            var xy = this.getXYCoordinate(circ);

            this.thumb.x = xy[0];
            this.thumb.y = xy[1];
        }

        controlThumbMove(mx, my) {
            var line = this.getLineCoordinate(mx, my);
            line[0] = Math.max(0, line[0]);
            line[0] = Math.min(1, line[0]);
            this.channels[this.ch[0]] = line[0];
            var xy = this.getXYCoordinate(line);
            this.thumb.x = xy[0];
            this.thumb.y = xy[1];
        }

        getLineCoordinate(mx, my) {
            var canvas = this.canvas;
            var width = this.canvas.clientWidth || this.width;
            var height = this.canvas.clientHeight || this.height;
            var ratio = this.canvas.width / width;
            var ctx = this.ctx;

            var coord01_x = mx / width;
            var centroid_x = coord01_x * 2.0 - 1.0;
            //centroid_x *= (width / height);

            var rangeValue = 20;
            var range = 1.0 - rangeValue / width;
            var drop = rangeValue / width / 2.0;
            var coord = (centroid_x * 0.5 + 0.5 - drop) / range;

            return [coord];
        }

        getXYCoordinate(coord) {
            var canvas = this.canvas;
            var width = this.canvas.clientWidth || this.width;
            var height = this.canvas.clientHeight || this.height;
            var ratio = this.canvas.width / width;
            var ctx = this.ctx;

            var rangeValue = 20;
            var range = 1.0 - rangeValue / width;
            var drop = rangeValue / width / 2.0;
            var centroid_x = (coord[0] * range + drop) * 2.0 - 1.0;

            //centroid_x /= (width / height);
            var coord01_x = centroid_x * 0.5 + 0.5;
            return [coord01_x * width, (height + 0.5) / 2];
        }

        hitTest(mx, my) {
            var canvas = this.canvas;
            var width = this.canvas.clientWidth || this.width;
            var height = this.canvas.clientHeight || this.height;
            var ratio = this.canvas.width / width;

            var coord = this.getLineCoordinate(mx, my);
            var y = my - (height + 0.5) / 2;
            var hTest = y > -10 && y < 10;
            if (coord[0] > 0.0 && coord[0] < 1.0 && hTest) {
                return true;
            }
            return false;
        }

        resize(w, h) {
            if (w) {
                this.width = w;this.canvas.width = this.width * this.ratio;
            }
            if (h) {
                this.height = h;this.canvas.height = this.height * this.ratio;
            }
            this.canvas.style.width = this.width + "px";
            var that = this;
            this.layers.forEach(function (layer) {
                layer.resize(that.canvas.width, that.canvas.height);
            });
            return this;
        }

        getDOMCanvas() {
            return this.canvas;
        }

        draw() {
            this.setThumb();

            var canvas = this.canvas;
            var width = this.canvas.width;
            var height = this.canvas.height;
            var ratio = this.canvas.width / width;
            var ctx = this.ctx;
            ctx.clearRect(0, 0, width, height);
            ctx.save();
            this.layers.forEach(function (layer) {
                layer.draw(ratio);
                ctx.drawImage(layer.canvas, 0, 0, width, height);
            });
            ctx.restore();
            return this.canvas;
        }
    }

    class GraySlider extends HueSlider {
        constructor(w, h) {
            super(w, h, function () {
                this.ch = [2, 0, 1];
                this.shaderPart = `
                    rgba.xyz += hcg2rgb(vec3(cg, (centroid.x * 0.5 + 0.5 - drop) / range));
                    rgba.w += 1.0;
                `;
            });
        }
    }

    class ChromaSlider extends HueSlider {
        constructor(w, h) {
            super(w, h, function () {
                this.ch = [1, 0, 2];
                this.shaderPart = `
                    rgba.xyz += hcg2rgb(vec3(cg.x, (centroid.x * 0.5 + 0.5 - drop) / range, cg.y));
                    rgba.w += 1.0;
                `;
            });
        }
    }

    var context = typeof exports != "undefined" ? exports : window;
    context.HueSlider = HueSlider;
    context.GraySlider = GraySlider;
    context.ChromaSlider = ChromaSlider;
})();

},{"./convert":5}],9:[function(require,module,exports){

},{}],10:[function(require,module,exports){
(function () {
    var convert = require("./convert");

    class Layer {
        constructor(e) {
            this.canvas = e.canvas;
            this.ctx = this.canvas.getContext(e.type);
            this.gl = this.ctx;
            this.ondraw = e.draw || function () {};
            this.oninit = e.init || function () {};
            this.onresize = e.resize || function () {};
            this.init(this.ctx, this.canvas);
            this.resize(e.width, e.height);
        }

        init() {
            this.oninit.call(this, this.ctx, this);
        }

        resize(w, h) {
            if (w) this.canvas.width = w;
            if (h) this.canvas.height = h;
            this.onresize.call(this, this.ctx, this.canvas.width, this.canvas.height, this);
        }

        draw() {
            this.ondraw.call(this, this.ctx, this, Array.from(arguments));
            return this.canvas;
        }
    }

    class Wheel {
        constructor(w, h) {
            this.canvas = document.createElement("canvas");
            this.ctx = this.canvas.getContext("2d");
            this.width = 0;
            this.height = 0;
            this.ratio = 1;
            this.dragging = false;
            this.thumb = { x: 0, y: 0 };
            this.channels = [0, 0.5, 1];
            this.layers = [];
            this.initialized = false;
            this.func = typeof convert != "undefined" ? convert.hcg2rgb : function () {};
            this.ch = [0, 1, 2];
            this.init();
            this.resize(w, h);

            requestAnimationFrame(function render() {
                this.draw();
                requestAnimationFrame(render.bind(this), this.canvas);
            }.bind(this), this.canvas);
        }

        init() {
            if (this.initialized) return this;
            var that = this;
            this.canvas.classList.add("color-input");
            this.canvas.addEventListener("mousedown", function (ev) {
                var point = convertPointFromPageToNode(that.canvas, ev.pageX, ev.pageY);
                if (that.hitTest(point.x, point.y)) {
                    that.dragging = true;
                }
                ev.preventDefault();
            });
            document.addEventListener("mousemove", function (ev) {
                var point = convertPointFromPageToNode(that.canvas, ev.pageX, ev.pageY);
                if (that.dragging) {
                    if (that.oninput) that.oninput.call(that);
                    that.controlThumbMove(point.x, point.y);
                }
            });
            document.addEventListener("mouseup", function (ev) {
                var point = convertPointFromPageToNode(that.canvas, ev.pageX, ev.pageY);
                if (that.dragging) {
                    if (that.onchange) that.onchange.call(that);
                }
                that.dragging = false;
            });
            this.layers.push(new Layer({
                canvas: document.createElement("canvas"),
                type: "webgl",
                init: function (gl) {
                    var vertex = gl.createShader(gl.VERTEX_SHADER);
                    gl.shaderSource(vertex, `
                        precision mediump float;
                        attribute vec2 vertices01;

                        void main(){
                            gl_Position = vec4(vertices01 * 2.0 - 1.0, 0.0, 1.0);
                        }
                    `);
                    gl.compileShader(vertex);
                    if (!gl.getShaderParameter(vertex, gl.COMPILE_STATUS)) {
                        console.error(gl.getShaderInfoLog(vertex));
                        return null;
                    }

                    var fragment = gl.createShader(gl.FRAGMENT_SHADER);
                    gl.shaderSource(fragment, `
                        precision mediump float;
                        uniform vec2 resolution;

                        const float PI = 3.14159265359;
                        vec3 hcg2rgb( in vec3 c ){
                            vec3 rgb = clamp( abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0, 0.0, 1.0 );
                            return mix(vec3(c.z), rgb, c.y);
                        }

                        uniform float gray;
                        //const float gray = 1.0;

                        void main(){
                            vec4 rgba = vec4(0.0);

                            {
                                vec2 coord01 = gl_FragCoord.xy / resolution.xy;
                                float rate = resolution.x / resolution.y;
                                vec2 centroid = coord01 * 2.0 - 1.0;
                                centroid.y *= -1.0;
                                centroid.x *= rate;

                                vec2 center = vec2(0.0);

                                float angle = atan(centroid.y, centroid.x);
                                if (angle < 0.0) angle += PI * 2.0;
                                angle = mod(angle, PI * 2.0);
                                float range = distance(centroid, center);

                                if(range < 0.9){
                                    rgba.xyz += hcg2rgb(vec3(angle / (2.0 * PI), range / 0.9, gray));
                                    rgba.a += 1.0;
                                }
                            }

                            gl_FragColor = vec4(rgba);
                        }
                    `);
                    gl.compileShader(fragment);
                    if (!gl.getShaderParameter(fragment, gl.COMPILE_STATUS)) {
                        console.error(gl.getShaderInfoLog(fragment));
                        return null;
                    }

                    var shaderProgram = gl.createProgram();
                    gl.attachShader(shaderProgram, vertex);
                    gl.attachShader(shaderProgram, fragment);
                    gl.linkProgram(shaderProgram);
                    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
                        console.error("Could not initialise shaders");
                    }
                    gl.useProgram(shaderProgram);
                    this.shaderProgram = shaderProgram;

                    this.guniform = gl.getUniformLocation(shaderProgram, "gray");
                    this.runiform = gl.getUniformLocation(shaderProgram, "resolution");
                    this.vattr = gl.getAttribLocation(shaderProgram, "vertices01");
                    gl.enableVertexAttribArray(this.vattr);

                    this.buffer = gl.createBuffer();
                    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
                    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0]), gl.STATIC_DRAW);
                },
                resize: function (gl, w, h) {},
                draw: this.wheelDraw.bind(this)
            }));
            this.layers.push(new Layer({
                canvas: document.createElement("canvas"),
                type: "2d",
                init: function (ctx) {},
                resize: function () {},
                draw: this.thumbDraw.bind(this)
            }));
            return this;
        }

        bindChannels(a) {
            this.channels = a;
        }

        appendTo(e) {
            e.appendChild(this.canvas);
        }

        appendBefore(e) {
            e.parentNode.insertBefore(this.canvas, e);
        }

        wheelDraw(gl, layer, args) {
            var canvas = gl.canvas;
            var width = this.canvas.clientWidth || this.width;
            var height = this.canvas.clientHeight || this.height;
            var ratio = this.canvas.width / this.width;

            gl.uniform2f(layer.runiform, width * ratio, height * ratio);
            gl.uniform1f(layer.guniform, this.channels[this.ch[2]]);
            gl.viewport(0, 0, width * ratio, height * ratio);
            gl.clearColor(0.0, 0.0, 0.0, 0.0);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            gl.bindBuffer(gl.ARRAY_BUFFER, layer.buffer);
            gl.vertexAttribPointer(layer.vattr, 2, gl.FLOAT, false, 0, 0);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        }

        thumbDraw(ctx) {
            var canvas = ctx.canvas;
            var width = this.canvas.clientWidth || this.width;
            var height = this.canvas.clientHeight || this.height;
            var ratio = this.canvas.width / width;

            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.save();
            ctx.scale(ratio, ratio);
            ctx.beginPath();
            ctx.arc(this.thumb.x, this.thumb.y, 6, 0, 2 * Math.PI, false);
            ctx.closePath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)';
            var rgb = this.func([this.channels[0] * 360, this.channels[1] * 100, this.channels[2] * 100]);
            ctx.fillStyle = `rgb(${ Math.round(rgb[0]) }, ${ Math.round(rgb[1]) }, ${ Math.round(rgb[2]) })`;
            ctx.fill();
            ctx.stroke();
            ctx.restore();
        }

        setThumb() {
            var circ = [this.channels[this.ch[0]] * (Math.PI * 2.0), this.channels[this.ch[1]] * 0.9]; //this.getCircleCoordinate(mx, my);
            var xy = this.getXYCoordinate(circ);

            this.thumb.x = xy[0];
            this.thumb.y = xy[1];
        }

        controlThumbMove(mx, my) {
            var circ = this.getCircleCoordinate(mx, my);
            circ[1] = Math.min(0.9, circ[1]);

            this.channels[this.ch[0]] = circ[this.ch[0]] / (Math.PI * 2.0);
            this.channels[this.ch[1]] = circ[this.ch[1]] / 0.9;
            var xy = this.getXYCoordinate(circ);

            this.thumb.x = xy[0];
            this.thumb.y = xy[1];
        }

        getCircleCoordinate(mx, my) {
            var canvas = this.canvas;
            var width = this.canvas.clientWidth || this.width;
            var height = this.canvas.clientHeight || this.height;
            var ratio = this.canvas.width / width;
            var ctx = this.ctx;

            var coord01_x = mx / width;
            var coord01_y = my / height;
            var centroid_x = coord01_x * 2.0 - 1.0;
            var centroid_y = coord01_y * 2.0 - 1.0;
            centroid_x *= width / height;

            var range = Math.sqrt(centroid_x * centroid_x + centroid_y * centroid_y);
            var angle = Math.atan2(centroid_y, centroid_x);
            if (angle < 0.0) angle += Math.PI * 2.0;
            return [angle, range];
        }

        getXYCoordinate(coord) {
            var canvas = this.canvas;
            var width = this.canvas.clientWidth || this.width;
            var height = this.canvas.clientHeight || this.height;
            var ratio = this.canvas.width / width;
            var ctx = this.ctx;
            var centroid_x = Math.cos(coord[0]) * coord[1];
            var centroid_y = Math.sin(coord[0]) * coord[1];
            centroid_x /= width / height;
            var coord01_x = centroid_x * 0.5 + 0.5;
            var coord01_y = centroid_y * 0.5 + 0.5;
            return [coord01_x * width, coord01_y * height];
        }

        hitTest(mx, my) {
            var coord = this.getCircleCoordinate(mx, my);
            if (coord[1] < 0.9) {
                return true;
            }
            return false;
        }

        resize(w, h) {
            if (w) {
                this.width = w;this.canvas.width = this.width * this.ratio;
            }
            if (h) {
                this.height = h;this.canvas.height = this.height * this.ratio;
            }
            this.canvas.style.width = this.width + "px";
            var that = this;
            this.layers.forEach(function (layer) {
                layer.resize(that.canvas.width, that.canvas.height);
            });
            return this;
        }

        getDOMCanvas() {
            return this.canvas;
        }

        draw() {
            this.setThumb();

            var canvas = this.canvas;
            var width = this.canvas.width;
            var height = this.canvas.height;
            var ratio = this.canvas.width / width;
            var ctx = this.ctx;
            ctx.clearRect(0, 0, width, height);
            ctx.save();
            this.layers.forEach(function (layer) {
                layer.draw(ratio);
                ctx.drawImage(layer.canvas, 0, 0, width, height);
            });
            ctx.restore();
            return this.canvas;
        }
    }

    var context = typeof exports != "undefined" ? exports : window;
    context.Wheel = Wheel;
})();

},{"./convert":5}]},{},[7]);
