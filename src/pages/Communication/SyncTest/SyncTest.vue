<template>
  <div>
    小明的爸爸现在有{{money}}元
    <h2>不使用sync修改符</h2>
    <!-- 把数据传给子组件，子组件才能使用 -->
    <Child :money="money" @spendMoney="spendMoney"></Child>
    <!-- sync本质也是绑定事件，事件名固定 -->
    <!-- <Child :money="money" @update:money="spendMoney"></Child> -->

    <h2>使用sync修改符</h2>
    <child2 :money.sync="money"></child2>
    <h2>使用v-model修改符</h2>
    <hr />
  </div>
</template>

<script type="text/ecmascript-6">
import Child from "./Child.vue";
import Child2 from "./Child2.vue";
export default {
  name: "SyncTest",
  components: {
    Child,
    Child2,
  },
  data() {
    return {
      money: 10000,
    };
  },
  methods: {
    // sync不写回调也可以
    spendMoney(money) {
      this.money = money;
    },
  },
};
</script>
