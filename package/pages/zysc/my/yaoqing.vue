<template>
	<view class="content">
		<view class="view1">
			<view style="font-size: 29rpx;line-height: 75rpx;">总收益(元)</view>
			<view style="font-size: 56rpx;">{{ money }}</view>
			<view style="font-size: 30rpx;line-height: 90rpx;">邀请好友 {{ total }} 人</view>
		</view>
		<view class="navbar">
			<view class="nav-item" :class="{current: index == 1}" @tap="zhishu(1)">
				直属收益
			</view>
			<view class="nav-item" :class="{current: index == 2}" @tap="tuan(2)">
				非直属收益
			</view>
		</view>
		<view class="view2" style="margin-bottom: 50rpx;">
			<!-- <view style="display: flex;flex-direction: row;padding: 20upx;">
				<view style="width: 20%;">排名</view>
				<view style="width: 50%;">昵称</view>
				<view style="width: 30%;text-align: center;">累计贡献</view>
			</view> -->
			<view style="display: flex;flex-direction: row;padding: 20upx;" v-for="(item, index) in list" :key="index">
				<view style="width: 20%;">
					<image v-if="index + 1 == 1" src="https://api.shengqianxiong.com.cn/img/20201118/93ae49db6c064009a16c95cdc37f9b5f.png"
					 style="width: 40upx; height: 40upx;"></image>
					<image v-if="index + 1 == 2" src="https://api.shengqianxiong.com.cn/img/20201118/1335ae43c94640998cf43c2de7689786.png"
					 style="width: 40upx; height: 40upx;"></image>
					<image v-if="index + 1 == 3" src="https://api.shengqianxiong.com.cn/img/20201118/2d06c6ab24aa4c36b8da1be386c9d998.png"
					 style="width: 40upx; height: 40upx;"></image>
					<view v-if="index + 1 > 3" style="font-size: 28upx; color: #000000; margin-left: 15upx;margin-top: 6upx;">{{ index + 1 }}</view>
				</view>
				<view style="width: 50%;display: flex;flex-direction: row;align-items: center;">
					<view style="font-size: 14px; color: #333333;width: 65%;">{{ item.userName }}</view>
				</view>
				<view style="width: 30%;text-align: center;">
					<view style="font-size: 16px;color: #FF580B;">¥{{ item.moneySum }}</view>
				</view>
			</view>
		</view>
		<button class="yaoqing_btn" @click="goYao">邀请更多好友</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				index: 1,
				money: 0,
				toBase64Url: 'https://api.shengqianxiong.com.cn/yaoqingbtn.png',
				nickName: '游客',
				total: 0
			};
		},
		onLoad() {
			let userId = this.$queue.getData('userId');
			if (userId) {
				this.$Request.getT('/ordersRelation/tuanSum?userId=' + userId).then(res => {
					if (res.status === 0) {
						this.money = res.data.data;
					}
				});
			}
			this.getTeamTotal('');
		},
		methods: {
			zhishu(nub) {
				this.index = nub
				this.getTeamTotal('');
			},
			tuan(nub) {
				this.index = nub
				this.getTeamTotal('');
			},
			goYao() {
				uni.navigateTo({
					url: '/pages/member/yao'
				});
			},
			getTeamTotal(type) {
				let relationId = this.$queue.getData('relation_id');
				if (relationId) {
					this.$Request.getT('/user/team/users/' + relationId).then(res => {
						if (res.status === 0 && res.data) {
							this.total = res.data.length;
						}
					});

					uni.showLoading({
						title: '加载中...'
					});
					let userId = this.$queue.getData('userId');
					this.$Request.getT('/ordersRelation/team?userId=' + userId + '&type=' + this.index).then(
						res => {
							if (res.status === 0 && res.data) {
								this.list = [];
								res.data.data.forEach(d => {
									this.list.push(d);
								});
							}
							uni.hideLoading();
						});
				}
			}
		}
	};
</script>

<style lang="scss">
	scoped>page {
		background: #F8F8F8;
	}

	.navbar {
		width: 100%;
		display: flex;
		height: 80rpx;
		background: #FFFFFF;
		z-index: 10;

		.nav-item {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 27rpx;
			color: #999999;

			&.current {
				color: #FF3333;
				background: #FFEBEB;

				&:after {
					content: '';
					transform: translateX(-50%);
				}
			}
		}
	}

	.view1 {
		width: 100%;
		height: 355rpx;
		background: linear-gradient(to right, #f63c53 0%, #f76654 100%);
		color: white;
		text-align: center;
		padding-top: 45rpx;
	}

	.view2 {
		background-color: #ffffff;
		width: 100%;
		height: 100%;
	}

	.yaoqing_btn {
		width: 90%;
		margin: 0 auto;
		line-height: 45px;
		margin-top: 30rpx;
		height: 90rpx;
		color: #FFFFFF;
		border-radius: 65rpx;
		background: linear-gradient(to right, #f63c53 0%, #f76654 100%);
		font-size: 29rpx;
		letter-spacing: 2rpx;
		font-weight: 600;
		position: fixed;
		bottom: 55rpx;
		left: 0;
		right: 0;
	}
</style>
