<template>
  <div class="swiper-container" id="mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item,index) in bannerList" :key="item.id">
        <img :src="item.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
export default {
  name: "SliderLoop",
  props: ["bannerList"],
  watch: {
    bannerList: {
      handler() {
        this.$nextTick(() => {
          new Swiper('.swiper-container', {
            loop: true, // 循环
            pagination: {
              el: ".swiper-pagination"
            },
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev"
            }
          });
        });
      },
      immediate: true 
    }
  }
};
</script>

<style lang="less" scoped>
</style>
