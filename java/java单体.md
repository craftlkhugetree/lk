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
最：最少知识
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
在maven的settings.xml设置本地仓库，中央仓库。
在mvnrepository.com找需要的<dependency></dependency> ，放到项目的pom.xml文件。
<!-- https://mvnrepository.com/artifact/mysql/mysql-connector-java -->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.22</version>
</dependency>
mysql引擎：innodb支持事务可回滚，MyISAM不支持事务但效率高。mysql八代版本只有innodb，但是效率更高。
如果要修改mysql版本，只要更改<version>的版本号即可