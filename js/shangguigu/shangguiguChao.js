https://www.bilibili.com/video/bv1YW411T7GX/?p=102
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
[]...new Set(arr)]  去重,只能针对数字，对于数组元素不行。
[1,2,3,4].toString();   // "1,2,3,4"


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
str.substring(0,2); //截取[0,2),但是不能用-1表示末尾，负值表示零；若第二个参数小于第一个，就自动换位。
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
lis.children;只包括子元素，不包括文本节点Object Text。
lis.lastChild;lis.firstChild;  首尾子节点，包括空白文本节点。

26.获取父节点和兄弟节点（也能获得空白的文本）
parentNode,previousSibling,nextSibling
获取按钮，再绑定onclick单击响应函数
function  myClick(idStr,fun) {
  let btn = document.getElementById(idStr);
  btn.onclick = fun;
  }
}
元素.innerHTML 获取包括子元素在内的节点，元素.innerText只获取文本。也可以获取节点后，用nodeValue属性获取文本。
previousElementSibling获取前一个兄弟元素，不包括空白文本。
文本框的value属性就是输入值。name属性专门用来被选中，比如都是name="itmes"，那就可用document.getElementsByName("items");全选中。

27.单击响应函数内部的this是谁呢？就是给谁绑定的，单击的这个按钮对象。

28.获取body标签，可以 document.getElementsByTagName("body")[0]
也可以 document.body;
而 document.documentElement;是html根标签
document.all;获得所有元素组成的数组，也可以是document.getElementsByTagName("*");
document.getElementsByClassName();是IE9及以上才支持。
document.querySelector(".box div")可以根据一个css选择器来查询,这在IE8也兼容。但是只返回第一个。
所以有了 document.querySelectorAll(".box");返回一个数组

29.创建节点
myClick("btn01",function () {
  var li = document.createElement("li");
  var gzText = document.createTextNode("广州");
  li.appendChild(gzText)
  var city = document.getElementById("city")
  city.appendChild(li)
})

父节点.insertBefore(新，旧); replaceChild(new,old); removeChild();
子节点.parentNode.removeChild(子节点)
DOM增删改也可以用innerHTML，比如  city.innerHTML += "<li>广州</li>";而且影响范围小，所以可以将上述两种结合使用
var li = document.createElement("li")
li.innerHTML = "广州"
city.appendChild(li)

30.点击超链接，必然会跳转，若不想跳转，可以在单击响应函数最后添加 return false;
var name = tr.children[0].innerHTML;
var flag = confirm("确认删除"+name+"吗?");

31.把input提交，同时增加一行表格
var nameTd = document.createElement("td")
var aTd = document.createElement("td")

var a = document.createElement("a")
a.href = "javascript:;"

//创建文本节点
var nameText = document.createTextNode(name);
var delText = document.createTextNode("Del");
//将文本添加到td,a
nameTd.appendChild(nameText)
a.appendChild(delText)
aTd.appendChild(a)

tr.appendChild(nameTd)
tr.appendChild(aTd)
如果直接把tr添加到table中，那么上述添加的tr，是和tbody同级别的，显示上没有区别，但是若给tbody增加样式，将无法影响到添加的tr

tr.getElementsByTagName("a")[0].onclick = delA  //单击响应函数a，由函数对象赋值，所以不能是delA()

32.上述添加一行表格，也可以用 tr.innerHTML = "<td>"+name+"</td>"+
                                           "<td><a href='javascript:;'>Del</a></td>"
另外一种添加方式为 tbody.innerHTML += "<tr>"+....+"</tr>";   但是这样会把所有的tr都给影响了，效率低，不安全。


33.如果在for循环中给表格每一行绑定单击响应函数，不能用fun[i]，因为页面加载完成后for循环就执行完了，而响应函数要等待点击，所以这里不能用fun[i]
来表示当前行，而要用this。

34.元素.style.width = "300px";  像 background-color 要用驼峰命名法改为 backgroundColor
上述通过style属性，来设置和读取的只能是内联样式。
以下两种方法都是只读的，无法修改样式：
（1）要获取当前生效的样式（只有IE有效）：元素.currentStyle.width; 若没有设置，那么返回的是默认样式，像width就是auto。
（2）其他浏览器和IE9支持的是 getComputedStyle(box1,null); 第一个参数为要获取样式的元素，第二个参数为伪元素
      没有设置的样式，不是返回默认值，而是实际值。

35.上述问题，若要都兼容，那就要写一个支持所有浏览器的函数
function getStyle(obj,name){
  if(window.getComputedStyle){ //有这个函数，说明是正常浏览器。变量没找到则报错，属性没找到则返回undefined。
    return getComputedStyle(obj,null)[name] //这里不能用 .name，因为name是个变量，可以是width，height等
  } else {
    return obj.currentStyle[name]
  }
}

36.元素的可见宽度和高度，不带px，返回的是数值。但是包括内容区和padding。
clientWidth
clientHeight  都是只读，不可修改。
box1.offsetWidth  包括内容区，padding，border。
box1.offsetHeight
offsetParent  获取离该元素最近的开启了定位的祖先元素，若都没positin则返回body。

box4.scrollWidth
box4.scrollHeight
box4.scrollLeft
box4.scrollTop
当 scrollHeight - scrollTop === clientHeight 时，说明滚动条到底了。
这就能确保阅读协议到底。
事件：滚动条滚动时触发  onscroll
window.onload = function () {
    var id = document.getElementById("id")
    var inputs = document.getElementsByTagName("input")
    id.onscroll = function () {
      if (id.scrollHeight - id.scrollTop === id.clientHeight) {
        inputs[0].disabled = false;
        inputs[1].disabled = false;
      }
    }
  }

  37.鼠标在div中移动时获取其坐标，事件：onmousemove
  当事件响应函数被触发时，浏览器每次都会将一个事件对象作为实参传递进响应函数
  e.clientX
  e.clientY
  但是IE8是不传递事件对象e的，而是将其作为window对象的属性保存。 window.event.clientX
  兼容写法：
 areaDiv.onmousemove = function (event) {
  if(!event){
    event = window.event;
  }  // 或者为  event = event || window.event;
}

38.使div跟随鼠标移动,当然要先开启定位
box1.style.left = e.clientX + 'px'
box1.style.top = e.clientY + 'px'
这样的写法，box1只能往下走，鼠标一旦移出box1就不会触发了，所以不能给box1绑定，而是绑定给document。
进一步，若有上下滚动条了，那么鼠标会相对于box1有个 scrollTop的距离。因为clientX是相对于可见窗口的。
所以，鼠标相对于可见窗，box1相对于页面，那么两者之间就有了距离。
这里就要改用pageX和pageY了，但是不支持IE8。
为了兼容，就要把div1的零点移动到可见窗零点。
chrome认为滚动条是body的，可以用body.scrollTop;火狐则认为滚动条是html的，因为body的父元素无法容纳body的高度才有了滚动条。
前者用  document.body.scrollTop
后者用  document.documentElement.scrollTop
var st = document.body.scrollTop || document.documentElement.scrollTop;
box1.style.top = e.clientY + st + 'px'

39.事件的冒泡，后代元素被触发时，其祖先元素也会被触发。
大部分情况下是有益的，比如38中的box1移动，是绑定给了document，若document中还有其他区域块，那么当box1移入区域块后，事件就会冒泡给
document，使得box1在区域块中也能移动。
有些情况是不好的，比如父子元素中都有点击事件，那么在子元素中点击，会导致父元素点击同时触发。
这时，就需要通过事件对象来取消冒泡
s1.onclck = function (e) {
  e = e || window.event;
  e.cancelBubble = true;  //div会停在区域块边缘，点击子元素也不会触发父元素的相同事件了
}

40.事件冒泡的应用：事件的委派
已有三个超链接，且循环绑定了单击响应函数。现在要append几个<li><a></a></li>，那么新加超链接要重新绑定。
所以我们希望只绑定一次事件，即可应用到多个元素，即便元素是后添加的。
事件的委派：将事件统一绑定给元素的共同祖先，这样当后代元素的事件触发时，会一直冒泡到祖先，从而通过祖先元素的响应函数来处理事件。
给祖先绑定的事件不能写死，而要用 event.target.className 来判断所点击的超链接是哪一个，而且判断超链接中的class=""最好用正则，否则会有开头相同的类名被选中。

41.使用  对象.事件 = 函数   的形式，生效的只是绑定在最后的一个。
同时绑定多个，可以用   obj.addEventListener("click",回调函数,false)   // 是否在捕获阶段触发
上述方法在IE8不支持，可以用  obj.attachEvent("onclick",回调函数);  执行顺序相反。

注意：addEventListener()中的this为绑定的对象，而attachEvent()中的this是window。 在兼容IE8时要考虑到这一点。

function bind(obj,eventStr,callback) {
  if(obj.addEventListener){
    obj.addEventListener(eventStr,callback,false)
  }else{
    obj.attachEvent("on"+eventStr,function () {
      // 在匿名函数里调用回调，从浏览器手里收回调用权。这就指定了this为绑定的对象。
      callback.call(obj)
    })
  }
};

42.事件的传播：
微软认为应当由内到外传播；网景公司认为相反。
w3c综合了上述方案，将事件的传播分为三个阶段：
（1）捕获阶段，从最外层祖先元素开始，向目标元素捕获。但是默认不触发事件；
（2）目标阶段，事件捕获到目标元素，捕获结束开始触发目标事件；
（3）冒泡阶段，事件从目标向他的祖先传递，依次触发相同的事件。
若希望在捕获阶段就触发，那就把 addEventListener()的第三个参数改为true。

43.拖拽box1元素：鼠标在box1上按下时开始拖拽onmousedown；移动onmousemove；松开onmouseup。
// 求出div的偏移量  鼠标.clientX - 元素.offsetLeft
box1.onmousedown = function (event) {
  document.onmousemove = function () {
    
  }
  document.onmouseup = function () {
    document.onmousemove = null;
    document.onmouseup = null;
  }
}
如果按了ctrl+A后再拖拽，那么会把整个屏幕都移动。因为浏览器默认去搜索引擎中搜索内容，导致拖拽异常。
若不希望出现这种异常，就取消默认行为，用 return false; 但对IE8要另想办法。
btn01.setCapture();会把下一次所有的鼠标按下相关事件捕获到btn01自身上，哪怕点击的是btn02，或者点击桌面。。。但只抢一次。
所以在IE8用这个办法，就会让点击的元素捕获所有事件，而不会传递到屏幕其他元素身上。再在鼠标松开时释放捕获 box1.releaseCapture();

另一个问题是，chrome不支持 setCapture(),所以要判断执行  box1.setCapture && box1.setCapture();
拖拽图片，要先给它开启绝对定位。

44.鼠标滚轮滚动事件，onmousewheel;  但火狐中是DOMMouseScroll，而且得用 addEventListener()绑定
box1.onmousewheel = function () {
  alert("scroll")
};
bind(box1,"DOMMouseScroll",box1.onmousewheel);  // 即可兼容火狐
除了火狐，其他浏览器支持 event.wheelDelta属性，向上滚是正值，向下是负值。
火狐是 event.detail 属性，但正负相反。
鼠标滚动时，滚动条会跟着滚动，这是浏览器的默认行为，要用 return false; 取消这一默认行为。但是由于兼容火狐的
bind()函数内部使用了 addEventListener()函数，无法用 return false;取消默认行为，所以要用 event.preventDefault();但是
IE8又不支持这个方法，所以要写为  event.preventDefault && event.preventDefault();

45.键盘事件一般绑定给能获取焦点的对象或document
document.onkeydown = function(event) {
  // 如果按着不松开，那么会连续触发；当onkeydown连续触发时，第一次和第二次会有间隔，之后就流畅了，这是防止误输入。
  event = event || window.event;
  // event.keyCode === 17   Ctrl
  // event.altKey && event.keyCode ===89    alt+y是否按下
}
document.onkeyup = function name(params) {
}

input 文本框中，输入是默认行为，所以return false;可以控制输入内容
if(event.keyCode >= 48 && event.keyCode <= 57) {
  return false; // 不允许输入数字
}

// 按方向键移动box1， 
var speed = 10;
if(event.ctrlKey){
  speed = 100;  //  若按下方向键同时按下ctrl，则加速
}
switch(event.keyCode){
  case 37:
    box1.sytle.left = box1.offsetLeft - speed + 'px'; // 连续触发时，第一次和第二次有间隔，万一躲子弹就糟了
    break;
}

46.BOM对象
window：整个浏览器窗口
navigator：浏览器信息
location：浏览器地址栏
history：浏览器历史记录，由于隐私原因只能向前或后退，而不能获取具体的历史记录。而且只在当次访问有效。
screen：显示器信息
由于历史原因，navigator中的大部分属性都已经不能帮助我们识别浏览器了，一般把判断为网景的浏览器 显示好的效果，判断为ie的效果就一般，所以IE11的
navigator.appName也改为网景了。所以现在用usrAgent来判断浏览器。
"Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:81.0) Gecko/20100101 Firefox/81.0"
"Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36"
IE11:"Mozilla/5.0 (Windows NT 6.1; Win64; x64; Trident/7.0; .NET CLR 2.0.50727; SLCC2; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; Tablet PC 2.0; rv:11.0) like Gecko"
IE10:"Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Win64; x64; Trident/7.0; .NET CLR 2.0.50727; SLCC2; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; Tablet PC 2.0)"
 
if(/firefox/i.test(navigator.userAgent)){ // chrome,msie,
  alert("火狐");
};
IE11 已经消除了msie字段，所以无法用userAgent判断，但还可以用IE独有的对象来判断，如 if(window.ActiveXObject)
但是IE11 将这个存在的东西 转为布尔值的false，所以应该用 alert("ActiveXObject" in window)

修改location为路径字符串，则页面会自动跳转且生成历史记录。
location.assigh("https://www.baidu.com");
location.reload();
CTRL+F5 强制清空缓存的刷新， location.reload(true);
location.replace()也是跳转，但是不会生成历史记录，无法后退。

47.window的方法
var  count = document.getElementById("count")
for(let i=0;i<10000;i++){
  count.innerHTML = i;  // 这样只会显示最后一个9999，而不是我们希望的数字跳动
}

// 用window的异步函数来实现数字跳动
// 用timer标识表示定时器异步。 若把这个异步写在按钮的单击响应函数里，那么若多次点击，则会同时跑多个异步。
var num = 1;
clearInterval(timer);   // 必须在按钮的单击响应函数里，先关再开。
var timer = setInterval(() => {
  count.innerHTML = num++;
  if(num ===11){
    clearInterval(timer); //即便timer为null，也不报错，当然什么也不做。
  }
}, 500);

轮播图：  
index = 0;
index++;
index = index % imgArr.length;

48.用异步函数来克服，箭头移动box1时，起步时的卡顿45.。
将移动方向和移动速度拆分开，让方向键只控制方向。
var dir=0; 
document.onkeydown = function (event) {
  event = event || window.event;
  if(event.ctrlKey){
    speed = 500
  }else{
    speed = 10  // 松开ctrl则速度回归正常
  }
  dir = event.keyCode;
}
而setInterval()控制速度，让box1始终踩油门待命，等待dir变为37，38，39，40，解决了启动时的卡顿问题。
松开方向键则将dir=0

49.点击按钮让box1持续移动
var attr = "left";
// speed正负表示左移还是右移,target为终点800，obj为box1。
// 但这样调用必须知道speed正负才行，这样不好，应该用current=parseInt(getStyle(obj,"left"));比较current与target来自动判断speed正负。
function move(obj,attr,target,speed,callback?:any){    // attr:left top width height
  clearInterval(obj.timer);
  if(current > target){
    speed = -speed;
  }
  obj.timer = setInterval(() => {
    // 获取box1的原来的样式left值
    var oldValue = parseInt(getStyle(box1,"left"))
    // 设置新值,每次移动间距为10
    var newValue = oldValue + speed // 10;

    // 当移动到800px时，停止移动,若间距不能被整除，则最后一次会超过800才停，所以要置为800
    if(newValue > 800){
      newValue = 800;
    }
    box1.style.left = newValue + "px"
    if(newValue === 800){
      clearInterval(obj.timer)
      callback && callback(); // 无限扩展
    }
  }, 30);
}

50.轮播图：图片用li摆成一行；然后用div控制视窗大小为图片大小，并overflow:hidden;
list-style:none;  // 祛除项目符号 ul的大痦子
opacity:0.5;  
filter:alpha(opacity=50); // 兼容IE8的透明
allA[i].style.backgroundColor = ""  // 清除内联样式，否则hover会被覆盖掉

51.通过style属性来修改元素样式，没修改一个样式,浏览器就需要重新渲染一次页面，性能较差，而且css和js耦合。
最好一行代码，可以修改多个样式。所以直接修改样式名最好，css新建一个样式b2，然后  box.className = "b2";
如果不是替换样式b1，而是给b1追加b2，那么就是 box.className +=" b2"
function addClass(obj, claName) {
 if(!hasClass(obj,claName)) {
    obj.className += " "+claName
 }
}
function hasClass(obj, claName) {
  let reg = new RegExp("\\b"+claName+"\\b")  //  单词边界，不能是b20，只能是b2
  return reg.test(obj.className)
}
删除一个类，可以 obj.className.replace(reg,"")
然后可以把添加类、删除类合并为  toggleClass()

51.将菜单高度调小，则二级菜单就被隐藏了。展开和隐藏的动画，就是49的 move()函数

52.字符串的好处就是：不论前端后端，不论什么编程语言，都能识别字符串。
JSON就是一个特殊格式的字符串，可以转换为任意语言中的对象。JavaScript Object Notation(js对象表示法)
JSON对象和js对象格式一致，但是JSON字符串中的属性名必须加双引号，允许的值为字符串、数值、布尔值、null、对象（不包括函数）、数组。
JSON数组就是数组加上单引号
let json = '{"name":"bob","age":18}'
let obj = JSON.parse(json);       
json = JSON.stringify(obj);
但是IE7及以下不支持JSON，它们的兼容方法是 eval(); 可以执行一段字符串形式的js代码，并将执行结果返回。
注意：eval() 执行的字符串中若有{}，则会被当成代码块，若不希望若此，则要加上括号
let obj1 = eval("("+json+")");
但是 eval()的性能较差，而且有安全隐患。所以兼容IE7最好引入json2.js文件。

curl -X POST -i 'http://192.168.16.103:8088/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getAllClassificationFieldIndustryCalss' --data '{"cAccUniqueID":"m8p742eb8cb5d3684004bcdf308890550bd5","cOrgUUID":"hs9rd700a59181e648c4b73a1e1b83c69241","cOrgDepUUID":"eqrr6af78074513b4e1c81bc2eb7137b4a2e","ruleType":6}'

