|--javaNote
||--IDEA_key_map.md
||--counteredError.md

|--jsNote
||--单例.md

|--WeappNote
||--iView_Weapp.md

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
Mysql Where条件执行顺序是从左到右;oracle的sql语句，where后面的部分，执行顺序是从右往左。
遵循原则：排除越多数据的条件放在第一位
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

ERROR 13596 --- [ restartedMain] o.s.b.d.LoggingFailureAnalysisReporter         // 服务器配置的端口8000被占用
netstat -aon|findstr 8000
tasklist|findstr 8000
taskkill /f /t /im javaw.exe

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
52. 专门配置的servlet来提供数据库可视化：http://localhost:8081/druid/index.html
    <servlet>
        <servlet-name>DruidStatView</servlet-name>
        <servlet-class>com.alibaba.druid.support.http.StatViewServlet</servlet-class>
    </servlet>
    <servlet-mapping>
        <servlet-name>DruidStatView</servlet-name>
        <url-pattern>/druid/*</url-pattern>
    </servlet-mapping>
53. ISO-8859-1一个字符集只能存1个字节，存中文可能只存了一半，乱码。UTF-8一个字符集能存3个字节。utf8mb4是扩展，一个字符集能存4个字节，表情包 emoji就是4个字节。
54. service层就不归myBatis管了，它只管dao。所以dao里只写接口，而不用impl实现。而service里还是要自己实现的。
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

|...| table  | type   |...|
|---|--------|--------|---|
|...| a      | index  |...|
|...| a_info | eq_ref |...|

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

|...| table  | type |...|
|---|--------|------|---|
|...| a      | ALL  |...|
|...| a_info | ALL  |...|

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
该注解用于将 Controller 的方法返回的对象，通过适当的 HttpMessageConverter 转换为指定格式后，写入到 Response 对象的 body 数据区。
# 使用时机
    返回的数据不是 html 标签的页面，而是其他某种格式的数据时（如json、xml等）使用
返回值为JSON，就不是视图了，那么拦截器那里的modelAndView就有可能为空，所以要先判断它是否为null

67. a标签导致delete走了两遍，改成button即可。ajax也不需要a标签了，同时也因为 href="#"这个会刷新页面，所以a标签点击按钮时会变成两次ajax。
68.   $("#modal-secondary").modal("show");
        $("#modal-message").html(data.message); // html是写入文本内容
 // 避免绑定del() 变成死循环，所以先解绑，再锁死删除按钮。不解绑，那就回调用多次delete接口
                            $("#btnModalOk").unbind("click");
                            $("#btnModalOk").bind("click",function () {
                                $("#modal-secondary").modal("hide");
                            })
69. 伪分页支持50000条以内的数据，mysql数据表最大存储不要超过1000万条。
70. select * from limit 0,5; 后台分页数据
71. $(document).ready(function () {
    App.init();
})  //  init()是App里 return对象的一个属性。  这里是在页面初始化时执行App.init();  而ajax内部的东西可不是这个时候执行的。所以ajax里的要再激活一次。
72. 需要被传输的对象，就要实现序列化接口。   
public class PageInfo<T extends BaseEntity> implements Serializable {
    private int draw;
    private int recordsTotal;
    private int recordsFiltered;
    private List<T> data;
    private String error;
}
数据库表字段较多，在传输或返回值时不需要全都使用，那么就可以将这部分变为 抽象类BaseEntity，然后数据库表可以继承它，再者上面的类也可以用 <T extends BaseEntity>来约束 List<T> data的类型，必须是数据库表字段的子集。
    PageInfo<TbUser> pageInfo = new PageInfo<>();   这里PageInfo被约束在<TbUser>，因为TbUser extends BaseEntity

73. <%--    隐藏域，用于编辑按钮--%>
    <form:hidden path="id" />

74. 隐藏传输的密码： 
@JsonIgnore
    public String getPassword() {
        return password;
    }

75.     // 需要jstl来forEach，所以要model参数
    @RequestMapping(value = "list", method = RequestMethod.GET)
    public String list(Model model) {
        List<TbContentCategory> tbContentCategories = tbContentCategoryService.selectAll();
        model.addAttribute("tbContentCategories",tbContentCategories);
        return "content_category_list";
    }
}
    
76.  定义的Entity实体类，有一个布尔型属性 isParent， alt+Ins自动生成方法  getter和setter叫 getParent();setParent();   结果原本的isParent属性，在jsp页面变成了parent，这就是驼峰命名在idea上的问题：javax.el.PropertyNotFoundException: Property ****** not found on type ******
EL（Expression Language） 是为了使JSP写起来更加简单。

77. RPC，即 Remote Procedure Call（远程过程调用），是一个计算机通信协议。 该协议允许运行于一台计算机的程序调用另一台计算机的子程序，而程序员无需额外地为这个交互作用编程。说得通俗一点就是：A计算机提供一个服务，B计算机可以像调用本地服务那样调用A计算机的服务。RPC并没有规定数据传输格式，这个格式可以任意指定，不同的RPC协议，数据格式不一定相同。
当我们没有设置对象的字段的值的时候，Boolean类型的变量会设置默认值为null，而boolean类型的变量会设置默认值为false。局部变量使用基本数据类型，而定义POJO类属性和RPC返回值，建议使用包装类型Boolen，否则会有java.lang.NullPointerException
NPE风险。NPE，指为基本类型的数据返回null值，防止NPE是程序员的基本休养。所有NPE的场景：

    返回类型为基本数据类型，return包装数据类型的对象时，自动拆箱有可能产生NPE。

public int f() {
      return Integer 对象；
 } 
如果为null，自动拆箱抛NPE。 自动拆箱：就是将包装类自动转换成对应的基本数据类型。

    数据库的查询结果可能为null。
    集合里的元素即使isNotEmpty，取出的数据元素也可能为null。
    远程调用返回对象时，一律要求进行空指针判断，防止NPE。
    对于Session中获取的数据，建议NPE检查，避免空指针。
    级联调用obj.getA().getB().getC();一连串调用，易产生NPE。
举一个扣费的例子，我们做一个扣费系统，扣费时需要从外部的定价系统中读取一个费率的值，我们预期该接口的返回值中会包含一个浮点型的费率字段。当我们取到这个值得时候就使用公式：金额*费率=费用 进行计算，计算结果进行划扣。

如果由于计费系统异常，他可能会返回个默认值，如果这个字段是Double类型的话，该默认值为null，如果该字段是double类型的话，该默认值为0.0。

如果扣费系统对于该费率返回值没做特殊处理的话，拿到null值进行计算会直接报错，阻断程序。拿到0.0可能就直接进行计算，得出接口为0后进行扣费了。这种异常情况就无法被感知。

这种使用包装类型定义变量的方式，通过异常来阻断程序，进而可以被识别到这种线上问题。如果使用基本数据类型的话，系统可能不会报错，进而认为无异常。

78. int是基本数据类型，integer是引用数据类型，是int的包装类。

**自动装箱**的过程：引用了valueOf()的方法
     public static Integer valueOf(int i) {
            assert IntegerCache.high >= 127;
            if (i >= IntegerCache.low && i <= IntegerCache.high)
                return IntegerCache.cache[i + (-IntegerCache.low)];
            return new Integer(i);
        }

assertion就是在程序中的一条语句，它对一个boolean表达式进行检查，一个正确程序必须保证这个boolean表达式的值为true；如果该值为false，说明程序已经处于不正确的状态下，系统将给出警告并且退出。一般来说，assertion用于保证程序最基本、关键的正确性。
java内部为了节省内存，IntegerCache类中有一个数组缓存了值从-128到127的Integer对象。当我们调用Integer.valueOf（int i）的时候，如果i的值是-128到127之间的，会直接从这个缓存中返回一个对象，否则就new一个新的Integer对象。
即：当我们定义两个Integer的范围在【-128—+127】之间，并且值相同的时候，用==比较索引，因为是cache数组的同一个元素，所以地址相同，==返回true；而equals()只比较数值，两个new Integer(128); 地址不同，但值相同，所以equals()返回true。
       当大于127或者小于-128的时候即使两个数值相同，也会new一个integer,那么比较的是两个对象，用==比较的时候返回false
-1 = 10000001（原）= 11111110（反）= 11111111（补）
正数的反码是其本身
负数的反码是在其原码的基础上, 符号位不变，其余各个位取反.
正数的补码就是其本身
负数的补码是在其原码的基础上, 符号位不变, 其余各位取反, 最后+1. (即在反码的基础上+1)
1 - 1 = 1 +（-1）这样就计算机就只处理加法就可以了

1-1=1 +（-1）= 0000 0001+1000 0001 = 1000 0010 = -2

所以计算机无法用原码表示

所以出现了反码

1-1=1 + (-1) = 0000 0001（原） + 1000 0001（原）= 0000 0001（反）+ 1111 1110（反）= 1111 1111（反） = 1000 0000（原）= -0

这样就对了，但是-0这个问题没法解决

所以又有了补码

1-1 = 1 + (-1) = 0000 0001（原） + 1000 0001（原） = 0000 0001（补） +1111 1111（补）= 0000 0000（补）=0000 0000（原）

这样-0就不存在，还可以用1000 0000表示-128

79. 在VM初始化期间java.lang.Integer.IntegerCache.high属性可以被设置和保存在私有的系统属性sun.misc.VM class中。理论上讲，当系统需要频繁使用Integer时，或者说堆内存中存在大量的Integer对象时，可以考虑提高Integer缓存上限，避免JVM重复创造对象，提高内存的使用率，减少GC的频率，从而提高系统的性能。理论归理论，这个参数能否提高系统系统关键还是要看堆中Integer对象到底有多少、以及Integer的创建的方式。如果堆中的Integer对象很少，重新设置这个参数并不会提高系统的性能。即使堆中存在大量的Integer对象，也要看Integer对象时如何产生的

1.大部分Integer对象通过Integer.valueOf()产生。说明代码里存在大量的拆箱与装箱操作。这时候设置这个参数会系统性能有所提高。

2.大部分Integer对象通过反射，new产生。这时候Integer对象的产生大部分不会走valueOf()方法，所以设置这个参数也是无济于事。
Integer的缓存上限可以通过Java虚拟机参数修改，Byte、Short、Long、Character(0-127)的缓存则没法修改。

    tip1: 
        String 的 valueOf方法只有对boolean的处理返回字面量（字符串常量池）， 其他都是new新的！

        public static String valueOf(boolean b) {
            return b ? "true" : "false";
        }

    tip2: 对于Byte而言值的范围在[-128，127] 

    byte占一个字节空间，最高位是符号位，剩余7位能表示0-127，加上符号位的正负，就是-127至+127，但负0没必要，为充分利用，就用负零表示-128（即原码1000，0000）。（计算机转补码后存储）

80. let _dataTable = $("#dataTable").DataTable({});     $("#treeTable").treeTable({});
     treeTable要分类排序，有一个父节点，就要递归地找出其所有子节点，并按顺序放在展示数组内。
81. input的下拉框或模态框是不能输入的，所以要readonly="true"
82. 之前的JSON插件有个排除密码的@，现在由于el问题，isParent变成getParent()里返回的parent。所以可以用 @JsonProperty(value = "isParent")新增一个返回值
83. 选中树节点，得到是节点id，但是要显示的是节点名字，所以用隐藏域  <form:hidden path="categoryId" />       <input id="categoryName" class="" readonly="true" />帮助表单收集和发送信息，便于后端处理数据。用户点击提交的时候，隐藏域的内容也一并提交给后台，但对用户是不可见的。
84. 回调函数 callback为何作为参数？因为在封装的时候，callback的内部都是个性化的内容，无法统一，所以作为一个参数传入,调用如下
$(function () {
    App.initZTree("/content/category/tree/data", ["id"], function(nodes) {
        ...;
    });
});


85. POJO（Plain Ordinary Java Object）简单的Java对象，包括private属性和对应的 getter、setter方法，而bean还要包含toString、不含参的构造方法等，这些都很臃肿，所以用Lombok插件来简化臃肿代码。编写的都是.java文件，而Lombok能在编译为.class文件时自动增加getter、setter方法，只要能hook在编译时即可。插件都是启动时加载的，所以要重启。 @Data注解  本来在getPassword()上@JsonIgnore，现在在属性password上注解。
86. JSR-303提供了Bean验证的规范/标准，具体由自己实现，官方参考实现是Hibernate Validator。通过该类的方法来捕获异常，可以自己写一个public方法来输出异常。对于用户名，可以注解为
@Length(min=6, max=20, message= "username must between 6~20 chars")
@Pattern(regexp = RegexpUtils.PHONE, message="")
@Pattern(regexp = RegexpUtils.EMAIL, message="")

87. spring只能@Autowired注入对象，不能注入属性，一旦加上static就是属性了。
88. dropzone支持文件上传。// jQuery的继承,不要继承反了
        $.extend(defaultDropzoneOpts,opts);
let foo = {
    a: 5,
    b: 6,
    c: this.a + this.b  // Doesn't work c:NaN
}
定义对象，且内部属性的值依赖自身属性的值，但是无效，必须用闭包
let o = (function () {
    let obj = {
        a: 5,
        b: 6,
        init: function() {
            this.c = this.a + this.b;
            return this;
        }
    }.init()
    delete obj.init//删除初始化属性
    return obj
})()

89. 富文本编辑器，Rich Text Editor, 简称 RTE, 它提供类似于 Microsoft Word 的编辑功能，容易被不会编写 HTML 的用户并需要设置各种文本格式的用户所喜爱。它的应用也越来越广泛。最先只有 IE 浏览器支持，其它浏览器相继跟进，在功能的丰富性来说，还是 IE 强些。
90. 富文本编辑器只是个div，没有input，所以要在前面设置一个input隐藏域，测试用input，正式用hidden。
91.             String serverPath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort();

92. dao和service各有很多相同的方法，所以可以封装在persistence持久层里的一个接口 BaseDao<T extends BaseEntit> 然后接口继承接口:
public interface TbUserDao extends BaseDao<TbUser>{}
同理有 BaseService<T extends BaseEntity>

93. 自关联，在自己的对象内引用自己，又当子节点又当父节点。

94. BaseTreeDao,BaseTreeService抽象到commons。在admin下新建包abstracts，再新建类AbstractBaseTreeServiceImpl,因为它不是通用的，可能只给admin使用，所以不是放在commons下。深度抽象！只关注业务本身！

95. 事务管理器是 PlatformTransactionManager 接口对象，该接口定义了 3 个事务方法：

    void commit(TransactionStatus status)：事务的提交
    TransactionStatus getTransaction(TransactionDefinition definition)：获取事务的状态
    void rollback(TranscationStatus status)：事务的回滚

常用的两个实现类

PlatformTransactionManager 接口有两个常用的实现类：

    DataSourceTransactionManager：使用 JDBC 或 MyBatis 进行持久化数据时使用。
    HibernateTransactionManager：使用 Hibernate 进行持久化数据时使用。使用方言而不是JDBC
Spring事务回滚的默认方式：运行时异常回滚（编译时不报错。。。），所以自己不能try catch，全由Spring处理。

96. 事务定义接口 TransactionDefinition 中定义了事务描述相关的三类常量：事务隔离级别、事务传播行为、事务默认超时时限(不同db不同，所以自己无法估计设置时间)，及对它们的操作。

事务的四种隔离级别

    DEFAULT：采用 DB 默认的事务隔离级别。MySql 默认为 REPEATABLE_READ；Oracle 默认为：READ_COMMITTED；
    READ_UNCOMMITTED：读未提交。未解决任何并发问题。
    READ_COMMITTED：读已提交。解决脏读，存在不可重复读与幻读。
    REPEATABLE_READ：可重复读。解决脏读、不可重复读。存在幻读。
    SERIALIZABLE：串行化。不存在并发问题。
脏读：A事务提交前，事务B就对同一变量有修改，但还未提交，就报错回滚了，该变量又回到了A的初始值。解决办法是，事务提交前不允许别人读到这个修改值。
不可重复读：针对的是不同事务调用同一个方法，读取了同一个变量。
幻读：事务A读取数组长度时，事务B增加了该数组长度。

97. 所有回滚事务由Spring负责，自己不可以Begin try ... catch Rollback Commit

98. 事务的七种传播行为

所谓事务传播行为是指，处于不同事务中的方法在相互调用时，执行期间事务的维护情况。如，A 事务中的方法 a() 调用 B 事务中的方法 b()，在调用执行期间事务的维护情况，就称为事务传播行为。事务传播行为是加在方法上的。

    REQUIRED：指定的方法必须在事务内执行。若当前存在事务，就加入到当前事务中；若当前没有事务，则创建一个新事务。这种传播行为是最常见的选择，也是 Spring 默认的事务传播行为。
    SUPPORTS：指定的方法支持当前事务，但若当前没有事务，也可以以非事务方式执行。
    MANDATORY：指定的方法必须在当前事务内执行，若当前没有事务，则直接抛出异常。
    REQUIRES_NEW：总是新建一个事务，若当前存在事务，就将当前事务挂起，直到新事务执行完毕。
    NOT_SUPPORTED：指定的方法不能在事务环境中执行，若当前存在事务，就将当前事务挂起。
    NEVER：指定的方法不能在事务环境下执行，若当前存在事务，就直接抛出异常。
    NESTED：指定的方法必须在事务内执行。若当前存在事务，则在嵌套事务内执行；若当前没有事务，则创建一个新事务。

99. 配置事务在spring-context.xml的beans里添加
    <!-- 配置事务管理器 -->
    <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <property name="dataSource" ref="dataSource"/>
    </bean>

    <!-- 配置事务通知。新增了scheme:tx -->
    <tx:advice id="myAdvice" transaction-manager="transactionManager">
        <tx:attributes>
            <tx:method name="save*" propagation="REQUIRED"/>
        </tx:attributes>
    </tx:advice>

    <!-- 配置顾问和切入点 -->
    <aop:config>
        <aop:pointcut id="myPointcut" expression="execution(* com.hello.spring.transaction.aspectsj.aop.service.*.*(..))" />
        <aop:advisor advice-ref="myAdvice" pointcut-ref="myPointcut" />
    </aop:config>

https://www.bilibili.com/video/av29299488
千锋教育  李卫民
https://www.funtl.com/zh/supplement1/#jsr-303-%E7%AE%80%E4%BB%8B