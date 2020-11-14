let App = function () {
    // checkbox
    let _masterCheckbox;
    let _checkbox;

    // delete idArray
    let _idArray;

    // default dropzone upload config
    let defaultDropzoneOpts = {
        url: "", // 文件提交地址
        method: "post",  // 也可用put
        paramName: "file", // 默认为file,可传入controller中自定义的变量名            // 传到后台的参数名称// 传到后台的参数名称
        maxFiles: 1,// 一次性上传的文件数量上限
        maxFilesize: 2, // 文件大小，单位：MB
        acceptedFiles: ".jpg,.gif,.png,.jpeg", // 上传的类型
        addRemoveLinks: true,
        parallelUploads: 1,// 一次上传的文件数量
        //previewsContainer:"#preview", // 上传图片的预览窗口
        dictDefaultMessage: '拖动文件至此或者点击上传',
        dictMaxFilesExceeded: "您最多只能上传"+this.maxFiles+"个文件！",
        dictResponseError: '文件上传失败!',
        dictInvalidFileType: "文件类型只能是*.jpg,*.gif,*.png,*.jpeg。",
        dictFallbackMessage: "浏览器不受支持",
        dictFileTooBig: "文件过大上传文件最大支持"+this.maxFilesize+"MB",
        dictRemoveLinks: "删除",
        dictCancelUpload: "取消",
    }

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
    };

    /**
     * 初始化dropzone
     * @param opts
     */
    let handlerInitDropzone = function (opts) {
        // jQuery的继承,不要继承反了
        $.extend(defaultDropzoneOpts,opts);

        // 官网共三种初始化方式，但这两种要关闭自动发现，否则console那里报错Uncaught Error: Dropzone already attached.
        Dropzone.autoDiscover = false;

        // $("#dropz").dropzone({
        let myDropzone = new Dropzone(defaultDropzoneOpts.id, defaultDropzoneOpts);
        // {
        //     init: function () {
        //         this.on("success",function (file, data){
        //             defaultDropzoneOpts.success(file,data);
        //         })
        //     }
        // });
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
        },
        initDropzone: function (opts) {
            return handlerInitDropzone(opts);
        }
    }

}();

$(document).ready(function () {
    App.init();
})