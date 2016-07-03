(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

{
    (function () {
        require("../helpers/convertPointFromPageToNode");
        var common = require("../helpers/common");
        var Vec2 = require("../helpers/vector").Vec2;
        var context = exports ? exports : {};
        (function () {
            "use strict";

            var H = 0;
            var C = 1;
            var G = 2;

            var track = "\n        {\n            background-color: transparent;\n            width: 100%;\n            padding: 0;\n            height: 100%;\n            border: none;\n        }\n        ";

            var thumb = "\n        {\n            border-radius: 0px;\n            appearance: none;\n            -moz-appearance: none;\n            -webkit-appearance: none;\n            background-color: rgba(255, 255, 255, 0.6);\n            width: 8px;\n            height: 30px;\n            transform: translateY(-5px);\n            display: inline-block;\n            border: solid 1px rgba(128, 128, 128, 0.6);\n            box-sizing: border-box;\n        }\n        ";

            var css = "\n        .color-input {\n            display: inline-block;\n            appearance: none;\n            -moz-appearance: none;\n            -webkit-appearance: none;\n            width: 200px !important;\n            height: 20px;\n            padding: 0;\n            background-repeat: no-repeat;\n            background-size: calc(100% - 8px) 100%;\n            background-position: center center;\n            background-color: rgb(128, 128, 128);\n            background-origin: content-box;\n            background-clip: content-box;\n            outline: none;\n            border: solid 1px rgb(162, 162, 162);\n            box-sizing: content-box;\n        }\n\n        .color-input::-webkit-slider-thumb " + thumb + "\n        .color-input::-webkit-slider-runnable-track " + track + "\n        .color-input::-moz-range-thumb " + thumb + "\n        .color-input::-moz-range-track " + track + "\n        ";

            var style = document.createElement("style");
            style.type = "text/css";
            style.innerHTML = css;
            document.querySelectorAll("head")[0].appendChild(style);

            var Slider = function () {
                function Slider(input, source) {
                    var _this = this;

                    _classCallCheck(this, Slider);

                    this.input = input || document.createElement("input");
                    this.channel = H;
                    this.gcount = 2;
                    this.hcg = source || [0, 1, 1];
                    this.min = 0;
                    this.max = 1;
                    this.init();

                    {
                        (function () {
                            var input = _this.input;
                            var self = _this;
                            input.classList.add("color-input");
                            input.addEventListener("input", function () {
                                self.hcg[self.channel] = this.value;
                                if (self.onchange) {
                                    self.onchange();
                                }
                                self.draw();
                            });
                        })();
                    }
                }

                _createClass(Slider, [{
                    key: "init",
                    value: function init() {
                        var input = this.input;
                        input.type = "range";
                        input.min = this.min;
                        input.max = this.max;
                        input.step = (this.max - this.min) * 0.0001;
                        input.value = this.hcg[this.channel];
                        this.draw();
                        return this;
                    }
                }, {
                    key: "draw",
                    value: function draw() {
                        var head = "linear-gradient";
                        var path = [];

                        for (var i = 0; i < this.gcount; i++) {
                            var hcg = Array.from(this.hcg);
                            var perc = i / (this.gcount - 1);
                            hcg[this.channel] = this.min + (this.max - this.min) * perc;
                            path.push(common._strc(common._color(hcg, this.func)) + " " + (perc * 100).toFixed(2) + "%");
                        }

                        var str = head + "(to right, " + path.join(",") + ")";
                        this.input.style.backgroundImage = str;
                        return this;
                    }
                }, {
                    key: "synchronize",
                    value: function synchronize(hcg) {
                        if (hcg) common._set(this.hcg, hcg);
                        if (this.input.value != this.hcg[this.channel]) {
                            this.input.value = this.hcg[this.channel];
                        }
                        this.draw();
                        return this;
                    }
                }, {
                    key: "appendTo",
                    value: function appendTo(element) {
                        element.appendChild(this.input);
                        return this;
                    }
                }]);

                return Slider;
            }();

            var HueSlider = function (_Slider) {
                _inherits(HueSlider, _Slider);

                function HueSlider(input, source) {
                    _classCallCheck(this, HueSlider);

                    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(HueSlider).call(this, input, source));

                    _this2.func = hcg2rgb;
                    _this2.gcount = 7;
                    _this2.channel = H;
                    _this2.init();
                    return _this2;
                }

                return HueSlider;
            }(Slider);

            var ChromaSlider = function (_Slider2) {
                _inherits(ChromaSlider, _Slider2);

                function ChromaSlider(input, source) {
                    _classCallCheck(this, ChromaSlider);

                    var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(ChromaSlider).call(this, input, source));

                    _this3.func = hcg2rgb;
                    _this3.channel = C;
                    _this3.init();
                    return _this3;
                }

                return ChromaSlider;
            }(Slider);

            var GraySlider = function (_Slider3) {
                _inherits(GraySlider, _Slider3);

                function GraySlider(input, source) {
                    _classCallCheck(this, GraySlider);

                    var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(GraySlider).call(this, input, source));

                    _this4.func = hcg2rgb;
                    _this4.channel = G;
                    _this4.init();
                    return _this4;
                }

                return GraySlider;
            }(Slider);

            this.Slider = Slider;
            this.HueSlider = HueSlider;
            this.ChromaSlider = ChromaSlider;
            this.GraySlider = GraySlider;
        }).call(context);
    })();
}

},{"../helpers/common":3,"../helpers/convertPointFromPageToNode":4,"../helpers/vector":5}],2:[function(require,module,exports){
"use strict";

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

{
    (function () {
        require("../helpers/convertPointFromPageToNode");
        var common = require("../helpers/common");
        var Vec2 = require("../helpers/vector").Vec2;
        var context = exports ? exports : {};
        (function () {
            "use strict";

            var css = "";
            var style = document.createElement("style");
            style.type = "text/css";
            style.innerHTML = css;
            document.querySelectorAll("head")[0].appendChild(style);

            var H = 0;
            var C = 1;
            var G = 2;

            var Wheel = function () {
                function Wheel(_canvas, source) {
                    var _this = this;

                    _classCallCheck(this, Wheel);

                    this.func = hcg2rgb;
                    this.glslFunc = "\n                vec3 hcg2rgb(in vec3 c){\n                    vec3 rgb = clamp( abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0, 0.0, 1.0 );\n                    return mix(vec3(c.z), rgb, c.y);\n                }\n                ";

                    this.channel = [H, C, G];
                    this.hcg = source || [0.1, 0.5, 1];

                    this.width = 200;
                    this.height = 200;

                    {
                        var opts = { "preserveDrawingBuffer": true };
                        var canvas = document.createElement("canvas");
                        this.gl = canvas.getContext("webgl", opts) || canvas.getContext("experimental-webgl", opts);
                    }
                    this.ctx = document.createElement("canvas").getContext("2d");
                    this.rtx = (_canvas || document.createElement("canvas")).getContext("2d");
                    this.rtx.canvas.style.width = this.width + "px";

                    this.center = new Vec2(0.5, 0.5);
                    this.radius = 0.4;
                    this.press = false;

                    {
                        var touch;

                        (function () {
                            //Init bindings
                            var canvas = _this.rtx.canvas;
                            var self = _this;

                            canvas.addEventListener("touchstart", function (ev) {
                                if (!touch) {
                                    touch = ev.targetTouches[0];
                                    self.dopress(convertPointFromPageToNode(this, touch.pageX, touch.pageY), ev);
                                }
                            }, true);

                            document.addEventListener("touchend", function (event) {
                                for (var i = 0; i < event.changedTouches.length; i++) {
                                    if (touch && touch.identifier == event.changedTouches[i].identifier) {
                                        self.press = false;
                                    }
                                }
                                if (!touch) {
                                    self.press = false;
                                }
                                touch = null;
                            }, true);

                            document.addEventListener("touchmove", function (ev) {
                                var picker = self.picker;
                                if (touch && self.press) {
                                    for (var i = 0; i < ev.changedTouches.length; i++) {
                                        if (ev.changedTouches[i].identifier == touch.identifier) {
                                            touch = ev.changedTouches[i];
                                            break;
                                        }
                                    }
                                    var point = convertPointFromPageToNode(this, touch.pageX, touch.pageY);
                                    self.normalize(point, ev);
                                    ev.preventDefault();
                                }
                            }.bind(canvas), true);

                            canvas.addEventListener("selectstart", function (ev) {
                                ev.preventDefault();
                            });

                            canvas.addEventListener("mousedown", function (ev) {
                                var point = convertPointFromPageToNode(this, ev.pageX, ev.pageY);
                                self.dopress(point, ev);
                            });

                            document.addEventListener("mousemove", function (ev) {
                                if (self.press) {
                                    var point = convertPointFromPageToNode(this, ev.pageX, ev.pageY);
                                    self.normalize(point, ev);
                                }
                            }.bind(canvas));

                            document.addEventListener("mouseup", function (ev) {
                                self.press = false;
                            }.bind(canvas));
                        })();
                    }

                    {
                        //WebGL init
                        var gl = this.gl;
                        var _canvas2 = gl.canvas;

                        var vshader = "\n                    precision mediump float;\n                    attribute vec2 pos;\n                    varying vec2 vpos;\n                    void main(){\n                        gl_Position = vec4(pos * 2.0 - 1.0, 0.0, 1.0);\n                        vpos = pos;\n                    }\n                    ";

                        var fshader = "\n                    precision mediump float;\n                    varying vec2 vpos;\n                    struct circle {\n                        vec2 center;\n                        float radius;\n                    };\n                    uniform float gray;\n                    uniform circle hc;\n                    uniform vec2 resolution;\n                    const float PI = 3.14159265359;\n\n                    " + this.glslFunc + "\n\n                    const float wx = 2.0;\n                    const float wy = 2.0;\n                    void main(){\n                        vec4 color = vec4(0.0);\n                        for(float x=0.0;x<wx;x+=1.0){\n                            for(float y=0.0;y<wy;y+=1.0){\n                                float aspect = resolution.x / resolution.y;\n                                float ce = 1.0 - 1.0 / aspect;\n                                vec2 part = vec2(x, y) / vec2(wx, wy) / resolution.xy;\n                                vec2 partCoord = gl_FragCoord.xy + part * resolution.xy;\n                                vec2 xy = (partCoord / resolution.xy) * vec2(aspect, 1.0) - vec2(ce, 0.0) * aspect * 0.5;\n                                vec2 f = (xy - hc.center) / hc.radius;\n                                float l = length(f);\n                                if(l < 1.0) {\n                                    float h = fract(atan(f.x, f.y) / (PI * 2.0));\n                                    float c = l;\n                                    float g = gray;\n                                    color += vec4(hcg2rgb(vec3(h, c, g)), 1.0);\n                                } else {\n                                    color += vec4(0.0);\n                                }\n                            }\n                        }\n                        color /= wx * wy;\n                        gl_FragColor = color;\n                    }\n                    ";

                        gl.clearColor(0.0, 0.0, 0.0, 0.0);
                        gl.disable(gl.BLEND);
                        gl.disable(gl.DEPTH_TEST);

                        var vert = gl.createShader(gl.VERTEX_SHADER);
                        gl.shaderSource(vert, vshader);
                        gl.compileShader(vert);
                        if (!gl.getShaderParameter(vert, gl.COMPILE_STATUS)) {
                            console.error(gl.getShaderInfoLog(vert));
                        }

                        var frag = gl.createShader(gl.FRAGMENT_SHADER);
                        gl.shaderSource(frag, fshader);
                        gl.compileShader(frag);
                        if (!gl.getShaderParameter(frag, gl.COMPILE_STATUS)) {
                            console.error(gl.getShaderInfoLog(frag));
                        }

                        this.shader = gl.createProgram();
                        gl.attachShader(this.shader, vert);
                        gl.attachShader(this.shader, frag);
                        gl.linkProgram(this.shader);
                        if (!gl.getProgramParameter(this.shader, gl.LINK_STATUS)) {
                            console.error(gl.getProgramInfoLog(this.shader));
                        }

                        this.posattr = gl.getAttribLocation(this.shader, "pos");
                        gl.enableVertexAttribArray(this.posattr);

                        this.vbuffer = gl.createBuffer();
                        gl.bindBuffer(gl.ARRAY_BUFFER, this.vbuffer);
                        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0]), gl.STATIC_DRAW);
                    }
                }

                _createClass(Wheel, [{
                    key: "dopress",
                    value: function dopress(point, ev) {
                        var coord = new Vec2((point.x - common._pleft(this.rtx.canvas)) / (common._pwidth(this.rtx.canvas) / this.width), (point.y - common._ptop(this.rtx.canvas)) / (common._pheight(this.rtx.canvas) / this.height));
                        var hcg = this.hcgFromCoord(coord);
                        if (hcg[this.channel[1]] <= 1.0 && hcg[this.channel[1]] >= 0.0) {
                            this.press = true;
                            if (ev) ev.preventDefault();
                        }
                    }
                }, {
                    key: "normalize",
                    value: function normalize(point) {
                        var coord = new Vec2((point.x - common._pleft(this.rtx.canvas)) / (common._pwidth(this.rtx.canvas) / this.width), (point.y - common._ptop(this.rtx.canvas)) / (common._pheight(this.rtx.canvas) / this.height));
                        common._set(this.hcg, this.hcgFromCoord(coord));
                        for (var i = 0; i < 3; i++) {
                            this.hcg[this.channel[i]] = common._clamp(this.hcg[this.channel[i]], 0.0, 1.0);
                        }
                        if (this.onchange) {
                            this.onchange();
                        }
                        //this.draw();
                    }
                }, {
                    key: "draw",
                    value: function draw() {

                        {
                            //WebGL rendering
                            var gl = this.gl;
                            var canvas = gl.canvas;

                            canvas.width = this.width * devicePixelRatio;
                            canvas.height = this.height * devicePixelRatio;

                            gl.useProgram(this.shader);
                            gl.uniform1f(gl.getUniformLocation(this.shader, "gray"), this.hcg[this.channel[2]]);
                            gl.uniform2f(gl.getUniformLocation(this.shader, "hc.center"), this.center.x, this.center.y);
                            gl.uniform1f(gl.getUniformLocation(this.shader, "hc.radius"), this.radius);
                            gl.uniform2f(gl.getUniformLocation(this.shader, "resolution"), canvas.width, canvas.height);

                            gl.bindBuffer(gl.ARRAY_BUFFER, this.vbuffer);
                            gl.vertexAttribPointer(this.posattr, 2, gl.FLOAT, false, 0, 0);

                            gl.viewport(0, 0, canvas.width, canvas.height);
                            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
                            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
                        }

                        {
                            //Canvas rendering
                            var ctx = this.ctx;
                            var center = this.coordFromHcg();
                            var _canvas3 = ctx.canvas;

                            _canvas3.width = this.width * devicePixelRatio;
                            _canvas3.height = this.height * devicePixelRatio;

                            ctx.clearRect(0.0, 0.0, _canvas3.width, _canvas3.height);
                            ctx.save();

                            ctx.scale(devicePixelRatio, devicePixelRatio);
                            ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
                            ctx.lineWidth = 1.5;
                            ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";

                            ctx.beginPath();
                            ctx.arc(Math.round(center.x), Math.round(center.y), 4, 0, 2 * Math.PI, false);
                            ctx.fill();
                            ctx.stroke();
                            ctx.closePath();

                            ctx.restore();
                        }

                        {
                            //Render on main context
                            var _ctx = this.rtx;
                            var _canvas4 = _ctx.canvas;

                            _canvas4.width = this.width * devicePixelRatio;
                            _canvas4.height = this.height * devicePixelRatio;

                            _ctx.save();
                            _ctx.clearRect(0.0, 0.0, _canvas4.width, _canvas4.height);
                            _ctx.drawImage(this.gl.canvas, 0, 0, _canvas4.width, _canvas4.height);
                            _ctx.drawImage(this.ctx.canvas, 0, 0, _canvas4.width, _canvas4.height);
                            _ctx.restore();
                        }
                        return this;
                    }
                }, {
                    key: "hcgFromCoord",
                    value: function hcgFromCoord(coord) {
                        var gl = this.gl;
                        var canvas = gl.canvas;
                        var res = new Vec2(this.width, this.height);
                        var aspect = res.x / res.y;

                        var ce = 1.0 / aspect;
                        var xy = coord.div(res).mul(new Vec2(aspect, 1.0)).sub(new Vec2(1.0 - ce, 0.0).mul(aspect * 0.5));
                        var n = xy.sub(this.center).div(this.radius);
                        var rad = common._mod(-n.atan() - Math.PI, Math.PI * 2.0);
                        var len = n.length();

                        var hcg = Array.from(this.hcg);
                        hcg[this.channel[0]] = rad / (Math.PI * 2.0);
                        hcg[this.channel[1]] = len;
                        return hcg;
                    }
                }, {
                    key: "coordFromHcg",
                    value: function coordFromHcg() {
                        var gl = this.gl;
                        var canvas = gl.canvas;

                        var res = new Vec2(this.width, this.height);
                        var angle = (this.hcg[this.channel[0]] || 0) * (Math.PI * 2) - Math.PI / 2;
                        var n = new Vec2(Math.cos(angle), Math.sin(angle)).mul(this.hcg[this.channel[1]]);
                        var xy = n.mul(this.radius).add(this.center);

                        var aspect = res.x / res.y;
                        var ce = 1.0 / aspect;
                        var result = xy.add(new Vec2(1.0 - ce, 0.0).mul(aspect * 0.5)).div(new Vec2(aspect, 1.0)).mul(res);
                        return result;
                    }
                }, {
                    key: "appendTo",
                    value: function appendTo(element) {
                        element.appendChild(this.rtx.canvas);
                        return this;
                    }
                }, {
                    key: "synchronize",
                    value: function synchronize(hcg) {
                        if (hcg) common._set(this.hcg, hcg);
                        this.draw();
                        return this;
                    }
                }]);

                return Wheel;
            }();

            this.Wheel = Wheel;
        }).call(context);
    })();
}

},{"../helpers/common":3,"../helpers/convertPointFromPageToNode":4,"../helpers/vector":5}],3:[function(require,module,exports){
"use strict";

{
    var context = exports ? exports : {};

    context._clamp = function (num, min, max) {
        return Math.max(min, Math.min(num, max));
    };

    context._strc = function (a, name) {
        return (name || "rgb") + ("(" + Math.round(a[0]) + ", " + Math.round(a[1]) + ", " + Math.round(a[2]) + ")");
    };

    context._strh = function (a, name) {
        return (name || "hcg") + ("(" + Math.round(a[0] * 360) + ", " + Math.round(a[1] * 100) + "%, " + Math.round(a[2] * 100) + "%)");
    };

    context._color = function (hcg, func) {
        if (func || hcg2rgb) return (func || hcg2rgb)([hcg[0] * 360, hcg[1] * 100, hcg[2] * 100]);
    };

    context._toHcg = function (rgb, func) {
        if (func || rgb2hcg) return (func || rgb2hcg)([rgb[0], rgb[1], rgb[2]]);
    };

    context._pleft = function (el) {
        var c = getComputedStyle(el, "");
        var pd = parseInt(c.paddingLeft);
        var bd = parseInt(c.borderLeftWidth);
        return pd + bd;
    };

    context._ptop = function (el) {
        var c = getComputedStyle(el, "");
        var pd = parseInt(c.paddingTop);
        var bd = parseInt(c.borderTopWidth);
        return pd + bd;
    };

    context._pwidth = function (el) {
        var c = getComputedStyle(el, "");
        var pd = parseInt(c.paddingLeft) + parseInt(c.paddingRight);
        return el.clientWidth - pd;
    };

    context._pheight = function (el) {
        var c = getComputedStyle(el, "");
        var pd = parseInt(c.paddingTop) + parseInt(c.paddingBottom);
        return el.clientHeight - pd;
    };

    context._mod = function (a, n) {
        return (a % n + n) % n;
    };

    context._set = function (a, b, o) {
        o = o || 0;
        for (var i = 0; i < b.length; i++) {
            a[i + o] = b[i];
        }
    };
}

},{}],4:[function(require,module,exports){
"use strict";

/*jslint plusplus: true, vars: true, indent: 2 */

/*
    convertPointFromPageToNode(element, event.pageX, event.pageY) -> {x, y}
    returns coordinate in element's local coordinate system (works properly with css transforms without perspective projection)

    convertPointFromNodeToPage(element, offsetX, offsetY) -> {x, y}
    returns coordinate in window's coordinate system (works properly with css transforms without perspective projection)
*/

(function () {
    "use strict";

    function Point(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    function CSSMatrix(data) {
        this.data = data;
    }

    CSSMatrix.fromString = function (s) {
        var c = s.match(/matrix3?d?\(([^\)]+)\)/i)[1].split(",");
        if (c.length === 6) {
            c = [c[0], c[1], "0", "0", c[2], c[3], "0", "0", "0", "0", "1", "0", c[4], c[5], "0", "1"];
        }
        return new CSSMatrix([parseFloat(c[0 * 4 + 0]), parseFloat(c[1 * 4 + 0]), parseFloat(c[2 * 4 + 0]), parseFloat(c[3 * 4 + 0]), parseFloat(c[0 * 4 + 1]), parseFloat(c[1 * 4 + 1]), parseFloat(c[2 * 4 + 1]), parseFloat(c[3 * 4 + 1]), parseFloat(c[0 * 4 + 2]), parseFloat(c[1 * 4 + 2]), parseFloat(c[2 * 4 + 2]), parseFloat(c[3 * 4 + 2]), parseFloat(c[0 * 4 + 3]), parseFloat(c[1 * 4 + 3]), parseFloat(c[2 * 4 + 3]), parseFloat(c[3 * 4 + 3])]);
    };

    CSSMatrix.prototype.multiply = function (m) {
        var a = this.data;
        var b = m.data;
        return new CSSMatrix([a[0 * 4 + 0] * b[0 * 4 + 0] + a[0 * 4 + 1] * b[1 * 4 + 0] + a[0 * 4 + 2] * b[2 * 4 + 0] + a[0 * 4 + 3] * b[3 * 4 + 0], a[0 * 4 + 0] * b[0 * 4 + 1] + a[0 * 4 + 1] * b[1 * 4 + 1] + a[0 * 4 + 2] * b[2 * 4 + 1] + a[0 * 4 + 3] * b[3 * 4 + 1], a[0 * 4 + 0] * b[0 * 4 + 2] + a[0 * 4 + 1] * b[1 * 4 + 2] + a[0 * 4 + 2] * b[2 * 4 + 2] + a[0 * 4 + 3] * b[3 * 4 + 2], a[0 * 4 + 0] * b[0 * 4 + 3] + a[0 * 4 + 1] * b[1 * 4 + 3] + a[0 * 4 + 2] * b[2 * 4 + 3] + a[0 * 4 + 3] * b[3 * 4 + 3], a[1 * 4 + 0] * b[0 * 4 + 0] + a[1 * 4 + 1] * b[1 * 4 + 0] + a[1 * 4 + 2] * b[2 * 4 + 0] + a[1 * 4 + 3] * b[3 * 4 + 0], a[1 * 4 + 0] * b[0 * 4 + 1] + a[1 * 4 + 1] * b[1 * 4 + 1] + a[1 * 4 + 2] * b[2 * 4 + 1] + a[1 * 4 + 3] * b[3 * 4 + 1], a[1 * 4 + 0] * b[0 * 4 + 2] + a[1 * 4 + 1] * b[1 * 4 + 2] + a[1 * 4 + 2] * b[2 * 4 + 2] + a[1 * 4 + 3] * b[3 * 4 + 2], a[1 * 4 + 0] * b[0 * 4 + 3] + a[1 * 4 + 1] * b[1 * 4 + 3] + a[1 * 4 + 2] * b[2 * 4 + 3] + a[1 * 4 + 3] * b[3 * 4 + 3], a[2 * 4 + 0] * b[0 * 4 + 0] + a[2 * 4 + 1] * b[1 * 4 + 0] + a[2 * 4 + 2] * b[2 * 4 + 0] + a[2 * 4 + 3] * b[3 * 4 + 0], a[2 * 4 + 0] * b[0 * 4 + 1] + a[2 * 4 + 1] * b[1 * 4 + 1] + a[2 * 4 + 2] * b[2 * 4 + 1] + a[2 * 4 + 3] * b[3 * 4 + 1], a[2 * 4 + 0] * b[0 * 4 + 2] + a[2 * 4 + 1] * b[1 * 4 + 2] + a[2 * 4 + 2] * b[2 * 4 + 2] + a[2 * 4 + 3] * b[3 * 4 + 2], a[2 * 4 + 0] * b[0 * 4 + 3] + a[2 * 4 + 1] * b[1 * 4 + 3] + a[2 * 4 + 2] * b[2 * 4 + 3] + a[2 * 4 + 3] * b[3 * 4 + 3], a[3 * 4 + 0] * b[0 * 4 + 0] + a[3 * 4 + 1] * b[1 * 4 + 0] + a[3 * 4 + 2] * b[2 * 4 + 0] + a[3 * 4 + 3] * b[3 * 4 + 0], a[3 * 4 + 0] * b[0 * 4 + 1] + a[3 * 4 + 1] * b[1 * 4 + 1] + a[3 * 4 + 2] * b[2 * 4 + 1] + a[3 * 4 + 3] * b[3 * 4 + 1], a[3 * 4 + 0] * b[0 * 4 + 2] + a[3 * 4 + 1] * b[1 * 4 + 2] + a[3 * 4 + 2] * b[2 * 4 + 2] + a[3 * 4 + 3] * b[3 * 4 + 2], a[3 * 4 + 0] * b[0 * 4 + 3] + a[3 * 4 + 1] * b[1 * 4 + 3] + a[3 * 4 + 2] * b[2 * 4 + 3] + a[3 * 4 + 3] * b[3 * 4 + 3]]);
    };
    CSSMatrix.prototype.translate = function (tx, ty, tz) {
        var z = new CSSMatrix([1, 0, 0, tx, 0, 1, 0, ty, 0, 0, 1, tz, 0, 0, 0, 1]);
        return this.multiply(z);
    };
    CSSMatrix.prototype.inverse = function () {
        var m = this.data;
        var a = m[0 * 4 + 0];
        var b = m[0 * 4 + 1];
        var c = m[0 * 4 + 2];
        var d = m[1 * 4 + 0];
        var e = m[1 * 4 + 1];
        var f = m[1 * 4 + 2];
        var g = m[2 * 4 + 0];
        var h = m[2 * 4 + 1];
        var k = m[2 * 4 + 2];
        var A = e * k - f * h;
        var B = f * g - d * k;
        var C = d * h - e * g;
        var D = c * h - b * k;
        var E = a * k - c * g;
        var F = b * g - a * h;
        var G = b * f - c * e;
        var H = c * d - a * f;
        var K = a * e - b * d;
        var det = a * A + b * B + c * C;
        var X = new CSSMatrix([A / det, D / det, G / det, 0, B / det, E / det, H / det, 0, C / det, F / det, K / det, 0, 0, 0, 0, 1]);
        var Y = new CSSMatrix([1, 0, 0, -m[0 * 4 + 3], 0, 1, 0, -m[1 * 4 + 3], 0, 0, 1, -m[2 * 4 + 3], 0, 0, 0, 1]);
        return X.multiply(Y);
    };
    CSSMatrix.prototype.transformPoint = function (p) {
        var m = this.data;
        return new Point(m[0 * 4 + 0] * p.x + m[0 * 4 + 1] * p.y + m[0 * 4 + 2] * p.z + m[0 * 4 + 3], m[1 * 4 + 0] * p.x + m[1 * 4 + 1] * p.y + m[1 * 4 + 2] * p.z + m[1 * 4 + 3], m[2 * 4 + 0] * p.x + m[2 * 4 + 1] * p.y + m[2 * 4 + 2] * p.z + m[2 * 4 + 3]);
    };

    var isBuggy = false; // Firefox < 12 (https://bugzilla.mozilla.org/show_bug.cgi?id=591718)
    var initialized = false;

    var buggy = function buggy(doc) {
        if (initialized) {
            return isBuggy;
        }
        initialized = true;
        var div = doc.createElement("div");
        div.style.cssText = "width:200px;height:200px;position:fixed;-moz-transform:scale(2);";
        doc.body.appendChild(div);
        var rect = div.getBoundingClientRect();
        isBuggy = getComputedStyle(div, undefined).MozTransform != undefined && rect.bottom - rect.top < 300;
        div.parentNode.removeChild(div);
        return isBuggy;
    };

    function getTransformationMatrix(element) {
        var identity = CSSMatrix.fromString("matrix(1,0,0,1,0,0)");
        var transformationMatrix = identity;
        var x = element;
        var isBuggy = buggy(x.ownerDocument);

        while (x != undefined && x !== x.ownerDocument.documentElement) {
            var computedStyle = window.getComputedStyle(x, undefined);
            var c = CSSMatrix.fromString((computedStyle.transform || computedStyle.OTransform || computedStyle.WebkitTransform || computedStyle.msTransform || computedStyle.MozTransform || "none").replace(/^none$/, "matrix(1,0,0,1,0,0)"));

            if (isBuggy) {
                var r = x.getBoundingClientRect();
                var parentRect = x.parentNode != undefined && x.parentNode.getBoundingClientRect != undefined ? x.parentNode.getBoundingClientRect() : rect;
                var t = identity.translate(r.left - parentRect.left, r.top - parentRect.top, 0);

                var origin = computedStyle.MozTransformOrigin;
                origin = origin.indexOf("%") !== -1 ? "" : origin;
                origin = CSSMatrix.fromString("matrix3d(1,0,0,0,0,1,0,0,0,0,1,0," + ((origin || "0 0") + " 0").split(" ").slice(0, 3) + ",1)");

                transformationMatrix = t.multiply(origin).multiply(c).multiply(origin.inverse()).multiply(transformationMatrix);
            } else {
                transformationMatrix = c.multiply(transformationMatrix);
            }

            x = x.parentNode;
        }

        if (!isBuggy) {
            var w = element.offsetWidth;
            var h = element.offsetHeight;
            var i = 4;
            var left = +Infinity;
            var top = +Infinity;
            while (--i >= 0) {
                var p = transformationMatrix.transformPoint(new Point(i === 0 || i === 1 ? 0 : w, i === 0 || i === 3 ? 0 : h, 0));
                if (p.x < left) {
                    left = p.x;
                }
                if (p.y < top) {
                    top = p.y;
                }
            }
            var rect = element.getBoundingClientRect();
            transformationMatrix = identity.translate(window.pageXOffset + rect.left - left, window.pageYOffset + rect.top - top, 0).multiply(transformationMatrix);
        }

        return transformationMatrix;
    }

    window.convertPointFromPageToNode = function (element, pageX, pageY) {
        return getTransformationMatrix(element).inverse().transformPoint(new Point(pageX, pageY, 0));
    };

    window.convertPointFromNodeToPage = function (element, offsetX, offsetY) {
        return getTransformationMatrix(element).transformPoint(new Point(offsetX, offsetY, 0));
    };
})();

},{}],5:[function(require,module,exports){
"use strict";

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

{
    var context = exports ? exports : {};
    (function () {
        "use strict";

        var Vec2 = function () {
            _createClass(Vec2, null, [{
                key: "add",

                //Static operators
                value: function add(a, b) {
                    return new Vec2(a).add(b);
                }
            }, {
                key: "sub",
                value: function sub(a, b) {
                    return new Vec2(a).sub(b);
                }
            }, {
                key: "mul",
                value: function mul(a, b) {
                    return new Vec2(a).mul(b);
                }
            }, {
                key: "div",
                value: function div(a, b) {
                    return new Vec2(a).div(b);
                }
            }, {
                key: "mod",
                value: function mod(a, b) {
                    return new Vec2(a).mod(b);
                }
            }, {
                key: "min",
                value: function min(a, b) {
                    return new Vec2(a).min(b);
                }
            }, {
                key: "max",
                value: function max(a, b) {
                    return new Vec2(a).max(b);
                }

                //Constructor

            }]);

            function Vec2(a, b) {
                _classCallCheck(this, Vec2);

                if (a == null) a = 0;
                a = a.x != null ? a.x : a;
                b = a.y != null ? a.y : b;
                a = a != null ? a : a;
                b = b != null ? b : a;
                this.data = new Float32Array([a, b]);
            }

            //Shuffle

            _createClass(Vec2, [{
                key: "assign",

                //Assigment and clone
                value: function assign(a) {
                    this.x = a.x != null ? a.x : a;
                    this.y = a.y != null ? a.y : a;
                    return this;
                }
            }, {
                key: "clone",
                value: function clone() {
                    return new Vec2(this);
                }

                //With equal

            }, {
                key: "addAs",
                value: function addAs(a) {
                    return this.set(this.add(a));
                }
            }, {
                key: "subAs",
                value: function subAs(a) {
                    return this.set(this.sub(a));
                }
            }, {
                key: "divAs",
                value: function divAs(a) {
                    return this.set(this.div(a));
                }
            }, {
                key: "mulAs",
                value: function mulAs(a) {
                    return this.set(this.mul(a));
                }
            }, {
                key: "modAs",
                value: function modAs(a) {
                    return this.set(this.mod(a));
                }
            }, {
                key: "minAs",
                value: function minAs(a) {
                    return this.set(this.min(a));
                }
            }, {
                key: "maxAs",
                value: function maxAs(a) {
                    return this.set(this.max(a));
                }

                //Operators

            }, {
                key: "neg",
                value: function neg() {
                    return new Vec2(-this.x, -this.y);
                }
            }, {
                key: "div",
                value: function div(o) {
                    var a = o.x != null ? o.x : o;
                    var b = o.y != null ? o.y : o;
                    return new Vec2(this.x / a, this.y / b);
                }
            }, {
                key: "add",
                value: function add(o) {
                    var a = o.x != null ? o.x : o;
                    var b = o.y != null ? o.y : o;
                    return new Vec2(this.x + a, this.y + b);
                }
            }, {
                key: "mul",
                value: function mul(o) {
                    var a = o.x != null ? o.x : o;
                    var b = o.y != null ? o.y : o;
                    return new Vec2(this.x * a, this.y * b);
                }
            }, {
                key: "sub",
                value: function sub(o) {
                    var a = o.x != null ? o.x : o;
                    var b = o.y != null ? o.y : o;
                    return new Vec2(this.x - a, this.y - b);
                }
            }, {
                key: "mod",
                value: function mod(o) {
                    var a = o.x != null ? o.x : o;
                    var b = o.y != null ? o.y : o;
                    return new Vec2(this.x % a, this.y % b);
                }
            }, {
                key: "min",
                value: function min(o) {
                    var a = o.x != null ? o.x : o;
                    var b = o.y != null ? o.y : o;
                    return new Vec2(Math.min(this.x, a), Math.min(this.y, b));
                }
            }, {
                key: "max",
                value: function max(o) {
                    var a = o.x != null ? o.x : o;
                    var b = o.y != null ? o.y : o;
                    return new Vec2(Math.max(this.x, a), Math.max(this.y, b));
                }

                //Functors

            }, {
                key: "length",
                value: function length() {
                    return Math.sqrt(this.x * this.x + this.y * this.y);
                }
            }, {
                key: "normalize",
                value: function normalize() {
                    return this.div(this.length());
                }
            }, {
                key: "atan",
                value: function atan() {
                    return Math.atan2(this.x, this.y);
                }
            }, {
                key: "x",
                get: function get() {
                    return this.data[0];
                },
                set: function set(a) {
                    this.data[0] = a;
                }
            }, {
                key: "y",
                get: function get() {
                    return this.data[1];
                },
                set: function set(a) {
                    this.data[1] = a;
                }
            }]);

            return Vec2;
        }();

        this.Vec2 = Vec2;
    }).call(context);
}

},{}],6:[function(require,module,exports){
"use strict";

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

{
    (function () {
        var common = require("../helpers/common");
        var wheels = require("../components/wheel");
        var sliders = require("../components/slider");
        var context = window ? window : exports ? exports : {};
        (function () {
            "use strict";

            var css = "\n            .color-container {\n                display: flex;\n                flex-direction: row;\n                background-color: rgb(200, 200, 200);\n                border: solid 1px rgb(162, 162, 162);\n                border-radius: 2px;\n                width: 520px;\n                padding: 5px;\n                font-family: Arial;\n                font-size: 12px;\n            }\n\n            .color-cell {\n                padding-left: 5px;\n                box-sizing: border-box;\n            }\n\n            .color-channel0, .color-channel1, .color-channel2 {\n\n            }\n\n            .color-result-container {\n                display: flex;\n                flex-direction: row;\n            }\n\n            .color-result-fill {\n                width: 40px;\n                height: 40px;\n                border: solid 1px rgb(162, 162, 162);\n            }\n\n            .color-result-input, .color-result-output {\n                padding-left: 5px;\n                font-family: Consolas;\n            }\n\n            .color-input-channel {\n              width: 60px;\n              height: 20px;\n              display: inline-block;\n            }\n\n            .color-wheel {\n              margin-top: 40px;\n              border: solid 1px rgb(162, 162, 162);\n              background-color: rgb(210, 210, 210);\n              box-sizing: content-box;\n            }\n        ";

            var style = document.createElement("style");
            style.type = "text/css";
            style.innerHTML = css;
            document.querySelectorAll("head")[0].appendChild(style);

            var Picker = function () {
                function Picker() {
                    var _this = this;

                    _classCallCheck(this, Picker);

                    this.hcg = [0, 1, 1];
                    this.container = document.createElement("div");

                    {
                        (function () {
                            var that = _this;
                            var container = _this.container;
                            container.classList.add("color-container");
                            container.innerHTML = "\n                        <div class=\"color-cell\">\n                            <canvas class=\"color-wheel\"></canvas>\n                        </div>\n                        <div class=\"color-cell\">\n                            <div>\n                              <br/>\n                              HCG:\n                              </br></br>\n                              <div class=\"color-result-container\">\n                                  <div class=\"color-cell\">\n                                    H:\n                                  </div>\n                                  <div class=\"color-cell\">\n                                     <input type=\"range\" value=\"0\" min=\"0\" max=\"1\" step=\"0.001\" class=\"color-channel0\"/>\n                                  </div>\n                                  <div class=\"color-cell\">\n                                     <input type=\"number\" value=\"0\" class=\"color-input-channel color-hcg-H\" min=\"0\" max=\"360\" step=\"0.1\">\n                                  </div>\n                              </div><br/>\n                              <div class=\"color-result-container\">\n                                  <div class=\"color-cell\">\n                                    C:\n                                  </div>\n                                  <div class=\"color-cell\">\n                                     <input type=\"range\" value=\"1\" min=\"0\" max=\"1\" step=\"0.001\" class=\"color-channel1\"/>\n                                  </div>\n                                  <div class=\"color-cell\">\n                                     <input type=\"number\" value=\"1\" class=\"color-input-channel color-hcg-C\" min=\"0\" max=\"100\" step=\"0.1\">\n                                  </div>\n                              </div><br/>\n                              <div class=\"color-result-container\">\n                                  <div class=\"color-cell\">\n                                    G:\n                                  </div>\n                                  <div class=\"color-cell\">\n                                     <input type=\"range\" value=\"0\" min=\"0\" max=\"1\" step=\"0.001\" class=\"color-channel2\"/>\n                                  </div>\n                                  <div class=\"color-cell\">\n                                     <input type=\"number\" value=\"0\" class=\"color-input-channel color-hcg-G\" min=\"0\" max=\"100\" step=\"0.1\">\n                                  </div>\n                              </div><br/></br>RGB:\n                              <input type=\"number\" value=\"255\" class=\"color-input-channel color-rgb-R\" min=\"0\" max=\"255\" step=\"0.1\">\n                              <input type=\"number\" value=\"0\" class=\"color-input-channel color-rgb-G\" min=\"0\" max=\"255\" step=\"0.1\">\n                              <input type=\"number\" value=\"0\" class=\"color-input-channel color-rgb-B\" min=\"0\" max=\"255\" step=\"0.1\">\n                              <br/>\n                              <br/>\n                            </div>\n                            <div class=\"color-result-container\">\n                                <div class=\"color-cell\">\n                                    <div class=\"color-result-fill\"></div>\n                                </div>\n                                <div class=\"color-cell\">\n                                    <div class=\"color-result-input\"></div>\n                                    <div class=\"color-result-output\"></div>\n                                </div>\n                            </div>\n                            <br/>\n                        </div>\n                    ";

                            _this.c0 = new sliders.HueSlider(container.querySelector(".color-channel0"), _this.hcg);
                            _this.c1 = new sliders.ChromaSlider(container.querySelector(".color-channel1"), _this.hcg);
                            _this.c2 = new sliders.GraySlider(container.querySelector(".color-channel2"), _this.hcg);
                            _this.cg = new wheels.Wheel(container.querySelector(".color-wheel"), _this.hcg);

                            //input numbers
                            _this.th = container.querySelector(".color-hcg-H");
                            _this.tc = container.querySelector(".color-hcg-C");
                            _this.tg = container.querySelector(".color-hcg-G");
                            _this.t_r = container.querySelector(".color-rgb-R");
                            _this.t_g = container.querySelector(".color-rgb-G");
                            _this.t_b = container.querySelector(".color-rgb-B");

                            _this.c2.onchange = _this.c1.onchange = _this.c0.onchange = _this.cg.onchange = function () {
                                that.synchronize();
                            };

                            _this.th.oninput = _this.tc.oninput = _this.tg.oninput = function () {
                                that.updateHCG(this);
                            };
                            _this.t_r.oninput = _this.t_g.oninput = _this.t_b.oninput = function () {
                                that.updateRGB(this);
                            };

                            _this.inputText = container.querySelector(".color-result-input");
                            _this.outputText = container.querySelector(".color-result-output");
                            _this.fillRect = container.querySelector(".color-result-fill");
                        })();
                    }

                    this.synchronize();
                }

                _createClass(Picker, [{
                    key: "updateHCG",
                    value: function updateHCG(el) {
                        if (el == this.th) this.hcg[0] = this.th.value / 360;
                        if (el == this.tc) this.hcg[1] = this.tc.value / 100;
                        if (el == this.tg) this.hcg[2] = this.tg.value / 100;
                        this.synchronize(el);
                    }
                }, {
                    key: "updateRGB",
                    value: function updateRGB(el) {
                        var hcg = common._toHcg([this.t_r.value, this.t_g.value, this.t_b.value]);
                        this.hcg[0] = hcg[0] / 360;
                        this.hcg[1] = hcg[1] / 100;
                        this.hcg[2] = hcg[2] / 100;
                        this.synchronize(el);
                    }
                }, {
                    key: "synchronize",
                    value: function synchronize(el) {
                        var rgb = common._color(this.hcg);
                        this.fillRect.style.backgroundColor = common._strc(rgb);
                        this.inputText.innerHTML = common._strh(this.hcg);
                        this.outputText.innerHTML = common._strc(rgb);

                        //Render these elements
                        this.c0.synchronize();
                        this.c1.synchronize();
                        this.c2.synchronize();
                        this.cg.synchronize();

                        //Update inputs
                        if (el != this.th) this.th.value = this.hcg[0] * 360;
                        if (el != this.tc) this.tc.value = this.hcg[1] * 100;
                        if (el != this.tg) this.tg.value = this.hcg[2] * 100;
                        if (el != this.t_r) this.t_r.value = rgb[0];
                        if (el != this.t_g) this.t_g.value = rgb[1];
                        if (el != this.t_b) this.t_b.value = rgb[2];
                    }
                }, {
                    key: "appendTo",
                    value: function appendTo(elem) {
                        elem.appendChild(this.container);
                        return this;
                    }
                }]);

                return Picker;
            }();

            this.Picker = Picker;
        }).call(context);
    })();
}

},{"../components/slider":1,"../components/wheel":2,"../helpers/common":3}]},{},[6]);
