https://www.bilibili.com/video/av29299488
千锋教育  李卫民

1. 有道无术，术尚可求。有术无道，止于术。
批判性思维：对思考的思考。

2. 接口处理各个对象间的协作关系，将“定义”与“实现”分离，实现系统解耦的目的。
面向接口编程，先有接口再有实现，即
public interface AnimalService{}  // first
public class CatServiceImpl implements AnimalService{}  // then

3. 面向对象设计原则为我们提供了方法和准则：开口合里最单依。
开：面向扩展开放，面向修改关闭；（其它六种准则是对“开”的维护）
口：接口隔离原则；
合：组合/聚合原则；
里：里氏替换
最：最少知识，LKP
单：单一职责
依：依赖倒置

4. 看山是山本身是现象：学会借用，ICQ（国外）——OICQ——QQ；
看山不是山是本质：学会遗忘，微信在设计之初是一款高速邮箱软件；
看山还是山是现象与本质的统一。

5. MyEclipse和Spring STS都是Eclipse的插件，前者收费。
IntelliJ IDEA 是JetBrains的产品。

6. 快捷方式psvm，sout

7. markdown语法，符号后必须有空格。
# 标题一

## 标题二

两点之间为代码引用,有背景色 `Create New Project`

![图1](图1地址)
[博客](博客地址)

* 第一章
    * 第一节
    * 第二节
- 第二章

```java
package com.funtl.test; // 域名反转

public class MyTest {
    public static void main(String[] args) {
        System.out.println("IDEA");
    }
}
```

8. maven为不同ide开发的代码，规定了相同的结构，统一了很多。环境变量MAVEN_HOME,依赖jdk。
命令行中 mvn -v
在maven的settings.xml设置本地仓库，中央仓库。相应的mirror地址。
在mvnrepository.com找需要的<dependency></dependency> ，放到项目的pom.xml文件即可。
```xml
<!-- https://mvnrepository.com/artifact/mysql/mysql-connector-java -->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.22</version>
</dependency>
```
mysql引擎：innodb支持事务可回滚，MyISAM不支持事务但效率高。mysql八代版本只有innodb，但是效率更高。
如果要修改mysql版本，只要更改<version>的版本号即可

9. 项目与maven的中间件就是pom.xml
10. 域名反转的目的就是要全球唯一， com.lk.mysql是groupid就是要求这个包全球唯一,这几项就是下载解压后，在maven仓库里一层层的文件夹名字；artifactid是该包的作用，比如query；版本号version语义化， 
1.0.0   第一个版本假如有5个功能，
1.0.2   修复bug fix两次，
1.1.0   增加或减少了一个功能，
2.0.0   结构变化
简单的方式：逢十进一，不管是bug还是新功能。
发行版不能改动（开：）；快照版1.0.0-SNAPSHOT可以改，易于协同开发

11. 编译后想清理一下，mvn clean;
打包包含编译  mvn package;  要打war包就得在pom里添加    <packaging>war</packaging>
要增加servlet，就要在web.xml里添加servlet的class和mapping，以及网址结构。
协同开发，使用maven不需要环境，只要有代码就可以打包，maven控制了生命周期。
部署时不用war包形式，而用虚拟目录形式war_exploded

12. 三层架构与MVC都是为了降低系统模块间的耦合度。
一个类只做一种事；一个方法只做一件事；写只写一次。
三层架构：微软宠物商店C#。
    View：接收用户提交请求的代码，MVC模式
    Service：业务逻辑
    持久层DAO（data access object）：直接操作DB的代码。文件也能存数据，但是对于复杂查询，可能要load 多个文件，效率低，而且文件存储数据不安全。
MVC模式：
    View:index.jsp
    Model:数据模型entity，业务模型service
    Controller:处理用户请求，本来servlet即处理业务逻辑又处理页面展示（耦合高），所以用jsp负责后者。jsp就是servlet，所以它有小脚本，但是为了降低耦合，不让用<%%>

13. 开发中，业务才是核心，技术辅助业务。
简单业务：只开启一个事务；普通业务：开启三个事务；复杂业务：开启7个事务。

14. 假设三个类都有四则运算，那么事不过三，三则重构。但使用这个提取出的四则运算工具类，会增加耦合。

15. alt+Ins 引入配件，给封装自动生成 get()和set()，而红色灯泡前提下的自动补完alt+enter改为了  ctrl+句点，
F12是打开新窗口，alt+f12是原地展示该函数或类。  /**回车：可以在文夹头，函数头增加注释。
ctrl+d  整行左移
快捷方式doGet();doPost();
req.getParameter("loginId").var 回车，自动添加String loginId =
ctrl+F2 批量修改
ctrl+alt+F8 打开断点处变量
alt+shift+F 格式化代码  ctrl+alt+shift+L

16. 重构原则，先写代码，不要过度设计，业务实现之后再重构进行完善。
17. 接口的幂等性问题，不论调用多少次http get方法，结果都一样。而post不具备幂等性。不能post里调get，或者get里调post。    get效率高，明文传输，参数大小有限；post分为两段，先询问fwq能否提交数据，同意后才提交。
18. 字符串写在前面，"admin".equals(loginId);防止字符串空指针异常，或者 if("admin"==loginId)。不要用 && 同时判断用户名和密码，这会被注入，要变成两个if嵌套来判断。
19. 登录逻辑放到service里，不想放在视图层，但是视图层又要展示用户名，所以service要返回User对象给视图层，但如果登录不成功又要返回失败信息，难道要在视图层进行逻辑判断？重构吧！！！
20. 技术选型：搜索量（百度指数），社区活跃度(github)，是否开源。
21. 渐进增强：向上兼容；优雅降级：向下兼容。
22. 布局：（1）表格布局，必须要等待全部资源才能显示；（2）div+css：从上往下执行，但是调试布局难度大，比如三行两列；（3）bootstrap网格布局，表格一样的 div+css，1row最多12col
23. class里可以写多个，媒体查询，针对不同设备不同条件。 bootstap的table类，container类。

24. spring框架兴起于2003年，是为了解决EE级开发的复杂度问题。
    主业务逻辑：银行业务、保险业务；系统级业务逻辑（交叉业务逻辑）：JDBC连接数据库，加载驱动，创建连接，开启事务。。。
25. spring解耦分为两类：IoC 控制反转，AOP 面向切面。
    IoC：Inversion of Control 不需要主动创建实例，而是交给Spring容器创建，胶水框架。
    AOP：
26. Portlet完成组件的拼接。
27. 依赖注入是目前最优秀的解耦方式。
28. 单元测试：白盒、黑河、灰盒；压力测试：并发；疲劳强度测试：7天；冒烟测试：主要功能，比如支付；集成测试；回归测试：增加一个功能。自动化测试：场景设计。
29. JUnit保证测试代码覆盖80%,代码评审review。   @Before @Test @After
30. 断言：assertEquals(obj1,obj2);比较值， == 比较地址。地址引用和值引用。 assertSame()是否引用相同的对象。
31. Log4j:log for Java; slf4j:Simple Loging Facade For Java(外观模式)。 logger.info("message is {}",msg);
32. 字符串追加别用concat，用 format("%s %s",str1,str2);
33. 创建目录，创建pom.xml，添加为maven项目，完善目录结构，配置spring和log4j，复制bootstrap和jquery到项目，配置tomcat。埋点。
34. material design 移动端优先。
35. jstl，<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
可以判定条件，    <c:if test="${message != null}">
类似于  ${message == null ? "style='display:none;'" : ""}

36. JavaSE的入口是main函数，JavaWeb的入口是web.xml里的配置。所以Spring整合Web就是在web.xml里配置context的信息。
37. 开始初始化spring context出错，调试发现为null。所以在控制器文件和服务文件里用了
//        SpringContext context = new SpringContext();
//        UserService userService = (UserService) context.getBean("userService");
这是一种办法。另一种办法是用public final class SpringContext implements ApplicationContextAware, DisposableBean 来定义getBean()函数，其参数可以是beanId也可以直接是类名。

38. 容器中Bean的作用域。单例：只有一个实例，默认是单例。原型：getBean()每次获取新的实例。portlet集群：页面有多个项目拼合而成。全局session，单点登录。
39. 开启注解模式，@component @repository @service @controller 这种模式会在Java中插入硬编码，而且修改后需要重新编译。而xml配置方式，只要修改配置，重启tomcat即可。注解默认是单例singleton，value属性指定作用域,即配置方式的beanId项。
40. 记住我功能，可以用flash cookie，兼容ie，而且不容易删掉。也就是flash shareObject。单步调试发现是String.format("%s;%s");里的分号导致问题，改成冒号即可，cookie value里不可以有分号。
41. js有可能被禁用，所以用meta来跳转。
42. servlet使用不够灵活，每创建一个servlet都要到web.xml中配置一次。默认调用doGet或doPost方法，一个servlet中有多个业务函数，需要传参来灵活调用 ?opts=add/del/update，这不方便，而且开发主要在业务逻辑，而不是到处配置。springmvc使用了dispatcherServlet组件类，处理所有的HTTP请求和响应。
43.  DispatcherServlet的servlet标签里<load-on-startup>1</load-on-startup>表示优先级1~6，如果没有这一块，那么jvm启动顺序随机。
44.  80%的代码都是一次性的！！！
45. spring web mvc 的拦截器类似servlet的filter，用于对处理器进行预处理和后处理。用于日志记录、权限检查、性能监控、通用行为。 
 preHandle,postHandle,afterCompletion
46. Maven模块化开发：事不过三，三则重构，每个项目都要有pom.xml依赖，所以提取出来变成一个项目，让其他项目依赖它，创建统一的依赖管理。而整体变成了一个工程。领域模型就是entity。
47. MyBatis基于Java的持久层框架，内部封装JDBC，使开发人员只需关注sql语句，无需花费精力处理诸如注册驱动、创建Connection、配置Statement等繁杂过程。ORM：将POJO这个Java原生对象与数据库中的表，关系映射起来。将两个不相干的东西联系起来就是中间件，比如tomcat servlet中间件将java程序在web浏览器上运行。
48. 内存缓存32M、磁盘缓存2G、网络缓存。脏读脏写。
49. Hibernate提供了全自动ORM，即POJO和表映射，以及sql自动生成和执行。Mybatis不会自动生成或执行sql语句。首先，Hibernate使用HQL方言来转化不同数据库的语言，缺乏灵活性;多表联查不友好left join，inner join，只在单表操作上有优势。  "from User where user.id=1"   SessionFactory factory
query("from User where user.id=1"); 这句查询有jdbc知识、HQL、SQL等，违反了最少知识原则，要解耦。
50. iBatis3 = MyBatis,在xml中配置sql语句，实现了sql与代码的分离。
51. Druid 是性能最好的数据库连接池，tomcat-jdbc 和 druid 性能接近。
    proxool 在激烈并发时会抛异常，完全不靠谱。
    c3p0 和 proxool 都相当慢，慢到影响 sql 执行效率的地步。
    bonecp 性能并不优越，采用 LinkedTransferQueue 并没有能够获得性能提升。
    除了 bonecp，其他的在 JDK 7 上跑得比 JDK 6 上快
    jboss-datasource 虽然稳定，但是性能很糟糕
52. 专门配置的servlet来提供数据库可视化：
    <servlet>
        <servlet-name>DruidStatView</servlet-name>
        <servlet-class>com.alibaba.druid.support.http.StatViewServlet</servlet-class>
    </servlet>
    <servlet-mapping>
        <servlet-name>DruidStatView</servlet-name>
        <url-pattern>/druid/*</url-pattern>
    </servlet-mapping>
53. ISO-8859-1一个字符集只能存1个字节，存中文可能只存了一半，乱码。UTF-8一个字符集能存3个字节。utf8mb4是扩展，一个字符集能存4个字节，表情包 emoji就是4个字节。
54. service层就不归myBatis关了，它只管dao。所以dao里只写接口，而不用impl实现。而service里还是要自己实现的。
55. DigestUtils.md5DigestAsHex();加密密码
56. @RequestMapping(value = "list", method = RequestMethod.GET) // value后是地址/list
    public String list(Model model){
        List<TbUser> tbUsers = tbUserService.selectAll();
        model.addAttribute("tbUsers",tbUsers);  // model给字符串赋值，从控制层直接返回前端所需数据
        return "user_list"; //jsp文件名
    }
57. 前端验证不彻底，因为可以直接在地址栏输入post参数，也可以关闭浏览器js。所以后台验证是最后的防线，必须什么都考虑到，什么都验证。
. Spring MVC 的form标签主要有两个作用，绑定model，以及提交时除了get、post也支持put、delete
 <%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<form:form cssClass="form-horizontal" action="/user/save" method="post" modelAttribute="tbUser">    同时要在UserController控制跳转到这个页面里增加 Model model.addAttribute("tbUser",tbUser);
 <form:input cssClass="" path="email">   path项就把原来<input>里的id，name，value都包括了。

59. @ModelAttribute可以表单初始化：绑定请求参数到命令对象；暴露@RequestMapping方法返回值为模型数据,也就是一定会在这个切面前执行；暴露表单引用对象为模型数据，也就是如果有返回值对象，那就自动放到Model里，从而不用model.addAttribute(s:,o:)。
60. MyBatis的动态sql解决查询条件不确定的情况，mapper的动态sql的大于小于号，由于在xml文件中有特殊用法，所以要变为&gt; &lt;   &apos;  &quot;    &amp;
61. 为什么xxxController注入的是xxxService，而不是xxxServiceImpl？在controller---->service---->serviceImpl---->dao的模式下，表面注入的是接口，实际注入的是实现类对象（实现类唯一）。这种controller---->serviceImpl---->dao模式也是可以的，可以对实现类增强，如事务、日志等（AOP动态代理实现）。

@Autowired的对象是通过接口的话，Spring默认会使用jdk动态代理，jdk动态代理只能对实现了接口的类生成代理，而不能针对类，而且还可以对实现类对象做增强得到增强类（增强类与实现类是兄弟关系，增强类不能用实现类接收增强类对象，只能用接口接收）。

62. mysql 在语句开头加上EXPLAIN ，可以分析 select 语句的执行，即 MySQL 的“执行计划。MySQL 在表里找到所需行的方式。包括（由左至右，由最差到最好）：
| All | index | range | ref | eq_ref | const,system | null |
eq_ref（等值引用）
使用有唯一性索引查找（主键或唯一性索引）
create table a(id int primary key);
create table a_info(id int primary key, title char(1));
insert into a value(1),(2);
insert into a_info value(1, 'a'),(2, 'b');
mysql> explain select * from a join a_info using(id);
...+--------+--------+...
|...| table  | type   |...
|---|--------|--------|...
|...| a      | index  |...
|...| a_info | eq_ref |...
...+--------+--------+...
此时 a_info 每条记录与 a 一一对应，通过主键 id 关联起来，所以 a_info 的 type 为 eq_ref。
删除 a_info 的主键：ALTER TABLE  `a_info` DROP PRIMARY KEY;
现在 a_info 已经没有索引了：
mysql> explain select * from a join a_info using(id);

| id |...| table  | type   |...|
|----|---|--------|--------|---|
|  1 |...| a_info | ALL    |...|
|  1 |...| a      | eq_ref |...|

这次 MySQL 调整了执行顺序，先全表扫描 a_info 表，再对表 a 进行 eq_ref 查找，因为 a 表 id 还是主键。
删除 a 的主键：alter table a drop primary key;
现在 a 也没有索引了：
mysql> explain select * from a join a_info using(id);
...+--------+------+...
...| table  | type |...
...+--------+------+...
...| a      | ALL  |...
...| a_info | ALL  |...
...+--------+------+...
现在两个表都使用全表扫描了。唯一性索引才会出现 eq_ref （非唯一性索引会出现 ref ），因为唯一，所以最多只返回一条记录，找到后无需继续查找，因此比 ref 更快。

63. jquery修改和显示：
    _checkbox.each(function (){
                    $(this).prop("checked",true);
                    console.log($(this).attr("id"),$(this).is(":checked"));
                })

64. jsp自定义标签<%@ tag language="java" pageEncoding="UTF-8" %>
<%@ attribute name="title" type="java.lang.String" required="true" description="模态框标题" %>
${title}

65. get是幂等性请求，来去相同，而delete是单方面的，所以只能用post请求。
66. @ResponseBody 注解表示该方法的返回的结果直接写入 HTTP 响应正文（ResponseBody）中，一般在异步获取数据时使用，通常是在使用 @RequestMapping 后，返回值通常解析为跳转路径，加上 @ResponseBody 后返回结果不会被解析为跳转路径，而是直接写入HTTP 响应正文中。