<template>
  <div class="wrapper">
    <HeaderTop :url="company"></HeaderTop>
    <div class="banner">
      <img src="http://img.hnxn888.com/zjwl/gongsishili.png" alt="bannner">
    </div>
    <div class="container">
      <div class="content">
        <!-- 左侧公共区域 -->
        <Aside :navAative="navAative" title="About us" :leftList="leftList" @newNodeEvent="parentLisen"></Aside>

        <div class="com-right">
          <div class="com-nav f14">
            <router-link to='/'>
              <img src="../assets/img/icon-home.png" alt="home">
              首页
            </router-link>
            >
            <router-link to='company'>
              公司实力
            </router-link>
            >
            <span>{{ comTitle }}</span>
          </div>
          <div class="com-content">
            <div class="com-title f32 alignCenter" v-html="comTitle"></div>
            <div v-html="content"></div>
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
import Aside from '../components/Aside.vue'
export default {
  name: 'Company',
  data () {
    return {
      company: 1,
      leftList: [],
      navAative: 0,
      list: [],
      comTitle: '',
      content: ''
    }
  },
  methods: {
    parentLisen (index) {
      this.navAative = index
      this.comTitle = this.list[index].title
      this.content = this.list[index].content
    },
    init (type) {
      // 初始化数据
      this.$dataPost('/api/cms/about/list', {
        'pageSize': '10',
        'pageNumber': '1'
      }, (res) => {
        var list = res.data.list
        this.list = res.data.list
        this.comTitle = list[type].title
        this.content = list[type].content
        if (res.code === 0) {
          for (var i = 0; i < list.length; i++) {
            var temp = {}
            temp.id = list[i].id
            temp.title = list[i].title
            this.leftList.push(temp)
          }
        }
      })
    }
  },
  created () {
    var type = this.$route.query.type
    // 地址栏带有参数, 左侧导航栏状态改变
    if (type) {
      this.navAative = Number(type)
      this.init(type)
    } else {
      this.init(0)
    }
  },
  components: {
    HeaderTop,
    FooterBottom,
    Aside
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
  .content {
    display: flex;
  }
  .com-left {
    width: 220px;
    margin-top: -65px;
  }
  .com-left .title {
    height: 130px;
    line-height: 130px;
    background: #0069B7;
    color: #fff;
    font-family:Ebrima;
  }
  .com-left ul li {
    font-size: 18px;
    font-family:Microsoft YaHei;
    line-height: 70px;
    text-align: center;
    border: 1px solid #E5E5E5;
    border-top: 0;
  }
  .com-left ul li:before {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background: #535353;
    margin-right: 10px;
    vertical-align:middle;
    display: inline-block;
  }
  .com-right {
    width: 946px;
    flex: 1;
    padding-left: 50px;
    margin-bottom: 50px;
  }
  /* 小导航栏 */
  .com-nav {
    text-align: right;
    margin: 30px 0;
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
  .com-title {
    margin: 38px 0;
    font-weight: 500;
    font-family:Microsoft YaHei;
  }
  >>> .honor {
    width: 930px !important;
  }
  >>> p img {
    width: 930px !important;
  }
</style>
