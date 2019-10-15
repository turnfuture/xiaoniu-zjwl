<template>
  <header>
    <div class="container">
      <div class="logo fl">
        <router-link to="/">
          <img src="../assets/img/logo.png">
        </router-link>
      </div>
      <nav class="fr">
        <router-link v-for="(item,i) in navList" :key="i" class="alignCenter" :class="url== i ? 'active' : ''" :to="item.url">
          {{ item.name }}
         </router-link>
      </nav>
    </div>
  </header>
</template>

<script>

export default {
  name: 'HeaderTop',
  data () {
    return {
      navList: [{
        name: '首页',
        url: '/'
      }, {
        name: '公司实力',
        url: 'company'
      }, {
        name: '新闻资讯',
        url: 'news'
      }, {
        name: '产品中心',
        url: 'product'
      }, {
        name: '解决方案',
        url: 'plan'
      }, {
        name: '项目案例',
        url: 'project'
      }, {
        name: '联系我们',
        url: 'contact'
      }]
    }
  },
  props: {
    url: Number
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  header {
    height: 105px;
  }
  .container {
    overflow: hidden;
  }
  .logo img {
    width: 198px;
    height: 65px;
    margin: 21px 0;
  }
  nav {
    width: 805px;
    margin: 29px;
  }
  nav a {
    width: 115px;
    height: 50px;
    display: inline-block;
    line-height: 50px;
    color: #000000;
  }
  nav a.active, nav a:hover {
    background:rgba(0,105,183,1);
    color: #fff;
  }
</style>
