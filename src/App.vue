<template>
  <div id="app">
    <router-view v-wechat-title="$route.meta.title" v-if="RouterState" />
  </div>
</template>

<script>
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      RouterState: true
    }
  },
  methods: {
    reload () {
      this.RouterState = false
      this.$nextTick(() => {
        this.RouterState = true
      })
    }
  }
}
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.container {
  width: 1200px;
  margin: 0 auto;
}
</style>
