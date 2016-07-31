var PM = 0;
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
var index = 7;//初始视力
var left_eye = [];//左眼视力信息
var right_eye = [];//右眼视力信息
var correct_num = 0;//正确次数
var error_num = 0;//错误次数
$(function(){
	var img = $("#one");
	var num = 10;
	var fd = $("#fd");
	var sx = $("#sx");
	fd.on("click", function(){
		if (num < 20) {
			num ++;
			$(img).addClass("one-"+ num +"").removeClass("one-"+ (num-1) +"");
		}else{
			$.alert('已达到最大了');
		}
	});
	sx.on("click", function(){		
		if (num > 5) {
			num --;
			$(img).addClass("one-"+ num +"").removeClass("one-"+ (num+1) +"");
		}else{
			$.alert('已达到最小了');
		}
	});
	var btn = $("#test1 .confirm-ok");
	btn.on("click", function(){
		PM = $(img).width() / 25;
		$('#test4 .content').find(".E").width(PM * arr[index]["mm"]);
		$('#test5 .content').find(".E").width(PM * arr[index]["mm"]);
		$.router.load("#test2");
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
	circle(parseFloat(left_eye[0]), parseFloat(right_eye[0]));
	$("#svg1").find("text").html(left_eye[0]+"/"+left_eye[1]);
	$("#svg2").find("text").html(right_eye[0]+"/"+right_eye[1]);
}
$(function(){
	test($("#test4 .content"), 4);
	test($("#test5 .content"), 5);
});
function test(content, id){
	var img = $(content).find(".E");
	function correct(){
		correct_num ++;
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
		error_num ++;
	    if (correct_num > 0) {
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
		$(img).width(PM * arr[index]["mm"]);
        $(content).find(".vision").html(arr[index]["sl"]);
        $(content).find(".vision-x").html(arr[index]["xs"]);
	}
	function jump(){
		$.alert('测试结束', function(){
        	if (id === 4) {
        		index = 7;
        		left_eye.push($(content).find(".vision").html());
        		left_eye.push($(content).find(".vision-x").html());
        		$.router.load("#test3");
        		correct_num = 0;
        	}else{
        		right_eye.push($(content).find(".vision").html());
        		right_eye.push($(content).find(".vision-x").html());
        		$.router.load("#test6");
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