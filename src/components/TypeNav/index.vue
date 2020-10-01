<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="moveOut" @mouseenter="isShow=true">
        <h2 class="all">全部商品分类</h2>
        <transition name="show">
          <div class="sort" v-show="isShow">
            <!-- 三：事件委派 -->
            <div class="all-sort-list2" @click="toSearch">
              <div
                class="item bo"
                v-for="(c1,index) in categoryList"
                :key="c1.categoryId"
                @mouseenter="moveIn(index)"
                :class="{item_on: currentIndex ===index}"
              >
                <h3>
                  <!-- 三：事件委派
                         点击的是谁、携带参数
                  -->
                  <a
                    href="javascript:;"
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                  >{{c1.categoryName}}</a>
                  <!-- 点击跳转到search页 -->
                  <!-- 一：声明式导航 
                        <router-link>其实是组件对象，循环创建所有组件对象会造成浏览器卡顿
                        因此使用编程式导航
                        <router-link
                            :to="{name:'search',query:{categoryName:c1.categoryName,category1Id:c1.categoryId}}"
                            >{{c1.categoryName}}
                        </router-link>
                  -->
                  <!-- 二：编程式导航 
                         给每个事件添加回调，开辟多个回调函数的空间
                         因为1 2 3 级列表触发的回调是相同的
                         因此用到事件委派，加给父级
                <a
                  href="javascript:;"
                  @click="$router.push({name:'search',query:{categoryName:c1.categoryName,category1Id:c1.categoryId}})"
                >{{c1.categoryName}}</a>
                  -->
                </h3>
                <div class="item-list clearfix">
                  <div class="subitem">
                    <dl class="fore" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
                      <dt>
                        <!-- <a href>{{c2.categoryName}}</a> -->
                        <a
                          href="javascript:;"
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                        >{{c2.categoryName}}</a>
                      </dt>
                      <dd>
                        <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
                          <!-- <a href>{{c3.categoryName}}</a> -->
                          <a
                            href="javascript:;"
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                          >{{c3.categoryName}}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  //   mounted() {
  //     this.getCategoryList();
  //   },
  data() {
    return {
      currentIndex: -1,
      isShow: true
    };
  },
  // 页面加载完毕后，判断如果不是在home页就隐藏
  mounted() {
    if (this.$route.path !== "/home") {
      this.isShow = false;
    }
  },
  methods: {
    toSearch(event) {
      // name id query
      // 获取点击的元素
      let data = event.target.dataset;
      let { categoryname, category1id, category2id, category3id } = data;
      // 如果点击的是a
      if (categoryname) {
        // 创建Location对象 需要name query{name,id}
        let location = {
          name: "search"
        };
        let query = {};
        // name
        query.categoryName = categoryname;
        // id
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        location.query = query;
        // params参数
        let { params } = this.$route;
        if (params) {
          location.params = params;
        }
        // this.$router.push(location);
        // 修复返回home
        if (this.$route.path !== "/home") {
          this.$router.replace(location);
        } else {
          this.$router.push(location);
        }
      }
    },
    // getCategoryList() {
    //   this.$store.dispatch("getCategoryList");
    // },
    // moveIn(index) {
    //   this.currentIndex = index;
    // },
    moveIn: throttle(
      function(index) {
        this.currentIndex = index;
      },
      50,
      { traling: false }
    ),
    moveOut(index) {
      this.currentIndex = -1;
      if (this.$route.path !== "/home") {
        this.isShow = false;
      }
    }
  },
  computed: {
    ...mapState({
      categoryList: state => state.home.categoryList
    })
  }
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      &.show-enter {
        opacity: 0;
        height: 0;
      }
      &.show-enter-active {
        opacity: 1;
        transition: all 0.3s;
      }

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 650px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &.item_on {
            background-color: #ddd;
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
