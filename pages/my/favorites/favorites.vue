<template>
  <view class="favorites">
    <!-- 室内地点 -->
    <view class="titile_wrap">
      <view class="_title">
				<image src="../../../static/images/my/spot.png" mode=""></image>
				<text>室内地点</text>
			</view>
      <text v-if="indoorList.length > 5" class="more" @click="more('indoor')">更多</text>
    </view>
    <view class="data_warp">
      <fui-swipeaction-group>
        <fui-swipe-action @click="onClick" v-for="(item, index) in indoorList.slice(0, 5)" :key="index">
          <data-template :title="item.name" :text="item.text" :id="item.id" @navigation="indoorNavigation" @route="indoorRoute"></data-template>
        </fui-swipe-action>
      </fui-swipeaction-group>
    </view>
    
    <!-- 室外地点 -->
    <view class="titile_wrap">
			<view class="_title">
				<image src="../../../static/images/my/outDoor.png" mode=""></image>
				<text>室外地点</text>
			</view>
      <text v-if="outdoorList.length > 5" class="more" @click="more('outdoor')">更多</text>
    </view>
    <view class="data_warp">
      <fui-swipeaction-group>
        <fui-swipe-action @click="onClick" v-for="(item, index) in outdoorList.slice(0, 5)" :key="index">
          <data-template :title="item.name" :text="item.text" :id="item.id" @navigation="outdoorNavigation" @route="outdoorRoute"></data-template>
        </fui-swipe-action>
      </fui-swipeaction-group>
    </view>
  </view>
</template>

<script>
  import { AppService } from '@/services/api.service.js';
export default {
  data() {
    return {
      indoorList: [
        {
          id: 1,
          name: '杏秋苑地下停车场1',
          text: 'xxxx附近'
        },
        {
          id: 2,
          name: '杏秋苑地下停车场2',
          text: 'xxxx附近'
        },
        {
          id: 3,
          name: '杏秋苑地下停车场3',
          text: 'xxxx附近'
        },
        {
          id: 4,
          name: '杏秋苑地下停车场4',
          text: 'xxxx附近'
        },
        {
          id: 5,
          name: '杏秋苑地下停车场5',
          text: 'xxxx附近'
        },
        {
          id: 6,
          name: '杏秋苑地下停车场6',
          text: 'xxxx附近'
        }
      ],
      outdoorList: [
        {
          id: 1,
          name: '杏秋苑地下停车场1',
          text: 'xxxx附近'
        },
        {
          id: 2,
          name: '杏秋苑地下停车场2',
          text: 'xxxx附近'
        },
        {
          id: 3,
          name: '杏秋苑地下停车场3',
          text: 'xxxx附近'
        },
        {
          id: 4,
          name: '杏秋苑地下停车场4',
          text: 'xxxx附近'
        },
        {
          id: 5,
          name: '杏秋苑地下停车场5',
          text: 'xxxx附近'
        },
        {
          id: 6,
          name: '杏秋苑地下停车场6',
          text: 'xxxx附近'
        }
      ]
    };
  },
  onPullDownRefresh() {
    console.log('refresh');
    // 执行刷新操作
    this.init()
    setTimeout(function () {
      uni.stopPullDownRefresh();
    }, 2000);
  },
  onLoad() {
    this.init()
  },
  methods: {
    init() {
      this.getCollect()
    },
    onClick() {
      console.log('onClick');
    },
    indoorNavigation(row) {
      console.log('indoorNavigation', row);
    },
    indoorRoute(row) {
      console.log('indoorRoute', row);
    },
    outdoorNavigation(row) {
      console.log('outdoorNavigation', row);
    },
    outdoorRoute(row) {
      console.log('outdoorRoute', row);
    },
    more(type) {
      console.log('more', type);
    },
    // 获取收藏列表
    async getCollect() {
      let res = await AppService.getCollects()
      console.log('getCollect===', res)
      if (res.code === 200) {
        const {indoors, outdoors} = res.data
        this.indoorList = indoors
        this.outdoorList = outdoors
      }
    }
  }
};
</script>

<style lang="scss">
.favorites {
	background-color: #fff;
	min-height: 100%;
  .titile_wrap {
    display: flex;
    padding: 34rpx 40rpx;
		justify-content: space-between;
		._title {
			display: flex;
			align-items: center;
		}
    image {
      width: 50rpx;
      height: 50rpx;
      margin-right: 16rpx;
    }
    text {
      font-size: 32rpx;
			line-height: 32rpx;
      color: #0066FF;
			margin-top: 6rpx;
    }
    .more {
      color: var(--fui-color-link);
      font-size: 28rpx;
      // position: absolute;
      // right: 32rpx;
    }
  }
  .data_warp {
		border-top: 2px dotted #EEEEEE;
		padding: 32rpx 40rpx;
  }
}
</style>

