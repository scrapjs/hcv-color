module.exports = function(less) {
  function clamp(val) {
      return Math.min(1, Math.max(0, val));
  }
	function number(n) {
		if (n.type === "Dimension") {
			return parseFloat(n.unit.is('%') ? n.value / 100 : n.value);
		} else if (typeof(n) === 'number') {
			return n;
		} else {
			throw {
				type: "Argument",
				message: "color functions take numbers as parameters"
			};
		}
	}
  var colorFunctions = {
    hcg: function(h, c, gr) {
      return colorFunctions.hcga(h, c, gr, 1.0);
    },

    hcga: function(h, c, gr, a) {
      h  = (number(h) % 360) / 360 * 6;
      c  = number(c); gr = number(gr);

      if (c <= 0) {
        return [gr * 255, gr * 255, gr * 255];
      }

      var i = Math.floor(h),
          f = h - i,
          q = c * (1 - f), t = c * f,
          mod = i % 6,
          r = [c, q, 0, 0, t, c][mod],
          g = [t, c, c, q, 0, 0][mod],
          b = [0, 0, t, c, c, q][mod],
          m = (1 - c) * gr;

      return less.functions.functionRegistry.get("rgba")(
        (r + m) * 255,
        (g + m) * 255,
        (b + m) * 255,
        a
      );
    }
  };
  return colorFunctions;
};
