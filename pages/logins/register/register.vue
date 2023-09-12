<template>
  <view class="register">
    <view class="register_title">
      <text>手机号注册</text>
    </view>
    <view class="register_form">
      <fui-form ref="form" top="0">
        <view class="form_input_wrap">
          <fui-input label="" :borderTop="false" maxlength="11" borderTop placeholder="手机号" v-model="formData.phone"></fui-input>
          <fui-input label="" :padding="['28rpx', 0, '26rpx', '32rpx']" maxlength="6" placeholder="验证码" v-model="formData.code">
            <fui-countdown-verify ref="fui_cdv" @send="getCode"></fui-countdown-verify>
          </fui-input>

          <fui-input maxlength="20" placeholder="密码(6~20位数字和字母或符号)" :password="visiblePwd" v-model="formData.password">
            <fui-icon :name="visiblePwd ? 'invisible' : 'visible'" color="#B2B2B2" :size="50" @click="visiblePwd = !visiblePwd"></fui-icon>
          </fui-input>
        </view>

        <view class="fui-btn__box">
          <fui-button :loading="btnLoading" radius="96rpx" background="#465CFF" disabledBackground="#D0D3D4" :disabled="isCanRegister" text="注册" bold @click="register"></fui-button>
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
  </view>
</template>

<script>
import { UserService } from '@/services/api.service';
import form from '@/components/firstui/fui-validator/fui-validator'
//勾选协议校验
function checkAgree(agree) {
  return agree;
}
export default {
  data() {
    return {
      timer: null,
      countdownText: '获取验证码',
      visiblePwd: true,
      btnLoading: false,
      formData: {
        phone: '',
        password: '',
        code: '',
        agree: false
      },
      rules: [
        {
          name: 'phone',
          rule: ['required', 'isMobile'],
          msg: ['请输入手机号', '请输入正确的手机号']
        },
        {
          name: 'password',
          rule: ['required', 'minLength:6', 'maxLength:20'],
          msg: ['请输入密码', '密码为6~20位数字和字母或符号', '密码为6~20位数字和字母或符号']
        },
        {
          name: 'code',
          rule: ['required'],
          msg: ['请输入验证码']
        },
        {
          name: 'agree',
          validator: [
            {
              msg: '请勾选并同意《用户使用协议》和《隐私政策》',
              method: checkAgree
            }
          ]
        }
      ]
    };
  },
  computed: {
    isCanRegister() {
      return !(this.formData.phone != '' && this.formData.code != '' && this.formData.password != '');
    },
  },
  methods: {
    // 获取验证码
    async getCode() {
      let phone = this.formData.phone
      let params = {
        action: 1, // 1: 注册，2: 登录，3: 找回密码
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

    agreeChange(e) {
      this.$set(this.formData, 'agree', e.checked);
    },
    register() {
      this.$debounce.canDoFunction({
        time: 2000,
        immediate: true,
        key: 'register',
        success: async () => {
          let validatorRes = form.validator(this.formData, this.rules);
          console.log(validatorRes);
          if (validatorRes.isPassed) {
            let params = {
              ...this.formData
            }
            console.log(params)
            this.btnLoading = true
            let res = await UserService.signup(params)
            if (res.code === 200) {
              this.fui.toast('注册成功')
              setTimeout(() => {
                this.btnLoading = false
                this.back();
              }, 1000)
            }
          } else {
            this.fui.toast(validatorRes.errorMsg)
          }
        },
        fail: () => {
          console.log('频繁操作');
        }
      });
    },
    back() {
      uni.navigateBack({
        delta: 1,
        animationType: 'slide-out-bottom',
        animationDuration: 300
      });
    }
  }
};
</script>

<style lang="scss">
.register {
  height: 100%;
  background-color: #fff;
  .register_title {
    padding: 64rpx 32rpx 32rpx;
    font-size: 64rpx;
  }
  .fui-btn__box {
    margin-top: 64rpx;
  }
  .register_form {
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
