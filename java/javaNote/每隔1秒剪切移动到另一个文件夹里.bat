@echo off
rem ��һ���ļ�������ļ�ÿ��1�����/�ƶ�����һ���ļ�����
rem /a ��ʾ����ָ�����Ե��ļ� d����ָĿ¼��ָ�����ԣ� /bʹ�ÿո�ʽ��û�б��⣬ժҪ��Ϣ�� 
rem dir /ad	ֻ�鿴�ļ���
rem dir /a-d	ֻ�鿴�ļ�
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