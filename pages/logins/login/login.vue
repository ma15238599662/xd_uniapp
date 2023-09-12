<template>
  <view class="login">
    <fui-nav-bar title="" @leftClick="back" @rightClick="gotoPage('/pages/logins/register/register')">
      <fui-icon name="close"></fui-icon>
      <template v-slot:right>
        <text>注册</text>
        <!-- <fui-button text="注册" btnSize="mini" :disabled="isEdit" bold @click="save"></fui-button> -->
      </template>
    </fui-nav-bar>
    <view class="login_title">
      <text>欢迎登录</text>
    </view>
    <view class="login_form">
      <fui-form ref="form" top="0">
        <view class="form_input_wrap">
          <fui-input label="" :borderTop="false" maxlength="11" borderTop placeholder="手机号" v-model="formData.phone"></fui-input>
          <fui-input v-show="type == 'password'" maxlength="20" placeholder="密码" :password="visiblePwd" v-model="formData.password">
          	<fui-icon :name="visiblePwd?'invisible':'visible'" color="#B2B2B2" :size="50" @click="visiblePwd = !visiblePwd"></fui-icon>
          </fui-input>
          <fui-input v-show="type == 'code'" label="" :padding="['28rpx', 0, '26rpx', '32rpx']" placeholder="验证码" v-model="formData.code">
            <fui-countdown-verify ref="fui_cdv" @send="getCode"></fui-countdown-verify>
          </fui-input>
        </view>
        
        <view class="form_type">
          <text @click="changeType">{{type === 'password' ? '验证码登录' : '密码登录'}}</text>
        </view>
        
        <view class="fui-btn__box">
        	<fui-button :loading="loginBtn" radius="96rpx" background="#465CFF" disabledBackground="#D0D3D4" :disabled="isCanLogin" text="登录" bold @click="login"></fui-button>
        </view>
        <view class="forget_password_wrap">
          <text @click="gotoPage('/pages/logins/forgotPassword/forgotPassword')">忘记密码？</text>
        </view>
				<view class="fui-clause--cell fui-clause--wrap">
					<fui-label>
						<view class="fui-clause--cell">
							<fui-checkbox :scaleRatio="0.8" @change="agreeChange"></fui-checkbox>
							<text class="fui-clause--text">阅读并同意</text>
						</view>
					</fui-label>
					<text class="fui-color__link">《用户使用协议》</text>
          和
          <text class="fui-color__link">《隐私政策》</text>
				</view>
      </fui-form>
    </view>
    
    <view class="other_wrap">
      <view class="other_login_text">
        <text>其他登录方式</text>
      </view>
      <view class="line"></view>
      <view class="other_login">
        <fui-icon name="mobile" color="#558ee9" @click="phoneLogin"></fui-icon>
        <image src="@/static/images/weixin.png" mode="" @click="wechatLogin"></image>
      </view>
    </view>
    
  </view>
</template>

<script>
  import { UserService } from '@/services/api.service';
  import form from '@/components/firstui/fui-validator/fui-validator'
  //勾选协议校验
  function checkAgree(agree) {
  	return agree
  }
  export default {
    data() {
      return {
        type: 'password',
        visiblePwd: true,
        loginBtn: false,
        timer: null,
        formData: {
          phone: '',
          password: '',
          code: '',
          agree: false
        },
        rules: [{
          name: "phone",
          rule: ["required", "isMobile"],
          msg: ["请输入手机号", "请输入正确的手机号"]
        }, {
          name: "password",
          rule: [this.type === 'password' ? "required" : "", "minLength:6", "maxLength:20"],
          msg: ["请输入密码", "密码为6~20位数字和字母或符号", "密码为6~20位数字和字母或符号"]
        }, {
          name: "code",
          rule: [this.type === 'code' ? "required" : ""],
          msg: ["请输入验证码"]
        }, {
          name: "agree",
          validator: [{
            msg: "请勾选并同意《用户使用协议》和《隐私政策》",
            method: checkAgree
          }]
        }]
      };
    },
    computed: {
      isCanLogin() {
        let isCan = false
        if (this.type == 'password') {
          isCan = this.formData.phone != '' && this.formData.password != '' 
        } else {
          isCan = this.formData.phone != '' && this.formData.code != ''
        }
        return !isCan
      },
    },
    methods: {
      // 获取验证码
      getCode() {
        let phone = this.formData.phone
        let params = {
          action: 2, // 1: 注册，2: 登录，3: 找回密码
          phone
        }
        let isPhone = this.$base.tools.isPhone(phone);
        if (!isPhone) return this.fui.toast('请输入正确手机号！');
        UserService.getSms(params).then((res) => {
          if (res.code == 200) {
            this.fui.toast('验证码发送成功')
            this.$refs.fui_cdv?.success()
          } else {
            this.fui.toast('验证码发送失败')
            this.$refs.fui_cdv?.reset()
          }
        })
      },
      changeType() {
        let type = this.type
        this.type = type === 'password' ? 'code' : 'password'
        if (type === 'password') {
          this.formData.password = ''
        } else {
          this.formData.code = ''
        }
      },
      agreeChange(e) {
        this.$set(this.formData, 'agree', e.checked)
      },
      login() {
        this.$debounce.canDoFunction({
          time: 2000,
          immediate: true,
          key: 'register',
          success: async () => {
            let res = form.validator(this.formData, this.rules);
            console.log(res)
            if (res.isPassed) {
              let params = {
                ...this.formData
              }
              console.log(params)
              uni.showLoading({
              	mask: true,
              	title: '正在登录，请稍后...',
                
              })
              this.loginBtn = true
              let res = await UserService.login(params)
              
              console.log(res)
              if (res.code === 200) {
                 this.$store.dispatch('auth/setUserInfo', {
                   avatar: res.data.logo_url,
                   ...res.data
                 })
                 setTimeout(() => {
                   uni.hideLoading()
                   this.loginBtn = false
                   uni.switchTab({
                     url: '/pages/tabbar/my/my',
                     animationDuration: 300,
                     animationType: 'slide-out-bottom'
                   })
                 }, 2000)
              } else {
                
                setTimeout(() => {
                  uni.hideLoading()
                  this.loginBtn = false
                  this.fui.toast(res.msg)
                }, 1000)
              }
            	// this.fui.toast('校验通过！')
             
            } else {
            	this.fui.toast(res.errorMsg)
            }
          },
          fail: () => {
            console.log('频繁操作');
          }
        });
      },
      gotoPage(url) {
        uni.navigateTo({
          url,
          animationDuration: 300,
          animationType: 'slide-in-right'
        })
      },
      back() {
        uni.navigateBack({
          delta: 1,
          animationType: 'slide-out-bottom',
          animationDuration: 300,
        })
      },
      wechatLogin() {
        console.log('微信登录')
        uni.login({ 
        	"provider": "weixin",
        	"onlyAuthorize": true, // 微信登录仅请求授权认证
        	success: async (event) => {
        		const {code} = event
            uni.showLoading({
            	mask: true,
            	title: '授权成功，正在登录，请稍后...',
            })
            let res = await UserService.wechatLogin({wechat_code: code})
            console.log('微信登录  event=====', res)
            if (res.code === 200) {
               this.$store.dispatch('auth/setUserInfo', {
                 avatar: res.data.logo_url,
                 ...res.data
               })
               setTimeout(() => {
                 uni.hideLoading()
                 uni.switchTab({
                   url: '/pages/tabbar/my/my',
                   animationDuration: 300,
                   animationType: 'slide-out-bottom'
                 })
               }, 1000)
            } else {
              setTimeout(() => {
                uni.hideLoading()
                this.fui.toast(res.msg)
              }, 1000)
            }
        	},
        	fail: function (err) {
                // 登录授权失败  
                // err.code是错误码
                console.log('err===', err)
            }
        })
      },
      
      phoneLogin() {
        console.log('手机号一键登录');
        var that = this;
        // 预登陆
        uni.preLogin({
          provider: 'univerify',
          success: () => {
            uni.login({
              provider: 'univerify',
              univerifyStyle: {
                fullScreen: true, // 是否全屏显示，true表示全屏模式，false表示非全屏模式，默认值为false。
                backgroundColor: '#ffffff', // 授权页面背景颜色，默认值：#ffffff
                phoneNum: {
                  color: '#333', // 手机号文字颜色 默认值：#000000
                  fontSize: '22' // 手机号字体大小 默认值：18
                },
                slogan: {
                  color: '#707070', //  slogan 字体颜色 默认值：#8a8b90
                  fontSize: '12'
                },
                // icon: {
                //   path: 'static/pic/xx.png' // 自定义显示在授权框中的logo，仅支持本地图片 默认显示App logo
                // },
                authButton: {
                  normalColor: '#FFBB24', // 授权按钮正常状态背景颜色 默认值：#3479f5
                  highlightColor: '#FFBB24', // 授权按钮按下状态背景颜色 默认值：#2861c5（仅ios支持）
                  disabledColor: '#73aaf5', // 授权按钮不可点击时背景颜色 默认值：#73aaf5（仅ios支持）
                  textColor: '#ffffff', // 授权按钮文字颜色 默认值：#ffffff
                  title: '本机号码一键登录' // 授权按钮文案 默认值：“本机号码一键登录”
                },
                otherLoginButton: {
                  visible: 'false', // 是否显示其他登录按钮，默认值：true"visible": "true", // 是否显示其他登录按钮，默认值：true
                  normalColor: '#f8f8f8', // 其他登录按钮正常状态背景颜色 默认值：#f8f8f8
                  highlightColor: '#dedede', // 其他登录按钮按下状态背景颜色 默认值：#dedede
                  textColor: '#000000', // 其他登录按钮文字颜色 默认值：#000000
                  title: '其他方式登录', // 其他登录方式按钮文字 默认值：“其他登录方式”"borderWidth": "1px", // 边框宽度 默认值：1px（仅ios支持）
                  borderColor: '#707070', //边框颜色 默认值： #c5c5c5（仅ios支持）
                  borderWidth: '1px' // 边框宽度 默认值：1px（仅ios支持）
                },
                privacyTerms: {
                  defaultCheckBoxState: 'true', // 条款勾选框初始状态 默认值： true
                  textColor: '#8a8b90', // 文字颜色 默认值：#8a8b90
                  termsColor: '#1d4788', //  协议文字颜色 默认值： #1d4788
                  prefix: '我已阅读并同意', // 条款前的文案 默认值：“我已阅读并同意”
                  suffix: '并使用本机号码登录', // 条款后的文案 默认值：“并使用本机号码登录”
                  fontSize: '12', // 字体大小 默认值：12,
                  // uncheckedImage: 'static/pic/elliptical.png', // 可选 条款勾选框未选中状态图片（仅支持本地图片 建议尺寸 24x24px）(3.2.0+ 版本支持)
                  // checkedImage: 'static/pic/elliptical-1.png', // 可选 条款勾选框选中状态图片（仅支持本地图片 建议尺寸24x24px）(3.2.0+ 版本支持)
                  privacyItems: [
                    // 自定义协议条款，最大支持2个，需要同时设置url和title. 否则不生效
                    // {
                    //   url: 'https://xxx', // 点击跳转的协议详情页面
                    //   title: '用户协议' // 协议名称
                    // },
                    // {
                    //   url: 'https://xxx', // 点击跳转的协议详情页面
                    //   title: '隐私政策' // 协议名称
                    // }
                  ]
                }
              },
              success: async (res) => {
                console.log('一键登录调用返回的数据', res);
                let result = await UserService.phoneLogin(res.authResult)
                console.log(result)
                if (result.code === 200) {
                  
                  that.$store.dispatch('auth/setUserInfo', {
                    avatar: res.data.logo_url,
                    ...res.data
                  })
                  setTimeout(() => {
                    uni.showToast({
                      title: '登录成功',
                      icon: 'none'
                    });
                    uni.closeAuthView(); //关闭一键登录弹出窗口
                    uni.switchTab({
                      url: '/pages/tabbar/my/my',
                      animationDuration: 300,
                      animationType: 'slide-out-bottom'
                    })
                  }, 1000)
                } else {
                  setTimeout(() => {
                    uni.closeAuthView(); // 关闭一键登录弹出窗口
                  }, 3000)
                }
                
                // console.log("云函数调用返回数据", dataRes)
              },
              fail(err) {
                // 登录失败或者点击其他登录方式,自定义按钮等
                console.log('一键登录uni.login失败', err);
                uni.showToast({
                  title: err.errMsg || err.metadata?.resultDesc,
                  icon: 'none'
                });
      
                setTimeout(() => {
                  uni.closeAuthView(); //关闭一键登录弹出窗口
                }, 500);
              }
            });
          },
          fail(res) {
            console.log('一键登录uni.preLogin失败', res);
            if (res.errMsg != 'login:ok') {
              // 这里注意有个小坑: 不同运营商,返回的报错字段不同, 经过测试, 以下几乎包含了三大运营商报错字段
              uni.showToast({
                title: res.errMsg || res.metadata.resultMsg || res.metadata.error_data || res.metadata.resultDesc || '请检查是否插入有效sim卡及开启蜂窝数据网络',
                icon: 'none'
              });
            }
            //如果手机没有插入有效的sim卡，或者手机蜂窝数据网络关闭，
            //都有可能造成预登录校验失败。
      
            setTimeout(() => {
              // 预登陆失败, 做其他操作
            }, 500);
          }
        });
      }
      
      // // 倒计时
      // countdown(time) {
      //   let str = ''
      //   time--
      //   if (this.timer) clearTimeout(this.timer)
      //   if (time >= 0) {
      //     str = `获取验证码 ${time} 秒`
      //     this.timer = setTimeout(() => {
      //       this.countdown(time)
      //     }, 1000)
      //   } else {
      //      str = `获取验证码`
      //      this.codeDisabled = !this.codeDisabled
      //   }
      //   this.countdownText = str
      // },
    }
  }
</script>

<style lang="scss">
.login {
  height: 100%;
  background-color: var(--fui-bg-color);
  .login_title {
    margin: 64rpx 32rpx 32rpx;
    font-size: 64rpx;
  }
  .other_wrap {
    position: absolute;
    bottom: 160rpx;
    width: 100%;
    .other_login_text {
      width: 100%;
      text-align: center;
    }
    .line {
      position: relative;
      width: 80%;
      left: 10%;
      height: 1px;
      border-top: 1px solid #ccc;
      margin: 32rpx 0;
    }
    .other_login{
      display: flex;
      align-items: center;
      justify-content: center;
      image {
        width: 64rpx;
        height: 64rpx;
        margin-left: 64rpx;
      }
    }
  }
  
  .login_form {
    padding: 32rpx;
    .fui-input__border-top {
      height: 0 !important;
    }
    .form_input_wrap {
      min-height: 224rpx;
      margin-left: -32rpx;
    }
    .forget_password_wrap {
      text-align: center;
      line-height: 128rpx;
      // color: #9E9E9E;
      font-size: 32rpx;
      color: var(--fui-color-minor);
    }
    .form_type {
      text-align: right;
      line-height: 96rpx;
    }
    .fui-clause--cell {
    	display: flex;
    	align-items: center;
    	justify-content: center;
    	font-size: 24rpx;
    }
    
    .fui-clause--wrap {
    	width: 100%;
    	// margin-top: 64rpx;
    }
    
    .fui-clause--text {
    	padding-left: 16rpx;
    	/* #ifdef H5 */
    	cursor: pointer;
    	/* #endif */
    }
    
    .fui-color__link {
    	color: var(--fui-color-link-filename);
    	/* #ifdef H5 */
    	cursor: pointer;
    	/* #endif */
    }
    
    
  }
  
}
</style>
