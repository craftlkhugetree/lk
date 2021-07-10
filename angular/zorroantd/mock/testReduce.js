// let arr = [1.333, 2.556, 1.1, 3.4];
// let sum = 0;    // 8.389000000000001
// // let sum = 10;   // 18.389

// for(let i=0, ilen=arr.length; i<ilen; i++) {
//     sum += arr[i]
// }
// console.log(sum)


// const deepClone = [
//     {
//         x: [1,2,3,{z:2}],
//         y: {z:1}
//     }
// ];

// let t = JSON.stringify(deepClone)
// // t.y = 92;
// console.log(deepClone, t, typeof t)

// t = JSON.parse(t);
// t.y = 91;
// console.log(deepClone, t, typeof t);

let path = require('path');
let dir = path.resolve() 
dir = path.join('foo', 'baz', 'bar')
console.log(dir)