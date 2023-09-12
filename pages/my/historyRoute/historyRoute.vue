<template>
  <view class="history-route">
    <view class="data_warp">
      <fui-list-cell :highlight="false" v-for="(item, index) in list" :key="'history' + index">
      	<view class="data_item">
          <fui-icon class="data_item_left" name="wait"></fui-icon>
          <!-- <image class="data_item_left" src="../../../static/html/images/marker.png" mode=""></image> -->
      		<!-- <text class="data_item_title">{{item.name}}</text> -->
          <fui-overflow-hidden class="data_item_title" :text="item.name" :rows="2"></fui-overflow-hidden>
					<image class="data_item_right" src="../../../static/images/my/del.png" mode="" @click="del(item.id)"></image>
      	</view>
      </fui-list-cell>
    </view>
    
  </view>
</template>

<script>
  import { AppService } from '@/services/api.service.js';
export default {
  data() {
    return {
      list: [
        {
          id: 1,
          name: '杏秋苑地下停车场杏秋苑地下停车场杏秋苑地下停车场杏秋苑地下停车场杏秋苑地下停车场杏秋苑地下停车场1',
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
      this.getNavigation()
    },
    onClick() {
      console.log('onClick');
    },
    del(row) {
      console.log('del', row);
    },
    
    // 获取导航列表
    async getNavigation() {
      let res = await AppService.getNavigations()
      console.log('getNavigation===', res)
      if (res.code === 200) {
        // const {indoors, outdoors} = res.data
        // this.indoorList = indoors
        // this.outdoorList = outdoors
      }
    }
  }
};
</script>

<style lang="scss">
.history-route {
  min-height: 100%;
  padding: 32rpx 20rpx;
	background-color: #fff;
  .titile_wrap {
    line-height: 64rpx;
    display: flex;
    align-items: center;
    margin: 20rpx 0;
    image {
      width: 50rpx;
      height: 50rpx;
      margin-right: 16rpx;
    }
    text {
      font-size: 40rpx;
      font-weight: bold;
      color: var(--fui-color-title);
    }
    .more {
      color: var(--fui-color-link);
      font-size: 28rpx;
      position: absolute;
      right: 32rpx;
    }
  }
  .data_warp {
    .data_item {
      display: flex;
			width: 100%;
      &_left {
        font-size: 40rpx !important;
        margin-right: 16rpx;
      }
      &_title {
        flex: 1;
        margin-right: 64rpx;
      }
      &_right {
        width: 40rpx;
        height: 40rpx;
      }
    }
  }
}
</style>
