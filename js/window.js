/*将手机分成32份*/
;
(function(win) {
    var doc = win.document;
    var docEl = doc.documentElement;
    var tid;

    function refreshRem() {
        var width = docEl.getBoundingClientRect().width;
        if (width > 1024) { // 最大宽度
            width = 1024;
        }
        var rem = width / 16; // 将屏幕宽度分成10份， 1份为1rem
        docEl.style.fontSize = rem + 'px';
    }

    win.addEventListener('resize', function() {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
    }, false);
    win.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    }, false);

    refreshRem();

})(window);


///这里是三个公共变量属性===============================
var url = "http://nick.vicp.io/";

function getAjaxUrl() {

    return "http://nick.vicp.io/"; //ajax请求域名
}

///获取user_id 方法
function getUserID() {

    return 2;
}

///获取StudentId 方法
function getStudentId() {

    return 1;

}

function GetQueryString(name) {
    var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
    if (result == null || result.length < 1) {
        return "";
    }
    return result[1];
}