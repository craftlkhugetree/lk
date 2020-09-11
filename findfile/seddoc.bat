FILE=$1    
RETPATH=`pwd`    
rm -rf ./setdocx    
mkdir ./setdocx    
cp $FILE ./setdocx
cd ./setdocx    
mkdir tmp
unzip $FILE -d tmp
cd tmp/word
sed -i "s/${2}/${3}/" document.xml
cd ..
zip -r ../${FILE} *
cp ./setdocx/${FILE} ${RETPATH}
cd $RETPATH
