<template>
  <div class="spec-preview">
    <!-- 图片 -->
    <img :src="defaultImg.imgUrl" />
    <div class="event" @mousemove="move"></div>
    <div class="big">
      <!-- 放大镜图片 -->
      <img :src="defaultImg.imgUrl" ref="bigImg" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  props: ["imgList"],
  data() {
    return {
      defaultIndex: 0
    };
  },
  mounted() {
    this.$bus.$on("changeDefaultIndex", this.changeDefaultIndex);
  },
  methods: {
    changeDefaultIndex(index) {
      this.defaultIndex = index;
    },
    move(event) {
      let target = event.target;
      // 鼠标相对目标元素的位置
      let mouseX = event.offsetX;
      let mouseY = event.offsetY;
      let mask = this.$refs.mask; // 蒙版
      let bigImg = this.$refs.bigImg; // 大图
      // 蒙版移动的距离
      let maskX = mouseX - mask.offsetWidth / 2;
      let maskY = mouseY - mask.offsetHeight / 2;
      // 设置边界
      if (maskX < 0) {
        maskX = 0;
      } else if (maskX > target.clientWidth - mask.offsetWidth) {
        maskX = target.clientWidth - mask.offsetWidth;
      }
      if (maskY < 0) {
        maskY = 0;
      } else if (maskY > target.clientHeight - mask.offsetHeight) {
        maskY = target.clientHeight - mask.offsetHeight;
      }
      // 设置蒙版距离
      mask.style.left = maskX + "px";
      mask.style.top = maskY + "px";
      // 设置大图距离
      bigImg.style.left = -maskX * 2 + "px";
      bigImg.style.top = -maskY * 2 + "px";
    }
  },
  computed: {
    defaultImg() {
      return this.imgList[this.defaultIndex] || {};
    }
  }
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>