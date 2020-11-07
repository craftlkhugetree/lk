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
    <title>用户列表</title>
    <jsp:include page="../includes/header.jsp"></jsp:include>
</head>
<body>
    <form:form action="/user/search" method="post" modelAttribute="tbUser">
    <div class="box-tools">
        <label for="username" >姓名：</label>
        <form:input path="username" />
        <label for="email" >邮箱：</label>
        <form:input path="email" />
        <label for="phone" >手机：</label>
        <form:input path="phone" />
    </div>
        <button type="submit" class="btn btn-primary">搜索</button>
    </form:form>
    用户列表
    <c:if test="${baseResult != null}">
        <div class="row">
            <div class="alert alert-${baseResult.status == 200? "success" : "danger"}">
                    ${baseResult.message}
            </div>
        </div>
    </c:if>

    <a href="/user/form" type="button" class="btn btn-sm  btn-default">新增</a>
    <a href="#" type="button" class="btn btn-sm  btn-default" onclick="deleteMulti()">删除</a>
    <a href="#" type="button" class="btn btn-sm  btn-default">导入</a>
    <a href="#" type="button" class="btn btn-sm  btn-default">导出</a>
    <table>
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
        <c:forEach items="${tbUsers}" var="tbUser">
            <tr>
                <td><input id="${tbUser.id}" type="checkbox" class="minimal" /> </td>
                <td>${tbUser.id}</td>
                <td>${tbUser.username}</td>
                <td>${tbUser.phone}</td>
                <td>${tbUser.email}</td>
                <td><fmt:formatDate value="${tbUser.updated}" pattern="yyyy-MM-dd HH:mm:ss" /></td>
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
    <modal.tag:modal message="泥猴啊" opts="confirm" url="/user/delete"></modal.tag:modal>

    <script>
        /**
         * 删除多选
         */
        function deleteMulti(){
            let idArray = new Array();

            let _checkbox = App.getCheckbox();
            _checkbox.each(function (){
                let _id = $(this).attr("id");
                if(_id != null && _id != undefined && $(this).is(":checked")){
                    idArray.push(_id);
                }
            })
            if (idArray.length === 0){
                $("#modal-secondary").modal("show");
            }
            console.log("user_list:",_checkbox,idArray);
        }
    </script>
</body>
</html>
