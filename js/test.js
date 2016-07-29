$(function(){
	var img = $("#one");
	var num = 10;
	var fd = $("#fd");
	var sx = $("#sx");
	fd.on("click", function(){
		num ++;
		$(img).addClass("one-"+ num +"").removeClass("one-"+ (num-1) +"");
	});
	sx.on("click", function(){
		num --;
		$(img).addClass("one-"+ num +"").removeClass("one-"+ (num+1) +"");
	});
});
$(function(){
	var num = 52;
	var content = $('#test2 .content');
	var img = $(content).find(".E");
	var correct_num = $("#num-correct");
	var error_num = $("#num-error");
	function correct(){
	    $(correct_num).html(parseInt($(correct_num).html()) + 1);
	    if (parseInt($(correct_num).html()) % 4 === 0 && $(correct_num).html() > 0) {
	        if (num < 52) {
	            $.alert('已经没有更高的视力了');
	        }else{
	            console.log("切换更小的图片");
	            num = num - 1;
	            $(img).attr("src", "images/pic/vision-"+ num +".png");
	        }
	    }
	}
	function error(){
	    $(error_num).html(parseInt($(error_num).html()) + 1);
	}
	content.on("swipeleft", function(){
	    if ($(img).attr("data-direction") !== "左") {
	        error();
	    }else{
	        correct();
	    }
	})  
	content.on("swiperight", function(){
	    if ($(img).attr("data-direction") !== "右") {
	        error();
	    }else{
	        correct();
	    }
	})  
	content.on("swipeup", function(){
	    if ($(img).attr("data-direction") !== "上") {
	        error();
	    }else{
	        correct();
	    }
	})  
	content.on("swipedown", function(){
	    if ($(img).attr("data-direction") !== "下") {
	        error();
	    }else{
	        correct();
	    }
	}) 	
});
$(function(){
	$(document).on('click','.confirm-ok', function () {
	    $.confirm('视力测试完成了吗', function () {
	        $.router.load("#test4");
	    });
	}); 	
});