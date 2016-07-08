
var convert = require("../convert");
var plotly = require("plotly")("acterhd", "7cd7ouvqss");
var trace = [];
var colors = [];
var ax = [];
var ay = [];
var az = [];


for(let height = 0; height < 1; height += 1 / 8){
    let dcounter = 0;
    for(let depth = 0;depth < 1; depth += 1 / 8){
        dcounter++;
        for(let degree = 0; degree < 1; degree += 1 / (4 * dcounter)){
            var x = Math.cos(degree * Math.PI * 2) * depth;
            var y = Math.sin(degree * Math.PI * 2) * depth;
            var z = height * 2;
            var rgb = convert.hcg2rgb([degree * 360, depth * 100, height * 100]);
            var r = parseInt(rgb[0]);
            var g = parseInt(rgb[1]);
            var b = parseInt(rgb[2]);
            colors.push(`rgb(${r}, ${g}, ${b})`);
            ax.push(x);
            ay.push(y);
            az.push(z);
        }
    }
}

trace.push({
    x: ax,
    y: ay,
    z: az,
    mode: 'markers',
    marker: {
        color: colors,
        size: 12,
        symbol: 'circle',
        opacity: 0.9
    },
    type: 'scatter3d'
});

var data = trace;
var layout = {margin: {
    l: 0,
    r: 0,
    b: 0,
    t: 0
}};
var graphOptions = {layout: layout, filename: "hcg-visualization", fileopt: "overwrite"};
plotly.plot(data, graphOptions, function (err, msg) {
    console.log(msg);
});
