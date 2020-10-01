<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(item, index) in shopCartList" :key="item.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="item.isChecked"
              @click="updateIsOneCheck(item)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl" />
            <div class="item-msg">{{item.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{item.skuPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="updateCartNum(item,-1)">-</a>
            <input
              autocomplete="off"
              type="text"
              :value="item.skuNum"
              minnum="1"
              class="itxt"
              @change="updateCartNum(item,$event.target.skuNum*1)"
            />
            <a href="javascript:void(0)" class="plus" @click="updateCartNum(item,1)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{item.skuNum * item.skuPrice}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="javascript:;" class="sindelet" @click="deteleCart(item)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="isCheckedAll" />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:;" @click="deleteCheckedShopCar">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择
          <span>{{goodsNum}}</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{allPrice}}</i>
        </div>
        <div class="sumbtn">
          <!-- <a class="sum-btn" href="###" target="_blank">结算</a> -->
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ShopCart",
  mounted() {
    this.getShopCartList();
  },
  methods: {
    getShopCartList() {
      this.$store.dispatch("getShopCartList");
    },
    // 修改购物车商品的数量
    async updateCartNum(item, num) {
      try {
        if (item.skuNum + num < 1) {
          num = 1 - item.skuNum;
        }
        // 更新购物车商品信息
        await this.$store.dispatch("getAddCartOrUpdate", {
          skuId: item.skuId,
          skuNum: num
        });
        this.getShopCartList();
      } catch (error) {
        console.log(error);
      }
    },
    // 修改选中状态
    async updateIsOneCheck(item) {
      try {  
        await this.$store.dispatch("updateIsChecked", {
          skuId: item.skuId,
          isChecked: item.isChecked === 1 ? 0 : 1
        });
        this.getShopCartList();
      } catch (error) {
        alert(error.message);
      }
    },
    // 删除购物车商品
    async deteleCart(item) {
      try {
        await this.$store.dispatch("getDeleteCart", item.skuId);
        this.getShopCartList();
      } catch (error) {
        alert(error.message)
      }
    },
    // 删除选中的商品
    async deleteCheckedShopCar(){
      try {
        await this.$store.dispatch('deleteCheckedShopCar')
        this.getShopCartList()
      } catch (error) {
        alert(error.message)
      }
    }
  },
  computed: {
    ...mapState({
      shopCartList: state => state.shopcart.shopCartList
    }),
    // 选择n件商品
    goodsNum() {
      return this.shopCartList.reduce((pre, item, index) => {
        if (item.isChecked) {
          pre += item.skuNum;
        }
        return pre;
      }, 0);
    },
    // 总价
    allPrice() {
      return this.shopCartList.reduce((pre, item, index) => {
        if (item.isChecked) {
          pre += item.skuPrice * item.skuNum;
        }
        return pre;
      }, 0);
    },
    // 全选/全不选
    isCheckedAll: {
      get() {
        return this.shopCartList.every((item, index) => item.isChecked === 1);
      },
      async set(val) {
        //点击全选之后，会进入这个set逻辑
        try {
          // 全部更新结果后
          const result = await this.$store.dispatch(
            "updateAllIsChecked",
            val ? 1 : 0
          );
          // 重新发送购物车列表请求
          this.getShopCartList();
        } catch (error) {
          alert(error.message);
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>