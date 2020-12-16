https://www.bilibili.com/video/BV14k4y117LL?p=2

1. diff优化：vue2.x数据更新后生成一个新的虚拟dom树，用diff算法与原虚拟dom树全量比较，这样一些写死的元素内容也要比较，浪费时间。vue3 会根据dom的内容会不会变化，添加静态标记patchflag（枚举类），新diff算法只比较有标记的元素。
https://vue-next-template-explorer.netlify.app/

2. hoistStatic静态提升：vue2中不论元素是否参与更新，每次都会重新创建,再渲染。而vue3中对于不参与更新的元素，会做静态提升,只创建一次，渲染时直接复用。
3. cacheHandlers事件侦听器缓存：onClick默认会被视为动态绑定，所以每次都追踪其变化，但是因为是同一个函数，所以不追踪变化（去掉了静态标记），直接缓存起来复用。
4. ssr渲染：

5. 创建Vue3的三种方式：Vue-CLI  WebPack  Vite。 Vite是利用ES6的import会发送请求去加载文件的特性，拦截这些请求，做一些预编译，省去webPack冗长的打包时间。
npm install -g create-vite-app
create-vite-app projectName && cd projectName
npm install
npm run dev

6. 返回数据是data() {return {}}   或者  data: function() {return {}}
7. 事件侦听绑定函数 methods:{ myFn() {}}
8. 表单是有默认行为的，所以要先 e.preventDefault();     
9. Vue2的数据要在data，函数要在methods，*所以数据和业务逻辑分散*；而Vue3中setup()是组合API的入口函数，且要在setup()中返回对象才能自动更新UI。  
import {ref} from 'vue';  
setup(){ 
    let count = ref(0); function myFn(){}; return{count, myFn}
    }
可见在组合API中，不用在data中定义数据，也不用在methods中定义函数。这就有利于同一函数在多个地方遭到修改。

10. ref()只能监听简单类型的变化，不能监听复杂类型（对象、数组），要用reactive()
11. 而setup()中的数据和函数都可以提取到外部，而只在setup()中调用该提取函数即可 let {state, removeFun} = useRemoveStudent();
这就是按需导入和组件化。vue2要在data和methods分别放入数据和业务逻辑，而vue3将相关的数据和业务逻辑放在一个函数，提取出的函数可以放入其他文件，只要export default该函数即可。

12. Composition API(new) 与 Option API(old) 混合使用。组合/注入API本质是把数据注入到Option API中。setup()执行时间：
beforeCreate：组件刚刚被创建，组件的data和methods还没初始化好
setup
Created:组件刚刚被创建，组件的data和methods已经初始化好
所以在setup()中不能使用data和methods，所以this被强制修改为undefined，且setup()只能是同步，不能是async异步。
最早能拿到元素的生命周期是 mounted

13. 响应式数据，v2是通过defineProperty来实现，v3是通过ES6的Proxy来实现。reactive()参数必须是对象json/arr，本质是把传入的数据包装成一个proxy对象。如果传入的不是自定义对象或arr，比如new Date()，那么就会无法更新页面，这时只能重新赋值。。。所以对于简单数据，v3提供了ref(),但是ref()本质还是reactive(),即  ref(18) ===> reactive({value:18})   所以更新页面数据是 age.value = 666;  而<template>中的{{age}}是自动加上了.value;而reactive()中则不会自动加上.value
14. isRef() isReactive()方法用来判断，同时ref类型对象有私有属性__v_isRef
15. 递归监听，若数据量大则消耗性能，比如多层对象，那就是每一层都要包装成proxy。所以v3提供了非递归监听，只监听对象的第一层 import {shallowReactive} from 'vue'; 但shallowRef则是监听整体的.value的变化，因为shallowReacive().value才是第一层。V3只提供了triggerRef(objRef);可以通过更改objRef.value...来单独更改某一层。

16. 由于proxy包装，所以如何获取reactive()和ref()的原始数据呢，使用toRaw(响应式数据)，所以当不想修改UI的操作时，不需要消耗性能时，可以用toRaw()来复制一份完全相同的数据，修改而不影响UI。
所以toRaw()的作用就是做一些不想被监听的事情(提升性能)。
17. 响应式数据  RefImpl;  markRaw()永远无法被追踪被更新。 将数据标记为永远不能追踪的数据,一般在编写自己的第三方库时使用。

18. toRef(obj,'name');将obj.name变为响应式数据,如果用ref(obj.name)那么原始数据不会改变。而toRef()则是无法更新UI。  ref->复制，UI自动更新；toRef->引用，但UI不自动更新
19. toRefs(obj);针对obj有多个属性要变为响应式。obj.name.value='zs';obj.age.value='16';
20. customRef返回一个ref对象,可以显式地控制依赖追踪和触发响应
21. 
 