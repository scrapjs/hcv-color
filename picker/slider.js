(function () {
    "use strict";

    let track = `
    {
        background-color: transparent;
        width: 100%;
        padding: 0;
        height: 100%;
        border: none;
    }
    `

    let thumb = `
    {
        border-radius: 0px;
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        background-color: rgba(255, 255, 255, 0.6);
        width: 8px;
        height: 30px;
        transform: translateY(-5px);
        display: inline-block;
        border: solid 1px rgba(128, 128, 128, 0.6);
        box-sizing: border-box;
    }
    `

    let css = `
    .color-input {
        display: inline-block;
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        width: 200px !important;
        height: 20px;
        padding: 0;
        background-repeat: no-repeat;
        background-size: calc(100% - 8px) 100%;
        background-position: center center;
        background-color: rgb(128, 128, 128);
        background-origin: content-box;
        background-clip: content-box;
        outline: none;
        border: solid 1px rgb(162, 162, 162);
        box-sizing: content-box;
    }

    .color-input::-webkit-slider-thumb ${thumb}
    .color-input::-webkit-slider-runnable-track ${track}
    .color-input::-moz-range-thumb ${thumb}
    .color-input::-moz-range-track ${track}
    `;

    var style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = css;
    document.querySelectorAll("head")[0].appendChild(style);

    class Slider {
        constructor(input, source){
            this.input = input || document.createElement("input");
            this.channel = H;
            this.gcount = 2;
            this.hcg = source || [0, 1, 1];
            this.min = 0;
            this.max = 1;
            this.init();

            {
                let input = this.input;
                let self = this;
                input.classList.add("color-input");
                input.addEventListener("input", function(){
                    self.hcg[self.channel] = this.value;
                    if (self.onchange) { self.onchange(); }
                    self.draw();
                });
            }
        }

        init(){
            let input = this.input;
            input.type = "range";
            input.min = this.min;
            input.max = this.max;
            input.step = (this.max - this.min) * 0.0001;
            input.value = this.hcg[this.channel];
            this.draw();
            return this;
        }

        draw(){
            var head = "linear-gradient";
            var path = [];

            for(let i=0;i<this.gcount;i++){
                var hcg = Array.from(this.hcg);
                var perc = i / (this.gcount-1);
                hcg[this.channel] = this.min + (this.max - this.min) * perc;
                path.push(`${_strc(_color(hcg, this.func))} ${(perc * 100).toFixed(2)}%`);
            }

            var str = `${head}(to right, ${path.join(",")})`;
            this.input.style.backgroundImage = str;
            return this;
        }

        synchronize(hcg){
            if(hcg) _set(this.hcg, hcg);
            if(this.input.value != this.hcg[this.channel]) {
                this.input.value = this.hcg[this.channel];
            }
            this.draw();
            return this;
        }

        appendTo(element){
            element.appendChild(this.input);
            return this;
        }
    }

    class HueSlider extends Slider {
        constructor(input, source){
            super(input, source);
            this.func = hcg2rgb;
            this.gcount = 7;
            this.channel = H;
            this.init();
        }
    }

    class ChromaSlider extends Slider {
        constructor(input, source){
            super(input, source);
            this.func = hcg2rgb;
            this.channel = C;
            this.init();
        }
    }

    class GraySlider extends Slider {
        constructor(input, source){
            super(input, source);
            this.func = hcg2rgb;
            this.channel = G;
            this.init();
        }
    }

    this.Slider = Slider;
    this.HueSlider = HueSlider;
    this.ChromaSlider = ChromaSlider;
    this.GraySlider = GraySlider;

}).call(this);
