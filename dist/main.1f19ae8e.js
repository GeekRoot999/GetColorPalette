// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/colorthief/dist/color-thief.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
if (!t) var t = {
  map: function (t, r) {
    var n = {};
    return r ? t.map(function (t, o) {
      return n.index = o, r.call(n, t);
    }) : t.slice();
  },
  naturalOrder: function (t, r) {
    return t < r ? -1 : t > r ? 1 : 0;
  },
  sum: function (t, r) {
    var n = {};
    return t.reduce(r ? function (t, o, e) {
      return n.index = e, t + r.call(n, o);
    } : function (t, r) {
      return t + r;
    }, 0);
  },
  max: function (r, n) {
    return Math.max.apply(null, n ? t.map(r, n) : r);
  }
};

var r = function () {
  var r = 5,
      n = 8 - r,
      o = 1e3;

  function e(t, n, o) {
    return (t << 2 * r) + (n << r) + o;
  }

  function i(t) {
    var r = [],
        n = !1;

    function o() {
      r.sort(t), n = !0;
    }

    return {
      push: function (t) {
        r.push(t), n = !1;
      },
      peek: function (t) {
        return n || o(), void 0 === t && (t = r.length - 1), r[t];
      },
      pop: function () {
        return n || o(), r.pop();
      },
      size: function () {
        return r.length;
      },
      map: function (t) {
        return r.map(t);
      },
      debug: function () {
        return n || o(), r;
      }
    };
  }

  function u(t, r, n, o, e, i, u) {
    this.r1 = t, this.r2 = r, this.g1 = n, this.g2 = o, this.b1 = e, this.b2 = i, this.histo = u;
  }

  function a() {
    this.vboxes = new i(function (r, n) {
      return t.naturalOrder(r.vbox.count() * r.vbox.volume(), n.vbox.count() * n.vbox.volume());
    });
  }

  function s(r, n) {
    if (n.count()) {
      var o = n.r2 - n.r1 + 1,
          i = n.g2 - n.g1 + 1,
          u = t.max([o, i, n.b2 - n.b1 + 1]);
      if (1 == n.count()) return [n.copy()];
      var a,
          s,
          h,
          c,
          f = 0,
          v = [],
          l = [];
      if (u == o) for (a = n.r1; a <= n.r2; a++) {
        for (c = 0, s = n.g1; s <= n.g2; s++) for (h = n.b1; h <= n.b2; h++) c += r[e(a, s, h)] || 0;

        v[a] = f += c;
      } else if (u == i) for (a = n.g1; a <= n.g2; a++) {
        for (c = 0, s = n.r1; s <= n.r2; s++) for (h = n.b1; h <= n.b2; h++) c += r[e(s, a, h)] || 0;

        v[a] = f += c;
      } else for (a = n.b1; a <= n.b2; a++) {
        for (c = 0, s = n.r1; s <= n.r2; s++) for (h = n.g1; h <= n.g2; h++) c += r[e(s, h, a)] || 0;

        v[a] = f += c;
      }
      return v.forEach(function (t, r) {
        l[r] = f - t;
      }), function (t) {
        var r,
            o,
            e,
            i,
            u,
            s = t + "1",
            h = t + "2",
            c = 0;

        for (a = n[s]; a <= n[h]; a++) if (v[a] > f / 2) {
          for (e = n.copy(), i = n.copy(), u = (r = a - n[s]) <= (o = n[h] - a) ? Math.min(n[h] - 1, ~~(a + o / 2)) : Math.max(n[s], ~~(a - 1 - r / 2)); !v[u];) u++;

          for (c = l[u]; !c && v[u - 1];) c = l[--u];

          return e[h] = u, i[s] = e[h] + 1, [e, i];
        }
      }(u == o ? "r" : u == i ? "g" : "b");
    }
  }

  return u.prototype = {
    volume: function (t) {
      return this._volume && !t || (this._volume = (this.r2 - this.r1 + 1) * (this.g2 - this.g1 + 1) * (this.b2 - this.b1 + 1)), this._volume;
    },
    count: function (t) {
      var r = this.histo;

      if (!this._count_set || t) {
        var n,
            o,
            i,
            u = 0;

        for (n = this.r1; n <= this.r2; n++) for (o = this.g1; o <= this.g2; o++) for (i = this.b1; i <= this.b2; i++) u += r[e(n, o, i)] || 0;

        this._count = u, this._count_set = !0;
      }

      return this._count;
    },
    copy: function () {
      return new u(this.r1, this.r2, this.g1, this.g2, this.b1, this.b2, this.histo);
    },
    avg: function (t) {
      var n = this.histo;

      if (!this._avg || t) {
        var o,
            i,
            u,
            a,
            s = 0,
            h = 1 << 8 - r,
            c = 0,
            f = 0,
            v = 0;

        for (i = this.r1; i <= this.r2; i++) for (u = this.g1; u <= this.g2; u++) for (a = this.b1; a <= this.b2; a++) s += o = n[e(i, u, a)] || 0, c += o * (i + .5) * h, f += o * (u + .5) * h, v += o * (a + .5) * h;

        this._avg = s ? [~~(c / s), ~~(f / s), ~~(v / s)] : [~~(h * (this.r1 + this.r2 + 1) / 2), ~~(h * (this.g1 + this.g2 + 1) / 2), ~~(h * (this.b1 + this.b2 + 1) / 2)];
      }

      return this._avg;
    },
    contains: function (t) {
      var r = t[0] >> n;
      return gval = t[1] >> n, bval = t[2] >> n, r >= this.r1 && r <= this.r2 && gval >= this.g1 && gval <= this.g2 && bval >= this.b1 && bval <= this.b2;
    }
  }, a.prototype = {
    push: function (t) {
      this.vboxes.push({
        vbox: t,
        color: t.avg()
      });
    },
    palette: function () {
      return this.vboxes.map(function (t) {
        return t.color;
      });
    },
    size: function () {
      return this.vboxes.size();
    },
    map: function (t) {
      for (var r = this.vboxes, n = 0; n < r.size(); n++) if (r.peek(n).vbox.contains(t)) return r.peek(n).color;

      return this.nearest(t);
    },
    nearest: function (t) {
      for (var r, n, o, e = this.vboxes, i = 0; i < e.size(); i++) ((n = Math.sqrt(Math.pow(t[0] - e.peek(i).color[0], 2) + Math.pow(t[1] - e.peek(i).color[1], 2) + Math.pow(t[2] - e.peek(i).color[2], 2))) < r || void 0 === r) && (r = n, o = e.peek(i).color);

      return o;
    },
    forcebw: function () {
      var r = this.vboxes;
      r.sort(function (r, n) {
        return t.naturalOrder(t.sum(r.color), t.sum(n.color));
      });
      var n = r[0].color;
      n[0] < 5 && n[1] < 5 && n[2] < 5 && (r[0].color = [0, 0, 0]);
      var o = r.length - 1,
          e = r[o].color;
      e[0] > 251 && e[1] > 251 && e[2] > 251 && (r[o].color = [255, 255, 255]);
    }
  }, {
    quantize: function (h, c) {
      if (!h.length || c < 2 || c > 256) return !1;

      var f = function (t) {
        var o,
            i = new Array(1 << 3 * r);
        return t.forEach(function (t) {
          o = e(t[0] >> n, t[1] >> n, t[2] >> n), i[o] = (i[o] || 0) + 1;
        }), i;
      }(h);

      f.forEach(function () {});

      var v = function (t, r) {
        var o,
            e,
            i,
            a = 1e6,
            s = 0,
            h = 1e6,
            c = 0,
            f = 1e6,
            v = 0;
        return t.forEach(function (t) {
          (o = t[0] >> n) < a ? a = o : o > s && (s = o), (e = t[1] >> n) < h ? h = e : e > c && (c = e), (i = t[2] >> n) < f ? f = i : i > v && (v = i);
        }), new u(a, s, h, c, f, v, r);
      }(h, f),
          l = new i(function (r, n) {
        return t.naturalOrder(r.count(), n.count());
      });

      function g(t, r) {
        for (var n, e = t.size(), i = 0; i < o;) {
          if (e >= r) return;
          if (i++ > o) return;

          if ((n = t.pop()).count()) {
            var u = s(f, n),
                a = u[0],
                h = u[1];
            if (!a) return;
            t.push(a), h && (t.push(h), e++);
          } else t.push(n), i++;
        }
      }

      l.push(v), g(l, .75 * c);

      for (var p = new i(function (r, n) {
        return t.naturalOrder(r.count() * r.volume(), n.count() * n.volume());
      }); l.size();) p.push(l.pop());

      g(p, c);

      for (var b = new a(); p.size();) b.push(p.pop());

      return b;
    }
  };
}().quantize,
    n = function (t) {
  this.canvas = document.createElement("canvas"), this.context = this.canvas.getContext("2d"), this.width = this.canvas.width = t.naturalWidth, this.height = this.canvas.height = t.naturalHeight, this.context.drawImage(t, 0, 0, this.width, this.height);
};

n.prototype.getImageData = function () {
  return this.context.getImageData(0, 0, this.width, this.height);
};

var o = function () {};

o.prototype.getColor = function (t, r) {
  return void 0 === r && (r = 10), this.getPalette(t, 5, r)[0];
}, o.prototype.getPalette = function (t, o, e) {
  var i = function (t) {
    var r = t.colorCount,
        n = t.quality;

    if (void 0 !== r && Number.isInteger(r)) {
      if (1 === r) throw new Error("colorCount should be between 2 and 20. To get one color, call getColor() instead of getPalette()");
      r = Math.max(r, 2), r = Math.min(r, 20);
    } else r = 10;

    return (void 0 === n || !Number.isInteger(n) || n < 1) && (n = 10), {
      colorCount: r,
      quality: n
    };
  }({
    colorCount: o,
    quality: e
  }),
      u = new n(t),
      a = function (t, r, n) {
    for (var o = t, e = [], i = 0, u = void 0, a = void 0, s = void 0, h = void 0, c = void 0; i < r; i += n) a = o[0 + (u = 4 * i)], s = o[u + 1], h = o[u + 2], (void 0 === (c = o[u + 3]) || c >= 125) && (a > 250 && s > 250 && h > 250 || e.push([a, s, h]));

    return e;
  }(u.getImageData().data, u.width * u.height, i.quality),
      s = r(a, i.colorCount);

  return s ? s.palette() : null;
}, o.prototype.getColorFromUrl = function (t, r, n) {
  var o = this,
      e = document.createElement("img");
  e.addEventListener("load", function () {
    var i = o.getPalette(e, 5, n);
    r(i[0], t);
  }), e.src = t;
}, o.prototype.getImageData = function (t, r) {
  var n = new XMLHttpRequest();
  n.open("GET", t, !0), n.responseType = "arraybuffer", n.onload = function () {
    if (200 == this.status) {
      var t = new Uint8Array(this.response);
      i = t.length;

      for (var n = new Array(i), o = 0; o < t.length; o++) n[o] = String.fromCharCode(t[o]);

      var e = n.join(""),
          u = window.btoa(e);
      r("data:image/png;base64," + u);
    }
  }, n.send();
}, o.prototype.getColorAsync = function (t, r, n) {
  var o = this;
  this.getImageData(t, function (t) {
    var e = document.createElement("img");
    e.addEventListener("load", function () {
      var t = o.getPalette(e, 5, n);
      r(t[0], this);
    }), e.src = t;
  });
};
var _default = o;
exports.default = _default;
},{}],"main.js":[function(require,module,exports) {
"use strict";

var _colorThief = _interopRequireDefault(require("../node_modules/colorthief/dist/color-thief.mjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var colorThief = new _colorThief.default();
var // where files are dropped + file selector is opened
dropRegion = document.getElementById("drop-region"),
    // where images are previewed
imagePreviewRegion = document.getElementById("image-preview"),
    getPalette = document.getElementById("getPalette");
var dominantColorGenerator = document.querySelector(".dominant-color-generator");
var colorPaletteGenerator = document.querySelector(".color-palette-generator");
var paletteColors = document.getElementById("palette-colors");
var imgView = document.getElementsByClassName("img-view")[0]; // open file selector when clicked on the drop region

var fakeInput = document.createElement("input");
fakeInput.type = "file";
fakeInput.accept = "image/*";
fakeInput.multiple = false;
dropRegion.addEventListener('click', function () {
  fakeInput.click();
});
fakeInput.addEventListener("change", function () {
  var files = fakeInput.files;
  handleFiles(files);
});

function preventDefault(e) {
  e.preventDefault();
  e.stopPropagation();
}

dropRegion.addEventListener('dragenter', preventDefault, false);
dropRegion.addEventListener('dragleave', preventDefault, false);
dropRegion.addEventListener('dragover', preventDefault, false);
dropRegion.addEventListener('drop', preventDefault, false);

function handleDrop(e) {
  var dt = e.dataTransfer,
      files = dt.files;

  if (files.length) {
    handleFiles(files);
  } else {
    // check for img
    var html = dt.getData('text/html'),
        match = html && /\bsrc="?([^"\s]+)"?\s*/.exec(html),
        url = match && match[1];

    if (url) {
      uploadImageFromURL(url);
      return;
    }
  }

  function uploadImageFromURL(url) {
    var img = new Image();
    var c = document.createElement("canvas");
    var ctx = c.getContext("2d");

    img.onload = function () {
      c.width = this.naturalWidth; // update canvas size to match image

      c.height = this.naturalHeight;
      ctx.drawImage(this, 0, 0); // draw in image

      c.toBlob(function (blob) {
        // get content as PNG blob
        // call our main function
        handleFiles([blob]);
      }, "image/png");
    };

    img.onerror = function () {
      alert("Error in uploading");
    };

    img.crossOrigin = ""; // if from different origin

    img.src = url;
  }
}

dropRegion.addEventListener('drop', handleDrop, false);

function handleFiles(files) {
  for (var i = 0, len = files.length; i < len; i++) {
    if (validateImage(files[i])) previewAnduploadImage(files[i]);
  }
}

function validateImage(image) {
  // check the type
  var validTypes = ['image/jpeg', 'image/png', 'image/gif'];

  if (validTypes.indexOf(image.type) === -1) {
    alert("Invalid File Type");
    return false;
  } // check the size


  var maxSizeInBytes = 10e6; // 10MB

  if (image.size > maxSizeInBytes) {
    alert("File too large");
    return false;
  }

  return true;
}

function previewAnduploadImage(image) {
  // container
  var imgView = document.createElement("div");
  imgView.className = "image-view";
  imagePreviewRegion.appendChild(imgView);
  imagePreviewRegion.insertBefore(imgView, imagePreviewRegion.childNodes[0]); // previewing image

  var img = document.createElement("img");
  img.classList.add('source-image');
  imgView.appendChild(img);
  getPalette.hidden = false;
  paletteColors.classList.add('hidden');
  var dropMessage = document.getElementsByClassName('drop-message')[0];
  dropMessage.style.display = "none"; // read the image...

  var reader = new FileReader();

  reader.onload = function (e) {
    img.src = e.target.result;
  };

  reader.readAsDataURL(image);
}

getPalette.addEventListener('click', function (e) {
  var colorThief = new _colorThief.default();
  var image = document.querySelector('.source-image');

  if (image.complete) {
    console.log(colorThief.getPalette(image, 5));
    var paletteValue = colorThief.getPalette(image, 5);
    var hexValue = [];
    paletteValue.forEach(function (item) {
      // console.log(paletteValue[0], "item 1");
      var value = rgbToHex(item[0], item[1], item[2]);
      hexValue.push(value);
      console.log(value);
    }); // const value = rgbToHex(paletteValue[0][0], paletteValue[0][1], paletteValue[0][2]);

    for (var i = 0; i < hexValue.length; i++) {
      if (hexValue[i] == hexValue[0]) {
        var dominantColor = document.createElement("div");
        dominantColor.classList.add("dominant-color");
        dominantColor.style.backgroundColor = hexValue[i];
        dominantColorGenerator.appendChild(dominantColor);
        var colorGenerator = document.createElement("div");
        colorGenerator.classList.add("color-palette");
        colorGenerator.style.backgroundColor = hexValue[i];
        colorPaletteGenerator.appendChild(colorGenerator);
      } else {
        var colorGenerator = document.createElement("div");
        colorGenerator.classList.add("color-palette");
        colorGenerator.style.backgroundColor = hexValue[i];
        colorPaletteGenerator.appendChild(colorGenerator);
      }
    }

    getPalette.hidden = "true";
    paletteColors.classList.remove("hidden");
  } else {
    image.addEventListener('load', function () {
      colorThief.getPalette(image, 5);
    });
  }
});

var rgbToHex = function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(function (x) {
    var hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
};
},{"../node_modules/colorthief/dist/color-thief.mjs":"../node_modules/colorthief/dist/color-thief.mjs"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53256" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map