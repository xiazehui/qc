var person = { sex: "", birthday: "", height: 0, weight: 0, father: 0, mother: 0, score: 0 };

function thisPage(thisPageID) {

    switch (thisPageID) {
        case 1:
            //#region  跳转执行方法===========================================
            if (person.sex == "") {
                $.alert("请选择测试孩子性别！");
                return;
            }
            //#endregion================================================
            break;
        case 2:
            //#region  跳转执行方法===========================================
            person.birthday = new Date($("#birthday").val()).getTime();
            person.height = $("#height").val();
            person.weight = $("#weight").val();
            if (person.birthday == "") {
                $.alert("请选择孩子出生日期！");
                return;
            }

            var agetime = new Date().getTime() - person.birthday;
            var age = Math.floor(agetime / 86400000 / 365);

            if (age < 3) {
                $("#b-3").removeClass("hide");
                $("#b-18").addClass("hide");
                return;
            } else if (age > 18) {
                $("#b-3").addClass("hide");
                $("#b-18").removeClass("hide");
                return;
            } else {

                $("#b-3").addClass("hide");
                $("#b-18").addClass("hide");
            }

            if (person.height == "") {
                $.alert("请填写孩子身高！");
                return;
            }
            if (person.weight == "") {
                $.alert("请填写孩子体重！");
                return;
            }

            $.ajax({
                type: "POST", // 要求是Post      Method：   POST
                url: getAjaxUrl() + "vision/submitStudentInfo", //这里请求获取屈光度列表 要求是Post
                dataType: "json", //这里不用管 这是返回的格式， json 就好
                data: { studentId: getStudentId(), studentHeight: person.height, studentWeight: person.weight, studentBirthdate: person.birthday },
                success: function (data) {

                },
                error: function () {
                }
            });

            //#endregion================================================
            break;
        case 3:
            //#region  跳转执行方法===========================================
            person.father = $("#father").val();
            person.mother = $("#mother").val();
            if (person.father == "") {
                $.alert("请填写父亲度数！");
                return;
            }
            if (person.mother == "") {
                $.alert("请填写母亲度数！");
                return;
            }

            //#endregion================================================
            break;

        default:
            var active = $("#subject" + thisPageID).find(".active").length;
            if (active == 0) {

                $.alert("请选择认真选择答案！");
                return;
            }
            break;
    }
    $.router.load("#subject" + (thisPageID + 1));
}
$(function () {

    //多选
    $(".content .btn.more").on("click", function () {
        $(this).siblings(".single").removeClass("active");
        $(this).addClass("active");
    });
    // 混单选
    $(".content .btn.single").on("click", function () {
        $(this).addClass("active").siblings(".btn").removeClass("active");
    });
    // 单选

    $(".content .btn.default").on("click", function () {
        $(this).addClass("active").siblings(".btn").removeClass("active");
    });

    //男女
    $(".content .tool").on("click", function () {
        $(this).addClass("active").siblings(".content .tool").removeClass("active");
        person.sex = $(this).attr("value");
    });

    var isPostScore = false;

    //第18页统计
    $(document).on("pageInit", "#subject18", function (e, pageId, $page) {

        person.score = 0;
        var tagbtn = $(".btn.active");
        $.each(tagbtn, function (index, tag) {
            var score = $(tag).attr("score");
            if (score != "") {
                person.score += parseFloat(score);
            }
        })
        var tagtool = $(".tool.tool-select.active");
        $.each(tagtool, function (index, tag) {
            var score = $(tag).attr("score");
            if (score != "") {
                person.score += parseFloat(score);
            }
        })
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
        var img = $("#subject18 .guide");
        if (person.score >= 0 && person.score <= 45) {
            $(img[0]).removeClass("hide");
        } else if (person.score >= 46 && person.score <= 65) {
            $(img[1]).removeClass("hide");
        } else if (person.score >= 66 && person.score <= 85) {
            $(img[2]).removeClass("hide");
        } else if (person.score >= 86 && person.score <= 100) {
            $(img[3]).removeClass("hide");
        }
        if (!isPostScore) { //预防重复提交
            isPostScore = true;
            $.ajax({
                type: "POST", // 要求是Post      Method：   POST
                url: getAjaxUrl() + "vision/submitTestResult", //这里请求获取屈光度列表 要求是Post
                dataType: "json", //这里不用管 这是返回的格式， json 就好
                data: { studentId: getStudentId(), testScore: person.score },
                success: function (data) {

                },
                error: function () {
                }
            });
        }
    })
    //加载
    $.init()

});

