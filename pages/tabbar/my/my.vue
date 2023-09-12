<template>
  <view class="my_wrap">
		<view class="user_box">
      <view class="user_wrap" v-if="!userInfo.nickname && !userInfo.phone" @click="href('/pages/logins/login/login')">
        <fui-avatar class="user_avatar">
          <fui-icon name="my-fill" color="#fff"></fui-icon>
        </fui-avatar>
        <text class="user_value">登录/注册</text>
      </view>
        <view v-else class="user_wrap" @click="href('/pages/my/personalInfo/personalInfo')">
          <fui-avatar class="user_avatar">
            <fui-icon v-if="!userInfo.avatar" name="my-fill" color="#fff"></fui-icon>
            <fui-avatar v-else :src="getAvatar"></fui-avatar>
          </fui-avatar>
          <text class="user_value">{{userInfo.nickname ? userInfo.nickname : formatPhone(userInfo.phone) }}</text>
          
          <text class="user_icon"> 
            <fui-icon name="arrowright" color="#fff" :size="50"></fui-icon>
          </text>
        </view>
			
		</view>
		<view class="fui-list__wrap">
			<fui-list-cell @click="href(item.page)" arrow bottomRight="32" v-for="(item,index) in list" :key="index">
				<view class="fui-align__center">
					<image class="fui-list__icon" :src="`/static/images/my/manage/0${index+1}.png`"
						mode="widthFix"></image>
					<text class="fui-list__text" style="margin-right: -20rpx;">{{item.text}}</text>
				</view>
			</fui-list-cell>
		</view>
      
    <fui-modal :show="show" descr="您还未登录，请先登录" :buttons="['去登录']" radius="10" :width="500" :maskClosable="true"
      direction="row" @click="clickHanler" @cancel="cancel"></fui-modal>
	</view>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
	import $fui from '@/components/firstui/fui-clipboard';
  import authService from '@/services/auth.service';
  import { UserService } from '@/services/api.service';
  import AppConfig from '@/config/app.config';
  const { OSS_URL } = AppConfig;
  
	export default {
		data() {
			return {
        ...this.$base.tools,
				resUrl: '@/static/images',
        show: false,
				list: [{
						text: '收藏夹',
						src: 'edition',
						page: '/pages/my/favorites/favorites'
					}, {
						text: '常用地址',
						src: 'address',
						page: '/pages/my/address/address'
					}, {
						text: '历史路线',
						src: 'help',
						page: '/pages/my/historyRoute/historyRoute'
					}, {
						text: '离线地图',
						src: 'aboutus',
						page: '/pages/my/offMap/offMap'
					}, {
						text: '位置共享',
						src: 'aboutus',
						page: '/pages/my/shareLocation/shareLocation'
					}, {
						text: '设置',
						src: 'aboutus',
						page: '/pages/my/set/set'
					}
				]
			}
		},
    computed: {
      getAvatar() {
        return `${OSS_URL}/location/${this.userInfo.avatar}`
      }
    },
		onLoad() {
      // console.log('tools====',this.$base.tools)
      // console.log('auth=====', authService.auth)
      this.init()
		},
    onPullDownRefresh() {
      this.init()
      setTimeout(function () {
        uni.stopPullDownRefresh();
      }, 2000);
    },
		methods: {
			...mapActions(['getStatus']),
      init() {
        // console.log('url===', `${OSS_URL}/location/${this.userInfo.avatar}`)
        this.getUserInfo()
      },
			href(page, e) {
        if (!this.token && page == '/pages/logins/login/login') {
          uni.navigateTo({
            url: '/pages/logins/login/login',
            animationDuration: 300,
            animationType:'slide-in-bottom'
          })
        } else if (!this.token && page == '/pages/my/set/set') {
          this.show = true
        } else {
          this.fui.href(page)
        }
			},
			getLink(link, e) {
				$fui.getClipboardData(link, res => {
					this.fui.toast('链接复制成功');
				}, e);
			},
      async getUserInfo() {
        if (!this.token) return
        let res = await UserService.get()
        if (res.code === 200) {
          this.$store.dispatch('auth/setUserInfo', res.data)
        }
      },
      clickHanler() {
        this.show = false
        uni.navigateTo({
          url: '/pages/logins/login/login',
          animationDuration: 300,
          animationType:'slide-in-bottom'
        })
      },
      cancel() {
        this.show = false
      },
		}
	}
</script>

<style lang="scss">
  .my_wrap {
		background: url('../../../static/images/my/myBg@2x.png') no-repeat center;
		background-size: cover;
		height: 100%;
		overflow: hidden;
    .user_box {
    	width: 100%;
      .user_wrap {
				padding: 136rpx 48rpx 78rpx 48rpx;
				display: flex;
				align-items: center;
        .user_avatar {
          width: 72rpx;
          height: 72rpx;
					padding: 36rpx;
          vertical-align: middle;
        }
        .user_value {
          color: #999999;
					margin-left: 28rpx;
					font-size: 32rpx;
        }
        .user_icon {
          position: absolute;
          right: 40rpx;
        }
        
      }
    }
  
    
    .fui-list__icon {
    	width: 48rpx;
    	height: 48rpx;
    }
    
    .fui-list__text {
    	padding-left: 32rpx;
    }
    
  }

	.fui-list__wrap {
		background: url('../../../static/images/my/my-argbg.png') no-repeat center;
		background-size: cover;
		padding-top: 32rpx;
		height: 100%;
		overflow: hidden;
	}
	.my_wrap .fui-list__wrap
		.fui-list__cell.fui-list__cell-background {
			padding: 16rpx 32rpx!important;
			.fui-list__text {
				height: 80rpx;
				line-height: 80rpx;
			}
	}
	
</style>
