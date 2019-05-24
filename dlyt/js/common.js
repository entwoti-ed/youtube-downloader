function _getid(id) {
    return document.getElementById(id);
}

function trim(str) {
    if (!str || !str.replace) str = '';
    return str.replace(/^\s*|\s*$/g, "");
}

function html_entity_encode(str) {
    if (!str || !str.replace) str = '';
    str = str.replace(/&/gi, "&");
    str = str.replace(/>/gi, ">");
    str = str.replace(/</gi, "<");
    str = str.replace(/\"/gi, "");
    str = str.replace(/\'/gi, "'");
    return str;
}
var henc = html_entity_encode;

function shortstring(s, len) {
    if (!s) s = '';
    if (s.length > len) s = s.substr(0, len) + "...";
    return s;
}

function cutstringmiddle(s, len, left, right) {
    if (!s) s = '';
    if (s.length <= len) return s;
    var s1, s2;
    s1 = s.substr(0, left);
    s2 = s.substr(s.length - right, s.length);
    return s1 + '.....' + s2;
}


function number_format(number, decimals, dec_point, thousands_sep) {
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}

function getWindowWidth() {
    var windowWidth = 0;
    if (typeof (window.innerWidth) == 'number') {
        windowWidth = window.innerWidth;
    } else {
        var ieStrict = document.documentElement.clientWidth;
        var ieQuirks = document.body.clientWidth;
        windowWidth = (ieStrict > 0) ? ieStrict : ieQuirks;
    }
    if (!windowWidth) windowWidth = 0;
    return windowWidth;
}

function getWindowHeight() {
    var windowHeight = 0;
    if (typeof (window.innerHeight) == 'number') {
        windowHeight = window.innerHeight;
    } else {
        var ieStrict = document.documentElement.clientHeight;
        var ieQuirks = document.body.clientHeight;
        windowHeight = (ieStrict > 0) ? ieStrict : ieQuirks;
    }
    if (!windowHeight) windowHeight = 0;
    return windowHeight;
}

function getScrollLeft() {
    var scrollLeft;
    if (document.body && document.body.scrollLeft) {
        scrollLeft = document.body.scrollLeft;
    } else if (document.documentElement && document.documentElement.scrollLeft) {
        scrollLeft = document.documentElement.scrollLeft;
    }
    if (!scrollLeft) scrollLeft = 0;
    return scrollLeft;
}

function getScrollTop() {
    var scrollTop;
    if (document.body && document.body.scrollTop) {
        scrollTop = document.body.scrollTop;
    } else if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
    }
    if (!scrollTop) scrollTop = 0;
    return scrollTop;
}

var messagetimer = null;

function show_message(s, x, y, padding, timeout) {
    if (!x) x = 10;
    if (!y) y = 10;
    if (!padding) padding = 5;
    if (!timeout) timeout = 2000;

    var kind = 1;
    for (var i = 1; i <= 4; i++) {
        var s1 = "layer_message";
        if (i > 1) s1 = "layer_message" + i;
        var obj = document.getElementById(s1);
        if (obj) {
            kind = i;
            break;
        }
    }

    obj.style.left = "1px";
    obj.style.top = "1px";
    obj.innerHTML = "<label>" + s + "</label>";
    obj.style.display = "";

    if (kind == 1) {
        x = getScrollLeft() + x;
        y = getScrollTop() + y;
    } else if (kind == 2) {
        x = getScrollLeft() + ((getWindowWidth() - obj.clientWidth) / 2);
        y = getScrollTop() + ((getWindowHeight() - obj.clientHeight) / 2);
    } else if (kind == 3) {
        x = document.body.offsetWidth - obj.clientWidth - 5;
        y = getScrollTop() + y;
    } else {
        x = getScrollLeft() + ((getWindowWidth() - obj.clientWidth) / 2);
        y = getScrollTop() + y;
    }
    x = parseInt(x);
    y = parseInt(y);

    obj.style["border"] = "1px solid #000000";
    obj.style["padding"] = padding + "px";
    obj.style.left = x + "px";
    obj.style.top = y + "px";

    if (messagetimer) clearTimeout(messagetimer);
    messagetimer = setTimeout(hide_message, timeout);
}

function hide_message() {
    for (var i = 1; i <= 4; i++) {
        var s1 = "layer_message";
        if (i > 1) s1 = "layer_message" + i;
        var obj = document.getElementById(s1);
        if (obj) {
            obj.style.display = "none";
        }
    }
}

function validateURL(textval) {
    var regexp = /^(?:(ftp|http|https):\/\/)?(?:[\w-]+\.)+([a-z]{2,6}|[0-9]{1,6})/i;
    return regexp.test(textval);
}

function getFileName(url) {
    url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
    url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
    url = url.substring(url.lastIndexOf("/") + 1, url.length);
    return url;
}

function getsize(fileSize) {
    if (!fileSize) return 'Unknown';

    function humanFileSize(bytes) {
        var thresh = 1024;
        if (bytes < thresh) return bytes + ' B';
        var units = ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        var u = -1;
        do {
            bytes /= thresh;
            ++u;
        } while (bytes >= thresh);
        return bytes.toFixed(1) + ' ' + units[u];
    }
    return humanFileSize(fileSize);
}

function fillnumber(s) {
    s = String(s);
    if (s.length == 1) {
        return '0' + s;
    }
    return s;
}

function datetimetostring(ts, onlytime) {
    var t = new Date(ts);
    var s = '';
    if (!isNaN(t)) {
        var y = t.getFullYear();
        var m = t.getMonth() + 1;
        var d = t.getDate();
        if (onlytime) s = fillnumber(t.getHours()) + ':' + fillnumber(t.getMinutes()) + ':' + fillnumber(t.getSeconds());
        else s = y + '-' + fillnumber(m) + '-' + fillnumber(d) + ' ' + fillnumber(t.getHours()) + ':' + fillnumber(t.getMinutes()) + ':' + fillnumber(t.getSeconds());
    }
    return s;
}