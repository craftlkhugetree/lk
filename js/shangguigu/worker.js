function fibonaccii(n){  //递归的效率低，n稍微大一些浏览器就卡住，无法操作。
    return n<=2 ? 1 : fibonaccii(n-1)+fibonaccii(n-2)
}
var onmessage = function(event){
    var number = event.data
    console.log('分线程接收到主线程发送的数据'+number)
    //计算
    var result = fibonaccii(number)
    postMessage(result)
    console.log('分线程向主线程返回数据'+result)
}
console.log(this)   //不是window，分线程的全局对象不是window
//DedicatedWorkerGlobalScope {name: "", onmessage: ƒ, onmessageerror: null, postMessage: ƒ, close: ƒ, …}
//alert(8)    //alert is not defined   所以说分线程无法更新界面，根本看不到window
console.log(8)  //console是浏览器的方法，没问题

//console.log(zzz)