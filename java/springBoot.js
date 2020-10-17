https://www.bilibili.com/video/BV1gW411W76m?p=2
尚硅谷

1.springboot是J2EE一站式解决方案，springcloud是分布式整体解决方案。
易于入门，但是难于精通，因为springboot是对spring的再封装。

2.微服务，2014年，Martin Fowler,架构风格
单体应用：把所有功能放在单一进程中，开发测试部署扩展简单，因为只是一个应用，不牵扯其他应用。并且通过在多个服务器上复刻这个单体，即可扩展；但是牵一发而动全身。
微服务：一个应用应该是一组小型服务，运行在自己的进程内，可以通过http的方式沟通；跨服务器分发这些服务进行扩展，只在需要时才复刻；每个功能元素都是一个可独立替换和独立升级的软件单元。

3. jdk 1.7及以上；mvn -v 3.3以上； Intellij IDEA 2017 或者 STS；springboot 1.5.9
maven设置，settings.xml  <profils>jdk-1.8
IDEA设置，Build Tools:maven配置文件和仓库

4.在IDEA中创建一个maven工程(启用自动导入)，导入springboot的相关依赖，编写一个主程序来启动springboot应用。

5.  包名+类名  com.sgg.HelloWorld.java
@SpringBootApplication  标注主程序 ，快捷键psvm扩展出主程序。  
java -jar 打好的jar包  即可部署

6. POM文件，管理依赖，版本仲裁中心。

