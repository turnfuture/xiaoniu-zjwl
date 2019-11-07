<template>
  <div class="wrapper">
    <HeaderTop :url="company"></HeaderTop>
    <div class="banner">
      <img src="http://img.hnxn888.com/zjwl/jiejuefangan.png" alt="bannner">
    </div>
    <div class="container">
      <div class="content">
        <div class="com-nav f14">
          <router-link to='/'>
            <img src="../assets/img/icon-home.png" alt="home">
            首页
          </router-link>
          >
          <router-link to='plan'>解決方案</router-link>
          >
          <span>{{ info.title }}</span>
        </div>
        <div class="pro-content">
          <h2 class="f32 alignCenter">{{ info.title }}</h2>
          <h6 class="f18 alignCenter">{{ info.updateAt | DateTime }}</h6>
          <div class="" v-html="info.content"></div>
        </div>
        <div class="details-btn">
          <div>
            <span v-if="$route.query.index != 0" @click="pageClick(prevPage.id, --$route.query.index)">
              <img src="../assets/img/left.png" alt="左箭头">
              上一篇: {{prevPage.title}}
            </span>
          </div>
          <div>
            <span v-if="$route.query.index != (pageList.length - 1)" @click="pageClick(nextPage.id, ++$route.query.index)">
              下一篇: {{nextPage.title}}
              <img src="../assets/img/right.png" alt="右箭头">
            </span>
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
  name: 'Project',
  data () {
    return {
      company: 4,
      info: '',
      pageList: [],
      prevPage: {},
      nextPage: {},
      index: 0
    }
  },
  inject: ['reload'],
  methods: {
    init () {
      // 初始化新闻详情
      this.$dataPost('/api/cms/solution/info', {
        id: this.$route.query.id
      }, (res) => {
        if (res.code === 0) {
          this.info = res.data
        }
      })
    },
    initList () {
      let _this = this
      // 初始化二级分类，主要获取上一篇，下一篇
      _this.$dataPost('/api/cms/solution/list', {
        'typeId': _this.$route.query.typeid,
        'pageSize': '30',
        'pageNumber': '1'
      }, (res) => {
        if (res.code === 0) {
          let prev = parseInt(_this.$route.query.index) - 1
          let next = parseInt(_this.$route.query.index) + 1
          _this.pageList = res.data.list
          if (prev >= 0) {
            _this.$set(_this.prevPage, 'title', res.data.list[prev].title)
            _this.$set(_this.prevPage, 'id', res.data.list[prev].id)
          }
          _this.$set(_this.nextPage, 'title', res.data.list[next].title)
          _this.$set(_this.nextPage, 'id', res.data.list[next].id)
        }
      })
    },
    pageClick (id, index) {
      // 跳转上一页,下一页
      this.$router.replace({path: 'planDetail', query: {id: id, typeid: this.$route.query.typeid, index: this.$route.query.index}})
      this.reload()
    }
  },
  mounted () {
    this.init()
    this.initList()
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
  .pro-content p {
    font-size: 18px;
    width: 1083px;
    text-align: center;
    font-family:Microsoft YaHei;
    line-height: 28px;
  }
  .pro-content img {
    width: 700px;
    margin: 36px 0 0;
  }
</style>
