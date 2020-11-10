/**
 * 函数对象
 */
let Validate = function () {
    /**
     * 初始化
     */
    let handlerInitValidate = function () {
        // 增加自定义验证规则，最好与下面的初始化分开，一个方法只做一件事。
        $.validator.addMethod("mobile", function(value, element) {
            var length = value.length;
            var mobile =  /^(((13[0-9]{1})|(15[0-9]{1}))+\d{8})$/;
            return this.optional(element) || (length == 11 && mobile.test(value));
        }, "手机号码格式错误");

        // 初始化
        $("#inputForm").validate({
            errorElement: 'span',
            errorClass: 'help-block',

            errorPlacement: function (error, element) {
                element.parent().parent().attr("class", "form-group has-error");
                error.insertAfter(element);
            }
        });
    };

    return {
        init: function () {
            handlerInitValidate();
        },
        // validateForm: function (formId) {
        //     handlerInitValidate(formId);
        // }
    }
}();

$(document).ready(function () {
    Validate.init();
});