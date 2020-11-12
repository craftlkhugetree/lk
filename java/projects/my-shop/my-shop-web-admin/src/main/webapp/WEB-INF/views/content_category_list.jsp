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
<html>
<head>
    <title>内容分类列表</title>
    <jsp:include page="../includes/header.jsp"></jsp:include>
    <link rel="stylesheet" href="../../static/assets/plugins/treeTable/themes/vsStyle/treeTable.min.css" />
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

<%--涉及到事务，不允许批量删除--%>
<a href="/user/form" type="button" class="btn btn-sm  btn-default">新增</a>
<a href="#" type="button" class="btn btn-sm  btn-default">导入</a>
<a href="#" type="button" class="btn btn-sm  btn-default">导出</a>

<div class="box-body table-responsive">

    <table id="treeTable" class="table table-hover">
        <thead>
        <tr>
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
            <tr id="${tbContentCategory.id}" pId="${tbContentCategory.parentId}">
                <td>${tbContentCategory.id}</td>
                <td>${tbContentCategory.parentId}</td>
                <td>${tbContentCategory.name}</td>
                <td>${tbContentCategory.sortOrder}</td>
                <td>${tbContentCategory.isParent}</td>
                <td>
                    <a href="#" type="button" class="btn btn-sm  btn-default">编辑</a>
                    <a href="#" type="button" class="btn btn-sm  btn-primary">新增下级</a>
                    <a href="#"  type="button" class="btn btn-sm  btn-danger">删除</a>
                </td>
            </tr>
        </c:forEach>
        </tbody>
    </table>
</div>


<jsp:include page="../includes/footer.jsp"></jsp:include>

<%--jquery-treeTable--%>
<script src="../../static/assets/plugins/treeTable/jquery.treeTable.min.js"></script>

<script>
    $(function (){
        $('#treeTable').treeTable({
            column: 2,
            expandLevel:2
        });
    });
</script>
</body>
</html>
