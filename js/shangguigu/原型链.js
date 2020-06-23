// 观看原型链的总结：
// 1.__proto__：不管是函数还是实例对象都有__proto__这个属性， 所有函数的__proto__都指向一个地方：Function的原型 ƒ () { 【native code】 }
// 2.constructor：a. 除了Function的所有函数的constructor值和__proto一样都指向：Function的原型
// b.Function函数的constructor指向的是它自己本身，
// c.Function的原型对象的constructor指向Function函数
// 3.prototype：只有函数才有的属性，而实例对象没有（没有function的），原型对象都没有这个属性
// 4.Object原型对象（Object）：既不是Object也不是Function，负责存储特定的方法
// 5.Function原型对象（ƒ () { 【native code】 }）：负责函数的创建，
// 所以所有的函数的__proto__r都指向这里，
// 除了Function函数的所有函数的constructo都指向这里，
// 因为Function可以自己创建自己：new Function()
// 6.Function：最特殊的是，__proto__和prototype相等，都指向Function原型对象