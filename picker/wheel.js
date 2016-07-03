(function () {
    "use strict";

    var css = ``;
    var style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = css;
    document.querySelectorAll("head")[0].appendChild(style);

    class Wheel {
        constructor(_canvas, source) {
            this.func = hcg2rgb;
            this.glslFunc = `
            vec3 hcg2rgb(in vec3 c){
                vec3 rgb = clamp( abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0, 0.0, 1.0 );
                return mix(vec3(c.z), rgb, c.y);
            }
            `;

            this.channel = [H, C, G];
            this.hcg = source || [0.1, 0.5, 1];

            this.width = 200;
            this.height = 200;

            {
                let opts = { "preserveDrawingBuffer": true };
                let canvas = document.createElement("canvas");
                this.gl = canvas.getContext("webgl", opts) || canvas.getContext("experimental-webgl", opts);
            }
            this.ctx = document.createElement("canvas").getContext("2d");
            this.rtx = (_canvas || document.createElement("canvas")).getContext("2d");
            this.rtx.canvas.style.width = this.width + "px";
            this.pad = 2;

            this.center = new Vec2(0.5, 0.5);
            this.radius = 0.4;
            this.press = false;

            { //Init bindings
                let canvas = this.rtx.canvas;
                let self = this;
                var touch;

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
                    if (!touch) { self.press = false; }
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
                        let point = convertPointFromPageToNode(this, touch.pageX, touch.pageY);
                        self.normalize(point, ev);
                        ev.preventDefault();
                    }
                }.bind(canvas), true);

                canvas.addEventListener("selectstart", function (ev) {
                    ev.preventDefault();
                });

                canvas.addEventListener("mousedown", function (ev) {
                    let point = convertPointFromPageToNode(this, ev.pageX, ev.pageY);
                    self.dopress(point, ev);
                });

                document.addEventListener("mousemove", function (ev) {
                    if (self.press) {
                        let point = convertPointFromPageToNode(this, ev.pageX, ev.pageY);
                        self.normalize(point, ev);
                    }
                }.bind(canvas));

                document.addEventListener("mouseup", function (ev) {
                    self.press = false;
                }.bind(canvas));
            }

            { //WebGL init
                let gl = this.gl;
                let canvas = gl.canvas;

                let vshader = `
                precision highp float;
                attribute vec2 pos;
                varying vec2 vpos;
                void main(){
                    gl_Position = vec4(pos * 2.0 - 1.0, 0.0, 1.0);
                    vpos = pos;
                }
                `

                let fshader = `
                precision highp float;
                varying vec2 vpos;
                struct circle {
                    vec2 center;
                    float radius;
                };
                uniform float gray;
                uniform circle hc;
                uniform vec2 resolution;
                const float PI = 3.14159265359;

                ${this.glslFunc}

                const float wx = 2.0;
                const float wy = 2.0;
                void main(){
                    vec4 color = vec4(0.0);
                    for(float x=0.0;x<wx;x+=1.0){
                        for(float y=0.0;y<wy;y+=1.0){
                            float aspect = resolution.x / resolution.y;
                            float ce = 1.0 - 1.0 / aspect;
                            vec2 part = vec2(x, y) / vec2(wx, wy) / resolution.xy;
                            vec2 partCoord = gl_FragCoord.xy + part * resolution.xy;
                            vec2 xy = (partCoord / resolution.xy) * vec2(aspect, 1.0) - vec2(ce, 0.0) * aspect * 0.5;
                            vec2 f = (xy - hc.center) / hc.radius;
                            float l = length(f);
                            if(l < 1.0) {
                                float h = fract(atan(f.x, f.y) / (PI * 2.0));
                                float c = l;
                                float g = gray;
                                color += vec4(hcg2rgb(vec3(h, c, g)), 1.0);
                            } else {
                                color += vec4(0.0);
                            }
                        }
                    }
                    color /= wx * wy;
                    gl_FragColor = color;
                }
                `

                gl.clearColor(0.0, 0.0, 0.0, 0.0);
                gl.disable(gl.BLEND);
                gl.disable(gl.DEPTH_TEST);

                let vert = gl.createShader(gl.VERTEX_SHADER);
                gl.shaderSource(vert, vshader);
                gl.compileShader(vert);
                if (!gl.getShaderParameter(vert, gl.COMPILE_STATUS)) {
                    console.error(gl.getShaderInfoLog(vert));
                }

                let frag = gl.createShader(gl.FRAGMENT_SHADER);
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
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
                    0.0, 0.0,
                    1.0, 0.0,
                    0.0, 1.0,
                    1.0, 1.0
                ]), gl.STATIC_DRAW);
            }
        }

        dopress(point, ev) {
            let coord = new Vec2(
                (point.x - _pleft(this.rtx.canvas)) / (_pwidth(this.rtx.canvas) / this.width),
                (point.y - _ptop(this.rtx.canvas)) / (_pheight(this.rtx.canvas) / this.height)
                );
            var hcg = this.hcgFromCoord(coord);
            if (hcg[this.channel[1]] <= 1.0 && hcg[this.channel[1]] >= 0.0) {
                this.press = true;
                if (ev) {
                    ev.preventDefault();
                }
            }
        }

        normalize(point) {
            let coord = new Vec2(
                (point.x - _pleft(this.rtx.canvas)) / (_pwidth(this.rtx.canvas) / this.width),
                (point.y - _ptop(this.rtx.canvas)) / (_pheight(this.rtx.canvas) / this.height)
                );
            _set(this.hcg, this.hcgFromCoord(coord));
            for (let i = 0; i < 3; i++) {
                this.hcg[this.channel[i]] = Math.clamp(this.hcg[this.channel[i]], 0.0, 1.0);
            }
            if (this.onchange) { this.onchange(); }
            //this.draw();
        }

        draw() {

            { //WebGL rendering
                let gl = this.gl;
                let canvas = gl.canvas;

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

            { //Canvas rendering
                let ctx = this.ctx;
                let center = this.coordFromHcg();
                let canvas = ctx.canvas;

                canvas.width = this.width * devicePixelRatio;
                canvas.height = this.height * devicePixelRatio;

                ctx.clearRect(0.0, 0.0, canvas.width, canvas.height);
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

            { //Render on main context
                let ctx = this.rtx;
                let canvas = ctx.canvas;

                canvas.width = this.width * devicePixelRatio;
                canvas.height = this.height * devicePixelRatio;

                ctx.save();
                ctx.clearRect(0.0, 0.0, canvas.width, canvas.height);
                ctx.drawImage(this.gl.canvas, 0, 0, canvas.width, canvas.height);
                ctx.drawImage(this.ctx.canvas, 0, 0, canvas.width, canvas.height);
                ctx.restore();
            }
            return this;
        }

        hcgFromCoord(coord) {
            let gl = this.gl;
            let canvas = gl.canvas;
            let res = new Vec2(this.width, this.height);
            let aspect = res.x / res.y;

            let ce = 1.0 / aspect;
            let xy = coord.div(res).mul(new Vec2(aspect, 1.0)).sub(new Vec2(1.0 - ce, 0.0).mul(aspect * 0.5));
            let n = (xy.sub(this.center)).div(this.radius);
            let rad = mod(-n.atan() - Math.PI, Math.PI * 2.0);
            let len = n.length();

            var hcg = Array.from(this.hcg);
            hcg[this.channel[0]] = rad / (Math.PI * 2.0);
            hcg[this.channel[1]] = len;
            return hcg;
        }

        coordFromHcg() {
            let gl = this.gl;
            let canvas = gl.canvas;

            let res = new Vec2(this.width, this.height);
            let angle = (this.hcg[this.channel[0]] || 0) * (Math.PI * 2) - Math.PI / 2;
            let n = new Vec2(Math.cos(angle), Math.sin(angle)).mul(this.hcg[this.channel[1]]);
            let xy = n.mul(this.radius).add(this.center);

            let aspect = res.x / res.y;
            let ce = 1.0 / aspect;
            let result = xy.add(new Vec2(1.0 - ce, 0.0).mul(aspect * 0.5)).div(new Vec2(aspect, 1.0)).mul(res);
            return result;
        }

        appendTo(element) {
            element.appendChild(this.rtx.canvas);
            return this;
        }

        synchronize(hcg) {
            if(hcg) _set(this.hcg, hcg);
            this.draw();
            return this;
        }
    }

    this.Wheel = Wheel;

}).call(this);
