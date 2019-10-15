<template>
  <div class="com-left">
    <div class="title f36 alignCenter">
      {{ title }}
    </div>
    <ul>
      <li v-for="(item, index) in leftList" :key="item.id" @click="asideOn(index)" :class="liActive == index ? 'active' : ''">
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Aside',
  data () {
    return {

    }
  },
  methods: {
    asideOn (index) {
      this.liActive = index
      this.$emit('newNodeEvent', index)
    }
  },
  computed: {
    liActive: {
      get: function () {
        return this.navAative
      },
      set: function () {

      }
    }
  },
  props: {
    title: String,
    navAative: Number,
    // 默认为第一个,从其他途径进入默认其他
    leftList: {
      type: Array,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function () {
        return '父页面没有传值'
      }
    }
  }
}
</script>

<style>
  .com-left {
    width: 220px;
    margin-top: -65px;
    margin-bottom: 30px;
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
  .com-left ul li.active, .com-left ul li:hover {
    background: #0069B7;
    color: #fff;
  }
  .com-left ul li.active a, .com-left ul li:hover a {
    color: #fff;
  }
  .com-left ul li.active:before, .com-left ul li:hover:before {
    background: #fff;
  }
</style>
