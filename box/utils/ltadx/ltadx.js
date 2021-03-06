function safe_add(e, f) {
  var g = (65535 & e) + (65535 & f);
  return (e >> 16) + (f >> 16) + (g >> 16) << 16 | 65535 & g
}

function rol(e, f) {
  return e << f | e >>> 32 - f
}

function cmn(e, f, g, h, j, k) {
  return safe_add(rol(safe_add(safe_add(f, e), safe_add(h, k)), j), g)
}

function ff(e, f, g, h, j, k, l) {
  return cmn(f & g | ~f & h, e, f, j, k, l)
}

function gg(e, f, g, h, j, k, l) {
  return cmn(f & h | g & ~h, e, f, j, k, l)
}

function hh(e, f, g, h, j, k, l) {
  return cmn(f ^ g ^ h, e, f, j, k, l)
}

function ii(e, f, g, h, j, k, l) {
  return cmn(g ^ (f | ~h), e, f, j, k, l)
}

function coreMD5(e) {
  for (var f = 1732584193, g = -271733879, h = -1732584194, j = 271733878, k = 0; k < e.length; k += 16) {
    var l = f,
      m = g,
      n = h,
      o = j;
    f = ff(f, g, h, j, e[k + 0], 7, -680876936), j = ff(j, f, g, h, e[k + 1], 12, -389564586), h = ff(h, j, f, g, e[k + 2], 17, 606105819), g = ff(g, h, j, f, e[k + 3], 22, -1044525330), f = ff(f, g, h, j, e[k + 4], 7, -176418897), j = ff(j, f, g, h, e[k + 5], 12, 1200080426), h = ff(h, j, f, g, e[k + 6], 17, -1473231341), g = ff(g, h, j, f, e[k + 7], 22, -45705983), f = ff(f, g, h, j, e[k + 8], 7, 1770035416), j = ff(j, f, g, h, e[k + 9], 12, -1958414417), h = ff(h, j, f, g, e[k + 10], 17, -42063), g = ff(g, h, j, f, e[k + 11], 22, -1990404162), f = ff(f, g, h, j, e[k + 12], 7, 1804603682), j = ff(j, f, g, h, e[k + 13], 12, -40341101), h = ff(h, j, f, g, e[k + 14], 17, -1502002290), g = ff(g, h, j, f, e[k + 15], 22, 1236535329), f = gg(f, g, h, j, e[k + 1], 5, -165796510), j = gg(j, f, g, h, e[k + 6], 9, -1069501632), h = gg(h, j, f, g, e[k + 11], 14, 643717713), g = gg(g, h, j, f, e[k + 0], 20, -373897302), f = gg(f, g, h, j, e[k + 5], 5, -701558691), j = gg(j, f, g, h, e[k + 10], 9, 38016083), h = gg(h, j, f, g, e[k + 15], 14, -660478335), g = gg(g, h, j, f, e[k + 4], 20, -405537848), f = gg(f, g, h, j, e[k + 9], 5, 568446438), j = gg(j, f, g, h, e[k + 14], 9, -1019803690), h = gg(h, j, f, g, e[k + 3], 14, -187363961), g = gg(g, h, j, f, e[k + 8], 20, 1163531501), f = gg(f, g, h, j, e[k + 13], 5, -1444681467), j = gg(j, f, g, h, e[k + 2], 9, -51403784), h = gg(h, j, f, g, e[k + 7], 14, 1735328473), g = gg(g, h, j, f, e[k + 12], 20, -1926607734), f = hh(f, g, h, j, e[k + 5], 4, -378558), j = hh(j, f, g, h, e[k + 8], 11, -2022574463), h = hh(h, j, f, g, e[k + 11], 16, 1839030562), g = hh(g, h, j, f, e[k + 14], 23, -35309556), f = hh(f, g, h, j, e[k + 1], 4, -1530992060), j = hh(j, f, g, h, e[k + 4], 11, 1272893353), h = hh(h, j, f, g, e[k + 7], 16, -155497632), g = hh(g, h, j, f, e[k + 10], 23, -1094730640), f = hh(f, g, h, j, e[k + 13], 4, 681279174), j = hh(j, f, g, h, e[k + 0], 11, -358537222), h = hh(h, j, f, g, e[k + 3], 16, -722521979), g = hh(g, h, j, f, e[k + 6], 23, 76029189), f = hh(f, g, h, j, e[k + 9], 4, -640364487), j = hh(j, f, g, h, e[k + 12], 11, -421815835), h = hh(h, j, f, g, e[k + 15], 16, 530742520), g = hh(g, h, j, f, e[k + 2], 23, -995338651), f = ii(f, g, h, j, e[k + 0], 6, -198630844), j = ii(j, f, g, h, e[k + 7], 10, 1126891415), h = ii(h, j, f, g, e[k + 14], 15, -1416354905), g = ii(g, h, j, f, e[k + 5], 21, -57434055), f = ii(f, g, h, j, e[k + 12], 6, 1700485571), j = ii(j, f, g, h, e[k + 3], 10, -1894986606), h = ii(h, j, f, g, e[k + 10], 15, -1051523), g = ii(g, h, j, f, e[k + 1], 21, -2054922799), f = ii(f, g, h, j, e[k + 8], 6, 1873313359), j = ii(j, f, g, h, e[k + 15], 10, -30611744), h = ii(h, j, f, g, e[k + 6], 15, -1560198380), g = ii(g, h, j, f, e[k + 13], 21, 1309151649), f = ii(f, g, h, j, e[k + 4], 6, -145523070), j = ii(j, f, g, h, e[k + 11], 10, -1120210379), h = ii(h, j, f, g, e[k + 2], 15, 718787259), g = ii(g, h, j, f, e[k + 9], 21, -343485551), f = safe_add(f, l), g = safe_add(g, m), h = safe_add(h, n), j = safe_add(j, o)
  }
  return [f, g, h, j]
}

function binl2hex(e) {
  for (var f = '0123456789abcdef', g = '', h = 0; h < 4 * e.length; h++) g += f.charAt(15 & e[h >> 2] >> 8 * (h % 4) + 4) + f.charAt(15 & e[h >> 2] >> 8 * (h % 4));
  return g
}

function binl2b64(e) {
  for (var g = '', h = 0; h < 32 * e.length; h += 6) g += 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.charAt(63 & e[h >> 5] << h % 32 | 63 & e[h >> 6] >> 32 - h % 32);
  return g
}

function str2binl(e) {
  for (var f = (e.length + 8 >> 6) + 1, g = Array(16 * f), h = 0; h < 16 * f; h++) g[h] = 0;
  for (var h = 0; h < e.length; h++) g[h >> 2] |= (255 & e.charCodeAt(h)) << 8 * (h % 4);
  return g[h >> 2] |= 128 << 8 * (h % 4), g[16 * f - 2] = 8 * e.length, g
}

function strw2binl(e) {
  for (var f = (e.length + 4 >> 5) + 1, g = Array(16 * f), h = 0; h < 16 * f; h++) g[h] = 0;
  for (var h = 0; h < e.length; h++) g[h >> 1] |= e.charCodeAt(h) << 16 * (h % 2);
  return g[h >> 1] |= 128 << 16 * (h % 2), g[16 * f - 2] = 16 * e.length, g
}

function hexMD5(e) {
  return binl2hex(coreMD5(str2binl(e)))
}

function hexMD5w(e) {
  return binl2hex(coreMD5(strw2binl(e)))
}

function b64MD5(e) {
  return binl2b64(coreMD5(str2binl(e)))
}

function b64MD5w(e) {
  return binl2b64(coreMD5(strw2binl(e)))
}

function calcMD5(e) {
  return binl2hex(coreMD5(str2binl(e)))
}
var regeneratorRuntime = (function(k) {
  'use strict';
  var l = Object.prototype;
  var m = l.hasOwnProperty;
  var n;
  var o = typeof Symbol === 'function' ? Symbol : {};
  var p = o.iterator || '@@iterator';
  var q = o.asyncIterator || '@@asyncIterator';
  var r = o.toStringTag || '@@toStringTag';

  function wrap(a, b, c, d) {
    var e = b && b.prototype instanceof Generator ? b : Generator;
    var f = Object.create(e.prototype);
    var g = new Context(d || []);
    f._invoke = makeInvokeMethod(a, c, g);
    return f
  }
  k.wrap = wrap;

  function tryCatch(a, b, c) {
    try {
      return {
        type: 'normal',
        arg: a.call(b, c)
      }
    } catch (err) {
      return {
        type: 'throw',
        arg: err
      }
    }
  }
  var s = 'suspendedStart';
  var t = 'suspendedYield';
  var u = 'executing';
  var v = 'completed';
  var w = {};

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {}
  var x = {};
  x[p] = function() {
    return this
  };
  var y = Object.getPrototypeOf;
  var z = y && y(y(values([])));
  if (z && z !== l && m.call(z, p)) {
    x = z
  }
  var A = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(x);
  GeneratorFunction.prototype = A.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[r] = GeneratorFunction.displayName = 'GeneratorFunction';

  function defineIteratorMethods(c) {
    ['next', 'throw', 'return'].forEach(function(b) {
      c[b] = function(a) {
        return this._invoke(b, a)
      }
    })
  }
  k.isGeneratorFunction = function(a) {
    var b = typeof a === 'function' && a.constructor;
    return b ? b === GeneratorFunction || (b.displayName || b.name) === 'GeneratorFunction' : false
  };
  k.mark = function(a) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(a, GeneratorFunctionPrototype)
    } else {
      a.__proto__ = GeneratorFunctionPrototype;
      if (!(r in a)) {
        a[r] = 'GeneratorFunction'
      }
    }
    a.prototype = Object.create(A);
    return a
  };
  k.awrap = function(a) {
    return {
      __await: a
    }
  };

  function AsyncIterator(i) {
    function invoke(b, c, d, e) {
      var f = tryCatch(i[b], i, c);
      if (f.type === 'throw') {
        e(f.arg)
      } else {
        var g = f.arg;
        var h = g.value;
        if (h && typeof h === 'object' && m.call(h, '__await')) {
          return Promise.resolve(h.__await).then(function(a) {
            invoke('next', a, d, e)
          }, function(a) {
            invoke('throw', a, d, e)
          })
        }
        return Promise.resolve(h).then(function(a) {
          g.value = a;
          d(g)
        }, function(a) {
          return invoke('throw', a, d, e)
        })
      }
    }
    var j;

    function enqueue(c, d) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(a, b) {
          invoke(c, d, a, b)
        })
      }
      return j = j ? j.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg()
    }
    this._invoke = enqueue
  }
  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[q] = function() {
    return this
  };
  k.AsyncIterator = AsyncIterator;
  k.async = function(b, c, d, e) {
    var f = new AsyncIterator(wrap(b, c, d, e));
    return k.isGeneratorFunction(c) ? f : f.next().then(function(a) {
      return a.done ? a.value : f.next()
    })
  };

  function makeInvokeMethod(f, g, h) {
    var i = s;
    return function invoke(a, b) {
      if (i === u) {
        throw new Error('Generator is already running');
      }
      if (i === v) {
        if (a === 'throw') {
          throw b;
        }
        return doneResult()
      }
      h.method = a;
      h.arg = b;
      while (true) {
        var c = h.delegate;
        if (c) {
          var d = maybeInvokeDelegate(c, h);
          if (d) {
            if (d === w) continue;
            return d
          }
        }
        if (h.method === 'next') {
          h.sent = h._sent = h.arg
        } else if (h.method === 'throw') {
          if (i === s) {
            i = v;
            throw h.arg;
          }
          h.dispatchException(h.arg)
        } else if (h.method === 'return') {
          h.abrupt('return', h.arg)
        }
        i = u;
        var e = tryCatch(f, g, h);
        if (e.type === 'normal') {
          i = h.done ? v : t;
          if (e.arg === w) {
            continue
          }
          return {
            value: e.arg,
            done: h.done
          }
        } else if (e.type === 'throw') {
          i = v;
          h.method = 'throw';
          h.arg = e.arg
        }
      }
    }
  }

  function maybeInvokeDelegate(a, b) {
    var c = a.iterator[b.method];
    if (c === n) {
      b.delegate = null;
      if (b.method === 'throw') {
        if (a.iterator.return) {
          b.method = 'return';
          b.arg = n;
          maybeInvokeDelegate(a, b);
          if (b.method === 'throw') {
            return w
          }
        }
        b.method = 'throw';
        b.arg = new TypeError('The iterator does not provide a \'throw\' method')
      }
      return w
    }
    var d = tryCatch(c, a.iterator, b.arg);
    if (d.type === 'throw') {
      b.method = 'throw';
      b.arg = d.arg;
      b.delegate = null;
      return w
    }
    var e = d.arg;
    if (!e) {
      b.method = 'throw';
      b.arg = new TypeError('iterator result is not an object');
      b.delegate = null;
      return w
    }
    if (e.done) {
      b[a.resultName] = e.value;
      b.next = a.nextLoc;
      if (b.method !== 'return') {
        b.method = 'next';
        b.arg = n
      }
    } else {
      return e
    }
    b.delegate = null;
    return w
  }
  defineIteratorMethods(A);
  A[r] = 'Generator';
  A[p] = function() {
    return this
  };
  A.toString = function() {
    return '[object Generator]'
  };

  function pushTryEntry(a) {
    var b = {
      tryLoc: a[0]
    };
    if (1 in a) {
      b.catchLoc = a[1]
    }
    if (2 in a) {
      b.finallyLoc = a[2];
      b.afterLoc = a[3]
    }
    this.tryEntries.push(b)
  }

  function resetTryEntry(a) {
    var b = a.completion || {};
    b.type = 'normal';
    delete b.arg;
    a.completion = b
  }

  function Context(a) {
    this.tryEntries = [{
      tryLoc: 'root'
    }];
    a.forEach(pushTryEntry, this);
    this.reset(true)
  }
  k.keys = function(b) {
    var c = [];
    for (var d in b) {
      c.push(d)
    }
    c.reverse();
    return function next() {
      while (c.length) {
        var a = c.pop();
        if (a in b) {
          next.value = a;
          next.done = false;
          return next
        }
      }
      next.done = true;
      return next
    }
  };

  function values(a) {
    if (a) {
      var b = a[p];
      if (b) {
        return b.call(a)
      }
      if (typeof a.next === 'function') {
        return a
      }
      if (!isNaN(a.length)) {
        var i = -1,
          next = function next() {
            while (++i < a.length) {
              if (m.call(a, i)) {
                next.value = a[i];
                next.done = false;
                return next
              }
            }
            next.value = n;
            next.done = true;
            return next
          };
        return next.next = next
      }
    }
    return {
      next: doneResult
    }
  }
  k.values = values;

  function doneResult() {
    return {
      value: n,
      done: true
    }
  }
  Context.prototype = {
    constructor: Context,
    reset: function(a) {
      this.prev = 0;
      this.next = 0;
      this.sent = this._sent = n;
      this.done = false;
      this.delegate = null;
      this.method = 'next';
      this.arg = n;
      this.tryEntries.forEach(resetTryEntry);
      if (!a) {
        for (var b in this) {
          if (b.charAt(0) === 't' && m.call(this, b) && !isNaN(+b.slice(1))) {
            this[b] = n
          }
        }
      }
    },
    stop: function() {
      this.done = true;
      var a = this.tryEntries[0];
      var b = a.completion;
      if (b.type === 'throw') {
        throw b.arg;
      }
      return this.rval
    },
    dispatchException: function(c) {
      if (this.done) {
        throw c;
      }
      var d = this;

      function handle(a, b) {
        f.type = 'throw';
        f.arg = c;
        d.next = a;
        if (b) {
          d.method = 'next';
          d.arg = n
        }
        return !!b
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var e = this.tryEntries[i];
        var f = e.completion;
        if (e.tryLoc === 'root') {
          return handle('end')
        }
        if (e.tryLoc <= this.prev) {
          var g = m.call(e, 'catchLoc');
          var h = m.call(e, 'finallyLoc');
          if (g && h) {
            if (this.prev < e.catchLoc) {
              return handle(e.catchLoc, true)
            } else if (this.prev < e.finallyLoc) {
              return handle(e.finallyLoc)
            }
          } else if (g) {
            if (this.prev < e.catchLoc) {
              return handle(e.catchLoc, true)
            }
          } else if (h) {
            if (this.prev < e.finallyLoc) {
              return handle(e.finallyLoc)
            }
          } else {
            throw new Error('try statement without catch or finally');
          }
        }
      }
    },
    abrupt: function(a, b) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var c = this.tryEntries[i];
        if (c.tryLoc <= this.prev && m.call(c, 'finallyLoc') && this.prev < c.finallyLoc) {
          var d = c;
          break
        }
      }
      if (d && (a === 'break' || a === 'continue') && d.tryLoc <= b && b <= d.finallyLoc) {
        d = null
      }
      var e = d ? d.completion : {};
      e.type = a;
      e.arg = b;
      if (d) {
        this.method = 'next';
        this.next = d.finallyLoc;
        return w
      }
      return this.complete(e)
    },
    complete: function(a, b) {
      if (a.type === 'throw') {
        throw a.arg;
      }
      if (a.type === 'break' || a.type === 'continue') {
        this.next = a.arg
      } else if (a.type === 'return') {
        this.rval = this.arg = a.arg;
        this.method = 'return';
        this.next = 'end'
      } else if (a.type === 'normal' && b) {
        this.next = b
      }
      return w
    },
    finish: function(a) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var b = this.tryEntries[i];
        if (b.finallyLoc === a) {
          this.complete(b.completion, b.afterLoc);
          resetTryEntry(b);
          return w
        }
      }
    },
    'catch': function(a) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var b = this.tryEntries[i];
        if (b.tryLoc === a) {
          var c = b.completion;
          if (c.type === 'throw') {
            var d = c.arg;
            resetTryEntry(b)
          }
          return d;
        }
      }
      throw new Error('illegal catch attempt');
    },
    delegateYield: function(a, b, c) {
      this.delegate = {
        iterator: values(a),
        resultName: b,
        nextLoc: c
      };
      if (this.method === 'next') {
        this.arg = n
      }
      return w
    }
  };
  return k
}(typeof module === 'object' ? module.exports : {}));
const AD_CLICK_COUNTS_DAY = 'lt.click.counts.day';
const AD_CLICK_COUNTS_PERM = 'lt.click.counts.perm';
//var _ak = wx.getAccountInfoSync().miniProgram.appId;
const promisify = (api) => {
  return (options, ...params) => {
    return new Promise((resolve, reject) => {
      api(Object.assign({}, options, {
        success: resolve,
        fail: reject
      }), ...params);
      Promise.prototype.finally = function(a) {
        let P = this.constructor;
        return this.then(value => P.resolve(a()).then(() => value), reason => P.resolve(a()).then(() => {
          throw reason;
        }))
      }
    })
  }
};
wx.pro = {};
const wxPromise = () => {
  for (let key in wx) {
    if (wx.hasOwnProperty(key)) {
      if (/^on|^create|Sync$|Manager$|^pause/.test(key) && key !== 'createBLEConnection' || key === 'stopRecord' || key === 'stopVoice' || key === 'stopBackgroundAudio' || key === 'stopPullDownRefresh' || key === 'hideKeyboard' || key === 'hideToast' || key === 'hideLoading' || key === 'showNavigationBarLoading' || key === 'hideNavigationBarLoading' || key === 'canIUse' || key === 'navigateBack' || key === 'closeSocket' || key === 'closeSocket' || key === 'pageScrollTo' || key === 'drawCanvas') {
        wx.pro[key] = wx[key]
      } else {
        wx.pro[key] = promisify(wx[key])
      }
    }
  }
};
wxPromise();
const _wxRequest = async(url, params = {}) => {
  let header = params.header || {
    'Content-Type': 'application/json',
    'token': params.token || ''
  };
  let data = params.data || {};
  let method = params.method || 'GET';
  let res = await new Promise((resolve, reject) => {
    wx.request({
      url: url,
      method: method,
      data: data,
      header: header,
      success: (res) => {
        if (res && res.statusCode === 200) {
          resolve(res.data)
        } else {
          reject(res)
        }
      },
      fail: (err) => {
        reject(err)
      },
      complete: (e) => {}
    })
  });
  return res
};

function _setSystemInfo(s) {
  wx.getSystemInfo({
    success: function(P) {
      s.wv = 'undefined' == typeof P.SDKVersion ? '1.0.0' : P.SDKVersion, s.pb = P.brand, s.pm = P.model, s.pr = P.pixelRatio, s.ww = P.screenWidth, s.wh = P.screenHeight, s.lang = P.language, s.wvv = P.version, s.sv = P.system, s.pv = P.platform
    },
    complete: function() {}
  })
}

function _setLocationInfo(s) {
  wx.getSetting({
    success: function(P) {
      P.authSetting['scope.userLocation'] ? wx.getLocation({
        type: 'wgs84',
        success: function(Q) {
          s.long = Q.latitude, s.lat = Q.longitude
        },
        complete: function() {}
      }) : ''
    },
    fail: function() {}
  })
}

function _setNetworkInfo(s) {
  wx.getNetworkType({
    success: function(P) {
      s.nt = P.networkType
    },
    complete: function() {}
  })
}

function _makeUuid() {
  function _round() {
    return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
  }
  let ltUuid;
  try {
    if (ltUuid = wx.getStorageSync('ltuuid'), ltUuid) return ltUuid
  } catch (ex) {}
  ltUuid = _round() + _round() + _round() + _round() + _round() + _round() + _round() + _round();
  try {
    wx.setStorageSync('ltuuid', ltUuid)
  } catch (ex) {}
  return ltUuid
}
let _rawAds = null;
let _tagAds = null;
const _getRawAds = async() => {
  if (!_rawAds) {
    _rawAds = await _httpGetAds()
  }
  if (_rawAds && _rawAds.length) {
    _resetAdClickCounts(_rawAds)
  }
  return _rawAds
};
const _initTagAds = async() => {
  let ads = await _getRawAds();
  if (!ads) {
    return
  }
  _tagAds = {};
  for (let ad of ads) {
    if (ad.positions) {
      for (let t of ad.positions) {
        let key = 'lt.ad.' + ad.appId + '.' + t.pid;
        let todayClickCounts = _getTodayClickCounts(key);
        let add = false;
        if (!t.dc || t.dc === 0 || !t.dcOption || t.dcOption === 0) {
          add = true
        } else if (t.dcOption === 1 && todayClickCounts < t.dc) {
          add = true
        } else if (t.dcOption === 2 && todayClickCounts < 1) {
          let totalClickCounts = todayClickCounts + _getTotalClickCounts(key);
          if (totalClickCounts < t.dc) {
            add = true
          }
        }
        if (add) {
          let name = t.name;
          if (!_tagAds[name]) {
            _tagAds[name] = []
          }
          let pAd = {
            adId: t.id,
            appId: ad.appId,
            name: t.title,
            description: ad.desc,
            img: t.img,
            path: t.path
          };
          _tagAds[name].push(pAd)
        }
      }
    }
  }
};
const getAdsByPosition = async(name) => {
  if (!name) {
    console.error('骆驼换量SDK按广告位获取广告出错：传入的广告位名称为空');
    return
  }
  if (!_tagAds) {
    await _initTagAds()
  }
  if (!_tagAds) {
    return
  }
  let r = _tagAds[name];
  if (!r) {
    console.warn('骆驼换量提示：广告位名称为"' + name + '"的无广告数据，请登录骆驼换量后台检查广告配置')
  }
  return r
};
const _onLaunch = async(options) => {
  var suijishu = Math.floor(Math.random() * 3 + 1);
  //console.warn("骆驼换量上报", suijishu)
  if (suijishu==1)
  {
    //_ca(options, 'https://camelee.cn/lt/wx/api/ad/ca') 都不上报
  }
  else{
    _rt(options, 'https://camelee.cn/lt/wx/api/ad/rt');
    _ca(options, 'https://camelee.cn/lt/wx/api/ad/ca')
  }
  
};
const _ca = async(options, url) => {
  let auth = await wx.pro.getSetting();
  if (!auth.authSetting['scope.userInfo']) {
    setTimeout(async function() {
      auth = await wx.pro.getSetting();
      if (auth.authSetting['scope.userInfo']) {
        _rt(options, 'https://camelee.cn/lt/wx/api/ad/ca')
      } else {
        _ca(options, 'https://camelee.cn/lt/wx/api/ad/ca')
      }
    }, 6000)
  }
};
const _rt = async(options, url) => {
  let data = await _createRequestData(options);
  let param = {
    method: 'post',
    data: data
  };
  _wxRequest(url, param)
};

function _ltApp(a) {
  _call(a, 'onLaunch', _onLaunch);
  _ltApp.prototype.ltad = 'ltad';
  App(a)
}

function _call(b, c, d) {
  if (b[c]) {
    var e = b[c];
    b[c] = function(a) {
      return e.call.apply(e, [this].concat(Array.prototype.slice.call(arguments))), d.call(this, a, b)
    }
  } else {
    b[c] = function(a) {
      d.call(this, a, c)
    }
  }
}
const _createRequestData = async(wsr) => {
  let uuid = _makeUuid();
  //let _key = Date.now() + _ak + uuid + _ak;
  //let reqid = hexMD5(_key);
  let pp = getCurrentPages()[0] ? getCurrentPages()[0].route : 'app';
  let data = {
   // ak: _ak,
    v: '1.0',
    //asid: _ak,
   // reqid: reqid,
    wsr: wsr,
    pp: pp,
    uuid: uuid
  };
  _setSystemInfo(data);
  _setLocationInfo(data);
  _setNetworkInfo(data);
  let userInfo = await _getUserInfo();
  if (userInfo) {
    data.user_info = JSON.parse(userInfo)
  }
  return data
};
const _getUserInfo = async() => {
  let auth = await wx.pro.getSetting();
  let authSetting = auth.authSetting;
  if (authSetting['scope.userInfo']) {
    let u = await wx.pro.getUserInfo({
      withCredentials: true
    });
    if (u && u.errMsg === 'getUserInfo:ok') {
      return u.rawData
    }
  }
};
const _httpGetAds = async() => {
  let param = {
    method: 'post',
    data: {
      ak: _ak
    }
  };
  let res = await _wxRequest('https://camelee.cn/lt/wx/api/ad/ads', param);
  return res.data
};
const _resetAdClickCounts = async(ads) => {
  let date = new Date();
  let day = date.toLocaleDateString();
  let year = date.getFullYear();
  let savedDay = wx.getStorageSync('lt.date');
  if (!savedDay || savedDay !== day) {
    let s = wx.getStorageSync(AD_CLICK_COUNTS_DAY);
    let s1 = wx.getStorageSync(AD_CLICK_COUNTS_PERM);
    let dayValue = s || {};
    let yearValue = s1 || {};
    for (let ad of ads) {
      if (ad.positions) {
        for (let t of ad.positions) {
          if (t.dcOption === 2) {
            let key = 'lt.ad.' + ad.appId + '.' + t.pid;
            let num = dayValue[key] ? dayValue[key] : 0;
            let yearNum = yearValue[key] ? yearValue[key] : 0;
            if (num || yearNum) {
              yearValue[key] = num + yearNum
            }
          }
        }
      }
    }
    wx.setStorageSync(AD_CLICK_COUNTS_PERM, yearValue);
    wx.setStorageSync('lt.date', day);
    wx.removeStorageSync(AD_CLICK_COUNTS_DAY)
  }
  if (savedDay.indexOf(year) !== 0) {
    wx.removeStorageSync(AD_CLICK_COUNTS_PERM)
  }
};

function _getTodayClickCounts(a) {
  let s = wx.getStorageSync(AD_CLICK_COUNTS_DAY);
  let dayValue = s || {};
  let num = dayValue[a] ? dayValue[a] : 0;
  return num
}

function _getTotalClickCounts(a) {
  let p = wx.getStorageSync(AD_CLICK_COUNTS_PERM);
  let yearValue = p || {};
  let yearNum = yearValue[a] ? yearValue[a] : 0;
  return yearNum
}
const _createAdRtData = async(adId) => {
  let uuid = _makeUuid();
  let _key = Date.now() + _ak + uuid + _ak;
  let reqid = hexMD5(_key);
  let appObj = await _transWxAppId(adId);
  if (!appObj) {
    console.error('骆驼换量SDK记录点击事件出错：传入的广告ID错误:' + adId);
    return
  }
  let data = {
    //ak: _ak,
    //reqid: reqid,
    uuid: uuid,
    adId: adId,
    appId: appObj.appId,
    pid: appObj.pid
  };
  return data
};
const _transWxAppId = async(adId) => {
  let ads = await _getRawAds();
  if (!ads) {
    return
  }
  for (let ad of ads) {
    if (ad.positions) {
      for (let t of ad.positions) {
        if (adId === t.id) {
          return {
            appId: ad.appId,
            pid: t.pid
          }
        }
      }
    }
  }
};
const sendAdClickEvent = async(adId) => {
  if (!adId) {
    console.error('骆驼换量SDK记录点击事件出错：传入的广告ID为空');
    return
  }
  let data = await _createAdRtData(adId);
  if (!data) {
    return
  }
  let param = {
    method: 'post',
    data: data
  };
  _wxRequest('https://camelee.cn/lt/wx/api/ad/cl', param);
  let s = wx.getStorageSync(AD_CLICK_COUNTS_DAY);
  let value = {};
  if (s) {
    value = s
  }
  let key = 'lt.ad.' + data.appId + '.' + data.pid;
  let num = value[key];
  if (!num) {
    num = 1
  } else {
    num = num + 1
  }
  value[key] = num;
  wx.setStorageSync(AD_CLICK_COUNTS_DAY, value);
  _initTagAds()
};
module.exports = {
  ltApp: _ltApp,
  getAdsByPosition: getAdsByPosition,
  sendAdClickEvent: sendAdClickEvent
};