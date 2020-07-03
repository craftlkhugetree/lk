//1.array
let a1:number[] = [1,2]
let b1:Array<number> = [1,333]    //泛型

//2.tuple
let tup2: [string,number,boolean] = ['hello',3,false]

//3.枚举
enum GunType {
    m3 = 1,
    ak3 = 2,    //枚举项一般用英文和数字，枚举值一般为整数，如无枚举值则默认为0，1，2。。。
}
let weapon:GunType = GunType.m3
console.log("enum3:",weapon)

//4.类型any,void；
//类型never表示不存在的值，常作为抛出异常或无限循环的函数返回类型。是ts的底部类型，所有类型都是never类型的父类，所以never类型值可以赋给任意类型的变量。
//let x4:never = test4()
//let y4:string = test4()

//5.类型推断
let a5 = 18
//a5 = 'abc'  出错
a5 = 20

//6.联合类型,列出可能的类型
let a6: string | number;
let dName6: string | null = prompt('please input:')
console.log('hello6'+dName6)

//7.ts中的形参和实参，数量、类型都要一致。可选参数?:类型。 默认参数:类型=默认值
//function(undefined,实参2)

//8.剩余参数就是一个数组        (形参1,形参2,...形参3[])
//剩余参数只有一个，只能定义为数组，只能定义在形参列表最后

//9.类：将js中的constructor和prototype合并在一起
//成员变量定义在类中，构造函数做初始化，成员方法定义在类中。
class City9 {
    cName:string
    clevel:number
    constructor(name:string,level:number){
        this.cName = name
        this.clevel = level
    }
    about(){
        console.log(`welcome9 ${this.cName} this is level ${this.clevel}` )
    }
}

let c9 = new City9('beijing',2)
c9.about()