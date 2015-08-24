/**
* validator扩展
* create by :xcl @20150713
* https://github.com/xucongli1989/jqueryValidateExtendMethod
*/

/**
* 全局设置
*/
$.validator.setDefaults({
    debug: false,
    errorClass: "JqValidError",
    validClass: "JqValidOK",
    ignore: ".ignore",
    errorPlacement: function (error, element) {
        //如果存在JqValidShowErrorID属性，则将错误信息放到该ID中，否则，则默认
        var showErrorID = element.attr("JqValidShowErrorID");
        if (showErrorID) {
            $("#" + showErrorID).html("").append(error);
        } else {
            error.insertAfter(element);
        }
    }
});

/**
* 自定义ajax验证
*/
$.validator.addMethod("JqCustomRemote", function (value, element, ajaxOption) {
    var defaults = {
        url: null,
        type: "GET",
        dataType: "JSON",
        data: null
    };
    ajaxOption = $.extend(defaults, ajaxOption);

    $(element).removeData("JqCustomMsg");

    var result = {};
    $.ajax({
        url: ajaxOption.url,
        dataType: ajaxOption.dataType,
        type: ajaxOption.type,
        data: ajaxOption.data,
        async: false,
        success: function (data) {
            result = data;
            $(element).data("JqCustomMsg", data.Message);
        }
    });

    return this.optional(element) || result.IsSuccess;
}, function (params, element) {
    return $(element).data("JqCustomMsg") || "";
});

/**
* 验证账号格式是否正确（中英文+数字+下划线）
*/
$.validator.addMethod("AccountNO", function (value, element) {
    return this.optional(element) || /^[\w_]{3,10}$/.test(value);
}, "只能为长度为3-10的英文、数字、下划线组合！");

/**
* 验证是否为100以内的0.5或0.5的整数倍数！
*/
$.validator.addMethod("In100_halfOneMultiple", function (value, element) {
    if (this.optional(element)) return true;
    var v = parseFloat(value);
    return /^(\d+\.\d+)|(\d+)$/.test(value) && (!isNaN(v) && v % 0.5 == 0) && v >= 0 && v <= 100;
}, "只能为100以内的0.5或0.5的整数倍数！");

/**
* 年龄范围格式，如"7-10",表示7至10岁
*/
$.validator.addMethod("AgeRange", function (value, element) {
    if (this.optional(element)) return true;
    value = value || "";
    var arr = value.split("-");
    if (arr.length != 2) return false;
    var v1 = parseInt(arr[0]), v2 = parseInt(arr[1]);
    if (isNaN(v1) || isNaN(v2)) return false;
    if (v1 > v2) return false;
    return /^(120|((1[0-1]|\d)?\d))-(120|((1[0-1]|\d)?\d))$/.test(value);
}, "年龄范围格式不正确（如：7-10）！");

/**
* 起始年龄验证(需要有两个文本框，一个是起始年龄，一个是结束年龄)
* param:{min:"txtMinAge",max:"txtMaxAge"}
*/
$.validator.addMethod("Age", function (value, element, param) {
    if (this.optional(element)) return true;
    var $start = $("[name='" + param.min + "']"), $end = $("[name='" + param.max + "']");
    var startV = 0, endV = 0;
    var reg = /^(([0-9])|([1-9][0-9])|(1[0-1][0-9])|(120))$/;
    startV = parseInt($.trim($start.val())) || 0;
    endV = parseInt($.trim($end.val())) || 0;
    $start.val(startV);
    $end.val(endV);
    return reg.test(startV) && reg.test(endV) && startV <= endV;
}, "起止年龄范围或格式不正确！");

/**
* 以逗号,分隔的项最多只能有几个
* param:Number
*/
$.validator.addMethod("CommaItemMaxCount", function (value, element, param) {
    if (this.optional(element)) return true;
    var item = value.split(',');
    if (item.length > param) {
        return false;
    }
    return true;
}, $.validator.format("最多只能选择 {0} 项！"));