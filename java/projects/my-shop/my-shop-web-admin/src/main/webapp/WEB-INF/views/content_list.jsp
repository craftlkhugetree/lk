<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2020/11/5
  Time: 11:02
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="modal.tag" tagdir="/WEB-INF/tags" %>
<html>
<head>
    <title>内容列表</title>
    <jsp:include page="../includes/header.jsp"></jsp:include>
</head>
<body>
<%--    <form:form action="/user/search" method="post" modelAttribute="tbUser">--%>
<%--    <div class="box-tools">--%>
<%--        <label for="title" >姓名：</label>--%>
<%--        <form:input path="title" />--%>
<%--        <label for="id" >邮箱：</label>--%>
<%--        <form:input path="id" />--%>
<%--        <label for="categoryId" >手机：</label>--%>
<%--        <form:input path="categoryId" />--%>
<%--    </div>--%>
<%--        <button type="submit" class="btn btn-primary">搜索</button>--%>
<%--    </form:form>--%>

<form:form  method="post" modelAttribute="tbContent">
    <div class="box-tools">
        <label for="title" >姓名：</label>
        <form:input path="title" />
        <label for="id" >邮箱：</label>
        <form:input path="id" />
        <label for="categoryId" >手机：</label>
        <form:input path="categoryId" />
    </div>
    <button type="button" onclick="search()" class="btn btn-primary">搜索</button>
</form:form>
内容列表
<c:if test="${baseResult != null}">
    <div class="row">
        <div class="alert alert-${baseResult.status == 200? "success" : "danger"}">
                ${baseResult.message}
        </div>
    </div>
</c:if>

<a href="/content/form" type="button" class="btn btn-sm  btn-default">新增</a>
<button type="button" class="btn btn-sm  btn-default" onclick="App.deleteMulti('/content/delete')">删除</button>
<a href="#" type="button" class="btn btn-sm  btn-default">导入</a>
<a href="#" type="button" class="btn btn-sm  btn-default">导出</a>

<div class="box-body table-responsive">
    <table id="dataTable" class="table table-hover">
        <thead>
        <tr>
            <th><input type="checkbox" class="minimal icheck_master" /></th>
            <th>ID</th>
            <th>用户名</th>
            <th>手机号</th>
            <th>邮箱</th>
            <th>更新时间</th>
            <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <%--        <c:forEach items="${tbUsers}" var="tbUser">--%>
        <%--            <tr>--%>
        <%--                <td><input id="${tbUser.id}" type="checkbox" class="minimal" /> </td>--%>
        <%--                <td>${tbUser.id}</td>--%>
        <%--                <td>${tbUser.title}</td>--%>
        <%--                <td>${tbUser.categoryId}</td>--%>
        <%--                <td>${tbUser.id}</td>--%>
        <%--                <td><fmt:formatDate value="${tbUser.updated}" pattern="yyyy-MM-dd HH:mm:ss" /></td>--%>
        <%--                <td>--%>
        <%--                    <a href="#" type="button" class="btn btn-sm  btn-default">查看</a>--%>
        <%--                    <a href="#" type="button" class="btn btn-sm  btn-primary">编辑</a>--%>
        <%--                    <a href="#"  type="button" class="btn btn-sm  btn-danger">删除</a>--%>
        <%--                </td>--%>
        <%--            </tr>--%>
        <%--        </c:forEach>--%>
        </tbody>
    </table>
</div>



<jsp:include page="../includes/footer.jsp"></jsp:include>
<modal.tag:modal />
<%--    <modal.tag:modal message="泥猴啊" opts="confirm" url="/user/delete"></modal.tag:modal>--%>

<script>
    let _dataTable;
    $(function () {
        let _columns = [
            {
                "data": function (row, type, val, meta) {
                    return '<input id="' + row.id + '" type="checkbox" class="minimal" />'
                }
            },
            {"data": "id"},
            {"data": "title"},
            {"data": "categoryId"},
            {"data": "titleDesc"},
            {"data": function (row, type, val, meta){
                    return DateTime.format(row.updated, "yyyy-MM-dd HH:mm:ss");
                }},
            {
                "data": function (row, type, val, meta) {
                    return '<button onclick="showDetail()" type="button" class="btn btn-sm  btn-default">查看</button>' +
                        '<a href="/content/form?id=' + row.id + '" type="button" class="btn btn-sm  btn-primary">编辑</a>' +
                        '<a href="#"  type="button" class="btn btn-sm  btn-danger">删除</a>';
                }
            }
        ];
        _dataTable = App.initDataTables("/content/page", _columns);
    });

    function search() {
        let title = $("#title").val();
        let categoryId = $("#categoryId").val();
        let id = $("#id").val();
        let param = {
            "title":title,
            "categoryId":categoryId,
            "id":id
        };
        console.log(param);
        _dataTable.settings()[0].ajax.data = param;
        _dataTable.ajax.reload();
    };

    function showDetail() {
        $.ajax({
            url: "/content/detail",
            type: "get",
            dataType: "html",
            success: function (data) {
                console.log(data);
            }
        });
    };
</script>
</body>
</html>
