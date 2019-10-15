<template>
  <div class="wrapper">
    <HeaderTop :url="company"></HeaderTop>
    <div class="banner">
      <img src="http://img.hnxn888.com/zjwl/chanpinzhongxin.png" alt="bannner">
    </div>
    <div class="container">
      <div class="content">
        <div class="com-nav f14">
          <router-link to='/'>
            <img src="../assets/img/icon-home.png" alt="home">
            首页
          </router-link>
          >
          <router-link to='product'>产品中心</router-link>
          >
          <span>{{ info.title }}</span>
        </div>
        <div class="pro-content">
          <div class="pro-main">
            <div class="pro-main-pic">
              <video v-if="info.img" :src="info.img" width="480" height="480" controls></video>
              <img v-else :src="info.icon" alt="图片">
            </div>
            <div class="pro-main-text">
              <h4 class="f32">{{ info.title }}</h4>
              <div class="" v-html="info.content"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <FooterBottom></FooterBottom>
  </div>
</template>

<script>
import HeaderTop from '../components/HeaderTop.vue'
import FooterBottom from '../components/FooterBottom.vue'
export default {
  name: 'ProductDetail',
  data () {
    return {
      company: 3,
      info: ''
    }
  },
  methods: {
    init () {
      // 初始化新闻详情
      this.$dataPost('/api/cms/achieve/info', {
        id: this.$route.query.id
      }, (res) => {
        if (res.code === 0) {
          this.info = res.data
        }
      })
    }
  },
  created () {
    this.init()
  },
  components: {
    HeaderTop,
    FooterBottom
  },
  filters: {
    DateTime (val) {
      if (val && val.length > 10) {
        val = val.substring(0, 10)
      }
      return val
    }
  }
}
</script>

<style scoped>
  a {
    color: #000;
  }
  .banner {
    height: 500px;
  }
  .banner img {
     width: 100%;
     height: 100%;
     object-fit: cover;
  }
  /* 内容区域 */
  .pro-content {
    margin-bottom: 60px;
  }
  /* 小导航栏 */
  .com-nav {
    width: 100%;
    text-align: right;
    margin: 30px 0 40px;
  }
  .com-nav img {
     width: 18px;
     height: 18px;
     position: relative;
     top: 3px;
  }
  .com-nav span {
    color: #0069B7;
    cursor: pointer;
  }
  /* 内容区域 */
  .pro-main {
    display: flex;
  }
  .pro-main .pro-main-pic {
    width: 480px;
    height: 480px;
    border: 8px solid #0069B7;
    box-sizing: border-box;
  }
  .pro-main .pro-main-pic img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    margin: 30px;
    border: 1px solid #E5E5E5;
    box-sizing: border-box;
  }
  .pro-main .pro-main-pic video {
    margin: 30px;
    border: 1px solid #E5E5E5;
    background: #f5f5f5;
  }
  .pro-main .pro-main-text {
    flex: 1;
    padding-left: 80px;
    font-family: Microsoft YaHei;
    padding-top: 90px;
  }
  .pro-main .pro-main-text h4 {
    margin-bottom: 30px;
  }
  .pro-main .pro-main-text p {
    font-size: 18px;
    color: #535353;
    line-height: 28px;
    margin-bottom: 30px;
  }
  .pro-pic img {
    width: 100%;
    margin-top: 60px;
  }
</style>
