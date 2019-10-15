<template>
  <div class="wrapper">
    <HeaderTop :url="company"></HeaderTop>
    <div class="banner">
      <img src="http://img.hnxn888.com/zjwl/xinwenzixun.png" alt="bannner">
    </div>
    <div class="container">
      <div class="content">
        <!-- 左侧公共区域 -->
        <Aside :navAative="navAative" title="News" :leftList="leftList" @newNodeEvent="parentLisen"></Aside>

        <div class="com-right">
          <div class="com-nav f14">
            <router-link to='/'>
              <img src="../assets/img/icon-home.png" alt="home">
              首页
            </router-link>
            >
            <router-link to='news'>新闻资讯</router-link>
            >
            <span>{{ comTitle }}</span>
          </div>
          <div class="com-content">
            <ul>
              <li v-for="item in newsList" :key="item.id">
                <router-link :to="{ path: 'newsDetail', query: {id: item.id}}">
                  <div class="new-pic">
                     <img :src="item.icon" alt="图片">
                  </div>
                  <div class="new-main">
                    <h5 class="f24">{{ item.updateAt | DateTime }}</h5>
                    <h6 class="f18">{{ item.title }}</h6>
                    <p class="f14">{{ item.describe }}</p>
                  </div>
                </router-link>
              </li>
            </ul>
          </div>
          <!-- 分页 -->
          <ul class="pagination">
              <li v-show="current != 1" @click="current-- && goto(current--)" ><span>上一页</span></li>
              <li v-for="index in pages" @click="goto(index)" :class="{'active':current == index}" :key="index">
                <span>{{index}}</span>
              </li>
              <li v-show="allpage != current && allpage != 0 " @click="current++ && goto(current++)"><span>下一页</span></li>
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
  name: 'News',
  data () {
    return {
      company: 2,
      leftList: [], //  左侧列表
      navAative: 0,
      list: [],
      comTitle: '', //  右上角小分页
      comId: '', //  当前分类ID
      newsList: [],
      current: 1,
      showItem: 5,
      allpage: 0
    }
  },
  methods: {
    parentLisen (index) {
      this.navAative = index
      this.comTitle = this.list[index].title
      this.comId = this.list[index].id
      this.current = 1
      this.attrList(this.list[index].id)
    },
    goto (index) {
      // 点击右下角分页
      if (index === this.current) {
        return
      }
      this.current = index
      this.attrList(this.comId, index)
    },
    init (type) {
      // 初始化数据
      this.$dataPost('/api/cms/news/type', {}, (res) => {
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
          this.attrList(list[type].id, 1)
        }
      })
    },
    attrList (id, page) {
      // 通过分类ID获取数据
      this.$dataPost('/api/cms/news/list', {
        'typeId': id,
        'pageSize': '5',
        'pageNumber': page
      }, (res) => {
        if (res.code === 0) {
          this.newsList = res.data.list
          this.allpage = res.data.lastPage
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
    color: #2c3e50;
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
    border-bottom: 1px solid #E5E5E5;
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
  .com-left ul li.active {
    background: #0069B7;
    color: #fff;
  }
  .com-left ul li.active a {
    color: #fff;
  }
  .com-left ul li.active:before {
    background: #fff;
  }
  .com-right {
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
  /* 新闻内容区域 */
  .com-content ul li {
    margin-bottom: 20px;
  }
  .com-content ul li a {
    display: flex;
  }
  .com-content ul li .new-pic {
    width: 150px;
    height: 150px;
    border: 1px solid #e5e5e5;
    box-sizing: border-box;
  }
  .com-content ul li .new-pic img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .com-content ul li .new-main {
    flex: 1;
    padding: 10px 20px;
  }
  .com-content ul li .new-main h5 {
    color: #0069B7;
    margin-bottom: 12px;
  }
  .com-content ul li .new-main p {
    color: #535353;
    margin: 12px 0 0;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .com-content ul li:hover .new-main{
    box-shadow:0px 4px 8px 0px rgba(107,107,107,0.2);
  }
  .pagination {
    margin-top: 40px;
  }
</style>
