$(function(){
	btnXZ($(".content .btn.default"));
	btnXZ($(".content .tool"));
	btnMoreXZ($(".content .btn.more"));
	$("#birthday").calendar({
	    value: ['2016-01-01']
	});
	$(".content .btn.more").on("click", function(){
		$(this).siblings(".single").removeClass("active");
	});
	$(".content .btn.single").on("click", function(){
		$(this).addClass("active").siblings(".btn").removeClass("active");
	});
});
function query(content){
	var btn = $(content).find(".btn");
	var num = 0;
	for (var i = 0; i < btn.length; i++) {
		if ($(btn[i]).hasClass("active")) {
			num++;
		}
	}
	if (num > 0) {
		return 1;
	}else{
		return 0;
	}
}
function query2(content){
	var btn = $(content).find(".tool");
	var num = 0;
	for (var i = 0; i < btn.length; i++) {
		if ($(btn[i]).hasClass("active")) {
			num++;
		}
	}
	if (num > 0) {
		return 1;
	}else{
		return 0;
	}
}
function jump(id){
	$.showPreloader();
    setTimeout(function () {
        $.hidePreloader();
        $.router.load("#subject"+ id +"");
    }, 1000);
}
var app = angular.module('app', []);
app.controller('subject1', function($scope) {
	$scope.sex = "";
	$scope.next1 = function() {
		if ($scope.sex === "") {
        	alert("请选择小孩性别");
        }else{
        	jump(2);
        }
	};
});	
app.controller('subject2', function($scope) {
	$scope.birthday = "",
    $scope.height = "",
    $scope.weight = "";
    $scope.next2 = function() {
        if ($scope.birthday === "" || $scope.height === "" || $scope.weight === "") {
        	alert("请讲信息填写完毕");
        }else{
        	jump(3);
        }
    };
});	
app.controller('subject3', function($scope) {
	$scope.father = "",
    $scope.mother = "",
    $scope.next3 = function() {
        if ($scope.father === "" || $scope.mother === "") {
        	alert("请讲信息填写完毕");
        }else{
        	jump(4);
        }
    };
});	
app.controller('subject4', function($scope) {
	$scope.infos = ["不抖动", "轻微抖动", "快速抖动"],
    $scope.next4 = function() {
    	var num = query($("#subject4 .content"));
        if (num === 0) {
        	alert("请选择选项");
        }else{
        	jump(5);
        }
    };
});	
app.controller('subject5', function($scope) {
	$scope.infos = ["介于嘴唇与鼻尖", "介于笔尖与额头", "介于额头与石头", "如石头"],
    $scope.next5 = function() {
    	var num = query($("#subject5 .content"));
        if (num === 0) {
        	alert("请选择选项");
        }else{
        	jump(6);
        }
    };
});
app.controller('subject6', function($scope) {
	$scope.infos = ["能继续保持", "偶尔保持", "基本做不到"],
    $scope.next6 = function() {
    	var num = query($("#subject6 .content"));
        if (num === 0) {
        	alert("请选择选项");
        }else{
        	jump(7);
        }
    };
});
app.controller('subject7', function($scope) {
    $scope.next7 = function() {
    	var num = query2($("#subject7 .content"));
        if (num === 0) {
        	alert("请选择选项");
        }else{
        	jump(8);
        }
    };
});
app.controller('subject8', function($scope) {
	$scope.infos = ["看窗外风景", "看书", "玩手机", "睡觉"],
    $scope.next8 = function() {
    	var num = query($("#subject8 .content"));
        if (num === 0) {
        	alert("请选择选项");
        }else{
        	jump(9);
        }
    };
});
app.controller('subject9', function($scope) {
	$scope.infos = ["趴着看", "灯光黑暗或闪烁情况下看", "太阳光下看", "边吃饭边看"],
    $scope.next9 = function() {
    	var num = query($("#subject9 .content"));
        if (num === 0) {
        	alert("请选择选项");
        }else{
        	jump(10);
        }
    };
});
app.controller('subject10', function($scope) {
	$scope.infos = ["30分钟以内", "30~60分钟", "60~90分钟", "90分钟以上"],
    $scope.next10 = function() {
    	var num = query($("#subject10 .content"));
        if (num === 0) {
        	alert("请选择选项");
        }else{
        	jump(11);
        }
    };
});
app.controller('subject11', function($scope) {
	$scope.infos = ["是", "否"],
    $scope.next11 = function() {
    	var num = query($("#subject11 .content"));
        if (num === 0) {
        	alert("请选择选项");
        }else{
        	jump(12);
        }
    };
});
app.controller('subject12', function($scope) {
	$scope.infos = ["少于半小时", "半小时到一小时", "一小时到两小时", "两小时以上"],
    $scope.next12 = function() {
    	var num = query($("#subject12 .content"));
        if (num === 0) {
        	alert("请选择选项");
        }else{
        	jump(13);
        }
    };
});
app.controller('subject13', function($scope) {
	$scope.infos = ["书店、图书馆", "和小伙伴去户外玩耍", "兴趣班", "宅在家里"],
    $scope.next13 = function() {
    	var num = query($("#subject13 .content"));
        if (num === 0) {
        	alert("请选择选项");
        }else{
        	jump(14);
        }
    };
});
app.controller('subject14', function($scope) {
	$scope.infos = ["眯眼", "歪头", "侧视", "皱眉", "频眨眼、猛眨眼"],
    $scope.next14 = function() {
    	var num = query($("#subject14 .content"));
        if (num === 0) {
        	alert("请选择选项");
        }else{
        	jump(15);
        }
    };
});
app.controller('subject15', function($scope) {
	$scope.infos = ["是", "否"],
    $scope.next15 = function() {
    	var num = query($("#subject15 .content"));
        if (num === 0) {
        	alert("请选择选项");
        }else{
        	jump(16);
        }
    };
});
app.controller('subject16', function($scope) {
	$scope.infos = ["没有见过", "偶尔有", "经常"],
    $scope.next16 = function() {
    	var num = query($("#subject16 .content"));
        if (num === 0) {
        	alert("请选择选项");
        }else{
        	jump(17);
        }
    };
});
app.controller('subject17', function($scope) {
	$scope.infos = ["是", "否"],
    $scope.next17 = function() {
    	var num = query($("#subject17 .content"));
        if (num === 0) {
        	alert("请选择选项");
        }else{
        	alert("题目测试完成");
        	$.showPreloader();
		    setTimeout(function () {
		        $.hidePreloader();
		        $.router.load("/index.html", true);
		    }, 1000);
        }
    };
});