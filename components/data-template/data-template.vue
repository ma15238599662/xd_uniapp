<template>
  <view>
    <view class="data_item">
      <view class='_left'>
				<!-- <view class="data_item_img"> -->
				<fui-icon name="star-fill" color="#e79c10" class="_img"></fui-icon>
				<!-- </view> -->
				<view class="data_item_text">
				  <text class="dit_title">{{ title }}</text>
				  <text class="dit_text">{{ text }}</text>
				</view>
			</view>
      <view class="data_item_btn _right" v-if="type == 'favorites'">
        <fui-button btnSize="mini" class="dib_btn" @click="handleNavigation">导航</fui-button>
        <fui-button btnSize="mini" class="dib_btn btn_right" @click="handleRoute">路线</fui-button>
      </view>
      <view class="data_item_btn"  v-if="type == 'address'">
        <fui-icon name="delete-fill" @click="clickDel"></fui-icon>
      </view>
      <view class="data_item_line"></view>
    </view>
  </view>
</template>

<script>
  export default {
    name:"data-template",
    emits: ['navigation', 'route', 'del'],
    props: {
      id: {
				type: Number || String,
				default: 1
      },
      type: {
				type: String,
				default: "favorites"
      },
      title: {
				type: String,
				default: ''
			},
      text: {
				type: String,
				default: ''
			},
      url: {
				type: String,
				default: '../../../static/images/my/light/icon_help_3x.png'
			},
    },
    data() {
      return {
        
      };
    },
    methods: {
      handleNavigation() {
      	this.$emit('navigation', { id: this.id });
      },
      handleRoute() {
      	this.$emit('route', { id: this.id });
      },
      clickDel() {
        this.$emit('del', { id: this.id });
      }
    }
  }
</script>


<style lang="scss">
.data_item {
  width: 100%;
  min-height: 96rpx;
  display: flex;
	justify-content: space-between;
	padding: 16rpx 0;
	._left {
		display: flex;
		._img {
		  font-size: 40rpx !important;
			margin-top: 8rpx;
			margin-right: 12rpx;
		}
		
	}
	._left .data_item_text .dit_text {
		color: #666;
		line-height: 34rpx;
		font-size: 26rpx;
	}
  &_text {
    display: inline-block;
    // padding-left: 64rpx;
    font-size: 32rpx;
    color: var(--fui-color-title);
    .dit_title {
      width: 100%;
      display: block;
      line-height: 64rpx;
      white-space: nowrap;
    }
    .dit_text {
      display: block;
      font-size: 26rpx;
      line-height: 64rpx;
      color: var(--fui-color-label);
			
    }
  }
  &_btn {
		margin-top: 10rpx;
    :deep(.fui-icon) {
      font-size: 42rpx !important;
    }
    .dib_btn {
      display: inline-block;
      color: var(--fui-color-white);
      margin-right: 16rpx !important;
      width: 96rpx !important;
      height: 48rpx !important;
      :deep(.fui-button) {
        width: 96rpx !important;
        height: 48rpx !important;
      }
    }
		.btn_right {
			margin-right: 0 !important;
		}
  }
	
  &_line {
    position: absolute;
    bottom: 0;
    left: 32rpx;
    width: 100%;
    height: 1px;
    transform: scaleY(0.5) translateZ(0);
    background-color: var(--fui-color-border);
  }
}
</style>
