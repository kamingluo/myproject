! function(n, t) {
  "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : n.Ald = t()
}(this, function() {
  function n() {
    this.concurrency = 4, this.queue = [], this.tasks = [], this.activeCount = 0;
    var n = this;
    this.push = function(t) {
      this.tasks.push(new Promise(function(e, o) {
        var r = function() {
          n.activeCount++, t().then(function(n) {
            e(n)
          }).then(function() {
            n.next()
          })
        };
        n.activeCount < n.concurrency ? r() : n.queue.push(r)
      }))
    }, this.all = function() {
      return Promise.all(this.tasks)
    }, this.next = function() {
      n.activeCount--, n.queue.length > 0 && n.queue.shift()()
    }
  }

  function t(n) {
    this.app = n
  }

  function e(n) {
    B = w(), K = n, this.aldstat = new t(this)
  }

  function o(n) {
    var t;
    t = n.scene != fn, fn = n.scene, G = 0, K = n, $ = n.query.ald_share_src, z = n.query.aldsrc || "", F = n.query.ald_share_src, cn || (V = !1), cn = !1, un || (0 !== j && Date.now() - j > 3e4 ? (E = w(), T = Date.now()) : t && (T = Date.now(), E = w())), 0 !== j && Date.now() - j < 3e4 && (en = !0), n.query.ald_share_src && "1044" == n.scene && n.shareTicket ? wx.getShareInfo({
      shareTicket: n.shareTicket,
      success: function(n) {
        Y = n, D("event", "ald_share_click", JSON.stringify(n))
      }
    }) : n.query.ald_share_src && D("event", "ald_share_click", 1), "" === Z && wx.getSetting({
      withCredentials: !0,
      success: function(n) {
        if (n.authSetting["scope.userInfo"]) {
          wx.getUserInfo({
            withCredentials: !0,
            success: function(n) {
              var t = g();
              Z = n, t.ufo = S(n), Q = v(n.userInfo.avatarUrl.split("/")), p(t)
            }
          })
        }
      }
    }), m("app", "show")
  }

  function r() {
    j = Date.now(), "" === Z && wx.getSetting({
      success: function(n) {
        n.authSetting["scope.userInfo"] && wx.getUserInfo({
          withCredentials: !0,
          success: function(n) {
            Z = n, Q = v(n.userInfo.avatarUrl.split("/"));
            var t = g();
            t.ufo = S(n), p(t)
          }
        })
      }
    }), m("app", "hide")
  }

  function i(n) {
    X++, D("event", "ald_error_message", n)
  }

  function a(n) {
    an = n
  }

  function s() {
    on = b ? this.$mp.page.route : this.route, x("page", "show"), en = !1
  }

  function c() {
    rn = on
  }

  function u() {
    rn = on
  }

  function f() {
    D("event", "ald_pulldownrefresh", 1)
  }

  function l() {
    D("event", "ald_reachbottom", 1)
  }

  function h(n) {
    un = !0;
    var t = y(n.path),
      e = {};
    for (var o in K.query) "ald_share_src" === o && (e[o] = K.query[o]);
    var r = "";
    if (r = n.path.indexOf("?") == -1 ? n.path + "?" : n.path.substr(0, n.path.indexOf("?")) + "?", "" !== t)
      for (var o in t) e[o] = t[o];
    e.ald_share_src ? e.ald_share_src.indexOf(W) == -1 && e.ald_share_src.length < 200 && (e.ald_share_src = e.ald_share_src + "," + W) : e.ald_share_src = W;
    for (var i in e) i.indexOf("ald") == -1 && (r += i + "=" + e[i] + "&");
    return n.path = r + "ald_share_src=" + e.ald_share_src, D("event", "ald_share_status", n), n
  }

  function d() {
    function n() {
      return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
    }
    return n() + n() + n() + n() + n() + n() + n() + n()
  }

  function p(n) {
    function t() {
      return new Promise(function(t, e) {
        wx.request({
          url: "https://" + C + ".aldwx.com/d.html",
          data: n,
          header: {
            AldStat: "MiniApp-Stat",
            se: N || "",
            op: J || "",
            img: Q,
            ai: O
          },
          method: "GET",
          success: function(n) {
            t(200 == n.statusCode ? "" : "status error")
          },
          fail: function() {
            t("fail")
          }
        })
      })
    }
    G++, n.at = E, n.et = Date.now(), n.uu = W, n.v = H, n.ak = I.app_key.replace(/(\t)|(\s)/g, ""), n.wsr = K, n.ifo = V, n.rq_c = G, n.ls = B, n.st = Date.now(), n.te = U, wx.Queue.push(t)
  }

  function g() {
    var n = {};
    for (var t in nn) n[t] = nn[t];
    return n
  }

  function v(n) {
    for (var t = "", e = 0; e < n.length; e++) n[e].length > t.length && (t = n[e]);
    return t
  }

  function w() {
    return "" + Date.now() + Math.floor(1e7 * Math.random())
  }

  function S(n) {
    var t = {};
    for (var e in n) "rawData" != e && "errMsg" != e && (t[e] = n[e]);
    return t
  }

  function y(n) {
    if (n.indexOf("?") == -1) return "";
    var t = {};
    return n.split("?")[1].split("&").forEach(function(n) {
      var e = n.split("=")[1];
      t[n.split("=")[0]] = e
    }), t
  }

  function _(n) {
    for (var t in n)
      if ("object" == typeof n[t] && null !== n[t]) return !0;
    return !1
  }

  function m(n, t) {
    var e = g();
    e.ev = n, e.life = t, e.ec = X, e.dr = Date.now() - T, z && (e.qr = z, e.sr = z), $ && (e.usr = $), p(e)
  }

  function x(n, t) {
    var e = g();
    e.ev = n, e.life = t, e.pp = on, e.pc = rn, e.dr = Date.now() - T, un && (e.so = 1), un = !1, an && "{}" != JSON.stringify(an) && (e.ag = an), z && (e.qr = z, e.sr = z), $ && (e.usr = $), en && (e.ps = 1), tn || (sn = on, tn = !0, e.ifp = tn, e.fp = on), p(e)
  }

  function D(n, t, e) {
    var o = g();
    o.ev = n, o.tp = t, o.dr = Date.now() - T, e && (o.ct = e), p(o)
  }

  function A(n, t, e) {
    if (n[t]) {
      var o = n[t];
      n[t] = function(n) {
        e.call(this, n, t), o.call(this, n)
      }
    } else n[t] = function(n) {
      e.call(this, n, t)
    }
  }

  function M(n) {
    var t = {};
    for (var a in n) "onLaunch" !== a && "onShow" !== a && "onHide" !== a && "onError" !== a && (t[a] = n[a]);
    return t.onLaunch = function(t) {
      e.call(this, t), "function" == typeof n.onLaunch && n.onLaunch.call(this, t)
    }, t.onShow = function(t) {
      o.call(this, t), n.onShow && "function" == typeof n.onShow && n.onShow.call(this, t)
    }, t.onHide = function() {
      r.call(this), n.onHide && "function" == typeof n.onHide && n.onHide.call(this)
    }, t.onError = function(t) {
      i.call(this, t), n.onError && "function" == typeof n.onError && n.onError.call(this, t)
    }, t
  }

  function q(n) {
    var t = {};
    for (var e in n) "onLoad" !== e && "onShow" !== e && "onHide" !== e && "onUnload" !== e && "onPullDownRefresh" !== e && "onReachBottom" !== e && "onShareAppMessage" !== e && (t[e] = n[e]);
    return t.onLoad = function(t) {
      a.call(this, t), "function" == typeof n.onLoad && n.onLoad.call(this, t)
    }, t.onShow = function(t) {
      s.call(this), "function" == typeof n.onShow && n.onShow.call(this, t)
    }, t.onHide = function(t) {
      c.call(this), "function" == typeof n.onHide && n.onHide.call(this, t)
    }, t.onUnload = function(t) {
      u.call(this), "function" == typeof n.onUnload && n.onUnload.call(this, t)
    }, t.onReachBottom = function(t) {
      l(), n.onReachBottom && "function" == typeof n.onReachBottom && n.onReachBottom.call(this, t)
    }, t.onPullDownRefresh = function(t) {
      f(), n.onPullDownRefresh && "function" == typeof n.onPullDownRefresh && n.onPullDownRefresh.call(this, t)
    }, n.onShareAppMessage && "function" == typeof n.onShareAppMessage && (t.onShareAppMessage = function(t) {
      var e = n.onShareAppMessage.call(this, t);
      return void 0 === e ? (e = {}, e.path = this.route) : void 0 === e.path && (e.path = this.route), h.call(this, e)
    }), t
  }

  function P(n) {
    return App(M(n))
  }

  function L(n) {
    return Page(q(n))
  }

  function R(n) {
    return b = !0, M(n)
  }

  function k(n) {
    return q(n)
  }
  void 0 === wx.Queue && (wx.Queue = new n, wx.Queue.all());
  var I = require("./ald-stat-conf"),
    H = "7.2.6",
    C = "log",
    U = "wx",
    O = function() {
      return wx.getAccountInfoSync().miniProgram.appId.split("").map(function(n) {
        return n.charCodeAt(0) + 9
      }).join("-")
    }(),
    b = !1,
    E = "",
    B = "",
    T = 0,
    j = 0,
    N = "",
    J = "",
    Q = "",
    G = 0,
    K = "",
    V = "",
    W = function() {
      var n = "";
      try {
        n = wx.getStorageSync("aldstat_uuid")
      } catch (t) {
        n = "uuid_getstoragesync"
      }
      if (n) V = !1;
      else {
        n = d();
        try {
          wx.setStorageSync("aldstat_uuid", n), V = !0
        } catch (n) {
          wx.setStorageSync("aldstat_uuid", "uuid_getstoragesync")
        }
      }
      return n
    }(),
    $ = "",
    z = "",
    F = "",
    X = 0,
    Y = "",
    Z = "",
    nn = {},
    tn = !1,
    en = !1,
    on = "",
    rn = "",
    an = "",
    sn = "",
    cn = !0,
    un = !1,
    fn = "";
  ! function() {
    wx.request({
      url: "https://" + C + ".aldwx.com/config/app.json",
      header: {
        AldStat: "MiniApp-Stat"
      },
      method: "GET",
      success: function(n) {
        200 === n.statusCode && (H < n.data.version && console.warn("您的SDK不是最新版本，请尽快升级！"), n.data.warn && console.warn(n.data.warn), n.data.error && console.error(n.data.error))
      }
    })
  }();
  try {
    var ln = wx.getSystemInfoSync();
    nn.br = ln.brand, nn.pm = ln.model, nn.pr = ln.pixelRatio, nn.ww = ln.windowWidth, nn.wh = ln.windowHeight, nn.lang = ln.language, nn.wv = ln.version, nn.wvv = ln.platform, nn.wsdk = ln.SDKVersion, nn.sv = ln.system
  } catch (n) {}
  wx.getNetworkType({
    success: function(n) {
      nn.nt = n.networkType
    }
  }), wx.getSetting({
    success: function(n) {
      n.authSetting["scope.userLocation"] ? wx.getLocation({
        type: "wgs84",
        success: function(n) {
          nn.lat = n.latitude, nn.lng = n.longitude, nn.spd = n.speed
        }
      }) : I.getLocation && wx.getLocation({
        type: "wgs84",
        success: function(n) {
          nn.lat = n.latitude, nn.lng = n.longitude, nn.spd = n.speed
        }
      })
    }
  }), t.prototype.sendEvent = function(n, t) {
    if ("" !== n && "string" == typeof n && n.length <= 255)
      if ("string" == typeof t && t.length <= 255) D("event", n, t);
      else if ("object" == typeof t) {
      if (JSON.stringify(t).length >= 255) return void console.error("自定义事件参数不能超过255个字符");
      if (_(t)) return void console.error("事件参数，参数内部只支持Number,String等类型，请参考接入文档");
      D("event", n, JSON.stringify(t))
    } else void 0 === t ? D("event", n, !1) : console.error("事件参数必须为String,Object类型,且参数长度不能超过255个字符");
    else console.error("事件名称必须为String类型且不能超过255个字符")
  }, t.prototype.sendSession = function(n) {
    if ("" === n || !n) return void console.error("请传入从后台获取的session_key");
    N = n;
    var t = g();
    t.tp = "session", t.ct = "session", t.ev = "event", "" === Z ? wx.getSetting({
      success: function(n) {
        n.authSetting["scope.userInfo"] ? wx.getUserInfo({
          success: function(n) {
            t.ufo = S(n), Q = v(n.userInfo.avatarUrl.split("/")), "" !== Y && (t.gid = Y), p(t)
          }
        }) : "" !== Y && (t.gid = Y, p(t))
      }
    }) : (t.ufo = Z, "" !== Y && (t.gid = Y), p(t))
  }, t.prototype.sendOpenid = function(n) {
    if ("" === n || !n) return void console.error("openID不能为空");
    J = n;
    var t = g();
    t.tp = "openid", t.ev = "event", t.ct = "openid", p(t)
  };
  return I.plugin ? {
    App: P,
    Page: L,
    MpvueApp: R,
    MpvuePage: k
  } : function(n) {
    ! function() {
      var n = App,
        t = Page,
        d = Component;
      App = function(t) {
        A(t, "onLaunch", e), A(t, "onShow", o), A(t, "onHide", r), A(t, "onError", i), n(t)
      }, Page = function(n) {
        var e = n.onShareAppMessage;
        A(n, "onLoad", a), A(n, "onUnload", u), A(n, "onShow", s), A(n, "onHide", c), A(n, "onReachBottom", l), A(n, "onPullDownRefresh", f), void 0 !== e && null !== e && (n.onShareAppMessage = function(n) {
          if (void 0 !== e) {
            var t = e.call(this, n);
            return void 0 === t ? (t = {}, t.path = on) : void 0 === t.path && (t.path = on), h(t)
          }
        }), t(n)
      }, Component = function(n) {
        try {
          var t = n.methods.onShareAppMessage;
          A(n.methods, "onLoad", a), A(n.methods, "onUnload", u), A(n.methods, "onShow", s), A(n.methods, "onHide", c), A(n.methods, "onReachBottom", l), A(n.methods, "onPullDownRefresh", f), void 0 !== t && null !== t && (n.methods.onShareAppMessage = function(n) {
            if (void 0 !== t) {
              var e = t.call(this, n);
              return void 0 === e ? (e = {}, e.path = on) : void 0 === e.path && (e.path = on), h(e)
            }
          }), d(n)
        } catch (t) {
          d(n)
        }
      }
    }()
  }()
});