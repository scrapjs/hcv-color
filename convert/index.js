(()=>{

  let mod = (a, n) => {
    return ((a % n) + n) % n;
  };

  const shift = [0.0, 2.0, 4.0];

  let rgb2hcg = (rgb)=>{
    let m = Math.min.apply(Math, rgb);
    let M = Math.max.apply(Math, rgb);
    let C = M - m;
    let gbr = Array.from(rgb).map((v, i, arr)=> { return arr[mod(i - 1, 3)]; });
    let brg = Array.from(rgb).map((v, i, arr)=> { return arr[mod(i - 2, 3)]; });
    let G = C < 1 ? m / (1 - C) : 0;
    let H = C > 0 ? Math.max.apply(Math, Array.from(rgb).map(function(v, i){
      let a = (brg[i] - gbr[i]) / C;
      let b = mod(a + shift[i], 6.0);
      return b * (M == v);
    })) : 0.0;
    return [H / 6.0, C, G];
  };

  let hcg2rgb = ([H, C, G])=>{
    let h = H * 6.0;
    let rgb = Array.from([h, h, h]).map(function(v, i){
      let a = mod(v - shift[i], 6.0);
      let b = Math.abs(a - 3.0) - 1.0;
      return Math.min(Math.max(b, 0.0), 1.0);
    });
    let m = G * (1 - C);
    return rgb.map(function(ch){
      return ch * C + m;
    });
  };

  let convert = {rgb2hcg, hcg2rgb};
  if(typeof window != "undefined") window.convert = convert;
  if(typeof module != "undefined") Object.assign(module.exports, convert);

})();
