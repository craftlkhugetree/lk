let App = function () {
    let _masterCheckbox;
    let _checkbox;

    /**
     * 私有方法,初始化
     */
    let handlerInitCheckbox = function () {
        // $('input[type="checkbox"].minimal, input[type="radio"].minimal').iCheck({
        //     checkboxClass: 'icheckbox_minimal-blue',
        //     radioClass  : 'iradio_minimal-blue'
        // })

        _masterCheckbox = $('input[type="checkbox"].minimal.icheck_master');
        _checkbox = $('input[type="checkbox"].minimal');
    }

    /**
     * 全选
     */
    let handlerCheckboxAll = function () {
        _masterCheckbox.on("click", function (e){
            console.log(e.target.checked,_checkbox)
            if (e.target.checked) {
                // _checkbox.forEach(item => {
                _checkbox.each(function (){
                    $(this).prop("checked",true);
                    console.log($(this).attr("id"),$(this).is(":checked"))
                })
            }
            else {
                // _checkbox.iCheck("check");
                _checkbox.each(function (){
                    $(this).prop("checked",false);
                })
            }
        });
    }

    return {
        init : function () {
            handlerInitCheckbox();
            handlerCheckboxAll();
        },
        // 私有无法被调用，只能用返回值的方法
        getCheckbox: function () {
            return _checkbox;
        }
    }

} ();

$(document).ready(function () {
    App.init();
})