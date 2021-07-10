<template>
  <modal-button></modal-button>
  <Grandpa />
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Grandpa from './components/provide_inject/Grandpa.vue'
import ModalButton from './components/ModalButton.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    Grandpa,
    ModalButton,
  }
  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
