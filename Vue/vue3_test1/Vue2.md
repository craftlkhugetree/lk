https://www.bilibili.com/video/BV1U5411h7oH

1. 可以用template给vue-html设置snippets
2. Vue其实是基于MVVM设计模式的
被控制的区域: View
Vue实例对象 : View Model
实例对象中的data: Model

3. 指令  v-model只适用于input select textarea
    <p v-once>原始数据: {{ name }}</p>   只接受一次渲染
    如果用户网络比较慢或者网页性能比较差, 那么用户会看到模板内容，所以采用v-cloak：
    <style>
        [v-cloak] { display: none }
    </style>
    <p v-cloak>{{ name }}</p>
4.  插值的方式不会解析html，而v-text方式也不解析html但是能覆盖innerHTML，所以用v-html来解析。
5.  v-if="age >= 18"    v-else-if  中间不能插入内容    v-else
6.  v-show="true"   对于v-if，它是重新创建和删除；所以若是频繁切换某个元素，还是用v-show,它只创建一次，只是display与否。
7.  <li v-for="(value,index) in arr">{{index}}..{{value}}</li>
v-for 可遍历数组、字符串、*数字*和对象。

8. 给元素绑定数据有{{}} v-text v-html；而v-model只能绑定三种元素，所以给元素属性绑定数据用v-bind:value="name"  或者 :value="name"
9. v-bind不能直接给:class="size"赋值，因为它默认会去model里找而不是去<style>中找，所以必须写为 :class="['size']"   也可以多个css类和表达式
:class="['size','color', flag? 'background' : '']"
还可以用对象来绑定css类   :class="{'background':true}"  或者 :class="obj" 而obj可以从服务端动态获取。

10. :style="{color:'red', 'font-size':'100px'}"  带横线的样式名也要用''包裹。  :style="obj"   :style="[obj1,obj2]"
11. v-on:click="myFn" 或者 @click="myFn"
12. v-on常见修饰符，默认情况下只要被触发，回调函数会被执行。
v-on:click.once = "myFn" 只执行一次
prevent阻止默认行为，比如a标签点击后默认跳转，prevent修饰符就可以阻止跳转。event.preventDefault()
stop 阻止事件冒泡， event.stopPropagation()
self 必须是当前事件被触发才执行，冒泡来的不会被触发。
capture 把默认情况下的事件冒泡变为事件捕获

13. v-on后的函数可以不加圆括号，带括号时可以传参数，比如原生的元素对象 $event；不同于v3中的setup(),v2中的methods可以用this.调用data()中数据。
14. v-on:keyup.13="myFn" 或者 @keyup.enter="myFn"  也可以自定义按键修饰符  全局Vue.config.keyCodes.f1 = 112后  @keyup.f1="myFn"
15. 自定义指令  Vue.directive("color",{});     使用v-color
自定义全局指令语法
ue.directive('自定义指令名称', {
    生命周期名称: function (el) {
        指令业务逻辑代码
    }
});
 /*
    directive方法接收两个参数
    第一个参数: 指令的名称
    第二个参数: 对象
    注意点: 在自定义指令的时候, 在指定指令名称的时候, 不需要写v-
    注意点: 指令可以在不同的生命周期阶段执行
    bind: 指令被绑定到元素上的时候执行（还没渲染出来）
    inserted: 绑定指令的元素被添加到父元素上的时候执行（已渲染）
    * */
    Vue.directive("color", {
        // 这里的el就是被绑定指令的那个元素
        bind: function (el) {
            el.style.color = "red";
        }
    });
    Vue.directive("focus", {
        // 这里的el就是被绑定指令的那个元素
        inserted: function (el) {
            el.focus();
        }
    })

16.  局部指令，在Vue构造函数中，
 directives: {
            "color": {
                // 这里的el就是被绑定指令的那个元素
                bind: function (el, obj) {
                    el.style.color = obj.value; 
                    // obj.value就是v-color的属性值
                }
            }
        }

17. 插值中可以有js语句 <p>{{msg.split("").reverse().join("")}}</p> 但是这种代码无提示，且逻辑可能很复杂，所以有了计算属性  <p>{{msg2}}</p>
computed: {
            msg2: function () {
                let res = "abcdef".split("").reverse().join("");
                return res;
            }
        }
注意：虽然是以函数返回值方式，但是使用时不能是{{msg2()}}  因为这是属性。

18. 要用函数方式，那要在methods:{} 里定义函数， {{msg1()}}
1.计算属性和函数
通过计算属性我们能拿到处理后的数据, 但是通过函数我们也能拿到处理后的数据
那么计算属性和函数有什么区别呢?
2.1函数"不会"将计算的结果缓存起来, 每一次访问都会重新求值
2.2计算属性"会"将计算的结果缓存起来, 只要数据没有发生变化, 就不会重新求值

2.计算属性应用场景
计算属性:比较适合用于计算不会频繁发生变化的的数据

19. 格式化文本，使用过滤器，只能在插值语法和v-bind中使用。全局和局部。
Vue.filter(过滤器名,处理数据的函数);    {{name | 过滤器名}}
过滤器可以链式使用