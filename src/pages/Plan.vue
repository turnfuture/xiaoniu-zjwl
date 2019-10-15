<template>
  <div class="wrapper">
    <HeaderTop :url="company"></HeaderTop>
    <div class="banner">
      <img src="http://img.hnxn888.com/zjwl/jiejuefangan.png" alt="bannner">
    </div>
    <div class="container">
      <div class="content">
        <!-- 左侧公共区域 -->
        <Aside :navAative="navAative" title="Plan" :leftList="leftList" @newNodeEvent="parentLisen"></Aside>

        <div class="com-right pro-right">
          <div class="com-nav f14">
            <router-link to='/'>
              <img src="../assets/img/icon-home.png" alt="home">
              首页
            </router-link>
            >
            <router-link to='plan'>解决方案</router-link>
            >
            <span>{{ comTitle }}</span>
          </div>
          <ul class="pro-content">
            <template v-if="newsList.length > 0">
            <li v-for="item in newsList" :key="item.id">
              <router-link :to="{ path: 'planAdd', query: { id: item.id, title: item.title,} }">
                <img :src="item.icon" alt="产品图片">
                <div class="pro-li-mask f14 alignCenter">
                  {{ item.title }}
                </div>
              </router-link>
            </li>
            </template>
            <template v-else>
              <p>暂无</p>
            </template>
          </ul>
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
  name: 'Plan',
  data () {
    return {
      company: 4,
      leftList: [],
      navAative: 0,
      list: [],
      comTitle: '',
      comId: '', //  当前分类ID
      newsList: []
    }
  },
  methods: {
    parentLisen (index) {
      this.navAative = index
      this.comTitle = this.list[index].title
      this.comId = this.list[index].id
      this.attrList(this.list[index].id)
    },
    init (type) {
      // 初始化数据
      this.$dataPost('/api/cms/solution/type', {
        parentId: 0
      }, (res) => {
        var list = res.data
        this.list = res.data
        this.comTitle = list[type].title
        this.comId = list[type].id
        if (res.code === 0) {
          for (var i = 0; i < list.length; i++) {
            var temp = {}
            temp.id = list[i].id
            temp.title = list[i].title
            this.leftList.push(temp)
          }
          this.attrList(list[type].id)
        }
      })
    },
    attrList (id) {
      // 通过分类ID获取数据
      this.$dataPost('/api/cms/solution/type', {
        parentId: id
      }, (res) => {
        if (res.code === 0) {
          this.newsList = res.data
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
  computed: {
    pages: function () {
      var pag = []
      if (this.current < this.showItem) {
        // 如果当前的激活的项 小于要显示的条数
        // 总页数和要显示的条数那个大就显示多少条
        var i = Math.min(this.showItem, this.allpage)
        while (i) {
          pag.unshift(i--)
        }
      } else {
        var middle = this.current - Math.floor(this.showItem / 2)
        var j = this.showItem
        if (middle > (this.allpage - this.showItem)) {
          middle = (this.allpage - this.showItem) + 1
        }
        while (j--) {
          pag.push(middle++)
        }
      }
      return pag
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
  .com-right {
    flex: 1;
    padding-left: 50px;
    margin-bottom: 50px;
  }
  /* 小导航栏 */
  .com-nav {
    text-align: right;
    margin-top: 30px;
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
  .com-content {
    margin: 30px 0;
  }
  .com-content .plan-main {
    display: flex;
    margin-bottom: 60px;
  }
  .com-content .plan-pic {
    width: 300px;
    height: 280px;
    float: right;
    margin-top: -110px;
    margin-left: 20px;
  }
  .com-content .plan-pic img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .com-content .text {
    flex: 1;
  }
  .com-content .plan-main h2 {
    font-family:Microsoft YaHei;
    color: #000;
    font-weight: 500;
    margin: 40px 0 25px;
  }
  .com-content .plan-main p {
    color: #535353;
    line-height: 28px;
    width: 500px;
  }
  .plan-main-left p {
    float: right;
  }
  .plan-main-ot p {
    margin-top: 50px;
  }
  >>> .honor {
    width: 930px !important;
  }
  >>> .plan-content img {
    width: 580px !important;
    margin-top: 20px;
  }
  .pro-right .pro-content {
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-wrap: wrap;
    margin: 30px 0 35px;
  }
  .pro-right .pro-content li {
    width: 280px;
    height: 260px;
    margin: 0 20px 20px 0;
    position: relative;
    border: 1px solid #e5e5e5;
    box-sizing: border-box;
  }
  .pro-right .pro-content li a {
    display: block;
    height: 100%;
  }
  .pro-right .pro-content li img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .pro-right .pro-content li .pro-li-mask {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 90%;
    height: 50px;
    line-height: 50px;
    color: #fff;
    padding: 0 5%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    background: rgba(0, 0, 0, 0.6);
  }
</style>
