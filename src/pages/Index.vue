<template>
  <div class="wrapper">
    <HeaderTop :url="index"></HeaderTop>
    <div class="banner">
      <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide v-for="item in bannerList" :key="item.id">
          <img :src="item.url" alt="banner">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <div class="container">
      <div class="company clearfix">
        <div class="fl">
          <h3>郑州智居物联网科技有限公司</h3>
          <h4>Zhengzhou Zhiju Internet of Things</h4>
          <p>郑州智居物联网科技有限公司,2017年03月27日成立，经营范围包括物联网技术开发、技术咨询、技术转让、技术服务；自动化设备技术开发、技术咨询、技术服务、技术转让；智能产品技术开发、技术咨询、技术转让、技术服务；企业营销策划；设计、制作、代理、发布国内广告业务；从事货物和技术的进出口业务（法律法规规定禁止进出口的货物和技术除外）；批发零售：电子产品、通讯设备、自动化设备、多媒体设备、办公设备、机械设备、教学设备、计算机软硬件、空气净化设备、五金交电、家用电器、多媒体设备；多媒体设备、教学设备安装、维修、租赁；家用电器安装；环保设备技术开发、技术服务、技术转让。</p>
          <table>
            <tr>
              <th>
                10<span>年</span>
              </th>
              <th>
                72<span>人</span>
              </th>
              <th>
                10<span>本</span>
              </th>
            </tr>
            <tr>
              <td>行业经验</td>
              <td>公司人数</td>
              <td>荣誉证书</td>
            </tr>
          </table>
          <div class="more">
            <router-link to="company">
              查看详情 》
            </router-link>
          </div>
        </div>
        <div class="fr">
          <img src="../assets/img/index-1.jpg" alt="图片">
        </div>
      </div>
      <div class="product">
        <div class="title alignCenter">
          <h3 class="f36">产品分类</h3>
          <span class="f24">Product categories</span>
        </div>
        <div class="product-list">
          <ul class="clearfix">
            <li class="pro-li fl" v-for="(item, index) in productList" :key="index" :class="index == showData ? 'active' : ''" @mouseover="doDetail(index)">
              <img :src="item.icon" :alt="item.title" v-if="showData != index">
              <div class="li-mask" v-if="showData != index">
                <div class="mask-main">
                  <img :src="item.icons" alt="icon">
                  <h4 class="f20">{{item.title}}</h4>
                </div>
              </div>
              <div class="li-mask-go" v-else @click="goProduct(index)">
                <div class="mask-main-active">
                  <img :src="item.icons" alt="icon">
                  <h4 class="f20">{{item.title}}</h4>
                </div>
                <div class="mask-text f14">
                  {{item.content}}
                </div>
                <div class="right-more">
                  <img src="../assets/img/icon-04.png" alt="more">
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="propaganda">
      <img src="http://img.hnxn888.com/zjwl/ganggaowei.png" alt="宣传图">
    </div>
    <div class="container">
      <div class="news">
        <div class="title alignCenter">
          <h3 class="f36">新闻资讯</h3>
          <span class="f24">News and information</span>
        </div>
        <div class="news-main">
          <div class="clearfix">
            <template v-for="newItem in newsList">
              <div class="li fl" :key="newItem.id">
                <img :src="newItem.icon" alt="新闻">
              </div>
              <div class="li fl" :key="newItem.id * 10">
                <div class="news-time f18">
                  {{newItem.updateAt}}
                </div>
                <div class="news-title alignCenter f18">
                  {{newItem.title}}
                </div>
                <div class="news-content f14">
                  {{newItem.describe}}
                </div>
                <div class="more">
                  <router-link :to="{ path: 'newsDetail', query: {id: newItem.id}}">
                    查看详情 》
                  </router-link>
                </div>
              </div>
            </template>
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
  name: 'Index',
  data () {
    return {
      swiperOption: {
        notNextTick: true,
        loop: true,
        initialSlide: 0,
        autoplay: {
          delay: 5000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          type: 'bullets'
        }
      },
      index: 0,
      showData: -1,
      bannerList: [],
      productList: [],
      newsList: []
    }
  },
  methods: {
    doDetail (index) {
      this.showData = index
    },
    goProduct (index) {
      this.$router.push({ path: '/product', query: { type: index } })
    },
    initBanner () {
      // 初始化轮播图
      this.$dataPost('/api/cms/slide/list', {
        type: 0
      }, (res) => {
        if (res.code === 0) {
          this.bannerList = res.data
        }
      })
    },
    initProduct () {
      var showProductArr = []
      // 初始化产品中心
      this.$dataPost('/api/cms/achieve/type', {
        parentId: 0
      }, (res) => {
        if (res.code === 0) {
          if (res.data.length > 3) {
            showProductArr = res.data.slice(0, 3)
          } else {
            showProductArr = res.data
          }
          for (var i = 0; i < showProductArr.length; i++) {
            showProductArr[i].icons = require('../assets/img/icon-03.png')
          }
          this.productList = showProductArr
        }
      })
    },
    innerInfo () {
      // 初始化联系信息
      this.$dataPost('/api/cms/info/list', {
        type: 0
      }, (res) => {
        if (res.code === 0) {
          // console.log(res.data)
        }
      })
    },
    initNews (id, page) {
      // 通过分类ID获取数据
      this.$dataPost('/api/cms/news/list', {
        'pageSize': '3',
        'pageNumber': 1
      }, (res) => {
        var list = res.data.list
        if (res.code === 0) {
          this.newsList = list
        }
      })
    }
  },
  created () {
    this.initBanner()
    this.initProduct()
    this.initNews()
    // this.innerInfo()
  },
  components: {
    HeaderTop,
    FooterBottom
  }
}
</script>

<style scoped>
  .banner {
    height: 500px;
  }
  .banner div {
    height: 100%;
  }
  .banner img {
     width: 100%;
     height: 100%;
     object-fit: cover;
  }
  .swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets {
    bottom: -464px;
  }
  .swiper-pagination-bullet-active {
    background: #0069B7;
  }
  /* 公司介绍 */
  .company .fl {
    width: 506px;
    padding-top: 100px;
  }
  .company .fl img {
    width: 292px;
    height: 34px;
  }
  .company .fl h3 {
    font-size: 32px;
    color: #535353;
    font-weight: 600;
    font-family: FZZhengHeiS-EB-GB;
  }
  .company .fl h4 {
    font-size: 24px;
    color: #535353;
    font-weight: 600;
  }
  .company .fl p {
    color: #535353;
    line-height: 28px;
    margin: 20px 0;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
  }
  .company .fl table {
    width: 100%;
    text-align: left;
    color: #000;
  }
  .company .fl table th {
    font-size: 36px;
    color: #0069B7;
    font-weight: bold;
  }
  .company .fl table th span {
    font-size: 18px;
    margin-left: 10px;
  }
  .company .more {
    margin: 48px 0 100px;
  }
  .more a {
    width: 108px;
    height: 43px;
    border: 1px solid #0069B7;
    color: #0069B7;
    text-align: center;
    line-height: 43px;
    display: inline-block;
  }
  .company .fr {
    width: 694px;
    padding-top: 70px;
  }
  .company .fr img {
    width: 100%;
  }
  /* 公共小标题 */
  .title {
    margin-bottom: 40px;
  }
  .title h3 {
    font-weight: bold;
    font-family: FZZhengHeiS-EB-GB;
  }
  .title span {
    font-weight: bold;
    font-family: Ebrima;
  }
  .title span:before, .title span:after {
    content: '';
    width: 40px;
    height: 2px;
    background: #535353;
    margin: 0 10px;
    vertical-align:middle;
    display: inline-block;
  }
  /* 产品展示 */
  .product-list ul li {
    width: 33.3%;
    height: 480px;
    position: relative;
    margin-top: 40px;
    cursor: pointer;
  }
  .product-list ul li > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .li-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
  }
  .mask-main {
    position: absolute;
    top: 50%;
    width: 100%;
    height: 86px;
    margin-top: -43px;
  }
  .li-mask img {
    width: 36px;
    height: 36px;
    margin: 0 auto;
    display: block;
  }
  .li-mask h4 {
    color: #fff;
    text-align: center;
    margin-top: 20px;
  }
  /* 当前状态 */
  .pro-li.active {
    margin-top: 0;
    background: #0069B7;
    height: 520px;
    box-sizing: border-box;
  }
  .li-mask-go {
    height: 100%;
    padding-top: 50px;
  }
  .pro-li.active .mask-main-active {
    color: #fff;
    text-align: center;
  }
  .pro-li.active .mask-main-active h4 {
    margin-top: 20px;
  }
  .mask-text {
    color: #fff;
    padding: 40px 20px 0;
    line-height: 26px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 10;
    overflow: hidden;
  }
  .right-more {
    position: absolute;
    right: 20px;
    bottom: 40px;
    width: 31px;
    height: 16px;
  }
  /* 过渡状态 */
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-active {
    padding-left: 10px;
    opacity: 0;
  }
  /* 宣传图片 */
  .propaganda {
    margin: 80px 0 60px;
  }
  .propaganda img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  /* 新闻 */
  .news-main {
    margin: 70px 0;
  }
  .news-main .li {
      width: 33.3%;
      height: 330px;
      border: 1px solid #DCDCDC;
      box-sizing: border-box;
  }
  .news-main .li img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .news-main .li .news-time {
    margin: 30px 30px 25px;
    text-align: right;
    line-height: 25px;
  }
  .news-main .li .news-title {
    line-height: 24px;
    width: 288px;
    margin: 0 auto 20px;
    height: 48px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .news-main .li .news-content {
    color: #666;
    width: 324px;
    height: 85px;
    line-height: 22px;
    margin: 0 auto;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
  }
  .news-main .li .more {
    text-align: center;
    margin-top: 25px;
  }
  .news-main .li .more a {
    font-size: 14px;
    width: 100px;
    height: 40px;
    line-height: 40px;
    box-sizing: border-box;
    border-radius: 2px;
  }
</style>
