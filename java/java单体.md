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

16. 重构原则，先写代码，不要过度设计，业务实现之后再重构进行完善。
17. 接口的幂等性问题，不论调用多少次http get方法，结果都一样。而post不具备幂等性。不能post里调get，或者get里调post。    get效率高，明文传输，参数大小有限；post分为两段，先询问fwq能否提交数据，同意后才提交。
18. 字符串写在前面，"admin".equals();防止字符串空指针异常，不要用 && 同时判断用户名和密码，这会被注入，变成两个if嵌套来判断。
19. 登录逻辑放到service里，不想放在视图层，但是视图层又要展示用户名，所以service要返回User对象给视图层，但如果登录不成功又要返回失败信息，难道要在视图层进行逻辑判断？重构吧！！！