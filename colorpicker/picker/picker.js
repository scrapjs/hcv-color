(function () {
    "use strict";

    let css = `
        .color-container {
            display: flex;
            flex-direction: row;
            background-color: rgb(192, 192, 192);
            border: solid 1px rgb(128, 128, 128);
            border-radius: 2px;
            width: 460px;
        }

        .color-cell {
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
            border: solid 1px rgb(128, 128, 128);
        }

        .color-result-input, .color-result-output {
            padding-left: 5px;
            font-family: Consolas;
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
                        <br/>
                        <input type="range" min="0" max="100" class="color-channel0"/><br/>
                        <input type="range" min="0" max="100" class="color-channel1"/><br/>
                        <input type="range" min="0" max="100" class="color-channel2"/><br/>
                        <br/>
                        <div class="color-result-container">
                            <div class="color-cell">
                                <div class="color-result-fill"></div>
                            </div>
                            <div class="color-cell">
                                <div class="color-result-input"></div>
                                <div class="color-result-output"></div>
                            </div>
                        </div>
                    </div>
                `;

                this.c0 = new HueSlider(container.querySelector(".color-channel0"), this.hcg);
                this.c1 = new ChromaSlider(container.querySelector(".color-channel1"), this.hcg);
                this.c2 = new GraySlider(container.querySelector(".color-channel2"), this.hcg);
                this.cg = new Wheel(container.querySelector(".color-wheel"), this.hcg);

                this.c2.onchange =
                this.c1.onchange =
                this.c0.onchange =
                this.cg.onchange = function(){
                    that.synchronize();
                }

                this.inputText = container.querySelector(".color-result-input");
                this.outputText = container.querySelector(".color-result-output");
                this.fillRect = container.querySelector(".color-result-fill");
            }

            this.synchronize();
        }

        synchronize(){
            var rgb = _color(this.hcg);
            this.fillRect.style.backgroundColor = _strc(rgb);
            this.inputText.innerHTML = _strh(this.hcg);
            this.outputText.innerHTML = _strc(rgb);

            this.c0.synchronize();
            this.c1.synchronize();
            this.c2.synchronize();
            this.cg.synchronize();
        }

        appendTo(elem){
            elem.appendChild(this.container);
            return this;
        }
    }

    this.Picker = Picker;

}).call(this);
