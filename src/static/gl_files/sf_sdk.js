

"use strict";

var xh5_define, KKE = KKE || {};~

function(n) {
    "use strict";
    //n = "plugins.sinaTKChart.get", e = Object {compare: Object, symbol: "sz000651", mt: "cnlv1", dom_id: "h5Figure"}, t = function (chart_)
    function e(n, e, t) {
        if (!u.isStr(n)){
            return void u.err(t, [i.CMD_UNEXIST, n].join(":"));
        }
        //e = Object {compare: Object, symbol: "sz000651", mt: "cnlv1", dom_id: "h5Figure"}
        e = e || {};
        var r = n.split("."),
        o = r.splice(r.length - 1, r.length).join(""),
        a = r.splice(r.length - 1, r.length).join(""),
        l = r.splice(0, r.length),
        s = l.join("."),
        c = [s, a].join(".");
        d.relyCall(c,
        function() {
            var r = d.modsTree,
            s = void 0;
            do {
                var c = l.shift();
                if (s = s ? s[c] : r[c], !s) return void u.err(t, [i.MOD_ERR, a].join(":"))
            } while ( l . length );
            var f = s[a] || {},
            h = f.entity || {},
            m = h[o];
            "undefined" == typeof m ? u.err(t, [i.CMD_UNEXIST, n].join(":")) : u.isFunc(m) ? m(e, t) : u.isFunc(t) && t(m)
        },
        e.modUrl || null)
    }
    for (var t, r, i = {
        SDK_REG: new RegExp("sf_sdk.js", a),
        isLocal: !1,
        isDebug: !1,
        isSSL: !1,
        custom_mod_url: void 0,
        MOD_URL: "js/$moduleName.js",
        MOD_URL_PROD: "http://finance.sina.com.cn/sinafinancesdk/js/$moduleName.js",
        MOD_URL_PROD_S: "https://ssl-finance.sina.com.cn/sinafinancesdk/js/$moduleName.js",
        getModUrl: function() {
            return this.custom_mod_url ? this.custom_mod_url + "/$moduleName.js": this.isLocal ? this.MOD_URL: this.isSSL ? this.MOD_URL_PROD_S: this.MOD_URL_PROD
        },
        CMD_404: "error occured while loading",
        CMD_UNEXIST: "calling nonexistent API",
        MOD_ERR: "erroneous module",
        MOD_DEF_ERR: "illegal module",
        DEP_ERR: "error def module"
    },
    o = document.getElementsByTagName("script"), a = o.length; a--;) if (t = o[a], r = t.src || "", i.SDK_REG.test(r)) {
        for (var l, s = t.attributes.length; s--;) l = t.attributes[s],
        "ssl" == l.name && (i.isSSL = "true" == l.value),
        "debug" == l.name && (i.isDebug = "true" == l.value),
        "local" == l.name && (i.isLocal = "true" == l.value),
        "murl" == l.name && (i.custom_mod_url = l.value);
        break
    }
    0 == location.protocol.indexOf("https:") && (i.isSSL = !0);
    var u = new
    function() {
        //架在你了这个脚本
        //n = "http://finance.sina.com.cn/sinafinancesdk/js/plugins/sinaTKChart.js", e = null, t = function (), r = undefined
        function n(n, e, t, r) {
            var i = !1,
            o = document.createElement("script"), //o = script
            a = document.getElementsByTagName("script")[0], //a = script
            l = document.head || document.getElementsByTagName("head")[0] || document.documentElement, //l = head
            s = l.getElementsByTagName("base")[0];
            o.charset = r || "gb2312",
            o.src = n, //n = "http://finance.sina.com.cn/sinafinancesdk/js/plugins/sinaTKChart.js"
            o.async = !0,
            o.onload = o.onreadystatechange = function() {
                i || o.readyState && !/loaded|complete/.test(String(o.readyState)) || (i = !0, o.onload = o.onreadystatechange = o.onerror = null, o.parentNode.removeChild(o), o = null, "function" == typeof e && e())
            },
            o.onerror = function() {
                o.onload = o.onreadystatechange = o.onerror = null,
                o.parentNode.removeChild(o),
                o = null,
                "function" == typeof t && t()
            },
            a.parentNode ? a.parentNode.insertBefore(o, a) : s ? l.insertBefore(o, s) : l.appendChild(o)
        }
        this.fBind = function(n, e) {
            var t = Array.prototype.slice.call(arguments, 2);
            return function() {
                return n.apply(e, t.concat(Array.prototype.slice.call(arguments)))
            }
        };
        var e = function(n) {
            return function(e) {
                return {}.toString.call(e) == "[object " + n + "]"
            }
        };
        this.isStr = e("String"),
        this.isFunc = e("Function"),
        this.isArr = e("Array"),
        this.trace = function(n) {
            return {
                log: function() {
                    n && n.log && n.log.apply(n, arguments)
                },
                error: function() {
                    n && n.error && n.error.apply(n, arguments)
                }
            }
        } (null),
        this.err = function(n, e) {
            this.isFunc(n) && n({
                msg: e,
                data: null
            }),
            this.trace.error(e)
        },
        this.load = n
    },
    c = ["datas.hq", "datas.k", "datas.t", "utils.util"],
    d = new
    function() {
        function n(n, e, r) {
            if (3 != arguments.length) return void u.trace.error(i.MOD_DEF_ERR, n);
            var o = t(n),
            a = o[0],
            s = o[1],
            c = a[s];
            c ? c.init = !0 : c = a[s] = {
                init: !0,
                name: n,
                funcQ: [],
                entity: void 0
            },
            u.isStr(e) && (e = [e]);
            for (var d, h = e.length; h--;) if (d = e[h], d.indexOf("*") > -1) {
                e.splice(h, 1);
                var m = d.split(".");
                m.splice(m.length - 1, m.length);
                var g = m.join(".");
                e = e.concat(f(g, n));
                break
            }
            l(e, e.slice(0), c, r)
        }
        var e = {},
        //n = "plugins.sinaTKChart"
        t = function(n) {
            for (var t, r = n.split("."), i = r.splice(r.length - 1, r.length).join(""), o = r.splice(0, r.length), a = o.join("."), l = void 0; o.length;) {
                var s = o.shift();
                l ? (t = l[s], t || (t = l[s] = {})) : (t = e[s], t || (t = e[s] = {})),
                l = t
            }
            return [l, i, a]
            //l = Object {}, i = "sinaTKChart", a = "plugins"
        },
        r = function(n) {
            for (; n.funcQ.length;) {
                var e = n.funcQ.shift();
                u.isFunc(e) && e()
            }
        },
        o = function(n) {
            if (!n) return null;
            for (var t = [], r = [], o = 0, a = n.length; a > o; o++) {
                for (var l, s = n[o].split("."), c = void 0; s.length;) if (l = s.shift(), c = c ? c[l] : e[l], !c) {
                    u.trace.error(i.DEP_ERR, s.toString());
                    break
                }
                r.push(c.entity),
                t.push(l)
            }
            return {
                n: t,
                e: r
            }
        },
        a = function(n, t, i) {
            var a = t.toString(),
            l = 0 == a.indexOf("function");
            if (l) {
                var s = o(i),
                c = t.apply(null, s.e.concat(e));
                n.entity = u.isFunc(c) ? new c: c
            } else n.entity = t;
            r(n)
        },
        l = function(n, e, t, r) {
            e.length ? h(e.shift(), u.fBind(l, this, n, e, t, r)) : a(t, r, n)
        },
        //n = Object {init: false, name: "plugins.sinaTKChart", funcQ: Array(0), entity: undefined}, e = "plugins.sinaTKChart", t = null
        s = function(n, e, t) {
            e = e.replace(/\./g, "/"),
            t && (t += "$moduleName.js");
            var r = t || i.getModUrl(); //r = "http://finance.sina.com.cn/sinafinancesdk/js/$moduleName.js"
            u.load(r.replace("$moduleName", e), null, u.fBind(u.trace.error, this, i.CMD_404, n.name))
        },
        //n = "plugins.sinaTKChart", e = null
        d = function(n, e) {
            u.isArr(n) && (n = n.join("."));
            var r = t(n), //r = [Object, "sinaTKChart", "plugins"]
            i = r[0],//i = Object {}
            o = r[1],//o = "sinaTKChart"
            a = i[o];
            return a || (a = {
                init: !1,
                name: n, //n = Object {init: false, name: "plugins.sinaTKChart", funcQ: Array(0), entity: undefined}
                funcQ: [],
                entity: void 0
            },
            //n = Object {init: false, name: "plugins.sinaTKChart", funcQ: Array(0), entity: undefined}, e = "plugins.sinaTKChart"
            i[o] = a, s(a, n, e)),
            a
        },
        f = function(n, e) {
            for (var t, r = [], i = c.length; i--;) t = c[i],
            0 == t.indexOf(n) && -1 == t.indexOf(e) && (r[r.length] = t);
            return r
        },
        //n = "plugins.sinaTKChart", e = function (), t = null
        h = function(n, e, t) {
            var r = d(n, t);
            u.isFunc(e) && (r.init ? e() : r.funcQ.push(e))
        };
        this.modsTree = e,
        this.relyCall = h,
        xh5_define = n
    };
    n.api = e,
    n.cls = {},
    n.istLL = "KKE|1.0.3|WANGXuan|SinaFinance|wangxuan2@staff.sina.com.cn"
} (KKE);;

xh5_define("utils.util", [],
function() {
    return function() {
        function t(t, e) {
            var n = N(e.prototype);
            n.constructor = t,
            t.prototype = n
        }
        function e() {
            this.evtObj = {}
        }
        function n(t, e) {
            var n = Array.prototype.slice.call(arguments, 2);
            return function() {
                return t.apply(e, n.concat(Array.prototype.slice.call(arguments)))
            }
        }
        function i() {
            return Date.now ? Date.now() : (new Date).getTime()
        }
        function r(t, e) {
            e || (t = t.toLowerCase());
            for (var n, i = 1315423911,
            r = t.length; r--;) n = t.charCodeAt(r),
            i ^= (i << 5) + n + (i >> 2);
            return 2147483647 & i
        }
        function o(t, e, n, i) {
            var r = !1,
            o = document.createElement("script"),
            a = document.getElementsByTagName("script")[0],
            s = document.head || document.getElementsByTagName("head")[0] || document.documentElement,
            l = s.getElementsByTagName("base")[0];
            o.charset = i || "gb2312",
            o.src = t,
            o.async = !0,
            o.onload = o.onreadystatechange = function() {
                r || o.readyState && !/loaded|complete/.test(o.readyState) || (r = !0, o.onload = o.onreadystatechange = o.onerror = null, o.parentNode.removeChild(o), o = null, "function" == typeof e && e())
            },
            o.onerror = function() {
                o.onload = o.onreadystatechange = o.onerror = null,
                o.parentNode.removeChild(o),
                o = null,
                "function" == typeof n && n()
            },
            a.parentNode ? a.parentNode.insertBefore(o, a) : l ? s.insertBefore(o, l) : s.appendChild(o)
        }
        function a() {
            function t(t) {
                var e = t.style;
                for (var n in e) e.hasOwnProperty(n) && (t.dom.style[n] = e[n])
            }
            function e() {
                for (var t = ["@keyframes KKELoading", "@-webkit-keyframes KKELoading", "@-moz-keyframes KKELoading"], e = 0, n = t.length; n > e; e++) c.cssUtil.inject(t[e] + l.scaleY)
            }
            function n() {
                if (e(), !r) {
                    r = c.$C("div"),
                    t({
                        dom: r,
                        style: l.ctn
                    });
                    for (var n = .1,
                    i = 0,
                    o = l.color.length; o > i; i++) {
                        var a = c.$C("span");
                        t({
                            dom: a,
                            style: l.item
                        });
                        var s = c.clone(l.delay, s),
                        u = -1 + n * i + "s";
                        for (var h in s) s.hasOwnProperty(h) && (s[h] = u);
                        t({
                            dom: a,
                            style: s
                        }),
                        a.style.background = l.color[i],
                        r.appendChild(a)
                    }
                }
            }
            function i() {
                clearTimeout(a),
                a = setTimeout(function() {
                    "none" != r.style.display && (r.style.display = "none")
                },
                9e3)
            }
            var r, o, a, s, l = {
                ctn: {
                    width: "40px",
                    height: "30px",
                    margin: 0,
                    display: "none",
                    position: "absolute",
                    zIndex: 1
                },
                item: {
                    display: "inline-block",
                    width: "4px",
                    height: "30px",
                    margin: "0px 2px",
                    borderRadius: "5px",
                    animation: "KKELoading 1.2s infinite",
                    webkitAnimation: "KKELoading 1.2s infinite",
                    MozAnimation: "KKELoading 1.2s infinite"
                },
                color: ["#FF5472", "#FF706E", "#FF8762", "#FFAF4C", "#FFD53E"],
                delay: {
                    animationDelay: -1,
                    webkitAnimationDelay: -1,
                    MozAnimationDelay: -1
                },
                scaleY: "{0%,40%,100%{-moz-transform:scaleY(0.2);-webkit-transform:scaleY(0.2);transform:scaleY(0.2);}20%,60%{-moz-transform:scaleY(1);-webkit-transform:scaleY(1);transform:scaleY(1);}}"
            };
            n(),
            this.appendto = function(t, e) {
                o = t,
                s = e,
                o.appendChild(r)
            },
            this.setPosition = function() {
                o && o.offsetHeight > 0 ? (r.style.top = (o.offsetHeight - m(l.ctn.height)) / 2 + "px", r.style.left = (o.offsetWidth - m(l.ctn.width)) / 2 + "px") : s && s.DIMENSION.h_t && (r.style.top = (s.DIMENSION.h_t - m(l.ctn.height)) / 2 + "px", r.style.left = (s.DIMENSION._w - m(l.ctn.width)) / 2 + "px")
            },
            this.show = function() {
                i(),
                r.style.display = ""
            },
            this.hide = function() {
                clearTimeout(a),
                r.style.display = "none"
            }
        }
        function s(t) {
            t = t || {};
            var e, n, i, r, o, a, s = c.$C("div"),
            l = 70,
            u = function() {
                clearTimeout(a),
                n && (n.style.display = "none", s.innerHTML = ""),
                e && f(e.closeCb) && e.closeCb()
            },
            h = function(h) {
                if (e = h, clearTimeout(a), !n) {
                    n = c.$C("div"),
                    n.style.width = "100%",
                    n.style.height = "100%",
                    n.style.position = "absolute",
                    n.style.zIndex = l,
                    n.style.top = 0,
                    n.style.textAlign = "center",
                    i = c.$C("div"),
                    r = c.$C("div"),
                    o = c.$C("span"),
                    s.style.fontSize = "12px",
                    s.style.margin = "9px auto",
                    i.style.position = "absolute",
                    i.style.top = 0,
                    i.style.left = 0,
                    i.style.width = "100%",
                    i.style.height = "100%",
                    i.style.backgroundColor = t.TIP_ARR ? t.TIP_ARR[2] || "#fff": "#fff",
                    i.style.opacity = .5,
                    i.style.filter = "alpha(opacity=50)",
                    r.style.padding = "1px 3px 10px",
                    r.style.top = t.TIP_ARR ? t.TIP_ARR[4] || "26%": "26%",
                    r.style.position = "relative",
                    r.style.margin = "0 auto",
                    r.style.width = "100%",
                    o.style.cursor = "pointer",
                    o.style.display = "block",
                    o.style.margin = "0 auto",
                    o.style.lineHeight = o.style.height = "28px",
                    o.style.width = "60px",
                    o.style.fontSize = "14px",
                    o.style.borderRadius = "3px",
                    c.xh5_EvtUtil.addHandler(o, "click", u),
                    r.appendChild(s);
                    var d = !(!t.TIP_ARR || !t.TIP_ARR[3]); ! d && n.appendChild(i),
                    n.appendChild(r)
                }
                n.style.display = "",
                s.style.color = "undefined" != typeof h.fontColor ? h.fontColor: t.TIP_ARR ? t.TIP_ARR[1] || "#fff": "#fff";
                var f = t.TIP_ARR ? t.TIP_ARR[0] || "#000": "#000";
                if (r.style.backgroundColor = c.xh5_BrowserUtil.noH5 ? f: c.hex2dec(f, .8), h.bgStyle) for (var p in h.bgStyle) h.bgStyle.hasOwnProperty(p) && (r.style[p] = h.bgStyle[p]);
                if (s.innerHTML = h.txt || "", h.content && s.appendChild(h.content), !isNaN(h.autoHide) && h.autoHide > 0 && setTimeout(u, 1e3 * h.autoHide), h.noBtn ? c.$CONTAINS(r, o) && r.removeChild(o) : (o.innerHTML = h.btnLb || "\u786e\u5b9a", o.style.background = t.BTN_ARR ? t.BTN_ARR[0] || "#2b9dfc": "#2b9dfc", o.style.color = t.BTN_ARR ? t.BTN_ARR[1] || "#fff": "#fff", !c.$CONTAINS(r, o) && r.appendChild(o)), h.extraBtn) for (var g = 0,
                v = h.extraBtn,
                m = v.length; m > g; g++) {
                    var y = v[g],
                    b = c.$C("input");
                    b.type = "button",
                    b.value = y.value,
                    b.style.marginTop = "20px",
                    b.style.cursor = "pointer",
                    c.xh5_EvtUtil.addHandler(b, "click", y.onClk),
                    r.appendChild(b)
                }
                return h.parent.appendChild(n),
                n
            };
            this.genTip = h,
            this.hide = u
        }
        function l() {
            var t = "hq";
            return location.hostname.indexOf("sina.cn") > -1 && (t = "w", location.pathname.indexOf("appchart") > -1 && (t = "a")),
            t
        }
        this.VER = "2.2.31";
        var c = this,
        u = function(t) {
            return function(e) {
                return {}.toString.call(e) == "[object " + t + "]"
            }
        },
        h = u("Object"),
        d = u("String"),
        f = u("Function"),
        p = u("Array"),
        g = u("Number"),
        v = u("Date");
        this.isObj = h,
        this.isStr = d,
        this.isFunc = f,
        this.isArr = p,
        this.isNum = g,
        this.isDate = v;
        var m = function(t) {
            return parseInt(t, 10)
        };
        this.uae = function(t) {
            for (var e, n = [], i = {},
            r = 0, o = t.length; o > r; r++) e = t[r],
            1 !== i[e] && (i[e] = 1, n[n.length] = e);
            return n
        };
        var y = new function() {
            var t;
            if (XMLHttpRequest) t = new XMLHttpRequest;
            else if (ActiveXObject) try {
                t = new ActiveXObject("MSXML2.XMLHTTP")
            } catch(e) {
                try {
                    t = new ActiveXObject("Microsoft.XMLHTTP")
                } catch(n) {}
            }
            this.send = function(e, n, i, r) {
                if (!t || !e) return void(i && i("error while sending"));
                if (e += e.indexOf("?") < 0 ? "?": "&", e += "_=" + (new Date).getTime(), r = r || "POST", t.onreadystatechange = function() {
                    if (4 == t.readyState) {
                        var e;
                        200 == t.status && (e = t.responseText),
                        i && i(e)
                    }
                },
                t.open(r, e, !0), "POST" == r) {
                    t.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;");
                    var o = "";
                    for (var a in n) n.hasOwnProperty(a) && (o += [encodeURIComponent(a), encodeURIComponent(n[a])].join("=") + "&");
                    t.send(o)
                } else t.send(null)
            }
        };
        this.POST = "undefined" != typeof jQuery && jQuery.post ? jQuery.post: y.send,
        this.trace = function(t) {
            return {
                log: function() {
                    t && t.log && t.log.apply(t, arguments)
                },
                error: function() {
                    t && t.error && t.error.apply(t, arguments)
                }
            }
        } (null);
        var b = function(t, e) {
            var n = -1;
            if (t.indexOf) n = t.indexOf(e);
            else for (var i = t.length; i--;) if (t[i] === e) {
                n = i;
                break
            }
            return n
        };
        this.arrIndexOf = b;
        var x = function(t, e) {
            if (null == t || "object" != typeof t) return t;
            if (t.constructor == Date || t.constructor == RegExp || f(t) || d(t) || t.constructor == Number || t.constructor == Boolean) return new t.constructor(t);
            e = e || new t.constructor;
            for (var n in t) t.hasOwnProperty(n) && (e[n] = "undefined" == typeof e[n] ? x(t[n], null) : e[n]);
            return e
        };
        this.clone = x;
        var w = function(t) {
            if (!t) return t;
            var e = {};
            for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
            return e
        };
        this.co = w,
        //t = Object {toremove: false, isexclusive: false, callback: undefined, addon: false}, e = Object {isexclusive: true}
        this.oc = function(t, e) {
            // var that = this;
            if (!t) return e;
            for (var n in e) e.hasOwnProperty(n) && (t[n] = h(t[n]) && h(e[n]) ? oc2(t[n], e[n]) : e[n]);
            // for (var n in e) e.hasOwnProperty(n) && (t[n] = h(t[n]) && h(e[n]) ? arguments.callee(t[n], e[n]) : e[n]);
            return t
        };
        var oc2 = function(t, e) {
            // var that = this;
            if (!t) return e;
            for (var n in e) e.hasOwnProperty(n) && (t[n] = h(t[n]) && h(e[n]) ? oc2(t[n], e[n]) : e[n]);
            // for (var n in e) e.hasOwnProperty(n) && (t[n] = h(t[n]) && h(e[n]) ? arguments.callee(t[n], e[n]) : e[n]);
            return t
        };
        var N = function(t) {
            function e() {}
            return e.prototype = t,
            new e
        };
        this.fInherit = t,
        this.urlUtil = new
        function() {
            this.getUrlParam = function() {
                var t, e = {};
                try {
                    t = location.search.substring(1)
                } catch(n) {}
                if (t) for (var i, r, o, a = t.split("&"), s = a.length, l = 0; s > l; l++) o = a[l].indexOf("="),
                -1 != o && (i = a[l].substring(0, o), r = a[l].substring(o + 1), e[i] = r);
                return e
            },
            this.getMainUrl = function() {
                return window.location != window.parent.location ? document.referrer: document.location.href
            }
        },
        this.xh5_BrowserUtil = new
        function() {
            this.info = function() {
                var t, e = navigator.userAgent,
                n = e.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
                return /trident/i.test(n[1]) ? (t = /\brv[ :]+(\d+)/g.exec(e) || [], {
                    name: "IE ",
                    version: t[1] || ""
                }) : "Chrome" === n[1] && (t = e.match(/\bOPR\/(\d+)/), null != t) ? {
                    name: "Opera",
                    version: t[1]
                }: (n = n[2] ? [n[1], n[2]] : [navigator.appName, navigator.appVersion, "-?"], null != (t = e.match(/version\/(\d+)/i)) && n.splice(1, 1, t[1]), {
                    name: n[0],
                    version: n[1]
                })
            } (),
            this.noH5 = !1,
            this.hdpr = function(t) {
                var e = document.createElement("canvas");
                if (e.getContext && e.getContext("2d")) {
                    var n = Math.ceil(window.devicePixelRatio || 1),
                    i = e.getContext("2d").webkitBackingStorePixelRatio || 1;
                    return n / i
                }
                return t.noH5 = !0,
                1
            } (this)
        },
        this.xh5_deviceUtil = function() {
            return {
                istd: function() {
                    if ("ontouchend" in window) {
                        var t;
                        try {
                            t = navigator.userAgent
                        } catch(e) {}
                        return t && t.indexOf("Windows NT") > 0 ? !1 : !0
                    }
                    return ! 1
                } (),
                allowt: "ontouchend" in window
            }
        } ();
        var A = function() {
            function t(t) {
                return t = JSON.stringify(t),
                t || (t = ""),
                t = encodeURIComponent(t)
            }
            function e(t) {
                try {
                    t = JSON.parse(t)
                } catch(e) {
                    t = decodeURIComponent(t)
                }
                return t
            }
            function n(e, n, i) {
                if (i = i || {},
                void 0 != e && void 0 != n) {
                    var r, o, a, s;
                    o = i.path ? "; path=" + i.path: "",
                    a = i.domain ? "; domain=" + i.domain: "",
                    s = i.secure ? "; secure": "";
                    var l, u = i.expires;
                    switch (c(u)) {
                    case "Number":
                        l = new Date,
                        l.setTime(l.getTime() + 1e3 * u);
                        break;
                    case "String":
                        l = new Date(u),
                        "Invalid Date" == l && (l = "");
                        break;
                    case "Date":
                        l = u
                    }
                    r = l ? "; expires=" + l.toUTCString() : "",
                    document.cookie = [encodeURIComponent(e), "=", t(n), r, o, a, s].join("")
                }
            }
            function i(t) {
                var n = document.cookie.match("(?:^|;)\\s*" + encodeURIComponent(t) + "=([^;]*)");
                return n ? e(n[1]) || "": null
            }
            function r(t) {
                document.cookie = encodeURIComponent(t) + "=;expires=" + new Date(0).toUTCString()
            }
            function o(e, n) {
                void 0 != e && void 0 != n && localStorage.setItem(encodeURIComponent(e), t(n))
            }
            function a(t) {
                var n = localStorage.getItem(encodeURIComponent(t));
                return e(n)
            }
            function s(t) {
                localStorage.removeItem(encodeURIComponent(t))
            }
            var l = Object.prototype.toString,
            c = function(t) {
                return null === t ? "Null": void 0 === t ? "Undefined": l.call(t).slice(8, -1)
            },
            u = function() {
                if ("object" == typeof localStorage && localStorage && localStorage.setItem) {
                    var t = "KKE_LOCALSTORAGE_TESTing";
                    try {
                        return localStorage.removeItem(t),
                        localStorage.setItem(t, t),
                        localStorage.removeItem(t),
                        !0
                    } catch(e) {
                        return ! 1
                    }
                }
                return ! 1
            } ();
            return {
                hasls: u,
                save: function(t, e, i) {
                    i = i || {};
                    var r = i.mode;
                    if (r) switch (r) {
                    case "localStorage":
                        if (!u) return;
                        o(t, e);
                        break;
                    case "cookie":
                        n(t, e, i)
                    } else if (u) try {
                        s(t),
                        o(t, e)
                    } catch(a) {} else n(t, e, i)
                },
                load: function(t, e) {
                    var n;
                    if ("Object" == c(e) && (e = e.mode), e) switch (e) {
                    case "localStorage":
                        if (!u) return;
                        n = a(t);
                        break;
                    case "cookie":
                        n = i(t)
                    } else u && (n = a(t)),
                    !n && (n = i(t));
                    return n
                },
                remove: function(t, e) {
                    if ("Object" == c(e) && (e = e.mode), e) switch (e) {
                    case "localStorage":
                        if (!u) return;
                        s(t);
                        break;
                    case "cookie":
                        r(t)
                    } else u && s(t),
                    r(t)
                },
                clear: function(t) {
                    u && s(t)
                }
            }
        } ();
        this.localSL = A,
        this.xh5_EvtUtil = {
            addHandler: function(t, e, n) {
                t && (t.addEventListener ? t.addEventListener(e, n, !1) : t.attachEvent ? t.attachEvent("on" + e, n) : t["on" + e] = n)
            },
            removeHandler: function(t, e, n) {
                t && (t.removeEventListener ? t.removeEventListener(e, n, !1) : t.detachEvent ? t.detachEvent("on" + e, n) : t["on" + e] = null)
            },
            getEvent: function(t) {
                return t ? t: window.event
            },
            getTarget: function(t) {
                return ! t && (t = this.getEvent()),
                t ? t.target || t.srcElement: null
            },
            //t = MouseEvent {isTrusted: true, screenX: 472, screenY: 675, clientX: 467, clientY: 578…}
            preventDefault: function(t) { ! t && (t = this.getEvent()),
                t && (t.preventDefault ? t.preventDefault() : t.returnValue = !1)
            },
            stopPropagation: function(t) { ! t && (t = this.getEvent()),
                t && (t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0)
            },
            getRelatedTarget: function(t) {
                return ! t && (t = this.getEvent()),
                t.relatedTarget ? t.relatedTarget: t.toElement ? t.toElement: t.fromElement ? t.fromElement: null
            },
            getWheelDelta: function(t) {
                return ! t && (t = this.getEvent()),
                t ? t.wheelDelta ? client.engine.opera && client.engine.opera < 9.5 ? -t.wheelDelta: t.wheelDelta: 40 * -t.detail: 0
            }
        },
        e.prototype.al = function(t, e, n) {
            n && this.evtObj[t] || (!this.evtObj[t] && (this.evtObj[t] = []), this.evtObj[t].push(e))
        },
        e.prototype.rl = function(t, e) {
            var n = this.evtObj[t];
            if (p(n)) for (var i = n.length; i--;) n[i] == e && n.splice(i, 1)
        },
        e.prototype.re = function(t, e) {
            var n = this.evtObj[t];
            if (p(n)) for (var i = 0,
            r = n.length; r > i; i++)"function" == typeof n[i] && n[i](t, e)
        },
        this.xh5_EvtDispatcher = e,
        this.$DOM = function(t, e) {
            return e = e || document,
            e.getElementById(t)
        },
        this.$C = function(t, e) {
            var n = document.createElement(t);
            return e && (n.id = e),
            n
        },
        this.$T = function(t) {
            return document.createTextNode(t)
        },
        this.$CONTAINS = function(t, e) {
            if (t.compareDocumentPosition) return t === e || !!(16 & t.compareDocumentPosition(e));
            if (t.contains && 1 === e.nodeType) return t.contains(e) && t !== e;
            for (; e = e.parentNode;) if (e === t) return ! 0;
            return ! 1
        },
        this.getTextNodes = function(t) {
            var e = [];
            for (t = t.firstChild; t; t = t.nextSibling) 3 == t.nodeType ? e.push(t) : e = e.concat(arguments.callee(t));
            return e
        },
        this.getCSS = function(t) {
            var e = null;
            return e = window.getComputedStyle ? window.getComputedStyle(t) : t.currentStyle
        },
        this.fBind = n,
        this.isColor = function(t) {
            return /^#[0-9a-fA-F]{3,6}$/.test(t)
        },
        this.isColorRGB = function(t) {
            return /(^#[0-9a-fA-F]{3,6}$)|(^rgba?\(.{5,16}\)$)/.test(t)
        },
        this.randomColor = function() {
            for (var t = Math.floor(16777215 * Math.random()).toString(16); t.length < 6;) t += "0";
            return t
        },
        this.hex2dec = function(t, e, n) {
            if (0 == t.indexOf("rgb")) return t;
            t = t.replace(/#|0x/i, "");
            var i, r, o;
            t.replace(/(\w{6})|(\w{3})/,
            function(e, n, a) {
                if (n) i = t.slice(0, 2),
                r = t.slice(2, 4),
                o = t.slice(4);
                else {
                    if (!a) return [0, 0, 0];
                    var s = t.split("");
                    i = s[0],
                    i += String(i),
                    r = s[1],
                    r += String(r),
                    o = s[2],
                    o += String(o)
                }
            });
            var a;
            return isNaN(e) ? (a = [parseInt(i, 16), parseInt(r, 16), parseInt(o, 16)], n ? a: "rgb($color)".replace("$color", a.join(","))) : (a = [parseInt(i, 16), parseInt(r, 16), parseInt(o, 16), e], n ? a: "rgba($color)".replace("$color", a.join(",")))
        },
        this.getTimestamp = i,
        //css的样式工具
        this.cssUtil = {
            inject: function(t) {
                var e = document.createElement("style"),
                n = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
                e.type = "text/css",
                e.styleSheet ? e.styleSheet.cssText = t: e.appendChild(document.createTextNode(t)),
                n.appendChild(e)
            },
            //往t对象中添加e这个样式
            adCls: function(t, e) {
                if (t.className != e) {
                    var n = t.className.split(" ");
                    for (var i in n) if (n.hasOwnProperty(i) && n[i] == e) return;
                    "" == t.className ? t.className = e: t.className += " " + e
                }
            },
            //传入t为样式，e也为样式，比较两者，删除t中与e相同的样式表
            rmCls: function(t, e) {
                if ( - 1 != t.className.indexOf(e)) if (t.className == e) t.className = "";
                else {
                    var n = t.className.split(" "),
                    i = "";
                    for (var r in n) if (n.hasOwnProperty(r)) {
                        if (n[r] == e) continue;
                        "" != i && (i += " "),
                        i += n[r]
                    }
                    t.className = i
                }
            }
        },
        this.load = o;
        var C, S = new
        function() {
            var t = C || {};
            C = t;
            var e = function(e, n) {
                for (var i = t[e][n ? "errCbArr": "cbArr"], r = i.length; r--;) {
                    var o = i[r];
                    f(o) && o()
                }
                t[e] = null,
                delete t[e]
            };
            this.load = function(i, a, s, l) {
                var c = "urlhash_" + r(i);
                for (var u in t) if (t.hasOwnProperty(u) && u == c) return t[u].cbArr.push(a),
                void t[u].errCbArr.push(s);
                t[c] = {
                    url: i,
                    cbArr: [a],
                    errCbArr: [s]
                },
                o(i, n(e, this, c), n(e, this, c, !0), l)
            }
        };
        this.relyLoader = S,
        this.iframer = function(t, e) {
            function n() {
                if (document && document.body) {
                    clearInterval(r),
                    a = 0;
                    var t = document.body;
                    t.insertBefore(i, t.firstChild),
                    i.setAttribute("data-ready", "1")
                } else a++>9 && (clearInterval(r), f(e) && e())
            }
            var i, r, o = t.attribute ? t.attribute.id || "_kkeiframe" + (new Date).getTime() : "_kkeiframe" + (new Date).getTime(),
            a = 0;
            if (! (i = document.getElementById(o))) {
                if (i = document.createElement("iframe"), i.setAttribute("data-ready", "0"), t.attribute) for (var s in t.attribute) t.attribute.hasOwnProperty(s) && (i[s] = t.attribute[s]);
                if (i.style.height = i.style.width = 0, i.style.borderStyle = "none", i.style.position = "absolute", i.style.zIndex = -9, i.style.display = "none", t.style) for (var l in t.style) t.style.hasOwnProperty(l) && (i.style[l] = t.style[l]);
                r = setInterval(n, 500),
                n()
            }
            return i
        },
        this.ca = function(t) {
            if (t) for (; t.length > 0;) t.length--
        },
        this.isRepos = function(t) {
            return /^(sh204\d{3}|sz1318\d{2})$/.test(t)
        },
        this.market = function(t) {
            return /^s[hz]\d{6}$/.test(t) ? "CN": /^s[hz]\d{6}_i$/.test(t) ? "CNI": /^sb[48]\d{5}$/.test(t) ? "OTC": /^[48]\d{5}$/.test(t) ? "OTC": /^otc_\d{6}$/.test(t) ? "OTC": /^gb_.+$/.test(t) ? "US": /^(hk|rt_hk)\w+/.test(t) ? "HK": /^hf_\w+/.test(t) ? "HF": /^nf_\w+/.test(t) ? "NF": /^f_\d{6}$/.test(t) || /^fu_\d{6}$/.test(t) || /^pwbfbyd_\d{6}$/.test(t) || /^pwbfbjd_\d{6}$/.test(t) || /^pwbfbnd_\d{6}$/.test(t) || /^ljjz_\d{6}$/.test(t) || /^dwjz_\d{6}$/.test(t) || /^lshb_\d{6}$/.test(t) ? "fund": /^CON_OP_\w+/.test(t) ? "option_cn": /^fx_.+$/.test(t) ? "forex": /^(DINIW|USDCNY)$/.test(t) ? "forex_yt": /^CFF_RE_.+$/.test(t) ? "CFF": /\d+$/.test(t) ? "NF": void 0
        },
        this.cookieUtil = {
            escape: function(t) {
                return t.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1")
            },
            get: function(t) {
                var e = document.cookie.match("(?:^|;)\\s*" + this.escape(t) + "=([^;]*)");
                return e ? e[1] || "": ""
            },
            set: function(t, e, n) { ! n && (n = {}),
                e || (e = "", n.expires = -1);
                var i = "";
                if (n.expires && (Number(n.expires) || n.expires.toUTCString)) {
                    var r;
                    Number(n.expires) ? (r = new Date, r.setTime(r.getTime() + 1e3 * n.expires)) : r = n.expires,
                    i = "; expires=" + r.toUTCString()
                }
                var o = n.path ? "; path=" + n.path: "",
                a = n.domain ? "; domain=" + n.domain: "",
                s = n.secure ? "; secure": "";
                document.cookie = [t, "=", e, i, o, a, s].join("")
            }
        };
        var k = new
        function() {
            function t() {
                o(e,
                function() {
                    for (; d.length;) {
                        var t = d.pop();
                        SUDA.uaTrack.apply(null, t)
                    }
                },
                function() {
                    h--,
                    h && t(),
                    h || (d = [])
                })
            }
            var e = "https://wwws.sinaimg.cn/unipro/pub/suda_s_v851c.js",
            n = navigator.userAgent || "unknownUa";
            n = encodeURIComponent("_UA_" + n);
            var i, r, a = "chart_finance",
            s = "",
            l = ",",
            u = [],
            h = 5,
            d = [],
            f = "undefined" == typeof SUDA;
            // if (f) try {
            //     c.xh5_EvtUtil.addHandler(document, "DOMContentLoaded",
            //     function() {
            //         // for (var e = document.getElementsByTagName("script"), n = e.length; n--;) if (e[n].src.indexOf("suda") > -1) {
            //         //     f = !1;
            //         //     break
            //         // }
            //         // f && t()
            //     })
            // } catch(p) {}
            var g = function() {
                for (var t, e = "",
                i = 0,
                o = u.length; o > i; i++) t = u[i],
                e += [t.k, t.v].join(s) + l;
                for (; u.length;) u.length--;
                if (e !== r) {
                    r = e,
                    e += n;
                    try {
                        SUDA.uaTrack(a, e)
                    } catch(c) {
                        h && d.push([a, e])
                    }
                }
            };
            this.s = function(t, e, n) {
                if (t) { (isNaN(n) || 0 > n) && (n = 3e3),
                    e = JSON.stringify(e),
                    e || (e = ""),
                    e = encodeURIComponent(e);
                    for (var r = u.length; r--;) if (u[r].k == t) {
                        u.splice(r, 1);
                        break
                    }
                    u.push({
                        k: t,
                        v: e
                    }),
                    clearTimeout(i),
                    i = setTimeout(g, n)
                }
            };
            var v, m;
            this.s2 = function(t, e, n) {
                if (n = n || "chart_detail", m != t || v != n) {
                    v = n,
                    m = t,
                    setTimeout(function() {
                        v = void 0,
                        m = void 0
                    },
                    99);
                    try {
                        SUDA.uaTrack(n, e || t)
                    } catch(i) {
                        h && d.push([n, e || t])
                    }
                }
            }
        };
        this.stc = k.s,
        this.suda = k.s2,
        this.xh5_PosUtil = {
            pp: function(t, e, n, i) {
                return isNaN(t) || e >= t ? i: t >= n ? 1 : Math.max(i * (1 - (t - e) / (n - e)), 1)
            },
            ppp: function(t, e, n, i, r) {
                return t = (t - r) / r,
                this.pp(t, e, n, i)
            },
            vp: function(t, e, n) {
                return isNaN(t) || 0 >= t ? n - 1 : n * (1 - t / e)
            }
        },
        this.xh5_HtmlPosUtil = {
            pageX: function(t) {
                return t.offsetParent ? t.offsetLeft + this.pageX(t.offsetParent) : t.offsetLeft
            },
            pageY: function(t) {
                return t.offsetParent ? t.offsetTop + this.pageY(t.offsetParent) : t.offsetTop
            },
            parentX: function(t) {
                return t.parentNode == t.offsetParent ? t.offsetLeft: this.pageX(t) - this.pageX(t.parentNode)
            },
            parentY: function(t) {
                return t.parentNode == t.offsetParent ? t.offsetTop: this.pageY(t) - this.pageY(t.parentNode)
            }
        },
        this.xh5_ADJUST_HIGH_LOW = new
        function() {
            var t = function(t) {
                var e = parseInt(Math.round(100 * t));
                return e % 100 != 0 && (e % 10 == 0 && (e *= .1), e % 5 != 0 && e % 2 != 0) ? !0 : !1
            },
            e = function(t, e) {
                if (e) for (; t > 5;) if (t % 2 == 0) t *= .5;
                else {
                    if (t % 3 != 0) break;
                    t /= 3
                } else t > 9 && (t % 3 == 0 ? t /= 3 : t % 4 == 0 ? t *= .25 : t % 2 == 0 && (t *= .5));
                return t
            };
            this.c = function(n, i, r, o, a, s) {
                if (isNaN(n) || isNaN(i) || i > n) return [0, 0, 0];
                isNaN(s) || (s = (n - i) * s, n += s, i -= s);
                for (var l, c, u, h, d, f, p, g, v, m, y, b, x, w, N = -1e-6,
                A = .5 * (i + n), C = o ? [4, 5, 6, 8, 9, 10, 12, 15, 16, 18, 20] : [4, 5, 6, 7, 8, 9, 10, 12, 14, 15, 16, 18, 20], S = [1, 2, 3, 4, 5, 6, 8], k = !1, T = S.length, D = 0, O = C.length; O > D; D++) for (k = !1, x = C[D], u = (n - i) / x, g = Math.pow(10, 0 - r); ! k;) {
                    for (w = 0; T > w; w++) if (h = g * S[w], h - u > N && (1 & x ? (d = Math.round((A + .5 * h) / h) * h, y = (d + .5 * (x - 1) * h).toFixed(5), b = (d - .5 * (x + 1) * h).toFixed(5)) : (d = Math.round(A / h) * h, y = (d + .5 * x * h).toFixed(5), b = (d - .5 * x * h).toFixed(5)), f = Number(y), p = Number(b), f - n > N && N > p - i)) {
                        if (k = !0, 0 > p && !a && (f -= p, p = 0), !v) {
                            v = f - p,
                            l = f,
                            c = p,
                            m = x;
                            break
                        }
                        var R = (f - p) / e(x);
                        if (1 != Math.round(100 * R) && 1 != Math.round(10 * R) && t(R)) break;
                        if (f - p > v) break;
                        if (f - p == v) {
                            var P = l - n,
                            M = i - c,
                            F = Math.abs(P - M);
                            P = f - n,
                            M = i - p;
                            var E = Math.abs(P - M);
                            if (E >= F) break
                        }
                        if (t(f)) break;
                        if (t(p)) break;
                        v = f - p,
                        l = f,
                        c = p,
                        m = x;
                        break
                    }
                    g *= 10
                }
                return m = e(m, o),
                [l, c, m]
            }
        },
        this.xh5_S_KLC_D = function(t) {
            var e, n, i, r, o, a, s, l = 864e5,
            c = 7657,
            u = [],
            h = [],
            d = ~ (3 << 30),
            f = 1 << 30,
            p = [0, 3, 5, 6, 9, 10, 12, 15, 17, 18, 20, 23, 24, 27, 29, 30],
            g = Math,
            v = function() {
                var l, c;
                for (l = 0; 64 > l; l++) h[l] = g.pow(2, l),
                26 > l && (u[l] = m(l + 65), u[l + 26] = m(l + 97), 10 > l && (u[l + 52] = m(l + 48)));
                for (u.push("+", "/"), u = u.join(""), n = t.split(""), i = n.length, l = 0; i > l; l++) n[l] = u.indexOf(n[l]);
                return r = {},
                e = a = 0,
                o = {},
                c = w([12, 6]),
                s = 63 ^ c[1],
                {
                    _1479: S,
                    _136: C,
                    _200: A,
                    _139: k,
                    _197: T
                } ["_" + c[0]] ||
                function() {
                    return []
                }
            },
            m = String.fromCharCode,
            y = function(t) {
                return t === {}._
            },
            b = function() {
                var t, e;
                for (t = x(), e = 1;;) {
                    if (!x()) return e * (2 * t - 1);
                    e++
                }
            },
            x = function() {
                var t;
                return e >= i ? 0 : (t = n[e] & 1 << a, a++, a >= 6 && (a -= 6, e++), !!t)
            },
            w = function(t, r, o) {
                var s, l, c, u, d;
                for (l = [], c = 0, r || (r = []), o || (o = []), s = 0; s < t.length; s++) if (u = t[s], c = 0, u) {
                    if (e >= i) return l;
                    if (t[s] <= 0) c = 0;
                    else if (t[s] <= 30) {
                        for (; d = 6 - a, d = u > d ? d: u, c |= (n[e] >> a & (1 << d) - 1) << t[s] - u, a += d, a >= 6 && (a -= 6, e++), u -= d, !(0 >= u););
                        r[s] && c >= h[t[s] - 1] && (c -= h[t[s]])
                    } else c = w([30, t[s] - 30], [0, r[s]]),
                    o[s] || (c = c[0] + c[1] * h[30]);
                    l[s] = c
                } else l[s] = 0;
                return l
            },
            N = function(t) {
                var e, n, i, o;
                for (t > 1 && (e = 0), e = 0; t > e; e++) r.d++,
                i = r.d % 7,
                (3 == i || 4 == i) && (r.d += 5 - i);
                return n = new Date,
                o = 60 * n.getTimezoneOffset() * 1e3,
                n.setTime((c + r.d) * l + o),
                n.setHours(n.getHours() + 8),
                n
            },
            A = function() {
                var t, n, o, a, l;
                if (s >= 1) return [];
                for (r.d = w([18], [1])[0] - 1, o = w([3, 3, 30, 6]), r.p = o[0], r.ld = o[1], r.cd = o[2], r.c = o[3], r.m = g.pow(10, r.p), r.pc = r.cd / r.m, n = [], t = 0; a = {
                    d: 1
                },
                x() && (o = w([3])[0], 0 == o ? a.d = w([6])[0] : 1 == o ? (r.d = w([18])[0], a.d = 0) : a.d = o), l = {
                    date: N(a.d)
                },
                x() && (r.ld += b()), o = w([3 * r.ld], [1]), r.cd += o[0], l.close = r.cd / r.m, n.push(l), !(e >= i) && (e != i - 1 || 63 & (r.c ^ t + 1)); t++);
                return n[0].prevclose = r.pc,
                n
            },
            C = function() {
                var t, n, o, a, l, c, u, h, d, f, p;
                if (s >= 2) return [];
                for (u = [], d = {
                    v: "volume",
                    p: "price",
                    a: "avg_price"
                },
                r.d = w([18], [1])[0] - 1, h = {
                    date: N(1)
                },
                o = w(1 > s ? [3, 3, 4, 1, 1, 1, 5] : [4, 4, 4, 1, 1, 1, 3]), t = 0; 7 > t; t++) r[["la", "lp", "lv", "tv", "rv", "zv", "pp"][t]] = o[t];
                for (r.m = g.pow(10, r.pp), s >= 1 ? (o = w([3, 3]), r.c = o[0], o = o[1]) : (o = 5, r.c = 2), r.pc = w([6 * o])[0], h.pc = r.pc / r.m, r.cp = r.pc, r.da = 0, r.sa = r.sv = 0, t = 0; ! (e >= i) && (e != i - 1 || 7 & (r.c ^ t)); t++) {
                    for (l = {},
                    a = {},
                    f = r.tv ? x() : 1, n = 0; 3 > n; n++) if (p = ["v", "p", "a"][n], (f ? x() : 0) && (o = b(), r["l" + p] += o), c = "v" == p && r.rv ? x() : 1, o = w([3 * r["l" + p] + ("v" == p ? 7 * c: 0)], [ !! n])[0] * (c ? 1 : 100), a[p] = o, "v" == p) {
                        if (! (l[d[p]] = o) && 241 > t && (r.zv ? !x() : 1)) {
                            a.p = 0;
                            break
                        }
                    } else "a" == p && (r.da = (1 > s ? 0 : r.da) + a.a);
                    r.sv += a.v,
                    l[d.p] = (r.cp += a.p) / r.m,
                    r.sa += a.v * r.cp,
                    l[d.a] = y(a.a) ? t ? u[t - 1][d.a] : l[d.p] : r.sv ? ((g.floor((r.sa * (2e3 / r.m) + r.sv) / r.sv) >> 1) + r.da) / 1e3: l[d.p] + r.da / 1e3,
                    u.push(l)
                }
                return u[0].date = h.date,
                u[0].prevclose = h.pc,
                u
            },
            S = function() {
                var t, e, n, i, o, a, l;
                if (s >= 1) return [];
                for (r.lv = 0, r.ld = 0, r.cd = 0, r.cv = [0, 0], r.p = w([6])[0], r.d = w([18], [1])[0] - 1, r.m = g.pow(10, r.p), o = w([3, 3]), r.md = o[0], r.mv = o[1], t = []; o = w([6]), o.length;) {
                    if (n = {
                        c: o[0]
                    },
                    i = {},
                    n.d = 1, 32 & n.c) for (;;) {
                        if (o = w([6])[0], 63 == (16 | o)) {
                            l = 16 & o ? "x": "u",
                            o = w([3, 3]),
                            n[l + "_d"] = o[0] + r.md,
                            n[l + "_v"] = o[1] + r.mv;
                            break
                        }
                        if (32 & o) {
                            a = 8 & o ? "d": "v",
                            l = 16 & o ? "x": "u",
                            n[l + "_" + a] = (7 & o) + r["m" + a];
                            break
                        }
                        if (a = 15 & o, 0 == a ? n.d = w([6])[0] : 1 == a ? (r.d = a = w([18])[0], n.d = 0) : n.d = a, !(16 & o)) break
                    }
                    i.date = N(n.d);
                    for (a in {
                        v: 0,
                        d: 0
                    }) y(n["x_" + a]) || (r["l" + a] = n["x_" + a]),
                    y(n["u_" + a]) && (n["u_" + a] = r["l" + a]);
                    for (n.l_l = [n.u_d, n.u_d, n.u_d, n.u_d, n.u_v], l = p[15 & n.c], 1 & n.u_v && (l = 31 - l), 16 & n.c && (n.l_l[4] += 2), e = 0; 5 > e; e++) l & 1 << 4 - e && n.l_l[e]++,
                    n.l_l[e] *= 3;
                    n.d_v = w(n.l_l, [1, 0, 0, 1, 1], [0, 0, 0, 0, 1]),
                    a = r.cd + n.d_v[0],
                    i.open = a / r.m,
                    i.high = (a + n.d_v[1]) / r.m,
                    i.low = (a - n.d_v[2]) / r.m,
                    i.close = (a + n.d_v[3]) / r.m,
                    o = n.d_v[4],
                    "number" == typeof o && (o = [o, o >= 0 ? 0 : -1]),
                    r.cd = a + n.d_v[3],
                    l = r.cv[0] + o[0],
                    r.cv = [l & d, r.cv[1] + o[1] + !!((r.cv[0] & d) + (o[0] & d) & f)],
                    i.volume = (r.cv[0] & f - 1) + r.cv[1] * f,
                    t.push(i)
                }
                return t
            },
            k = function() {
                var t, e, n, i;
                if (s > 1) return [];
                for (r.l = 0, i = -1, r.d = w([18])[0] - 1, n = w([18])[0]; r.d < n;) e = N(1),
                0 >= i ? (x() && (r.l += b()), i = w([3 * r.l], [0])[0] + 1, t || (t = [e], i--)) : t.push(e),
                i--;
                return t
            },
            T = function() {
                var t, n, o, a;
                if (s >= 1) return [];
                for (r.f = w([6])[0], r.c = w([6])[0], o = [], r.dv = [], r.dl = [], t = 0; t < r.f; t++) r.dv[t] = 0,
                r.dl[t] = 0;
                for (t = 0; ! (e >= i) && (e != i - 1 || 7 & (r.c ^ t)); t++) {
                    for (a = [], n = 0; n < r.f; n++) x() && (r.dl[n] += b()),
                    r.dv[n] += w([3 * r.dl[n]], [1])[0],
                    a[n] = r.dv[n];
                    o.push(a)
                }
                return o
            };
            return v()()
        };
        var T = {
            dd: function(t) {
                return new Date(t.getFullYear(), t.getMonth(), t.getDate())
            },
            ddt: function(t) {
                return new Date(t.getTime())
            },
            stbd: function(t, e) {
                return t && e && t.getFullYear() == e.getFullYear() && t.getMonth() == e.getMonth() ? t.getDate() == e.getDate() : !1
            },
            stbdt: function(t, e) {
                return t && e ? t.getTime() == e.getTime() : !1
            },
            stbs: function(t, e, n, i) {
                return t.getFullYear() == e && t.getMonth() == n ? t.getDate() == i: !1
            },
            stbds: function(t, e, n) { ! n && (n = "-");
                var i = e.split(n);
                return this.stbs(t, Number(i[0]), Number(i[1]) - 1, Number(i[2]))
            },
            ds: function(t, e, n, i, r, o) {
                "undefined" == typeof e && (e = "-");
                var a = [];
                if (i || a.push(t[n ? "getUTCFullYear": "getFullYear"]()), !r) {
                    var s = t[n ? "getUTCMonth": "getMonth"]() + 1;
                    a.push(10 > s ? "0" + s: s)
                }
                if (!o) {
                    var l = t[n ? "getUTCDate": "getDate"]();
                    a.push(10 > l ? "0" + l: l)
                }
                return a.join(e)
            },
            dss: function(t, e, n) {
                var i = this.ds(t, e, n),
                r = [t["get" + (n ? "UTC": "") + "Hours"]()],
                o = [t["get" + (n ? "UTC": "") + "Minutes"]()],
                a = [t["get" + (n ? "UTC": "") + "Seconds"]()],
                s = [10 > r ? "0" + r: r, 10 > o ? "0" + o: o, 10 > a ? "0" + a: a].join(":");
                return [i, s].join(" ")
            },
            dst: function(t, e, n) {
                var i = [t["get" + (n ? "UTC": "") + "Hours"]()],
                r = [t["get" + (n ? "UTC": "") + "Minutes"]()],
                o = [10 > i ? "0" + i: i, 10 > r ? "0" + r: r];
                if (e) {
                    var a = [t["get" + (n ? "UTC": "") + "Seconds"]()];
                    o.push(10 > a ? "0" + a: a)
                }
                return o.join(":")
            },
            sd: function(t, e) {
                var n = t.split("-"),
                i = n[0],
                r = n[1] - 1 || 0,
                o = n[2] || 1,
                a = 0,
                s = 0,
                l = 0;
                return e && (n = e.split(":"), a = n[0] || 0, s = n[1] || 0, l = n[2] || 0),
                new Date(i, r, o, a, s, l)
            },
            ssd: function(t) {
                var e = t.split(" "),
                n = e[0],
                i = e[1];
                return this.sd(n, i)
            },
            gw: function(t, e) {
                var n = 6048e5,
                i = 2592e5,
                r = (t.getTime() - i) / n,
                o = (e.getTime() - i) / n;
                return Math.floor(r) == Math.floor(o)
            },
            gm: function(t, e) {
                return t.getFullYear() == e.getFullYear() ? t.getMonth() == e.getMonth() : !1
            },
            weekname: ["\u65e5", "\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d", "\u65e5"],
            nw: function(t) {
                return this.weekname[t] || ""
            }
        };
        this.dateUtil = T,
        this.LoadingSign = a;
        var D = {
            trim: function(t) {
                return t.replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, "")
            },
            ps: function(t, e) {
                if (t = Number(t), isNaN(t)) return "-";
                var n = Math.abs(t);
                return 1e5 > n ? t.toFixed(e) : 1e7 > n ? (t / 1e4).toFixed(e) + "\u4e07": 1e8 > n ? (t / 1e7).toFixed(e) + "\u5343\u4e07": (t / 1e8).toFixed(e) + "\u4ebf"
            },
            nu: function(t) {
                return t = Number(t),
                t = Math.abs(t),
                1e5 > t || isNaN(t) ? [1, ""] : 1e7 > t ? [1e4, "\u4e07"] : 1e8 > t ? [1e7, "\u5343\u4e07"] : [1e8, "\u4ebf"]
            },
            vs: function(t, e) {
                var n, i = "";
                return t > 1e12 ? (n = (t / 1e12).toFixed(0), i = "\u4e07\u4ebf") : t > 1e8 ? (n = (t / 1e8).toFixed(2), i = "\u4ebf") : t > 1e5 ? (n = (t / 1e4).toFixed(2), i = "\u4e07") : n = t >= 1 ? t.toFixed(0) : "-",
                e ? n + i: n
            },
            zp: function(t) {
                return t = String(t),
                t.length < 2 ? "0" + t: t
            }
        };
        this.strUtil = D,
        this.tUtil = {
            s0: function(t) {
                return t = parseInt(Number(t)),
                0 > t ? "": 10 > t ? "0" + String(t) : String(t)
            },
            tIWS: function(t, e) {
                for (var n = [], i = t; e >= i; i++) n.push(this.s0(i / 60) + ":" + this.s0(i % 60));
                return n
            },
            gtr: function(t) {
                for (var e, n, i, r, o, a = [], s = 0, l = t.length; l > s; s++) e = t[s][0],
                n = t[s][1],
                i = 60 * Number(e.split(":")[0]) + Number(e.split(":")[1]),
                r = 60 * Number(n.split(":")[0]) + Number(n.split(":")[1]),
                o = this.tIWS(i, r),
                a = a.concat(o);
                return a
            },
            tradingA: [],
            gta: function() {
                return this.tradingA.length || (this.tradingA = this.gtr([["9:30", "11:29"], ["13:00", "15:00"]])),
                this.tradingA
            },
            tradingUs: [],
            gtus: function() {
                return this.tradingUs.length || (this.tradingUs = this.gtr([["9:30", "16:00"]])),
                this.tradingUs
            },
            tradingHk: [],
            gthk: function() {
                return this.tradingHk.length || (this.tradingHk = this.gtr([["09:30", "11:59"], ["13:00", "16:00"]])),
                this.tradingHk
            },
            trading: [],
            gtAll: function(t) {
                return this.trading.length ? (this.trading[0] != t[0][0] || this.trading[this.trading.length - 1] != t[t.length - 1][1]) && (this.trading = this.gtr(t)) : this.trading = this.gtr(t),
                this.trading
            },
            gata: function(t, e) {
                var n;
                switch (t) {
                case "US":
                    n = this.gtus();
                    break;
                case "HK":
                    n = this.gthk();
                    break;
                case "NF":
                    n = this.gtAll(e);
                    break;
                case "HF":
                    n = this.gtAll(e);
                    break;
                default:
                case "CN":
                    n = this.gta()
                }
                return n
            },
            ist: function(t, e) {
                return t = t.toUpperCase(),
                b(this.gata(t), e) >= 0
            },
            gltbt: function(t, e, n, i, r, o) {
                for (var a, s = [], l = this.gata(i, o), c = l.length, u = 0, h = 0, d = t * c; d > u; u++) a = {
                    time: l[u % c],
                    price: 0,
                    percent: 0,
                    avg_price: 0,
                    volume: -.01,
                    inventory: 0
                },
                u % c == 0 && r && (a.date = r[h], h++),
                s.push(a),
                n || (s[u].price = s[u].avg_price = e);
                return s[0].price = s[0].avg_price = s[0].prevclose = e,
                s[0].volume = s[0].totalVolume = s[0].totalAmount = 0,
                s[0].inventory = 0,
                s
            },
            azft: function(t, e) {
                if (!t) return t;
                for (var n = this.gata(e), i = 0, r = t.length; r > i; i++) t[i].time = n[i];
                return t[0].date.setHours(0),
                t
            }
        },
        this.kUtil = {
            mw: function(t, e, n, i, r) {
                "number" != typeof i && (i = 0);
                var o = t.length,
                a = t[0];
                i > 1 && (a.volume /= i);
                var s, l = [],
                c = [];
                if (1 == o) l[0] = {
                    open: e.open,
                    high: e.high,
                    low: e.low,
                    close: e.price,
                    volume: e.totalVolume,
                    date: T.dd(e.date)
                },
                c[0] = {
                    open: e.open,
                    high: e.high,
                    low: e.low,
                    close: e.price,
                    volume: e.totalVolume,
                    date: T.dd(e.date)
                };
                else for (var u, h = a.open,
                d = a.high,
                f = a.low,
                p = a.close,
                g = a.volume,
                v = a.date,
                m = a.open,
                y = a.high,
                b = a.low,
                x = a.close,
                w = a.volume,
                N = a.date,
                A = 1; o > A; A++) a = t[A],
                i > 1 && (a.volume /= i),
                T.gw(t[A - 1].date, a.date) ? (a.high > d && (d = a.high), a.low < f && (f = a.low), p = a.close, g += a.volume, v = a.date) : (isNaN(r) || (s = v.getDay(), 0 == s && (s = 7), u = s - r, u > 0 && (v = T.ddt(v), v.setDate(v.getDate() - u))), l.push({
                    open: h,
                    high: d,
                    low: f,
                    close: p,
                    volume: g,
                    date: v
                }), h = a.open, d = a.high, f = a.low, p = a.close, g = a.volume, v = a.date),
                T.gm(t[A - 1].date, a.date) ? (a.high > y && (y = a.high), a.low < b && (b = a.low), x = a.close, w += a.volume, N = a.date) : (isNaN(r) || (s = N.getDay(), 0 == s && (s = 7), u = s - r, u > 0 && (N = T.ddt(N), N.setDate(N.getDate() - u))), c.push({
                    open: m,
                    high: y,
                    low: b,
                    close: x,
                    volume: w,
                    date: N
                }), m = a.open, y = a.high, b = a.low, x = a.close, w = a.volume, N = a.date),
                A == o - 1 && (l.push({
                    open: h,
                    high: d,
                    low: f,
                    close: p,
                    volume: g,
                    date: v
                }), c.push({
                    open: m,
                    high: y,
                    low: b,
                    close: x,
                    volume: w,
                    date: N
                }));
                return l[0].prevclose = n,
                c[0].prevclose = n,
                [l, c]
            },
            nc: function(t, e, n, i) {
                if (t && !(t.length < 1)) {
                    i = i || {};
                    var r = t[t.length - 1];
                    if (168 == n && T.gw(r.date, e.date) || 720 == n && T.gm(r.date, e.date)) return r.day = String(e.today).split("-").join("/"),
                    void(r.date = T.dd(e.date));
                    r = t[t.length - 1];
                    var o = r.close,
                    a = e.price - o,
                    s = a / o;
                    t.push({
                        open: isNaN(i.price) ? o: i.price,
                        high: isNaN(i.price) ? e.high: i.price,
                        low: isNaN(i.price) ? e.low: i.price,
                        close: isNaN(i.price) ? e.price: i.price,
                        volume: isNaN(i.volume) ? e.totalVolume: i.volume,
                        percent: s,
                        day: String(e.today).split("-").join("/"),
                        date: T.ddt(e.date),
                        time: e.time,
                        ampP: 0,
                        amplitude: 0,
                        change: a,
                        kke_cs: 0
                    })
                }
            },
            pd: function(t, e) {
                var n = t.length,
                i = t[0],
                r = i.prevclose; (isNaN(r) || 0 >= r) && (r = i.open);
                for (var o = 0; n > o; o++) {
                    if (i = t[o], e && e.usePc && (r = i.prevclose), i.amplitude = i.high - i.low, i.ampP = i.amplitude / r, i.change = i.close - r, i.percent = i.change / r, r = i.close, i.day) {
                        var a = i.day.split(" ");
                        i.day = a[0],
                        i.time = a[1].slice(0, 5),
                        i.date = T.sd(i.day, i.time),
                        i.day = i.day.split("-").join("/")
                    } else {
                        var s = i.date,
                        l = D.zp(s.getMonth() + 1),
                        c = D.zp(s.getDate());
                        i.day = [s.getFullYear(), l, c].join("/")
                    }
                    i.kke_cs = i.close > i.open ? 1 : i.open > i.close ? -1 : 0
                }
            },
            ms: function(t, e, n, i, r) {
                return n > t && (t += 24),
                Math.max(1, Math.ceil((60 * (t - n) + e - i) / r))
            },
            spk: function(t, e, n, i, r) {
                if (t == e) return ! 0;
                var o = t.split(":"),
                a = Number(o[0]),
                s = Number(o[1]);
                o = e.split(":");
                var l = Number(o[0]),
                c = Number(o[1]);
                if (a > l && 3 > a - l || a == l && s >= c) return ! 0;
                if (60 != i || r && /^forex/.test(r)) {
                    o = n.split(":");
                    var u = Number(o[0]),
                    h = Number(o[1]),
                    d = this.ms(a, s, u, h, i),
                    f = this.ms(l, c, u, h, i);
                    return d == f
                }
                return "10:30" != t && "11:30" != t && "14:00" != t && "15:00" != t || c == s ? !0 : !1
            },
            yd: function(t) {
                for (var e = t[t.length - 1].date.getFullYear(), n = [], i = t.length; i--&&t[i].date.getFullYear() == e;) n[n.length] = t[i];
                return n.reverse(),
                n[0].prevclose = t[i] ? t[i].prevclose || t[i].close: n[0].prevclose || n[0].close,
                n
            },
            rd: function(t, e) {
                var n = [],
                i = T.dd(e);
                i.setFullYear(i.getFullYear() - 5);
                for (var r = t.length; r--&&!(t[r].date < i);) n[n.length] = t[r];
                return n.reverse(),
                n[0].prevclose = t[r] ? t[r].close: n[0].close,
                n
            },
            adbd: function(t, e, n, i) {
                for (var r, o, a, s, l = n ? T.stbdt: T.stbd, c = t.length, u = e.length; u--;) {
                    if (a = e[u].date, 1 > c) {
                        u = e.length - t.length;
                        for (var h = [], d = t[0]; u-->0;) {
                            if (o = w(d) || {},
                            o.isFake = !0, o.kke_cs = 0, i) for (r in o) o.hasOwnProperty(r) && g(o[r]) && (o[r] = 0);
                            h.push(o)
                        }
                        t = h.concat(t);
                        break
                    }
                    for (var f = c--; f--&&(s = t[f].date, !l(a, s));) {
                        if (a > s) {
                            if (o = w(t[f]), o.isFake = !0, o.date = a, o.kke_cs = 0, i) for (r in o) o.hasOwnProperty(r) && g(o[r]) && (o[r] = 0);
                            t.splice(++f, 0, o),
                            c++;
                            break
                        }
                        t.splice(f, 1),
                        c--
                    }
                }
                return c > 0 && t.splice(0, c),
                t
            },
            ayd: function(t, e, n, i, r) {
                for (var o, a, s, l, c = T.stbd,
                u = t.length,
                h = e.length; h--;) if (s = e[h], !(s > r)) {
                    if (i > s && !T.stbd(s, i)) break;
                    for (var d = u--; d--&&(l = t[d].date, !c(s, l));) {
                        if (s > l) {
                            a = w(t[d]);
                            var f = a.close;
                            for (o in a) a.hasOwnProperty(o) && g(a[o]) && (a[o] = 0);
                            a.open = a.high = a.low = a.close = f,
                            a.date = s,
                            t.splice(++d, 0, a),
                            u++;
                            break
                        }
                        t.splice(d, 1),
                        u--
                    }
                }
                return u > 0 && t.splice(0, u),
                t
            }
        },
        this.domGc = new
        function() {
            var t = c.$C("div");
            return t.style.display = "none",
            function(e, n) {
                if (e) {
                    if (e.hasChildNodes()) for (; e.childNodes.length > 0;) e.removeChild(e.firstChild);
                    if (n) return void(e.innerHTML = "");
                    t.appendChild(e),
                    t.innerHTML = ""
                }
            }
        },
        this.getSUrl = function(t, e) {
            if (!t) return null;
            for (var n, i, r = [{
                h: "finance.sina.com.cn",
                s: "ssl-finance.sina.com.cn"
            },
            {
                h: "money.finance.sina.com.cn",
                s: "ex.sina.com.cn"
            },
            {
                h: "vip.stock.finance.sina.com.cn",
                s: "ex.sina.com.cn"
            },
            {
                h: "stock.finance.sina.com.cn",
                s: "stock.sina.com.cn"
            },
            {
                h: "stock2.finance.sina.com.cn",
                s: "stock.sina.com.cn"
            },
            {
                h: "www.sinaimg.cn",
                s: "wwws.sinaimg.cn"
            },
            {
                h: "n.sinaimg.cn",
                s: "ns.sinaimg.cn"
            },
            {
                h: "i0.sinaimg.cn",
                s: "i0s.sinaimg.cn"
            },
            {
                h: "i1.sinaimg.cn",
                s: "i1s.sinaimg.cn"
            },
            {
                h: "i2.sinaimg.cn",
                s: "i2s.sinaimg.cn"
            },
            {
                h: "i3.sinaimg.cn",
                s: "i3s.sinaimg.cn"
            },
            {
                h: "data.finance.sina.com.cn",
                s: "ssl-data.sina.com.cn"
            },
            {
                h: "biz.finance.sina.com.cn",
                s: "biz.sina.com.cn"
            },
            {
                h: "i.sso.sina.com.cn",
                s: "sso-ssl.sina.com.cn"
            },
            {
                h: "touzi.sina.com.cn",
                s: "touzi.sina.com.cn"
            }], o = t.match(/(\w*:\/\/)?([^\/]+)(\/+.*)?/i), a = o[2], s = o[3], l = r.length; l--;) if (r[l].h == a) {
                i = r[l].s;
                break
            }
            return n = i ? ["https://", i, s].join("") : e ? t: ["https://", a, s].join("")
        },
        this.TipM = s,
        this.logoM = new
        function() {
            var t = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAAAoCAYAAAB5LPGYAAAZEUlEQVR4nO18eZhcVZn3G+ha++77dtZ7qzohHXpJ6AXC5vopyqgsMiMQP0QlBkQHEfQBJMoyjBANGmUgQGDQQQdEEoKiSBDEQTDgJEDAEfiAkJ2QNAlZO+f7o251bleqOyGDRGb69zzv01X33POec+5577ueaoB3AHM/cfJRO6afe8/9nzr9C+/EeGMYwxBmaObHXz6kc/1A+xRxvU+uybbNNL3pv4snLDpRUk86UPMbw/8stH5Q1o8EgHEAAB9U1e71XX2bV3b2io3d/eJkzTo2va+wqK399k3d/WJwylRxmm5/+MBNeQz/UzDuofGHLnj+0MkbACAHAActbe96fG1Xn1jV2SuWtU9+Nr0v99iEjp8NdPeL17r6xMLKxHvqDAIA60tucOZszK9kAO4BWcUY3l1QAXQAgOmWe/zOKVPFHyZ0PAUAcFVIvzbQ3S+Wd/SIVZ29YsnE7j9OLcjVn8Xjf7whvb6xs2/wA6o6GQDgQhed8cqhh728uftwsXPKVNFdKCQHcl1jeBfgIi86/654wp0AAL+uTvr1+q4+8cKkwzY+2Dbp7hUdPbte7egRy1N6taNHrOzo2fZaV594Jf2+urN359c9NOMWWpm3qftwsbKzV7zR3S9+QOKLDvTaxvA3jgDAWt/V9+btvG3hcZLevqazZ/urqWCt7eoT9c+NtLyBXu/qF+u7+sTyjh6xrqtP/LLafhekPuQYxjAiLg2iszd194tXOw7bvLKzZ92KVKBWdfaK17v6xRvd/WJNZ69Y2dH7xsqO3oFVHT2DA939YkN3v1jV2buHIC7v6BED3YeLU3T7yAO9tjH87WPcIxM6/pDVdKvTSPe59u5n5tJk1hmGc8KUvNTeXiqh9lIJdeSlidMs6/hrEb/mz5OmvLAx9QOztKGrX8xG7JsHenFj+BvHiZp1zIbOvl11wdnY3S+WTZq85NOGfRIAFPbW3wBQZkf0GwPd/TuzZnn17mg5/9dfxRjetZifHPKjut+2obtf3M7bbrIBpHq7UlaOC1z/LhJFS5EfPKyr6lnN+HzLx5+t86kHKmu7+rb0FIvsnVvNGN5tkJZN6l6+qrNXvNbVJ+Ynh9yRbXQsa2ZCmYgJHaIK48I2zaaR7e/aJj20trNvSADXd/Xt7JWkQ96ZpYzhXYfJeXn8ms7ewZW1AGOgq1gk9TZZlj9SoVzEhIqEMsEx2cYQ3hUTKijCKyGjJeuYjegVdX9wRUePWN3Zs6H9byMJ3XKAxzYO0NitAFDch/ty0GQ//+r4iKZ1DKQR7qPjO36XbQtcb0FCmfBs93uGqn4F+8ENDOE3OSYiJnQAALxGfj9h4+fVzfD6rn5xX3Xive/YYpqjNfS8O0PPu3M/+7dA7QXKCnCrZRjnSUXpPfvQ3ydRtBQH4e8B4KC3MG4RakKrjUAG7MU/l8vlj8aU/j9VVU/e22CB694eY7I8n89PSi+Ng1pRQh9lDlrabpx00kkHv4W17QYF8FZ09A6s6+oTj43vfCzbFvrBcxThp+vfSRg9kQqfoGH0J2jQKlUoha90HLZ2Rar93uzu33W8rB+xXxN7GxF5wX9UKBMA4Ddp1gqFwofK5fLxpqadrinaF3VVvSJwnHmB5z/MIvQyJ3QDAKB6B0NVP1PlsYgJ3dhaLL53b+OTEL0YE7oLAIJ9nrPr/yzGZIBjsiVLDJMtFOFVDJNVuVyuczQevuP+qMK4KBQKbaPdZ+vm5W08FrZpzoFUW6qSdGJC2dYYk62Nc+CYbGEIb6ZRtJohvEqTlCdnzZpV2te17YFfVibesaG7X6zt7N32cdnozyzgX2NCB8q53BRVVj8TE7qdYyIqlAtV3ePES2FRddIvXuvqEys6esSm7sPFTB99eb8ntZ+wTfOi0PNuCRzn5tDzbglc9yYSRf+VUCZQEMwPXPem0PNuCb3gZgDQVVk+s8pjUaFMVBgXCaE7aYQ2sQi9TEK02LPdhb5tfwdqb3sdRd+2b6gwLjgmm8vl8ocAAAxVPTNw/esj17+tTqHnzWMIr6tQJkgYLgo975bI9W8LPG9e4Hg/8G33CtgzSxAlhG4Lff9hTVEuURTlYkVRLtYU5RJD02ZyTLZShJYDwGibXmYRWouD4MnRnpep6zOqPBa2YX43e71YLB6rKcolzUiV5QsNTfsmx2RjhXFRyOev2ucNaoaeglxd39W3bkN3v3imffKzvQWlkjYFNELPVXlc25xaMDKgKdoXs/2PlaSJD7cd+sDG9EDC6539A5f6+HP/rUntH2QcRvdThBczTJYRhJ6iCD1FIvQ4DsJHSIT+yAlZRsLoCRJGiwAgF3rewpjQrcVi8egCFBKomVsJ9u4ztkS+f2+1pjkuA4AWhvCqmFDhO94vs+TZzp2ubf8kcN170mu/QH7weIVxEXn+ImioFGmKclqVx6K1tbWZdg0Swna6ln3DaJMrlUr9FcaFpVvnj3SPrih/X+WxsHXz2r2stRFS6Pl3JIQOOob1jbfYtzk+oRh9z0+a8uz2KUeINZ09G64O6ZdDABMAynlFObVomhcdLMtnAICVdjn4OFWdfD2pXPt6V+/2bZOPEBs6+3Y90NZ+x4db9UmjDPXXxDgAKESuf1vk+3MbGw3DODnGbKkkSUell0xO6JbQ9X+9n+MZra2tHwCobXiVceFa9h7jNoMma2dUeSxUVd3jRQ0d706OySaovQhG6HqLDE07DwBAU5RzU+H8P6qqfiZy/bm+6w6jwHG+j4PgdzGhAgXhr0LH/ZfQda+DTDBYLpc/UuWxCNzdz8nUtE+XcqWe0eYtSdKJMSbrYkI3SpJ04j49pbeAlu9F9KsvTJr8kjhsqnitq3f7g23tD9xI4su/6gZfPN8OZlwZoG/eWz3krufaJ788OGWq2DHlCLFsYveLN+LkO8dJevvbPaH9wEHIDx6uMC6kYrF+XhE0WT6+ymMR+eGiIgADAJBl+eNVHgtT18/eV97lcnlyswZT1y9LBeOD+8IodP1fx4TuKgDEDU0yx2Rj4HrzAQAkSTqhLU6E0qr8PQBA5PmLOMJvAICH/OBXHOFXWISGiEToLwzhN2NCBcNkC4nQ8zxCy0ktCCoB1IQvJnTQse3v1wf1HOeq8XEiHMtqWrkqFAptgev/uMK4CFzv36C5P71PaMnlcp26opyqKcpFlmF82zbNf9JV9cK8LH8MAAIdQP2U4XxgDmLfXFCZsPDpid3PvHJozysvd/Qsf+nQw164v9r+2M+T8bdd5IXT3ydJE6AW3bVAPt8uScopuqp/3XWcWYHr3hQ4zjzHsq7RZO3T0DwdI5dKpamaLE8zNO1iz3W/59nOPM925vmuO9fWzSs0RTm9AIXGjRoRcln+KIvIE3UTpivKKQllm13bHmZqAte9KSFsVxGA7wPbXOD7P0oo22Xq5tca2sbhIHo8IVRgP1gWuv6To5P3h5jQ7cgPH4MG89va2vq+Ko+Fpmn/FwDAs6xbY0K3QRr5xoRuCz2vnlnIQ81VqBMUAQgNo+cSyoRvu3MzbeMAoMVSjc9VKN/mOs6/pjzNwHHmtPFYjGBOI8+yvh0TOlh3wwLXu7EIQPfhmQ1DydC0c2kY/SfHZFdCmWhGMWXbLNe9fRQ+2Qem51T1LM/zFtLU/xniRehuokxUKBMc4eWlUqk3y8y17e9V04Xt0S/LD5M3LMP4BjQ/WVMOXPee0PcXB56/GAXhEhyhp33HeSj0/cUVxkWFMhG63qOh6z0Wef7jxWLxKBxG/0WC8FmouRr6CGRCbQMPMjTtH5M0WPFtdzYAyAAAhUKhkhC6LfL8pbqq/7OhalePRqHrPVBhXBiatseGu6Y5O42YEQDkOMJroyD4DUBNG1Z5LHRV/fwIe2OQMHqyvg+yLP9dtjGfzx/SlgZcLMKrSRitYQhvrDAuLMP4UvbeUqnU79v2DQll2xPKhGNZsyRJOiZ0vflVxgUnZEvq++49v1koFGIcRX/IVjQaPyeUiRjXPnuWcysAgGVY/0wR/ovr+r+yLPsnjuPcrap63ak9CEfoj5WUD8dE1FM0dapfq1OlllPMCneZIbKmUh+/1mdndn6N/UulUrO0jmXq+lWGps0yNG2WpmpX66p6lWkYN1qGcYOqqJdpivYtQ9WuNjRtlq7rV8qy/NH6WAzjrRyTbTSMBnAYrqMIb+GYbEuv/bkuaAAAqqROTygTVR4LRVGOAwDQdX166s99Zq+bAQCObX+/wrgolUp9DU0HE4ReIEH4RF0IqjwWuqKcDQDgWc6tCWWiidkGALBohP7EMFnJIvTnuGamrYZ7DEPTzlNl+UxT06ZxTP5SoUxosvxpAIBcLtdlatpFOIierjIuYkI3u6Y5u1AoVLJMdEU5lWGyssq4IAi/WMjlps+ZM2fEJLZKEXqqvpkxoQIHwWJDVT9XbGk5stTScrgqqSe7pjmbRujlKo+FXC5/FAAAheGjQ0JKqKjyWKiSdDJA7W3imOzMCkhMqCBhtMx3vDt8x/0ZjdC6bHtCqAgcZ8jhL5VK/SQMH7VN80pVkk4stbT05/P5iblcrkdRlFNxED2eFcKEMmFq2rR92WQA0GgYPaeq6vRmjYamXVKhXNi6eZmuqmfpqnpW6AULKowL17av1VX1LF3XZzRqEQAAXVWnK4pySv176Hn3xoQOlnO5w6Bm1tQMNSZufYbwKhJGr0BDIjmfz0+qMi4szbgEAMDW9SsqjIvURcixCK0hYfinJsuJWIT+k0V4tSRJx3CE1wae/8vRHo5r2XMrlA/U11fO5SbXsx04jB5L6/3OKCyCyK/5hJairr311lub1/t1RZ9RqZXRhjbRGPlNNVzbvjId2GCYvJ4VIIbwKqg9VDA07ctJhm9M6HZVkk6AWkkHAAAkSTp5mAARKhzbnpMZb9TkpSbLH8uOkRAqSqXS1Ca3FgAghFqiNwAAz9TNC6osFnpNUPz0egipViBB+CRDeB1kTHrguvNjQt+EWvlqX2FRhNfXnX6K8BYaoQ0kCNfQCG2iCG9hCG+tE0d4R5XHwnec6xsZ6ap6foVxkcvlugAAaBg9R6NoCQBAqVQ6vMpiYRnWzGyffD4/kSL8Isd4PQC0tRaL762Zab3piwcANgmjBzkhr5dywzRwTpblaQWAt/TTCVPTTgeAkYNPWzdvyW5iKkiboyB4xLOsH+iKfnaxWDwKGuqAxWLxmKRBcP3UNAMAREH4m6xWTR3qYZBK0gmNPORaoJOFI5WkE1zTvtKznTtQED1EEX4mn88fYhnGpdn+JEQvAkB5jzWa5reqPB5MKBtMKBusULYtxmRHqrl3JpTtTCgbrPJ40DbNrwNAWGF82HoAwEko2xp5/i/28sz1tLJwMACALMsfq0WG/l26os/QFX0GDtHi1G+6xlT0s01FO6dOqqp+zpS1aY1mDQAAB8HvKUKvAsBBuVyuq1rzE89L9/HKKouHmW2lXP5wQtkAR/iVegnNc5x5afVjD/65XK6LRNHSGJO/5PP5iekavHw+3w61CgjxbPennuPcHbju/MB153u28++uZf+b7zg/r18LXHd+6HkLNbkWKI0KSzMuTTP2otFcJmR38EERfl6r5fkAAMBQja80Co9SLh+XNkcM4U1xps0yjJmNY7um+d0kowFTjVN3Wl3Xtq+NEV5bn0OFMlGhXHCENwGAhoPwyayQp1HdHtAk6VhDVU/SZO3juqKcahvGuTGhIvS832iy/DFNkj6hKdpp6dtqWYYxs8pi0VrcnejNOPgjaQ4AAPBtd26F8UG1tfV9AACubc2tMi5KudxQ/szQtC+nvts/NGGhe5b1bd9xb4Phye6oQplwrZpm9B3n+gphO6CmtQ/GEXqeRXgdpPVkWzcvqDAucBAuBoD6AZIiQ3gVCqMl0BCsSZL0yYSyXak1XEHD6DkW4YEK4zs4oS8BQKsqSZ9Efrg08vyUvCU0QpsrlAkShC/tvu4vRX64VC6X93BPmsFEfnhvknH0mwUIdcc/V/NjasXpzH0U4eWQaklNUU5vML+7GqNbAGjBQTTkeyaEisD17wKoRY0c4T/XeaRz2oaD4PeB694ot7ZOy+fz47M+ZrOoLgtNlqfZunkhAECxWDyqymKhStKJpVKpX5blrN8ocUxeIxF6GlItBgDg2UOaozrSGMVi8cgK4wIF4X9ATRMXaISWpyeDhtyJXC7XVaFM4CAYOtxRKBTaPNv5foXxHTGhOwPHG6q7AgCoNXdls1QsvgcA9JjQLa7lXJc2I47pElPXLwAAD3nB/CqPReh5t0PGcpVKpcPTo3KXN85dluUzaBQtCVzvbsewrtNV9XJT085RFOWUuslvBhwEv48J3QoA9kj37BMkSTrWNs3LAtdbQCL0FCdkS6MgJpQJpbX1tNrA0VPDzK/j/LDOK/S8n2Y1UxopDqtn5nK5Lo7J4DABaq0JAgqjB5OG/uVcuTvb39C084YEFBNBI7QOaimRPSDL8kdqfpX7YwAY51jW9TGh2wuFQoUi9GqFcpHP5ycAADiGdWkbT4Sqqp/MsChxTFajMFoKI/+AqoCjaElC2fa6uatXPxzbvrnx5tD1HkgoE7ZuXujZzs0JYbtiTNalwkGb8FchTe76jvMvFcZF4DhXF2sCCQBQ1hXl1BiTtRXGhanrX21kYJvmZWl03SxTsD/H0VhM6GDoBfe/5Z5JktiaoswCADzCLV7k+/c1BgnpRlkck81Z4ZGK0jFpP41hsjprfh1zd0a9Dts0v97ge24GAKucy3U1mvZm6QsURL/Nas/Q9e5utohcLtedULYNB9F9UHvIeYrISuT7DwEAWIbxjTaeCNs05xShSBPKtkd+8FvIHI0qlUpHpDXRPTRHHZZhXFzlsXCs3UGAZRgzqzwWUi34GoZSqdSTELYjdW9eVWtlq70GN6amnVaLRMPfJJQJTuhqqOUEyxzjFQzhF+Xmgdg4FEZLOCarYS/BXYo8ALip66A0u8GQ1c9WeSwMTTt3H/gNx5QpU96PPF9whNe6tn1tWiJKoBbhknK5/CEShs9mBSH0vJ8CALQWWt+fNY80jIZ+15E6vsMEqFn5KQqCR7JaLvLDB9NFndlgvkXouve0FlrfX8qVelVZ/SwOgvs5JrvqwscRfjlNcQxDuVyeHBO6Hgfhk/WHWM7lJqfO+z8C1Mw9DsJHTE2blqaV3mw8nmSb5uWpg9/06Fg+n59UoXx7araHzCYJwic4JhthdzpFlyTpBN+2vwsA41RZrq0V4bWaopwGezkPaOrm2W08FpHr/xwACo7lXJf6eY8AQCkNLJpagSIAqzAufGdYYAUA0CIVi0erkjrds6xrPNtdQMLoSRahNQlhOxjGK2CE3+yEXnB3gtkOyBxF22ccPfXIH0SuNyQkCaGCE7KFY/Iax2RzVsASygTyg/sgPXKUDUDSaG6oPug5zg+zWpNhshL2fIM4x3RrVkh1VT0fAKC1tfWDFTo8KMomnof9xWRn4HnzoOaI7wHLMD7LEHoYMv6JbZqzK4yLfD6f/RlAOfS8n6TJ41Ma2IzDYbQ0TTE1OzmcI2H4aFpbPiZznXFMduEoWlrLIXoLY0IHqoyLwPHm1W/SZO2MBNNNVcYFCdEztmleVKzVqIeSxPl8fkLdrwsc52bYLdBlHEaPpadmfgG73QMZambcAwC9WCyywHVr6yuXG/8vj8oQXpdQto2G0UtREDziO85tpq7/k67qnzd18wJVkk6QGkhXlE9RhDYxhNepqnpSY3uaDx75pPt7jj727sjzd1c5MhWKbOmNhNGy9HjVkI/g2fa8IfNX83nqmynFmAxFrVUei9Dx/r1xbMswvlLl8dAYqUDUc0UtvuNeFxM6OFI5kCD8gmfbc8rl8pQRF5h5wCSM7sVh9AgNoz9VGK875/XN0pEfPDRSbiyfz09INcctTXgf5FjWNU3ydrnQ8+7Mzhn5wUOaopxTgD3TH/l8fkLguD/imAy28UQwTF5MtXCLY1nXpJWgrbredH6TOMZPm6b5NUgFU9O0L6UHYgcTyrZWGBdVHtddoUYt25KOZUMT/5Zj/HQbj0WVNdLQ8bvBKuPD23gsqjzeMUJFpoYgCMq5XK5PU7QvOoZ1Xej5d4autyDy/bt8251r6voFxWLxaGjy1qNgdwUkTOuQKRxT1y8z1RrZun5FKZdrjH5BlaSTbF2/wlT1y0xdvzzNZQ07sp3L5bpNXT/bMozvmJrxXUPTLtZkeVqpVOqBt5YIdiM/XBh5/qLQCxaYmnYODK8wSDiKfqvretP/ZWho2hkJ4xvlcvn4Js1K6AULSBQtheFR4MHID+7DQbjY0Iwvwb4dZoBCoVA1Ne2cTLJ3nGNYMyM/vKNQGPWwxTCfTimXP4SC4HbPtueZuv5DQzMulmq53LeKvJTPt+fz+UkjUHt+hPZmeca3CypFeMVQVKwop/61BnoHMdq/BqlHn6P5Z82c+ta99BnD/qBQKLTVqwjpsW95r53GMIa3C8Vi8b11v8a17SsO9HzG8L8MuqKcmkbAm4pQpAd6PmP4XwYrrWN6tjNn73ePYQxvM/It+Us8y34T9if5OIYx/Hcx4/Off/85X/jCJw70PMbw7sT/BxKFMrtCLlbqAAAAAElFTkSuQmCC",
            e = c.$C("img"),
            n = !1,
            i = [],
            r = [],
            o = function() {
                //页面，下面脚本入口，进来的第一个函数
                // c.xh5_EvtUtil.addHandler(e, "load",
                // function() {
                //     for (n = !0; i.length;) {
                //         var t = i.shift();
                //         s(t)
                //     }
                // }),
                // e.src = t
            },
            a = function(t) {
                if (t.logo && !c.xh5_BrowserUtil.noH5) {
                    var e = t.logo;
                    t.color || (t.color = "#ccc");
                    var n = c.hex2dec(t.color, 0 / 0, !0); (!n || n.length < 3) && (n = [200, 200, 200]);
                    for (var i = e.getContext("2d"), r = i.getImageData(0, 0, e.width, e.height), o = n[0], a = n[1], s = n[2], l = 0, u = r.data.length; u > l; l += 4) 0 != r.data[l + 3] && (r.data[l] = o, r.data[l + 1] = a, r.data[l + 2] = s);
                    i.putImageData(r, 0, 0)
                }
            },
            s = function(t) {
                if (c.xh5_BrowserUtil.noH5) return null;
                if (!n) {
                    for (var o = i.length; o--;) if (i[o].id == t.id) return null;
                    return i.push(t),
                    null
                }
                var s;
                s = c.$C("canvas", t.id),
                s.style.zIndex = 0,
                r.push(s),
                s.style.position = "absolute",
                s.style.top = t.top + "px",
                s.style.right = t.right + "px",
                s.width = e.width,
                s.height = e.height,
                s.style.width = t.LOGO_W + "px",
                s.style.height = t.LOGO_H + "px";
                var l = s.getContext("2d");
                if (t.isShare) {
                    var u = c.xh5_BrowserUtil.hdpr;
                    if (2 > u) {
                        var h = u / 2;
                        l.scale(h, h)
                    }
                }
                return l.drawImage(e, 0, 0),
                a({
                    logo: s,
                    color: t.color
                }),
                f(t.cb) && t.cb(s),
                s
            };
            this.getLogo = s,
            this.styleLogo = a,
            o()
        },
        this.grabM = new
        function() {
            var t = function(t) {
                var e = t.dom,
                n = t.child;
                if (!e || !n) return null;
                d(e) && (e = c.$DOM(e));
                var i = e.getElementsByTagName(n);
                if (!i || i.length < 1) return null;
                var r = c.xh5_BrowserUtil.hdpr,
                o = e.offsetWidth,
                a = e.offsetHeight,
                s = c.$C("canvas"),
                l = s.getContext("2d");
                s.style.width = o + "px",
                s.style.height = a + "px",
                s.width = o * r,
                s.height = a * r,
                1 != r && l.scale(r, r);
                var u = c.xh5_HtmlPosUtil.pageX(e),
                h = c.xh5_HtmlPosUtil.pageY(e),
                f = c.xh5_HtmlPosUtil.parentY(e);
                l.textBaseline = "top";
                for (var p, g, v = 0,
                m = i.length; m > v; v++) {
                    p = i[v],
                    g = c.getCSS(p);
                    var y = c.xh5_HtmlPosUtil.pageX(p) - u,
                    b = c.xh5_HtmlPosUtil.pageY(p) - h,
                    x = Number(g.paddingLeft.split("px")[0]),
                    w = .5 * (Number(g.lineHeight.split("px")[0]) - Number(g.fontSize.split("px")[0]));
                    l.fillStyle = g.backgroundColor,
                    l.fillRect(y, b, p.offsetWidth, p.offsetHeight),
                    l.font = [g.fontSize, g.fontFamily].join(" "),
                    l.fillStyle = g.color,
                    l.fillText(p.innerHTML, y + x, b + w)
                }
                return {
                    canvas: s,
                    x: u,
                    y: f
                }
            },
            e = function(t, e) {
                if (c.POST) {
                    var n = e.txt || "",
                    i = e.url || "",
                    r = "_" + Math.floor(1e3 * Math.random());
                    window.open("about:blank", r);
                    var o = c.getSUrl("http://stock.finance.sina.com.cn/misc/userapi/Pic4Weibo.php");
                    c.POST(o, {
                        imgData: t,
                        symbol: "imgData"
                    },
                    function(t) {
                        t && t.match(/^http.+/) && (t = encodeURIComponent(t), t = "http://service.weibo.com/share/share.php?source=bookmark&title=" + encodeURIComponent(n) + "&url=" + encodeURIComponent(i) + "&pic=" + t, window.open(t, r))
                    })
                }
            },
            n = function(n) {
                if (!c.xh5_BrowserUtil.noH5) {
                    var i = n.ctn;
                    if (i) {
                        for (var r, o, a = i.getElementsByTagName("canvas"), s = n.w || i.offsetWidth, l = n.h || i.offsetHeight, u = c.xh5_BrowserUtil.hdpr, h = [], d = c.xh5_HtmlPosUtil.pageX(i), f = c.xh5_HtmlPosUtil.pageY(i), g = a.length; g--;) {
                            o = a[g],
                            r = o.style.zIndex;
                            var v, m = !1;
                            for (v = n.ignoreZIdxArr.length; v--;) if (r == n.ignoreZIdxArr[v]) {
                                m = !0;
                                break
                            }
                            if (!m) {
                                for (v = n.ignoreIdArr.length; v--;) if (o.id == n.ignoreIdArr[v]) {
                                    m = !0;
                                    break
                                }
                                if (!m) {
                                    var y = {
                                        canvas: o,
                                        x: c.xh5_HtmlPosUtil.pageX(o) - d,
                                        y: c.xh5_HtmlPosUtil.pageY(o) - f
                                    };
                                    h.push(y)
                                }
                            }
                        }
                        if (!n.nologo) {
                            var b = c.logoM.getLogo({
                                cb: null,
                                id: "share_logo",
                                isShare: !0,
                                top: n.top,
                                right: n.right,
                                LOGO_W: n.LOGO_W,
                                LOGO_H: n.LOGO_H,
                                color: n.color
                            });
                            b && h.push({
                                canvas: b,
                                x: s - Number(b.style.right.split("px")[0]) - n.LOGO_W,
                                y: Number(b.style.top.split("px")[0])
                            })
                        }
                        if (n.extra) { ! p(n.extra) && (n.extra = [n.extra]);
                            for (var x = 0,
                            w = n.extra.length; w > x; x++) {
                                var N = t(n.extra[x]);
                                N && (h = h.concat(N))
                            }
                        }
                        var A = c.$C("canvas"),
                        C = A.getContext("2d");
                        A.style.width = s + "px",
                        A.style.height = l + "px",
                        A.width = s * u,
                        A.height = l * u,
                        C.fillStyle = n.bgColor,
                        C.fillRect(0, 0, s, l);
                        for (var S = 0,
                        k = h.length; k > S; S++) {
                            var T = h[S];
                            C.drawImage(T.canvas, T.x * u, T.y * u)
                        }
                        e(A.toDataURL("image/png").substring(22), n)
                    }
                }
            };
            this.shareTo = n
        },
        this.bridge = new
        function() {
            function t(t, e) {
                for (var n in t) t.hasOwnProperty(n) && (t[n] = e + t[n])
            }
            var e, n, i = !1,
            r = "sinatkchart_SLBridge~",
            o = {
                SAVE: "save",
                LOAD: "load",
                REMOVE: "remove",
                DATA: "data",
                READY: "ready"
            };
            t(o, r);
            var a = [],
            s = {},
            l = [],
            u = function(t) {
                var e = t,
                n = e.key,
                i = e.options,
                r = e.value;
                A.save(n, r, i)
            },
            h = function(t) {
                return i ? void 0 : n ? void n.postMessage(JSON.stringify({
                    type: o.SAVE,
                    content: t
                }), "*") : void l.push([t])
            },
            d = function(t) {
                var e = t,
                n = e.key,
                i = e.options;
                return A.load(n, i)
            },
            f = function(t, e) {
                if (!i) {
                    if (!n) return void a.push([t, e]);
                    s[t.uid] = e;
                    var l = t.type ? r + t.type: o.LOAD;
                    n.postMessage(JSON.stringify({
                        type: l,
                        content: t
                    }), "*")
                }
            },
            p = function(t, e, n) {
                var i = d(t);
                e(i),
                n || f(t, e)
            },
            g = function(t, e) {
                t && (u(t), e || h(t))
            },
            v = new
            function() {
                var t = function(t) {
                    if (t && t.type) {
                        var e = t.type;
                        if ( - 1 != e.indexOf(r)) return e
                    }
                    return void 0
                },
                i = function() {
                    for (var t; a.length;) t = a.shift(),
                    p(t[0], t[1]);
                    for (; l.length;) t = l.shift(),
                    g(t[0])
                };
                this.onMsg = function(r) {
                    var a;
                    try {
                        a = JSON.parse(r.data)
                    } catch(l) {}
                    var u = t(a);
                    if (u) switch (u) {
                    case o.READY:
                        n = e.contentWindow,
                        i();
                        break;
                    case o.DATA:
                        if (!c.isFunc(s[a.uid])) return;
                        s[a.uid](a.result),
                        s[a.uid] = null,
                        delete s[a.uid]
                    }
                }
            },
            m = function() {
                i = !0;
                for (var t in s) s.hasOwnProperty(t) && (s[t] = null, delete s[t]);
                for (; a.length;) a.length--;
                for (; l.length;) l.length--
            },
            y = "SINA_CHART_BRIDGE";
            c.xh5_EvtUtil.addHandler(window, "message", v.onMsg),
            e = c.iframer({
                attribute: {
                    id: y,
                    src: "https://current.sina.com.cn/sinatkchart/SLBridge.html?20160704"
                }
            },
            m),
            setTimeout(function() {
                e.style.display = "none"
            },
            999),
            this.load = p,
            this.save = g,
            this.getStatus = function() {
                return n && !i && "1" == e.getAttribute("data-ready")
            }
        },
        this.colorPicker = function() {
            function t(t, e) {
                var n = function() {},
                i = t.prototype;
                n.prototype = e.prototype,
                t.prototype = new n;
                for (var r in i) i.hasOwnProperty(r) && (t.prototype[r] = i[r]);
                t.prototype.constructor = t
            }
            function e(t, n, i) {
                if (!n) return t;
                t || (t = {});
                for (var r in n) n.hasOwnProperty(r) && ("Object" === D(n[r]) ? (!t[r] && (t[r] = {}), e(t[r], n[r], i)) : !i && r in t || (t[r] = n[r]));
                return t
            }
            function n(t) {
                var e = "undefined" == typeof getComputedStyle ? t.currentStyle: getComputedStyle(t);
                return e ? (t.clientWidth || m(e.width) || m(t.style.width)) - (m(e.paddingLeft) || 0) - (m(e.paddingRight) || 0) | 0 : 0
            }
            function i(t) {
                var e = "undefined" == typeof getComputedStyle ? t.currentStyle: getComputedStyle(t);
                return e ? (t.clientHeight || m(e.height) || m(t.style.height)) - (m(e.paddingTop) || 0) - (m(e.paddingBottom) || 0) | 0 : 0
            }
            function r(t) {
                return t.getBoundingClientRect ? t.getBoundingClientRect() : {
                    left: 0,
                    top: 0
                }
            }
            function o(t) {
                var e = t.getContext("2d");
                e.clearRect(0, 0, t.width, t.height)
            }
            function a(t, e) {
                var r = document.createElement("canvas"),
                o = r.style,
                a = n(t),
                s = i(t),
                l = a * e.width,
                c = s * e.height;
                return r.width = l,
                r.height = c,
                o.position = "absolute",
                o.width = l + "px",
                o.height = c + "px",
                o.left = a * e.left + "px",
                o.top = s * e.top + "px",
                t.appendChild(r),
                r
            }
            function s(t, e) {
                var r = document.createElement("ul"),
                o = r.style,
                a = e.label,
                s = n(t),
                c = i(t);
                o.listStyle = "none",
                o.padding = 0,
                o.margin = 0,
                o.font = e.font,
                o.position = "absolute",
                o.left = s * e.left + "px",
                o.top = c * e.top + "px";
                for (var u = 0,
                h = a.length; h > u; u++) l(r, u, e);
                return t.appendChild(r),
                r
            }
            function l(t, e, n) {
                var i = document.createElement("li"),
                r = document.createElement("label"),
                o = document.createElement("input"),
                a = r.style,
                s = i.style,
                l = o.style;
                return r.innerHTML = n.label[e],
                a.textAlign = "right",
                a.display = "inline-block",
                a.width = n.labelWidth + "px",
                a.color = n.color,
                "number" == n.type && (o.type = "number"),
                l.width = n.inputWidth + "px",
                s.marginBottom = n.gap + "px",
                C(o, "mousemove",
                function(t) {
                    S(t)
                }),
                i.appendChild(r),
                i.appendChild(o),
                t.appendChild(i),
                i
            }
            function u(t, e) {
                var r = document.createElement("div"),
                o = r.style,
                a = n(t),
                s = i(t);
                return o.position = "absolute",
                o.left = a * e.left + "px",
                o.top = s * e.top + "px",
                o.width = a * e.width + "px",
                o.height = s * e.height + "px",
                t.appendChild(r),
                r
            }
            function h(t, e) {
                function n(n) {
                    n = R(e, n),
                    t._onmousemove(n.NyanX, n.NyanY),
                    t.onmousemove && t.onmousemove(t)
                }
                function i(t) {
                    a = !0,
                    n(t)
                }
                function r(t) {
                    a && n(t),
                    S(t),
                    k(t)
                }
                function o() {
                    a && (a = !1)
                }
                var a = !1;
                "ontouchend" in window ? (C(e, "touchstart", i), C(e, "touchmove", r), C(e, "touchend", o)) : (C(e, "mousedown", i), C(e, "mousemove", r), C(e, "mouseup", o), C(e, "mouseout", o))
            }
            function d(t, e, n) {
                return t = Math.round(t),
                e > t ? e: t > n ? n: t
            }
            function f(t, e, n) {
                return e > t ? e: t > n ? n: t
            }
            function p(t) {
                return t.length && "%" === t.charAt(t.length - 1) ? d(parseFloat(t) / 100 * 255, 0, 255) : d(parseInt(t, 10), 0, 255)
            }
            function g(t) {
                return t.length && "%" === t.charAt(t.length - 1) ? f(parseFloat(t) / 100, 0, 1) : f(parseFloat(t), 0, 1)
            }
            function v(t, e, n) {
                return 0 > n ? n += 1 : n > 1 && (n -= 1),
                1 > 6 * n ? t + (e - t) * n * 6 : 1 > 2 * n ? e: 2 > 3 * n ? t + (e - t) * (2 / 3 - n) * 6 : t
            }
            function y(t) {
                var e = (parseFloat(t[0]) % 360 + 360) % 360 / 360,
                n = g(t[1]),
                i = g(t[2]),
                r = .5 >= i ? i * (n + 1) : i + n - i * n,
                o = 2 * i - r;
                return [f(255 * v(o, r, e + 1 / 3), 0, 255), f(255 * v(o, r, e), 0, 255), f(255 * v(o, r, e - 1 / 3), 0, 255)]
            }
            function b(t) {
                if (t) {
                    var e, n, i = t[0] / 255,
                    r = t[1] / 255,
                    o = t[2] / 255,
                    a = Math.min(i, r, o),
                    s = Math.max(i, r, o),
                    l = s - a,
                    c = (s + a) / 2;
                    if (0 === l) e = 0,
                    n = 0;
                    else {
                        n = .5 > c ? l / (s + a) : l / (2 - s - a);
                        var u = ((s - i) / 6 + l / 2) / l,
                        h = ((s - r) / 6 + l / 2) / l,
                        d = ((s - o) / 6 + l / 2) / l;
                        i === s ? e = d - h: r === s ? e = 1 / 3 + u - d: o === s && (e = 2 / 3 + h - u),
                        0 > e && (e += 1),
                        e > 1 && (e -= 1)
                    }
                    return [360 * e, n, c]
                }
            }
            function x(t) {
                if (t) {
                    t += "";
                    var e = t.replace(/ /g, "").toLowerCase();
                    if ("#" !== e.charAt(0)) {
                        var n = e.indexOf("("),
                        i = e.indexOf(")");
                        if ( - 1 !== n && i + 1 === e.length) {
                            var r = e.substr(0, n),
                            o = e.substr(n + 1, i - (n + 1)).split(",");
                            switch (r) {
                            case "rgb":
                                if (3 !== o.length) return;
                                return [p(o[0]), p(o[1]), p(o[2])];
                            case "hsl":
                                if (3 !== o.length) return;
                                return y(o);
                            default:
                                return
                            }
                        }
                    } else {
                        if (4 === e.length) {
                            var a = parseInt(e.substr(1), 16);
                            if (! (a >= 0 && 4095 >= a)) return;
                            return [(3840 & a) >> 4 | (3840 & a) >> 8, 240 & a | (240 & a) >> 4, 15 & a | (15 & a) << 4]
                        }
                        if (7 === e.length) {
                            if (a = parseInt(e.substr(1), 16), !(a >= 0 && 16777215 >= a)) return;
                            return [(16711680 & a) >> 16, (65280 & a) >> 8, 255 & a]
                        }
                    }
                }
            }
            function w(t) {
                var e = [( + t[0]).toFixed(0), ( + t[1]).toFixed(0), ( + t[2]).toFixed(0)];
                return ((1 << 24) + (e[0] << 16) + (e[1] << 8) + +e[2]).toString(16).slice(1)
            }
            function N(t) {
                var e = [t[0].toFixed(0), (100 * t[1]).toFixed(0) + "%", (100 * t[2]).toFixed(0) + "%"];
                return "hsl(" + e.join(",") + ")"
            }
            function A(t, e) {
                if (t) {
                    var n = "Array" == D(t) ? t: x(t);
                    switch (e) {
                    case "rgb":
                        return e + "(" + n.join(",") + ")";
                    case "hex":
                        return "#" + w(n);
                    case "hsl":
                        return N(b(n))
                    }
                }
            }
            if ("undefined" != typeof getComputedStyle) {
                var C = function() {
                    return window.addEventListener ?
                    function(t, e, n) {
                        t.addEventListener(e, n)
                    }: function(t, e, n) {
                        t.attachEvent("on" + e, n)
                    }
                } (),
                S = function() {
                    return window.addEventListener ?
                    function(t) {
                        t.stopPropagation()
                    }: function(t) {
                        t.cancelBubble = !0
                    }
                } (),
                k = function() {
                    return window.addEventListener ?
                    function(t) {
                        t.preventDefault()
                    }: function(t) {
                        t.returnValue = !1
                    }
                } (),
                T = Object.prototype.toString,
                D = function(t) {
                    return null === t ? "Null": void 0 === t ? "Undefined": T.call(t).slice(8, -1)
                },
                O = function(t, e) {
                    if (!t) return - 1;
                    if (t.indexOf) return t.indexOf(e);
                    for (var n = t.length; n--;) if (t[n] === e) return n
                },
                R = function(t, e) {
                    if (e = e || window.event, null != e.NyanX) return e;
                    var n = e.type,
                    i = n && O(n, "touch") >= 0;
                    if (i) {
                        var o = "touchend" != n ? e.targetTouches[0] : e.changedTouches[0];
                        if (o) {
                            var a = r(t);
                            e.NyanX = o.clientX - a.left,
                            e.NyanY = o.clientY - a.top
                        }
                    } else {
                        var s = r(t);
                        e.NyanX = e.clientX - s.left,
                        e.NyanY = e.clientY - s.top,
                        e.NyanDelta = e.wheelDelta ? e.wheelDelta / 120 : -(e.detail || 0) / 3
                    }
                    return e
                },
                P = {
                    width: 320,
                    height: 200,
                    zIndex: 10002,
                    backgroundColor: "#444",
                    wrapShadow: "3px 3px 4px rgba(0, 0, 0, 0.4)",
                    color: "#66ccff",
                    picker: {
                        left: .05,
                        top: .15,
                        width: .4,
                        height: .65,
                        size: 10,
                        color: "#000",
                        lineWidth: 1
                    },
                    slider: {
                        left: .5,
                        top: .15,
                        width: .05,
                        height: .65
                    },
                    rgbBox: {
                        label: ["R:", "G:", "B:"],
                        font: "12px Microsoft YaHei",
                        color: "#FFFEFA",
                        gap: 8,
                        type: "number",
                        labelWidth: 15,
                        inputWidth: 36,
                        left: .6,
                        top: .15
                    },
                    hslBox: {
                        label: ["H:", "S:", "L:"],
                        font: "12px Microsoft YaHei",
                        color: "#FFFEFA",
                        gap: 8,
                        type: "number",
                        labelWidth: 15,
                        inputWidth: 36,
                        left: .78,
                        top: .15
                    },
                    hexBox: {
                        label: ["#"],
                        font: "12px Microsoft YaHei",
                        color: "#FFFEFA",
                        labelWidth: 15,
                        inputWidth: 60,
                        left: .03,
                        top: .85
                    },
                    colorBox: {
                        left: .63,
                        top: .6,
                        width: .32,
                        height: .2
                    },
                    okBtn: {
                        text: "\u786e\u5b9a",
                        backgroundColor: "#6C6C6C",
                        color: "#FFFEFA",
                        font: "12px Microsoft YaHei",
                        left: .65,
                        top: .87,
                        width: .12,
                        height: .1
                    },
                    cancelBtn: {
                        text: "\u53d6\u6d88",
                        backgroundColor: "#6C6C6C",
                        color: "#FFFEFA",
                        font: "12px Microsoft YaHei",
                        left: .83,
                        top: .87,
                        width: .12,
                        height: .1
                    }
                },
                M = function(t, n) {
                    e(this, n),
                    this.background = a(t, n),
                    this.layer = a(t, n),
                    this.H = 0,
                    this.S = 0,
                    h(this, this.layer),
                    this.paintBG()
                };
                M.prototype = {
                    constructor: M,
                    paintBG: function() {
                        for (var t = this.background,
                        e = t.getContext("2d"), n = t.width, i = t.height, r = e.createLinearGradient(0, 0, n, 0), o = 0; 1 > o; o += 1 / 6) r.addColorStop(o, "hsl(" + 360 * o + " , 100%, 50%)");
                        e.fillStyle = r,
                        e.fillRect(0, 0, n, i),
                        r = e.createLinearGradient(0, 0, 0, i),
                        r.addColorStop(0, "hsla(0, 0%, 50%, 0)"),
                        r.addColorStop(1, "hsla(0, 0%, 50%, 1)"),
                        e.fillStyle = r,
                        e.fillRect(0, 0, n, i)
                    },
                    _onmousemove: function(t, e) {
                        var r = this.layer,
                        o = n(r),
                        a = i(r);
                        this.H = t / o * 360,
                        this.S = (a - e) / a
                    },
                    updatePoint: function() {
                        var t = this.layer,
                        e = t.getContext("2d"),
                        r = this.size,
                        o = n(t),
                        a = i(t),
                        s = this.H * o / 360,
                        l = a - this.S * a;
                        e.clearRect(0, 0, t.width, t.height),
                        e.beginPath(),
                        e.moveTo(s - r, l),
                        e.lineTo(s + r, l),
                        e.moveTo(s, l - r),
                        e.lineTo(s, l + r),
                        e.strokeStyle = "black",
                        e.lineWidth = 2,
                        e.stroke()
                    },
                    update: function(t) {
                        this.H = t[0],
                        this.S = t[1],
                        this.updatePoint()
                    }
                };
                var F = function(t, n) {
                    e(this, n),
                    this.background = a(t, n),
                    this.layer = a(t, n),
                    this.L = .5,
                    h(this, this.layer)
                };
                F.prototype = {
                    constructor: F,
                    paintBG: function(t) {
                        var e = this.background,
                        n = e.getContext("2d"),
                        i = e.width,
                        r = e.height,
                        a = n.createLinearGradient(0, 0, 0, r);
                        o(e),
                        a.addColorStop(0, "#fff"),
                        a.addColorStop(.5, "hsl(" + ( + t[0]).toFixed(0) + ", " + (100 * t[1]).toFixed(0) + "%, 50%)"),
                        a.addColorStop(1, "#000"),
                        n.fillStyle = a,
                        n.fillRect(0, 0, i, r)
                    },
                    _onmousemove: function(t, e) {
                        var n = this.layer,
                        r = i(n);
                        this.L = (r - e) / r
                    },
                    updatePoint: function(t) {
                        for (var e = this.layer,
                        n = e.getContext("2d"), r = i(e), o = r - this.L * r, a = y(t), s = a.length; s--;) a[s] = (255 - a[s]).toFixed(0);
                        n.clearRect(0, 0, e.width, e.height),
                        n.beginPath(),
                        n.moveTo(0, o + .5),
                        n.lineTo(e.width, o + .5),
                        n.strokeStyle = A(a, "hex"),
                        n.lineWidth = 3,
                        n.stroke()
                    },
                    update: function(t) {
                        this.L = t[2],
                        this.paintBG(t),
                        this.updatePoint(t)
                    }
                };
                var E = function(t, e) {
                    var n = this;
                    this.box = s(t, e),
                    C(this.box, "input",
                    function(t) {
                        t.target.value = d(t.target.value, 0, 255),
                        n.oninput && n.oninput(t)
                    })
                };
                E.prototype = {
                    constructor: E,
                    getRGB: function() {
                        var t = this.box.childNodes;
                        return "rgb(" + t[0].childNodes[1].value + ", " + t[1].childNodes[1].value + ", " + t[2].childNodes[1].value + ")"
                    },
                    getRGBArr: function() {
                        var t = this.box.childNodes;
                        return [t[0].childNodes[1].value, t[1].childNodes[1].value, t[2].childNodes[1].value]
                    },
                    update: function(t) {
                        for (var e = this.box.childNodes,
                        n = y(t), i = 0, r = n.length; r > i; i++) e[i].childNodes[1].value = ( + n[i]).toFixed(0)
                    }
                };
                var H = function(t, e) {
                    var n = this;
                    this.box = s(t, e);
                    var i = this.box.childNodes;
                    C(i[0].childNodes[1], "input",
                    function(t) {
                        t.target.value = d(t.target.value, 0, 360),
                        n.oninput && n.oninput(t)
                    }),
                    C(i[1].childNodes[1], "input",
                    function(t) {
                        t.target.value = d(t.target.value, 0, 100),
                        n.oninput && n.oninput(t)
                    }),
                    C(i[2].childNodes[1], "input",
                    function(t) {
                        t.target.value = d(t.target.value, 0, 100),
                        n.oninput && n.oninput(t)
                    })
                };
                H.prototype = {
                    constructor: H,
                    getHSL: function() {
                        var t = this.box.childNodes;
                        return "hsl(" + t[0].childNodes[1].value + ", " + t[1].childNodes[1].value + "%, " + t[2].childNodes[1].value + "% )"
                    },
                    getHSLArr: function() {
                        var t = this.box.childNodes;
                        return [t[0].childNodes[1].value, t[1].childNodes[1].value / 100, t[2].childNodes[1].value / 100]
                    },
                    update: function(t) {
                        for (var e = this.box.childNodes,
                        n = 0,
                        i = t.length; i > n; n++) e[n].childNodes[1].value = (n > 0 ? 100 * t[n] : +t[n]).toFixed(0)
                    }
                };
                var L = function(t, e) {
                    var n = this;
                    this.box = s(t, e);
                    var i = this.box.childNodes;
                    C(i[0].childNodes[1], "input",
                    function(t) {
                        t.target.value = t.target.value.replace(/[^0-9A-Fa-f]/g, "").slice(0, 6);
                        var e = t.target.value.length;
                        6 == e && n.oninput && n.oninput(t)
                    })
                };
                L.prototype = {
                    constructor: L,
                    getHEX: function() {
                        return "#" + this.box.childNodes[0].childNodes[1].value
                    },
                    update: function(t) {
                        var e = this.box.childNodes;
                        e[0].childNodes[1].value = w(y(t))
                    }
                };
                var U = function(t, e) {
                    this.btn = u(t, e);
                    var n = this.btn.style;
                    this.btn.innerHTML = e.text,
                    n.font = e.font,
                    n.lineHeight = i(t) * e.height + "px",
                    n.textAlign = "center",
                    n.backgroundColor = e.backgroundColor,
                    n.color = e.color,
                    n.cursor = "pointer"
                },
                B = function(t, e) {
                    this.box = u(t, e),
                    this.box.style.backgroundColor = "#000"
                };
                B.prototype = {
                    constructor: B,
                    update: function(t) {
                        for (var e = y(t), n = e.length; n--;) e[n] = ( + e[n]).toFixed(0);
                        this.box.style.backgroundColor = "rgb(" + e[0] + ", " + e[1] + ", " + e[2] + ")"
                    }
                };
                var j = function(t) {
                    t = t || {},
                    this.param = e(t, P),
                    this.inited = !1,
                    c.xh5_EvtDispatcher.call(this)
                };
                return j.prototype = {
                    constructor: j,
                    init: function() {
                        if (!this.inited) {
                            var t = this.param,
                            e = b(x(t.color));
                            this._initDoms(t),
                            this._initEvent(),
                            this.update(e),
                            document.body.appendChild(this.wrap),
                            this.inited = !0
                        }
                    },
                    _initDoms: function(t) {
                        var e = document.createElement("div"),
                        n = e.style;
                        n.position = "absolute",
                        n.width = t.width + "px",
                        n.height = t.height + "px",
                        n.zIndex = t.zIndex,
                        n.backgroundColor = t.backgroundColor,
                        n.boxShadow = t.wrapShadow,
                        n.transition = "opacity 0.2s ease-in-out 0s",
                        n.opacity = 0,
                        n.visibility = "hidden",
                        n.userSelect = "none",
                        n.webkitUserSelect = "none",
                        n.msUserSelect = "none",
                        n.mosUserSelect = "none",
                        this.wrap = e,
                        this.picker = new M(e, t.picker),
                        this.slider = new F(e, t.slider),
                        this.rgbBox = new E(e, t.rgbBox),
                        this.hslBox = new H(e, t.hslBox),
                        this.hexBox = new L(e, t.hexBox),
                        this.colorBox = new B(e, t.colorBox),
                        this.okBtn = new U(e, t.okBtn),
                        this.cancelBtn = new U(e, t.cancelBtn)
                    },
                    _initEvent: function() {
                        function t(t) {
                            x = !0,
                            i = +y.left.replace(/[^0-9.]/g, ""),
                            r = +y.top.replace(/[^0-9.]/g, ""),
                            t.targetTouches ? (o = t.targetTouches[0].clientX, a = t.targetTouches[0].clientY) : (o = t.clientX, a = t.clientY)
                        }
                        function e(t) {
                            x && (t.targetTouches ? (s = t.targetTouches[0].clientX - o, l = t.targetTouches[0].clientY - a) : (s = t.clientX - o, l = t.clientY - a), y.left = +i + +s + "px", y.top = +r + +l + "px", S(t)),
                            k(t)
                        }
                        function n() {
                            x = !1
                        }
                        var i, r, o, a, s, l, c = this,
                        u = this.wrap,
                        h = this.picker,
                        d = this.slider,
                        f = this.rgbBox,
                        p = this.hslBox,
                        g = this.hexBox,
                        v = this.okBtn,
                        m = this.cancelBtn,
                        y = u.style,
                        x = !1;
                        "ontouchend" in window ? (C(u, "touchstart", t), C(u, "touchmove", e), C(u, "touchend", n)) : (C(u, "mousedown", t), C(u, "mousemove", e), C(u, "mouseup", n), C(u, "mouseout", n)),
                        h.onmousemove = function() {
                            c.update([h.H, h.S, d.L])
                        },
                        d.onmousemove = function() {
                            c.update([h.H, h.S, d.L])
                        },
                        p.oninput = function() {
                            c.update(p.getHSLArr())
                        },
                        f.oninput = function() {
                            c.update(b(f.getRGBArr()))
                        },
                        g.oninput = function() {
                            c.update(g.getHEX())
                        },
                        C(v.btn, "click",
                        function() {
                            c.hide(),
                            c.re("ok", [{
                                rgb: f.getRGB(),
                                hsl: p.getHSL(),
                                hex: A(p.getHSL(), "hex")
                            },
                            c.target]),
                            c.onok && c.onok({
                                rgb: f.getRGB(),
                                hsl: p.getHSL(),
                                hex: A(p.getHSL(), "hex")
                            },
                            c.target)
                        }),
                        C(m.btn, "click",
                        function() {
                            c.hide()
                        })
                    },
                    show: function(t, e, n, i) { ! this.inited && this.init();
                        var r = this.wrap,
                        o = r.style;
                        o.left = (t ? t: 0) + "px",
                        o.top = (e ? e: 0) + "px",
                        o.visibility = "visible",
                        o.opacity = 1,
                        i && this.update(i),
                        this.target = n
                    },
                    hide: function() {
                        if (this.inited) {
                            var t = this.wrap,
                            e = t.style;
                            e.visibility = "hidden",
                            e.opacity = 0
                        }
                    },
                    update: function(t) {
                        var e = "Array" == D(t) ? t: b(x(t));
                        this.picker.update(e),
                        this.slider.update(e),
                        this.rgbBox.update(e),
                        this.hslBox.update(e),
                        this.hexBox.update(e),
                        this.colorBox.update(e)
                    }
                },
                t(j, c.xh5_EvtDispatcher),
                new j
            }
        } (),
        this.HQ_DOMAIN = l()
    }
});;

xh5_define("cfgs.settinger", [],
function() {
    "use strict";
    function t(t) {
        this.uid = t,
        this.custom = {
            show_underlay_vol: !0,
            show_ext_marks: !0,
            show_floater: !0,
            mousewheel_zoom: !0,
            keyboard: !0,
            history_t: "window",
            allow_move: !0,
            mouse_and_touch: !0,
            tchart_tap: !0,
            show_k_rangepercent: !0,
            touch_prevent: !0,
            mini_threshold: {
                width: 0 / 0,
                height: 0 / 0
            },
            show_logo: !0,
            k_overlay: !1,
            stick: !0,
            smooth: !1,
            indicatorpanel_url: "https://current.sina.com.cn/sinatkchart/indicatorpanel.html?20160704",
            allow_indicator_edit: !0,
            storage_lv: 2,
            indicator_reorder: !0,
            indicator_cvs_title: !1,
            indicator_reheight: !0,
            centerZoom: !0
        },
        this.PARAM = {
            K_CL_NUM: 260,
            updateRate: 5,
            T_RATE: 120,
            minCandleNum: 15,
            maxCandleNum: 0 / 0,
            defaultCandleNum: 80,
            zoomUnit: 90,
            zoomLimit: 10,
            zoomArea: .15,
            I_Z_INDEX: 50,
            G_Z_INDEX: 30,
            _hd: 1,
            setHd: function(t) {
                "number" == typeof t && (this._hd = t)
            },
            getHd: function() {
                return this._hd
            },
            isFlash: !1,
            LOGO_ID: "KKE_sina_finance_logo"
        },
        this.DIMENSION = {
            extend_draw: !1,
            LOGO_W: 80,
            LOGO_H: 20,
            posY: 0,
            posX: 55,
            RIGHT_W: 55,
            K_RIGHT_W: 9,
            _w: void 0,
            _h: void 0,
            w_t: void 0,
            w_k: void 0,
            h_t: void 0,
            h_k: void 0,
            P_HV: .28,
            H_MA4K: 13,
            H_TIME_PART: 13,
            K_F_T: 47,
            T_F_T: 13,
            H_T_T: 14,
            W_T_L: 43,
            H_T_G: 60,
            H_BLK: 50,
            H_T_B: 7,
            I_V_O: 0,
            getOneWholeTH: function() {
                return this.H_T_T + this.H_T_G
            },
            H_RS: 30,
            setStageW: function(t) {
                this._w = t,
                this.w_k = t - this.posX - this.K_RIGHT_W,
                this.w_t = t - this.posX - this.RIGHT_W
            },
            setStageH: function(t, e) {
                this._h = t,
                this.h_k = this.h_t = t - e - this.H_TIME_PART - this.H_MA4K
            },
            getStageW: function() {
                return this._w
            },
            getStageH: function() {
                return this._h
            }
        },
        this.STYLE = {
            FONT_SIZE: 12,
            FONT_FAMILY: "helvetica,arial,sans-serif"
        },
        this.COLOR = {
            BG: "#fff",
            T_P: "#007cc8",
            T_AVG: "#000000",
            T_PREV: "#9b9b9b",
            K_RISE: "#f11200",
            K_FALL: "#00a800",
            K_N: "#000000",
            K_CL: "#007cc8",
            K_MS_RISE: "#f11200",
            K_MS_FALL: "#00a800",
            K_MS_N: "#000000",
            T_RISE: "#f11200",
            T_FALL: "#00a800",
            T_N: "#000000",
            F_RISE: "#f11200",
            F_FALL: "#00a800",
            F_N: "#000000",
            F_BG: "rgba(255,255,255,.9)",
            F_BR: "#000",
            F_T: "#000",
            K_EXT: "#080208",
            T_T: "#777",
            K_P: "#555",
            V_SD: "#dddddd",
            M_ARR: ["#fff", "#BCD4F9"],
            TIME_S: "#000000",
            TIME_L: "#eeeeee",
            GRID: "#eee",
            IVH_LINE: "#494949",
            P_TC: "#fff",
            P_BG: "#494949",
            T_TC: "#fff",
            T_BG: "#494949",
            REMARK_T: "#fff",
            REMARK_BG: "#494949",
            K_PCT: "#ccc",
            BTN_ARR: ["#2b9dfc", "#fff"],
            TIP_ARR: ["#000", "#fff", null, !1, null],
            LOGO: "#ccc"
        },
        this.datas = {
            s: "sh000001",
            mode: "",
            tDataLen: 241,
            t: "",
            isT: !1,
            scaleType: "price",
            candle: "solid"
        }
    }
    var e = {
        URLHASH: {
            TS: 1,
            T1: 1,
            T5: 5,
            FAKE_T5: 2,
            NTS: "ts",
            NT5: "t5",
            KD: 24,
            KW: 168,
            KM: 720,
            KCL: 365,
            KDF: 23,
            KDB: 25,
            KWF: 167,
            KWB: 169,
            KMF: 719,
            KMB: 721,
            KCLF: 364,
            KCLB: 366,
            NKD: "kd",
            NKW: "kw",
            NKM: "km",
            NKCL: "kcl",
            NKDF: "kdf",
            NKDB: "kdb",
            NKWF: "kwf",
            NKWB: "kwb",
            NKMF: "kmf",
            NKMB: "kmb",
            NKCLF: "kclf",
            NKCLB: "kclb",
            K1: 1,
            K5: 5,
            K15: 15,
            K30: 30,
            K60: 60,
            K240: 240,
            NK1: "k1",
            NK5: "k5",
            NK15: "k15",
            NK30: "k30",
            NK60: "k60",
            NK240: "k240",
            KMS: 1e3,
            NKMS: "kms",
            KYTD: 983,
            NYTD: "kytd",
            vn: function(t) {
                for (var e in this) if (this.hasOwnProperty(e) && "number" == typeof this[e] && t == this[e]) return this[e];
                return void 0
            },
            vi: function(t) {
                switch (t) {
                case this.NTS:
                    return this.TS;
                case this.NT5:
                    return this.FAKE_T5;
                default:
                    return this[t.toUpperCase()]
                }
            },
            gt: function(t) {
                var e;
                switch (t) {
                case this.KMS:
                    e = {
                        type: "msk"
                    };
                    break;
                case this.K1:
                case this.K5:
                case this.K15:
                case this.K30:
                case this.K60:
                case this.K240:
                    e = {
                        type: "mink"
                    };
                    break;
                case this.KDF:
                case this.KWF:
                case this.KMF:
                case this.KCLF:
                    e = {
                        type: "rek",
                        dir: "q"
                    };
                    break;
                case this.KDB:
                case this.KWB:
                case this.KMB:
                case this.KCLB:
                    e = {
                        type: "rek",
                        dir: "h"
                    };
                    break;
                default:
                    e = {
                        type: "k"
                    }
                }
                switch (t) {
                case this.KD:
                case this.KDF:
                case this.KDB:
                    e.baseid = this.KD;
                    break;
                case this.KW:
                case this.KWF:
                case this.KWB:
                    e.baseid = this.KW;
                    break;
                case this.KM:
                case this.KMF:
                case this.KMB:
                    e.baseid = this.KM;
                    break;
                case this.KCL:
                case this.KCLF:
                case this.KCLB:
                    e.baseid = this.KCL;
                    break;
                default:
                    e.baseid = t
                }
                return e
            }
        },
        e: {
            K_DATA_LOADED: "kDataLoaded",
            T_DATA_LOADED: "tDataLoaded",
            I_EVT: "iEvent"
        },
        nohtml5info: "\u68c0\u6d4b\u5230\u60a8\u7684\u6d4f\u89c8\u5668\u8fc7\u65e7\u4e14\u4e0d\u652f\u6301HTML 5\uff0c\u5f53\u524d\u4ee5\u517c\u5bb9\u6a21\u5f0f\u8fd0\u884c\u3002<br/>\u4e3a\u83b7\u5f97\u66f4\u597d\u7684\u4f53\u9a8c\u53ca\u5b8c\u5584\u7684\u529f\u80fd\uff0c\u5efa\u8bae\u4f7f\u7528<a style='color:#fff;text-decoration:underline;' href='http://down.tech.sina.com.cn/content/40975.html' target='_blank'>\u8c37\u6b4cChrome</a>\u6d4f\u89c8\u5668\uff0c\u6216\u5347\u7ea7\u5230\u60a8\u6d4f\u89c8\u5668\u7684<a style='color:#fff;text-decoration:underline;' href='http://down.tech.sina.com.cn/content/58979.html' target='_blank'>\u6700\u65b0\u7248\u672c</a>\u3002",
        historyt08: "\u5f53\u524d\u63d0\u4f9bA\u80a12008\u5e74\u4ee5\u6765\u7684\u5386\u53f2\u5206\u65f6\u8d70\u52bf\u67e5\u8be2",
        nohistoryt: "\u65e0\u6b64\u8bc1\u5238\u6b64\u65f6\u6bb5\u5386\u53f2\u5206\u65f6\u6570\u636e",
        norecord: "\u8bc1\u5238\u4ee3\u7801\u65e0\u8bb0\u5f55",
        notlisted: "\u672a\u4e0a\u5e02",
        delisted: "\u9000\u5e02",
        nodata: "\u672a\u52a0\u8f7d\u5230\u6709\u6548\u6570\u636e",
        noredata: "\u90e8\u5206\u8bc1\u5238\u65e0\u590d\u6743\u6570\u636e"
    };
    return new
    function() {
        this.VER = "2.0.27";
        var n = [];
        this.getSetting = function(e) {
            for (var i, r = n.length; r--;) if (i = n[r], e == i.uid) return i;
            return i = new t(e),
            n.push(i),
            i
        },
        this.globalCfg = e
    }
});;

xh5_define("datas.hq", ["utils.util"],
function(t) {
    "use strict";
    var e = t.load,
    n = t.fBind,
    r = t.market,
    i = t.cookieUtil,
    a = t.dateUtil,
    o = t.tUtil,
    s = 0 == location.protocol.indexOf("https:"),
    l = t.HQ_DOMAIN,
    u = new
    function() {
        var t, n = "sinaH5EtagStatus",
        r = {
            domain: "",
            path: "/",
            expires: 3600
        },
        a = "n",
        o = "y",
        u = 0,
        c = (s ? "https": "http") + "://" + l + ".sinajs.cn/list=sys_hqEtagMode",
        d = function() {
            e(c,
            function() {
                var e = window.hq_str_sys_hqEtagMode;
                0 == u ? u = e: (u == e ? (t = !1, i.set(n, a, r)) : (t = !0, i.set(n, o, r)), u = 0)
            })
        },
        h = function() {
            //n = "sinaH5EtagStatus" //获取cookies
            var e = i.get(n);
            switch (e) {
            case a:
                t = !1;
                break;
            case o:
                t = !0;
                break;
            default:
                t = !1,
                d()
            }
        };
        h(),
        setInterval(h, 2e3),
        this.isETag = function() {
            return t
        }
    },
    c = function() {
        function i(e, n, r) {
            var i = {},
            a = v[e];
            a || (a = {
                symbol: e
            },
            v[e] = a);
            var o = x.trHandler(r, a);
            o && (a.trstr = r),
            i[e] = a;
            var s = {
                msg: "",
                dataObj: i
            };
            return t.isFunc(n) && n(s),
            s
        }
        function c(t) {
            return /^nf_(IF|IC|IH|TF)\w+$/.test(t) ? "CFF": /^nf_T(\d{4}|0)$/.test(t) ? "CFF": "NF"
        }
        function d(e, n, i, a) {
            if (a && --a.count > 0) return null;
            for (var o, s, l, u, d, h, f = e.split(","), p = [], m = {},
            v = 0, b = f.length; b > v; v++) {
                if (o = f[v], l = g[o], l || (l = {
                    symbol: o
                },
                g[o] = l), s = r(o), i) u = i;
                else {
                    switch (u = window["hq_str_" + o], s) {
                    case "HK":
                        d = window["hq_str_" + o.replace("rt_", "") + "_i"];
                        break;
                    default:
                        d = window["hq_str_" + o + "_i"]
                    }
                    if ("US" == s) var y = window.hq_str_gb_$ixic || window.hq_str_gb_ixic || window.hq_str_gb_$dji || window.hq_str_gb_dji
                }
                h = u && u.length > 0 ? u.split(",") : void 0;
                var N;
                switch (s) {
                case "CN":
                    N = x;
                    break;
                case "CNI":
                    N = x;
                    break;
                case "US":
                    N = T;
                    break;
                case "HK":
                    N = C;
                    break;
                case "OTC":
                    N = P;
                    break;
                case "HF":
                    N = S;
                    break;
                case "NF":
                    N = "CFF" == c(o) ? _: k;
                    break;
                case "fund":
                    N = A;
                    break;
                case "option_cn":
                    N = D;
                    break;
                case "forex":
                case "forex_yt":
                    N = w;
                    break;
                case "CFF":
                    N = _;
                    break;
                default:
                    N = void 0
                }
                var F = !0;
                N && (F = N.update(h, l, d, y)),
                F && (l.hqstr = u),
                p.push(l),
                m[o] = l
            }
            var O = {
                msg: "",
                data: p,
                dataObj: m
            };
            return t.isFunc(n) && n(O),
            O
        }
        function h(e) {
            var n = 40,
            r = e.split(","),
            i = [];
            for (r = t.uae(r); r.length > n;) i.push(r.splice(0, n));
            return i.push(r.splice(0, r.length)),
            i
        }
        this.VER = "2.6.9";
        var f, p = {
            "00": "",
            "01": "\u505c\u724c\u4e00\u5c0f\u65f6",
            "02": "\u505c\u724c\u4e00\u5929",
            "03": "\u8fde\u7eed\u505c\u724c",
            "04": "\u76d8\u4e2d\u505c\u724c",
            "05": "\u505c\u724c\u534a\u5929",
            "06": "\u505c\u724c\u534a\u5c0f\u65f6",
            "07": "\u6682\u505c",
            "08": "\u53ef\u6062\u590d\u4ea4\u6613\u7194\u65ad",
            "09": "\u4e0d\u53ef\u6062\u590d\u4ea4\u6613\u7194\u65ad"
        },
        m = (new Date).getTime(),
        g = {},
        v = {},
        b = new
        function() {
            var t = l + ".sinajs.cn",
            n = "://" + t + "/?_=$rn&list=$symbol",
            r = "://" + t + "/etag.php?_=" + m + "&list=$symbol",
            i = function(t) {
                var e, i = s ? "https": t.ssl ? "https": "http";
                return e = t.cancelEtag ? i + n.replace("$rn", String(Math.random())) : i + (u.isETag() ? r: n.replace("$rn", String(Math.random())))
            };
            return function(t, n, r) {
                r = r || {},
                e(i(r).replace("$symbol", t), n)
            }
        },
        y = function(t) {
            var e = t.timeStr || "",
            n = t.dateStr || "",
            r = t.tArr || void 0,
            i = t.hqObj || {},
            s = t.dateDiv || "-",
            l = e.split(":"),
            u = Number(l[0]) || 0,
            c = Number(l[1]) || 0,
            d = Number(l[2]) || 0,
            h = [o.s0(u), o.s0(c)].join(":"),
            f = 0 / 0;
            if (r) if (r.indexOf) f = r.indexOf(h);
            else for (var p = r.length; p--;) if (r[p] == h) {
                f = p;
                break
            }
            var m = {
                time: h,
                isUpdateTime: isNaN(f) ? !0 : Boolean(f >= 0),
                index: f
            },
            g = n.split(s),
            v = ~~Number(g[0]),
            b = ~~ (Number(g[1]) - 1),
            y = ~~Number(g[2]),
            N = {
                isErrData: !1,
                isDateChange: !1,
                date: i.date,
                today: [v, b + 1, y].join("-")
            };
            if (i.date) {
                var w = new Date(v, b, y, u, c, d),
                x = a.stbd(i.date, w);
                x ? w >= i.date ? N.date.setHours(u, c, d) : N.isErrData = !0 : (N.isDateChange = Boolean(w > i.date), N.isDateChange ? N.date = w: N.isErrData = !0)
            } else n ? N.date = new Date(v, b, y, u, c, d) : N.isErrData = !0;
            return {
                datePart: N,
                timePart: m
            }
        },
        N = {
            swap: function(t) {
                var e, n = t.split(","),
                r = "";
                n[8] = "TP" == n[8] ? "03": "00",
                e = [0, 4, 3, 7, 5, 6, 26, 46, 10, 11, 36, 26, 37, 27, 38, 28, 39, 29, 40, 30, 56, 46, 57, 47, 58, 48, 59, 49, 60, 50, 2, 1, 8];
                for (var i = 0; i < e.length; i++) r += n[e[i]] + ",";
                return r = r.slice(0, r.length - 1)
            },
            kak: function(t, e) {
                var n;
                switch (e) {
                case "CN_2":
                    n = this.swap(t);
                    break;
                default:
                    n = t
                }
                return n
            }
        },
        w = new
        function() {
            var t, e;
            this.update = function(n, r) {
                if (!n) return ! 1;
                t || (t = o.gtr([["7:00", "23:59"], ["0:00", "6:59"]]));
                var i = t,
                a = "07:00",
                s = 17,
                l = r.symbol;
                0 !== l.indexOf("fx_") && (s = 10, "DINIW" == l && (e || (e = o.gtr([["6:00", "23:59"], ["0:00", "5:59"]])), i = e, a = "06:00"));
                var u = n[s],
                c = n[0],
                d = y({
                    dateStr: u,
                    timeStr: c,
                    hqObj: r,
                    tArr: i,
                    start: a
                });
                if (d.datePart.isErrData) return ! 1;
                r.date = d.datePart.date,
                r.today = d.datePart.today,
                r.time = d.timePart.time,
                r.index = d.timePart.index,
                r.isUpdateTime = d.timePart.isUpdateTime,
                r.name = String(n[9]);
                var h = Number(n[3]) || 0;
                return r.prevclose = h,
                r.open = Number(n[5]) || h,
                r.high = Number(n[6]) || h,
                r.low = Number(n[7]) || h,
                r.price = Number(n[8]) || h,
                r.totalVolume = 0,
                !0
            }
        },
        x = new
        function() {
            var e, n, r = function(n, r) {
                if (!n) return ! 1;
                e || (e = o.gta());
                var i = 100;
                /[gz]/.test(r.type) ? i = 10 : t.isRepos(r.symbol) ? i = 10 : /^(sh000|sh580)\d+/.test(r.symbol) && (i = 1);
                var a = n[30],
                s = n[31],
                l = y({
                    dateStr: a,
                    timeStr: s,
                    hqObj: r,
                    tArr: e,
                    start: "09:30"
                });
                if (l.datePart.isErrData) return ! 1;
                if (r.date = l.datePart.date, r.isDateChange = l.datePart.isDateChange, r.today = l.datePart.today, r.time = l.timePart.time, r.index = l.timePart.index, r.isUpdateTime = l.timePart.isUpdateTime, !l.timePart.isUpdateTime) {
                    var u = r.time.split(":"),
                    c = Number(u[0]),
                    d = Number(u[1]);
                    switch (c) {
                    case 11:
                        36 > d && (r.isUpdateTime = !0, r.index = 119);
                        break;
                    case 15:
                        10 > d && (r.isUpdateTime = !0, r.index = 240)
                    }
                }
                r.name = String(n[0]),
                r.isNewListed = Boolean(0 == r.name.indexOf("N"));
                var h = Number(n[2]) || 0;
                r.prevclose = h,
                r.preopen = Number(n[1]) || Number(n[6]) || Number(n[7]) || h,
                r.open = Number(n[1]) || h,
                r.price = Number(n[3]) || h,
                r.high = Number(n[4]) || h,
                r.low = Number(n[5]) || h,
                r.buy = Number(n[6]),
                r.sell = Number(n[7]);
                var f = Number(n[8]) || 0;
                f /= i,
                r.totalVolume = f,
                r.totalAmount = Number(n[9]) || 0;
                var m = n[32];
                return r.state = m,
                r.isStopDay = "02" == m || "03" == m,
                r.statusStr = p[m] || "",
                !0
            },
            i = function(t, e) {
                var n = t.split(","); ! n || n.length < 16 || (e.type = String(n[0]).toLowerCase(), e.lastfive = Number(n[6]), e.fc = Number(n[8]), e.issueprice = Number(n[14]), e.status = Number(n[15]))
            },
            s = function(e, r) {
                n || (n = o.gtr([["9:15", "11:30"], ["13:00", "15:01"]]));
                var i = g[r.symbol] || {},
                s = i.date;
                t.isDate(s) || (s = new Date);
                var l = e.split("|"),
                u = a.ds(s),
                c = l[1],
                d = y({
                    dateStr: u,
                    timeStr: c,
                    hqObj: r,
                    tArr: n,
                    start: "09:15"
                });
                return d.datePart.isErrData ? !1 : d.datePart.date.getHours() - s.getHours() > 2 ? !1 : (r.date = d.datePart.date, r.isDateChange = d.datePart.isDateChange, r.today = d.datePart.today, r.time = d.timePart.time, r.index = d.timePart.index, r.isUpdateTime = d.timePart.isUpdateTime, r.name = i.name || "", r.isNewListed = Boolean(0 == r.name.indexOf("N")), r.price = Number(l[2]), r.trvolume = .01 * (Number(l[3]) || 0), r.tramount = Number(l[4]) || 0, r.trbs = Number(l[7]) || 0, !0)
            };
            this.trHandler = function(t, e) {
                return s(t, e)
            },
            this.update = function(t, e, n) {
                var a = !0;
                return n && i(n, e),
                t && (a = r(t, e)),
                a
            }
        },
        _ = new
        function() {
            var t;
            this.update = function(e, n) {
                if (!e) return ! 1;
                t || (t = o.gata(r(n.symbol), window["kke_future_" + n.symbol] && window["kke_future_" + n.symbol].time || [["09:30", "11:29"], ["13:00", "02:59"]]));
                var i = e[36],
                a = e[37],
                s = y({
                    dateStr: i,
                    timeStr: a,
                    hqObj: n,
                    tArr: t,
                    start: t[0]
                });
                if (s.datePart.isErrData) return ! 1;
                n.name = e[49] || n.symbol.replace("CFF_RE_", ""),
                n.date = s.datePart.date,
                n.isDateChange = s.datePart.isDateChange,
                n.today = s.datePart.today,
                n.time = s.timePart.time,
                n.index = s.timePart.index,
                n.isUpdateTime = s.timePart.isUpdateTime;
                var l = Number(e[14]) || Number(e[13]) || 0;
                return n.settlement = n.prevclose = l,
                n.open = Number(e[0]) || l,
                n.price = Number(e[3]) || l,
                n.high = Number(e[1]) || l,
                n.low = Number(e[2]) || l,
                n.preopen = n.open,
                n.totalVolume = Number(e[4]) || 0,
                n.totalAmount = Number(e[5]) || 0,
                n.holdingAmount = Number(e[6]) || 0,
                n.preHoldingAmount = Number(e[15]) || 0,
                n.iscff = 1,
                !0
            }
        },
        T = new
        function() {
            var e, n = function(e) {
                if (!e || e.length < 9) return null;
                for (var n, r = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], i = e.split(" "), a = new Date, o = a.getFullYear(), s = 0, l = r.length; l > s; s++) if (String(i[0]).toUpperCase() == String(r[s]).toUpperCase()) {
                    n = s;
                    break
                }
                var u = parseInt(Number(i[1])),
                c = String(i[2]),
                d = c.toUpperCase().indexOf("PM") > 0,
                h = c.split(":"),
                f = parseInt(Number(h[0]));
                d && 12 != f && (f += 12);
                var p = h[1],
                m = p.slice(0, -2),
                g = [t.strUtil.zp(f), t.strUtil.zp(m), "00"].join(":"),
                v = new Date(o, n, u);
                if ( + v > +a) {
                    if (! (0 == a.getMonth() && a.getDate() < 7)) return null;
                    o--,
                    v = new Date(o, n, u)
                }
                var b = [v.getFullYear(), t.strUtil.zp(v.getMonth() + 1), t.strUtil.zp(v.getDate())].join("-");
                return [g, b]
            },
            r = function(t, e) {
                if (t && e) {
                    var n = t.split(","); ! n || n.length < 3 || (e.exchange = n[0], e.industry = n[1], e.issueprice = n[2])
                }
            },
            i = function(t, r, i) {
                function s(t) {
                    return 0 === parseInt(t[2]) && 0 === parseInt(t[4]) && 0 === parseInt(t[5]) && 0 === parseInt(t[6]) && 0 === parseInt(t[7]) && 0 === parseInt(t[10])
                }
                if (!t || t.length < 28) return ! 1;
                e || (e = o.gtus());
                var l, u = !1;
                i ? (l = i.split(","), u = s(l)) : u = s(t);
                var c;
                if (r.prevclose = Number(t[26]) || 0, u) {
                    r.high = r.prevclose,
                    r.open = r.prevclose,
                    r.low = r.prevclose;
                    var d = new Date((window.hq_str_sys_time ? new Date(1e3 * window.hq_str_sys_time) : new Date) - 432e5);
                    c = ["09:10", d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()]
                } else r.open = Number(t[5]) || r.prevclose,
                r.high = Number(t[6]) || r.prevclose,
                r.low = Number(t[7]) || r.prevclose,
                c = n(String(l ? l[25] : t[25]));
                if (r.name = t[0], r.price = Number(t[1]) || r.open, r.preopen = r.open, r.totalVolume = Number(t[10]) || 0, r.prevclose <= 0 && (r.prevclose = r.price), r.isUnlisted = 0 == r.price && 0 == Number(t[8]) && 0 == Number(t[9]), c) {
                    var h = y({
                        dateStr: c[1],
                        timeStr: c[0],
                        hqObj: r,
                        tArr: e
                    });
                    r.date = h.datePart.date,
                    r.isDateChange = h.datePart.isDateChange,
                    r.today = h.datePart.today,
                    r.time = h.timePart.time,
                    r.index = h.timePart.index,
                    r.isUpdateTime = h.timePart.isUpdateTime,
                    a = !0
                }
                return ! 0
            },
            a = !1;
            this.update = function(t, e, n, a) {
                var o;
                return n && r(n, e),
                t && (o = i(t, e, a)),
                o
            }
        },
        A = new
        function() {
            var t;
            this.update = function(e, n) {
                if (!e) return ! 1;
                t || (t = o.gthk());
                var r = e[7],
                i = e[1],
                a = y({
                    dateStr: r,
                    dateDiv: "-",
                    timeStr: i,
                    hqObj: n,
                    tArr: t,
                    start: "09:30"
                });
                return n.date = a.datePart.date,
                n.isDateChange = a.datePart.isDateChange,
                n.today = a.datePart.today,
                n.time = a.timePart.time,
                n.index = a.timePart.index,
                n.isUpdateTime = a.timePart.isUpdateTime,
                n.name = String(e[0]),
                n.volume = 0,
                n.price = Number(e[2]),
                n.prevprice = n.prevclose = Number(e[3]),
                !0
            }
        },
        k = new
        function() {
            var t;
            this.update = function(e, n) {
                if (!e) return ! 1;
                t || (t = o.gata(r(n.symbol), window["kke_future_" + n.symbol] && window["kke_future_" + n.symbol].time || [["09:30", "11:29"], ["13:00", "02:59"]]));
                var i = e[1],
                a = e[17],
                s = i.slice(0, 2) + ":" + i.slice(2, 4),
                l = y({
                    dateStr: a,
                    dateDiv: "-",
                    timeStr: s,
                    hqObj: n,
                    tArr: t,
                    start: t[0]
                });
                n.date = l.datePart.date,
                n.isDateChange = l.datePart.isDateChange,
                n.today = l.datePart.today,
                n.time = l.timePart.time,
                n.index = l.timePart.index,
                n.isUpdateTime = l.timePart.isUpdateTime,
                n.name = String(e[0]);
                var u = Number(e[10]) || 0;
                return n.prevclose = u,
                n.open = Number(e[2]) || u,
                n.preopen = n.open || n.price,
                n.high = Number(e[3]) || u,
                n.low = Number(e[4]) || u,
                n.close = Number(e[5]) || u,
                n.buy = Number(e[6]),
                n.sell = Number(e[7]),
                n.price = Number(e[8]) || u,
                n.activeprevclose = Number(e[9]),
                n.buyAmount = Number(e[11]),
                n.sellAmount = Number(e[12]),
                n.holdingAmount = Number(e[13]),
                n.totalVolume = Number(e[14]) || 0,
                n.exchange = e[15],
                n.futuresType = e[16],
                n.isHot = Number(e[18]),
                n.day5Highest = Number(e[19]),
                n.day5Lowest = Number(e[20]),
                n.day10Highest = Number(e[21]),
                n.day10Lowest = Number(e[22]),
                n.day20Highest = Number(e[23]),
                n.day20Lowest = Number(e[24]),
                n.day55Highest = Number(e[25]),
                n.day55Lowest = Number(e[26]),
                n.weighted = Number(e[27]),
                !0
            }
        },
        C = new
        function() {
            var t, e = function(e, n) {
                if (!e) return ! 1;
                t || (t = o.gthk());
                var r = e[17],
                i = e[18],
                a = e[24],
                s = y({
                    dateStr: r,
                    dateDiv: "/",
                    timeStr: i,
                    hqObj: n,
                    tArr: t,
                    start: "09:30"
                });
                n.date = s.datePart.date || new Date,
                n.isDateChange = s.datePart.isDateChange,
                n.today = s.datePart.today;
                var l = !1; (!n.time || s.timePart.time > "09:29" && n.time < s.timePart.time) && (l = !0),
                n.time = s.timePart.time,
                n.index = s.timePart.index,
                n.isUpdateTime = s.timePart.isUpdateTime,
                l && (n.isUpdateTime = !0),
                n.name = String(e[1]);
                var u = Number(e[3]) || 0;
                return n.prevclose = u,
                n.open = "Y" == a ? Number(e[2]) || u: u,
                n.preopen = Number(e[2]) || Number(e[9]) || Number(e[10]) || u,
                n.price = Number(e[6]) || u,
                n.high = Number(e[4]) || u,
                n.low = Number(e[5]) || u,
                n.totalVolume = Number(e[12]) || 1e3 * Number(e[11]) || 0,
                n.totalAmount = Number(e[11]) || 0,
                !0
            },
            n = function(t, e) {
                var n = t.split(","); ! n || n.length < 15 || (e.type = String(n[0]).toLowerCase(), e.lastfive = 0, e.status = Number(n[14]), e.issueprice = Number(n[16]))
            };
            this.update = function(t, r, i) {
                var a = !0;
                return i && n(i, r),
                t && (a = e(t, r)),
                a
            }
        },
        S = new
        function() {
            var t;
            this.update = function(e, n) {
                if (!e) return ! 1;
                t || (t = o.gata(r(n.symbol), window["kke_future_" + n.symbol] && window["kke_future_" + n.symbol].time || [["06:00", "23:59"], ["00:00", "05:00"]]));
                var i = t,
                a = t[0],
                s = 12,
                l = e[s],
                u = e[6],
                c = y({
                    dateStr: l,
                    timeStr: u,
                    tArr: i,
                    start: a,
                    hqObj: n
                });
                if (c.datePart.isErrData) return ! 1;
                n.date = c.datePart.date,
                n.today = c.datePart.today,
                n.time = c.timePart.time,
                n.index = c.timePart.index,
                n.isUpdateTime = c.timePart.isUpdateTime,
                n.name = String(e[13]);
                var d = Number(e[7]) || 0;
                return n.prevclose = d,
                n.open = Number(e[8]) || d,
                n.price = Number(e[0]) || d,
                n.high = Number(e[4]) || d,
                n.low = Number(e[5]) || d,
                n.buy = Number(e[2]),
                n.sell = Number(e[3]),
                n.buyAmount = Number(e[10]),
                n.sellAmount = Number(e[11]),
                n.holdingAmount = Number(e[9]),
                !0
            }
        },
        D = new
        function() {
            var t;
            this.update = function(e, n) {
                if (!e) return ! 1;
                t || (t = o.gta());
                var r = e[32],
                i = r.split(" "),
                a = i[0],
                s = i[1],
                l = y({
                    dateStr: a,
                    timeStr: s,
                    hqObj: n,
                    tArr: t,
                    start: "09:30"
                });
                if (l.datePart.isErrData) return ! 1;
                n.date = l.datePart.date,
                n.isDateChange = l.datePart.isDateChange,
                n.today = l.datePart.today,
                n.time = l.timePart.time,
                n.index = l.timePart.index,
                n.isUpdateTime = l.timePart.isUpdateTime,
                n.name = String(e[37]),
                n.isNewListed = Boolean(0 == n.name.indexOf("N"));
                var u = Number(e[8]) || 0;
                return n.prevclose = u,
                n.preopen = Number(e[9]) || u,
                n.open = Number(e[9]) || u,
                n.price = Number(e[2]) || u,
                n.high = Number(e[39]) || u,
                n.low = Number(e[40]) || u,
                n.position = Number(e[5]) || 0,
                n.totalVolume = Number(e[41]) || 0,
                n.totalAmount = Number(e[42]) || 0,
                !0
            }
        },
        P = new
        function() {
            var t;
            this.update = function(e, n) {
                if (!e) return ! 1;
                t || (t = o.gta());
                var r = e[30],
                i = e[31],
                a = y({
                    dateStr: r,
                    timeStr: i,
                    hqObj: n,
                    tArr: t,
                    start: "09:30"
                });
                if (a.datePart.isErrData) return ! 1;
                if (n.date = a.datePart.date, n.isDateChange = a.datePart.isDateChange, n.today = a.datePart.today, n.time = a.timePart.time, n.index = a.timePart.index, n.isUpdateTime = a.timePart.isUpdateTime, !a.timePart.isUpdateTime) {
                    var s = n.time.split(":"),
                    l = Number(s[0]),
                    u = Number(s[1]);
                    switch (l) {
                    case 11:
                        59 > u && (n.isUpdateTime = !0);
                        break;
                    case 15:
                        31 > u && (n.isUpdateTime = !0)
                    }
                }
                n.name = String(e[0]),
                n.isNewListed = Boolean(0 == n.name.indexOf("N"));
                var c = Number(e[2]) || 0;
                n.prevclose = c,
                n.preopen = Number(e[1]) || Number(e[6]) || Number(e[7]) || c,
                n.open = Number(e[1]) || c,
                n.price = Number(e[3]) || c,
                n.high = Number(e[4]) || c,
                n.low = Number(e[5]) || c,
                n.buy = Number(e[6]),
                n.sell = Number(e[7]),
                n.totalVolume = Number(e[8]) / 1e3 || 0,
                n.totalAmount = Number(e[9]) || 0;
                var d = e[32];
                return n.state = d,
                n.isStopDay = "02" == d || "03" == d,
                n.statusStr = p[d] || "",
                !0
            }
        },
        F = [],
        O = "",
        L = "",
        M = function(t) {
            for (var e = F.length; e--;) F[e](t),
            F[e] = null,
            F.length--
        };
        this.get = function(t, e) {
            var i, a = t.symbol,
            o = t.withI,
            s = a,
            l = 0;
            if (o) for (var u, c = a.split(","), p = c.length; p > l; l++) {
                u = c[l];
                var m;
                m = "HK" == r(u) ? u.replace("rt_", "") + "_i": u + "_i",
                s += "," + m
            }
            var g, v;
            if (t.delay) O += a + ",",
            L += s + ",",
            F.push(e),
            clearTimeout(f),
            f = setTimeout(function() {
                for (L = L.substring(0, L.length - 1), O = O.substring(0, O.length - 1), i = h(L), v = i.length, g = {
                    count: v
                },
                l = 0; v > l; l++) b(i[l].join(","), n(d, null, O, M, null, g), t);
                O = "",
                L = ""
            },
            100);
            else for (i = h(s), v = i.length, g = {
                count: v
            },
            l = 0; v > l; l++) b(i[l].join(","), n(d, null, a, e, null, g), t)
        },
        this.parse = function(e, n) {
            var r, a = e.symbol;
            switch (e.market) {
            case "CN_TR":
                r = i(a, null, e.hqStr);
                break;
            default:
                var o = N.kak(e.hqStr, e.market);
                r = d(a, null, o, null)
            }
            t.isFunc(n) && n(r)
        }
    };
    return c
});;

xh5_define("utils.painter", ["utils.util", "cfgs.settinger"],
function(t, e) {
    "use strict";
    function n() {
        function e(t) {
            function e(t) {
                o = t.hd || o;
                var e = t.width || n.width || 0,
                i = t.height || n.height || 0,
                s = o;
                switch (n.style.width = e + "px", n.style.height = i + "px", s) {
                case 0:
                    break;
                case 1:
                    s = r.hdpr,
                    e *= s,
                    i *= s;
                    break;
                default:
                    e *= s,
                    i *= s
                }
                n.height = n.width = 0,
                n.height = i,
                n.width = e,
                s && 1 != s && a.scale(s, s)
            }
            this.VER = "2.0.1";
            var n = i("canvas");
            "undefined" != typeof FlashCanvas && FlashCanvas.initElement(n);
            var a = n.getContext("2d"),
            o = 1;
            t && e(t),
            this.canvas = n,
            this.g = a,
            this.resize = e
        }
        function n(n) {
            var i, r, o, s, l, c, d, f, p, m = n.parentObj,
            g = n.ctn,
            v = m.sd,
            b = m.setting,
            N = 0,
            y = b.DIMENSION.H_TIME_PART,
            w = m.nu,
            x = m.fixScale,
            S = 99999,
            T = function() {
                i = new e,
                r = i.canvas,
                o = i.g,
                r.style.position = "absolute",
                r.style.zIndex = 0,
                a.addHandler(r, "touchstart",
                function(t) {
                    b.custom.touch_prevent && a.preventDefault(t)
                }),
                g.appendChild(r)
            },
            _ = function(t) {
                t = t || {},
                s = b.DIMENSION.getStageW(),
                N = isNaN(t.mh) ? N: t.mh,
                l = b.DIMENSION.posX,
                c = b.DIMENSION.RIGHT_W,
                d = b.DIMENSION.K_RIGHT_W,
                f = isNaN(t.h) ? f: t.h,
                y = isNaN(t.eh) ? y: t.eh,
                i.resize({
                    width: s,
                    height: f + y + N,
                    hd: b.PARAM.getHd()
                }),
                o.font = b.STYLE.FONT_SIZE + "px " + b.STYLE.FONT_FAMILY
            },
            k = function(t, e, n, i) {
                t = ~~ (t + .5),
                t -= .5,
                e = ~~ (e + .5),
                e -= .5,
                n = ~~ (n + .5),
                n -= .5,
                o.beginPath(),
                i ? (o.moveTo(t, n), o.lineTo(e, n)) : (o.moveTo(n, t), o.lineTo(n, e)),
                o.stroke()
            },
            C = function(t, e) {
                var n;
                return x ? n = isNaN(e) ? 0 > t ? Math.floor(t) : Math.ceil(t) : t.toFixed(e) : (t = (1e4 * t).toFixed(0), n = t / 1e4, n > S && (n = Math.floor(n))),
                n
            },
            A = new
            function() {
                var e, n, i, r, a, h = 4,
                d = v.futureTime || window["kke_future_" + v.symbol],
                p = function() {
                    if (! (v.business || !isNaN(b.custom.mini_threshold.height) && f < b.custom.mini_threshold.height)) {
                        var e = b.DIMENSION.extend_draw,
                        n = l;
                        e ? (o.textAlign = "left", o.textBaseline = "top") : o.textAlign = "right",
                        o.fillStyle = b.COLOR.T_N,
                        o.strokeStyle = b.COLOR.GRID,
                        b.DIMENSION.getStageH() < 0 && "TFLOW" == v.name && (v.labelPriceCount = 4),
                        !v.isSC && b.DIMENSION.h_t < 150 && (v.labelPriceCount = 2);
                        for (var i, r, a, u, h, d = v.labelMaxP,
                        p = w ? t.strUtil.nu(d) : null, m = v.labelMinP, g = v.labelPriceCount, y = b.DIMENSION.posX, x = d - m, T = f / g, _ = 0; g >= _; _++) {
                            h = _ * T + N,
                            o.fillStyle = b.COLOR.T_N,
                            a = d - _ * x / g,
                            a > 0 ? o.fillStyle = b.COLOR.T_RISE: 0 > a && (o.fillStyle = b.COLOR.T_FALL),
                            e ? _ == g && (o.textBaseline = "bottom") : o.textBaseline = 0 == _ ? "top": _ == g ? "bottom": "middle";
                            var A;
                            if (v.isCompare) {
                                if (v.dAdd <= 1) a *= 100,
                                u = a.toFixed(2),
                                u += "%",
                                o.fillText(u, y, h),
                                o.fillText(u, y + b.DIMENSION.w_t + o.measureText(u).width, h);
                                else {
                                    A = v.datas[0][0].prevclose;
                                    var D, O = a;
                                    O *= 100,
                                    D = O.toFixed(2),
                                    D += "%",
                                    e ? o.fillText(D, b.DIMENSION.w_t - o.measureText(D).width, h) : o.fillText(D, y + b.DIMENSION.w_t + o.measureText(D).width, h),
                                    a = a * A + A,
                                    u = a.toFixed(2),
                                    o.fillText(u, y, h)
                                }
                                k(n, s - c, h, !0)
                            } else {
                                if (v.isSC) if (o.fillStyle = b.COLOR.K_P, w) {
                                    var P = v.name && "TFLOW" == v.name ? 2 : 0;
                                    a /= p[0],
                                    0 == _ || _ == g ? (u = _ >= g ? p[1] : C(a, P), ("NaN" == u || "" == u) && (u = 0)) : u = ""
                                } else u = 0 == _ || _ == g ? a.toFixed(1 > m ? 4 : 2) : 0,
                                0 == u && 0 != _ && _ != g && (u = "");
                                else {
                                    if (b.DIMENSION.h_t < 0) return;
                                    A = v.datas[0][0].prevclose;
                                    var M = "HK" == v.market ? 3 : 4,
                                    R = 1 > m ? M: v.nfloat || 2;
                                    "HF" == t.market(v.symbol) && (3 > m ? R = 4 : 99 > m && (R = 3)),
                                    u = Math.abs(a) > S ? Math.floor(a) : a.toFixed(R),
                                    i = 100 * (a - A) / A,
                                    o.fillStyle = i > 0 ? b.COLOR.T_RISE: 0 > i ? b.COLOR.T_FALL: b.COLOR.T_N,
                                    r = isNaN(i) ? "--%": i.toFixed(2) + "%",
                                    e ? o.fillText(r, y + b.DIMENSION.w_t - o.measureText(r).width, h) : o.fillText(r, y + b.DIMENSION.w_t + o.measureText(r).width, h)
                                }
                                o.fillText(u, y, h),
                                k(n, s - c, h, !0)
                            }
                        }
                    }
                },
                g = function(e, n) {
                    var i = v && t.market(v.symbol),
                    r = b.DIMENSION.w_t;
                    "HK" == i && 415 > r && !n || k(N, f + N, e, !1)
                },
                y = function(t, n, i, r, a) {
                    if (e = t, m.dt) {
                        var s = o.measureText(n).width,
                        l = 0;
                        if (l = 0 == i ? 0 : i == r - 1 ? -s: -s / 2, 0 == r && (l = a / 2 - s / 2), v.business) {
                            o.font = "14px " + b.STYLE.FONT_FAMILY;
                            var u = 10; (0 == i || i == r - 1) && o.fillText(n, t + l, N + f + b.STYLE.FONT_SIZE + 2 + u)
                        } else o.fillText(n, t + l, N + f + b.STYLE.FONT_SIZE + 2)
                    }
                },
                x = function(t) {
                    var e = t.replace("nf_", "").replace(/[\d]+$/, "");
                    return "TF" == e || "T" == e ? "CFF": "NF"
                },
                T = 30,
                A = "ignore",
                D = "ignoreT",
                O = function() {
                    var e, o = v && t.market(v.symbol);
                    switch (o) {
                    case "US":
                        h = 7;
                        break;
                    case "HK":
                        h = 5;
                        break;
                    case "NF":
                    case "HF":
                        h = 0;
                        break;
                    default:
                        h = 4
                    }
                    if (!n) {
                        switch (o) {
                        case "HF":
                            n = t.tUtil.gata(o, d && d.time || [["06:00", "23:59"], ["00:00", "05:00"]]);
                            break;
                        case "NF":
                            n = t.tUtil.gata(o, d && d.time || [["09:00", "23:29"], ["13:00", "02:59"]]);
                            break;
                        default:
                            n = t.tUtil.gata(o)
                        }
                        for ("CFF" == x(v.symbol) && (T = 15), i = [], e = 0; e < n.length; e += T) i.push(n[e]);
                        var s = n[n.length - 1].split(":")[1];
                        "00" != s && "30" != s && i.push(n[n.length - 1])
                    }
                    r = [],
                    a = [];
                    var l = b.DIMENSION.w_t,
                    u = 370,
                    c = 70,
                    f = 35,
                    p = l / i.length,
                    g = 0,
                    N = 0;
                    if (m.dt && "HK" == o) {
                        var y = v.hq.time;
                        m.dt && y > "15:59" && (y > "16:09" && (y = "16:09"), i[i.length - 1] = y),
                        u = 415
                    }
                    for (e = 0; e < i.length; e++) 0 == e || e == i.length - 1 ? (r.push(i[e]), a.push(D)) : e == h ? (r.push(i[e]), a.push(i[e])) : u > l ? r.push(A) : e > 0 && h > e ? p * (e - g) > c && p * (h - e) > c ? (r.push(i[e]), g = e) : r.push(A) : (h > g && (g = h), p * (e - g) > c && p * (i.length - 1 - e) > c ? (r.push(i[e]), g = e) : r.push(A)),
                    0 != e && e != h && e != i.length - 1 && (e > 0 && h > e ? p * (e - N) > f && p * (h - e) > f ? (a.push(i[e]), N = e) : a.push(D) : (h > N && (N = h), p * (e - N) > f && p * (i.length - 1 - e) > f ? (a.push(i[e]), N = e) : a.push(D)));
                    switch (o) {
                    case "NF":
                        d && ("21:00" != d.time[0][0] ? h = 15 == T ? b.DIMENSION._w <= 550 ? 9 : 0 : 5 : u > l && (h = Math.floor(a.length / 2))),
                        r[r.length - 1] = 30 == T ? "15:00": "15:15";
                        var w = i[h].split(":");
                        59 == w[1] && (i[h] = Number(w[0]) + 1 + ":00"),
                        r[h] = i[h];
                        break;
                    case "HF":
                        u > l && (h = Math.floor(a.length / 2)),
                        r[h] = i[h]
                    }
                },
                P = function() {
                    var n = b.DIMENSION.w_t;
                    if (isNaN(b.custom.mini_threshold.width) || !(n < b.custom.mini_threshold.width)) {
                        o.textBaseline = "bottom",
                        o.textAlign = "left",
                        o.strokeStyle = b.COLOR.TIME_L,
                        o.fillStyle = b.COLOR.TIME_S,
                        e = l;
                        var s = v.datas,
                        c = s.length,
                        d = v && t.market(v.symbol),
                        f = i.length,
                        p = 1;
                        "NF" == d && "CFF" == x(v.symbol) && (p = 2);
                        var N = n / Math.max(f - p, 5),
                        w = l,
                        S = 550;
                        if (b.DIMENSION.getStageH() < 0 && (m.dt = !0), m.dt) {
                            var T;
                            if (1 == c || c > 6) for (T = 0; f > T; T++) r[T] !== A && y(w, r[T], T, f),
                            "HF" == d || "NF" == d ? r[T] !== A && (T == h ? g(w, h) : g(w)) : v.business || a[T] !== D && (T == h ? g(w, h) : g(w)),
                            w += N;
                            else if (6 > c) for (N = n / c, T = 0; c > T; T++) b.DIMENSION._w < S ? y(w, u.ds(s[T][0].date, "/", !1, !0, !1, !1), T, 0, N) : y(w, u.ds(s[T][0].date, "/") + "/" + u.nw(s[T][0].date.getDay()), T, 0, N),
                            0 != T && g(w),
                            w += N
                        }
                    }
                };
                this.drawFrames = function() {
                    _(),
                    O(),
                    P(),
                    p()
                }
            },
            D = new
            function() {
                this.iOffsetX = 0;
                var e, n, i, r, a, u = this,
                c = 0,
                g = 22,
                y = 99,
                x = function(t, e, n) {
                    if (isNaN(n)) {
                        if (c + y >= t || t >= s - y) return;
                        k(N + 1, f + N, t, !1)
                    }
                    if (c = t, m.dt) {
                        var i, r = f + N + b.STYLE.FONT_SIZE + 3;
                        switch (n) {
                        case 1:
                            o.fillText(e, t, r);
                            break;
                        case 2:
                            i = o.measureText(e).width,
                            o.fillText(e, t - i, r);
                            break;
                        case 3:
                            break;
                        default:
                            i = o.measureText(e).width,
                            o.fillText(e, t - (i >> 1), r)
                        }
                    }
                },
                S = function() {
                    var e = b.DIMENSION.w_k;
                    if (isNaN(b.custom.mini_threshold.width) || !(e < b.custom.mini_threshold.width)) {
                        o.textBaseline = "bottom",
                        o.textAlign = "left",
                        o.strokeStyle = b.COLOR.TIME_L,
                        o.fillStyle = b.COLOR.TIME_S,
                        c = l;
                        var n, i = v.datas,
                        r = i.length;
                        switch (p) {
                        case h.URLHASH.KMS:
                            n = "sec";
                            break;
                        case h.URLHASH.K1:
                            n = "h";
                            break;
                        case h.URLHASH.K5:
                        case h.URLHASH.K15:
                        case h.URLHASH.K30:
                        case h.URLHASH.K60:
                        case h.URLHASH.K240:
                            n = 60 / p * 24 > r ? "h": "d";
                            break;
                        case h.URLHASH.KD:
                        case h.URLHASH.KDF:
                        case h.URLHASH.KDB:
                        case h.URLHASH.KCL:
                        case h.URLHASH.KCLF:
                        case h.URLHASH.KCLB:
                            n = r > 300 ? "y": 28 > r ? "w": "m";
                            break;
                        default:
                            n = r > 300 ? "y": "m"
                        }
                        for (var a, s, d, f, m, N, w = e / Math.max(r, b.PARAM.minCandleNum), S = u.iOffsetX + l + .6 * w, T = e / y, _ = e / (w * g), k = Math.ceil(_ / T), C = 0, A = 0, D = -1, O = -1, P = -1, M = -1, R = -1, I = 0; r > I; I++) if (N = i[I], m = N.date, s = m.getMonth(), a = m.getFullYear(), 0 != I) if (I >= r - 1) x(S + w / 2, a + "/" + (s + 1) + "/" + m.getDate(), r >= b.PARAM.minCandleNum ? 2 : 3);
                        else {
                            switch (n) {
                            case "sec":
                                var F = m.getSeconds();
                                F != M && (F = t.strUtil.zp(F), f = t.strUtil.zp(m.getMinutes()), d = t.strUtil.zp(m.getHours()), x(S, d + ":" + f + ":" + F)),
                                M = Number(F);
                                break;
                            case "min":
                                f = m.getMinutes(),
                                f != P && (f = t.strUtil.zp(f), d = t.strUtil.zp(m.getHours()), x(S, d + ":" + f)),
                                P = Number(f);
                                break;
                            case "h":
                                d = m.getHours(),
                                d != O && (f = t.strUtil.zp(m.getMinutes()), x(S, d + ":" + f)),
                                O = d;
                                break;
                            case "d":
                                var E = m.getDate();
                                E != C && x(S, a + "/" + (s + 1) + "/" + E),
                                C = E;
                                break;
                            case "w":
                                var L = m.getDay();
                                R > L && x(S, s + 1 + "/" + m.getDate()),
                                R = L;
                                break;
                            default:
                            case "m":
                                s == D || s % k || x(S, a + "/" + (s + 1)),
                                D = s;
                                break;
                            case "y":
                                a != A && x(S, a),
                                A = a
                            }
                            S += w
                        } else x(l, a + "/" + (s + 1) + "/" + m.getDate(), 1)
                    }
                },
                T = 37,
                A = function() {
                    o.fillStyle = b.COLOR.K_PCT,
                    o.textBaseline = "top",
                    o.textAlign = "right";
                    for (var t, e, n = v.nfloat || 2,
                    i = v.prevclose,
                    r = v.labelPriceCount,
                    a = 0,
                    l = f / r,
                    u = v.labelMaxP,
                    c = v.labelMinP,
                    m = u - c; r >= a; a++) if (! (T > l && 1 & a)) {
                        e = a * l + N,
                        0 == a && e++,
                        t = u - a * m / r,
                        a == r && (o.textBaseline = "bottom");
                        var g;
                        p === h.URLHASH.KMS || p === h.URLHASH.K1 ? (g = ((t - i) / i * 100).toFixed(n) + "%", o.fillStyle = t > i ? b.COLOR.K_MS_RISE: i > t ? b.COLOR.K_MS_FALL: b.COLOR.K_MS_N) : g = Math.round((t - i) / i * 100) + "%",
                        o.fillText(g, s - d, e)
                    }
                },
                D = function() {
                    if (isNaN(b.custom.mini_threshold.height) || !(f < b.custom.mini_threshold.height)) {
                        var e = b.DIMENSION.extend_draw;
                        o.fillStyle = b.COLOR.K_P,
                        o.strokeStyle = b.COLOR.GRID;
                        var n = l;
                        e ? (o.textAlign = "left", o.textBaseline = "top") : o.textAlign = "right";
                        for (var i, r, a, u = v.labelPriceCount,
                        c = 0,
                        m = b.DIMENSION.posX,
                        g = f / u,
                        y = v.labelMaxP,
                        x = v.labelMinP,
                        S = y - x,
                        _ = v.prevclose,
                        D = w ? t.strUtil.nu(y) : null; u >= c; c++) T > g && 1 & c || (r = c * g + N, 0 == c && r++, i = y - c * S / u, v.isCompare && (i *= 100), w ? (i /= D[0], a = c >= u ? D[1] : C(i)) : a = C(i), v.isCompare && (a += "%"), e ? c == u && (o.textBaseline = "bottom") : o.textBaseline = 0 == c ? "top": c == u ? "bottom": "middle", p === h.URLHASH.KMS && _ && (o.fillStyle = i > _ ? b.COLOR.K_MS_RISE: _ > i ? b.COLOR.K_MS_FALL: b.COLOR.K_MS_N), o.fillText(a, m, r), k(n, s - d, r, !0));
                        _ && (v.isCompare || b.custom.show_k_rangepercent && A())
                    }
                };
                this.drawFrames = function(t) { (t || v.datas[0].date != i || v.datas[v.datas.length - 1].date != r || v.labelMaxP != e || v.labelMinP != n || p != a) && (_(), D(), S()),
                    a = v.viewState.viewId,
                    i = v.datas[0].date,
                    r = v.datas[v.datas.length - 1].date,
                    e = v.labelMaxP,
                    n = v.labelMinP
                }
            };
            this.drawBg = function(t, e) {
                v.datas && (p = v.viewState.viewId, b.datas.isT ? A.drawFrames(t) : (isNaN(e) || (D.iOffsetX = e, t = !0), D.drawFrames(t)))
            },
            this.respos = function(t) {
                _(t),
                r.style.left = 0,
                r.style.top = b.DIMENSION.posY + "px",
                this.drawBg(!0)
            },
            this.gc = function() {
                t.domGc(r)
            },
            T()
        }
        function d(e) {
            var n, r = e.parentObj,
            u = e.ctn,
            c = r.iMgr,
            h = l(r.iTo, null, u),
            d = r.iClk,
            f = c.globalDragHandler,
            p = c.zoomView,
            m = c.shortClickHandler,
            g = r.setting,
            v = g.PARAM.isFlash,
            b = !v,
            N = !1,
            y = 300,
            w = {
                isM: !1,
                isTch: !1,
                isP: !1,
                tCount: void 0,
                tXOff: -1,
                isPv: !1,
                lastIy: null,
                mDx: 0 / 0,
                mDy: 0 / 0,
                isClk: 0,
                isTMin: !1,
                mvOx: 0,
                vP: function(t) {
                    var e, n;
                    if (t.changedTouches) {
                        a.preventDefault(t),
                        a.stopPropagation(t);
                        var i = a.getTarget(t),
                        r = t.changedTouches[0],
                        o = i.getBoundingClientRect(),
                        s = o.left,
                        l = o.top;
                        e = r.clientX - s,
                        n = r.clientY - l
                    } else e = t.offsetX,
                    isNaN(e) && (e = t.layerX),
                    n = t.offsetY,
                    isNaN(n) && (n = t.layerY);
                    h(e, n, t)
                },
                vH: function(t) {
                    if (! (this.isClk > 0) && g.custom.allow_move) {
                        a.preventDefault(t),
                        a.stopPropagation(t);
                        var e = t.changedTouches ? t.changedTouches[0].pageX: t.layerX;
                        isNaN(e) && (e = t.offsetX);
                        var n = t.changedTouches ? t.changedTouches[0].pageY: t.layerY;
                        isNaN(n) && (n = t.offsetY),
                        f(this.mDx, e, this.mDy, n)
                    }
                },
                mD: function(t) {
                    this.mDx = isNaN(t.layerX) ? t.offsetX: t.layerX,
                    this.mDy = isNaN(t.layerY) ? t.offsetY: t.layerY,
                    this.isM = this.isP = !0,
                    this.isClk = 2,
                    T(!0)
                },
                mM: function(t) {
                    this.isTch || (N = !0, this.isClk--, this.isP ? this.vH(t) : this.vP(t))
                },
                mU: function(t) {
                    this.mDx = 0 / 0,
                    this.mDy = 0 / 0,
                    this.isM = this.isP = !1,
                    f(0 / 0, 0 / 0, 0 / 0, 0 / 0, t),
                    this.isClk > 0 && d && (this.isClk = 0, d()),
                    T(!1)
                },
                mO: function() {
                    this.isClk = 0,
                    this.isM = this.isP = N = !1,
                    h(0 / 0, 0 / 0),
                    T(!1)
                },
                tR: function() {
                    clearTimeout(this.tCount),
                    this.isPv = this.isTMin = !1
                },
                gR: function() {
                    this.tR(),
                    this.tXOff = -1
                },
                tCheck: function(t) {
                    this.mvOx = t.touches[0].pageX;
                    var e = this;
                    e.isClk = 2,
                    this.tCount = setTimeout(function() {
                        e.isPv = !0,
                        e.vP(t),
                        e.isClk = 0
                    },
                    y)
                },
                tE: function(t) {
                    a.preventDefault(t),
                    this.isPv || m(),
                    this.tR(),
                    this.isTch = N = !1,
                    this.mDx = 0 / 0,
                    this.mDy = 0 / 0,
                    h(0 / 0, 0 / 0),
                    f(0 / 0, 0 / 0, 0 / 0, 0 / 0, t),
                    this.isClk > 0 && d && (this.isClk = 0, d())
                },
                tM: function(t) {
                    if (this.isClk--, 1 == t.touches.length) {
                        if (!this.isPv && !this.isTMin && Math.abs(this.mvOx - t.touches[0].pageX) < 5) return;
                        this.isTMin = !0,
                        clearTimeout(this.tCount),
                        this.isPv ? this.vP(t) : this.vH(t)
                    } else if (2 == t.touches.length) {
                        a.preventDefault(t);
                        var e = t.touches[0],
                        n = t.touches[1];
                        if (this.tXOff >= 0) {
                            var i = Math.abs(e.pageX - n.pageX);
                            if (i != this.tXOff) {
                                var r = a.getTarget(t),
                                o = s.pageX(r),
                                l = e.pageX - o,
                                u = n.pageX - o;
                                p(i < this.tXOff, [l, u])
                            }
                        }
                        this.tXOff = Math.abs(e.pageX - n.pageX)
                    }
                },
                tS: function(t) {
                    switch (this.tR(), g.custom.touch_prevent && a.preventDefault(t), this.isTch = N = !0, this.lastIy = t.touches[0].pageY, this.mDx = t.changedTouches[0].pageX, this.mDy = t.changedTouches[0].pageY, t.touches.length) {
                    case 1:
                        this.tCheck(t);
                        break;
                    case 2:
                        this.gR()
                    }
                },
                handleEvent: function(t) {
                    if (g.custom.mouse_and_touch) switch (t.type) {
                    case "mouseup":
                        this.mU(t);
                        break;
                    case "mousedown":
                        this.mD(t);
                        break;
                    case "mouseout":
                        this.mO();
                        break;
                    case "mousemove":
                        this.mM(t);
                        break;
                    case "touchend":
                        this.tE(t);
                        break;
                    case "touchmove":
                        this.tM(t);
                        break;
                    case "touchstart":
                        this.tS(t)
                    }
                }
            },
            x = new
            function() {
                this.onmouseup = function(t) {
                    g.custom.mouse_and_touch && w.mU(t)
                },
                this.onmousedown = function(t) {
                    g.custom.mouse_and_touch && w.mD(t)
                },
                this.onmouseout = function() {
                    g.custom.mouse_and_touch && w.mO()
                },
                this.onmousemove = function(t) {
                    g.custom.mouse_and_touch && w.mM(t)
                }
            },
            S = function() {
                b ? n = i("canvas") : (n = i("div"), n.style.backgroundColor = "#eee", n.style.opacity = 0, n.style.filter = "alpha(opacity=0)"),
                n.style.position = "absolute",
                n.style.zIndex = g.PARAM.I_Z_INDEX;
                var t;
                o.istd ? t = ["touchend", "touchmove", "touchstart"] : (t = ["mousedown", "mouseup", "mousemove", "mouseout"], o.allowt && (t = t.concat(["touchend", "touchmove", "touchstart"])));
                for (var e = t.length; e--;) b ? a.addHandler(n, t[e], w) : a.addHandler(n, t[e], x["on" + t[e]] ||
                function() {});
                u.appendChild(n)
            },
            T = function(t) {
                t ? (n.style.cursor = "grabbing", n.style.cursor = "-webkit-grabbing") : n.style.cursor = "default"
            };
            this.respos = function(t) {
                n.style.top = g.DIMENSION.posY + t.mh + "px",
                n.style.left = g.DIMENSION.posX + "px";
                var e;
                e = g.datas.isT ? g.DIMENSION.w_t: g.DIMENSION.w_k,
                n.style.width = e + "px",
                n.style.height = t.h + "px"
            },
            this.gc = function() {
                t.domGc(n)
            },
            S()
        }
        function f(e) {
            this.VER = "2.2.6",
            e = c({
                setting: void 0,
                sd: void 0,
                ctn: void 0,
                reO: void 0,
                withHBg: !1,
                nu: !1,
                dt: !0,
                fixScale: !0,
                iTo: function() {},
                iMgr: void 0,
                iClk: void 0
            },
            e || {});
            var a, o, s, l, u, h = e.setting,
            f = function() {
                e.ctn ? a = e.ctn: (a = i("div"), a.style.position = "relative")
            },
            p = function() {
                o = i("canvas"),
                "undefined" != typeof FlashCanvas && FlashCanvas.initElement(o),
                o.style.position = "absolute",
                o.style.zIndex = h.PARAM.G_Z_INDEX,
                s = o.getContext("2d"),
                a.appendChild(o)
            },
            m = function() {
                u = new d({
                    parentObj: e,
                    ctn: a
                })
            },
            g = function() {
                l = new n({
                    parentObj: e,
                    ctn: a
                })
            },
            v = function(t) {
                t = t || {};
                var e, n, i = isNaN(t.mh) ? h.DIMENSION.H_T_T: t.mh,
                s = isNaN(t.eh) ? h.DIMENSION.H_TIME_PART: t.eh,
                c = h.PARAM.getHd();
                switch (e = h.datas.isT ? h.DIMENSION.w_t: h.DIMENSION.w_k, n = isNaN(t.h) ? h.DIMENSION.h_k: t.h, t.h = n, t.mh = i, t.eh = s, a.style.height = n + i + s + "px", o.style.top = h.DIMENSION.posY + i + "px", o.style.left = h.DIMENSION.posX + "px", o.style.width = e + "px", o.style.height = n + "px", c) {
                case 0:
                    break;
                case 1:
                    c = r.hdpr,
                    e *= c,
                    n *= c;
                    break;
                default:
                    e *= c,
                    n *= c
                }
                o.width = e,
                o.height = n,
                u && u.respos(t),
                l && l.respos(t)
            };
            this.resize = v,
            this.getCanvas = function() {
                return o
            },
            this.getG = function() {
                return s
            },
            this.getWrap = function() {
                return a
            };
            var b;
            this.scale = function(t) {
                switch (t) {
                case 0:
                    return;
                case 1:
                    t = r.hdpr
                }
                t && s.scale(t, t)
            },
            this.newGStyle = function(t) {
                for (var e in t) t.hasOwnProperty(e) && (s[e] = t[e])
            },
            this.newStyle = function(t, e, n) {
                b = s.strokeStyle = t,
                e && s.beginPath(),
                n && (s.lineWidth = n)
            },
            this.newFillStyle = function(t, e) {
                if (t && !(t.length < 1)) {
                    var n = t.length;
                    if (1 == n) s.fillStyle = t[0];
                    else if (n > 1) {
                        for (var i = s.createLinearGradient(0, 0, 0, e), r = 0; n > r; r++) i.addColorStop(1 / (n - 1) * r, t[r]);
                        s.fillStyle = i
                    }
                }
            },
            this.newFillStyle_rgba = function(e, n, i) {
                for (var r = s.createLinearGradient(0, 0, 0, n), a = 0, o = e.length; o > a; a++) r.addColorStop(1 / (o - 1) * a, t.hex2dec(e[a], i));
                s.fillStyle = r
            },
            this.clear = function(t, e) {
                o.width = o.width,
                t && (b && s.strokeStyle != b && (s.strokeStyle = b), s.beginPath()),
                this.scale(e)
            },
            this.clearLimit = function(t, e) {
                s.clearRect(t, 0, e, o.height),
                s.beginPath()
            },
            this.beginPath = function() {
                s.beginPath()
            },
            this.closePath = function() {
                s.closePath()
            },
            this.fill = function() {
                s.fill()
            },
            this.stroke = function() {
                s.stroke()
            },
            this.save = function() {
                s.save()
            },
            this.translate = function(t, e) {
                s.translate(t, e)
            },
            this.restore = function() {
                s.restore()
            },
            this.moveTo = function(t, e) {
                s.moveTo(t, e)
            },
            this.lineTo = function(t, e) {
                s.lineTo(t, e)
            },
            this.drawDot = function(t, e, n, i) {
                i && s.moveTo(t, e),
                s.arc(t, e, n, 0, 2 * Math.PI)
            },
            this.arc = function(t, e, n, i, r, a) {
                s.arc(t, e, n, i, r, a)
            },
            this.drawCandleRect = function(t, e, n, i, r, a) {
                if (e != n && !(2 > i)) {
                    var o = n - e;
                    t += .5 * i,
                    i = ~~ (i + .5),
                    t = ~~ (t + .5),
                    e = ~~ (e + .5),
                    o = ~~ (o + .5),
                    s.lineWidth = 1,
                    a ? (t -= .5, e -= .5, s.strokeStyle = r, s.strokeRect(t, e, i, o)) : (1 > o && (o = 1), s.fillStyle = r, s.fillRect(t, e, i, o), t -= .5, e -= .5, s.strokeStyle = r, s.strokeRect(t, e, i, o))
                }
            },
            this.drawCandleRect_solid = function(t, e, n, i, r) {
                if (e != n && !(2 > i)) {
                    var a = n - e;
                    t += .5 * i,
                    i = ~~ (i + .5),
                    t = ~~ (t + .5),
                    e = ~~ (e + .5),
                    a = ~~ (a + .5),
                    s.lineWidth = 1,
                    s.fillStyle = r,
                    s.fillRect(t, e, i, a),
                    t -= .5,
                    e -= .5,
                    s.strokeStyle = r,
                    s.strokeRect(t, e, i, a)
                }
            },
            this.drawCandleLineRect = function(t, e, n, i, r, a, o, l) {
                if (t += a, t = ~~ (t + .5), s.strokeStyle = o, s.lineWidth = 1, n == i) {
                    var u = .5 * a;
                    u = ~~ (u + .5),
                    .5 > u && (u = .5),
                    n = ~~ (n + .5),
                    n -= .5,
                    s.moveTo(t - u, n),
                    s.lineTo(t + u, n)
                }
                if (e != r) {
                    if (t -= .5, s.moveTo(t, e), l && a >= 2) {
                        var c = Math.min(n, i),
                        h = Math.max(n, i);
                        s.lineTo(t, c),
                        s.moveTo(t, h)
                    }
                    s.lineTo(t, r)
                }
            },
            this.drawOhlc = function(t, e, n, i, r, a, o) {
                s.strokeStyle = o,
                s.lineWidth = 1;
                var l = .5 * a;
                l = ~~ (l + .5),
                .5 > l && (l = .5),
                t += a,
                t = ~~ (t + .5),
                e = ~~ (e + .5),
                e -= .5,
                s.moveTo(t - l, e),
                s.lineTo(t, e),
                r = ~~ (r + .5),
                r -= .5,
                s.moveTo(t, r),
                s.lineTo(t + l, r),
                t -= .5,
                s.moveTo(t, n),
                s.lineTo(t, i)
            },
            this.drawVStickC = function(t, e, n, i, r) {
                t += n,
                n = ~~ (n + .5),
                1 > n && (n = 1),
                t = ~~ (t + .5),
                1 & n && (t -= .5),
                e = ~~ (e + .5),
                i = ~~ (i - .5),
                s.strokeStyle = r,
                s.lineWidth = n,
                s.moveTo(t, e),
                s.lineTo(t, e + i)
            },
            this.drawVStickRect = function(t, e, n, i, r, a) {
                t += .5 * n;
                var o = n;
                t = ~~ (t + .5),
                o = ~~ (o + .5),
                e = ~~ (e + .5),
                i = ~~ (i + .5),
                0 == i && (i = 1),
                a ? (.5 > o && (o = .5), s.fillStyle = r, s.fillRect(t, e, o, i)) : (t -= .5, e -= .5, s.strokeStyle = r, s.strokeRect(t, e, o, i))
            },
            this.drawBg = function(t) {
                l && l.drawBg(!1, t)
            },
            this.remove = function() {
                t.domGc(o),
                u && u.gc(),
                l && l.gc()
            },
            f(),
            p(),
            e.withHBg && (m(), g()),
            v(e.reO)
        }
        this.xh5_ibPainter = f,
        this.xh5_Canvas = e
    }
    var i = t.$C,
    r = t.xh5_BrowserUtil,
    a = t.xh5_EvtUtil,
    o = t.xh5_deviceUtil,
    s = t.xh5_HtmlPosUtil,
    l = t.fBind,
    u = t.dateUtil,
    c = t.oc,
    h = e.globalCfg;
    return n
});;