$(function(){
	btnXZ($(".content .btn"));
	btnXZ($(".content .tool"));
	$("#birthday").calendar({
	    value: ['2016-01-01']
	});
});
var app = angular.module('app', []);
app.controller('subject1', function($scope) {
	$scope.sex = "";
	$scope.next1 = function() {
		if ($scope.sex === "") {
        	alert("请选择小孩性别");
        }else{
        	$.showPreloader();
		    setTimeout(function () {
		        $.hidePreloader();
		        $.router.load("#subject2");
		    }, 1000);
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
        	$.showPreloader();
		    setTimeout(function () {
		        $.hidePreloader();
		        $.router.load("#subject3");
		    }, 1000);
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
        	$.showPreloader();
		    setTimeout(function () {
		        $.hidePreloader();
		        $.router.load("#subject4");
		    }, 1000);
        }
    };
});	