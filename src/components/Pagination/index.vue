<template>
  <div class="pagination">
    <!-- 当前页=1，‘上一页’不能点击 -->
    <button :disabled="currentPageNum === 1" @click="$emit('changePage',currentPageNum - 1)">上一页</button>
    <!-- start等于1  -->
    <button v-show="startEnd.start > 1" @click="$emit('changePage', 1)">1</button>
    <!-- start等于2  -->
    <button v-show="startEnd.start > 2">···</button>

    <button
      v-for="page in startEnd.end"
      :key="page"
      v-if="page >= startEnd.start"
      :class="{active:page === currentPageNum}"
      @click="$emit('changePage',page)"
    >{{page}}</button>

    <button v-show="startEnd.end < totalPage - 1">···</button>
    <button
      v-show="startEnd.end < totalPage"
      :class="{active:currentPageNum === totalPage}" @click="$emit('changePage',totalPage)"
    >{{totalPage}}</button>
    <button :disabled="currentPageNum === totalPage" @click="$emit('changePage',currentPageNum + 1)">下一页</button>

    <button style="margin-left: 30px">共 {{totalPage}} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  // 从父组件接收的数据
  props: {
    // 当前页码
    currentPageNum: {
      type: Number
    },
    // 每页数量
    pageSize: {
      type: Number
    },
    // 总数
    total: {
      type: Number
    },
    // 连续页码
    continueNum: {
      type: Number
    }
  },
  // 自己计算的数据
  computed: {
    // 总页数
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    // 连续页数的起始和结束
    startEnd() {
      // 根据当前页码不同，显示的连续页码就不同
      let { currentPageNum, totalPage, continueNum } = this;
      let start; //定义开始
      let end; //定义结束
      let disNum; //定义差

      //一：总页码 < 连续页码
      if (totalPage <= continueNum) {
        // 开始为1 结束为总数
        start = 1;
        end = totalPage;
        // console.log(start)
        // 总页码 > 连续页码
      } else {
        // 开始 = 当前 - 连续页码/2
        start = currentPageNum - Math.floor(continueNum / 2);
        // 结束 = 当前 + 连续页码/2
        end = currentPageNum + Math.floor(continueNum / 2);

        // 判断左边界
        if (start <= 1) {
          disNum = 1 - start;
          start += disNum;
          end += disNum;
        }
        //右边界
        if (end >= totalPage) {
          disNum = end - totalPage;
          start -= disNum;
          end -= disNum;
        }

        return { start, end };
      }
    }
  }
};
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
