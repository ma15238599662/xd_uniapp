<template>
  <view>
    <fui-nav-bar title="设置昵称" @leftClick="back" @rightClick="save">
      <fui-icon name="arrowleft"></fui-icon>
      <template v-slot:right>
        <fui-button :loading="loadingBtn" text="保存" btnSize="mini" :disabled="isEdit" bold @click="save"></fui-button>
      </template>
    </fui-nav-bar>
    <fui-input label="昵称" borderTop placeholder="请输入昵称" v-model="nickname"></fui-input>
  </view>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import { UserService } from '@/services/api.service';
export default {
  data() {
    return {
      isEdit: false,
      loadingBtn: false,
      nickname: '',
      oldNickName: ''
    };
  },
  watch: {
    nickname(newNickname) {
      this.isEdit = newNickname == this.oldNickName;
    }
  },
  onLoad(e) {
    // console.log('上个页面数据', e);
    // console.log(this.userInfo.phone)
    this.nickname = e.value;
    this.oldNickName = e.value;
  },
  methods: {
    back() {
      uni.navigateBack(1);
    },
    save() {
      
        this.$debounce.canDoFunction({
          time: 1000,
          immediate: true,
          key: 'putNickname',
          success: () => {
            this.putNickname()
          },
          fail: () => {
            this.fui.toast('请勿频繁操作')
          }
        });
    },
    
    // TODO: 编辑昵称 并请求后台
    async putNickname() {
      let params = {
        nickname: this.nickname
      }
      this.loadingBtn = true
      let res = await UserService.putNickname(params)
      this.loadingBtn = false
      if (res.code === 200) {
        uni.showLoading({
        	mask: true,
        	title: '正在保存，请稍后...',
        })
        this.$store.dispatch('auth/setUserInfo', {
          ...this.userInfo,
          nickname: this.nickname
        })
        setTimeout(() => {
          uni.hideLoading()
          this.fui.toast('保存成功！')
        }, 500)
        setTimeout(() => {
          let pages = getCurrentPages()
          let beforePage = pages[pages.length - 2]
          uni.navigateBack({
            delta: 1,
            animationDuration: 300,
            success: function() {
              beforePage.$vm.initData(); // 执行前一个页面的刷新 （initData是我自己定义的方法）
            }
          });
        }, 1000)
      }
    }
  },
};
</script>

<style lang="scss">
  
</style>
