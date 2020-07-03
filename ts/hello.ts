// export class Hello {

// }


// var content = "aaa"+"bbbb"+"ccc"
// var str1 = `aaa
// bbb
// ccc`    /*1多行字符串*/

// console.log(`hello ${myname}`)
// console.log(`hello ${getname()}`)   /*撇号的用法，2字符串模板*/

/*3自动拆分字符串*/
// function test (template,name,age){
//     console.log(template)
//     console.log(name)
//     console.log(age)
// }
// var myname = "lk"
// var getAge = function () {
//     return 18
// }
// test `hello my name is ${myname}, I'm ${getAge()}` /*字符串模板调用test方法*/



// var myname:string ='lk' /*4参数带类型*/
// myname =13

// var alias  = 'xixi' /*5类型自动推定*/
// alias = 13

// var bb:any = "xixi"

// function test() : void {

// }

// var myname:string = "lk"
// function test3(a:string,b?:string,c:string="jo"){   /*6可选和默认参数*/
//     console.log(a)
//     console.log(b)
//     console.log(c)
// }
// test3("xxx")


// function func1(...args) {   /*7rest and spread*/
//     args.forEach(function (arg){
//         console.log(arg)
//     })
// }

// func1(1,2,3)
// func1(6,7,8,9,10)

// /*8 generator 函数*/
// function* doSomething(){
//     console.log("start")
//     yield;
//     console.log("finish")
// }

// var func1 = doSomething()
// func1.next();
// func1.next();


/*9 析构表达式就用{}*/
function getStock() {
    return {
        code:"IBM", /*对象内部必须有逗号*/
        price: {
            price1: 200,
            price2: 400
        }
    }
}
var stock = getStock()
var code = stock.code   /*ES5*/
var {code:codex,price:{price2}} = getStock()   /*ES6,code名字必须一致，codex是别名*/

var aa=[1,2,3,4]
var [num1,num2] = aa   /*数组析构*/
var [num1,,,num4] = aa

var [num1,num2,...others] = aa

/*10 箭头表达式,消除了js this关键字的问题*/
var myArray = [1,3,5,6,8]
console.log(myArray.filter(value =>value%2 == 0))

/*11 for...of */
var myA:any[] = [1,2,3,4]
//myA.desc = "four nums"  /*ts里的数组没有“描述”属性，但是js有可以混合*/

for (var n in myA){
    console.log(n)  /*for...in是输出键值对的键名字0 1 2 3 desc*/
}
/*for ...of 才是输出值1，2，3，4，four nums */


/*12 泛型generic 限制参数的内容*/

/*13 接口implentments*/

/*14 模块export import*/

/*15 注解 @ 向框架说明*/



/*16 类型定义文件 index.d.ts*/