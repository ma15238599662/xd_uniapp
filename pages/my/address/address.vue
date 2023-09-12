<template>
  <view class="address">
    <!-- 室内地点 -->
    <view class="titile_wrap">
      <view class="_title">
				<image src="../../../static/images/my/spot.png" mode=""></image>
				<text>室内地点</text>
			</view>
      <text v-if="indoorList.length > 5" class="more" @click="more('indoor')">更多</text>
    </view>
    <view class="data_warp">
      <fui-list-cell :highlight="false" v-for="(item, index) in indoorList.slice(0, 5)" :key="'indoor' + index">
      	<view class="data_item">
          <image class="data_item_left" src="../../../static/images/my/locate.png" mode=""></image>
      		<!-- <text class="data_item_title">{{item.name}}</text> -->
          <fui-overflow-hidden class="data_item_title" :text="item.name" :rows="2"></fui-overflow-hidden>
					<image class="data_item_right" src="../../../static/images/my/del.png" mode="" @click="indoorDel(item.id)"></image>
      	</view>
      </fui-list-cell>
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
      <fui-list-cell :highlight="false" v-for="(item, index) in outdoorList.slice(0, 5)" :key="'outdoor' + index">
      	<view class="data_item">
          <image class="data_item_left" src="../../../static/images/my/locate.png" mode=""></image>
      		<!-- <text class="data_item_title">{{item.name}}</text> -->
          <fui-overflow-hidden class="data_item_title" :text="item.name" :rows="2"></fui-overflow-hidden>
          <!-- <fui-icon class="data_item_right" name="delete-fill" @click="outdoorDel(item.id)"></fui-icon> -->
					<image class="data_item_right" src="../../../static/images/my/del.png" mode="" @click="outdoorDel(item.id)"></image>
      	</view>
      </fui-list-cell>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      indoorList: [
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
    setTimeout(function () {
      uni.stopPullDownRefresh();
    }, 2000);
  },
  methods: {
    onClick() {
      console.log('onClick');
    },
    indoorDel(row) {
      console.log('indoorDel', row);
    },
    outdoorDel(row) {
      console.log('outdoorDel', row);
    },
    more(type) {
      console.log('more', type);
    }
  }
};
</script>

<style lang="scss">
.address {
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
      position: absolute;
      right: 32rpx;
    }
  }
  .data_warp {
    .data_item {
      display: flex;
			justify-content: space-between;
			width: 100%;
      &_left {
        width: 48rpx;
        height: 48rpx;
        margin-right: 16rpx;
      }
      &_title {
        flex: 1;
        margin-right: 64rpx;
        // word-break: break-all;
        // overflow: hidden;
        // display: -webkit-box;
        // -webkit-line-clamp: 2;
        // -webkit-box-orient: vertical;
      }
      &_right {
				width: 40rpx;
				height: 40rpx;
      }
    }
  }
}
</style>
