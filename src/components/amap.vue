<template>
  <div class="amap-page-container">
    <el-amap vid="amap" :plugin="plugin" class="amap-demo" :center="center"></el-amap>
  </div>
</template>

<script>
export default {
  data () {
    const self = this
    return {
      center: [113.770709, 34.766943],
      lng: 0,
      lat: 0,
      loaded: false,
      plugin: [{
        enableHighAccuracy: true,
        timeout: 100,
        maximumAge: 0,
        convert: true,
        showButton: true,
        buttonPosition: 'RB',
        showMarker: true,
        showCircle: true,
        panToLocation: true,
        zoomToAccuracy: true,
        extensions: 'all',
        pName: 'Geolocation',
        events: {
          init (o) {
            // o 是高德地图定位插件实例
            o.getCurrentPosition((status, result) => {
              if (result && result.position) {
                self.lng = result.position.lng
                self.lat = result.position.lat
                self.center = [self.lng, self.lat]
                self.loaded = true
                self.$nextTick()
              }
            })
          }
        }
      }]
    }
  }
}
</script>

<style>
  .amap-page-container {
    height: 380px;
    border: 1px solid #0069B7;
  }
</style>
