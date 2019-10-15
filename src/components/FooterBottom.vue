<template>
  <footer>
    <div class="footer-info">
      <div class="container">
        <div class="footer-left fl">
          <ul>
            <li>
              <h5><router-link to="company">公司介绍</router-link></h5>
              <p v-for="(item, index) in companyList" :key="item.id">
                <router-link :to="{ path: 'company', query: { type: index}}">{{ item.title }}</router-link>
              </p>
            </li>
            <li>
              <h5><router-link to="news">新闻中心</router-link></h5>
              <p v-for="(item, index) in newsList" :key="item.id">
                <router-link :to="{ path: 'news', query: { type: index}}">{{ item.title }}</router-link>
              </p>
            </li>
            <li>
              <h5><router-link to="product">产品中心</router-link></h5>
              <p v-for="(item, index) in productList" :key="item.id">
                <router-link :to="{ path: 'product', query: { type: index}}">{{ item.title }}</router-link>
              </p>
            </li>
            <li>
              <h5><router-link to="plan">解决方案</router-link></h5>
              <p v-for="(item, index) in planList" :key="item.id">
                <router-link :to="{ path: 'plan', query: { type: index}}">{{ item.title }}</router-link>
              </p>
            </li>
            <li>
              <h5><router-link to="project">项目案例</router-link></h5>
              <p v-for="(item, index) in projectList" :key="item.id">
                <router-link :to="{ path: 'project', query: { type: index}}">{{ item.title }}</router-link>
              </p>
            </li>
            <li>
              <h5><router-link to="contact">联系我们</router-link></h5>
              <p><router-link to="contact">联系方式</router-link></p>
            </li>
          </ul>
        </div>
        <div class="footer-right fl">
          <div>
            <img src="../assets//img/logo-1.png" alt="logo">
          </div>
          <p>公司地址：郑州市郑东新区绿地原盛国际3号楼C座13楼251</p>
          <p>联系电话：0371-55572898</p>
        </div>
      </div>
    </div>
    <div class="icp alignCenter">
      ©️2014-2019 wenxiang.org版权所有 ICP证：京ICP备16041261
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterBottom',
  data () {
    return {
      companyList: [],
      newsList: [],
      productList: [],
      planList: [],
      projectList: []
    }
  },
  methods: {
    initCompany () {
      // 初始化公司实力
      this.$dataPost('/api/cms/about/list', {
        'pageSize': '10',
        'pageNumber': '1'
      }, (res) => {
        if (res.data.list.length > 4) {
          this.companyList = res.data.list.slice(0, 4)
        } else {
          this.companyList = res.data.list
        }
      })
    },
    initNews () {
      // 初始化新闻
      this.$dataPost('/api/cms/news/type', {}, (res) => {
        if (res.data.length > 4) {
          this.newsList = res.data.slice(0, 4)
        } else {
          this.newsList = res.data
        }
      })
    },
    initProduct () {
      // 初始化项目
      this.$dataPost('/api/cms/achieve/type', {
        parentId: 0
      }, (res) => {
        if (res.data.length > 3) {
          this.productList = res.data.slice(0, 3)
        } else {
          this.productList = res.data
        }
      })
    },
    initPlan () {
      // 初始化方案
      this.$dataPost('/api/cms/solution/list', {
        'pageSize': '10',
        'pageNumber': '1'
      }, (res) => {
        if (res.data.list.length > 4) {
          this.planList = res.data.list.slice(0, 4)
        } else {
          this.planList = res.data.list
        }
      })
    },
    initProject () {
      // 初始化案例
      this.$dataPost('/api/cms/develop/type', {}, (res) => {
        if (res.data.length > 4) {
          this.projectList = res.data.slice(0, 4)
        } else {
          this.projectList = res.data
        }
      })
    }
  },
  created () {
    this.initCompany()
    this.initNews()
    this.initProduct()
    this.initPlan()
    this.initProject()
  }
}
</script>

<style scoped>
  .footer-info {
    background: #313131;
    height: 300px;
  }
  .footer-info .footer-left {
    width: 787px;
    padding: 70px 0 0;
  }
  .footer-info .footer-left li {
    float: left;
    margin-right: 24px;
  }
  .footer-info .footer-left h5, .footer-info .footer-left h5 a {
    color: #fff;
    margin-bottom: 25px;
  }
  .footer-info .footer-left p {
    margin-bottom: 18px;
  }
  .footer-info .footer-left p a {
    font-size: 14px;
    color: #909090;
  }
  .footer-info .footer-right {
    width: 302px;
    padding-top: 60px;
  }
  .footer-info .footer-right img {
    width: 176px;
    height: 57px;
    margin-bottom: 25px;
  }
  .footer-info .footer-right p {
    font-size: 14px;
    color: #909090;
    line-height: 25px;
    margin-bottom: 10px;
  }
  .footer-info .footer-qrcode img {
    width: 90px;
    height: 90px;
    margin-top: 170px;
  }
  .icp {
    background: #1B1B1B;
    font-size: 14px;
    color: #909090;
    line-height: 50px;
  }
</style>
