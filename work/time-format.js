/**
 * 日期格式化，全部用如下日期2019\12\19
 * @param { date, int } 日期格式，或者毫秒值，秒值
 * @return { string } yyyy-MM-dd hh:mm:ss default: yyyy-MM-dd
 */

function format(d, fm) {
    if (!d) {
        return '-';
    }
    return _formatTime(_parseDate(d), fm || 'yyyy-MM-dd');
}

function _parseDate(d) {
    if (!d) {
        return null;
    }

    var type = typeof d;
    if (type === 'number') {
        if ((d + '').length === 10) {
            return new Date(d * 1000);
        } else {
            return new Date(d)
        }
    } else if (type === 'string') {
        // ie 不支持 yyyy-MM-dd，只能使用yyyy/MM/dd
        return new Date(d.replace(/[-]/ig, '/'));
    }

    return d;
}

function _formatTime(time, fmt) {
    if (time == null) {
        return '-';
    }

    var o = {
        'M+': time.getMonth() + 1, // 月份
        'd+': time.getDate(), //日
        'D+': time.getDate(), //日
        'h+': time.getHours(), // 小時
        'H+': time.getHours(), // 小時
        'm+': time.getMinutes(), // 分
        's+': time.getSeconds(), // 秒
        'q+': Math.floor((time.getMonth() + 3) / 3), // 季度
        'S': time.getMilliseconds() // 毫秒
    };

    if (/(y+)/i.test(fmt))
        fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length));

    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
    return fmt;
};

var minute = 60 * 1000; // 1分钟
var hour = 60 * minute; // 1小时
var day = 24 * hour; // 1天
var month = 31 * day; // 月
var year = 12 * month; // 年

/**
 * 从现在开始计算的数据
 * return: 2分钟前，3小时前，2天前
 */

function fromNow(d) {
    var date = _parseDate(d);
    if (date == null) {
        return '-';
    }

    var diff = new Date().getTime() - date.getTime();
    if (diff > year) {
        r = parseInt(diff / year)
        return r + '年前';
    }
    if (diff > month) {
        r = parseInt(diff / year);
        return r + '个月前';
    }
    if (diff > day) {
        r = parseInt(diff / day);
        return r + '天前';
    }
    if (diff > hour) {
        r = parseInt(diff / hour);
        return r + '个小时前';
    }
    if (diff > minute) {
        r = parseInt(diff / minute);
        return r + '分钟前';
    }
    return '刚刚';
}

module.exports = {
    format,
    fromNow
}