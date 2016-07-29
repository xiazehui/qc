var PM = 0;
var arr = [
	[31, 28, 23, 18, 15, 12, 9, 8, 7, 6, 3, 2.5, 2],
	[4.0, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 5.0, 5.1, 5.2],
	[0.1, 0.12, 0.15, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.8, 1.0, 1.2, 1.5]
]
var index = 7;
var left_eye = [];
var right_eye = [];
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
		$('#test3 .content').find(".E").width(PM * arr[0][index]);
		$('#test4 .content').find(".E").width(PM * arr[0][index]);
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
function estimate(){
	var info = $("#eye-info span");
	$(info[0]).html(left_eye[0]);
	$(info[1]).html(left_eye[1]);
	$(info[2]).html(right_eye[0]);
	$(info[3]).html(right_eye[1]);
	var leftEye = $("#left-eye");
	var rightEye = $("#right-eye");
	console.log(leftEye, leftEye);
	switch(parseFloat(left_eye[0])){
		case 5.2:
		case 5.1:
		case 5.0:
			$(leftEye).addClass("left-pos-0");
			break;
		case 4.9:
		case 4.8:			
		case 4.7:
			$(leftEye).addClass("left-pos-25");
			break;
		case 4.6:
		case 4.5:
		case 4.4:
			$(leftEye).addClass("left-pos-50");
			break;
		case 4.3:
		case 4.2:
		case 4.1:
		case 4.0:
			$(leftEye).addClass("left-pos-75");
			break;
	}
	switch(parseFloat(right_eye[0])){
		case 5.2:
		case 5.1:
		case 5.0:
			$(rightEye).addClass("left-pos-0");
			break;
		case 4.9:
		case 4.8:			
		case 4.7:
			$(rightEye).addClass("left-pos-25");
			break;
		case 4.6:
		case 4.5:
		case 4.4:
			$(rightEye).addClass("left-pos-50");
			break;
		case 4.3:
		case 4.2:
		case 4.1:
		case 4.0:
			$(rightEye).addClass("left-pos-75");
			break;
	}
}
$(function(){
	test($("#test3 .content"), 3);
	test($("#test4 .content"), 4);
});
function test(content, id){
	var img = $(content).find(".E");
	var correct_num = $(content).find(".num-correct");
	var error_num = $(content).find(".num-error");
	function correct(){
	    $(correct_num).html(parseInt($(correct_num).html()) + 1);
        if (index > 11) {
            jump();      
        }else{
            index ++;
            change();
            o = suiji();
            scale(img, o);
        }
	}
	function error(){
	    $(error_num).html(parseInt($(error_num).html()) + 1);
	    if (parseInt($(correct_num).html()) > 0) {
	    	index --;
            change();
            o = suiji();
            scale(img, o);
	    	jump();  
	    }else{
	        if (index < 1) {
	            jump();      
	        }else{
	            index --;
	            change();
	            o = suiji();
	            scale(img, o);
	        } 
	    }     
	} 
	function change(){
		$(img).width(PM * arr[0][index]);
        $(content).find(".vision").html(arr[1][index]);
        $(content).find(".vision-x").html(arr[2][index]);
	}
	function jump(){
		$.alert('测试结束', function(){
        	$.router.load("#test"+ (id+1) +"");
        	if (id === 3) {
        		index = 7;
        		left_eye.push($(content).find(".vision").html());
        		left_eye.push($(content).find(".vision-x").html());
        	}else{
        		right_eye.push($(content).find(".vision").html());
        		right_eye.push($(content).find(".vision-x").html());
        		estimate();
        	}
        });		  
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
}