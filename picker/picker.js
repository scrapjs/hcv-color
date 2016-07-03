(function () {
    "use strict";

    let css = `
        .color-container {
            display: flex;
            flex-direction: row;
            background-color: rgb(200, 200, 200);
            border: solid 1px rgb(162, 162, 162);
            border-radius: 2px;
            width: 510px;
            padding: 5px;
        }

        .color-cell {
            padding-left: 5px;
            box-sizing: border-box;
        }

        .color-channel0, .color-channel1, .color-channel2 {

        }

        .color-result-container {
            display: flex;
            flex-direction: row;
        }

        .color-result-fill {
            width: 40px;
            height: 40px;
            border: solid 1px rgb(162, 162, 162);
        }

        .color-result-input, .color-result-output {
            padding-left: 5px;
            font-family: Consolas;
        }

        .color-input-channel {
          width: 60px;
          height: 20px;
          display: inline-block;
        }

        .color-wheel {
          margin-top: 40px;
          border: solid 1px rgb(162, 162, 162);
          background-color: rgb(210, 210, 210);
          box-sizing: content-box;
        }
    `;

var style = document.createElement("style");
style.type = "text/css";
style.innerHTML = css;
document.querySelectorAll("head")[0].appendChild(style);

    const H = 0;
    const C = 1;
    const G = 2;

    Math.clamp = function (num, min, max) {
        return Math.max(min, Math.min(num, max));
    }

    function _strc(a) {
        return `rgb(${Math.round(a[0]) }, ${Math.round(a[1]) }, ${Math.round(a[2]) })`;
    }

    function _strh(a) {
        return `hcg(${Math.round(a[0] * 360) }, ${Math.round(a[1] * 100) }%, ${Math.round(a[2]*100) }%)`;
    }

    function _color(hcg, func) {
        return (func || hcg2rgb)([hcg[0] * 360, hcg[1] * 100, hcg[2] * 100]);
    }

    function _toHcg(rgb, func) {
        return (func || rgb2hcg)([rgb[0], rgb[1], rgb[2]]);
    }

    function _pleft(el) {
        var c = getComputedStyle(el, "");
        var pd = parseInt(c.paddingLeft);
        var bd = parseInt(c.borderLeftWidth);
        return pd + bd;
    }

    function _ptop(el) {
        var c = getComputedStyle(el, "");
        var pd = parseInt(c.paddingTop);
        var bd = parseInt(c.borderTopWidth);
        return pd + bd;
    }

    function _pwidth(el) {
        var c = getComputedStyle(el, "");
        var pd = parseInt(c.paddingLeft) + parseInt(c.paddingRight);
        return el.clientWidth - pd;
    }

    function _pheight(el) {
        var c = getComputedStyle(el, "");
        var pd = parseInt(c.paddingTop) + parseInt(c.paddingBottom);
        return el.clientHeight - pd;
    }

    function mod(a, n) {
        return ((a % n) + n) % n;
    }

    function _set(a, b, o){
        o = o || 0;
        for(let i=0;i<b.length;i++){
            a[i + o] = b[i];
        }
    }

    class Picker {
        constructor(){
            this.hcg = [0, 1, 1];
            this.container = document.createElement("div");

            {
                let that = this;
                let container = this.container;
                container.classList.add("color-container");
                container.innerHTML = `
                    <div class="color-cell">
                        <canvas class="color-wheel"></canvas>
                    </div>
                    <div class="color-cell">
                        <div>
                          <br/>
                          HCG:
                          </br>
                          <div class="color-result-container">
                              <div class="color-cell">
                                 <input type="range" value="0" min="0" max="1" step="0.001" class="color-channel0"/>
                              </div>
                              <div class="color-cell">
                                 <input type="number" value="0" class="color-input-channel color-hcg-H" min="0" max="360" step="0.1">
                              </div>
                          </div><br/>
                          <div class="color-result-container">
                              <div class="color-cell">
                                 <input type="range" value="1" min="0" max="1" step="0.001" class="color-channel1"/>
                              </div>
                              <div class="color-cell">
                                 <input type="number" value="1" class="color-input-channel color-hcg-C" min="0" max="100" step="0.1">
                              </div>
                          </div><br/>
                          <div class="color-result-container">
                              <div class="color-cell">
                                 <input type="range" value="0" min="0" max="1" step="0.001" class="color-channel2"/>
                              </div>
                              <div class="color-cell">
                                 <input type="number" value="0" class="color-input-channel color-hcg-G" min="0" max="100" step="0.1">
                              </div>
                          </div><br/>RGB:<br/>
                          <input type="number" value="255" class="color-input-channel color-rgb-R" min="0" max="255" step="0.1">
                          <input type="number" value="0" class="color-input-channel color-rgb-G" min="0" max="255" step="0.1">
                          <input type="number" value="0" class="color-input-channel color-rgb-B" min="0" max="255" step="0.1">
                          <br/>
                          <br/>
                        </div>
                        <div class="color-result-container">
                            <div class="color-cell">
                                <div class="color-result-fill"></div>
                            </div>
                            <div class="color-cell">
                                <div class="color-result-input"></div>
                                <div class="color-result-output"></div>
                            </div>
                        </div>
                        <br/>
                    </div>
                `;

                this.c0 = new HueSlider(container.querySelector(".color-channel0"), this.hcg);
                this.c1 = new ChromaSlider(container.querySelector(".color-channel1"), this.hcg);
                this.c2 = new GraySlider(container.querySelector(".color-channel2"), this.hcg);
                this.cg = new Wheel(container.querySelector(".color-wheel"), this.hcg);

                this.th = container.querySelector(".color-hcg-H");
                this.tc = container.querySelector(".color-hcg-C");
                this.tg = container.querySelector(".color-hcg-G");

                this.t_r = container.querySelector(".color-rgb-R");
                this.t_g = container.querySelector(".color-rgb-G");
                this.t_b = container.querySelector(".color-rgb-B");

                this.c2.onchange =
                this.c1.onchange =
                this.c0.onchange =
                this.cg.onchange = function(){
                    that.synchronize();
                }

                this.th.oninput = this.tc.oninput = this.tg.oninput = function(){
                    that.updateHCG(this);
                }
                this.t_r.oninput = this.t_g.oninput = this.t_b.oninput = function(){
                    that.updateRGB(this);
                }

                this.inputText = container.querySelector(".color-result-input");
                this.outputText = container.querySelector(".color-result-output");
                this.fillRect = container.querySelector(".color-result-fill");
            }

            this.synchronize();
        }

        updateHCG(el){
            if(el == this.th) this.hcg[0] = this.th.value / 360;
            if(el == this.tc) this.hcg[1] = this.tc.value / 100;
            if(el == this.tg) this.hcg[2] = this.tg.value / 100;
            this.synchronize(el);
        }

        updateRGB(el){
            var hcg = _toHcg([this.t_r.value, this.t_g.value, this.t_b.value]);
            this.hcg[0] = hcg[0] / 360;
            this.hcg[1] = hcg[1] / 100;
            this.hcg[2] = hcg[2] / 100;
            this.synchronize(el);
        }

        synchronize(el){
            var rgb = _color(this.hcg);
            this.fillRect.style.backgroundColor = _strc(rgb);
            this.inputText.innerHTML = _strh(this.hcg);
            this.outputText.innerHTML = _strc(rgb);

            this.c0.synchronize();
            this.c1.synchronize();
            this.c2.synchronize();
            this.cg.synchronize();

            if(el != this.th) this.th.value = this.hcg[0] * 360;
            if(el != this.tc) this.tc.value = this.hcg[1] * 100;
            if(el != this.tg) this.tg.value = this.hcg[2] * 100;

            if(el != this.t_r) this.t_r.value = rgb[0];
            if(el != this.t_g) this.t_g.value = rgb[1];
            if(el != this.t_b) this.t_b.value = rgb[2];
        }

        appendTo(elem){
            elem.appendChild(this.container);
            return this;
        }
    }

    this.Picker = Picker;

}).call(this);
