1. win+r	services.msc	mstsc远程	control控制面板

2. find ./ -name "*.lastUpdated" | xargs rm -rf
	for /r %i in (*.lastUpdated) do del %i

3. netstat -aon|findstr 8000
tasklist|findstr 8000
taskkill /f /t /im javaw.exe

4. mvn  spring-boot:run

5. 
