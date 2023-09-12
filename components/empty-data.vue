<template>
	<view class="empty-data">
    <view class="icon">
      <image src="../static/images/empty.png" mode=""></image>
		</view>
		<view class="title padding-top-20 text-gray text-28">{{title}}</view>
	</view>
</template>

<script>
	export default {
    props:{
      title:{
				type:String,
				default:'敬请期待'
			}
    },
    name:'empty-data'
	}
</script>

<style scoped lang="scss">
 .empty-data{
    // height: 100%;
    // display: flex;
    // flex-direction: column;
    // justify-content: center;
    padding-top: 8rem;
   .icon {
     height: 500rpx;
     image {
       width: 100%;
       height: 100%;
     }
   }
   .title {
     text-align: center;
     color: var(--fui-color-subtitle);
   }
   
 }
</style>
