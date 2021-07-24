@echo off
rem 将一个文件夹里的文件每隔1秒剪切/移动到另一个文件夹里
rem /a 显示具有指定属性的文件 d就是指目录（指定属性） /b使用空格式（没有标题，摘要信息） 
rem dir /ad	只查看文件夹
rem dir /a-d	只查看文件
set #=Any question&set @=WX&set $=Q&set/az=0x53b7e0b4
title %#% +%$%%$%/%@% %z%
cd /d "%~dp0"
set "oldfolder=D:\lk\java\javaNote\download"
set "newfolder=D:\lk\java\javaNote\download2"
set sleep=1
if not exist "%oldfolder%" (echo;"%oldfolder%" not found&goto end)
if not exist "%newfolder%" (
	md "%newfolder%"
) else (
	rd /s/q "%newfolder%"
	md "%newfolder%"
)
for /f "delims=" %%a in ('dir /a-d/b "%oldfolder%\"') do (
echo;"%oldfolder%\%%~nxa" --^> "%newfolder%\"
copy "%oldfolder%\%%~nxa" "%newfolder%\"
if exist "%windir%\System32\timeout.exe" (
timeout /t %sleep% /nobreak
) else (
set /a t=sleep+1
>nul call ping /n %%t%% 0
)
)
:end
echo;%#% +%$%%$%/%@% %z%
pause
exit