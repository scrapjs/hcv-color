(function () {
    "use strict";

    let css = `
.color-container {
    display: flex;
}

.color-column {
    height: available;
    height: -moz-available;
    width: available;
    width: -moz-available;
    width: -webkit-fill-available;
}

.color-box {
    width: 550px;
    background-color: rgb(240, 240, 240);
    border: solid 1px gray;
}

.color-inside {
    height: available;
    height: -moz-available;
    width: available;
    width: -moz-available;
    width: -webkit-fill-available;
}

.color-sized {
    width: max-content;
    width: -moz-max-content;
    width: -webkit-max-content;
    padding: 5px;
}

.color-container-value {
    display: block;
}

.color-visual {
    display: block;
    width: 40px;
    height: 30px;
    border: solid 1px gray;
}

.color-text {
    font-family: Consolas;
    font-size: 0.8em;
    display: block;
    padding-left: 5px;
}

.color-wrap {
    width: max-content;
    width: -moz-max-content;
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

    class Values {
        constructor(){
            this.hcg = [0, 1, 1];
            this.container = document.createElement("div");
            let container = this.container;
            container.classList.add("color-container");

            let arr = [];
            for(let i=0;i<2;i++){
                let cnt = document.createElement("div");
                cnt.classList.add("color-column");
                cnt.classList.add("color-wrap");
                container.appendChild(cnt);
                arr.push(cnt);
            }

            let color = document.createElement("div");
            color.classList.add("color-visual");
            arr[0].appendChild(color);

            let rgbText = document.createElement("div");
            rgbText.classList.add("color-text");
            this.rgbText = rgbText;
            arr[1].appendChild(rgbText);

            let hcgText = document.createElement("div");
            hcgText.classList.add("color-text");
            this.hcgText = hcgText;
            arr[1].appendChild(hcgText);

            this.color = color;
            this.func = hcg2rgb;
        }

        draw(){
            let color = this.color;
            let rgb = _strc(_color(this.hcg, this.func));
            color.style.backgroundColor = rgb;

            this.hcgText.innerHTML = ` ${_strh(this.hcg)}`;
            this.rgbText.innerHTML = ` ${rgb}`;
            return this;
        }

        synchronize(hcg){
            _set(this.hcg, hcg);
            this.draw();
            return this;
        }

        appendTo(elem){
            elem.appendChild(this.container);
            return this;
        }
    }






    class Picker {
        constructor(){
            this.hue = new HueSlider();
            this.chroma = new ChromaSlider();
            this.gray = new GraySlider();
            this.wheel = new Wheel();
            this.values = new Values();

            {
                let wheel = this.wheel;
                let hue = this.hue;
                let chroma = this.chroma;
                let gray = this.gray;
                let self = this;

                wheel.onchange = function(){
                    chroma.synchronize(this.hcg);
                    hue.synchronize(this.hcg);
                    gray.synchronize(this.hcg);
                    self._onchange(this.hcg);
                }

                gray.onchange = function(){
                    wheel.synchronize(this.hcg);
                    hue.synchronize(this.hcg);
                    chroma.synchronize(this.hcg);
                    self._onchange(this.hcg);
                }

                hue.onchange = function(){
                    gray.synchronize(this.hcg);
                    wheel.synchronize(this.hcg);
                    chroma.synchronize(this.hcg);
                    self._onchange(this.hcg);
                }

                chroma.onchange = function(){
                    hue.synchronize(this.hcg);
                    wheel.synchronize(this.hcg);
                    gray.synchronize(this.hcg);
                    self._onchange(this.hcg);
                }
            }

            {
                let wheel = this.wheel;
                let hue = this.hue;
                let chroma = this.chroma;
                let gray = this.gray;

                let inputs = [hue, chroma, gray];
                let container = document.createElement("div");
                this.container = container;

                container.classList.add("color-container");
                container.classList.add("color-box");

                {
                    let inputc = document.createElement("div");
                    inputc.classList.add("color-column");

                    let wheelc = document.createElement("div");
                    wheelc.classList.add("color-column");
                    wheelc.classList.add("color-sized");

                    container.appendChild(wheelc);
                    container.appendChild(inputc);

                    {
                        wheel.appendTo(wheelc);
                    }

                    for(let i=0;i<1;i++){
                        let br = document.createElement("br");
                        inputc.appendChild(br);
                    }

                    for(let i=0;i<inputs.length;i++){
                        let slid = inputs[i];
                        let cont = document.createElement("div");
                        cont.classList.add("color-container");
                        cont.classList.add("color-inside");

                        let colu = document.createElement("div");
                        colu.classList.add("color-column");
                        slid.appendTo(colu);

                        cont.appendChild(colu);
                        inputc.appendChild(cont);
                    }

                    for(let i=0;i<2;i++){
                        let br = document.createElement("br");
                        inputc.appendChild(br);
                    }

                    {
                        this.values.appendTo(inputc);
                    }
                }

                wheel.onchange();
            }
        }

        appendTo(element){
            element.appendChild(this.container);
            return this;
        }

        _onchange(hcg){
            this.values.synchronize(hcg);
            if(this.onchange) this.onchange();
            return this;
        }
    }

    this.Picker = Picker;

}).call(this);