<template>
  <div class="wrapper">
    <HeaderTop :url="company"></HeaderTop>
    <div class="banner">
      <img src="http://img.hnxn888.com/zjwl/xiangmuanli.png" alt="bannner">
    </div>
    <div class="container">
      <div class="content">
        <!-- 左侧公共区域 -->
        <Aside :navAative="navAative" title="Project" :leftList="leftList" @newNodeEvent="parentLisen"></Aside>

        <div class="pro-right">
          <div class="com-nav f14">
            <router-link to='/'>
              <img src="../assets/img/icon-home.png" alt="home">
              首页
            </router-link>
            >
            <router-link to='project'>项目案例</router-link>
            >
            <span>{{ comTitle }}</span>
          </div>
          <ul class="pro-content">
            <li v-for="(item, index) in newsList" :key="item.id">
              <router-link :to="{ path: 'projectDetail', query: {id: item.id, typeid: comId, index: index}}">
                <div class="pic">
                  <img :src="item.icon" alt="产品图片">
                </div>
                <div class="pro-li-text f14">
                  <h5>{{ item.title }}</h5>
                  <p>{{ item.updateAt | DateTime }}</p>
                </div>
              </router-link>
            </li>
          </ul>
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
  name: 'Project',
  data () {
    return {
      company: 5,
      leftList: [],
      navAative: 0,
      list: [],
      comTitle: '', //  右上角小分页
      comId: '', //  当前分类ID
      newsList: [],
      current: 1, // 分页
      showItem: 5,
      allpage: 10
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
      if (index === this.current) {
        return
      }
      this.current = index
      this.attrList(this.comId, index)
    },
    init (type) {
      // 初始化数据
      this.$dataPost('/api/cms/develop/type', {}, (res) => {
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
          this.attrList(list[0].id, 1)
        }
      })
    },
    attrList (id, page) {
      // 通过分类ID获取数据
      this.$dataPost('/api/cms/develop/list', {
        'typeId': id,
        'pageSize': '9',
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
    display: -webkit-flex; /* Safari */
    display: flex;
  }
  .pro-right {
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
  .pro-right .pro-content {
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-wrap: wrap;
    margin: 30px 0 35px;
  }
  .pro-right .pro-content li {
    width: 220px;
    height: 292px;
    margin: 0 16px 20px 0;
    border: 1px solid #E5E5E5;
    box-sizing: border-box;
    cursor: pointer;
  }
  .pro-right .pro-content li:nth-child(4n) {
    margin-right: 0;
  }
  .pro-right .pro-content li .pic {
    height: 220px;
  }
  .pro-right .pro-content li .pic img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .pro-right .pro-content li .pro-li-text {
    padding: 6px 10px;
    border-top: 1px solid #E5E5E5;
  }
  .pro-right .pro-content li .pro-li-text h5 {
    line-height: 18px;
    margin-bottom: 4px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .pro-right .pro-content li:hover {
    border-color: #0069B7;
  }
  .pro-right .pro-content li:hover .pro-li-text {
    border-top-color: #0069B7;
  }
  .pro-right .pro-content li:hover .pro-li-text h5, .pro-right .pro-content li:hover .pro-li-text p {
    color: #0069B7;
  }
</style>
