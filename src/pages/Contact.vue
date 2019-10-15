<template>
  <div class="wrapper">
    <HeaderTop :url="company"></HeaderTop>
    <div class="banner">
      <img src="http://img.hnxn888.com/zjwl/lianxiwomen.png" alt="bannner">
    </div>
    <div class="container">
      <div class="content">
        <!-- 左侧公共区域 -->
        <Aside :navAative="navAative" title="Contact" :leftList="leftList" @newNodeEvent="parentLisen"></Aside>

        <div class="com-right">
          <div class="com-nav f14">
            <router-link to='/'>
              <img src="../assets/img/icon-home.png" alt="home">
              首页
            </router-link>
            >
            <router-link to='contact'>联系我们</router-link>
            >
            <span>{{leftList[navAative].title}}</span>
          </div>
          <div class="con-content">
            <Amap></Amap>
            <div class="com-title">
              <h3 class="f24">联系方式</h3>
              <p class="f14">Contact</p>
            </div>
            <ul class="clearfix">
              <li>公司名称：郑州智居物联网科技有限公司</li>
              <li>公司地址：郑州市郑东新区绿地原盛国际3号楼C座13楼251</li>
              <li>联系电话：0371-55572898</li>
              <li>邮箱：zhijuwulian@163.com</li>
            </ul>
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
import Amap from '../components/Amap.vue'
export default {
  name: 'Plan',
  data () {
    return {
      company: 6,
      leftList: [{
        title: '联系我们',
        id: 0
      }],
      navAative: 0
    }
  },
  methods: {
    parentLisen (index) {
      this.navAative = index
    }
  },
  created () {
    var type = this.$route.query.type
    // 地址栏带有参数, 左侧导航栏状态改变
    if (type) {
      this.navAative = Number(type)
    }
  },
  components: {
    HeaderTop,
    FooterBottom,
    Aside,
    Amap
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
    border-bottom: 1px solid #E5E5E5;
  }
  .com-left ul li {
    font-size: 18px;
    font-family:Microsoft YaHei;
    line-height: 70px;
    text-align: center;
    border: 1px solid #E5E5E5;
    border-top: 0;
    cursor: pointer;
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
    margin: 38px 0 28px;
    font-weight: 500;
    font-family:Microsoft YaHei;
  }
  .con-content {
    margin: 30px 0;
  }
  .com-title p {
    color: #535353;
    font-family: Microsoft YaHei;
  }
  .con-content ul li{
    float: left;
    width: 50%;
    color: #535353;
    margin-bottom: 20px;
    font-family: Microsoft YaHei;
  }
</style>
