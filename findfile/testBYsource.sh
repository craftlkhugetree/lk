#!/bin/sh
#find the count of same name files under current directory
# /c/Users/Administrator/AppData/Local/Zeal/Zeal/docsets/*.docset/Contents/Resources/Documents/developer.mozilla.org/static/build/js

# folderList=`ls | grep "doc/$"`
# for folder in ${folderList[*]};
# do 
#         mkdir $folder/testF
#         cp $folder/*.txt $folder/testF
#         echo `basename $folder`
# done

# f=`ls /d/lk/findfile | grep "doc/$"`


preF="/c/Users/Administrator/AppData/Local/Zeal/Zeal/docsets"
suF="Contents/Resources/Documents/developer.mozilla.org/static/build/js"

f=`ls $preF | grep "docset/$"`
# echo $f
for i in ${f[*]};
do
        mv $preF/$i/$suF/react-main.*.js .
done

