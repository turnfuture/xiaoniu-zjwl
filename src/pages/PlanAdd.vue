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
          <router-link to='plan'>解決方案</router-link>
          >
          <span>{{ title }}</span>
        </div>
        <ul class="pro-content">
          <template v-if="newsList.length > 0">
          <li v-for="item in newsList" :key="item.id">
            <router-link :to="{ path: 'planDetail', query: { id: item.id} }">
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
        <!-- 分页 -->
        <ul class="pagination">
            <li v-show="current != 1" @click="current-- && goto(current--)" >
              <span>上一页</span>
            </li>
            <li v-for="index in pages" @click="goto(index)" :class="{'active':current == index}" :key="index">
              <span>{{index}}</span>
            </li>
            <li v-show="allpage != current && allpage != 0 " @click="current++ && goto(current++)">
              <span>下一页</span>
            </li>
        </ul>
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
      info: '',
      current: 1, // 分页
      showItem: 5,
      allpage: 1,
      newsList: [],
      title: this.$route.query.title
    }
  },
  methods: {
    goto (index) {
      if (index === this.current) {
        return
      }
      this.current = index
      this.attrList(this.$route.query.id, index)
    },
    init () {
      // 初始化产品二级分类
      this.attrList(this.$route.query.id, 1)
    },
    attrList (id, page) {
      // 通过分类ID获取数据
      this.$dataPost('/api/cms/solution/list', {
        'typeId': id,
        'pageSize': '12',
        'pageNumber': page
      }, (res) => {
        if (res.code === 0) {
          this.newsList = res.data.list
          this.allpage = res.data.lastPage
        }
      })
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
  .content {
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

  .pro-content {
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-wrap: wrap;
    margin: 30px 0 35px;
  }
  .pro-content li {
    width: 280px;
    height: 260px;
    margin: 0 20px 20px 0;
    position: relative;
    border: 1px solid #e5e5e5;
    box-sizing: border-box;
  }
  .pro-content li a {
    display: block;
    height: 100%;
  }
  .pro-content li img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .pro-content li .pro-li-mask {
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
