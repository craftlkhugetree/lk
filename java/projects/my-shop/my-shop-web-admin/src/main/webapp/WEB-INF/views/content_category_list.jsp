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
    <title>内容分类列表</title>
    <jsp:include page="../includes/header.jsp"></jsp:include>
</head>
<body>
分类列表
<c:if test="${baseResult != null}">
    <div class="row">
        <div class="alert alert-${baseResult.status == 200? "success" : "danger"}">
                ${baseResult.message}
        </div>
    </div>
</c:if>

<a href="/user/form" type="button" class="btn btn-sm  btn-default">新增</a>
<button type="button" class="btn btn-sm  btn-default" onclick="App.deleteMulti('/user/delete')">删除</button>
<a href="#" type="button" class="btn btn-sm  btn-default">导入</a>
<a href="#" type="button" class="btn btn-sm  btn-default">导出</a>

<table >
    <thead>
    <tr>
        <th><input type="checkbox" class="minimal icheck_master" /></th>
        <th>ID</th>
        <th>父ID</th>
        <th>名字</th>
        <th>排序</th>
        <th>是否父级</th>
        <th>操作</th>
    </tr>
    </thead>
    <tbody>
            <c:forEach items="${tbContentCategories}" var="tbContentCategory">
                <tr>
                    <td><input id="${tbContentCategory.id}" type="checkbox" class="minimal" /> </td>
                    <td>${tbContentCategory.id}</td>
                    <td>${tbContentCategory.parentId}</td>
                    <td>${tbContentCategory.name}</td>
                    <td>${tbContentCategory.sortOrder}</td>
                    <td>${tbContentCategory.isParent}</td>
                    <td>
                        <a href="#" type="button" class="btn btn-sm  btn-default">查看</a>
                        <a href="#" type="button" class="btn btn-sm  btn-primary">编辑</a>
                        <a href="#"  type="button" class="btn btn-sm  btn-danger">删除</a>
                    </td>
                </tr>
            </c:forEach>
    </tbody>
</table>



<jsp:include page="../includes/footer.jsp"></jsp:include>
<%--<modal.tag:modal />--%>
<%--    <modal.tag:modal message="泥猴啊" opts="confirm" url="/user/delete"></modal.tag:modal>--%>

<%--<script>--%>
<%--    let _dataTable;--%>
<%--    $(function () {--%>
<%--        let _columns = [--%>
<%--            {--%>
<%--                "data": function (row, type, val, meta) {--%>
<%--                    return '<input id="' + row.id + '" type="checkbox" class="minimal" />'--%>
<%--                }--%>
<%--            },--%>
<%--            {"data": "id"},--%>
<%--            {"data": "username"},--%>
<%--            {"data": "phone"},--%>
<%--            {"data": "email"},--%>
<%--            {"data": "updated"},--%>
<%--            {--%>
<%--                "data": function (row, type, val, meta) {--%>
<%--                    return '<button onclick="showDetail()" type="button" class="btn btn-sm  btn-default">查看</button>' +--%>
<%--                        '<a href="/user/form?id=' + row.id + '" type="button" class="btn btn-sm  btn-primary">编辑</a>' +--%>
<%--                        '<a href="#"  type="button" class="btn btn-sm  btn-danger">删除</a>';--%>
<%--                }--%>
<%--            }--%>
<%--        ];--%>
<%--        _dataTable = App.initDataTables("/user/page", _columns);--%>
<%--    });--%>

<%--    function search() {--%>
<%--        let username = $("#username").val();--%>
<%--        let phone = $("#phone").val();--%>
<%--        let email = $("#email").val();--%>
<%--        let param = {--%>
<%--            "username":username,--%>
<%--            "phone":phone,--%>
<%--            "email":email--%>
<%--        };--%>
<%--        console.log(param);--%>
<%--        _dataTable.settings()[0].ajax.data = param;--%>
<%--        _dataTable.ajax.reload();--%>
<%--    };--%>

<%--    function showDetail() {--%>
<%--        $.ajax({--%>
<%--            url: "/user/detail",--%>
<%--            type: "get",--%>
<%--            dataType: "html",--%>
<%--            success: function (data) {--%>
<%--                console.log(data);--%>
<%--            }--%>
<%--        });--%>
<%--    };--%>
<%--</script>--%>
</body>
</html>
