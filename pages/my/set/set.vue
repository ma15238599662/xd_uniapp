<template>
  <view class="set_page">
    <fui-list-cell @click="href(item.page)" arrow bottomRight="32" v-for="(item,index) in list" :key="index">
      <view class="fui-align__center">
      	<image class="fui-list__icon" :src="`/static/images/my/light/icon_${item.src}_3x.png`"
      		mode="widthFix"></image>
      	<text class="fui-list__text" style="margin-right: -20rpx;">{{item.text}}</text>
      </view>
    </fui-list-cell>
    <fui-button class="logout_btn" radius="96rpx" @click="logout">退出登录</fui-button>
    <fui-modal :show="logoutShow" title="退出登录" descr="是否退出当前账号？" @click="confirm"></fui-modal>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        logoutShow: false,
        list: [{
        		text: '账号安全',
        		src: 'edition',
        		page: '/pages/my/accountSafe/accountSafe'
        	}, {
        		text: '消息通知',
        		src: 'address',
        		page: '/pages/my/address/address'
        	}, {
        		text: '服务协议',
        		src: 'help',
        		page: '/pages/my/historyRoute/historyRoute'
        	}, {
        		text: '关于我们',
        		src: 'aboutus',
        		page: '/pages/my/offMap/offMap'
        	}
        ],
      };
    },
    methods: {
      href(page, e) {
      	 this.fui.toast('功能完善中~')
      },
      logout() {
        this.logoutShow = true
      },
      confirm(e) {
        if (e.index == 1) {
          this.$store.dispatch('auth/logout')
          uni.switchTab({
            url: '/pages/tabbar/my/my',
            animationType: 'pop-in',
            animationDuration: 300
          })
        } 
        this.logoutShow = false
      }
    }
  }
</script>

<style lang="scss">
.set_page {
  padding: 32rpx;
  .fui-list__cell {
    padding: 32rpx !important;
    margin-bottom: 20rpx !important;
    border-radius: 20rpx !important;
  }
  
  .fui-list__icon {
  	width: 48rpx;
  	height: 48rpx;
  }
  
  .fui-list__text {
  	padding-left: 24rpx;
  }
  .logout_btn {
    width: calc(100% - 64rpx) !important;
    position: absolute;
    bottom: 64rpx;
  }
}
    
</style>
