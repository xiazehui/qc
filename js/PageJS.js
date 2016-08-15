
var Run = { getInteractionList: false, getQuestionList: false, getArticleList:false };

$(function () {

    //首页
    $(document).on("pageInit", "#page-index", function (e, pageId, $page) {
    
        $(".swiper-container").swiper();
    });


    //专家热线
    $(document).on("pageInit", "#page-problem", function (e, pageId, $page) {
        
        if (!Run.getInteractionList) {
            //  这里请求获取屈光度列表
            $.ajax({
                type: "GET", // 要求是Post      Method：   POST
                url: getAjaxUrl() + "interaction/getInteractionList", //这里请求获取屈光度列表 要求是Post
                dataType: "json", //这里不用管 这是返回的格式， json 就好
                success: function (data) {
                    Run.getInteractionList = true;
                    if (data.code == 1) {
                        if (data.data.length > 0) {
                            $(".list-block").css("display", "block");
                            for (var i = 0; i < data.data.length; i++) {
                                $(".list-block ul").append("<li class=\"item-content\"><a href=\"problem-details.html?question=" + encodeURI(data.data[i].question) + "&answer=" + encodeURI(data.data[i].answer) + "\"><div class=\"item-inner\"><div class=\"item-title\">" + data.data[i].question + "</div></div></a></li>")
                            }
                        } else {
                            $(".data_none").css("display", "block");
                        }
                    } else {
                        $.alert(data.code);
                        return;
                    }
                },
                error: function () {
                    alert("系统异常稍后再试...")
                }
            });
        }

    });

    //提交问题
    $(document).on("pageInit", "#page-problem-put", function (e, pageId, $page) {
        $(document).on('click', '.open-preloader-title.green', function () {
            $.showPreloader('提交问题中');
            $.ajax({
                type: "POST", // 要求是Post      Method：   POST
                url: getAjaxUrl() + "interaction/submitQuestion", //这里请求获取屈光度列表 要求是Post
                data: { userId: getUserID(), question: $("#question").val() }, //这里是提交的参数 如果有其他参数自己获取 studentId int 是   用户标识
                dataType: "json", //这里不用管 这是返回的格式， json 就好
                success: function (data) {
                    setTimeout(function () { $.hidePreloader(); }, 1000);
                    if (data.code == 1) {
                        Run.getQuestionList = false;
                        $.alert("问题提交成功。", function () {
                            $.router.load("/problem-histroy.html");
                        })
                    } else {
                        $.alert(data.state);
                    }
                },
                error: function () {
                    $.alert("系统异常稍后再试...")
                }
            });

        });

        $(document).on('input', '#question', function () {
            if ($("#question").val() != "") {

                $("#questionPut").addClass("green").removeClass("gray");

            } else {

                $("#questionPut").addClass("gray").removeClass("green");
            }
        });

    });

    //问题列表
    $(document).on("pageInit", "#page-problem-histroy", function (e, pageId, $page) {
        if (!Run.getQuestionList) {
            $.ajax({
                type: "POST", // 要求是Post      Method：   POST
                url: getAjaxUrl() + "interaction/getQuestionList", //这里请求获取屈光度列表 要求是Post
                data: { userId: getUserID(), page: 0 }, //这里是提交的参数 如果有其他参数自己获取 studentId int 是   用户标识
                dataType: "json", //这里不用管 这是返回的格式， json 就好
                success: function (data) {
                    Run.getQuestionList = true;
                    if (data.code == 1) {
                        if (data.data.length > 0) {
                            for (var i = 0; i < data.data.length; i++) {
                                var date = new Date(data.data[i].submitTime)
                                var html = "<div class=\"card\">" +
                                            "<a href=\"problem-details.html?question=" + encodeURI(data.data[i].question) + "&answer=" + encodeURI(data.data[i].answer) + "\">" +
                                           "<div class=\"card-header\">" + date.getFullYear() + "年" + date.getMonth() + "月" + date.getDay() + "日" + "<span class=\"" + (data.data[i].answer == "" ? "" : "green-zt") + "\">" + (data.data[i].answer == "" ? "待回复" : "已回复") + "</span></div>" +
                                           "<div class=\"card-content\">" +
                                           "<div class=\"card-content-inner\">" + data.data[i].question + "</div>" +
                                           "</div></a></div>";
                                $(".content").append(html);
                            }
                        } else {
                            $(".data_none").css("display", "block");
                        }

                    } else {
                        $.alert(data.state);
                    }
                },
                error: function () {
                    $.alert("系统异常稍后再试...")
                }
            });
        }
    });

    //问题详情
    $(document).on("pageInit", "#page-problem-details", function (e, pageId, $page) {
        var question = decodeURIComponent(GetQueryString("question"));
        var answer = decodeURIComponent(GetQueryString("answer"));
        $("#question p").text(question);
        if (answer != "") {
            $("#answer").css("display", "block");
            $("#answer p").text(answer);
        }
    })
    

    //护眼课堂
    $(document).on("pageInit", "#page-eye", function (e, pageId, $page) {

        if (!Run.getArticleList) {
            $.ajax({
                type: "POST", // 要求是Post      Method：   POST
                url: getAjaxUrl() + "article/getArticleList", //这里请求获取屈光度列表 要求是Post
                dataType: "json", //这里不用管 这是返回的格式， json 就好
                data: { type: 1, page: 0 },
                success: function (data) {
                    $(".hyfa ul").html("");
                    Run.getArticleList = true;
                    if (data.code == 1) {
                        if (data.data.length > 0) {
                            for (var i = 0; i < data.data.length; i++) {
                                $(".hyfa ul").append("<li><A href=\"eye_content.html?id=" + data.data[i].articleId + "\">" + data.data[i].title + "</A></li>")
                            }
                        } 
                    } else {
                        $.alert(data.code);
                        return;
                    }
                },
                error: function () {
                    alert("系统异常稍后再试...")
                }
            });
        }
    });


    //护眼课堂详情
    $(document).on("pageInit", "#eye_content", function (e, pageId, $page) {

        var id = GetQueryString("id");
        $.ajax({
            type: "POST", // 要求是Post      Method：   POST
            url: getAjaxUrl() + "article/getArticle", //这里请求获取屈光度列表 要求是Post
            dataType: "json", //这里不用管 这是返回的格式， json 就好
            data: { articleId: id },
            success: function (data) {
                if (data.code == 1) {
                    $(".content_eye").html(data.data.html);
                 
                    $(".content_eye").find("img").css("width", "100%");
                    $.each($(".content_eye").find("img"), function (index, val) {
                        $(val).attr("src", getAjaxUrl() + $(val).attr("src"))
                    });
                }
            },
            error: function () {
                alert("系统异常稍后再试...")
            }
        });
    });


    //加载
    $.init()
});



