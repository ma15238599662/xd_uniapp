<template>
  <view>
    <!-- index
    <button @click="sendMsg" style="z-index: 9999">sendMsg</button> -->
    <!-- <web-view :src="url" @message="message"></web-view> -->
    <web-view id="my-webview" ref="webview" :src="url" @message="message"></web-view>
    <!-- <button @click="showRoute">导航</button> -->
  </view>
</template>

<script>
  const XdModule = uni.requireNativePlugin('XdModule')
// const sdkwx = uni.requireNativePlugin('AMap-NavSdkWX');
// var OneNavi = uni.requireNativePlugin('AMap-OneNavi');
// var wv = uni.requireNativePlugin('WebViewBridge');
// import webviewMixin from '@/mixins/webviewMixin.js';
export default {
  // mixins: [webviewMixin],
  data() {
    return {
      webviewContext: null,
      msgStr: 0,
      path: '/home',
      baseUrl: 'http://192.168.6.11:8888',
      url: 'http://192.168.6.11:8888/#/home',
      // baseUrl: 'http://map.xdwalker.cn',
      // url: 'http://map.xdwalker.cn/#/home',
      // url: '/static/test.html',
      // url: 'http://map.xdwalker.cn',
      // url: '/static/html/map.html',
      // url: '/static/html/wapian.html',
      // url: 'https://baidu.com',
      // url: '/static/html/daohang.html',
      start: {
        coordinate: {
          longitude: 115.94216666666667,
          latitude: 39.07215055555555
        },
        name: '杏秋苑' //,
        //poiId:null//"B000A28DAE"
      }, //起点
      wayPoints: [
        // {
        //   coordinate: {
        //     latitude: 29.68751708984375,
        //     longitude: 106.5243967013889
        //   },
        //   name: '渝北区' //,
        //   //poiId:null//"B000A28DAE"
        // }
      ], //途径点
      end: {
        coordinate: {
          longitude: 115.94216666666667,
          latitude: 39.07215055555555
        },
        name: '保定' //,
        //poiId:null//B000A8UIN8"
      }, //终点
      carInfo: {
        carNumber: '京N66Y66', //车牌号
        carType: '0', //设置车辆类型 0-燃油客车，1-燃油货车，2-纯电动客车，3-纯电动货车，4-插电式混动汽车，5-插电式混动货车，11-摩托车
        motorcycleCC: 7, //设置摩托车排量（cc）
        restriction: true, //设置是否躲避车辆限行。
        vehicleAxis: '2', //设置货车的轴数，carType = 1时候生效，取值[0-255]，默认为2
        vehicleHeight: '3.56', //设置货车的高度，单位：米，carType = 1时候生效，取值[0-25.5] 如:1.8，1.5等等。
        vehicleLength: '6', //设置货车的最大长度，单位：米，carType = 1时候生效，取值[0-25] 如:1.8，1.5等等，默认6米
        vehicleLoad: '25.99', //设置货车的总重，即车重+核定载重，单位：吨，carType = 1时候生效，取值[0-6553.5]
        vehicleLoadSwitch: false, //设置货车重量是否参与算路
        vehicleSize: '2', //设置货车的大小，1-微型货车 2-轻型/小型货车 3-中型货车 4-重型货车 默认为2
        vehicleWeight: '20', //设置货车的核定载重，单位：吨，carType = 1时候生效，取值[0-6553.5]
        vehicleWidth: '2.5' //设置货车的最大宽度，单位：米，carType = 1时候生效，取值[0-25.5] 如:1.8，1.5等等。默认2.5米
      } //设置车辆信息，进行尾号限行与货车导航
    };
  },
  onReady() {
    var currentWebview = this.$scope.$getAppWebview() //此对象相当于html5plus里的plus.webview.currentWebview()。在uni-app里vue页面直接使用plus.webview.currentWebview()无效
    console.log(111111, currentWebview)
    setTimeout(function() {
      const wv = currentWebview.children()[0]
      console.log(333333, wv)
      // wv.setStyle({top:150,height:300})
      wv.evalJS('evalJS({"name": "1123", "id": 2})')
    }, 1000); //如果是页面初始化调用时，需要延时一下
    // setInterval(function() {
    //   const wv = currentWebview.children()[0]
    //   wv.evalJS('callTest({"name": "1123", "id": 2})')
    // }, 1000)
  },
  onLoad() {
    this.xdInit()
    // this.evalJs()
    console.log(2222222, this.$scope.$getAppWebview())
    // this.preloadWebView()
    // setInterval(() => {
    //   console.log('sendMessageToH5')
    //   this.sendMessageToH5({ message: 'Hello from uni-app!' });
    // }, 1000);
    // this.sendMsg();
    // this.initMap();
    // this.showRoute()
    // setTimeout(() => {
    //   this.url = 'https://ditu.amap.com/'
    // }, 10000)
    // 从Webview发送消息给H5页面
    // uni.postMessage({
    //   type: 'messageType',
    //   data: 'messageData'
    // });
  },
  methods: {
    preloadWebView() {
      uni.preloadPage({
        url: `/pages/webview/webview?url=${this.baseUrl}/#/search`,
        success: res => {
          console.log('preloadWebView', res)
          // 预加载成功的回调函数
        },
        fail: err => {
          // 预加载失败的回调函数
        }
      })
    },
    // 调用 webview 内部逻辑
    // evalJs() {
    //   this.$refs.webview.evalJs("evalJs('fsfsd')");
    // },
    
   xdInit() {
     // this.getPermission()
     // console.log(1111112, XdModule)
     // XdModule.gotoNativePage()
     XdModule.start()
     // console.log('uniapp',222222)
     XdModule.setXdLocationUniCallback(this.xdCallback)
     // console.log('uniapp',33333)
   },
     xdCallback(res) {
       // console.log('xdCallback', res)
       // JSON.stringify(res)
       // let result = JSON.stringify(res)
       
       const {longitude, latitude, bearing, isGps, flag} = res
       // isGps 1 是地上 0是地下    flag -100 上坡中
       let params = `lng=${longitude}&lat=${latitude}&angle=${bearing}&isGps=${isGps}&flag=${flag}`
       let url = this.baseUrl + '/#' + this.path
         
       if (url.includes('?')){
         this.url = `${url}&${params}`
       } else {
         this.url = `${url}?${params}`
       }
       // console.log('this.url', this.url)
       // this.url = `http://map.xdwalker.cn/#/home?`;
       // this.url = `http://192.168.6.11:8888/#/home?lng=${longitude}&lat=${latitude}&angle=${bearing}`;
       // console.log('this.url', this.url)
       // ?lng=115.9425612581369&lat=39.07339273223694&angle=322.6399841308594
     },
    sendMsg() {
      
    },
    message(e) {
      console.log('uni-------e', e);
      console.log('uni-------data', e.detail.data);
      let { path, query, type, msg, routeData } = e.detail.data[0];
      // 判断type参数是否为SDK, 调用SDK内部方法
      if (type == 'SDK') {
        if (msg == 'stopNavigation') {
          XdModule.stopNavigation()
        } else if (msg == 'startNavigation') {
          XdModule.startNavigation(routeData)
        }
      }
      // this.path = query.length > 0 ? `path?${query}` : path
      let data = e.detail.data[0];
      let url = query.length > 0 ? `/pages/webview/webview?url=${this.baseUrl}/#${path}?${query}` : `/pages/webview/webview?url=${this.baseUrl}/#${path}?test=1`
      uni.navigateTo({
        url: url
      })
      
      // console.log('Received message from H5:', msg);
      // this.url = 'http://192.168.6.11:8888/home?lng=123&lat=39&angle=31';

      // if (msg == 'openAmp') {
      //   console.log('收到h5消息，跳转高德');
      //   // this.url = '/static/html/amap.html';
      //   this.showRoute()
      // }

      // uni.postMessage((event) => {
      //   console.log('Received message from H5:', event.data);
      //   this.url = "http://192.168.6.11:8080/about?msg=123&text=test"
      // });
    },
    initMap() {
      console.log('sdkwx', sdkwx);
      console.log('OneNavi', OneNavi);
      //隐私合规接口
      var isContains = true; //隐私权政策是否包含高德开平隐私权政策  true是包含
      var isShow = true; //隐私权政策是否弹窗展示告知用户 true是展示
      sdkwx.updatePrivacyShow(isContains, isShow);

      var isAgree = true; //隐私权政策是否取得用户同意  true是用户同意
      sdkwx.updatePrivacyAgree(isAgree);

      // this.showRoute();
    },
    
    showRoute() {
      let that = this;
      //开始导航，参数全部可选
      OneNavi.showRoute(
        {
          //start:this.start,//起点，不设置当前位置做为起点
          //wayPoints:this.wayPoints,//途径点，不超过3个
          end: this.end, //终点,
          pageType: 1, //页面类型，0:进入路线页面， 1：进入导航页面
          //broadcastMode:2,//设置播报模式 1-简洁播报 2-详细播报 3-静音模式
          //carDirectionMode:1, //设置导航视角,1-正北向上 2-车头向上
          //carInfo:this.carInfo,//设置车辆信息，进行尾号限行与货车导航
          //dayAndNightMode:0, //设置导航页面昼夜模式,0-自动切换 1-白天 2-夜间
          //multipleRouteNaviMode:true, //设置是否多路线导航模式，true:多路线导航模式, false:单路线导航模式 默认为true
          naviMode: 2, //1-实时导航 2-模拟导航
          //needCalculateRouteWhenPresent:true,//启动组件进行直接导航时，设置是否进行算路，true : 算路，false : 不会算路。默认为true。
          needDestroyDriveManagerInstanceWhenNaviExit: true, //退出导航组件是否销毁导航实例,true-退出导航页时停止导航，退出组件时销毁导航 false-退出组件不会销毁导航；当使用组件直接导航时，退出导航页也不会停止导航
          //routeStrategy:10, //设置组件规划路线的策略，默认为速度优先+躲避拥堵+距离较短,参考https://a.amap.com/lbs/static/unzip/Android_Navi_Doc/com/amap/api/navi/enums/PathPlanningStrategy.html
          //scaleAutoChangeEnable:true, //设置比例尺智能缩放是否开启
          //secondActionVisible:false, //设置组件导航页是否显示下下个路口引导，默认不显示,注意：该接口仅驾车模式有效
          //showCrossImage:true, //设置驾车导航时是否显示路口放大图
          showExitNaviDialog: true, //设置退出导航组件是否显示退出弹框
          //showRouteStrategyPreferenceView:false, //表示设置路径规划偏好策略页面是否显示
          //showVoiceSetings:false, //是否展示导航语音播报设置项
          theme: 0, //组件主题 范围0-2分别表示蓝色，白色， 黑色
          //trafficEnabled:false, //导航组件路况开关是否打开, 默认为false
          useInnerVoice: true //是否使用内部语音播报 注意：6.1.0版本开始，默认值改为true
        },
        function (res) {
          console.log(res);
          //回调处理
          that.onNaviCallback(res.type, res.data);
        }
      );
    },
    onNaviCallback(type, data) {
      console.log('onNaviCallback===', type, data);
      //回调处理，参考https://a.amap.com/lbs/static/unzip/Android_Navi_Doc/com/amap/api/navi/INaviInfoCallback.html
      if (type == 'onArriveDestination') {
        //到达目的地后回调函数。
        var isEmulaterNavi = data; //true代表是模拟导航到达目的地，false代表实时导航到达目的地
        OneNavi.exitRoute();

        setTimeout(() => {
          console.log('跳转蜂鸟');
          this.url = '/static/html/map.html?msg=startNavi';
        }, 3000);
      } else if (type == 'onArrivedWayPoint') {
        //驾车路径导航到达某个途经点的回调函数
        var wayID = data; //到达途径点的编号，标号从0开始，依次累加。
      } else if (type == 'onBroadcastModeChanged') {
        //播报模式变化回调
        var mode = data; //1-简洁播报 2-详细播报 3-静音
      } else if (type == 'onCalculateRouteFailure') {
        //驾车路径规划失败后的回调函数
        var errorInfo = data; //errorInfo-参见PathPlanningErrCode: https://a.amap.com/lbs/static/unzip/Android_Navi_Doc/index.html
      } else if (type == 'onCalculateRouteSuccess') {
        //路线规划成功回调
        var ids = data; //路线索引id数组，第一条为12，第二条为13，第三条为14
      } else if (type == 'onDayAndNightModeChanged') {
        //昼夜模式设置变化回调
        var mode = data; //0-自动切换 1-白天 2-夜间
      } else if (type == 'onExitPage') {
        //退出组件或退出组件导航的回调函数
        var pageType = data; //1：退出导航页面，2:退出组件页面（包含路径规划、搜索和导航）
      } else if (type == 'onGetNavigationText') {
        //导航播报信息回调函数
        var s = data; //播报文字
      } else if (type == 'onInitNaviFailure') {
        //导航初始化失败时的回调函数
      } else if (type == 'onLocationChange') {
        //当GPS位置有更新时的回调函数
        var location = data; //当前位置的定位信息,字段参考https://a.amap.com/lbs/static/unzip/Android_Navi_Doc/index.html
      } else if (type == 'onMapTypeChanged') {
        //组件地图白天黑夜模式切换回调
        var mapType = data; //3-黑夜，4-白天
      } else if (type == 'onNaviDirectionChanged') {
        //导航视角变化回调
        var naviMode = data; //导航视角, 1-正北朝上模式 2-车头朝上状态
      } else if (type == 'onReCalculateRoute') {
        //重新规划的回调
        var type = data; //type-参见ReCalculateRouteType: https://a.amap.com/lbs/static/unzip/Android_Navi_Doc/index.html
      } else if (type == 'onScaleAutoChanged') {
        //比例尺智能缩放设置变化回调
        var enable = data; //是否开启
      } else if (type == 'onStartNavi') {
        //启动导航后的回调函数
        var type = data; //1:实时导航 2:模拟导航 3:巡航模式(android) <=0:未开始导航
      } else if (type == 'onStopSpeaking') {
        //停止播报回调。当退出组件导航页，或切换组件的播报模式为静音的时候，会触发该回调
      } else if (type == 'onStrategyChanged') {
        //切换算路偏好回调
        var strategy = data; //切换后偏好 参考https://a.amap.com/lbs/static/unzip/Android_Navi_Doc/index.html
      }
    }
  },
  mounted() {
    // let angle = 0
    // let lng = 115.9417836
    // let lat = 39.0739957
    // console.log(`http://map.xdwalker.cn/#/home?lng=${lng}&lat=${lat}&angle=${angle}`)
    // setInterval(() => {
    //   lng += 0.00001
    //   lat += 0.00001
    //   angle += 1
    //   this.url = `http://map.xdwalker.cn/#/home?lng=${lng}&lat=${lat}&angle=${angle}`;
    // }, 1000)
    // 地图初始化设置参数
    // var options = {
    //     container: document.getElementById('map'),
    //     appName: '蜂鸟研发SDK_2_0',
    //     key: '57c7f309aca507497d028a9c00207cf8',
    //     mapID: '1514920297309614082',
    //     themeID: '1580453922356207618',
    //
    // 杏秋苑
    // var options = {
    //     container: document.getElementById('map'),
    //     appName: 'uniapp',
    //     key: '300256ebc81040c4a9d7d7c930626bb3',
    //     mapID: '1670616269829443585',
    //     themeID: '1673626978418909185',
    // }
    // console.log('$refs=======', this.$refs.map.$el)
    // console.log('window======', window)
    // var options = {
    //     // container: document.getElementById('map'),
    //     container: this.$refs.map.$el,
    //     appName: 'uniapp',
    //     key: '300256ebc81040c4a9d7d7c930626bb3',
    //     mapID: '1670616269829443585',
    //     themeID: '1673626978418909185',
    // }
    // new fengmap.FMMap(options);
  }
};
</script>

<style lang="scss">
// #map {
//   width: 100%;
//   height: calc(100vh - 96rpx);
//   z-index: 1111;
//   position: absolute;
// }
#my-webview {
  position: absolute;
  top: 100rpx;
  left: 0rpx;
  width: 100%;
  height: 200px !important;
  // margin-top: 100rpx;
}
</style>
