<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2020/11/5
  Time: 14:37
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<html>
<head>
    <title>用户表单</title>
</head>
<body>
${tbUser.id == null ? "新增" : "编辑"}用户
<c:if test="${baseResult != null}">
    <div class="row">
        <div class="alert alert-${baseResult.status == 200? "success" : "danger"}">
                ${baseResult.message}
        </div>
    </div>
</c:if>

<form:form id="inputForm" cssClass="form-horizontal" action="/user/save" method="post" modelAttribute="tbUser">
<%--    隐藏域，用于编辑--%>
    <form:hidden path="id" />
    <div class="box-body">
        <div class="form-group">
            <label for="email" class="col-sm-2 control-label">邮箱：</label>
            <form:input cssClass="form-control required email" path="email"/>
        </div>
        <div class="form-group">
            <label for="password" class="col-sm-2 control-label">密码：</label>
            <form:input cssClass="form-control required" path="password"/>
        </div>
        <div class="form-group">
            <label for="username" class="col-sm-2 control-label">姓名：</label>
            <form:input cssClass="form-control required" path="username"/>
        </div>
        <div class="form-group">
            <label for="phone" class="col-sm-2 control-label">手机自定义验证方式mobile：</label>
            <form:input cssClass="form-control required mobile" path="phone"/>
        </div>

        <button type="button" onclick="history.go(-1)">返回</button>
        <button type="submit">提交</button>
    </div>
</form:form>
<%--    <form class="form-horizontal" action="/user/save" METHOD="post">--%>
<%--邮箱： <input type="email" name="email"/>--%>
<%--密码： <input type="password" name="password"/>--%>
<%--姓名： <input type="text" name="username"/>--%>
<%--手机： <input type="text" name="phone"/>--%>

<%--<button type="button" onclick="history.go(-1)">返回</button>--%>
<%--<button type="submit" >提交</button>--%>
<%--    </form>--%>
<jsp:include page="../includes/footer.jsp"></jsp:include>
<script>
    $(function () {
    })
</script>
</body>
</html>
