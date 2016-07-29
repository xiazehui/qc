var PM = 0;
var arr = [31, 28, 23, 18, 15, 12, 9, 8, 7, 6, 3, 2.5, 2, 1.5];
var index = 7;
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
	var btn = $("#test2 .confirm-ok");
	btn.on("click", function(){
		PM = $(img).width() / 25;
		$('#test3 .content').find(".E").width(PM * arr[index]);
		$.router.load("#test3");
	})
});
function suiji(){
	var s = Math.floor(Math.random()*(3+1));
	switch(s){
		case 0:
			return "0";
		case 1:
			return "1";
		case 2:
			return "2";
		case 3:
			return "3";
	}
}  
function scale(img, o){
	switch(o){
		case "0":
			$(img).css("transform", "rotate(90deg)");
			$(img).attr("data-direction", "0");
			break;
		case "1":
			$(img).css("transform", "rotate(180deg)");
			$(img).attr("data-direction", "1");
			break;
		case "2":
			$(img).css("transform", "rotate(270deg)");
			$(img).attr("data-direction", "2");
			break;
		case "3":
			$(img).css("transform", "rotate(360deg)");
			$(img).attr("data-direction", "3");
			break;
	}
}
$(function(){
	var content = $('#test3 .content');
	var img = $(content).find(".E");
	var correct_num = $("#num-correct");
	var error_num = $("#num-error");
	function correct(){
	    $(correct_num).html(parseInt($(correct_num).html()) + 1);
        if (index > 12) {
            $.alert('已经没有更高的视力了', function(){
            	$.router.load("#test4");
            });	       
        }else{
            index ++;
            $(img).width(PM * arr[index]);
            o = suiji();
            scale(img, o);
        }
	}
	function error(){
	    $(error_num).html(parseInt($(error_num).html()) + 1);
	    if (index < 0) {
            $.alert('已经没有更低的视力了', function(){
            	$.router.load("#test4");
            });	       
        }else{
            index --;
            $(img).width(PM * arr[index]);
            o = suiji();
            scale(img, o);
        }
	}   
	content.on("swipeup", function(){
	    if ($(img).attr("data-direction") !== "0") {
	        error();
	    }else{
	        correct();
	    }
	});  
	content.on("swiperight", function(){
	    if ($(img).attr("data-direction") !== "1") {
	        error();
	    }else{
	        correct();
	    }
	});
	content.on("swipedown", function(){
	    if ($(img).attr("data-direction") !== "2") {
	        error();
	    }else{
	        correct();
	    }
	});
	content.on("swipeleft", function(){
	    if ($(img).attr("data-direction") !== "3") {
	        error();
	    }else{
	        correct();
	    }
	}); 	
});