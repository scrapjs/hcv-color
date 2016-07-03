(function () {
    "use strict";

    class Vec2 {

        //Static operators
        static add(a, b) {
            return new Vec2(a).add(b);
        }
        static sub(a, b) {
            return new Vec2(a).sub(b);
        }
        static mul(a, b) {
            return new Vec2(a).mul(b);
        }
        static div(a, b) {
            return new Vec2(a).div(b);
        }
        static mod(a, b) {
            return new Vec2(a).mod(b);
        }
        static min(a, b) {
            return new Vec2(a).min(b);
        }
        static max(a, b) {
            return new Vec2(a).max(b);
        }

        //Constructor
        constructor(a, b) {
            if(a == null) a = 0;
            a = a.x != null ? a.x : a;
            b = a.y != null ? a.y : b;
            a = a != null ? a : a;
            b = b != null ? b : a;
            this.data = new Float32Array([a, b]);
        }

        //Shuffle
        get x() {
            return this.data[0];
        }
        set x(a) {
            this.data[0] = a;
        }

        get y() {
            return this.data[1];
        }
        set y(a) {
            this.data[1] = a;
        }

        //Assigment and clone
        assign(a) {
            this.x = a.x != null ? a.x : a;
            this.y = a.y != null ? a.y : a;
            return this;
        }
        clone() {
            return new Vec2(this);
        }

        //With equal
        addAs(a) {
            return this.set(this.add(a));
        }
        subAs(a) {
            return this.set(this.sub(a));
        }
        divAs(a) {
            return this.set(this.div(a));
        }
        mulAs(a) {
            return this.set(this.mul(a));
        }
        modAs(a) {
            return this.set(this.mod(a));
        }
        minAs(a) {
            return this.set(this.min(a));
        }
        maxAs(a) {
            return this.set(this.max(a));
        }

        //Operators
        neg() {
            return new Vec2(-this.x, -this.y);
        }
        div(o) {
            let a = o.x != null ? o.x : o;
            let b = o.y != null ? o.y : o;
            return new Vec2(this.x / a, this.y / b);
        }
        add(o) {
            let a = o.x != null ? o.x : o;
            let b = o.y != null ? o.y : o;
            return new Vec2(this.x + a, this.y + b);
        }
        mul(o) {
            let a = o.x != null ? o.x : o;
            let b = o.y != null ? o.y : o;
            return new Vec2(this.x * a, this.y * b);
        }
        sub(o) {
            let a = o.x != null ? o.x : o;
            let b = o.y != null ? o.y : o;
            return new Vec2(this.x - a, this.y - b);
        }
        mod(o) {
            let a = o.x != null ? o.x : o;
            let b = o.y != null ? o.y : o;
            return new Vec2(this.x % a, this.y % b);
        }
        min(o) {
            let a = o.x != null ? o.x : o;
            let b = o.y != null ? o.y : o;
            return new Vec2(Math.min(this.x, a), Math.min(this.y, b));
        }
        max(o) {
            let a = o.x != null ? o.x : o;
            let b = o.y != null ? o.y : o;
            return new Vec2(Math.max(this.x, a), Math.max(this.y, b));
        }

        //Functors
        length() {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }
        normalize() {
            return this.div(this.length());
        }
        atan() {
            return Math.atan2(this.x, this.y);
        }
    }

    this.Vec2 = Vec2;

}).call(this);