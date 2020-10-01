<template>
  <div>
    <h2>深入v-model</h2>
    <!-- v-model在html中的写法 -->
    <input type="text" v-model="msg">
    <span>{{msg}}</span>
    <br>
    <!-- v-model的原理 -->
    <input type="text" :value="mmsg" @input="mmsg=$event.target.value">
    <span>{{mmsg}}</span>
    <br>
    <!-- 在组件对象 -->
    <!-- <CustomInput :value='msg' @input="msg=$event"></CustomInput> -->
    <CustomInput v-model="mmsg"></CustomInput>
  </div>
</template>

<script type="text/ecmascript-6">
  import CustomInput from './CustomInput.vue'
  export default {
    name: 'ModelTest',
    components: {
      CustomInput
    },
    data(){
      return{
        msg:'qwer',
        mmsg:'123456'
      }
    }
  }
</script>
