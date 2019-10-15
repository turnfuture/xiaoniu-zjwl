<template>
  <div class="wrapper">
    <HeaderTop :url="company"></HeaderTop>
    <div class="banner">
      <img src="http://img.hnxn888.com/zjwl/xinwenzixun.png" alt="bannner">
    </div>
    <div class="container">
      <div class="content">
        <div class="com-nav f14">
          <router-link to='/'>
            <img src="../assets/img/icon-home.png" alt="home">
            首页
          </router-link>
          >
          <router-link to='news'>新闻资讯</router-link>
          >
          <span>{{ info.title }}</span>
        </div>
        <div class="pro-content">
          <h2 class="f32 alignCenter">{{ info.title }}</h2>
          <h6 class="f18 alignCenter">{{ info.updateAt | DateTime }}</h6>
          <div class="" v-html="info.content"></div>
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
  name: 'Project',
  data () {
    return {
      company: 2,
      info: ''
    }
  },
  methods: {
    init () {
      // 初始化新闻详情
      this.$dataPost('/api/cms/news/info', {
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
  .pro-content {
    text-align: center;
    margin: 36px 0;
  }
  .pro-content h2, .pro-right .pro-content h6 {
    font-family:Microsoft YaHei;
  }
  .pro-content h6 {
    color: #666;
    margin: 20px 0 30px;
  }
  >>> .pro-content p {
    font-size: 18px;
    width: 1083px;
    text-align: center;
    font-family:Microsoft YaHei;
    line-height: 30px;
    margin-bottom: 10px;
  }
  .pro-content img {
    width: 700px;
    margin: 36px 0 0;
  }
</style>
