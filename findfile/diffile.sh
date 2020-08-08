#cat diff_two_file
#/bin/sbin
file1=react-main.*.js
file2=./ccdoc/react-main.*.js
diff $file1 $file2 > /dev/null
if [ $0 == 0 ]; then
    echo "Both file are same"
else
    echo "Both file are different"
fi
#  $0 是上一执行命令的返回值。
#  diff 命令返回值为 0，说明两个文件相同， 否则两个文件不相同
