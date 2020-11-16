#/bin/sbin
#cat diff_two_file

# shell 在执行某个命令的时候，会返回一个返回值，该返回值保存在 shell 变量 ?中。当? == 0 时，表示执行成功；当 $? == 1 时（是非0的数，返回值在0-255间），表示执行失败。
# 只有在 && 左边的命令返回真（命令返回值 $? == 0），&& 右边的命令才会被执行。 只有在 || 左边的命令返回假（命令返回值 $? == 1），|| 右边的命令才会被执行。

#不能随便用``除法，里面有命令，比如find，另外=两边不能有空格。
echo "参数个数 ：$# "
echo "脚本名和各参数：$0 $1 $2"
echo "参数列表：$@"
echo "上一命令返回0表示成功：$?"
#file1=react-main.*.js
#file2=./ccdoc/react-main.*.js
#diff $file1 $file2 > /dev/null
diff $1 $2 > /dev/null

if [ $? == 0 ]; then
    echo "Both files are same"
else
    echo "Both files are different"
fi
#  $0 是上一执行命令的返回值。
#  diff 命令返回值为 0，说明两个文件相同， 否则两个文件不相同


# # 这里有>，/dev/null，2>&1，最后一个&
# 0 0 * * * /data/test.sh > /dev/null 2>&1 &

# /dev/null 表示空设备文件
# 0 表示stdin标准输入
# > 代表重定向到
# 2 表示stderr标准错误
# 1 表示stdout标准输出
# & 表示等同于的意思，2>&1，表示2的标准错误输出重定向等同于1标准输出
# 最后一个&表示在后台中运行，后面会有解释


# #!/bin/sh
# mm
# date
# # 标准执行,错误与输出都显示在终端
# [dev ~]$ ./test.sh 
# ./test.sh: line 2: mm: command not found
# Thu Jul 26 14:50:08 CST 2018

# # 禁止标准输出到终端，只显示了标准错误
# [dev ~]$ ./test.sh > /dev/null
# ./test.sh: line 2: mm: command not found
# [dev ~]$
# # 禁止标准错误到终端，显示了标准输出
# [dev ~]$ ./test.sh 2> /dev/null
# Thu Jul 26 14:53:33 CST 2018
# [dev ~]$
# # 禁止标准错误和标准输出都显示在终端,此时无任何输出
# # 白话意思就是这两个都写上，屏幕上啥也不显示，程序偷摸儿的运行
# [dev ~]$ ./test.sh > /dev/null 2>&1
# [dev ~]$

#   basename /usr/bin/sort          -> "sort"
#   basename include/stdio.h .h     -> "stdio"
#   basename -s .h include/stdio.h  -> "stdio"
#   basename -a any/str1 any/str2   -> "str1" followed by "str2"

# -e 打开echo转义，\r\n才能换行
# echo -e "\r\n">> findZeal_reactMain.txt
# echo -E ` basename ${file}` >> findZeal_reactMain.txt
