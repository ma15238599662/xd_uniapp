<template>
  <view class="personal_info">
    
    <fui-list-cell @click="href(item.page, index)" arrow bottomRight="32" v-for="(item,index) in list" :key="index">
      <text class="fui-list__text" >{{item.text}}</text>
      <view class="fui-list__value avatar_img" v-if="item.page == 'avatar'">
        <image v-if="item.url" :src="item.url" mode=""></image>
        <fui-icon v-else name="my-fill" color="#fff"></fui-icon>
      </view>
      <view class="fui-list__value" v-else-if="item.page == 'wechat'">
        
        <text v-if="item.value">已绑定</text>
        <text v-else color="red">未绑定</text>
      </view>
      <text v-else class="fui-list__value" >{{item.value}}</text>
    </fui-list-cell>
    <fui-modal :show="show" :title="list[3].value ? '解绑微信' : '绑定微信'" :descr="list[3].value ? '是否解绑微信！' : '是否绑定微信！'" @click="confirm"></fui-modal>
  </view>
</template>

<script>
  import { UserService } from '@/services/api.service';
import authService from '../../../services/auth.service';
  import AppConfig from '@/config/app.config';
  const { OSS_URL } = AppConfig;
  
  export default {
    data() {
      return {
        ...this.$base.tools,
        imgUrl: '',
        show: false,
        list: [
          {
            text: '头像',
            src: 'avatar',
            url: '/static/images/logo.png',
            value: '',
            page: 'avatar'
          },{
						text: '昵称',
						src: 'nickname',
            value: 'xxx',
						page: '/pages/my/setNickname/setNickname'
					},{
						text: '手机号',
						src: 'phone',
            value: '188****1234',
						page: 'phone'
					},{
						text: '微信',
						src: 'wechat',
            value: '',
						page: 'wechat'
					},
        ]
        
      };
    },
    onLoad() {
      this.initData()
      this.imgUrl = this.list[0].url
    },
    methods: {
      // 引入本地图片
      getImageUrl(url) {
        return new URL(url, import.meta.url).href;
      },
      initData() {
        this.list[0].url = `${OSS_URL}/location/${this.userInfo.avatar}`
        this.list[1].value = this.userInfo.nickname
        this.list[2].value = this.formatPhone(this.userInfo.phone)
        this.list[3].value = this.userInfo.wechat_id
      },
      
      async getUserInfo() {
        console.log('token', !this.token)
        if (!this.token) return
        let res = await UserService.get()
        if (res.code === 200) {
          this.$store.dispatch('auth/setUserInfo', res.data)
        }
      },
      href(page, index) {
        if (page === 'avatar') {
          let _this = this
        	uni.chooseImage({
            count: 1 , //默认9
            sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album','camera'], //从相册选择
            success: async (res) => {
              console.log(res)
              let data = await this.upload(res.tempFiles[0])
              console.log('udata===', data)
              if (!data) return 
              let putRes = await UserService.putLogo({logo_url: data})
              console.log('putRes====', putRes)
              if (putRes.code === 200) {
                _this.fui.toast('上传成功')
                let url = `${OSS_URL}/location/${data}`
                console.log(url)
                this.list[0].url = url
                this.$store.dispatch('auth/setUserInfo', {
                  ...this.userInfo,
                  avatar: data
                })
              }
              
              
            }
          });
        } else if (page == 'wechat') {
          this.show = true
          console.log('wechat', page, index)
        } else if (page == 'phone') {
          return
        } else {
        	this.fui.href(page+ `?value=${this.list[index].value}`)
        }
      },
      // 确定后 绑定/解绑 微信
      async confirm(e) {
        console.log('wechat', this.list[3].value)
        if (e.text === '确定') {
          if (!this.list[3].value) {
            // 微信授权
            uni.login({
            	"provider": "weixin",
            	"onlyAuthorize": true, // 微信登录仅请求授权认证
            	success: async (event) => {
            		const {code} = event
                // 绑定微信
                //客户端成功获取授权临时票据（code）,向业务服务器发起登录请求。
                console.log('event===', event)
                let result = await UserService.wechatBind({wechat_code: code})
                if (result.code === 200) {
                  this.fui.toast('绑定成功')
                  this.getUserInfo()
                  this.show = false
                  this.list[3].value = true
                }
            	},
            	fail: function (err) {
                // 登录授权失败  
                // err.code是错误码
                this.fui.toast(err)
              }
            })
          } else {
            // 解绑微信
            let res = await UserService.wechatUnbind()
            if (res.code === 200) {
              this.fui.toast('解绑成功')
              this.getUserInfo()
              this.show = false
              this.list[3].value = false
            }
          }
        } else {
          this.show = false
        }
        
      },
      upload(file){
        let _this = this
        return new Promise((resolve, reject) => {
          console.log('file=====', file)
          let url = `${OSS_URL}/location/`
          uni.uploadFile({
            url,
            name: 'file',
            // header: {},
            // formData:{},
            filePath: file.path,
            success: (res) => {
              //以下成功或失败逻辑根据接口自行处理
              const data = JSON.parse(res.data.replace(/\ufeff/g, "") || "{}")
              console.log('data===', data)
              if (data.msg === 'upload success') {
                //返回上传成功后的图片
                resolve(data.file)
              } else {
                //上传失败
                _this.fui.toast('上传失败')
                reject(false)
              }
            },
            fail: (err) => {
              //上传失败
              _this.fui.toast('上传失败')
              reject(false)
            }
          })
        })
      }
      
    }
  }
</script>

<style lang="scss">
  .personal_info {
    
  }
  .fui-list__text {
    
  }
  .avatar_img {
    width: 50rpx;
    height: 50rpx;
    image {
      height: 100%;
      width: 100%;
    }
    
  }
  .fui-list__value {
    // float: right;
    display: inline-block;
    position: absolute;
    right: 60rpx;
  }

</style>
