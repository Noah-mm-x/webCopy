// JavaScript Document
var lastUserName = lastPassword = lastEmail = lastSecCode = lun = '';
function checkUserName() {
    var userName = $('#username').val();
    if (userName == lastUserName || userName == '用户名') {
        return;
    } else {
        lastUserName = userName;
    }
    var unLen = userName.replace(/[^\x00-\xff]/g, "**").length;
    if (unLen < 3 || unLen > 15) {
        warning("checkusername", unLen < 3 ? '用户名小于3个字符' : '用户名超过15个字符', "show", "error");
    }
        else{
        warning("checkusername", "", "show", "success");
        return;
    }
    

}

function checkEmail() {
    var cp2 = $('#checkEmail');
    var email = $('#email').val();
    res = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    var re = new RegExp(res);
    if (email.match(re) == null) {
        warning("checkEmail", "请输入正确的Email", "show", "error");
        return;

    }
    else if (email == lastEmail || email == '常用邮箱') {
        return;
    } else {
        warning("checkEmail", "", "show", "success");
    }
}

function checkCard() {
    var aCity = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" } 
    var iSum = 0;
    var info = "";
    var sId = $("#shenfz").val();
    if (!/^\d{17}(\d|x)$/i.test(sId)) info = "你输入的身份证长度或格式错误";
    sId = sId.replace(/x$/i, "a");
    if (aCity[parseInt(sId.substr(0, 2))] == null) info = "你的身份证地区非法";
    sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2));
    var d = new Date(sBirthday.replace(/-/g, "/"));
    if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) info = "身份证上的出生日期非法";
    for (var i = 17; i >= 0; i--) iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
    if (iSum % 11 != 1) info = "你输入的身份证号非法";
    if (info != "")
        warning("checkshenfz", info, "show", "error");
    else
        warning("checkshenfz", "", "show", "success");
}

function checkPassword() {
    var password = $('#password').val();
    if (password == lastPassword) {
        return;
    } else {
        lastPassword = password;
    }
    //var cp = $('#checkpassword');
    if (password == '' || /[\'\"\\]/.test(password)) {
        //warning(cp, '密码空或包含非法字符');
        warning("checkpassword", "密码空或包含非法字符", "show", "error");
        return false;
    } else {
        warning("checkpassword", "&nbsp;", "show", "success");
        checkPassword2();

        return true;
    }
}
function checkPassword2() {
    var password = $('#password').val();
    var password2 = $('#password2').val();
    var cp2 = $('#checkpassword2');
    if (password2 != '') {
        checkPassword();
    }
    if (password == '' || (password2 == '')) {
        cp2.hide();
        return;
    }
    if (password != password2) {
        warning("checkpassword2", "两次输入的密码不一致", "show", "error");

    } else {
        warning("checkpassword2", "&nbsp;", "show", "success");
    }
}



function checkName() {
    var truename = $('#truename').val();
    
    var unLen = truename.replace(/[^\x00-\xff]/g, "**").length;
    if (/^[\u4e00-\u9fa5]+$/.test($("#truename").val())  && unLen >3) {
        warning("checktruename", "&nbsp;", "show", "success");
    } else {
        warning("checktruename", "请输入正确姓名", "show", "error");
        return;
    }
}

function checkSeccode() {
    var seccodeVerify = $('#seccode').val();
    if (seccodeVerify == "") {
        warning("checkseccode", "请输入验证码", "show", "error");
        return;
    }
    $.ajax({
        type: "get",
        dataType: 'xml',
        url: "/do.php?ac=register&op=checkseccode&inajax=1&seccode=" + seccodeVerify + "",
        beforeSend: function(XMLHttpRequest) {
            $('#checkseccode').html("loading....");
        },
        success: function(data, textStatus) {

            if ($(data).text() == "succeed") {
                warning("checkseccode", "&nbsp;", "show", "success");
            }
            else {
                warning("checkseccode", $(data).text(), "show", "error");
            }
        },
        complete: function(XMLHttpRequest, textStatus) {

        }
    });
}

function warning(name, msg, type, classname) {
    if (type == "show") {
        $("#" + name).show();
    } else {
        $("#" + name).hide();
    }
    $("#" + name).html(msg);
    $("#" + name).removeClass($("#" + name).attr("class")).addClass(classname);
}
//验证码
function seccode() {
    var img = 'do.php?ac=seccode&rand=' + Math.random();
    $("#img_seccode").attr("src", img);
}

function updateseccode() {
    var img = 'do.php?ac=seccode&rand=' + Math.random();
    if ($('#img_seccode')) {
        $("#img_seccode").attr("src", img)
    }
}

$(document).ready(function() {
    seccode();
    $('#username').focus();
    $('#username').blur(checkUserName);
    $('#seccode').blur(checkSeccode);
    $('#email').blur(checkEmail);
    $('#password').blur(checkPassword);
    $('#password2').blur(checkPassword2);
    $('#shenfz').blur(checkCard);
    $('#truename').blur(checkName);
    
    

})
function toQzoneLogin() { var A = window.open("do.php?ac=qq&m=qqlogin", "TencentLogin", "width=450,height=320,menubar=0,scrollbars=1, resizable=1,status=1,titlebar=0,toolbar=0,location=1"); } 
