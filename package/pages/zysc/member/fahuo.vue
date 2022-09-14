<template>
	<view style="background: #F7F7F7;">
		<view v-if="isExpress === 1"
			style="background: #FFFFFF;margin-top: 30upx; padding: 10upx;border-radius: 15upx;width: 95%;margin-left: 20upx;">
			<view style="display: flex;margin: 15upx 0 20rpx 20upx;">
				<image src="https://api.shengqianxiong.com.cn/img/20201118/276b48a6ab854b64bcfbd5377b5f5901.png"
					style="width: 70upx; height: 70upx;margin-top: 10upx;"></image>
				<view style="margin-left: 20upx;width: 80%;">
					<view style="display: flex;color: #333333;">
						<view style="font-size: 32upx;">{{list.consignee}}</view>
						<view style="font-size: 28upx;margin-left: 20upx;">{{list.mobile}}</view>
					</view>
					<view style="margin-top: 10upx;font-size: 26upx;color: #333333;">
						{{list.provinces}}{{list.detail}}
					</view>
				</view>
			</view>
		</view>

		<view
			style="height: 320upx;background: #FFFFFF;margin-top: 30upx; padding: 10upx;border-radius: 15upx;width: 95%;margin-left: 20upx;">
			<view class="order_box">
				<view style="color: #333333;font-size: 28upx;">{{list.createAt}}</view>
				<view style="color: #FF332F;font-size: 28upx;">{{list.status}}</view>
			</view>
			<view style="display: flex;padding: 20upx 10upx;" @tap='goOrderDetail(list)'>
				<image :src="list.img" style="width: 30%;height: 190upx;margin-left: 20upx;"></image>
				<view style="margin-left: 20upx;width: 68%;">
					<view
						style="font-size: 30upx;color: #333333;width: 95%;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;">
						{{list.title}}
					</view>
					<view style="display: flex;width: 90%;margin-top: 5rpx;color: #999999;" v-if="list.detailJson">
						<view style="font-size: 24upx;">商品规格：</view>
						<view style="font-size: 24upx;padding-left: 10upx;">{{list.detailJson}}</view>
					</view>
					<view
						:style="list.detailJson ? 'display: flex;height: 50upx;margin-top: 60rpx;': 'display: flex;height: 50upx;margin-top: 70rpx;'">
						<view style="display: flex;width: 43%;">
							<view v-if="list.orderType != 4" style="font-size: 30upx;color: #333333;">¥ {{list.price}}
							</view>
							<view v-else style="font-size: 30upx;color: #333333;">{{list.price}}</view>
							<view style="font-size: 24upx;color: #666666;padding-top: 7upx;padding-left: 10upx;">
								×{{list.number}}</view>
						</view>
						<view v-if="list.orderType != 4"
							style="font-size: 26upx;color: #333333;width: 50%;text-align: right;">
							实付款: <text
								style="color: #FF3333;font-size: 31rpx;margin-left: 9rpx;">¥{{list.payMoney}}</text>
						</view>
						<view v-else
							style="font-size: 26upx;color: #333333;padding: 0 0 10upx 0upx;width: 50%;text-align: right;">
							实付积分: {{list.payMoney}}</view>
					</view>
				</view>
			</view>
		</view>


		<view
			style="height: max-content;background: #FFFFFF;margin-top: 30upx; padding: 10upx;border-radius: 15upx;width: 95%;margin-left: 20upx;margin-bottom: 150upx;">
			<view style="display: flex;padding: 20upx;color: #333333;font-size: 26upx;justify-content: space-between;"
				v-if="list.returnName">
				<view>收货人</view>
				<view>{{list.returnName}}</view>
			</view>
			<view style="display: flex;padding: 20upx;color: #333333;font-size: 26upx;justify-content: space-between;"
				v-if="list.returnPhone">
				<view>手机号</view>
				<view>{{list.returnPhone}}</view>
			</view>
			<view style="display: flex;padding: 20upx;color: #333333;font-size: 26upx;justify-content: space-between;height: fit-content;max-height: 300upx;"
				v-if="list.returnAddress">
				<view style="width: 30%;">收货地址</view>
				<view style="width: 70%;text-align: right;">{{list.returnAddress}}</view>
			</view>
			<view style="display: flex;padding: 20upx;">
				<view style="font-size: 26upx;color: #333333;width: 25%;">发货单号</view>
				<input type="text" style="width: 70%;font-size: 26upx;color: #333333;margin-left: 10upx;text-align: right;"
					v-model="fahuoNumber" placeholder="请输入发货单号~"/>
			</view>
		</view>

		<view class="orderBox">
			<view style="display: flex;text-align: center;width: max-content;float: right;">
				<view class='view_button' @tap='goMaijia(list)'>联系卖家</view>
				<view class='view_button' @tap='copyTklWenAns'>复制地址</view>
				<view class='view_button' @tap='goconfirm(list)'>确认发货</view>
			</view>
		</view>
	</view>
</template>

<script>
	import simpleModal from '../../../../components/simple-pro/customModal.vue';
	export default {
		components: {
			simpleModal
		},
		data() {
			return {
				state: 0,
				isRefund: 0,
				fahuoNumber:'',
				payWay: '',
				id: 0,
				refusedRefund: '',
				expName: '',
				refund: '',
				isExpress: 0,
				refundCheck: false,
				copyTklStatus: false,
				list: {},
				duihuanList: {},
				pinkUserList: [],
				expList: []
			}
		},
		onLoad(d) {
			this.copyTklStatus = false;
			if (d.id) {
				this.id = d.id;
				this.getListById(d.id);
			}
		},
		methods: {
			goMaijia(list) {
				// console.log(list)
				//list.img list.title list.orderNum list.createAt
				uni.navigateTo({
					url: '/package/pages/chat/chat?className=order&money=' + list.payMoney + '&image=' + list.img +
						'&title=' + list.title +
						'&id=' + this.id + '&orderNum=' + list.orderNum + '&createTime=' + list.createAt
				});
			},
			copyTklWenAns: function() {
				let copyContent = this.list.returnName + ' ' + this.list.returnPhone + ' ' + this.list.returnAddress
				uni.setClipboardData({
					data: copyContent,
					success: r => {
						this.$queue.showToast('复制成功')
						this.copyTklStatus = true;
					}
				});
			},
			goOrderDetail(list) {
				console.log('ssss', list)
				if (list.orderType != 4) {
					uni.navigateTo({
						url: '../index/commoditydetail?ordersId=' + list.goodsId
					});
					// }
				}
			},
			goconfirm(list) {
				if(this.fahuoNumber === ''){
					this.$queue.showToast('请输入发货单号！')
					return;
				}
				uni.showModal({
					title: '温馨提示',
					content: '请确认发货订单是否填写正确？',
					showCancel: true,
					cancelText: '取消',
					confirmText: '确认',
					success: res => {
						if (res.confirm) {
							this.$queue.showLoading('提交中...')
							this.$Request.getT('/orders/buyerNum?ordersId=' + list.id + '&buyerNum=' + this.fahuoNumber).then(res => {
								if (res.status === 0) {
									this.$queue.showToast('发货成功！')
									setTimeout(d =>{
										uni.hideLoading();
										uni.navigateBack();
									},1000);
								} else {
									uni.hideLoading();
									this.$queue.showToast(res.msg);
								}
							});
						}
					}
				});
			},
			getListById(id) {
				uni.showLoading({
					title: '加载中...'
				});
				this.$Request.getT('/orders/find?id=' + id).then(res => {
					if (res.status === 0) {
						this.state = res.data.status;
						if (res.data.status === 1) {
							res.data.status = '待付款'
						} else if (res.data.status === 2) {
							res.data.status = '待发货'
						} else if (res.data.status === 3) {
							if (res.data.isExpress != 3) {
								res.data.status = '待收货'
							} else {
								res.data.status = '待使用'
							}
						} else if (res.data.status === 4) {
							res.data.status = '已完成'
						} else if (res.data.status === 5) {
							res.data.status = '已取消'
						} else if (res.data.status === 6) {
							res.data.status = '退款中'
						} else if (res.data.status === 7) {
							res.data.status = '已退款'
						} else if (res.data.status === 8) {
							res.data.status = '拒绝退款'
						} else if (res.data.status === 9) {
							res.data.status = '拼团中';
							this.getpinkUserList(res.data.groupPinkId);
						} else if (res.data.status === 10) {
							res.data.status = '已评价'
						} else if (res.data.status === 11) {
							res.data.status = '申请退货退款'
						} else if (res.data.status === 12) {
							res.data.status = '同意退货退款 待买家退货'
						} else if (res.data.status === 13) {
							res.data.status = '拒绝退货退款'
						} else if (res.data.status === 14) {
							res.data.status = '申请换货'
						} else if (res.data.status === 15) {
							res.data.status = '同意换货 待买家退货'
						} else if (res.data.status === 16) {
							res.data.status = '换货 买家已发货'
						} else if (res.data.status === 17) {
							res.data.status = '拒绝换货'
						} else if (res.data.status === 18) {
							res.data.status = '退款 买家已发货'
						}


						this.list = res.data;
						this.isRefund = res.data.isRefund;
						this.isExpress = res.data.isExpress;
						if (res.data.refund) {
							this.refund = res.data.refund;
							this.refusedRefund = res.data.refusedRefund;
						}

						if (res.data.payWay === 1 || res.data.payWay === 2 || res.data.payWay === 3) {
							this.payWay = '微信';
						} else if (res.data.payWay === 4 || res.data.payWay === 5) {
							this.payWay = '支付宝';
						} else if (res.data.payWay === 6) {
							this.payWay = '零钱';
						} else if (res.data.payWay === 7) {
							this.payWay = '积分';
						} else {
							this.payWay = '待支付';
						}

					}
					uni.hideLoading();
				});
			}
		}
	}
</script>

<style scoped>
	@import '../../../../static/css/index.css';

	page {
		background: #F2F2F2;
	}

	.orderBox {
		text-align: center;
		position: fixed;
		bottom: 0upx;
		background-color: #FFFFFF;
		width: 100%;
		height: max-content;
		justify-content: center;
		overflow: hidden;
	}

	.view_button {
		margin: 20upx;
		line-height: 60upx;
		font-size: 24upx;
		color: #333333;
		width: 150upx;
		height: 60upx;
		border-radius: 100upx;
		border: 3rpx solid #bababa;
	}

	.buy-box-center .buy-btn-copy {
		background: linear-gradient(to left, #FF0000 0, #FF0000 100%);
		display: block;
		border-radius: 50px;
		line-height: 40px;
		height: 40px;
		text-align: center;
		color: #fff;
		font-size: 16px;
		margin-left: 20upx;
		width: 580rpx;
		margin: 0 auto;
		margin-top: 10px;
		margin-bottom: 10px;
	}

	.order_box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 80rpx;
		width: 90%;
		margin: 0 auto;
	}
</style>
