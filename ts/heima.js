//1.array
var a1 = [1, 2];
var b1 = [1, 333]; //泛型
//2.tuple
var tup2 = ['hello', 3, false];
//3.枚举
var GunType;
(function (GunType) {
    GunType[GunType["m3"] = 1] = "m3";
    GunType[GunType["ak3"] = 2] = "ak3";
})(GunType || (GunType = {}));
var weapon = GunType.m3;
console.log("enum3:", weapon);
//4.类型any,void；
//类型never表示不存在的值，常作为抛出异常或无限循环的函数返回类型。是ts的底部类型，所有类型都是never类型的父类，所以never类型值可以赋给任意类型的变量。
//let x4:never = test4()
//let y4:string = test4()
//5.类型推断
var a5 = 18;
//a5 = 'abc'  出错
a5 = 20;
//6.联合类型,列出可能的类型
var a6;
var dName6 = prompt('please input:');
console.log('hello6' + dName6);
//7.ts中的形参和实参，数量、类型都要一致。可选参数?:类型。 默认参数:类型=默认值
//function(undefined,实参2)
//8.剩余参数就是一个数组        (形参1,形参2,...形参3[])
//剩余参数只有一个，只能定义为数组，只能定义在形参列表最后
//9.类：将js中的constructor和prototype合并在一起
//成员变量定义在类中，构造函数做初始化，成员方法定义在类中。
var City9 = /** @class */ (function () {
    function City9(name, level) {
        this.cName = name;
        this.clevel = level;
    }
    City9.prototype.about = function () {
        console.log("welcome9 " + this.cName + " this is level " + this.clevel);
    };
    return City9;
}());
var c9 = new City9('beijing', 2);
c9.about();
