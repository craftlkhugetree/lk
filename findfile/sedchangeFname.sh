#!/bin/sh
#fs = `ls -R | grep "SCSP1.0.0*"`
#echo $fs
fp = `find ./ -type f   #-name '*' `
for i in $fp;
do
newname=`echo $i|sed 's/PJ20200606/EOAP/'` #.要转义，可以不^开头
if [ $i != $newname ];then
mv $i $newname
fi
done

