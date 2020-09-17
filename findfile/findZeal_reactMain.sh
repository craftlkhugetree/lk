#!/bin/sh
#find the count of same name files under current directory

rm -rf findZeal_reactMain.txt times_of_file.txt
# for file in `find /c/Users/Administrator/AppData/Local/Zeal/Zeal/docsets/*.docset/Contents/Resources/Documents/developer.mozilla.org/static/build/js/ -name "react-main.*.js"`
for file in `find ./ -type f -name "zzz"`
do 
        echo  "$file" >> findZeal_reactMain.txt
        echo -e "\r\n">> findZeal_reactMain.txt
        echo -E ` basename ${file}` >> findZeal_reactMain.txt
        # printf "$file\n" >> findZeal_reactMain.txt
        # printf ` basename ${file}` >> findZeal_reactMain.txt
done

cat findZeal_reactMain.txt | sort | uniq -c >> times_of_file.txt
