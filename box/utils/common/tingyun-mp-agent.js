"use strict";
var e = [],
  a = {
    networkType: "",
    system: {}
  };

function n(n) {
  e.push(n)
}

function t() {
  e = []
}

function r() {
  return e.slice()
}

function o(e) {
  return function(n) {
    return "Array" === e && Array.isArray ? Array.isArray(n) : Object.prototype.toString.call(n) === "[object " + e + "]"
  }
}
var c = o("String"),
  d = o("Function"),
  i = o("Object");

function u(n, e) {
  return function() {
    d(e) && e.apply(this, arguments), d(n) && n.apply(this, arguments)
  }
}

function s(n, e) {
  if (i(n) && d(n.handler)) {
    var t = n.name,
      r = n.handler;
    e[t] = u(e[t], r)
  }
}

function h() {
  return +new Date
}

function f() {
  return (getCurrentPages() || []).map(function(n) {
    return n.route
  })
}

function l() {
  var n = f();
  return 0 < n.length ? n[n.length - 1] : ""
}
var p = function() {
  function n(n) {
    return n < 0 ? NaN : n <= 30 ? 0 | Math.random() * (1 << n) : n <= 53 ? (0 | Math.random() * (1 << 30)) + (0 | Math.random() * (1 << n - 30)) * (1 << 30) : NaN
  }

  function e(n, e) {
    for (var t = n.toString(16), r = e - t.length, a = "0"; 0 < r; r >>>= 1, a += a) 1 & r && (t = a + t);
    return t
  }
  return function() {
    return e(n(32), 8) + "-" + e(n(16), 4) + "-" + e(16384 | n(12), 4) + "-" + e(32768 | n(14), 4) + "-" + e(n(48), 12)
  }
}();

function v(n) {
  return n && c(n) ? JSON.parse(n) : n
}

function g(n) {
  try {
    return v(n)
  } catch (n) {}
  return null
}

function m(n) {
  var e = "";
  try {
    e = JSON.stringify(n)
  } catch (n) {
    e = ""
  }
  return e
}

function y(n) {
  return n + ""
}

function w(n) {
  return n ? i(n) ? m(n).length : c(n) ? n.length : n instanceof ArrayBuffer ? n.byteLength : n.length ? n.length : 0 : 0
}
var S = {},
  T = [],
  b = [],
  x = !1,
  k = 0,
  O = {};

function _() {
  S = {}, T = [], b = [], k = 0
}

function N(n) {
  x = n
}

function j() {
  k = h()
}
var q = {};

function A(n) {
  q = n || {}
}
var P = 6e5,
  I = "TY_SAMPLING",
  C = wx.getStorageSync(I),
  E = !1;

function U(n) {
  console.log("TINGYUN AGENT checking sampling"), q.key && q.beacon && wx.request({
    url: "".concat(q.beacon, "/mp-config/config/pullSampling?encodeMpId=").concat(q.key),
    method: "GET",
    _no_record: !0,
    success: function(n) {
      var e = n.data || {},
        t = e.code,
        r = e.data;
      200 === t && r && (C = r.sampling || 1, wx.setStorageSync(I, C))
    },
    fail: function() {
      C = 1
    },
    complete: function() {
      n && n(C)
    }
  })
}

function G() {
  "" === C && (C = +q.sampleRate || 1, U());
  var n = Math.random();
  E = n <= C
}
setInterval(U, P);
var L = "recordTyTime",
  M = "TINGYUN_UID";

function D(n, e) {
  a.uid = n, wx.setStorageSync(M, n)
}
wx.onNetworkStatusChange(function(n) {
  a.networkType = n.networkType
}), a.system = wx.getSystemInfoSync();
var H = {
    version: "1.0.0",
    setUser: D,
    config: A
  },
  R = {
    uid: Y(),
    sid: p(),
    v: "1.0.0"
  };

function Y() {
  var n = wx.getStorageSync(M);
  return n || (n = p(), wx.setStorageSync(M, n)), n
}

function J(n) {
  if (E) {
    var e = Object.assign({}, R, a || {}, {
      key: q.key
    }, n || {});
    e.launch = !n, wx.request({
      url: "".concat(q.beacon, "/mp-app"),
      data: e,
      method: "POST",
      _no_record: !0
    })
  }
}

function X() {
  if (E && !x) {
    var n = Object.assign({}, {
      path: l(),
      pageEvent: Object.assign({}, S),
      requests: T.slice(),
      errs: b.slice(),
      fromPath: O.prev || ""
    }, Object.assign({}, R, a || {}, {
      key: q.key
    }), 0 < k ? {
      ct: k
    } : {});
    _(), N(!0), wx.request({
      url: "".concat(q.beacon, "/mp-page"),
      data: n,
      method: "POST",
      _no_record: !0
    })
  }
}

function B() {
  return !0
}

function F(n) {
  G();
  var e = n.path,
    t = n.query,
    r = n.scene;
  a.openPath = e, a.query = t, a.scene = r, wx.getNetworkType({
    success: function(n) {
      a.networkType = n.networkType
    },
    complete: function() {
      J()
    }
  })
}

function z(n) {
  if (n) {
    var e = n.split(/\n/),
      t = e[2] || "",
      i = "",
      u = 0,
      s = 0;
    e.every(function(n) {
      var e = n && n.trim();
      if (0 === e.indexOf("at ")) {
        var t = e.indexOf("("),
          r = e.indexOf(")");
        if (t && r) {
          var a = t + 1;
          r < a && (a = r);
          var o = e.substring(a, r);
          if (o) {
            var c = o.split(":");
            c && 2 < c.length && (i = (c.slice(0, c.length - 2) || []).join(":"), u = +c[c.length - 2], s = +c[c.length - 1])
          }
          return !1
        }
      }
      return !0
    }), i || (i = l()), b.push({
      time: h(),
      msg: t,
      filename: i,
      lineno: u,
      colno: s,
      stack: n
    })
  }
}

function K() {
  var n = r();
  t();
  var e = O.current;
  O.prev = "", O.current = "", J({
    routeChain: n,
    closePath: e
  })
}
var Q = [{
  name: "onLaunch",
  handler: F
}, {
  name: "onError",
  handler: z
}, {
  name: "onHide",
  handler: K
}];

function V() {
  var n = App;
  App = function(e) {
    Q.forEach(function(n) {
      s(n, e)
    }), n && n.call(this, e)
  }
}

function W() {
  S.onLoad = h()
}

function Z() {
  S.onShow = h(), n(this.route), O.prev = O.current, O.current = this.route, N(!1)
}

function $() {
  S.onReady = h()
}

function nn() {
  S.onHide = h(), X()
}

function en() {
  S.onUnload = h(), X()
}
var tn = [{
  name: "onLoad",
  handler: W
}, {
  name: "onShow",
  handler: Z
}, {
  name: "onReady",
  handler: $
}, {
  name: "onHide",
  handler: nn
}, {
  name: "onUnload",
  handler: en
}];

function rn() {
  var n = Page;
  Page = function(e) {
    tn.forEach(function(n) {
      s(n, e)
    }), e[L] = j, n && n.call(this, e)
  }
}

function an(n, e) {
  if (n) {
    var t = g(n["X-Tingyun-Tx-Data"]);
    if (t && t.r && y(t.r) === y(e)) return t
  }
  return null
}

function on(n) {
  if (!n) return 0;
  var e = n.header,
    t = n.data,
    r = 0;
  return (r = e && e["Content-Length"]) || (r = w(t) || 0), r
}

function cn() {
  var n = wx.request;
  Object.defineProperty(wx, "request", {
    configurable: !0,
    enumerable: !0,
    writable: !0,
    value: function() {
      var c = arguments[0] || {};
      if (!c._no_record) {
        var i, u, t, r, s, f = h() % 1e9;
        c.header = c.header || {}, c.header["X-Tingyun-Id"] = "".concat(q.id, ";r=").concat(f), d(c.success) && (t = c.success), d(c.fail) && (r = c.fail), d(c.complete) && (s = c.complete);
        var l = 0;
        c.success = function() {
          if (u || (u = h()), t) {
            var n = h();
            t.apply(this, arguments);
            var e = h() - n;
            0 < e && (l += e)
          }
        }, c.fail = function() {
          if (u || (u = h()), r) {
            var n = h();
            r.apply(this, arguments);
            var e = h() - n;
            0 < e && (l += e)
          }
        }, c.complete = function(n) {
          if (n.statusCode) {
            if (u || (u = h()), s) {
              var e = h();
              s.apply(this, arguments);
              var t = h() - e;
              0 < t && (l += t)
            }
            var r = {},
              a = an(n.header, f);
            a && (r.s_id = a.id, r.s_name = a.action, a.time && (r.s_du = a.time.duration, r.s_qu = a.time.qu), r.t_id = a.trId);
            var o = {
              url: c.url,
              method: c.method && c.method.toUpperCase() || "GET",
              start: i,
              end: u,
              cbTime: l,
              duration: u - i,
              send: w(c.data),
              rec: on(n),
              statusCode: n.statusCode || 0
            };
            T.push(Object.assign({}, o, r))
          }
        }, i = h()
      }
      return n.apply(this, arguments)
    }
  })
}

function un() {
  return B() && (V(), rn(), cn()), H
}
var sn = un();
module.exports = sn;