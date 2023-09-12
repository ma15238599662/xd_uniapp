<template>
  <view class="webview">
    <web-view :src="url" @message="message"></web-view>
  </view>
</template>

<script>
const XdModule = uni.requireNativePlugin('XdModule');
export default {
  data() {
    return {
      baseUrl: 'http://192.168.6.11:8888',
      path: '/search',
      url: ''
    };
  },
  onLoad(options) {
    this.xdInit();
    console.log('webview--------options', options);
    let url = options.url;
    this.url = url;
  },
  methods: {
    xdInit() {
      XdModule.start();
      XdModule.setXdLocationUniCallback(this.xdCallback);
    },
    xdCallback(res) {
      const { longitude, latitude, bearing, isGps, flag } = res;
      // isGps 1 是地上 0是地下    flag -100 上坡中
      let params = `lng=${longitude}&lat=${latitude}&angle=${bearing}&isGps=${isGps}&flag=${flag}`;
      let url = this.baseUrl + '/#' + this.path;
      if (this.path === '/startNavigation' || this.path === '/search') {
        if (url.includes('?')) {
          this.url = `${url}&${params}`;
        } else {
          this.url = `${url}?${params}`;
        }
      }
      // console.log('this.url11111', this.url)
    },

    message(e) {
      console.log('uni-------e', e);
      console.log('uni-------data', e.detail.data);
      let { path, query } = e.detail.data[0];
      this.path = path;
      if (path != '/startNavigation') {
        let data = e.detail.data[0];
        let url = query.length > 0 ? `/pages/tabbar/index/index` : `/pages/tabbar/index/index`;
        
        uni.switchTab({
          url: url
        });
      }
      
    }
  }
};
</script>

<style lang="scss">
.webview {
  width: 100vw;
  height: 100vh;
}
</style>