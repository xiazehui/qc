var person = {sex:"", birthday:"", height:0, weight:0, father:0, mother:0, score: 0};
var myDate = new Date();
var oldDate = new Date();
oldDate.setYear(oldDate.getFullYear() - 18); 
var oldDate2 = new Date();
oldDate2.setYear(oldDate2.getFullYear() - 3); 

$(function(){
	btnXZ($(".content .btn.default"));
	btnXZ($(".content .tool"));
	btnMoreXZ($(".content .btn.more"));
	$("#birthday").calendar({
	    value: [myDate]
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
	var score = 0;
	for (var i = 0; i < btn.length; i++) {
		if ($(btn[i]).hasClass("active")) {
			score = score + parseFloat($(btn[i]).attr("score"));
			num++;
		}
	}
	if (num > 0) {
		person.score = person.score + score;
		return 1;
	}else{
		return 0;
	}
}
function query2(content){
	var btn = $(content).find(".tool");
	var num = 0;
	var score = 0;
	for (var i = 0; i < btn.length; i++) {
		if ($(btn[i]).hasClass("active")) {
			score = score + parseFloat($(btn[i]).attr("score"));
			num++;
		}
	}
	if (num > 0) {
		person.score = person.score + score;
		return 1;
	}else{
		return 0;
	}
}
function jump(id){
	console.log(person);
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
        	person.sex = $scope.sex;
        	jump(2);
        }
	};
});	
app.controller('subject2', function($scope) {
	$scope.birthday = "",
    $scope.height = "",
    $scope.weight = "",
    $scope.oldDate = oldDate,
    $scope.oldDate2 = oldDate2,
    $scope.next2 = function() {
        if ($scope.birthday === "" || $scope.height === "" || $scope.weight === "") {
        	alert("请讲信息填写完毕");
        }else{
        	person.birthday = $scope.birthday;
        	person.height = $scope.height;
        	person.weight = $scope.weight;
        	jump(3);
        }
    };
    $scope.change = function() {
    	var b = new Date(birthday.value);
    	if (b < oldDate) {
        	$("#subject2 #b-18").removeClass("ng-hide");
        }else{
        	$("#subject2 #b-18").addClass("ng-hide");
        }
        if (b > oldDate2) {
        	$("#subject2 #b-3").removeClass("ng-hide");
        }else{
        	$("#subject2 #b-3").addClass("ng-hide");
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
        	person.father = $scope.father;
        	person.mother = $scope.mother;
        	if (person.sex === "男孩") {
        		if (person.father >= 0 && person.father < 300) {
        			person.score = person.score + 4;
        		}else if (person.father >= 300 && person.father < 600) {
        			person.score = person.score + 5;
        		}else if (person.father >= 600) {
        			person.score = person.score + 6;
        		}

        		if (person.mother >= 0 && person.mother < 300) {
        			person.score = person.score + 8;
        		}else if (person.mother >= 300 && person.mother < 600) {
        			person.score = person.score + 9;
        		}else if (person.mother >= 600) {
        			person.score = person.score + 10;
        		}
        	}else if (person.sex === "女孩") {
				if (person.father >= 0 && person.father < 300) {
        			person.score = person.score + 8;
        		}else if (person.father >= 300 && person.father < 600) {
        			person.score = person.score + 9;
        		}else if (person.father >= 600) {
        			person.score = person.score + 10;
        		}

        		if (person.mother >= 0 && person.mother < 300) {
        			person.score = person.score + 4;
        		}else if (person.mother >= 300 && person.mother < 600) {
        			person.score = person.score + 5;
        		}else if (person.mother >= 600) {
        			person.score = person.score + 6;
        		}
        	}
        	jump(4);
        }
    };
});	
app.controller('subject4', function($scope) {
	$scope.infos = [
		{con:"不抖动", score: 3},
		{con:"轻微抖动", score: 4},
		{con:"快速抖动", score: 5}
	],
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
	$scope.infos = [
		{con:"介于嘴唇与鼻尖", score: 2},
		{con:"介于笔尖与额头", score: 3},
		{con:"介于额头与石头", score: 4},
		{con:"如石头", score: 5}
	],
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
	$scope.infos = [
		{con:"能继续保持", score: 6},
		{con:"偶尔保持", score: 8},
		{con:"基本做不到", score: 10}
	],
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
	$scope.infos = [
		{con:"看窗外风景", score: 3},
		{con:"看书", score: 10},
		{con:"玩手机", score: 10},
		{con:"睡觉", score: 4}
	],
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
	$scope.infos = [
		{con:"趴着看", score: 2.5},
		{con:"灯光黑暗或闪烁情况下看", score: 2.5},
		{con:"太阳光下看", score: 2.5},
		{con:"边吃饭边看", score: 2.5}
	],
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
	$scope.infos = [
		{con:"30分钟以内", score: 10},
		{con:"30~60分钟", score: 8},
		{con:"60~90分钟", score: 6},
		{con:"90分钟以上", score: 4}
	],
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
	$scope.infos = [
		{con:"是", score: 5},
		{con:"否", score: 2}
	],
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
	$scope.infos = [
		{con:"少于半小时", score: 3},
		{con:"半小时到一小时", score: 5},
		{con:"一小时到两小时", score: 7},
		{con:"两小时以上", score: 10}
	],
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
	$scope.infos = [
		{con:"书店、图书馆", score: 5},
		{con:"和小伙伴去户外玩耍", score: 2},
		{con:"兴趣班", score: 5},
		{con:"宅在家里", score: 5}
	],
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
	$scope.infos = [
		{con:"眯眼", score: 1},
		{con:"歪头", score: 1},
		{con:"侧视", score: 1},
		{con:"皱眉", score: 1},
		{con:"频眨眼、猛眨眼", score: 1}
	],
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
	$scope.infos = [
		{con:"是", score: 5},
		{con:"否", score: 2}
	],
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
		$scope.infos = [
		{con:"没有见过", score: 1},
		{con:"偶尔有", score: 3},
		{con:"经常", score: 5}
	],
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
	$scope.infos = [
		{con:"是", score: 2},
		{con:"否", score: 5}
	],
    $scope.next17 = function() {
    	var num = query($("#subject17 .content"));
        if (num === 0) {
        	alert("请选择选项");
        }else{
        	alert("题目测试完成");
        	$.showPreloader();
        	console.log(person);
        	var img = $(".content-img");
        	if (person.score >= 0 && person.score <= 45) {
        		$(img[0]).removeClass("hide");
        	}else if (person.score >= 46 && person.score <= 65) {
        		$(img[1]).removeClass("hide");
        	}else if (person.score >= 66 && person.score <= 85) {
        		$(img[2]).removeClass("hide");
        	}else if (person.score >= 86 && person.score <= 100) {
        		$(img[3]).removeClass("hide");
        	}
		    setTimeout(function () {
		        $.hidePreloader();
		        $.router.load("#subject18");
		    }, 1000);
        }
    };
});