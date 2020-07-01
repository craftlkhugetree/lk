"use strict";
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
console.log("enum:", weapon);
