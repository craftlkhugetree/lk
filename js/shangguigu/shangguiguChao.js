1.html里的每一个文件都是一个asset，都需要服务器响应一次。js都在内存里，事件驱动就是等着鼠标点击按钮，其他代码不必再执行一次。

2.js诞生于1995年，当时处理前端验证，用户输入是否符合规则，放在服务器上太浪费，浏览器就可以前端验证。
ECMAScript是一个标准，需要由浏览器厂商实现。
不同的js引擎，火狐是蜘蛛猴，Chrome是v8

3.js的三个部分：ECMA，DOM，BOM。

4.var obj={};字面量方式创建对象；工厂方法大量创建对象；构造函数法new Object()

5.垃圾回收，GC  由浏览器提供。 我们只要把它设置为null即可。
var obj = new Object(); obj=null;   //再也找不到了

6. var arr = new Array();   数组是js内建对象
arr[arr.length]=末尾添加一个值；
arr.push(a,b,c);    末尾添加多个值，并返回新长度。
arr.pop()   删掉末尾一个值，并返回删掉的值。
arr.unshift(a,b,c)   头部添加多个值，并返回新长度。
arr.shift() 删掉第一个值
arr.forEach(function(value,index,obj){ //由我们创建不由我们调用的函数，叫回调函数。由浏览器调用。
        //三个参数分别为：当前数组元素，索引，数组对象
})     //IE9及以上才支持forEach
arr.slice(start,end?)    截取，并不改变原数组。最后一个为-1
arr.splice(start,num,new)    会修改原数组，将删除的num个元素返回。并将新元素new插入到start位置。
arr1.concat(arr2)   产生新数组连接arr1和arr2
arr.join()  默认逗号分隔，连成一个string
arr.reverse()   反转数组，修改原数组。
arr.sort();  也会修改原数组，默认按unicode编码，所以11会排到2前面。添加回调函数。
    arr.sort(function(a,b){
        return (x=a-b);//升序
    })//浏览器根据x判断顺序，若x<0,则元素位置不变；若x>0，则交换位置；若x=0，则认为a=b.


7.全局作用域的函数定义非常危险，污染了命名空间。用prototype添加方法。
通过构造函数创建的对象，都会有一个隐式原型指向该构造的原型对象。
var stu = new Class();  
stu.__proto__ = Class.prototype

8. 检查对象中是否有某个属性：
"属性" in 对象                  会检查原型链。
对象.hasOwnProperty("属性")     不检查原型链。

9.call()和apply()都是函数对象的方法，
function fun(){
    alert("hello");
}
fun.call();     调用call()和apply()时可以将一个对象指定为第一个参数,该对象成为函数执行时的this
var obj = {};   fun.call(obj);  和刚才一样执行alert
若改为   alert(this);    fun();结果是 [object Window]
        fun.call(obj);  结果是[object Object]
若有 var obj1 = {
    name:"obj1",
    sayName:function(){alert(this.name)}
}
那么obj1.sayName.apply(obj2);   的this是obj2
（1）注意，call(obj,arg1,arg2);  arg1和arg2才是实参；而apply(obj,[arg1,arg2]);
（2）以函数形式调用时，this永远是window；以方法，this是调用方法的对象；以构造函数，this是新创建的那个对象；
用call和apply调用时，this是指定的那个对象。

10.在调用函数时，浏览器每次都会传递两个隐含的参数：函数的上下文对象this，封装实参的对象arguments。
function fun10(){
    console.log(arguments);     [object Arguments]
}
arguments instanceof Array
Array.isArray(arguments)    都是false
所以arguments是一个类数组对象，有索引，有长度，实参都在arguments中保存（不论有无形参）。
arguments.callee === fun10      callee属性对应正在指向的函数对象。

11.计算机底层保存的都是时间戳，格林威治标准1970/1/1 0:0:0 到现在的毫秒数  
(new Date).getTime();
或者 Date.now();

12.Math是工具类，不是构造函数，不用创建对象。
Math.ceil(-1.1) = -1  向上取整
Math.floor(-1.1) = -2   向下取整
Math.round(1.4) = 1     四舍五入
Math.random()       0~1随机数

13.基本数据类型 String Number Boolean Null undefined
引用数据类型    Object
js提供了三个包装类，通过它们可以将基本数据类型变为对象。String() Number() Boolean()
var num = new Number(3);
console.log(typeof num);    //object
var b =new Boolean(false);
if(b){alert("go")}  //运行了，因为b是对象
var s=123; s=s.toString(); console.log(typeof s);   //string
//s作为基本数据类型本来是不能添加方法和属性的，但是s能调用toString()方法，这是因为浏览器临时用包装类将s转变为对象

14.String对象方法，字符串在底层是以字符数组的形式保存的。
str.charAt(0);  索引为0的字符
str.charCodeAt(0);  索引为0的字符unicode编码
String.fromCharCode(73);   //I  十六进制0x开头
str1.concat(str2);
str.indexOf('h',0);   //检索str中是否有字符串h，并返回第一出现的索引，若无则返回-1。默认从0索引开始
str.lastIndexOf('h');   //从后往前找
str.slice(1,4); //截取[1,4)
str.sbustring(0,2); //截取[0,2),但是不能用-1表示末尾，负值表示零；若第二个参数小于第一个，就自动换位。
str.substr(start,num);
str.split(",");    //根据分隔符，拆分为数组。split('');拆分每个字符

15.创建正则表达式对象，var reg = new RegExp("正则表达式","匹配模式");
reg.test(str); //test()返回值为boolean
匹配模式：i忽略大小写   g全局模式
使用字面量创建正则，var 变量名 = /正则表达式/匹配模式;
reg1 = /ab/i;
reg2 = /a|b/;   reg3 = /[A-z]/; //中括号里的内容也是或的关系
reg = /a[bde]c/;    //abc adc aec
reg = /[^ab]/;  //除了a和b以外的
reg = /[^0-9]/;   除了数字，reg.test("123a45");是true

16.能接收正则表达式的 String对象方法
str.split(/[A-z]/); //所有字母作为分隔符，默认全局。
str.search(/a[b,d-z]c/);    //可以没有逗号！返回指定内容的索引abc,adc...,若无则返回-1。不论是否全局，都只查找第一个。
str.match(/[a-z]/gi);  //提取符合条件的内容并返回数组，默认只找到第一个符合的，找到就停止，所以要设置全局
str.replace(/[a-z]/gi,newstr);  //被替换，新内容。被替换可以是正则。默认只替换第一个，所以要设置全局。如果newstr为""那就是删除。

17.量词     var reg = /a{3}/;   /(ab){3}/
/ab{1,3}c/  abc abbc abbbc  {m,n}m到n次； {m,}m次以上
/ab+c/  至少一个b，相当于{1,}； *零个或多个{0,}；   ?相当于{0,1}
/^a/以a开头；   /b$/以b结尾；   /^a$/唯一对应于"a"；    /^a | a$/
replace(/\s+/g,'') 替换全部空格为空字符

18.手机号：11位数字，以1开头，第二位是3-9任意数字，
/^1[3-9][0-9]{9}$/

19.点表示任意单个字符，除了换行和行结束符。/\./
注意：使用构造函数时，由于 参数为字符串，而\是字符串的转义字符，所以要用\\
var reg =new RegExp("\\.");
\w  表示任意字母数字下划线 /[A-z0-9_]/
\W  除了字母数字下划线
\d  任意一个数字
\D  除了数字
\s  空格
\S  除了空格
\b  单词边界
\B  除了单词边界
reg = /child/;  reg.test("hello children"); //不严格的child   
reg = /\bchild\b/; 严格的边界

20.去除字符串中的空格
str = str.replace(/\s/g,"");
但如果字符串中间有空格，那应该保留，只消两端的空格
str = str.replace(/^\s*|\s*&/g,"");

21.电子邮件：开头任意字母数字下划线；@；网址不能下划线；.任意字母(2-5位)
\w{3,} (\.\w+)* @ [A-z0-9]+ (\.[A-z]{2,5}){1,2}
var emailReg = /^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/;

22. index.html就是文档， <body>就是对象，对象的关系组成树状模型：DOM树
文档节点，元素节点，属性节点，文本节点
事件：文档或浏览器窗口中发生的一些特定的交互瞬间；用户与浏览器的交互。
ondblclick="alert("hello")"   双击事件（结构和行为耦合）
btn.onclick= function () { alert("hello") }  解耦合，应当在<script></script>中用回调函数
onmousemove=""     鼠标移动事件

23.浏览器加载页面是自上向下，读取到一行就运行一行。
整个页面加载完成也是一个事件，onload，支持该事件的对象image,layer,window。所以<script></script>写在head里时，
window.onload = function () {};   该响应函数将在页面加载完成后执行，这就不会出现无法获取dom对象的情况了。

24.获取元素节点
getElementById().innerHTML   标签内的文本,  .onclick()=function name(params) {}给按钮增加点击函数。
getElementsByTagName()  li,p,div    返回类数组对象collection，有长度有索引；
getElementsByName() input自结束标签没有内部, 所以用name属性、value属性、type属性等。只有class要用className调用。
找到标签对象，再操作其属性。

25.元素节点的子节点
var lis = document.getElementsByTagName("li")
lis.childNodes;包含文本节点在内的所有节点，甚至包括换行和空白。IE8及以下不会把空白当做子节点。
lis.children;只包括子元素，不是节点。
lis.lastChild;lis.firstChild;


