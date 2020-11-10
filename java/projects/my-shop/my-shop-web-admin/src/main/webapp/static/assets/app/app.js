let App = function () {
    // checkbox
    let _masterCheckbox;
    let _checkbox;

    // delete idArray
    let _idArray;

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
        _masterCheckbox.on("click", function (e) {
            console.log(e.target.checked, _checkbox)
            if (e.target.checked) {
                // _checkbox.forEach(item => {
                _checkbox.each(function () {
                    $(this).prop("checked", true);
                    console.log($(this).attr("id"), $(this).is(":checked"))
                })
            } else {
                // _checkbox.iCheck("check");
                _checkbox.each(function () {
                    $(this).prop("checked", false);
                })
            }
        });
    }

    /**
     * 删除多选
     * @param url
     */
    let handlerDeleteMulti = function (url) {
        _idArray = new Array();
        // let _checkbox = this.getCheckbox();
        _checkbox.each(function () {
            let _id = $(this).attr("id");
            if (_id != null && _id != undefined && $(this).is(":checked")) {
                _idArray.push(_id);
            }
        })
        $("#modal-secondary").modal("show");
        if (_idArray.length === 0) {
            $("#modal-message").html("未选择!!!");
        } else {
            $("#modal-message").html(`确定删除${'_idArray'}吗？!!!`);
        }

        $("#btnModalOk").bind("click", function () {
            del();
        });

        /**
         * 当前私有函数的私有函数
         * @param idArray
         * @param url
         */
        function del() {
            $("#modal-secondary").modal("hide");

            if (_idArray.length === 0) {

            } else {
                setTimeout(  $.ajax({
                    "url": url,
                    "type": "POST",
                    // 设为同步也无效
                    // "async": false,
                    "data": {"ids": _idArray.toString()},
                    "dataType": "JSON",
                    "success": function (data) {
                        // 避免绑定del() 变成死循环，所以先解绑，再锁死删除按钮
                        $("#btnModalOk").unbind("click");

                        if (data.status === 200) {
                            $("#btnModalOk").bind("click",function () {
                                window.location.reload();
                            })
                        }
                        else {
                            $("#btnModalOk").bind("click",function () {
                                $("#modal-secondary").modal("hide");
                            })
                        }
                        $("#modal-secondary").modal("show");
                        $("#modal-message").html(data.message);
                    }
                }),500);
            }
        }
    }

    /**
     * 分页DataTables
     * @param url
     * @param columns
     */
    let handlerInitDataTables = function (url,columns) {
        let _dataTable = $("#dataTable").DataTable({
            "deferRender": true,
            "processing": true,
            "serverSide": true,
            "ajax":{
                "url": url
            },
            "columns": columns,
            "drawCallback":function () {
                handlerInitCheckbox();
                handlerCheckboxAll();
            }
        });
        return _dataTable;
    }

    return {
        init: function () {
            handlerInitCheckbox();
            handlerCheckboxAll();
        },
        // 私有无法被调用，只能用返回值的方法
        getCheckbox: function () {
            return _checkbox;
        },
        deleteMulti: function (url) {
            handlerDeleteMulti(url);
        },
        initDataTables: function (url,columns) {
            return handlerInitDataTables(url,columns);
        }
    }

}();

$(document).ready(function () {
    App.init();
})