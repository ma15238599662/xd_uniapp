<template>
  <view class="forgot_password">
    <view class="forgot_password_title">
      <text>重置密码</text>
    </view>
    <view class="forgot_password_form">
      <fui-form ref="form" top="0">
        <view class="form_input_wrap">
          <fui-input label="" :borderTop="false" maxlength="11" borderTop placeholder="手机号" v-model="formData.phone"></fui-input>
          <fui-input label="" :padding="['28rpx', 0, '26rpx', '32rpx']" maxlength="6" placeholder="验证码" v-model="formData.code">
           <fui-countdown-verify ref="fui_cdv" @send="getCode"></fui-countdown-verify>
          </fui-input>

          <fui-input maxlength="20" placeholder="密码(6~20位数字和字母或符号)" :password="visiblePwd" v-model="formData.password">
            <fui-icon :name="visiblePwd ? 'invisible' : 'visible'" color="#B2B2B2" :size="50" @click="showPwd(1)"></fui-icon>
          </fui-input>
          <!-- <fui-input maxlength="20" placeholder="确认密码(6~20位数字和字母或符号)" :password="visiblePwd" v-model="formData.confirmPwd">
            <fui-icon :name="visibleConfirmPwd ? 'invisible' : 'visible'" color="#B2B2B2" :size="50" @click="showPwd(2)"></fui-icon>
          </fui-input> -->
        </view>

        <view class="fui-btn__box">
          <fui-button radius="96rpx" background="#465CFF" disabledBackground="#D0D3D4" :disabled="isCanClick" text="确定" bold @click="confirm"></fui-button>
        </view>
      </fui-form>
    </view>

    <fui-modal
      :show="showModal"
      :descr="modalOption.descr"
      :buttons="['去登录']"
      radius="16"
      :maskClosable="true"
      direction="row"
      @click="clickHanler"
    ></fui-modal>
  </view>
</template>

<script>
  import { UserService } from '@/services/api.service';
export default {
  data() {
    return {
      visiblePwd: true,
      visibleConfirmPwd: true,
      showModal: false,
      modalOption: {
        descr: '重置成功！3秒后自动跳转登录页面'
      },
      formData: {
        phone: '',
        password: '',
        confirmPwd: '',
        code: ''
      },
      rules: [
        {
          name: 'phone',
          rule: ['required', 'isMobile'],
          msg: ['请输入手机号', '请输入正确的手机号']
        },
        {
          name: 'code',
          rule: ['required'],
          msg: ['请输入验证码']
        },
        {
          name: 'password',
          rule: ['required', 'minLength:6', 'maxLength:20'],
          msg: ['请输入密码', '密码为6~20位数字和字母或符号', '密码为6~20位数字和字母或符号']
        },
        // {
        //   name: 'confirmPwd',
        //   rule: ['required', 'isSame:password'],
        //   msg: ['请输入确认密码', '两次输入的密码不一致']
        // },
        {
          name: 'code',
          rule: ['required'],
          msg: ['请输入验证码']
        }
      ]
    };
  },
  computed: {
    isCanClick() {
      return !(this.formData.phone != '' && this.formData.code != '' && this.formData.password != '');
    }
  },
  methods: {
    // 展示隐藏密码
    showPwd(type) {
      switch (type) {
        case 1:
          this.visiblePwd = !this.visiblePwd;
          break;
        case 2:
          this.visibleConfirmPwd = !this.visibleConfirmPwd;
          break;
        default:
          break;
      }
    },
    // 获取验证码
    getCode() {
      let phone = this.formData.phone
      let params = {
        action: 3, // 1: 注册，2: 登录，3: 找回密码
        phone
      }
      let isPhone = this.$base.tools.isPhone(phone);
      if (!isPhone)  {
        this.$refs.fui_cdv?.reset()
        this.fui.toast('请输入正确手机号！')
        return
      }
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

    confirm() {
      this.$debounce.canDoFunction({
        time: 2000,
        immediate: true,
        key: 'forgotPwd',
        success: () => {
          this.$refs.form
            .validator(this.formData, this.rules)
            .then((res) => {
              if (res.isPassed) {
                this.restPwd()
              }
            })
            .catch((err) => {
              console.log(err);
            });
        },
        fail: () => {
          console.log('频繁操作');
        }
      });
    },
    async restPwd() {
      let data = {
        ...this.formData
      }
      let res = await UserService.resetPwd(data)
      if (res.code === 200) {
        this.showModal = true;
        setTimeout(() => {
          this.showModal = false;
          this.toLogin();
        }, 3000)
      }
    },
    toLogin() {
      uni.reLaunch({
        url: '/pages/logins/login/login',
        animationType: 'slide-out-bottom',
        animationDuration: 300
      })
    },
    clickHanler() {
      this.showModal = false;
      uni.redirectTo({
        url: '/pages/logins/login/login',
        animationDuration: 300,
        animationType: 'slide-in-bottom'
      });
    }
  }
};
</script>

<style lang="scss">
.forgot_password {
  height: 100%;
  background-color: #fff;
  .forgot_password_title {
    padding: 64rpx 32rpx 32rpx;
    font-size: 64rpx;
  }
  .fui-btn__box {
    margin-top: 64rpx;
  }
  .forgot_password_form {
    padding: 32rpx;
    .fui-input__border-top {
      height: 0 !important;
    }
    .form_input_wrap {
      min-height: 224rpx;
      margin-left: -32rpx;
    }
    .fui-clause--cell {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24rpx;
    }

    .fui-clause--wrap {
      width: 100%;
      margin-top: 64rpx;
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
