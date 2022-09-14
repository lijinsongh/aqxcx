<template>
	<view class="content">
		<view class="view1" style="margin: 12upx;border-radius: 16upx;">
			<view style="margin-left: 33%;padding-top: 100upx;font-size: 29px;color: #FFFFFF;">¥ {{ money }}</view>
			<view style="display: flex;flex-direction: row;" v-if="isFaka == '否'">
				<view style="width: 50%; margin: 80upx 0 0 10upx;text-align: center;" @click="ketixian">
					<view style="font-size: 24upx;color: #FFFFFF;">可提现金额</view>
					<view style="font-size: 32upx;color: #FFFFFF; margin-top: 10upx;">¥ {{ money }}</view>
				</view>
				<view style="background-color: #FFFFFF;width: 1upx; height: 70upx;margin: 80upx 0 0 10upx;"></view>
				<view style="width: 50%; margin: 80upx 0 0 10upx;text-align: center;" @click="leijitixian">
					<view style="font-size: 24upx;color: #FFFFFF;">累计提现金额</view>
					<view style="font-size: 32upx;color: #FFFFFF; margin-top: 10upx;">¥ {{ totalMoney }}</view>
				</view>
			
			</view>
			<view style="display: flex;flex-direction: row;" v-if="isFaka != '否'">
				<view style="width: 30%; margin: 80upx 0 0 10upx;text-align: center;" @click="ketixian">
					<view style="font-size: 24upx;color: #FFFFFF;">可提现金额</view>
					<view style="font-size: 32upx;color: #FFFFFF; margin-top: 10upx;">¥ {{ money }}</view>
				</view>
				<view style="background-color: #FFFFFF;width: 1upx; height: 70upx;margin: 80upx 0 0 10upx;"></view>
				<view style="width: 30%; margin: 80upx 0 0 10upx;text-align: center;" @click="leijitixian">
					<view style="font-size: 24upx;color: #FFFFFF;">累计提现金额</view>
					<view style="font-size: 32upx;color: #FFFFFF; margin-top: 10upx;">¥ {{ totalMoney }}</view>
				</view>
				<view style="background-color: #FFFFFF;width: 1upx; height: 70upx;margin: 80upx 0 0 10upx;" v-if="isFaka != '否'"></view>
				<view style="width: 30%; margin: 80upx 0 0 10upx;text-align: center;" @click="Clickkedikou" v-if="isFaka != '否'">
					<view style="font-size: 24upx;color: #FFFFFF;">可抵扣金额</view>
					<view style="font-size: 32upx;color: #FFFFFF; margin-top: 10upx;">¥ {{ kedikou * 0.01 }}</view>
				</view>
			</view>
		</view>

		<view class="view2" style="margin: 12upx;border-radius: 16upx;">
			<view class="view2-view" @tap="showM">
				<image src="https://taobaoshop.xianmxkj.com/static/img/my/wallet/recharge1.png" class="view2-view-image"></image>
				<view class="view2-view1">
					<view class="view2-view-text">联系客服</view>
					<image src="https://taobaoshop.xianmxkj.com/static/img/my/mygoright.png" class="view2-view-image-right"></image>
				</view>
			</view>
			<view class="view2-view" @tap="getOut">
				<image src="https://taobaoshop.xianmxkj.com/static/img/my/wallet/withdrawal.png" class="view2-view-image"></image>
				<view class="view2-view1">
					<view class="view2-view-text">立即提现</view>
					<image src="https://taobaoshop.xianmxkj.com/static/img/my/mygoright.png" class="view2-view-image-right"></image>
				</view>
			</view>
			<view class="view2-view" @tap="goduihuan" v-if="isFaka != '否'">
				<image src="https://taobaoshop.xianmxkj.com/static/img/my/wallet/duihuan.png" class="view2-view-image"></image>
				<view class="view2-view1">
					<view class="view2-view-text">抵扣兑换</view>
					<image src="https://taobaoshop.xianmxkj.com/static/img/my/mygoright.png" class="view2-view-image-right"></image>
				</view>
			</view>
			<view class="view2-view" @click="goZhifuBao">
				<image src="https://taobaoshop.xianmxkj.com/static/img/my/wallet/recharge.png" class="view2-view-image"></image>
				<view class="view2-view1">
					<view class="view2-view-text">提现账号</view>
					<image src="https://taobaoshop.xianmxkj.com/static/img/my/mygoright.png" class="view2-view-image-right"></image>
				</view>
			</view>

			<view class="view2-view" @tap="list">
				<image src="https://taobaoshop.xianmxkj.com/static/img/my/wallet/moneydetails.png" class="view2-view-image"></image>
				<view class="view2-view1">
					<view class="view2-view-text">提现记录</view>
					<image src="https://taobaoshop.xianmxkj.com/static/img/my/mygoright.png" class="view2-view-image-right"></image>
				</view>
			</view>
			<view class="view2-view" @tap="moneyList">
				<image src="https://taobaoshop.xianmxkj.com/static/img/my/wallet/bao.png" class="view2-view-image"></image>
				<view class="view2-view1">
					<view class="view2-view-text">钱包明细</view>
					<image src="https://taobaoshop.xianmxkj.com/static/img/my/mygoright.png" class="view2-view-image-right"></image>
				</view>
			</view>
			<view class="view2-view" @tap="dikoudetail" v-if="isFaka != '否'">
				<image src="https://taobaoshop.xianmxkj.com/static/img/my/wallet/dikou.png" class="view2-view-image"></image>
				<view class="view2-view1">
					<view class="view2-view-text">抵扣明细</view>
					<image src="https://taobaoshop.xianmxkj.com/static/img/my/mygoright.png" class="view2-view-image-right"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				money: '0.00',
				zhifubao: '',
				kedikou:'0.00',
				weixin: '',
				isFaka:'否',
				walletmoney: '0.00',
				totalMoney: '0.00',
				zhifubaoName: '',
			}
		},
		onShow: function(e) {
			let isFaKa = this.$queue.getData('isFaKa');
			if(isFaKa){
				this.isFaka = isFaKa;
			}
			this.getMoney();
			this.getwalletMoney();
			this.getDikouMoney();
			this.$Request.getT('/common/type/44').then(res => {
				if (res.status == 0) {
					if (res.data && res.data.value) {
						this.weixin = res.data.value;
					}
				}
			});
		},
		methods: {
			showM() {
				uni.showModal({
					title: '联系客服',
					content: '如需加快转账可以联系客服！微信号：' + this.weixin,
					showCancel: false,
					confirmText: '一键复制',
					success: res => {
						uni.setClipboardData({
							data: this.weixin,
							success: r => {
								this.$queue.showToast('复制成功');
							}
						});
					},
					fail: () => {},
					complete: () => {}
				});
			},
			ketixian() {
				uni.showModal({
					showCancel: false,
					confirmColor: '#FF0000',
					title: '可提现金额说明',
					content: '可提现金额是我们通过做任务所得金额和通过在商城中购买商品后返利的佣金，这个金额是可提现的'
				});
			},
			leijitixian() {
				uni.showModal({
					showCancel: false,
					confirmColor: '#FF0000',
					title: '累计提现金额说明',
					content: '累计提现金额是我们过往提现成功金额的总计'
				});
			},
			Clickkedikou() {
				uni.showModal({
					showCancel: false,
					confirmColor: '#FF0000',
					title: '可抵扣金额说明',
					content: '可抵扣金额是我们在商城中领取优惠券时用的抵扣金额，额度不足时请及时充值，否则将无法领取优惠券'
				});
			},
			buketixian() {
				uni.showModal({
					showCancel: false,
					confirmColor: '#FF0000',
					title: '不可提现金额说明',
					content: '不可提现金额是用来发布任务时扣款的金额，如果金额不足就无法发布任务，则需要及时充值'
				});
			},
			getRecharge() {
				uni.navigateTo({
					url: '../task/recharge'
				});
			},
			getRechargeDetail() {
				uni.navigateTo({
					url: '../task/rechargeDetail'
				});
			},
			moneyList() {
				uni.navigateTo({
					url: '/package/pages/member/moneyList'
				})
			},
			dikoudetail() {
				uni.navigateTo({
					url: '/pages/member/dikoudetail'
				})
			},
			goduihuan() {
				uni.navigateTo({
					url: '/pages/member/duihuan'
				})
			},
			ordersRelation() {
				uni.navigateTo({
					url: '/pages/member/ordersRelation'
				})
			},
			list() {
				uni.navigateTo({
					url: '/pages/member/cashList'
				})
			},
			goZhifuBao() {
				uni.navigateTo({
					url: "/pages/member/zhifubao"
				})
			},
			getwalletMoney() {
				let userId = this.$queue.getData('userId');
				this.$Request.getT('/userMoney/selectUserMoney?userId=' + userId).then(res => {
					if (res.status === 0) {
						this.walletmoney = res.data.money;
					}
					uni.hideLoading();
				});
			},
			getDikouMoney() {
				let that = this;
				let token = this.$queue.getData("token");
				let userId = this.$queue.getData("userId");
				let relation_id = this.$queue.getData('relation_id');
				if (token) {
					//可以提现金额查询预估收入查询
					this.$Request.postJson("/couponAmount/findCouponAmountByUserId?userId="+relation_id).then(res => {
						if (res.status === 0 && res.data) {
							that.kedikou = parseFloat(res.data.userDeductQuota).toFixed(2);
						} else {
							that.kedikou = '0.00';
						}
					});
				}
			},
			getMoney() {
				let that = this;
				let token = this.$queue.getData("token");
				let userId = this.$queue.getData("userId");
				if (token) {
					//this.$queue.showLoading("加载中...");
					//可以提现金额查询预估收入查询
					this.$Request.getT("/cash/money/" + userId).then(res => {
						if (res.status === 0 && res.data) {
							that.money = parseFloat(res.data).toFixed(2);
						} else if (res.status === -102) {
							this.$queue.showToast(res.msg);
							this.$queue.logout();
							uni.navigateTo({
								url: '/pages/member/register'
							});
						} else {
							that.money = '0.00';
							//this.$queue.showToast(res.msg);
						}
					});
					this.$Request.getT("/cash/userinfo/" + userId).then(res => {
						if (res.status === 0 && res.data) {
							that.zhifubao = res.data.zhifubao;
							that.zhifubaoName = res.data.zhifubaoName;
						}
						uni.hideLoading();
					});
					//总的提现记录
					this.$Request.getT("/cash/countByRelationId/" + this.$queue.getData("relation_id")).then(res => {
						if (res.status === 0 && res.data) {
							that.totalMoney = parseFloat(res.data).toFixed(2);
						} else {
							that.totalMoney = '0.00';
						}
					});
				}

			},
			getOut() {
				uni.navigateTo({
					url: '/package/pages/member/cashDetail'
				});
			},
		},
	}
</script>

<style lang='less'>
	@import "../../static/css/index.css";

	.view1 {
		/* width: 100%; */
		height: 375upx;
		background: -webkit-linear-gradient(left, #FF0000 0, #f15b6c 100%);
		background: -o-linear-gradient(left, #FF0000 0, #f15b6c 100%);
		background: -ms-linear-gradient(left, #FF0000 0, #f15b6c 100%);
		background: -webkit-gradient(linear, right top, left top, color-stop(0, #FF0000), to(#f15b6c));
		background: -o-linear-gradient(right, #FF0000 0, #f15b6c 100%);
		background: -webkit-linear-gradient(right, #FF0000 0, #f15b6c 100%);
		background: linear-gradient(to left, #FF0000 0, #f15b6c 100%);
	}

	.view2 {
		background-color: #ffffff;
		/* width: 100%; */

		/* margin-top: 20upx; */
	}

	.view2-view {
		display: flex;
		flex-direction: row;
		width: 100%;
		height: 100upx;
		align-items: center;
	}

	.view2-view1 {
		display: flex;
		flex-direction: row;
		width: 90%;
		align-items: center;
	}

	.view2-view-image {
		margin-left: 40upx;
		width: 50upx;
		height: 50upx;
	}

	.view2-view-text {
		font-size: 14px;
		color: #000000;
		margin-left: 40upx;
		width: 80%;
	}

	.view2-view-image-right {
		width: 18upx;
		height: 20upx;
		margin-left: 30upx;
	}
</style>
