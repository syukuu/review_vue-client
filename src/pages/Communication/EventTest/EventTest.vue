<template>
  <div>
    <h1>EventTest组件</h1>
    <!-- html标签里是原生事件 -->
    <button @click="test1">111</button>
    <!-- 
      组件标签里是自定义事件 
      .native变成原生事件
    -->
    <Event1 @click.native="test2"></Event1>
    <Event2 @aa="test3" @click="test2"></Event2>
  </div>
</template>

<script type="text/ecmascript-6">
  import Event1 from './Event1.vue'
  import Event2 from './Event2.vue'

  export default {
    name: 'EventTest',

    components: {
      Event1,
      Event2,
    },

    methods: {
     test1(){
       console.log(111);
     },
     test2(){
       console.log(222);
     },
     test3(text){
       console.log(text);
     }
    }
  }
</script>
