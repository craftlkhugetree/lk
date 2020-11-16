#!/bin/bash
# source/bash/sh/ ./*.sh


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
    # 判断文件是否为空，空则使用echo命令添加，非空则使用sed命令在最后append $a
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


# test判断文件
# -e file 如果bai file存在，则为真
# -d file 如果 file为目录，则为真
# -f file 如果 file为常du规文件，zhi则为真
# -L file 如果 file为符号链接，dao则为真
# -r file 如果 file可读，则为真
# -w file 如果 file可写，则为真
# -x file 如果 file可执行，则为真
# -s file 如果 file长度不为0，则为真
# -h file 如果 file是软链接，则为真 