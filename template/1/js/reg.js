// JavaScript Document
var lastUserName = lastPassword = lastEmail = lastSecCode = lun = '';
function checkUserName() {
    var userName = $('#username').val();
    if (userName == lastUserName || userName == '鐢ㄦ埛鍚�') {
        return;
    } else {
        lastUserName = userName;
    }
    var unLen = userName.replace(/[^\x00-\xff]/g, "**").length;
    if (unLen < 3 || unLen > 15) {
        warning("checkusername", unLen < 3 ? '鐢ㄦ埛鍚嶅皬浜�3涓瓧绗�' : '鐢ㄦ埛鍚嶈秴杩�15涓瓧绗�', "show", "error");
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
        warning("checkEmail", "璇疯緭鍏ユ纭殑Email", "show", "error");
        return;

    }
    else if (email == lastEmail || email == '甯哥敤閭') {
        return;
    } else {
        warning("checkEmail", "", "show", "success");
    }
}

function checkCard() {
    var aCity = { 11: "鍖椾含", 12: "澶╂触", 13: "娌冲寳", 14: "灞辫タ", 15: "鍐呰挋鍙�", 21: "杈藉畞", 22: "鍚夋灄", 23: "榛戦緳姹�", 31: "涓婃捣", 32: "姹熻嫃", 33: "娴欐睙", 34: "瀹夊窘", 35: "绂忓缓", 36: "姹熻タ", 37: "灞变笢", 41: "娌冲崡", 42: "婀栧寳", 43: "婀栧崡", 44: "骞夸笢", 45: "骞胯タ", 46: "娴峰崡", 50: "閲嶅簡", 51: "鍥涘窛", 52: "璐靛窞", 53: "浜戝崡", 54: "瑗胯棌", 61: "闄曡タ", 62: "鐢樿們", 63: "闈掓捣", 64: "瀹佸", 65: "鏂扮枂", 71: "鍙版咕", 81: "棣欐腐", 82: "婢抽棬", 91: "鍥藉" } 
    var iSum = 0;
    var info = "";
    var sId = $("#shenfz").val();
    if (!/^\d{17}(\d|x)$/i.test(sId)) info = "浣犺緭鍏ョ殑韬唤璇侀暱搴︽垨鏍煎紡閿欒";
    sId = sId.replace(/x$/i, "a");
    if (aCity[parseInt(sId.substr(0, 2))] == null) info = "浣犵殑韬唤璇佸湴鍖洪潪娉�";
    sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2));
    var d = new Date(sBirthday.replace(/-/g, "/"));
    if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) info = "韬唤璇佷笂鐨勫嚭鐢熸棩鏈熼潪娉�";
    for (var i = 17; i >= 0; i--) iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
    if (iSum % 11 != 1) info = "浣犺緭鍏ョ殑韬唤璇佸彿闈炴硶";
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
        //warning(cp, '瀵嗙爜绌烘垨鍖呭惈闈炴硶瀛楃');
        warning("checkpassword", "瀵嗙爜绌烘垨鍖呭惈闈炴硶瀛楃", "show", "error");
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
        warning("checkpassword2", "涓ゆ杈撳叆鐨勫瘑鐮佷笉涓€鑷�", "show", "error");

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
        warning("checktruename", "璇疯緭鍏ユ纭鍚�", "show", "error");
        return;
    }
}

function checkSeccode() {
    var seccodeVerify = $('#seccode').val();
    if (seccodeVerify == "") {
        warning("checkseccode", "璇疯緭鍏ラ獙璇佺爜", "show", "error");
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
//楠岃瘉鐮�
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
