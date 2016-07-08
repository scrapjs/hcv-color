
let context = {};
Object.assign(context, require("./convert"));
if(typeof exports != "undefined") Object.assign(exports, context);
if(typeof window != "undefined") window.convert = context;
