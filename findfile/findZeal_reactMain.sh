#!/bin/sh
#find the count of same name files under current directory

for file in `find /c/Users/Administrator/AppData/Local/Zeal/Zeal/docsets/*.docset/Contents/Resources/Documents/developer.mozilla.org/static/build/js/ -name "react-main.*.js"`
do 
        echo `basename ${file}` >> search.txt
done

#cat search.txt | sort | uniq -c > times_of_file.txt
