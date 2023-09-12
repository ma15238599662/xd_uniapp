// 本文件由FirstUI授权予行道京雄（北京）信息技术有限公司（手机号： 13 0   3 1 055  5 27，身份证尾号：DWQD02）专用，请尊重知识产权，勿私下传播，违者追究法律责任。

import App from './App'
import fui from './common/fui-app'
import fuiConfig from './components/firstui/fui-config'
import store from './store'

import ApiClinet from './services/api-clinet';
import AppConfig from './config/app.config'
import {Base} from './utils/base';
import debounce from "./utils/debounce.js";

import emptyData from "./components/empty-data.vue";
import loadMore from "./components/load-more.vue";
import wkiwiLoading from "./components/wkiwi-loading.vue";
import baseMixin from './mixins/base.js';

//全局组件配置
uni.$fui = fuiConfig
//兼容nvue
uni.fui = fui


// #ifdef VUE3
import {
	createSSRApp
} from 'vue';
/*
  在 Vue3 中，如果 nvue 使用了 Vuex 的相关 API，
  需要在 main.js 的 createApp 的返回值中 return 一下 Vuex
*/
import Vuex from "vuex";
export function createApp() {
	const app = createSSRApp(App)

  // 引入基础mixin封装
  app.mixin(baseMixin)
    
  app.component("empty-data", emptyData);
  //底部加载更多组件
  app.component("load-more", loadMore);
  //自定义加载
  app.component("wkiwi-loading", wkiwiLoading);

  
  
	app.use(store)
	app.config.globalProperties.fui = fui;
	// app.config.globalProperties.http = http;
  app.config.globalProperties.$store = store
  
  // Ajax请求, 全局挂载
  app.config.globalProperties.$http = ApiClinet;
  app.config.globalProperties.$imgUrl = AppConfig.IMG_URL;
  app.config.globalProperties.$debounce = debounce;
  app.config.globalProperties.$base = new Base();
	return {
		Vuex,
		app
	}
}
// #endif

// #ifndef VUE3
import Vue from 'vue'
import { VueBus } from './plugins/vue-bus';
// 全局事件中心
Vue.use(VueBus);

// 状态, 全局挂载
// Vue.prototype.$store = store;
// Ajax请求, 全局挂载
Vue.prototype.$http = ApiClinet;
Vue.prototype.$imgUrl = AppConfig.IMG_URL;
Vue.prototype.$debounce = debounce;
Vue.prototype.$base = new Base();

Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.fui = fui
Vue.config.productionTip = false;

Vue.component("empty-data", emptyData);
//底部加载更多组件
Vue.component("load-more", loadMore);
//自定义加载
Vue.component("wkiwi-loading", wkiwiLoading);

// 引入基础mixin封装
let baseMixin = require("@/mixins/base.js");
Vue.mixin(baseMixin);

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
// #endif
