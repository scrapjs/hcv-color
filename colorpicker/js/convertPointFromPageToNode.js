/*jslint plusplus: true, vars: true, indent: 2 */

/*
  convertPointFromPageToNode(element, event.pageX, event.pageY) -> {x, y}
  returns coordinate in element's local coordinate system (works properly with css transforms without perspective projection)

  convertPointFromNodeToPage(element, offsetX, offsetY) -> {x, y}
  returns coordinate in window's coordinate system (works properly with css transforms without perspective projection)
*/
(function () {
  "use strict";

  function Point(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  function CSSMatrix(data) {
    this.data = data;
  }

  CSSMatrix.fromString = function (s) {
    var c = s.match(/matrix3?d?\(([^\)]+)\)/i)[1].split(",");
    if (c.length === 6) {
      c = [c[0], c[1], "0", "0", c[2], c[3], "0", "0", "0", "0", "1", "0", c[4], c[5], "0", "1"];
    }
    return new CSSMatrix([
      parseFloat(c[0 * 4 + 0]),
      parseFloat(c[1 * 4 + 0]),
      parseFloat(c[2 * 4 + 0]),
      parseFloat(c[3 * 4 + 0]),

      parseFloat(c[0 * 4 + 1]),
      parseFloat(c[1 * 4 + 1]),
      parseFloat(c[2 * 4 + 1]),
      parseFloat(c[3 * 4 + 1]),

      parseFloat(c[0 * 4 + 2]),
      parseFloat(c[1 * 4 + 2]),
      parseFloat(c[2 * 4 + 2]),
      parseFloat(c[3 * 4 + 2]),

      parseFloat(c[0 * 4 + 3]),
      parseFloat(c[1 * 4 + 3]),
      parseFloat(c[2 * 4 + 3]),
      parseFloat(c[3 * 4 + 3]),
    ]);
  };

  CSSMatrix.prototype.multiply = function (m) {
    var a = this.data;
    var b = m.data;
    return new CSSMatrix([
      a[0 * 4 + 0] * b[0 * 4 + 0] + a[0 * 4 + 1] * b[1 * 4 + 0] + a[0 * 4 + 2] * b[2 * 4 + 0] + a[0 * 4 + 3] * b[3 * 4 + 0],
      a[0 * 4 + 0] * b[0 * 4 + 1] + a[0 * 4 + 1] * b[1 * 4 + 1] + a[0 * 4 + 2] * b[2 * 4 + 1] + a[0 * 4 + 3] * b[3 * 4 + 1],
      a[0 * 4 + 0] * b[0 * 4 + 2] + a[0 * 4 + 1] * b[1 * 4 + 2] + a[0 * 4 + 2] * b[2 * 4 + 2] + a[0 * 4 + 3] * b[3 * 4 + 2],
      a[0 * 4 + 0] * b[0 * 4 + 3] + a[0 * 4 + 1] * b[1 * 4 + 3] + a[0 * 4 + 2] * b[2 * 4 + 3] + a[0 * 4 + 3] * b[3 * 4 + 3],

      a[1 * 4 + 0] * b[0 * 4 + 0] + a[1 * 4 + 1] * b[1 * 4 + 0] + a[1 * 4 + 2] * b[2 * 4 + 0] + a[1 * 4 + 3] * b[3 * 4 + 0],
      a[1 * 4 + 0] * b[0 * 4 + 1] + a[1 * 4 + 1] * b[1 * 4 + 1] + a[1 * 4 + 2] * b[2 * 4 + 1] + a[1 * 4 + 3] * b[3 * 4 + 1],
      a[1 * 4 + 0] * b[0 * 4 + 2] + a[1 * 4 + 1] * b[1 * 4 + 2] + a[1 * 4 + 2] * b[2 * 4 + 2] + a[1 * 4 + 3] * b[3 * 4 + 2],
      a[1 * 4 + 0] * b[0 * 4 + 3] + a[1 * 4 + 1] * b[1 * 4 + 3] + a[1 * 4 + 2] * b[2 * 4 + 3] + a[1 * 4 + 3] * b[3 * 4 + 3],

      a[2 * 4 + 0] * b[0 * 4 + 0] + a[2 * 4 + 1] * b[1 * 4 + 0] + a[2 * 4 + 2] * b[2 * 4 + 0] + a[2 * 4 + 3] * b[3 * 4 + 0],
      a[2 * 4 + 0] * b[0 * 4 + 1] + a[2 * 4 + 1] * b[1 * 4 + 1] + a[2 * 4 + 2] * b[2 * 4 + 1] + a[2 * 4 + 3] * b[3 * 4 + 1],
      a[2 * 4 + 0] * b[0 * 4 + 2] + a[2 * 4 + 1] * b[1 * 4 + 2] + a[2 * 4 + 2] * b[2 * 4 + 2] + a[2 * 4 + 3] * b[3 * 4 + 2],
      a[2 * 4 + 0] * b[0 * 4 + 3] + a[2 * 4 + 1] * b[1 * 4 + 3] + a[2 * 4 + 2] * b[2 * 4 + 3] + a[2 * 4 + 3] * b[3 * 4 + 3],

      a[3 * 4 + 0] * b[0 * 4 + 0] + a[3 * 4 + 1] * b[1 * 4 + 0] + a[3 * 4 + 2] * b[2 * 4 + 0] + a[3 * 4 + 3] * b[3 * 4 + 0],
      a[3 * 4 + 0] * b[0 * 4 + 1] + a[3 * 4 + 1] * b[1 * 4 + 1] + a[3 * 4 + 2] * b[2 * 4 + 1] + a[3 * 4 + 3] * b[3 * 4 + 1],
      a[3 * 4 + 0] * b[0 * 4 + 2] + a[3 * 4 + 1] * b[1 * 4 + 2] + a[3 * 4 + 2] * b[2 * 4 + 2] + a[3 * 4 + 3] * b[3 * 4 + 2],
      a[3 * 4 + 0] * b[0 * 4 + 3] + a[3 * 4 + 1] * b[1 * 4 + 3] + a[3 * 4 + 2] * b[2 * 4 + 3] + a[3 * 4 + 3] * b[3 * 4 + 3],
    ]);
  };
  CSSMatrix.prototype.translate = function (tx, ty, tz) {
    var z = new CSSMatrix([1, 0, 0, tx, 0, 1, 0, ty, 0, 0, 1, tz, 0, 0, 0, 1]);
    return this.multiply(z);
  };
  CSSMatrix.prototype.inverse = function () {
    var m = this.data;
    var a = m[0 * 4 + 0];
    var b = m[0 * 4 + 1];
    var c = m[0 * 4 + 2];
    var d = m[1 * 4 + 0];
    var e = m[1 * 4 + 1];
    var f = m[1 * 4 + 2];
    var g = m[2 * 4 + 0];
    var h = m[2 * 4 + 1];
    var k = m[2 * 4 + 2];
    var A = e * k - f * h;
    var B = f * g - d * k;
    var C = d * h - e * g;
    var D = c * h - b * k;
    var E = a * k - c * g;
    var F = b * g - a * h;
    var G = b * f - c * e;
    var H = c * d - a * f;
    var K = a * e - b * d;
    var det = a * A + b * B + c * C;
    var X = new CSSMatrix([A / det, D / det, G / det, 0,
                           B / det, E / det, H / det, 0,
                           C / det, F / det, K / det, 0,
                                 0,       0,       0, 1]);
    var Y = new CSSMatrix([1, 0, 0, -m[0 * 4 + 3],
                           0, 1, 0, -m[1 * 4 + 3],
                           0, 0, 1, -m[2 * 4 + 3],
                           0, 0, 0,            1]);
    return X.multiply(Y);
  };
  CSSMatrix.prototype.transformPoint = function (p) {
    var m = this.data;
    return new Point(m[0 * 4 + 0] * p.x + m[0 * 4 + 1] * p.y + m[0 * 4 + 2] * p.z + m[0 * 4 + 3],
                     m[1 * 4 + 0] * p.x + m[1 * 4 + 1] * p.y + m[1 * 4 + 2] * p.z + m[1 * 4 + 3],
                     m[2 * 4 + 0] * p.x + m[2 * 4 + 1] * p.y + m[2 * 4 + 2] * p.z + m[2 * 4 + 3]);
  };

  var isBuggy = false; // Firefox < 12 (https://bugzilla.mozilla.org/show_bug.cgi?id=591718)
  var initialized = false;

  var buggy = function (doc) {
    if (initialized) {
      return isBuggy;
    }
    initialized = true;
    var div = doc.createElement("div");
    div.style.cssText = "width:200px;height:200px;position:fixed;-moz-transform:scale(2);";
    doc.body.appendChild(div);
    var rect = div.getBoundingClientRect();
    isBuggy = getComputedStyle(div, undefined).MozTransform != undefined && (rect.bottom - rect.top < 300);
    div.parentNode.removeChild(div);
    return isBuggy;
  };

  function getTransformationMatrix(element) {
    var identity = CSSMatrix.fromString("matrix(1,0,0,1,0,0)");
    var transformationMatrix = identity;
    var x = element;
    var isBuggy = buggy(x.ownerDocument);

    while (x != undefined && x !== x.ownerDocument.documentElement) {
      var computedStyle = window.getComputedStyle(x, undefined);
      var c = CSSMatrix.fromString((computedStyle.transform || computedStyle.OTransform || computedStyle.WebkitTransform || computedStyle.msTransform ||  computedStyle.MozTransform || "none").replace(/^none$/, "matrix(1,0,0,1,0,0)"));

      if (isBuggy) {
        var r = x.getBoundingClientRect();
        var parentRect = x.parentNode != undefined && x.parentNode.getBoundingClientRect != undefined ? x.parentNode.getBoundingClientRect() : rect;
        var t = identity.translate(r.left - parentRect.left, r.top - parentRect.top, 0);

        var origin = computedStyle.MozTransformOrigin;
        origin = origin.indexOf("%") !== -1 ? "" : origin;
        origin = CSSMatrix.fromString("matrix3d(1,0,0,0,0,1,0,0,0,0,1,0," + ((origin || "0 0") + " 0").split(" ").slice(0, 3) + ",1)");

        transformationMatrix = t.multiply(origin).multiply(c).multiply(origin.inverse()).multiply(transformationMatrix);
      } else {
        transformationMatrix = c.multiply(transformationMatrix);
      }

      x = x.parentNode;
    }

    if (!isBuggy) {
      var w = element.offsetWidth;
      var h = element.offsetHeight;
      var i = 4;
      var left = +Infinity;
      var top = +Infinity;
      while (--i >= 0) {
        var p = transformationMatrix.transformPoint(new Point(i === 0 || i === 1 ? 0 : w, i === 0 || i === 3 ? 0 : h, 0));
        if (p.x < left) {
          left = p.x;
        }
        if (p.y < top) {
          top = p.y;
        }
      }
      var rect = element.getBoundingClientRect();
      transformationMatrix = identity.translate(window.pageXOffset + rect.left - left, window.pageYOffset + rect.top - top, 0).multiply(transformationMatrix);
    }

    return transformationMatrix;
  }

  window.convertPointFromPageToNode = function (element, pageX, pageY) {
    return getTransformationMatrix(element).inverse().transformPoint(new Point(pageX, pageY, 0));
  };

  window.convertPointFromNodeToPage = function (element, offsetX, offsetY) {
    return getTransformationMatrix(element).transformPoint(new Point(offsetX, offsetY, 0));
  };

}());
