

"use strict";


function escapeRegExp(a) {
    return a.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1")
}
function random() {
    return (new Date).getTime()
}
//获取脚本，然后插入到script中去
//a = "http://hq.sinajs.cn/rn=1490439732511&list=sz000651", b = function (), c = undefined
function getScript(a, b, c) {
    var e, f, d = document.createElement("script");
    d.type = "text/javascript";
    c && (d.charset = c);
    d.src = a;
    e = document.getElementsByTagName("head")[0];
    f = !1;
    d.onload = d.onreadystatechange = function() {
        if (! (f || this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState)) {
            f = !0;
            b && b();
			
            d.onload = d.onreadystatechange = null;
			//读入到内容中之后，马上删除
            setTimeout(function() {
                e.removeChild(d)
            },
            1)
        }
    };
    e.appendChild(d)
}
function checkUD(a, b) {
    var c = void 0 !== b ? b: a.change;
    return c > 0 ? window.UPCOLOR || "up": 0 > c ? window.DOWNCOLOR || "down": window.FLATCOLOR || "flat"
}
function merge(a, b) {
    for (var c in b) a[c] = "object" == typeof a[c] && "object" == typeof b[c] ? arguments.callee(b[c], a[c]) : b[c];
    return a
}
var hqParser, clock;
//a = null, b = [Array(1), callee: function, Symbol(Symbol.iterator): function]
Function.prototype.fnBind || (Function.prototype.fnBind = function(a, b) {
	//c = function _got(argCall)
    var c = this;
    return function() {
        var d, e;
		//b = [Array(1), callee: function, Symbol(Symbol.iterator): function]
        if (b && arguments.length) {
            d = Array.prototype.slice.call(b, 0);
			//c = function _got(argCall), a = null, b = [Array(1), callee: function, Symbol(Symbol.iterator): function]
            for (e = 0; e < arguments.length; e++) Array.prototype.push.call(d, arguments[e])
        }
        return c.apply(a || this, d || b || arguments)
    }
});
Function.prototype.bindArg || (Function.prototype.bindArg = function() {
    return this.fnBind(null, arguments)
});
Number.prototype.toFixed = function(a) {
    var d, b = Math.floor(this * Math.pow(10, a)) + .5,
    c = 0 > b ? "-": "";
    b = Math.abs(b);
    Math.abs(this) * Math.pow(10, a) - b >= -.5 * Math.pow(10, -14 + a) ? b += .5 : b -= .5;
    b += "";
    if (0 == a) return c + b;
    b = b.split("");
    if (b.length <= a) {
        for (d = b.length; a > d; d++) b.unshift("0");
        b.unshift(".");
        b.unshift("0")
    } else b.splice(b.length - a, 0, ".");
    return c + b.join("")
};
String.prototype.toFixed = function(a) {
    return isNaN(1 * this) ? this.toString() : (1 * this).toFixed(a)
};
String.prototype.format = function(a) {
    var b, c, d, e, f;
    a = a || ",";
    b = this + "";
    if ("number" != typeof(1 * b)) return b;
    c = "";
    d = "";
    if (b.indexOf("-") > -1) {
        d = "-";
        b = b.replace("-", "")
    }
    if (b.indexOf(".") > -1) {
        e = b.split(".");
        b = e[0];
        c = "." + e[1]
    }
    if (b.length > 3) {
        b = b.replace(/\d{3}$/,
        function(a) {
            f = "," + a;
            return ""
        });
        return d + arguments.callee.apply(b, arguments) + f + c
    }
    return d + b + c
};
Number.prototype.format = function() {
    return String.prototype.format.apply(this + "", arguments)
};
String.prototype.preFull = function(a, b) {
    var c = this.toString();
    a = a || 2;
    b = b || "0";
    for (; c.length < a;) c = b + c;
    return c
};
Number.prototype.preFull = function(a, b) {
    return (this + "").preFull(a, b)
};
if (!window.Cookie) {
    window.Cookie = {};
    Cookie.get = function(a) {
        var b = document.cookie.match("(?:^|;)\\s*" + escapeRegExp(a) + "=([^;]*)");
        return b ? b[1] || "": ""
    };
    Cookie.set = function(a, b, c) {
        var d, e, f, g, h;
        c = c || {};
        if (null === b) {
            b = "";
            c.expires = -1
        }
        d = "";
        if (c.expires && (1 * c.expires || c.expires.toUTCString)) {
            if (1 * c.expires) {
                e = new Date;
                e.setTime(e.getTime() + 1e3 * 60 * 60 * 24 * c.expires)
            } else e = c.expires;
            d = "; expires=" + e.toUTCString()
        }
        f = c.path ? "; path=" + c.path: "";
        g = c.domain ? "; domain=" + c.domain: "";
        h = c.secure ? "; secure": "";
        document.cookie = [a, "=", b, d, f, g, h].join("")
    }
}
hqParser = new
function() {
    function a(a, b) {
        var c, d, e;
        if (!a) {
            c = {};
            c.enName = c.name = c.open = c.preClose = c.low = c.high = c.now = c.change = c.changeP = c.buy = c.sell = c.volume = c.amount = c.pe = c.income = c.high52 = c.low52 = c.low52 = c.date = c.time = c.swing = "--";
            return c
        }
        d = a.split(",");
        e = {};
        if (b) if (b.indexOf("hk") > -1) {
            e.symbol = b;
            e.sym = b.replace("hk", "")
        } else {
            e.symbol = "hk" + b;
            e.sym = b
        }
        e.enName = d[0];
        e.name = d[1];
        e.open = 1 * d[2];
        e.preClose = 1 * d[3];
        e.high = 1 * d[4];
        e.low = 1 * d[5];
        e.now = 1 * d[6];
        e.change = 1 * d[7];
        e.changeP = 1 * d[8];
        e.buy = 1 * d[9];
        e.sell = 1 * d[10];
        e.volume = 1 * d[12];
        e.amount = 1 * d[11];
        e.pe = 1 * d[13];
        e.pe = e.pe || "--";
        e.income = 1 * d[14];
        e.income = e.income || "--";
        e.high52 = 1 * d[15];
        e.low52 = 1 * d[16];
        e.date = d[17];
        e.time = d[18];
        if (!e.open) {
            e.open = "--";
            if (!e.now) {
                e.high = "--";
                e.low = "--"
            }
        }
        if (!e.now) {
            e.change = "--";
            e.changeP = "--"
        }
        if (e.preClose) {
            e.swing = 100 * ((e.high - e.low) / e.preClose);
            e.swing = isNaN(e.swing) ? "--": e.swing
        } else {
            e.preClose = "--";
            e.swing = "--"
        }
        return e
    }
    function b(a, b) {
        var c, d, e, f;
        if (!a) {
            c = {};
            c.enName = c.name = c.open = c.preClose = c.low = c.high = c.now = c.change = c.changeP = c.buy = c.sell = c.volume = c.amount = c.pe = c.income = c.high52 = c.low52 = c.low52 = c.date = c.time = c.swing = "--";
            return c
        }
        d = a.split(",");
        e = {};
        b && (e.sym = b);
        e.name = d[0];
        e.now = 1 * d[1];
        e.changeP = 1 * d[2];
        e.updateTime = d[3];
        e.change = 1 * d[4];
        e.open = 1 * d[5];
        e.high = 1 * d[6];
        e.low = 1 * d[7];
        e.high52 = 1 * d[8];
        e.low52 = 1 * d[9];
        e.volume = 1 * d[10];
        e.averageVolume = 1 * d[11];
        e.totalShare = 1 * d[12];
        e.eps = 1 * d[13];
        e.pe = 1 * d[14];
        e.pe = e.pe || "--";
        e.beta = 1 * d[16];
        e.dividend = 1 * d[17];
        e.dividend = e.dividend || "--";
        e.income = 1 * d[18];
        e.income = e.income || "--";
        e.shares = 1 * d[19];
        e.hourTradingPrice = 1 * d[21];
        e.hourTradingChangeP = 1 * d[22];
        e.hourTradingChange = 1 * d[23];
        e.hourTradingDateTime = d[24];
        f = d[24].split(" ");
        e.hourTradingDate = f[0] + " " + f[1];
        e.hourTradingTime = f[2] || "";
        e.dateTime = d[25];
        f = d[25].split(" ");
        e.date = f[0] + " " + f[1];
        e.time = f[2];
        e.preClose = 1 * d[26];
        e.hourTradingVolume = 1 * d[27];
        if (!e.open) {
            e.open = "--";
            e.high = "--";
            e.low = "--"
        }
        if (! (e.now && "--" != e.open || e.change)) {
            e.change = "--";
            e.changeP = "--"
        }
        if (e.preClose) {
            e.swing = 100 * ((e.high - e.low) / e.preClose);
            e.swing = isNaN(e.swing) ? "--": e.swing
        } else {
            e.preClose = "--";
            e.swing = "--"
        }
        return e
    }
	//a = "格力电器,31.360,31.200,31.540,32.680,31.290,31.530,31.540,128281355,4089320722.160,438240,
    function c(a, b) {
        var c, d, e, f, g;
        if (!a) {
            c = {};
            c.enName = c.name = c.open = c.preClose = c.low = c.high = c.now = c.change = c.changeP = c.buy = c.sell = c.volume = c.amount = c.pe = c.income = c.high52 = c.low52 = c.low52 = c.date = c.time = c.swing = "--";
            return c
        }
		//d = Array(33), a = "格力电器,31.360,31.200,31.540,32.680,31.290,31.530,31.540,128281355,408
        d = a.split(",");
        e = {};
        if (b) if (b.indexOf("s") > -1) {
            e.symbol = b; //e = Object {symbol: "sz000651", sym: "000651"}
            e.sym = b.replace(/s[hz]/, "")
        } else {
            e.sym = b;
            f = b.charAt(0);
            "69".indexOf(f) > -1 && (e.symbol = "sh" + b);
            "023".indexOf(f) > -1 && (e.symbol = "sz" + b)
        }
		//股票的一些基本信息
        e.name = d[0];
        e.open = 1 * d[1];
        e.preClose = 1 * d[2];
        e.now = 1 * d[3];
        e.high = 1 * d[4];
        e.low = 1 * d[5];
        e.buy = 1 * d[6];
        e.sell = 1 * d[7];
        e.volume = 1 * d[8];
        e.symbol && /^(sh000|sh580)\d*/.test(e.symbol) && (e.volume *= 100);
        e.amount = 1 * d[9];
        e.date = d[30];
        e.time = d[31];
        e.status = d[32];
        g = {
            "00": "",
            "01": "临停1H",
            "02": "停牌",
            "03": "停牌",
            "04": "临停",
            "05": "停1/2",
            "07": "暂停",
            "-1": "无记录",
            "-2": "未上市",
            "-3": "退市"
        };
        e.statusWord = "00" == e.status || e.buy || e.sell ? "": g[e.status];
        "02" != e.status && "03" != e.status || e.buy || e.sell || (e.stopDay = !0);
        e.change = e.now - e.preClose;
        e.changeP = 100 * (e.change / e.preClose);
        if (!e.open) {
            e.open = "--";
            e.high = "--";
            e.low = "--"
        }
        if (!e.now || "--" == e.open) {
            e.change = "--";
            e.changeP = "--"
        }
        if (e.preClose) {
            e.swing = 100 * ((e.high - e.low || 0) / e.preClose);
            e.swing = isNaN(e.swing) ? "--": e.swing
        } else {
            e.preClose = "--";
            e.swing = "--"
        }
        e.now = e.now || e.preClose;
		//返回一个对象，包含股票的一些基本信息
        return e
    }
    function d(a) {
        var c, d, e;
        if (!a) {
            c = {};
            c.enName = c.name = c.open = c.preClose = c.low = c.high = c.now = c.change = c.changeP = c.buy = c.sell = c.volume = c.amount = c.pe = c.income = c.high52 = c.low52 = c.low52 = c.date = c.time = c.swing = "--";
            return c
        }
        d = a.split(",");
        e = {};
        e.name = d[0];
        e.now = 1 * d[1];
        e.change = 1 * d[2];
        e.changeP = 1 * d[3];
        e.time = d[4];
        if (!e.now) {
            e.change = "--";
            e.changeP = "--"
        }
        return e
    }
    function e(a) {
        var c, d, e;
        if (!a) {
            c = {};
            c.enName = c.name = c.open = c.preClose = c.low = c.high = c.now = c.change = c.changeP = c.buy = c.sell = c.volume = c.amount = c.pe = c.income = c.high52 = c.low52 = c.low52 = c.date = c.time = c.swing = "--";
            return c
        }
        d = a.split(",");
        e = {};
        e.now = 1 * d[0];
        e.change = e.now - d[7];
        e.changeP = 1 * d[1];
        if (!e.now) {
            e.change = "--";
            e.changeP = "--"
        }
        return e
    }
    function f(a, b, c) {
        var d = arguments.callee[a];
        return d ? d(a, b, c) : {}
    }
    f.a = c;
    f.b = d;
    f.hk = a;
    f.us = b;
    f.hf = e;
    return f
};
clock = new
function() {
    var c, a = "http://hq.sinajs.cn/?rn=$random&list=sys_time",
    b = [],
    d = /\d{2}:\d{2}:\d{2}/,
    e = !1;
    this.init = function(a) {
        var c, d;
        a = a || [];
        for (d = 0; d < a.length; d++) {
            c = {};
            c.el = document.getElementById(a[d].elID);
            c.diff = 1e3 * 60 * 60 * getGlobalTimezone(a[d].area);
            c.template = a[d].template;
            b.push(c)
        }
        if (e) this.draw();
        else {
            e = !0; (window.hq_str_sys_time || window.StandardBJTime) && this.setTime();
            this.getTime();
            setInterval(this.getTime.fnBind(this), 36e5);
            setInterval(this.draw.fnBind(this), 1e3)
        }
    };
    this.add = function() {};
    this.getTime = function() {
        getScript(a.replace("$random", random()), this.setTime.fnBind(this))
    };
    this.setTime = function() {
        c = 1e3 * (window.hq_str_sys_time || window.StandardBJTime);
        this.draw()
    };
    this.time = function() {
        return new Date(c)
    };
    this.draw = function() {
        var a, e;
        if (c) {
            for (e = 0; e < b.length; e++) {
                a = new Date(c + b[e].diff);
                b[e].el.innerHTML = b[e].template ? b[e].template.replace("YY", a.getFullYear()).replace("Y", (a.getFullYear() % 100).preFull()).replace("MM", (a.getMonth() + 1).preFull()).replace("DD", a.getDate().preFull()).replace("H", a.getHours().preFull()).replace("M", a.getMinutes().preFull()).replace("S", a.getSeconds().preFull()) : a.getMonth() + 1 + "月" + a.getDate() + "日 " + a.toString().match(d)[0]
            }
            c += 1e3
        }
    }
}; !
function() {
    function a(a) {
        return "string" == typeof a ? document.getElementById(a) : a
    }
    var c, b = function(b) {
        function c(a, b, c) {
            a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent("on" + b, c)
        }
        function e(a) {
            a = a || event;
            13 == a.keyCode && d.checkSubmit()
        }
        merge(this, b);
        this.name = a(this.name);
        this.psw = a(this.psw);
        this.remember = a(this.remember);
        this.loginBtn = a(this.loginBtn);
        this.days = a(this.days);
        this.logoutBtn = a(this.logoutBtn);
        var d = this;
        this.loginBtn && c(this.loginBtn, "click", this.checkSubmit.fnBind(this));
        this.logoutBtn && c(this.logoutBtn, "click", this.logout.fnBind(this));
        this.name && this.nameEnter && c(this.name, "keyup", e);
        this.psw && this.pswEnter && c(this.psw, "keyup", e)
    };
    merge(b.prototype, {
        name: null,
        psw: null,
        nameEnter: !0,
        pswEnter: !0,
        remember: null,
        loginBtn: null,
        logoutBtn: null,
        days: 30,
        onLoginSuccess: function() {},
        onLoginFailed: function() {},
        onLogoutSuccess: function() {},
        onLogoutFailed: function() {},
        onUserChanged: function() {},
        onSubmit: function() {
            return ! 0
        },
        onCheckFailed: function() {},
        checkSubmit: function() {
            this.onSubmit(this.name.value, this.psw.value) ? this.login() : this.onCheckFailed();
            return ! 1
        },
        getDays: function() {
            if (!this.remember) return void 0;
            if ("number" == typeof this.remember) return this.remember;
            switch (this.remember.tagName) {
            case "INPUT":
                return this.remember.checked ? 1 * this.remember.value || "number" == typeof this.days ? this.days: this.days.value: void 0;
            case "SELECT":
                return this.remember.value;
            default:
                return void 0
            }
        },
        login: function(a, b, c) {
            if (!a && !this.name.value) return ! 1;
            var d = this;
            sinaSSOController.customLoginCallBack = function(a) {
                a && a.result === !0 ? d.onLoginSuccess(sinaSSOController.getSinaCookie()) : a && a.result === !1 ? d.onLoginFailed(a) : d.onLoginFailed(a)
            };
            sinaSSOController.login(a || this.name.value, b || this.psw.value, c || this.getDays());
            return ! 1
        },
        logout: function() {
            var a = this;
            sinaSSOController.customLogoutCallBack = function(b) {
                b.result ? a.onLogoutSuccess(a) : a.onLogoutFailed("退出失败...")
            };
            sinaSSOController.logout();
            return ! 1
        }
    });
    c = new
    function() {
        function j(a) {
            if (!h) {
                d = 1 * a || d || 1e3;
                h = setInterval(q, d);
                //去除
                //sinaSSOController.getSinaCookie() && sinaSSOController.autoLogin(q)
            }
        }
        function k() {
            clearInterval(h);
            m()
        }
        function l(a) {
            a._onLoginSuccess = a.onLoginSuccess;
            a._onLogoutSuccess = a.onLogoutSuccess;
            a.onLoginSuccess = q;
            a.onLogoutSuccess = q
        }
        function m() {
            for (var a = 0; a < i.length; a++) {
                i[a].onLoginSuccess = i[a]._onLoginSuccess;
                i[a].onLogoutSuccess = i[a]._onLogoutSuccess
            }
        }
        function n() {
            for (var a = 0; a < i.length; a++) i[a]._onLoginSuccess(f)
        }
        function o() {
            for (var a = 0; a < i.length; a++) i[a]._onLogoutSuccess(f)
        }
        function p(a, b) {
            for (var c = 0; c < i.length; c++) i[c].onUserChanged(a, b)
        }
        function q() {
            //去除
            //var a = sinaSSOController.getSinaCookie();
            if (a) if (f) {
                if (a.uid != f.uid) {
                    p(a, f);
                    f = a
                }
            } else {
                f = a;
                n()
            } else if (f) {
                o();
                f = null
            }
        }
        var a = "finance",
        c = "finance",
        d = 1e3,
        f = null,
        g = !0,
        h = null,
        i = [];
        window.sinaSSOConfig = merge({
            entry: a,
            service: c,
            setDomain: g
        },
        window.sinaSSOConfig || {});
        this.startMonitor = j;
        this.setFreq = function(a) {
            clearInterval(h);
            d = a || d;
            h = setInterval(q, d)
        };
        this.stopMonitor = k();
        this.checkImmediate = q;
        this.add = function(a) {
            var c = a;
            c.constructor != b && (c = new b(c));
            i.push(c);
            f && c.onLoginSuccess(f);
            l(c);
            1 == i.length && j();
            return this
        };
        this.get = function(a) {
            return i(a)
        };
        this.user = function() {
            return f
        }
    };
    window.LoginManager = c
} ();
Object.toQueryString = function(a) {
    var b, c;
    if ("string" == typeof a) return encodeURIComponent(a);
    b = [];
    for (c in a) b.push(encodeURIComponent(c) + "=" + encodeURIComponent(a[c]));
    return b.join("&")
};

!
function() {
    function t(e) {
        return typeof e == "string" ? document.getElementById(e) : e
    }
    //DataDrawer
    //e = "hq", n = Object {now: Object, change: Object, up_limit: Object, down_limit: Object, open: Object…}, r = undefined
    function n(e, n, r) {
        this.template = [],
        this.html = "",
		//e = "hq"
        this.container = t(e), 
		//n = Object {now: Object, change: Object, up_limit: Object, down_limit: Object, open: Object…}
        this.fields = n || {},
		
        this.css = i({
            up: "up",
            down: "down",
            flat: "flat"
        },
        r)
		//r = undefined
    }
    function r(t, n, r) {
        var i = t,
        s = n;
        typeof s == "string" && (s = e[s]);
        var o = "";
        if (i === undefined || i === null) i = "--";
        return s ? (!isNaN(t * 1) && isFinite(t * 1) && (s.shift && (i *= Math.pow(10, s.shift)), s["万/亿"] && (Math.abs(i) > 1e8 ? (i /= 1e8, o = "亿") : Math.abs(i) > 1e4 && (i /= 1e4, o = "万")), s.digit !== undefined && s.digit >= 0 && (o ? i = i.toFixed(s.digit || 2) : i = i.toFixed(s.digit)), s.cfg & 8 && (i = i.format()), s.cfg & 4 && (i = t * 1 > 0 ? "+" + i: i), s.cfg & 2 && (i = Math.abs(i * 1)), i += o, s.cfg & 32 && this.lastData && (t > this.lastData[s.key] && (i = '<span style="color:red;">↑</span>' + i), t < this.lastData[s.key] && (i = '<span style="color:green;">↓</span>' + i)), s.p && (i = s.p.replace("$1", i))), i) : i
    }
	//e = Object {up: "up", down: "down", flat: "flat"}, t = undefined
    function i(e, t) {
		//n = undefined, arguments = [Object, undefined, callee: function, Symbol(Symbol.iterator): function]
        for (var n in t) typeof e[n] == "object" && typeof t[n] == "object" ? e[n] = arguments.callee(t[n], e[n]) : e[n] = t[n];
        return e
    }
    var e = {
        counts: {
            s: 1
        },
        symbol: {
            key: "symbol",
            title: "代码"
        },
        sym: {
            key: "sym",
            title: "代码"
        },
        name: {
            key: "name",
            title: "名称"
        },
        now: {
            key: "now",
            title: "&nbsp;最新价",
            digit: 2,
            cfg: 48
        },
        change: {
            key: "change",
            title: "涨跌额",
            digit: 2,
            cfg: 28
        },
        changeP: {
            key: "changeP",
            title: "涨跌幅",
            digit: 2,
            cfg: 28,
            p: "$1%",
            color: !0
        },
        open: {
            key: "open",
            title: "开盘价",
            digit: 2,
            cfg: 24
        },
        preClose: {
            key: "preClose",
            title: "昨收",
            digit: 2,
            cfg: 24
        },
        volume: {
            key: "volume",
            title: "成交量(手)",
            digit: 0,
            cfg: 16,
            "万/亿": !0,
            shift: -2
        },
        amount: {
            key: "amount",
            title: "成交额(元)",
            digit: 2,
            cfg: 16,
            "万/亿": !0
        },
        turnover: {
            key: "turnover",
            title: "换手率",
            digit: 2,
            cfg: 24,
            p: "$1%"
        },
        pe: {
            key: "pe",
            title: "市盈率",
            digit: 2,
            cfg: 24
        },
        pb: {
            key: "pb",
            title: "市净率",
            digit: 2,
            cfg: 24
        },
        high: {
            key: "high",
            title: "最高价",
            digit: 2,
            cfg: 24
        },
        low: {
            key: "low",
            title: "最低价",
            digit: 2,
            cfg: 24
        },
        buy: {
            key: "buy",
            title: "买入价",
            digit: 2,
            cfg: 24
        },
        sell: {
            key: "sell",
            title: "卖出价",
            digit: 2,
            cfg: 24
        },
        date: {
            key: "date",
            title: "日期"
        },
        time: {
            key: "time",
            title: "时间"
        },
        swing: {
            key: "swing",
            title: "振幅",
            digit: 2,
            cfg: 24,
            p: "$1%"
        },
        eps: {
            key: "eps",
            title: "每股收益",
            digit: 2,
            cfg: 24,
            s: 1
        },
        profit4Season: {
            key: "profit4Season",
            title: "最近4季度每股收益",
            digit: 2,
            cfg: 24,
            s: 1
        },
        profitYear: {
            key: "profitYear",
            title: "今年以来每股收益",
            digit: 2,
            cfg: 24,
            s: 1
        },
        netAsset: {
            key: "netAsset",
            title: "每股净资产",
            digit: 2,
            cfg: 24,
            s: 1
        },
        averageVolume: {
            key: "averageVolume",
            title: "平均成交量",
            digit: 2,
            cfg: 24,
            s: 1
        },
        shares: {
            key: "shares",
            title: "总股本",
            digit: 0,
            cfg: 16,
            "万/亿": !0,
            s: 1
        },
        capital: {
            key: "capital",
            title: "流通股本",
            digit: 0,
            cfg: 16,
            "万/亿": !0,
            s: 1
        },
        cvs: {
            key: "cvs",
            title: "流通市值(元)",
            digit: 2,
            cfg: 16,
            "万/亿": !0
        },
        totalShare: {
            key: "totalShare",
            title: "总市值(元)",
            digit: 2,
            cfg: 16,
            "万/亿": !0
        },
        capitalA: {
            key: "capitalA",
            title: "流通A股",
            digit: 0,
            cfg: 16,
            "万/亿": !0,
            s: 1
        },
        capitalB: {
            key: "capitalB",
            title: "流通B股",
            digit: 0,
            cfg: 16,
            "万/亿": !0,
            s: 1
        },
        netProfit: {
            key: "netProfit",
            title: "最近年度净利润(亿元)",
            digit: 2,
            cfg: 16,
            "万/亿": !0,
            s: 1
        },
        issuePrice: {
            key: "issuePrice",
            title: "发行价",
            digit: 2,
            cfg: 24,
            s: 1
        },
        roe: {
            key: "roe",
            title: "净资产收益率",
            digit: 2,
            cfg: 24,
            p: "$1%",
            s: 1
        },
        revenue: {
            key: "revenue",
            title: "主营业务收入(亿元)",
            digit: 2,
            cfg: 16,
            "万/亿": !0,
            s: 1
        },
        changes_5: {
            key: "changes_5",
            title: "五日涨跌",
            digit: 2,
            cfg: 24,
            p: "$1%",
            s: 1
        },
        changes_10: {
            key: "changes_10",
            title: "十日涨跌",
            digit: 2,
            cfg: 24,
            p: "$1%",
            s: 1
        },
        changes_20: {
            key: "changes_20",
            title: "二十日涨跌",
            digit: 2,
            cfg: 24,
            p: "$1%",
            s: 1
        },
        changes_30: {
            key: "changes_30",
            title: "三十日涨跌",
            digit: 2,
            cfg: 24,
            p: "$1%",
            s: 1
        },
        changes_60: {
            key: "changes_60",
            title: "六十日涨跌",
            digit: 2,
            cfg: 24,
            p: "$1%",
            s: 1
        },
        netamount: {
            key: "netamount",
            title: "净流入(元)",
            digit: 2,
            cfg: 16,
            "万/亿": !0
        },
        netInflowRate: {
            key: "netInflowRate",
            title: "净流入率",
            digit: 2,
            cfg: 24,
            p: "$1%"
        },
        r0_in: {
            key: "r0_in",
            title: "主力净流入(元)",
            digit: 2,
            cfg: 16,
            "万/亿": !0
        },
        r3_in: {
            key: "r3_in",
            title: "散户净流入(元)",
            digit: 2,
            cfg: 16,
            "万/亿": !0
        },
        r0_net_3: {
            key: "r0_net_3",
            title: "3日净流入(元)",
            digit: 2,
            cfg: 16,
            "万/亿": !0,
            s: 1
        },
        r0_net_5: {
            key: "r0_net_5",
            title: "5日净流入(元)",
            digit: 2,
            cfg: 16,
            "万/亿": !0,
            s: 1
        }
    };
    window.allFields = e,
    i(n.prototype, {
        
        draw: function(t) {
            var n = this,
            i = this.html,
            s = this.template,
            o = [],
            u = [],
            a,
            f;
            a = t,
            a && (a.constructor !== Array || a[0] && a[0].constructor !== Array) && (a = [a]);
            for (var l = 0; l < a.length && l < s.length; l++) {
                f = a[l],
                f && f.constructor !== Array && (f = [f]),
                u = [];
                for (var c = 0,
                h = f.length; c < h; c++) u.push(s[l].replace(/@UD_(.*?)@/g,
                function(e, t) {
                    if (f[c][t] !== undefined) {
                        var r = f[c][t] * 1;
                        return r > 0 ? n.css.up: r < 0 ? n.css.down: n.css.flat
                    }
                }).replace(/@(.*?)@/g,
                function(t, i) {
                    return r(f[c][i], f[c].fieldsImportant && f[c].fieldsImportant[i] || n.fields[i] || e[i])
                }));
                o.push(u.join(""))
            }
            var p = 0;
            i = i.replace(/@template@/g,
            function() {
                return p++,
                o[p - 1] || ""
            }),
            i = i.replace(/@UD_(.*?)@/g,
            function(e, r) {
                if (t[r] !== undefined) {
                    var i = t[r] * 1;
                    return i > 0 ? n.css.up: i < 0 ? n.css.down: n.css.flat
                }
            }).replace(/@(.*?)@/g,
            function(i, s) {
                return r(t[s], t.fieldsImportant && t.fieldsImportant[s] || n.fields[s] || e[s])
            });
			if(this.container)
            this.container.innerHTML = i
			// alert( i )
        }
    }),
    window.DataDrawer = n,
    window.dataFormat = r
} ()

var SuggestServer = function() {
    this._stringOriginalUrl = "http://suggest3.sinajs.cn/suggest/type=@TYPE@&key=@KEY@&name=@NAME@";
    this._stringUrl = "";
    this._elementScriptLoader = null;
    this._elementContainer = null;
    this._stringOriginalValue = "";
    this._stringLastValue = "";
    this._functionCallback = null;
    this._elementLineCurrent = null;
    this._objectHtml = {};
    this._objectData = {};
    this._booleanHideDelay = !1;
    this._stringBrowserType = "";
    this._objectType = {
        11 : "A 股",
        12 : "B 股",
        13 : "权证",
        14 : "期货",
        15 : "债券",
        21 : "开基",
        22 : "ETF",
        23 : "LOF",
        24 : "货基",
        25 : "QDII",
        26 : "封基",
        31 : "港股",
        32 : "窝轮",
        33 : "港指数",
        41 : "美股",
        42 : "外期",
        81 : "债券",
        82 : "债券"
    };
    this._objectConfig = {
        input: null,
        loader: null,
        value: null,
        "default": null,
        type: 0,
        max: 10,
        width: 220,
        link: null,
        target: "_blank",
        head: ["选项", "代码", "名称"],
        body: [ - 1, 2, 4],
        fix: {
            firefox: [1, 1]
        },
        onshow: function() {},
        onhide: function() {},
        hideSelectForIE6: !1,
        callback: null
    };
    this._getElement = function(a) {
        return document.getElementById(a)
    };
    this._getRandom = function() {
        return (new Date).getTime()
    };
    this._bind = function(a, b) {
        var c = this;
        return function() {
            var e, d = null;
            if ("undefined" != typeof b) {
                for (e = 0; e < arguments.length; e++) b.push(arguments[e]);
                d = b
            } else d = arguments;
            return a.apply(c, d)
        }
    };
    this._aevent = function(a, b, c) {
        window.addEventListener ? a.addEventListener(b, c, !1) : window.attachEvent && a.attachEvent("on" + b, c)
    };
    this._position = function() {
        var d, e, f, g, a = 0,
        b = 0,
        c = this._elementInput;
        do {
            a += c.offsetTop || 0;
            b += c.offsetLeft || 0;
            if ("relative" != c.style.position) break;
            c = c.offsetParent
        } while ( c );
        d = [1 * this._elementInput.parentNode.style.borderTopWidth.replace("px", ""), 1 * this._elementInput.parentNode.style.borderLeftWidth.replace("px", "")];
        __arrayPositionFix = [0, 0];
        this._elementContainer.style.top != a + "px" && (this._elementContainer.style.top = a - d[0] + __arrayPositionFix[0] + "px");
        this._elementContainer.style.left != b + "px" && (this._elementContainer.style.left = b - d[1] + __arrayPositionFix[1] + "px");
        e = this._elementInput.style.borderTopWidth;
        f = this._elementInput.style.borderBottomWidth;
        g = this._elementInput.clientHeight;
        g += "" != e ? 1 * e.replace("px", "") : 2;
        g += "" != f ? 1 * f.replace("px", "") : 2;
        this._elementContainer.style.marginTop != g + "px" && (this._elementContainer.style.marginTop = g + "px")
    };
    this._getType = function(a) {
        return {
            1 : "stock",
            2 : "fund",
            3 : "hk",
            4 : "us"
        } [a.substr(0, 1)]
    };
    this._fill = function() {
        var b, c, d, e, f, g, h, i, j, a = this._elementInput.value;
        if ("key_" + a in this._objectData && "" != this._objectData["key_" + a]) {
            if (null == this._elementContainer) {
                this._elementContainer = document.createElement("div");
                this._elementContainer.style.cssText += "display:none; filter:alpha(opacity=95); opacity:0.95; position:absolute; width:" + this._objectConfig.width + "px; z-index:999;";
                this._elementInput.parentNode.insertBefore(this._elementContainer, this._elementInput);
                this._elementContainer.suggest = this
            }
            this._position();
            b = "";
            b += '<table style="border-collapse:collapse; line-height:18px; border:2px solid #EEE; background-color:#FFF; font-size:12px; text-align:center; color:#999; width:' + (this._objectConfig.width - 2) + 'px;">';
            if (null != this._objectConfig.head) {
                b += '<tr style="background-color:#F3F3F3;">';
                for (c in this._objectConfig.head) this._objectConfig.head.hasOwnProperty(c) && (b += "<td>" + this._objectConfig.head[c] + "</td>");
                b += "</tr>"
            }
            d = (this._objectData["key_" + a] || "").replace(/&amp;/g, "&").replace(/;$/, "").split(";");
            e = d.length > this._objectConfig.max ? this._objectConfig.max: d.length;
            f = "parentNode.parentNode.parentNode['suggest']";
            for (c = 0; e > c; c++) {
                g = d[c].split(",");
                g[ - 1] = g[0].replace(new RegExp(a.toLowerCase().replace(/(^\s*)|(\s*$)/g, "").replace(/\./g,
                function(a) {
                    return "\\" + a
                }), "gi"),
                function(a) {
                    return '<span style="color:#F00;">' + a + "</span>"
                });
                g[ - 2] = g[1] in this._objectType ? this._objectType[g[1]] : "——";
                if (null == this._objectConfig.link || "" == this._objectConfig.link) h = ['<td style="padding:0px;"><span style="display:block; padding:1px;">', "</span></td>"];
                else {
                    i = this._objectConfig.link.replace(/@type@/g, this._getType(g[1]) || g[1]).replace(/@code@/g, this._getFullCode(g));
                    for (j in g) g.hasOwnProperty(j) && (i = i.replace(new RegExp("@" + j + "@", "g"), g[j]));
                    h = ['<td style="padding:0px;"><a href="' + i + '" hidefocus="true" onmousedown="return this.parentNode.parentNode.' + f + "['hidepause'](this);\" onclick=\"return this.parentNode.parentNode." + f + '[\'hideresume\'](this);" style="color:#999; display:block; outline:none; padding:1px; text-decoration:none; width:100%;" target="' + this._objectConfig.target + '">', "</a></td>"]
                }
                b += '<tr id="' + d[c] + '" style="cursor:pointer;" onmouseover="this.' + f + "['mouseoverLine'](this);\" onmouseout=\"this." + f + "['mouseoutLine'](this);\" onmousedown=\"this." + f + "['setLineMouse'](this);\">";
                for (j in this._objectConfig.body) this._objectConfig.body.hasOwnProperty(j) && (b += h[0] + g[this._objectConfig.body[j]] + h[1]);
                b += "</tr>"
            }
            b += "</table>";
            this._objectHtml["key_" + a] = b;
            this._elementLineCurrent = null;
            document.createElement("div");
            this._elementContainer.innerHTML = this._objectHtml["key_" + a];
            this._show()
        } else this._hide()
    };
    this._color = function(a) {
        var b = "";
        a._booleanArrow && a._booleanMouse ? b = "#F8FBDF": a._booleanArrow ? b = "#F1F5FC": a._booleanMouse && (b = "#FCFEDF");
        a.style.backgroundColor != b && (a.style.backgroundColor = b)
    };
    this.mouseoverLine = function(a) {
        a._booleanMouse = !0;
        this._color(a)
    };
    this.mouseoutLine = function(a) {
        a._booleanMouse = !1;
        this._color(a)
    };
    this.setLineMouse = function(a) {
        this.setLine(a);
        null != this._functionCallback && this._functionCallback(this._elementInput.value, a.id.split(","))
    };
    this._getFullCode = function(a) {
        switch (a[1]) {
        case "11":
            return a[3];
        case "12":
            return a[3];
        case "13":
            return a[3];
        case "14":
            return a[3];
        case "15":
            return a[3];
        case "21":
            return a[3];
        case "22":
            return a[3];
        case "23":
            return a[3];
        case "24":
            return a[3];
        case "25":
            return a[3];
        case "26":
            return a[3];
        default:
            return a[2]
        }
    };
    this.setLine = function(a) {
        var d, e, f, b = a.id.split(","),
        c = this._objectConfig.value;
        if (null != c && "" != c) {
            for (d = 0; d < b.length; d++) c = c.replace(new RegExp("@" + d + "@", "g"), b[d]);
            e = c
        } else e = this._getFullCode(b);
        f = a.id;
        for (d = 2; 5 > d; d++) this._objectData["key_" + b[d]] = f + ";";
        this._stringLastValue = e;
        this._elementInput.value = e;
        if (null != this._elementLineCurrent) {
            this._elementLineCurrent._booleanArrow = !1;
            this._color(this._elementLineCurrent)
        }
        a._booleanArrow = !0;
        this._color(a);
        this._elementLineCurrent = a
    };
    this._show = function() {
        var a, b;
        if (null != this._elementContainer) {
            this._elementContainer.style.display = "";
            this._objectConfig.onshow();
            if (this._objectConfig.hideSelectForIE6 && "ie6" == this._stringBrowserType) {
                a = document.getElementsByTagName("select");
                for (b = 0; b < a.length; b++) a[b].style.visibility = "hidden"
            }
        }
    };
    this.hidepause = function() {
        this._booleanHideDelay = !0
    };
    this.hideresume = function() {
        this._booleanHideDelay = !1;
        this._hideNow()
    };
    this._hide = function() {
        0 == this._booleanHideDelay && this._hideNow()
    };
    this._hideNow = function() {
        var a, b;
        if (null != this._elementContainer) {
            this._elementContainer.style.display = "none";
            this._objectConfig.onhide();
            if (this._objectConfig.hideSelectForIE6 && "ie6" == this._stringBrowserType) {
                a = document.getElementsByTagName("select");
                for (b = 0; b < a.length; b++) a[b].style.visibility = "visible"
            }
        }
    };
    this._load = function(a, b, c) {
        var d, e;
        if (null == this._elementScriptLoader) {
            this._elementScriptLoader = document.createElement("div");
            this._elementScriptLoader.style.display = "none";
            this._elementInput.parentNode.insertBefore(this._elementScriptLoader, this._elementInput)
        }
        d = "suggestdata_" + this._getRandom();
        e = document.createElement("script");
        e.type = "text/javascript";
        e.charset = "gb2312";
        e.src = this._stringUrl.replace("@NAME@", d).replace("@KEY@", encodeURIComponent(a.toLowerCase()));
        e._object = this;
        b && (e._functionCallbackTrue = b);
        c && (e._functionCallbackFalse = c);
        e._stringValue = a;
        e._stringName = d;
        e[document.all ? "onreadystatechange": "onload"] = function() {
            if (!document.all || "loaded" == this.readyState || "complete" == this.readyState) {
                var a = window[this._stringName];
                if ("undefined" != typeof a) {
                    this._object._objectData["key_" + this._stringValue] = a;
                    this._functionCallbackTrue(a);
                    window[this._stringName] = null
                } else this._functionCallbackFasle && this._functionCallbackFasle("");
                this._object = null;
                this._stringValue = null;
                this._stringName = null;
                this[document.all ? "onreadystatechange": "onload"] = null;
                this.parentNode.removeChild(this)
            }
        };
        this._elementScriptLoader.appendChild(e)
    };
    this._check = function() {
        var a = this._elementInput.value;
        if (this._stringLastValue != a) {
            this._stringLastValue = a;
            if ("" != a)"key_" + a in this._objectData ? this._fill() : this._load(a, this._bind(this._fill), this._bind(this._hide));
            else {
                if (null != this._elementContainer) {
                    this._elementLineCurrent = null;
                    this._elementContainer.innerHTML = ""
                }
                this._hide()
            }
        } else this._show()
    };
    this._eventFocus = function() {
        this._elementInput.value == this._stringOriginalValue && (this._elementInput.value = "");
        this._stringLastValue = "";
        this._check()
    };
    this._eventBlur = function() {
        "" == this._elementInput.value && (this._elementInput.value = this._stringOriginalValue);
        this._stringLastValue = "";
        this._hide()
    };
    this._eventButtonUp = function() {
        var a = arguments[0] || window.event,
        b = null == this._objectConfig.head ? 0 : 1;
        switch (a.keyCode) {
        case 38:
            null != this._elementContainer && null != this._elementContainer.firstChild && this.setLine(this._elementContainer.firstChild.rows[this._elementLineCurrent && this._elementLineCurrent.rowIndex != b ? this._elementLineCurrent.rowIndex - 1 : this._elementContainer.firstChild.rows.length - 1]);
            break;
        case 40:
            null != this._elementContainer && null != this._elementContainer.firstChild && this.setLine(this._elementContainer.firstChild.rows[this._elementLineCurrent && this._elementLineCurrent.rowIndex != this._elementContainer.firstChild.rows.length - 1 ? this._elementLineCurrent.rowIndex + 1 : b]);
            break;
        case 13:
            if (null != this._elementContainer) {
                null != this._elementLineCurrent && this.setLine(this._elementLineCurrent);
                null != this._functionCallback && this._functionCallback(this._elementInput.value, this._elementLineCurrent ? this._elementLineCurrent.id.split(",") : [])
            }
            this._hide();
            break;
        default:
            this._check()
        }
    };
    this.getCodeFromCache = function(a) {
        return "key_" + a in this._objectData ? this._objectData["key_" + a] : void 0
    };
    this.getCode = function(a, b) {
        "key_" + a in this._objectData ? b(this._objectData["key_" + a]) : this._load(a, b, b)
    };
    this.changeType = function(a) {
        this._objectHtml = {};
        this._objectData = {};
        this._elementInput.value = this._stringOriginalValue;
        if ("undefined" != typeof a) {
            var b = "";
            switch (a.toLowerCase()) {
            case "stock":
                b = "11,12,13,14,15";
                break;
            case "fund":
                b = "21,22,23,24,25,26";
                break;
            case "hkstock":
                b = "31";
                break;
            case "hk":
                b = "31,33,32";
                break;
            case "usstock":
                b = "41";
                break;
            case "us":
                b = "41,42";
                break;
            default:
                b = a
            }
            this._stringUrl = this._stringOriginalUrl.replace("@TYPE@", b)
        } else this._stringUrl = this._stringOriginalUrl.replace("type=@TYPE@&", "");
        this._objectConfig.type = a
    };
    this.changeLink = function(a) {
        this._objectConfig.link = a;
        this._fill();
        this._hide()
    };
    this.clear = function() {
        this._stringLastValue = null;
        this._elementInput.value = "";
        this._check();
        this._elementInput.value = this._stringOriginalValue
    };
    this.bind = function(a) {
        if ("undefined" != typeof a) for (var b in a) this._objectConfig[b] = a[b];
        this._elementInput = "string" == typeof this._objectConfig.input ? document.getElementById(this._objectConfig.input) : this._objectConfig.input;
        null != this._objectConfig.loader && (this._elementScriptLoader = "string" == typeof this._objectConfig.loader ? document.getElementById(this._objectConfig.loader) : this._objectConfig.loader);
        if (this._elementInput) {
            this._stringOriginalValue = null == this._objectConfig["default"] || "" == this._objectConfig["default"] ? this._elementInput.value: this._objectConfig["default"];
            this.changeType(this._objectConfig.type);
            this._elementInput.value = this._stringOriginalValue;
            this._elementInput.setAttribute("autocomplete", "off");
            this._elementInput.autoComplete = "off";
            this._aevent(this._elementInput, "focus", this._bind(this._eventFocus));
            this._aevent(this._elementInput, "blur", this._bind(this._eventBlur));
            this._aevent(this._elementInput, "keyup", this._bind(this._eventButtonUp));
            this._aevent(this._elementInput, "mouseup", this._bind(this._eventButtonUp));
            this._functionCallback = this._objectConfig.callback
        }
    }
};

!
function() {
    function b(d) {
        if (typeof d == "string") {
            return document.getElementById(d)
        } else {
            return d
        }
    }
    function a(f, e, d) {
        if (f.attachEvent) {
            f.attachEvent("on" + e, d)
        } else {
            f.addEventListener(e, d, false)
        }
    }
    var c = new
    function() {
        var i = "loginBG";
        var f = "loginLayer";
        var k = [];
        this.init = function() {
            a(b("loginClose"), "click", e);
            LoginManager.add({
                name: "loginName",
                psw: "loginPSW",
                remember: "loginRemember",
                loginBtn: "loginBtn",
                onLoginSuccess: function(l) {
                    e(true);
                    b("loginPSW").value = ""
                },
                onLoginFailed: function(l) {
                    if (l.errno == "4049") {
                        alert("\u60a8\u7684\u8d26\u6237\u5b58\u5728\u5b89\u5168\u95ee\u9898\uff0c\u5c06\u4f1a\u4e3a\u60a8\u8f6c\u5230\u5b89\u5168\u767b\u9646\u9875\u9762\u3002");
                        location.href = "http://login.sina.com.cn/signup/signin.php?entry=finance&retcode=4049&r=" + location.href + "&savestate=" + (b("loginRemember").checked ? 30 : 0);
                        return
                    }
                    b("loginError").innerHTML = l.reason
                },
                onSubmit: function(l, m) {
                    b("loginError").innerHTML = "";
                    if (!l) {
                        g(b("loginName"));
                        return false
                    }
                    if (!m) {
                        g(b("loginPSW"));
                        return false
                    }
                    return true
                }
            })
        };
        function h(m, l) {
            this.id = m;
            this.onClose = l
        }
        function d() {
            b(i).style.display = "block";
            b(f).style.display = "block";
            return false
        }
        this.open = d;
        function e(l) {
            b(i).style.display = "none";
            b(f).style.display = "none";
            if (l !== true) {
                for (var m = 0; m < k.length; m++) {
                    k[m].onClose && k[m].onClose()
                }
            }
            return false
        }
        this.close = e;
        function j(n, l) {
            var m = b(n);
            if (!m) {
                window.console && console.error && console.error({
                    msg: "\u6ca1\u6709\u4f20\u5165\u6309\u94ae\u6216\u8005\u6309\u94ae\u4e0d\u5b58\u5728\uff1a" + n
                });
                return
            }
            a(m, "click", d);
            k.push(new h(n, l))
        }
        this.addOpener = j;
        function g(n) {
            n.focus();
            var l = 8;
            var m = setInterval(function() {
                n.style.backgroundColor = l % 2 ? "": "#ccc";
                l--;
                if (!l) {
                    clearInterval(m)
                }
            },
            100)
        }
    } ();
    window.loginLayer = c
} ();

!
function(b) {
    var d = "http://hq.sinajs.cn/rn=$rn&list=";
    function a(e) {
        this.ID = this.ID;
        this.indexCfgs = e;
        this.initDom();
        this.getData();
        setInterval(this.getData.fnBind(this), 5 * 1000);
        this.scrollTimer = setInterval(this.scrollUp.fnBind(this), 5 * 1000)
    }
    merge(a.prototype, {
        ID: 0,
        scrollTimer: undefined,
        indexs: [],
        initDom: function() {
            if (!document.getElementById("globalIndexScrollerCss")) {
                document.write('<link rel="stylesheet" href="http://finance.sina.com.cn/basejs/globalIndexScroller.css" type="text/css" id="globalIndexScrollerCss" />')
            }
            document.write('<div class="global_index_scroller" id="globalIndexScroller' + this.ID + '" style="visibility:hidden;"><div class="global_index_scroller_body"></div><div class="scroller_oper"><a href="javascript:void(0)" class="scroller_down"></a><a href="javascript:void(0)" class="scroller_up"></a><a href="http://finance.sina.com.cn/money/globalindex/" target="_blank">\u73af\u7403\u5e02\u573a</a></div></div>');
            var h = b("#globalIndexScroller" + this.ID);
            setTimeout(function() {
                h.css("visibility", "")
            },
            500);
            var f = h.find(".global_index_scroller_body");
            var g, n;
            var e, k;
            var o;
            for (var m = 0; m < this.indexCfgs.length; m++) {
                e = this.indexCfgs[m];
                g = b("<ul>").appendTo(f);
                for (var l = 0; l < e.length; l++) {
                    k = e[l];
                    if (k[2] == "IF") {
                        if (k[0] == "IF") {
                            k[0] = hq_str_CFF_LIST.split(",")[0]
                        }
                        k[1] = k[1].replace("$IF", k[0]);
                        k[4] = (k[4] || "").replace("$IF", k[0])
                    }
                    n = b("<li>").addClass(k[5] || "").appendTo(g);
                    n.html('<span class="#rg#_@UD_changeP@"><a class="#rg#_arrow_@UD_changeP@ #hasLink#" #href#>#name#</a><i>\uff1a</i>#fields#</span>'.replace(/#rg#/g, k[3]).replace("#name#", k[1]).replace("#href#", k[4] ? 'href="' + k[4] + '" target="_blank"': "").replace("#hasLink#", k[4] ? "": "no_link").replace("#fields#", "@" + (k[6] || "now,changeP").split(",").join("@ @") + "@"));
                    this.indexs.push(new c(k, new DataDrawer(n[0], {
                        amount: {
                            key: "amount",
                            shift: -4,
                            digit: 2,
                            p: "$1\u4ebf\u5143"
                        }
                    })))
                }
            }
            h.find(".scroller_down").click(this.scrollDown.fnBind(this));
            h.find(".scroller_up").click(this.scrollUp.fnBind(this))
        },
        getData: function() {
            var f = [];
            for (var e = 0; e < this.indexs.length; e++) {
                f.push(this.indexs[e].makeHqKey())
            } (window.loadScript || getScript)(d.replace("$rn", random()) + f.join(","), this.gotData.fnBind(this))
        },
        gotData: function() {
            var f;
            for (var e = 0; e < this.indexs.length; e++) {
                this.indexs[e].draw()
            }
        },
        scrolling: false,
        scrollUp: function() {
            if (this.scrolling) {
                return
            }
            this.scrolling = true;
            var e = b("#globalIndexScroller" + this.ID + " .global_index_scroller_body ul:first");
            var f = this;
            e.animate({
                marginTop: "-" + e.height() + "px"
            },
            {
                complete: function() {
                    f.scrolling = false;
                    e.css("marginTop", "0").appendTo(b("#globalIndexScroller" + f.ID + " .global_index_scroller_body"))
                }
            });
            if (this.scrollTimer) {
                clearInterval(this.scrollTimer);
                this.scrollTimer = setInterval(this.scrollUp.fnBind(this), 5 * 1000)
            }
            return false
        },
        scrollDown: function() {
            if (this.scrolling) {
                return
            }
            this.scrolling = true;
            var e = b("#globalIndexScroller" + this.ID + " .global_index_scroller_body ul:last");
            e.css("marginTop", "-" + e.height() + "px");
            e.prependTo(b("#globalIndexScroller" + this.ID + " .global_index_scroller_body"));
            var f = this;
            e.animate({
                marginTop: "0"
            },
            {
                complete: function() {
                    f.scrolling = false
                }
            });
            if (this.scrollTimer) {
                clearInterval(this.scrollTimer);
                this.scrollTimer = setInterval(this.scrollUp.fnBind(this), 5 * 1000)
            }
            return false
        },
        stop: function() {
            clearInterval(this.scrollTimer);
            this.scrollTimer = 0
        }
    });
    function c(e, f) {
        this.cfg = e;
        this.drawer = f
    }
    merge(c.prototype, {
        makeHqKey: function() {
            switch (this.cfg[2]) {
            case "cn":
                return "s_" + this.cfg[0];
                break;
            case "hk":
                return "rt_hk" + this.cfg[0];
                break;
            case "us":
                return "gb_" + this.cfg[0].replace(/\./g, "$");
                break;
            case "hf":
                return "hf_" + this.cfg[0];
                break;
            case "forex":
                return this.cfg[0];
                break;
            case "IF":
                return "CFF_RE_" + this.cfg[0];
                break;
            case "b":
                return "b_" + this.cfg[0];
                break;
            default:
                alert("\u65b0\u7684\u7c7b\u578b\uff0c\u9700\u6dfb\u52a0\u4ee3\u7801");
                break
            }
        },
        draw: function() {
            var e = this.processData();
            this.drawer.draw(e)
        },
        processData: function() {
            var g = window["hq_str_" + this.makeHqKey()];
            var f = {};
            var e = g.split(",");
            switch (this.cfg[2]) {
            case "cn":
                f.name = e[0];
                f.now = e[1];
                f.change = e[2];
                f.changeP = e[3];
                f.volume = e[4];
                f.amount = e[5];
                break;
            case "hk":
                f.now = e[6];
                f.change = e[6] - e[3];
                f.changeP = (e[6] - e[3]) / e[3] * 100;
                break;
            case "us":
                f.name = e[0];
                f.now = e[1];
                f.change = e[4];
                f.changeP = e[2];
                f.volume = e[10];
                break;
            case "hf":
                f.now = e[0];
                f.change = e[0] - e[7];
                f.changeP = f.change / e[7] * 100;
                break;
            case "forex":
                f.now = e[8];
                f.change = e[8] - e[3];
                f.changeP = f.change / e[3] * 100;
                break;
            case "IF":
                f.now = e[3];
                f.change = e[3] - e[14];
                f.changeP = f.change / e[14] * 100;
                break;
            case "b":
                f.now = e[1];
                f.change = e[2];
                f.changeP = e[3];
                break
            }
            return f
        }
    });
    if (!window.GlobalIndexScroller) {
        window.GlobalIndexScroller = a
    }
} (jQuery);