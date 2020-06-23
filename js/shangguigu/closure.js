
// 1.闭包是包含被引用变量（函数）的对象。
// 产生条件：函数嵌套；内部函数引用了外部函数的数据（变量或函数）；调用外部函数时执行了内部函数定义才会产生新的闭包（不需要调用内函）。

// 2.常见的闭包
// （1）将函数作为另一个函数的返回值
// 在外部函数的内部变量处断点调试，因为call stack里是 外部函数+全局，函数提升，所以内部函数定义早已执行（对象已产生），已经产生了闭包。 
function fn1(){
    var a=2
    function fn2(){
        a++
        console.log(a)
    }
    return fn2
}
var f = fn1()   //这句是闭包一直存在的原因，虽然fn2早就成为垃圾对象且消失了，但是全局变量f一直存在
f() //3
f() //4
f = null 

// （2）将函数作为实参传递给另一个函数
function showDelay(msg,time){   //只有msg产生了闭包
    setTimeout(function(){
        alert(msg)
    },time)
}
showDelay('hello',2000)

// 3.闭包的作用
// （1）函数的内部变量在函数执行完成后，仍然存活在内存中（延长了局部变量的生命周期）
// （2）让函数外部可以操作函数内部的数据

// 4.闭包的生命周期
// （1）产生：在嵌套的内部函数定义执行时（不是调用），因为函数提升，所以在被引用的变量声明处就产生了
// （2）死亡：在嵌套的内部函数成为垃圾对象时

// 5.closure的应用
// （1）自定义模块
function myModule(){
    var msg='hello'
    function doSomething(){
        console.log(msg+'some')
    }
    function doOtherthing(){
        console.log(msg+'other')
    }
    return {    //利用对象这种容器，向外暴露方法
        doSomething: doSomething,
        doOtherthing: doOtherthing,
    }
}

(function(){    //myModule2.js
    var msg='hello'
    function doSomething(){
        console.log(msg)
    }
    function doOtherthing(){
        console.log(msg)
    }
    window.myModule2 = {    //添加为window的属性，来匿名函数自调用
        doSomething: doSomething,
        doOtherthing: doOtherthing,
    }
})()    //代码压缩的前提是指明参数名，比如function(window),window会被压缩为w

// (function(window){
//     ...;
// })(window)

// 6.闭包的缺点及解决办法
// （1）缺点：函数执行完后，函数内部的局部变量没有释放，占用内存时间长；容易造成内存泄露。
// （2）解决：能不用闭包就不用；及时释放 f = null 

function bigfn(){
    var arr3 = new Array(100000)
    function fn3(){
        console.log(arr3.length)
    }
    return fn3
}

// 7.内存溢出与泄露
// （1）内存溢出：程序运行需要的内存超过了剩余的内存
// （2）内存泄露：占用的内存没有及时释放；内存泄露积累多了容易导致溢出；
// 常见的泄露：意外的全局变量 局部变量不用var声明，直接赋值；闭包；
// 没及时清理计时器或回调函数 var intervalId=setInterva() 后没有 clearInterval(intervalId)

// 对象的方法是嵌套函数，且返回值为函数的，那就就要var that=this  用that来保存对象的this再调用对象属性，直接this指向的是全局window
