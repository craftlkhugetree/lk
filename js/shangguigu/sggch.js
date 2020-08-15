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

12.Math是工具类，不是构造函数，不用创建对象