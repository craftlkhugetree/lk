// 1.闭包是包含被引用变量（函数）的对象。
// 产生条件：函数嵌套；内部函数引用了外部函数的数据（变量或函数）；调用外部函数时执行了内部函数定义就会产生闭包（不需要调用）。

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
var f = fn1()
f() //3
f() //4

// （2）将函数作为实参传递给另一个函数
function showDelay(msg,time){
    setTimeout(function(){
        alert(msg)
    },time)
}
showDelay('hello',2000)