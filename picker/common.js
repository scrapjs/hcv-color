"use strict";

const H = 0;
const C = 1;
const G = 2;

Math.clamp = function (num, min, max) {
    return Math.max(min, Math.min(num, max));
}

function _strc(a, name) {
    return (name || "rgb") + `(${Math.round(a[0]) }, ${Math.round(a[1]) }, ${Math.round(a[2]) })`;
}

function _strh(a, name) {
    return (name || "hcg") + `(${Math.round(a[0] * 360) }, ${Math.round(a[1] * 100) }%, ${Math.round(a[2]*100) }%)`;
}

function _color(hcg, func) {
    if(func || hcg2rgb) return (func || hcg2rgb)([hcg[0] * 360, hcg[1] * 100, hcg[2] * 100]);
}

function _toHcg(rgb, func) {
    if(func || rgb2hcg) return (func || rgb2hcg)([rgb[0], rgb[1], rgb[2]]);
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
