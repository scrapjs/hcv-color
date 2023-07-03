const shift = [0.0, 2.0, 4.0];
const mod = (a, n) => (((a % n) + n) % n);
export const rgb2hcv = (rgb) => {
    const m = Math.min(...rgb.slice(0, 3));
    const M = Math.max(...rgb.slice(0, 3));
    const C = Math.min(Math.max(M - m, 0.0), 1.0);
    const gbr = rgb.map((v, i, arr) => arr[mod(i - 2, 3)]);
    const brg = rgb.map((v, i, arr) => arr[mod(i - 1, 3)]);
    const V = C < 1.0 ? m / (1.0 - C) : 0.0;
    const H = C > 0.0 ? Math.max(...rgb.map((v, i) => (mod((gbr[i] - brg[i]) / C + shift[i], 6.0) * (M == v)))) : 0.0;
    return [H / 6.0, C, V];
};
export const hcv2rgb = ([H, C, V]) => {
    const h = H * 6.0;
    const rgb = [h, h, h].map((v, i) => Math.min(Math.max(Math.abs(mod(v - shift[i], 6.0) - 3.0) - 1.0, 0.0), 1.0));
    const m = V * (1.0 - C);
    return rgb.map((ch) => ch * C + m);
};
