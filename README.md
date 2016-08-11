# 简介

这是著名的jquery表单验证插件[jquery.validate.js](https://jqueryvalidation.org/) 的扩展验证方法库。

# 部分扩展

## ajax远程验证 ##

注意：ajax返回的必须为json格式，且至少要包含IsSuccess（验证是否通过）、Message（提示信息）属性

<pre>
var validator = $("form:first").validate({
rules: {
    txtRoleName: {
	required: true,
	XCLCustomRemote: {
	    url: "http://www.x.com/xxx",
	    data: {............}
	}
    },
    txtCode: {
	XCLCustomRemote: {
	    url: "http://www.x.com/xxx",
	    data: function () {//支持function
		return {...........};
	    }
	}
    },
    txtMerchantID: {
	required: true
    }
}
});
</pre>

## 自定义错误消息显示位置 ##

如果被验证的元素存在"JqValidShowErrorID"属性，则将错误信息放到ID为该属性值的元素中，否则，则默认。
当然，您也可以直接修改源代码，添加您所需要的其它信息。