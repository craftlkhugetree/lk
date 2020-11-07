<%@ tag language="java" pageEncoding="UTF-8" %>
<%@ attribute name="title" type="java.lang.String" required="false" description="模态框标题" %>
<%@ attribute name="message" type="java.lang.String" required="true" description="模态框消息" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--约定优于配置--%>
<%@ attribute name="opts" type="java.lang.String" required="false" description="操作类型: info/信息提示 confirm/确认对话框" %>
<%@ attribute name="url" type="java.lang.String" required="false" description="跳转链接，确认对话框" %>

<div class="modal fade" id="modal-secondary">
    <div class="modal-dialog">
        <div class="modal-content bg-secondary">
            <div class="modal-header">
                <h4 class="modal-title">${title==null ? "温馨提示" : title}</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p>${message}&hellip;</p>
            </div>
            <div class="modal-footer justify-content-between">
                <button type="button" class="btn btn-outline-light" data-dismiss="modal">Close</button>
                <button type="button" id="btnModalOk" class="btn btn-outline-light">Save changes</button>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>
<!-- /.modal -->

<script>
    // 模态框的确定按钮
    $(function () {
        $("#btnModalOk").bind("click",function () {
            <c:if test="${opts != 'confirm'}">
                $("#modal-secondary").modal("hide");
            </c:if>

            <c:if test="${opts == 'confirm'}">
                console.log("${url}")
            </c:if>
        })
    })
</script>