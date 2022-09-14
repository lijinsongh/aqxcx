<template>
	<view>
		<view style="background: #FFFFFF;padding: 20rpx;margin-top: 3rpx;">
			<view style="display: flex;">
				<image :src="list.logo ? list.logo : '/static/logo2.png'" class="logo"></image>
				<view style="margin-left: 20rpx;margin-top: 10rpx;width: 63%;">
					<view style="font-size: 30rpx;color: #000000;">{{list.storeName}}</view>
					<view style="margin-top: 10rpx;color: #999999;font-size: 26rpx;">销量{{' '+sale}}</view>
				</view>
				<view style="margin-left: 20rpx;margin-top: 30rpx;z-index: 1;background: #FF2D36;width: 120rpx;height: 48rpx;border-radius: 50rpx;text-align: center;line-height: 48rpx;color: #FFFFFF;"
				 @click="shoucang">{{shoucangMessage}}</view>
			</view>
		</view>
		<view style="background: #FFFFFF;padding: 20rpx;margin-top: 3rpx;">
			<view style="display: flex;z-index: 1;margin-top: 10rpx;margin-left: 3rpx;">
				<view style="font-size: 28rpx;color: #f43b4d;margin-top: 3rpx;font-weight: bold;">综合评分</view>
				<!-- #ifdef MP-WEIXIN -->
				<urate style="margin-top: 27rpx;margin-left: 10rpx;z-index: 1;" :size='13' :value="list.score / 20" />
				<!-- #endif -->
				<!-- #ifndef MP-WEIXIN -->
				<urate style="margin-top: 6rpx;margin-left: 10rpx;z-index: 1;" :size='13' :value="list.score / 20" />
				<!-- #endif -->
			</view>
			<view style="margin-left: 3rpx;color: #999999;font-size: 26rpx;margin-top: 10rpx;font-weight: 500;">{{yinxiang}}</view>
		</view>

		<view style="background: #FFFFFF;padding: 20rpx;margin-top: 20rpx;">
			<view style="font-size: 30rpx;color: #999999;">基础信息</view>
			<view class="jichu">
				<view class="jichu_left">掌柜名</view>
				<view class="jichu_right">{{list.refundContact}}</view>
			</view>
			<view class="jichu" v-if="marinMoney != '2'">
				<view class="jichu_left">资质</view>
				<view class="jichu_right">{{list.marginType === 2 ? '优秀' : '一般'}}</view>
			</view>
			<view class="jichu">
				<view class="jichu_left">联系电话</view>
				<view class="jichu_right">{{list.refundMobile}}</view>
			</view>
			<view class="jichu">
				<view class="jichu_left">开店时间</view>
				<view class="jichu_right">{{list.createTime}}</view>
			</view>
			<view class="jichu">
				<view class="jichu_left">地址</view>
				<view class="jichu_right">{{list.refundAddress}}</view>
			</view>
		</view>

		<view class="tousu" @tap='goComplaint'>
			<view>店铺投诉</view>
		</view>
	</view>
</template>

<script>
	import urate from '../../../package/components/uni-rate/uni-rate.vue';
	export default {
		components:{
			urate
		},
		data() {
			return {
				list: {},
				storeId: '',
				logo: '',
				sale: '',
				marinMoney: '2',
				shoucangMessage: '关注',
				storeName: '',
				createTime: '',
				yinxiang: '',
				shipAddress: ''
			}
		},
		onLoad(d) {
			this.storeId = d.storeId;
			this.getDianpuList(this.storeId);
			this.checkShoucang();
			this.yinxiang = this.$queue.getData('dianpuYX');
			let a = this.$queue.getData("marinMoney")
			if (a) {
				this.marinMoney = a;
			}
		},
		methods: {
			goComplaint() {
				uni.navigateTo({
					url: './complaint?storeId=' + this.list.storeId + '&storeName=' + this.list.storeName +
						'&merchantId=' + this.list.merchantId
				});
			},
			checkShoucang() {
				let userId = this.$queue.getData('userId');
				this.$Request.getT('/selfStoreCollect/check?storeId=' + this.storeId + '&userId=' + userId).then(res => {
					if (res.status === 0) {
						if (!res.data) {
							this.id = res.msg;
							this.shoucangMessage = '已关注'
						} else {
							this.shoucangMessage = '关注'
						}
					}
				});
			},
			shoucang() {
				if (this.shoucangMessage == '关注') {
					let userId = this.$queue.getData('userId');
					let data = {
						logo: this.logo,
						storeId: this.storeId,
						storeName: this.storeName,
						userId: userId
					};
					this.$Request.postJson('/selfStoreCollect/save', data).then(res => {
						if (res.status === 0) {
							this.$queue.showToast('关注成功！');
							this.checkShoucang();
							this.getCount(this.storeId);
						}
					});
				} else {
					uni.showModal({
						title: '温馨提示',
						content: '您确认要取关此店铺吗？',
						showCancel: true,
						cancelText: '取消',
						confirmText: '确认',
						success: res => {
							if (res.confirm) {
								this.$Request.getT('/selfStoreCollect/delete?id=' + this.id).then(res => {
									if (res.status === 0) {
										this.$queue.showToast('取消关注！');
										this.checkShoucang();
										this.getCount(this.storeId);
									}
								});
							}
						}
					});
				}
			},
			getDianpuList(id) {
				this.$Request.getT('/self/store/find?id=' + id).then(res => {
					if (res.status === 0) {
						this.list = res.data;
						this.sale = res.data.sale > 10000 ? (res.data.sale / 10000).toFixed(1) + '万' : res.data.sale;
					}
				});
			}
		}
	}
</script>

<style scoped>
	page {
		background: #f4f4f4;
	}

	.jichu {
		display: flex;
		width: 100%;
		margin-top: 40rpx;
	}

	.jichu_left {
		width: 25%;
	}

	.jichu_right {
		width: 75%;
		text-align: right;
	}

	.tousu {
		background: #FFFFFF;
		padding: 20rpx;
		margin-top: 20rpx;
		text-align: center;
		color: #F70C08;
	}

	.logo {
		width: 100rpx;
		height: 100rpx;
		border-radius: 10rpx;
	}
</style>
