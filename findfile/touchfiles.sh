#!/bin/bash


cd /d/test
rm -rf touchfile/
mkdir touchfile && cd touchfile

tmpStr='Sed  is  a  stream  editor.   A stream editor is used to perform basic text transformations on an input stream (a file or input from a
       pipeline).  While in some ways similar to an editor which permits scripted edits (such as ed), sed works by making only one pass  over
       the  input(s),  and  is  consequently more efficient.  But it is sed’s ability to filter text in a pipeline which particularly distin-
       guishes it from other types of editors.'

for((i=1;i<=10;i++));
do
    tmpfile="test$i.log"
    touch $tmpfile
    # 判断文件是否为空，空则使用echo命令添加，非空则使用sed命令
    test -s $tmpfile && sed -i "\$a $i$tmpStr" $tmpfile || echo $i$tmpStr >> $tmpfile
    
    echo -e "\n$i$i\n$i$i" >> $tmpfile

    #插入第三行前
    sed -i '3i\this is a insert line' $tmpfile

    #插入第三行后

    sed -i '3a\this is a append line' $tmpfile

    #插入到最后一行

    sed -i '$a\this is last line' $tmpfile

    #文件行数
    cat $tmpfile |wc -l
done