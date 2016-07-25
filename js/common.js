function btnXZ(btns){
	btns.on("click",function(){
		$(this).addClass("active").siblings().removeClass("active");
	});
}
function btnView(btns, views){
	btns.on("click",function(){
		for (var i = 0; i < btns.length; i++) {
			if (this == btns[i]) {
				$(btns[i]).addClass("active");
				$(views[i]).addClass("show");
			}else{
				$(btns[i]).removeClass("active");
				$(views[i]).removeClass("show");
			}
		}
	});
}
//仿select
function select(selectBox){
	var btn = $(selectBox).find("span");
	var ul = $(selectBox).find("ul");
	var li = $(selectBox).find("li");
	btn.on("click",function(){
		for (var i = 0; i < btn.length; i++) {
			if (this == btn[i]) {
				$(ul[i]).slideToggle(300);
			}else{
				$(ul[i]).slideUp(300);
			}
		}
	});
	li.on("click",function(){
		$(this).parent().slideUp(300);
		$(this).parent().siblings("span").find("i").html($(this).html());
	});
}
//左右滑动
function jdt(left_btn,right_btn,box,width){
    left_btn.on("click",function(){
        var list = $(box).find("li");
        var len = $(list).length;//获取list的长度
        if ($(box).find("li")) {
            for (var i = 1; i < list.length; i++) {
                var left = $(list[i]).css("left");//获取当前li的left
                left = (parseInt(left) - width) + "px";
                $(list[i]).animate({"left":left},400);//每个li相对于当前位置向左移动200px
            }
            $(box).find("li").first().css({"left":width * (len - 1) - width});//将第一个li的位置移到最后面
            $(box).find("li").first().insertAfter($(box).find("li").last());//同时将第一个li这个标签移到最后面
        }
    });
    right_btn.on("click",function(){
        var list = $(box).find("li");//每次执行重新定位li
        var len = $(list).length;//获取list的长度
        if ($(box).find("li")) {
            for (var i = 0; i < list.length - 1; i++) {
                var left = $(list[i]).css("left");//获取当前li的left
                left = (parseInt(left) + width) + "px";
                $(list[i]).animate({"left":left},400);//每个li相对于当前位置向右移动200px
            }
            $(box).find("li").last().css({"left":width * 0 - width});//将最后一个li的位置移到最前面
            $(box).find("li").last().insertBefore($(box).find("li").first());//同时将最后一个li这个标签移到最前面
        }
    });
}
//全选、全不选
function selectAll(selectAll, selects){
	selectAll.on("click",function(){
		if ($(this).is(":checked")) {
			$(selectAll).prop("checked", true);
			$(selects).prop("checked", true);
		}else{
			$(selectAll).prop("checked", false);
			$(selects).prop("checked", false);
		}
	});
	selects.on("click",function(){
		if ($(this).is(":checked")) {
			$(this).prop("checked", true);
			if (ergodic(selects) == selects.length) {
				$(selectAll).prop("checked", true);
			}
		}else{
			$(selectAll).prop("checked", false);
			$(this).prop("checked", false);
		}
	});
	//遍历checkbox  如果都选中了 selectAll要变成选中状态
	function ergodic(selects){
		var num = 0;
		for (var i = 0; i < selects.length; i++) {
			if ($(selects[i]).is(":checked")){
				num ++;
			}
		}
		return num;
	}
}