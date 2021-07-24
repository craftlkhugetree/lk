1. ERROR 13596 --- [ restartedMain] o.s.b.d.LoggingFailureAnalysisReporter         // 服务器配置的端口8000被占用
netstat -aon|findstr 8000
tasklist|findstr 8000
taskkill /f /t /im javaw.exe

2. pom.xml有红叉
find ./ -name "*.lastUpdated" | xargs rm -rf
for /r %i in (*.lastUpdated) do del %i
如果第一行还是有红叉，那就在插入：
<properties>
	<maven-jar-plugin.version>3.0.0</maven-jar-plugin.version>        
</properties>


3. maven项目在sts里没找到main文件来启动，所以用命令行：
mvn  spring-boot:run

4. PKIX path building failed: sun.security.provider.certpath.SunCertPathBuilder
仓库地址更新为了https,所以下载时需要ssl认证,我们可以忽略ssl检查导致的问题,我们可以直接忽略该检查使用命令:
mvn clean install -Dmaven.wagon.http.ssl.insecure=true -Dmaven.wagon.http.ssl.allowall=true
或者在 VM options for importer里输入 -Xmx768m ...

5. mybatis或者db的自增id没起作用。



