var PM = 4;
var arr = [//视力表
	{ mm: 31, sl: 4.0, xs: 0.1 },
	{ mm: 28, sl: 4.1, xs: 0.12 },
	{ mm: 23, sl: 4.2, xs: 0.15 },
	{ mm: 18, sl: 4.3, xs: 0.2 },
	{ mm: 15, sl: 4.4, xs: 0.25 },
	{ mm: 12, sl: 4.5, xs: 0.3 },
	{ mm: 9, sl: 4.6, xs: 0.4 },
	{ mm: 8, sl: 4.7, xs: 0.5 },
	{ mm: 7, sl: 4.8, xs: 0.6 },
	{ mm: 6, sl: 4.9, xs: 0.8 },
	{ mm: 3, sl: 5.0, xs: 1.0 },
	{ mm: 2.5, sl: 5.1, xs: 1.2 },
	{ mm: 2, sl: 5.2, xs: 1.5 }
];

var eye = { left: { sl: 4.0, xs: 0.1 },right: { sl: 4.0, xs: 0.1 } };

$(function () {

    $(document).on("pageInit", "#test1", function (e, pageId, $page) {

        var Wwidth = window.innerWidth;
        var Wheight = window.innerHeight;
        $("#one").css("display", "block");
        $("#one").css("left", (Wwidth / 2) - ($("#one").width() / 2));
        $("#one").css("top", (Wheight / 2) - ($("#one").height() / 2) - 30);


        $("#fd").on("click", function () {

            var width = $("#one").width();
            if (width <= window.innerWidth / 1.5) {
                $("#one").width(width + 5);
                $("#one").css("left", (Wwidth / 2) - ($("#one").width() / 2));
                $("#one").css("top", (Wheight / 2) - ($("#one").height() / 2) - 30);
            }

        });
        var dowen;
        $("#sx").on("click", function () {

            var width = $("#one").width();
            if (width >= 60) {
                $("#one").width(width - 5);
                $("#one").css("left", (Wwidth / 2) - ($("#one").width() / 2));
                $("#one").css("top", (Wheight / 2) - ($("#one").height() / 2) - 30);
            }

        }).on("touchend", function () {
            clearInterval(dowen);
        })

        $("#test1 .confirm-ok").on("tap", function () {
            PM = parseFloat($("#one").width()) / parseFloat(25);
            $.router.load("#test2");
        })
    });

    $(document).on("pageInit", "#test2", function (e, pageId, $page) {

    });
    $(document).on("pageInit", "#test3", function (e, pageId, $page) {

    });
    $(document).on("pageInit", "#test4", function (e, pageId, $page) {

        var test = new testEye({
            content: $('#test4 .content'), testOver: function (index) {
                eye.left.sl = arr[index].sl;
                eye.left.xs = arr[index].xs;
                $.router.load("#test3");
            }
        });

    });
    $(document).on("pageInit", "#test5", function (e, pageId, $page) {
        var test = new testEye({
            content: $('#test5 .content'), testOver: function (index) {
                eye.right.sl = arr[index].sl;
                eye.right.xs = arr[index].xs;
                $.router.load("#test6");
            }
        });
    });
    $(document).on("pageInit", "#test6", function (e, pageId, $page) {

        circle(eye);
        $("#save_archives").on("tap", function () {
                if ($(this).attr("state") == "0") {
                    return;
                }
                $(this).attr("state", "0");
                $(this).text("正在提交...");
                $.ajax({
                    type: "POST", // 要求是Post      Method：   POST
                    url: getAjaxUrl() + "vision/submitVisionResult",
                    data: { studentId: getStudentId(), leftVision: eye.left.sl, rightVision:eye.left.sl}, //这里是提交的参数 如果有其他参数自己获取 studentId int 是   用户标识
                    dataType: "json", //这里不用管 这是返回的格式， json 就好
                    success: function (data) {
                        if (data.code == 1) {
                            $(this).text("已存入档案");
                        } else {
                            $.alert(data.state);
                            $(this).text("存入视力档案");
                            $(this).attr("state", "1");
                        }
                    },
                    error: function (data) {
                        $.alert("系统异常稍后再试.....")
                        $(this).text("存入视力档案");
                        $(this).attr("state", "1");
                    }
                });

        });
    });
    //加载
    $.init();
});


var testEye = function (opction) {

    RandomE(opction.content, 0); //随机显示最大E

    //绑定事件
    BindEvent(opction.content);

    //随机显示E
    function RandomE(content, index) {
        var e = content.find(".E");
        var dq = e.attr("data-direction");
        var s;
        if (dq == "") {
            s = Math.floor(Math.random() * 4);
        } else {
            var randR = new Array();
            for (var i = 0; i < 4 ; i++) {
                if (parseInt(dq) != i) {
                    randR.push(i);
                }
            }
            var sj = Math.floor(Math.random() * randR.length);
            s = randR[sj];
        }
       
        switch (s) {
            case 0:
                e.css("transform", "rotate(90deg)");
                e.attr("data-direction", "0");
                break;
            case 1:
                e.css("transform", "rotate(180deg)");
                e.attr("data-direction", "1");
                break;
            case 2:
                e.css("transform", "rotate(270deg)");
                e.attr("data-direction", "2");
                break;
            case 3:
                e.css("transform", "rotate(360deg)");
                e.attr("data-direction", "3");
                break;
        }
   
        e.width(PM * arr[index]["mm"]); //初始化E
        e.attr("index", index); //小数计数
        e.css("display", "inline");
        $(content).find(".vision").html(arr[index].sl);
        $(content).find(".vision-x").html(arr[index].xs);
    }

    var timeOut;

    function StartTimeOut() {
        timeOut = setTimeout(function () {
            var e = opction.content.find(".E");
            var index = parseInt(e.attr("index"));
            opction.testOver(index)
        }, 8000); //如果5秒没
    }
    //绑定到事件
    function BindEvent(content) {
        content.on("swipeup", function () { clearTimeout(timeOut); StartTimeOut(); Judge(0); });
        content.on("swiperight", function () { clearTimeout(timeOut); StartTimeOut(); Judge(1); });
        content.on("swipedown", function () { clearTimeout(timeOut); StartTimeOut(); Judge(2); });
        content.on("swipeleft", function () { clearTimeout(timeOut); StartTimeOut(); Judge(3); });
    }

    //判断是否正确
    function Judge(direction) {
        var e = opction.content.find(".E");
        var Edirection = e.attr("data-direction");
        var index = parseInt(e.attr("index"));
        var status = "";
        if (Edirection != direction) {
            Check(false, index);
        } else {

            Check(true, index);
        }
    }

    //count = 0; //单E 滑动次数 最大6次
    // num = 0; //联系正确数 
    // index 当前记录项
    var countModel = { index: 0, num: 0, count: 0, error: 0 };//记数对象

    function Check(status, index) {
        var nexindex = index;//下次显示E大小
        if (index != countModel.index) { //如果变换了 E
            countModel = { index: index, num: 0, count: 0, error: 0 };//记数对象
        }
        countModel.count += 1; //计算总数
        if (status) { //如果对的
            countModel.num += 1;
            countModel.error = 0;
        } else { //如果不对的
            countModel.num = 0;
            countModel.error += 1;
        }
        if (countModel.count >= 6) { //共滑错6次
            clearTimeout(timeOut);
            opction.testOver(index);
            return;
        }
    

        if (index == arr.length - 1 && countModel.num >= 2) { //如果是最后一行滑对2次
            clearTimeout(timeOut);
            opction.testOver(index);
            return;
        }
        if (index == 0 && countModel.error >= 2) { //如果是第一行滑错2次
            clearTimeout(timeOut);
            opction.testOver(index);
            return;
        }
        if (countModel.error >= 3) { //连续滑错三次 这里不放大.返回当前视力
            clearTimeout(timeOut);
            opction.testOver(index);
            return;
        }
        if (index >= 5 && countModel.num >= 3) { //4.5 以上 需要滑对三次
            nexindex += 1;
        }
        if (index < 5 && countModel.num >= 2) { //4.5 以上 需要滑对2次
            nexindex += 1;
        }
        RandomE(opction.content, nexindex); //随机显示E
    };

}




//#region  图标======================================================

function circle(eyeValue) {
    var value1 = 101 - (((5.2 - eyeValue.left.sl) / 1.2).toFixed(1) * 100); //1-100; 值
    var value2 = 101 - (((5.2 - eyeValue.right.sl) / 1.2).toFixed(1) * 100); //1-100; 值
    var speed = 1 / 30 * Math.PI;
    var Q1 = ((Math.PI * 2) / 360 * value1 * 3.6) + 0.001;
    var Q2 = ((Math.PI * 2) / 360 * value2 * 3.6) + 0.001;
    var time = 20;
    createQuaCircle("svg1");
    doAnimation(Q1, "svg1", speed, time);
    showText("svg1", eyeValue.left.sl.toFixed(1) + "/" + eyeValue.left.xs.toFixed(2), 25);

    createQuaCircle("svg2");
    doAnimation(Q2, "svg2", speed, time);
    showText("svg2", eyeValue.right.sl.toFixed(1) + "/" + eyeValue.right.xs.toFixed(2), 25);
    //创建1/4半圆
}
function doAnimation(Q, id, speed, time) {
    var oSvg = document.getElementById(id);
    var oSvgWidth = parseInt((oSvg.curentStyle ? oSvg.curentStyle : window.getComputedStyle(oSvg, null)).width);
    oSvg.setAttribute("height", oSvgWidth);
    //创建use元素的组合
    var bgCircleG = document.createElementNS("http://www.w3.org/2000/svg", "g");
    bgCircleG.setAttribute("transform", "translate(" + 0.5 * oSvgWidth + "," + 0.5 * oSvgWidth + ")");
    createGradientBg(bgCircleG, oSvg, oSvgWidth);
    var currentAngle = 0;
    var rotateRirection;  //旋转的方向如果Q<=Math.PI rotateRirection 为1 大的弧度，如果Q>Math.PI rotateRirection为0 小的弧度
    if (Q <= 0) {
        //大圆
        var smallCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        smallCircle.setAttribute("cx", 0);
        smallCircle.setAttribute("cy", 0);
        smallCircle.setAttribute("r", 0.5 * oSvgWidth + 1);
        smallCircle.setAttribute("fill", "#e5e5e5");
        bgCircleG.appendChild(smallCircle);
        //小圆
        drawSmallCircle(id, bgCircleG, oSvgWidth);
    }
    else if (Q > 0 && Q <= 2 * Math.PI) {
        rotateRirection = judgeRirection(currentAngle);
        currentAngle += speed;
        var tId = null;
        annimationCircle(id, bgCircleG, currentAngle, oSvgWidth, rotateRirection);
        tId = setInterval(function () {
            if (currentAngle <= Q) {
                rotateRirection = judgeRirection(currentAngle);
                annimationCircle(id, bgCircleG, currentAngle, oSvgWidth, rotateRirection);
                currentAngle += speed;
                if (currentAngle >= Q) {
                    currentAngle = Q;
                    if (Q > Math.PI) {
                        rotateRirection = judgeRirection(currentAngle);
                    }
                    annimationCircle(id, bgCircleG, currentAngle, oSvgWidth, rotateRirection);
                    clearTimeout(tId);

                };
            }
            else {
                currentAngle = Q;
                rotateRirection = judgeRirection(currentAngle);
                annimationCircle(id, bgCircleG, currentAngle, oSvgWidth, rotateRirection);
                clearTimeout(tId);

            }
        }, time);
    }
    else if (Q > 2 * Math.PI) {
        drawSmallCircle(id, bgCircleG, oSvgWidth);
    }

}

function createQuaCircle(id) {
    var oSvg = document.getElementById(id);
    var oSvgWidth = parseInt((oSvg.curentStyle ? oSvg.curentStyle : window.getComputedStyle(oSvg, null)).width);
    var cr1 = cr2 = 0.5 * oSvgWidth;
    var oPathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
    var d = "M0,0" + " L 0," + -0.5 * oSvgWidth + " A" + 0.5 * oSvgWidth + "," + 0.5 * oSvgWidth + " 0 0,1 " + 0.5 * oSvgWidth + ",0 z";
    oPathElement.id = "halfCircle";
    oPathElement.setAttribute("d", d);
    var omydefs = document.getElementById("mydefs");
    omydefs.appendChild(oPathElement);
}

function createGradientBg(bgCircleG, oSvg) {

    //创建第一个use元素
    var bgCircle1 = document.createElementNS("http://www.w3.org/2000/svg", "use");
    bgCircle1.setAttribute("fill", "url(#lightGreenGradient)");
    bgCircle1.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#halfCircle");
    //创建第2个use元素并且旋转90度
    var bgCircle2 = document.createElementNS("http://www.w3.org/2000/svg", "use");
    bgCircle2.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#halfCircle");
    bgCircle2.setAttribute("fill", "url(#greenDeepGradient)");
    bgCircle2.setAttribute("transform", "rotate(90)");
    //创建第3个use元素并且旋转180度
    var bgCircle3 = document.createElementNS("http://www.w3.org/2000/svg", "use");
    bgCircle3.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#halfCircle");
    bgCircle3.setAttribute("fill", "url(#greenLightRedGradient)");
    bgCircle3.setAttribute("transform", "rotate(180)");
    //创建第4个use元素并且旋转270度
    var bgCircle4 = document.createElementNS("http://www.w3.org/2000/svg", "use");
    bgCircle4.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#halfCircle");
    bgCircle4.setAttribute("fill", "url(#LightRedGradient)");
    bgCircle4.setAttribute("transform", "rotate(270)");
    //将use元素追加到组合中
    bgCircleG.appendChild(bgCircle1);
    bgCircleG.appendChild(bgCircle2);
    bgCircleG.appendChild(bgCircle3);
    bgCircleG.appendChild(bgCircle4);
    oSvg.appendChild(bgCircleG);
}
//动态圆遮挡边用灰色填充
function annimationCircle(id, bgCircleG, Q, oSvgWidth, rotateRirection) {
    if (oPathElement2 = document.getElementById("half" + id)) {
        bgCircleG.removeChild(oPathElement2);
    };
    var oPathElement2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    var d = "M0,0" + " L" + (0.5 * oSvgWidth) * Math.sin(Q) + "," + (-(0.5 * oSvgWidth) * Math.cos(Q)) + " A" + (0.5 * oSvgWidth) + "," + (0.5 * oSvgWidth) + " 0 " + rotateRirection + ",1 " + "0 " + (-0.5 * oSvgWidth) + " z";
    oPathElement2.id = "half" + id;
    oPathElement2.setAttribute("d", d);
    oPathElement2.setAttribute("stroke", "#e5e5e5");
    oPathElement2.setAttribute("fill", "#e5e5e5");
    bgCircleG.appendChild(oPathElement2);
    drawSmallCircle(id, bgCircleG, oSvgWidth);
}
// 圆弧中比较小的圆用白色填充
function drawSmallCircle(id, bgCircleG, oSvgWidth) {
    if (smallCircle2 = document.getElementById("smallCircle" + id)) {
        bgCircleG.removeChild(smallCircle2);
    };
    var smallCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    smallCircle.id = "smallCircle" + id;
    smallCircle.setAttribute("cx", 0);
    smallCircle.setAttribute("cy", 0);
    smallCircle.setAttribute("r", 0.4 * oSvgWidth + 1);
    smallCircle.setAttribute("stroke", "#FFF");
    smallCircle.setAttribute("stroke-width", "4");
    smallCircle.setAttribute("fill", "#FFF");
    bgCircleG.appendChild(smallCircle);
}
//rotateRirection 旋转的方向如果<=Math.PI rotateRirection 为1 大的弧度，如果>Math.PI rotateRirection为0 小的弧度
function judgeRirection(angle) {
    if (angle <= Math.PI) {
        rotateRirection = 1;
    }
    else {
        rotateRirection = 0;
    }
    return rotateRirection;
}

function showText(id, value, fontSize) {
    var oSvg = document.getElementById(id);
    var oSvgWidth = parseInt((oSvg.curentStyle ? oSvg.curentStyle : window.getComputedStyle(oSvg, null)).width);
    if (oSvgWidth < 480) {
        fontSize = 0.8 * parseInt(fontSize);
    };
    var otext = document.createElementNS("http://www.w3.org/2000/svg", "text");
    var oTspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
    otext.setAttribute("x", parseInt(0.5 * oSvgWidth));
    otext.setAttribute("y", parseInt(0.5 * oSvgWidth));
    otext.setAttribute("font-size", fontSize);
    otext.setAttribute("z-index", 99999);
    otext.setAttribute("font-weight", "500");
    otext.setAttribute("font-family", "微软雅黑");
    otext.setAttribute("text-anchor", "middle");
    otext.setAttribute("dominant-baseline", "middle");
    otext.setAttribute("fill", "#38c19d");
    var oTextCon = document.createTextNode(value);
    otext.appendChild(oTextCon);
    oSvg.appendChild(otext);
}
//#endregion