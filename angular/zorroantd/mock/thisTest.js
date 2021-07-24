// 先给window加一个id，以便于确认之后this的指向
// window.id = 0;
id = 0;
// 声明一个函数fn
const fn = {
  id: 1,
  say: function () {
    console.log('id:', this.id);
  },
  // fn.say();
  /*
    结果: 1
    原因: 通过fn调用的say, say是 函数声明, this指向fn，输出的是fn.id
  */

  // setTimeout(fn.say, 1000);
  /*
    结果: 0
    原因: 通过setTimeout调用, setTimeout改写所传函数的this, 也就是this指向window，输出的是window.id
  */

  // setTimeout(() => fn.say(), 1000);
  /*
    结果: 1
    原因: 通过setTimeout调用, 但是fn.say()是被箭头函数包裹，所以fn.say()调用不受this改变的影响，原因参考第一句输出
    ps: 等同于 setTimeout(function () { fn.say(); } , 1000);
  */

  sayArrow: () => {
    // console.log('id:', this.id, 'id' in window);
  },
  // fn.sayArrow();
  /*
    结果: 0
    原因: 通过fn调用的say, say是 箭头函数声明, this指向箭头函数声明时作用域的this，也就是this指向window，输出的是window.id
  */

  // setTimeout(fn.sayArrow, 1000);
  /*
    结果: 0
    原因: 通过setTimeout调用, setTimeout改写所传函数的this, 也就是this指向window，输出的是window.id
  */

  // setTimeout(() => fn.sayArrow(), 1000);
  /*
    结果: 0
    原因: 同上雷同，具体原因可参考第二句输出
    ps: 等同于 setTimeout(function () { fn.sayArrow(); } , 1000);
  */
  say1: function () {
    setTimeout(function () {
      console.log('id:', this.id);
    }, 1000);
  },
  // fn.say1();
  /*
    结果: 0
    原因: setTimeout改写函数内部的this, 使其指向window, 输出window.id
  */
  say2: function () {
    let that = this;
    setTimeout(function () {
      console.log('id:', that.id);
    }, 1000);
  },
  // fn.say2(); // 1
  /*
    结果: 1
    原因: setTimeout虽然改写函数内部的this,但是输出的是that.id，这个that在setTimout外面声明，指向的是fn，所以输出fn.id
  */
  say3: function () {
    setTimeout(() => {
      console.log('id:', this.id);
    }, 1000);
  },
  // fn.say3(); // 1
  /*
    结果: 1
    原因: fn.say3函数其内部的this指向的fn，而setTimeout内部传了一个箭头函数，箭头函数内部中的this就指向了fn.say3内的this，也就是fn，最后输出fn.id
  */
  say4: () => {
    setTimeout(() => {
      console.log('id:', this.id);
    }, 1000);
  },
  // fn.say4(); // 0
  /*
    结果: 0
    原因: fn.say4这个函数本身就是使用箭头函数声明，其内部的this指向的是箭头函数声明时所在的作用域，即window，而且setTimeout也是传了一个箭头函数，这里面的this指向外层箭头函数内部中的this，传引用也指向了window，最后输出window.id
  */
  say5: () => {
    setTimeout(function () {
      console.log('id:', this.id);
    }, 1000);
  },
  // fn.say5(); // 0
  /*
    结果: 0
    原因: fn.say5用箭头函数声明，其内部的this指向window，而且setTimeout也会改写内部this指向window，最后输出window.id
  */
};

fn.say();
fn.sayArrow();
setTimeout(fn.say, 1000);
setTimeout(fn.sayArrow, 1000);
setTimeout(() => fn.say(), 1000);
setTimeout(() => fn.sayArrow(), 1000);
fn.say1();
fn.say2();
fn.say3();
fn.say4();
fn.say5();


function executor(resolve, reject) {
  let rand = Math.random();
  console.log(1)
  console.log(rand)
  if (rand > 0.5)
    resolve()
  else
    reject()
}
var p0 = new Promise(executor);
var p1 = p0.then((value) => {
  console.log("succeed-1")
  return new Promise(executor)
})
var p3 = p1.then((value) => {
  console.log("succeed-2")
  return new Promise(executor)
})
var p4 = p3.then((value) => {
  console.log("succeed-3")
  return new Promise(executor)
})
p4.catch((error) => {
  console.log("error")
})
console.log(2)


function* genDemo() {
  console.log("开始执行第一段")
  yield 'generator 1'
  console.log("开始执行第二段")
  yield 'generator 2'
  console.log("开始执行第三段")
  yield 'generator 3'
  console.log("执行结束")
  return 'generator End'
}
console.log('main 0')
let gen = genDemo()
console.log(gen.next().value)
console.log('main 1')
console.log(gen.next().value)
console.log('main 2')
console.log(gen.next().value)
console.log('main 3')
console.log(gen.next().value)
console.log('main 4')


async function foo() {
  console.log(1)
  let a = await 100
  console.log(a)
  console.log(2)
}
console.log(0)
foo()
console.log(3)


// sync function foo() {console.log('foo')}async function bar() {console.log('bar start')await foo()console.log('bar end')}console.log('script start')setTimeout(function () {console.log('setTimeout')}, 0)bar();new Promise(function (resolve) {console.log('promise executor')resolve();}).then(function () {console.log('promise then')})console.log('script end')
async function foo() {
  console.log('foo')
}
async function bar() {
  console.log('bar start')
  await foo()
  console.log('bar end')
}
console.log('script start')
setTimeout(function () {
  console.log('setTimeout')
}, 0)
bar();
new Promise(function (resolve) {
  console.log('promise executor')
  resolve();
}).then(function () {
  console.log('promise then')
})
console.log('script end')



 