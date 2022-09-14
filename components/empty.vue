<template>
	<view class="empty-content">
		<image class="empty-content-image" :src="typeSrc.empty" mode="aspectFit"></image>
		<view style="color: #999999;margin-top: 8px;font-size: 13px">{{des}}</view>
	</view>
</template>

<script>
	export default {
		props: [
			"src", "des","show"
		],


		data() {
			return {
				typeSrc: {
					des:'暂无数据',
					empty: 'https://shop.shengqianxiong.com.cn/img/20201215/dbcd98b88d6340759e84f08989c7f742.png'
				},

			}
		},

		computed: {
			setSrc() {
				return this.typeSrc.empty;
			},
			setDes() {
				return this.typeSrc[this.des];
			},
		},
		methods:{
			goHome(){
				uni.switchTab({url: '/pages/index/index'});
			}
		}
	}
</script>

<style lang="scss">
	.empty-content {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		background: #FFFFFF;
		padding-bottom: 120upx;

		&-image {
			width: 200upx;
			height: 200upx;
		}
	}
</style>
