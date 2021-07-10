<template>
  <!-- <h1>{{ msg }}</h1>
  <button @click="count++">count is: {{ count }}</button>
  <p>Edit <code>components/HelloWorld.vue</code> to test hot module replacement.</p> -->
  <p>{{age}}</p>
  <button @click="myFn">666</button>
</template>

<script>
import {ref, reactive, isRef, isReactive} from 'vue'
export default {
  // name: 'HelloWorld',
  // props: {
  //   msg: String
  // },
  // data() {
  //   return {
  //     count: 0
  //   }
  // },

    setup() {
    // ref(18) -> reactive({value: 18})
    // let age = ref(18);
    let age = reactive({value: 18});
    function myFn() {
        console.log(isRef(age), age);
        console.log(isReactive(age));
        age.value = 666;
    }
    return {age, myFn}
  }
}
</script>
