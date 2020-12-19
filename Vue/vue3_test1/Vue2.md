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

1.  格式化文本，使用过滤器，只能在插值语法和v-bind中使用。全局：
Vue.filter(过滤器名,处理数据的函数);    {{name | 过滤器名}}
过滤器可以链式使用
20. 局部过滤器  
filters: {
            "formartStr": function (value) {
                value = value.replace(/学院/g, "大学");
                return value;
            }
        }

21. padStart()属于string的方法，补足不足位的日期等。  padStart(期望长度,要补足的字符);
22. 过滤器后面可以加上圆括号，也就是可以添加参数。 
{{time | dateFormat('yyy-MM-dd')}}

Vue.filter("dateFormat", function (value, fmStr) {
        // console.log(fmStr);
        let date = new Date(value);
        let year = date.getFullYear();
        let month = date.getMonth() + 1 + "";
        let day = date.getDate() + "";
        let hour = date.getHours() + "";
        let minute = date.getMinutes() + "";
        let second = date.getSeconds() + "";
        if(fmStr && fmStr === "yyyy-MM-dd"){
            return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
        }
        return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")} ${hour.padStart(2, "0")}:${minute.padStart(2, "0")}:${second.padStart(2, "0")}`;
    });

23. v-enter  v-enter-active  v-enter-to
        .v-enter{
            opacity: 0;
        }
        .v-enter-to{
            opacity: 1;
        }
        .v-enter-active{
            transition: all 3s;
        }
 24. 一个<transition> 内部只支持一个元素的动画，多个元素就要多个transition，若要一进入就有动画效果，那要添加appear无值属性，同时name属性值不同name="one"，会寻找各自的匹配元素。  one-enter-to   two-enter-to
 25. transition可以用js钩子函数，
      注意点: 虽然我们是通过JS钩子函数来实现过渡动画
            但是默认Vue还是回去查找类名, 所以为了不让Vue去查找类名
            可以给transition添加v-bind:css="false"
    -->
    <transition appear
                v-bind:css="false"
                v-on:before-enter="beforeEnter"
                v-on:enter="enter"
                v-on:after-enter="afterEnter">
        <div class="box" v-show="isShow"></div>
    </transition>
beforEnter(el){
    el.style.opacity = "0";
}; 

enter(el,done){
/*
        注意点: 如果是通过JS钩子来实现过渡动画
                那么必须在动画执行过程中的回调函数中写上
                el.offsetWidth / el.offsetHeight 才能执行动画
        * */
    el.offsetHeight;
    el.style.transition = "all 3s";
    done()  
    // 如果不调用done()那，afterEnter()不会调用。如果要一进入就有动画，那得setTimeout();
    }; 

afterEnter(el){
    el.style.opacity = "1";
};

26. <script src="https://cdnjs.cloudflare.com/ajax/libs/velocity/1.2.3/velocity.min.js"></script>
enter(el, done){
            Velocity(el, {opacity: 1, marginLeft: "500px"}, 3000);
            done();
        },

27. 在Vue中除了可以使用 默认类名(v-xxx)来指定过渡动画
       除了可以使用 自定义类名前缀(yyy-xx)来指定过渡动画(transition name="yyy")
       除了可以使用 JS钩子函数来指定过渡动画以外
还可以使用自定义类名的方式来指定过渡动画

enter-class  // 进入动画开始之前
enter-active-class // 进入动画执行过程中
enter-to-class // 进入动画执行完毕之后
leave-class  // 离开动画开始之前
leave-active-class // 离开动画执行过程中
leave-to-class // 离开动画执行完毕之后
    <transition appear
                enter-class="a"
                enter-active-class="c"
                enter-to-class="b">
        <div class="box" v-show="isShow"></div>
    </transition>


28. <link href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1" rel="stylesheet" type="text/css">
   <transition appear
                enter-class=""
                enter-active-class="animated bounceInRight"
                enter-to-class="">
        <div class="box" v-show="isShow"></div>
    </transition>

29. v-for 就地复用，如果缓存中没有需要渲染的元素，就会创造一个新的放入缓存，若缓存中有需要渲染的元素，就不会创造新的，而是直接复用原有的。vue中只要数据发生改变，就会自动重新渲染，所以界面被清空，缓存中的内容都要重新渲染，直接复用，数组按照顺序来，但是checkbox还是原来的位置，所以混乱。

为了解决这个问题, 我们可以在渲染列表的时候给每一个元素加上一个独一无二的key
v-for在更新已经渲染过的元素列表时, 会先判断key是否相同, 如果相同则复用, 如果不同则重新创建
<li v-for="(person,index) in persons" :key="person.id">
            <input type="checkbox">
            <span>{{index}} --- {{person.name}}</span>
</li>
不能使用index作为key,因为当列表的内容新增或者删除时index都会发生变化。

30. 如果想给多个元素添加过渡动画, 那么就必须通过transition-group来添加
<transition-group appear tag="ul">
        <li v-for="(person,index) in persons" :key="person.id" @click="del(index)">
            <input type="checkbox">
            <span>{{index}} --- {{person.name}}</span>
        </li>
</transition-group>
如果不加tag="ul"，那么会自动用<span>包裹，这与<li>不符。

31. 创建组件构造器
    let Profile = Vue.extend({
        // 注意点: 在创建组件指定组件的模板的时候, 模板只能有一个根元素
        template: `
            <div>
                <img src="images/fm.jpg"/>
                <p>我是描述信息</p>
            </div>
        `
    });
    // 3.2注册已经创建好的组件
    // 第一个参数: 指定注册的组件的名称
    // 第二个参数: 传入已经创建好的组件构造器
    Vue.component("abc", Profile );
    // 3.3使用注册好的组件
    <abc></abc>

32. 可以省略Vue.extend(obj)步骤，直接     Vue.component("abc", obj );
    或者
    <script id="info" type="text/html">
    <div>
        <img src="images/fm.jpg"/>
        <p>我是描述信息</p>
    </div>
    </script>
       Vue.component("abc", {
        // 注意点: 在创建组件指定组件的模板的时候, 模板只能有一个根元素
        template: "#info"
    });
    但vue支持的标签是<template>

33. 自定义局部组件  components:{}
34. 自定义组件也可以使用  data和 methods   只不过自定义组件需要以返回值的方式使用data().因为自定义组件可以复用, 为了保证复用时每个组件的数据都是独立的, 所以必须是一个函数,返回的是自己函数的数据。这就不会混乱，如果像Vue实例一样data:{msg:'123'},那么多个组件就会公用一份数据, 就会导致数据混乱
        如果组件中的data是通过函数返回的, 那么每创建一个新的组件, 都会调用一次这个方法
        将这个方法返回的数据和当前创建的组件绑定在一起, 这样就有效的避免了数据混乱。
35. 组件切换：动态组件。如果用v-if来控制不同组件的显示，那么就不能保存组件的状态，因为v-if是动态创建和删除的，所以有了动态组件。
component可以配合keep-alive来保存被隐藏组件隐藏之前的状态
<component v-bind:is="需要显示组件名称"></component>
 
<keep-alive>
        <component v-bind:is="name"></component>
</keep-alive>

36.  
默认情况下进入动画和离开动画是同时执行的, 如果想一个做完之后再做另一个, 需要指定动画模式
  <transition mode="out-in">
        <component v-bind:is="name"></component>
    </transition>

37. 局部组件就是最简单的父子组件, 因为可以把Vue实例看做是一个大组件
我们在Vue实例中定义了局部组件, 就相当于在大组件里面定义了小组件, 所以局部组件就是最简单的父子组件。自定义组件中可以使用data, 可以使用methods. 当然自定义组件中也可以使用components，
所以我们也可以在自定义组件中再定义其它组件

38.  在Vue中子组件是不能访问父组件的数据的,
如果子组件想要访问父组件的数据, 必须通过父组件传递

2.1在父组件中通过v-bind传递数据
   传递格式 v-bind:自定义接收名称 = "要传递数据"
2.2在子组件中通过props接收数据
   接收格式 props: ["自定义接收名称"] 
   <!--这里将父组件的name通过parentname传递给了子组件-->
        <son :parentname="name" :abc="age"></son>
   // 父组件
    Vue.component("father", {
        template: "#father",
        data: function(){
          return {
              name: "lnj",
              age: 33
          }
        },
        // 子组件
        components: {
            "son": {
                template: "#son",
                // 这里通过parentname和abc接收了父组件传递过来的数据
                props: ["parentname", "abc"]
            }
        }
    });       

39. 在Vue中子组件是不能访问父组件的方法的,
如果子组件想要访问父组件的方法, 必须通过父组件传递

2.1在父组件中通过v-on传递方法
   传递格式 v-on:自定义接收名称 = "要传递方法"
2.2在子组件中自定义一个方法
2.3在自定义方法中通过 this.$emit('自定义接收名称');触发传递过来的方
    <!--这里通过parentsay将父组件的say方法传递给了子组件-->
        <son @parentsay="say"></son>
  // 父组件
    Vue.component("father", {
        template: "#father",
        methods: {
            say(){
                alert("www.it666.com");
            }
        },
        // 子组件
        components: {
            "son": {
                template: "#son",
                /*
                注意点: 和传递数据不同, 如果传递的是方法, 那么在子组件中不需要接收
                        如果传递的是方法, 那么需要在子组件中自定义一个方法
                        如果传递的是方法, 那么在子组件中直接使用自定义的方法即可
                        如果传递的是方法, 那么需要在子组件自定义的方法中通过
                        this.$emit("自定义接收的名称")的方法来触发父组件传递过来的方法
                * */
                // props: ["parentsay"]
                methods: {
                    sonFn(){
                        this.$emit("parentsay");    
                        // 发送parentsay 给父组件，在父作用域内发现子组件v-on对应的是父自己的say()
                    }
                }
            }
        }
    });

40.  父组件传给子组件的方法，可以被子组件用来向父组件传参。   this.$emit("parentsay",'lk');    
41.  1.1注册组件的时候使用了"驼峰命名", 那么在使用时需要转换成"短横线分隔命名"
例如: 注册时: myFather  ->  使用时: my-father
1.2在传递参数的时候如果想使用"驼峰名称", 那么就必须写"短横线分隔命名"
例如: 传递时: parent-name="name" ->  接收时: props: ["parentName"]
1.3在传递方法的时候不能使用"驼峰命名", 只能用"短横线分隔命名"
@parent-say="say"  -> this.$emit("parent-say");

原因：html大小写不敏感，渲染上去的时候会被全部转小写，而事件监听是匹配严格，只能全匹配。

42. 在Vue中如果儿子想使用爷爷的数据, 必须一层一层往下传递
在Vue中如果儿子想使用爷爷的方法, 必须一层一层往下传递

43. 在使用子组件时，动态地给子组件添加内容，但是默认情况，是不能在子组件标签里动态添加内容的，这就要用插槽了。 插槽添加在子组件定义中， <slot></slot>
44. 没有名字的插槽, 会利用使用时指定的内容替换整个插槽
注意点: 如果有多个匿名插槽, 每一个匿名插槽都会被指定的内容替换，多次重复插入。
        虽然写多个匿名插槽不会报错, 但是在企业开发中推荐只能有一个匿名插槽
具名插槽，  <slot name="one">我是默认内容1</slot>
            <slot name="two">我是默认内容2</slot>
<son>
       <div slot="one">我是追加的内容11</div>
        <div slot="two">我是追加的内容2</div>
</son>

45. 指令v-slot,   <template v-slot:one>
                <div>我是追加的内容1</div>
            </template>
注意点: v-slot指令只能用在template标签上
            <!--v-bind: :  v-on: @-->
        可以使用#号替代v-slot:      
        <template #one>
                <div>我是追加的内容1</div>
            </template>

46. 1.什么是作用域插槽
作用域插槽就是带数据的插槽, 就是让父组件在填充子组件插槽内容时也能使用子组件的数据

2.如何使用作用域插槽
2.1在slot中通过 v-bind:数据名称="数据名称" 方式暴露数据
2.2在父组件中通过 <template slot-scope="作用域名称"> 接收数据
2.3在父组件的<template></template>中通过 作用域名称.数据名称 方式使用数据

     作用域插槽的应用场景: 子组件提供数据, 父组件决定如何渲染
    <template slot-scope="abc">
                <li v-for="(name, index) in abc.names">{{name}}</li>
            </template>
            也可以： default表示匿名插槽。
          <template v-slot:default="abc">
                <li v-for="(name, index) in abc.names">{{name}}</li>
            </template>

47. 单向绑定v-bind:value=""   双向绑定 v-model=""
48.      如何实现儿子中的数据和父亲中的数据同步
                        1.父亲给儿子传递一个方法
                        2.在儿子中修改数据
                        3.儿子中修改完数据, 调用父亲传递过来的方法, 并且将修改之后的数据传递给父亲的方法
                        4.在父亲的方法中保存最新的数据
         注意点:
        虽然通过借助父组件能够实现兄弟组件之间的数据传递, 但是这种方式非常的复杂, 非常的不推荐
        那么当前在企业开发中我们遇到了两个问题:
        1.如果想要在子组件中使用祖先组件中的数据, 那么就必须一层一层的传递(非常麻烦)
        2.兄弟组件之间不能直接传递数据, 如果兄弟组件之间想要传递数据, 那么就必须借助父组件(非常麻烦)
        解决方案: 使用Vuex
49. vuex 是 Vue 配套的 公共数据管理工具，我们可以将共享的数据保存到 vuex 中，
方便整个程序中的任何组件都可以获取和修改vuex中保存的公共数据。

50. 注意点:
// 1.必须在引入Vue之后再引入Vuex，<script>顺序不能乱
只有需要共享的才放到vuex上, 不需要共享的数据依然放到组件自身的data上
// 2.创建Vuex对象
    const store = new Vuex.Store({
        // 这里的state就相当于组件中的data, 就是专门用于保存共享数据的
        state: {
            msg: "知播渔"
        },
    });
// 3.在祖先组件中添加store的key保存Vuex对象
     // 只要祖先组件中保存了Vuex对象 , 那么祖先组件和所有的后代组件就可以使用Vuex中保存的共享数据了
        store: store,
// 4.使用方法： <p>{{this.$store.state.msg}}</p>

51. // 注意点: 在Vuex中不推荐直接修改共享数据
    // 如果多个组件都修改了共享的数据, 那么后期数据发生了错误, 我们如果需要去调试错误
    // 就需要把每一个修改了共享数据的组件都检查一遍, 这样非常低效, 非常的不利于我们去维护
const store = new Vuex.Store({
        // state: 用于保存共享数据
        state: {
            count: 0
        },
        // mutations: 用于保存修改共享数据的方法
        mutations: {
            // 注意点: 在执行mutations中定义的方法的时候, 系统会自动给这些方法传递一个state参数
            //         state中就保存了共享的数据
            mAdd(state){
                state.count = state.count + 1;
            },
            mSub(state){
                state.count = state.count - 1;
            }
        }
    });
在子组件中调用： this.$store.commit("mAdd");

52. <input v-model="sth" />
//  等同于
<input :value="sth" @input="sth = $event.target.value" /> 

53. vuex的getters属性与 计算属性相同，一次计算长久缓存。同样在声明format()方法中return 返回值。 
{{this.$store.getters.formart}} 一次调用方法，可以多次使用该返回值。   组件中用computed属性。
54. Vue Router和v-if/v-show一样, 是用来切换组件的显示的
v-if/v-show是标记来切换(true/false)
Vue Router用哈希来切换(#/xxx)
比v-if/v-show强大的是Vue Router不仅仅能够切换组件的显示, 还能够在切换的时候传递参数

55.    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>

56.     如果是通过router-link来设置URL的HASH值, 那么不用写#, 通过to属性来设置HASH值
    <a href="#/one">切换到第一个界面</a>
    默认情况下Vue在渲染router-link的时候, 是通过a标签来渲染的
    如果在企业开发中不想使用a标签来渲染, 那么可以通过tag属性来告诉vue通过什么标签来渲染
        <router-link to="/one" tag="button">切换到第一个界面</router-link>

57.     // 3.根据自定义的切换规则创建路由对象
    const router = new VueRouter({
        routes: routes,
        // 指定导航激活状态样式类名
        linkActiveClass: "nj-active"
    });

58. 只要将Vue Router挂载到了Vue实例对象上, 我们就可以通过vue.$route拿到路由对象
只要能拿到路由对象, 就可以通过路由对象拿到传递的参数

方式一: 通过URL参数参数(?key=value&key=value), 通过this.$route.query获取
方式二: 通过占位符:key传递(路由规则中/:key/:key, 路径中/value/value), 通过this.$route.params获取
 // 1.定义组件
    const one = {
        template: "#one",
        created: function () {  // 声明周期函数
            console.log(this.$route);
            console.log(this.$route.query.name);
            console.log(this.$route.query.age);
        }
    };

59. 嵌套路由（子路由）  // 2.定义切换的规则(定义路由规则)
    const routes = [
        // 数组中的每一个对象就是一条规则
        {
            path: '/one',
            component: one,
            children:[
                {
                    // 注意点: 如果是嵌套路由(子路由), 那么不用写一级路径的地址, 并且也不用写/
                    path: "onesub1",
                    component: onesub1
                },
                {
                    // 注意点: 如果是嵌套路由(子路由), 那么不用写一级路径的地址, 并且也不用写/
                    path: "onesub2",
                    component: onesub2
                }
            ]
        },
        // { path: '/one/onesub1', component: onesub1 },
        // { path: '/one/onesub2', component: onesub2 },
        { path: '/two', component: two }
    ];

60. 命名视图，    <!--和匿名插槽一样, 如果指定了多个router-view, 那么当路由地址被匹配之后, 多个router-view中显示的内容是一样的-->
    <router-view></router-view>
    <router-view></router-view>
    const routes = [
        // 数组中的每一个对象就是一条规则
        {
            path: '/',
            components: {
                name1: one,
                name2: two
            }
        },
    ];
      <router-view name="name1"></router-view>
    <router-view name="name2"></router-view>
    命名视图和前面讲解的具名插槽很像, 都是让不同的出口显示不同的内容
命名视图就是当路由地址被匹配的时候同时指定多个出口, 并且每个出口中显示的内容不同

61. watch属性，  let vue = new Vue({
         watch: {
            // 可以通过watch监听Model中数据的变化, 只要数据发生变化, 就会自动调用对应的回调函数
          num1: function (newValue, oldValue) {
              // console.log(this.num1);
              // console.log(newValue, oldValue);  两个参数可以不写，这是默认存在的。
              this.res = parseInt(this.num1) + parseInt(this.num2)
          },
          num2: function (newValue, oldValue) {
              this.res = parseInt(this.num1) + parseInt(this.num2)
          },
            // 可以通过watch监听路由地址的变化, 只要路由地址发生变化, 就会自动调用对应的回调函数
          "$route.path": function (newValue, oldValue) {
              console.log(newValue, oldValue);
          }
        },})

62. 生命周期钩子 = 生命周期函数 = 生命周期事件
2.Vue生命周期方法分类
2.1创建期间的生命周期方法
    beforeCreate:
    created:
    beforeMount:
    mounted:
2.2运行期间的生命周期方法
    beforeUpdate:
    updated:
2.3销毁期间的生命周期方法
    beforeDestroy:
    destroyed：

**创建阶段**
在调用beforeCreate的时候, 仅仅表示Vue实例刚刚被创建出来,此时此刻还没有初始化好Vue实例中的数据和方法, 所以此时此刻还不能访问Vue实例中保存的数据和方法。
在调用created的时候, 是我们最早能够访问Vue实例中保存的数据和方法的地方

beforeMount:function(){
            /*
在调用beforeMount的时候, 表示Vue已经编译好了最终模板, 但是还没有将最终的模板渲染到界面上
            * */
            // console.log(document.querySelector("p").innerHTML);
            // console.log(document.querySelector("p").innerText);
        },
在调用mounted的时候, 表示Vue已经完成了模板的渲染, 表示我们已经可以拿到界面上渲染之后的内容了

**运行阶段**
在调用beforeUpdate的时候, 表示Vue实例中保存的数据被修改了
            注意点: 只有保存的数据被修改了才会调用beforeUpdate, 否则不会调用
            注意点: 在调用beforeUpdate的时候, 数据已经更新了, 但是界面还没有更新。
在调用updated的时候, 表示Vue实例中保存的数据被修改了, 并且界面也同步修改数据了
            也就是说: 数据和界面都同步更新之后就会调用updated。
        
**销毁阶段**
       在调用beforeDestroy的时候, 表示当前组件即将被销毁了
            注意点: 只要组件不被销毁, 那么beforeDestroy就不会调用
                    beforeDestroy函数是我们最后能够访问到组件数据和方法的函数。
   在调用destroyed的时候, 表示当前组件已经被销毁了
            注意点: 只要组件不被销毁, 那么destroyed就不会调用
                    不要在这个生命周期方法中再去操作组件中数据和方法。

63. vue特殊特性：ref
// 注意点: 如果是通过原生的语法来获取元素, 无论是原生的元素还是自定义的组件, 拿到的都是原生的元素
                // 注意点: 并且VUE官方并不推荐我们这样获取
    <p ref="myppp">我是原生的DOM</p>
console.log(this.$refs.myppp);
     // 在Vue中如果想获取原生的元素或者获取自定义的组件, 可以通过ref来获取
                // 注意点: ref如果是添加给原生的元素, 那么拿到的就是原生的元素
                //         ref如果是添加给自定义的组件, 那么拿到的就是自定义的组件

64. public文件夹: 任何放置在 public 文件夹的静态资源都会被简单的复制，
              而不经过 webpack。你需要通过绝对路径来引用它们
              一般用于存储一些永远不会改变的静态资源或者webpack不支持的第三方库。
src文件夹: 代码文件夹
 |----assets文件夹: 存储项目中自己的一些静态文件(图片/字体等)
 |----components文件夹: 存储项目中的自定义组件(小组件,公共组件)
 |----views文件夹: 存储项目中的自定义组件(大组件,页面级组件,路由级别组件)
 |----router文件夹: 存储VueRouter相关文件
 |----store文件夹: 存储Vuex相关文件
 |----App.vue:根组件
 |----main.js:入口js文件