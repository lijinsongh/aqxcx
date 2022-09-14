<template>
	<view style="padding-bottom: 50upx;">
		<image src="https://taobaoshop.xianmxkj.com/meituan/topview.png" class="top_view_image"></image>
		<view class="center_view">
			<image src="https://taobaoshop.xianmxkj.com/meituan/meituanjianbian.png" class="center_view_backgroundImage"></image>
			<view class="center_view_item">
				<view style="display: flex;">
					<image src="https://taobaoshop.xianmxkj.com/meituan/meituanlogo.png" class="logo"></image>
					<view class="logo_text">美团外卖返利</view>
				</view>

				<view class="view_item_jieshao">
					<view>
						<image src="https://taobaoshop.xianmxkj.com/meituan/lingjuan.png" class="jieshao_image"></image>
						<view class="jieshao_text">先领券</view>
					</view>
					<image class="jieshao_right" src="https://taobaoshop.xianmxkj.com/meituan/xiangyou.png"></image>
					<view>
						<image src="https://taobaoshop.xianmxkj.com/meituan/xiadan.png" class="jieshao_image"></image>
						<view class="jieshao_text">再下单</view>
					</view>
					<image src="https://taobaoshop.xianmxkj.com/meituan/xiangyou.png" class="jieshao_right"></image>
					<view>
						<image src="https://taobaoshop.xianmxkj.com/meituan/fanli.png" class="jieshao_image"></image>
						<view class="jieshao_text">拿返利</view>
					</view>
				</view>

				<view class="youhui_view">
					<image src="https://taobaoshop.xianmxkj.com/meituan/youhuijuan.png" class="youhui_image"></image>
					<view class="item_view">
						<view style="width: 54%;">
							<view class="item_name">美团外卖红包</view>
							<view class="item_zhekou">下单再返最高4.8%
							</view>
						</view>
						<view class="zuigao">最高可领 <text style="color: #FF1A1F;">￥ <text
									style="font-size: 42upx;color: #FF1A1F;">56</text>
							</text> </view>
					</view>
				</view>

				<view class="Hongbao" @tap="goHongbao">领红包点外卖</view>
			</view>
		</view>

		<view class="btn_view">
			<view class="btn_view1" @tap="sharurl()">分享文案</view>
			<!-- <view class="btn_view2">复制文案</view> -->
		</view>

		<view class="fanli_view">
			<view class="zhuyi">返利注意事项</view>
			<view class="item_view">
				<view class="yuan"></view>
				<view class="text">美团外卖，必须使用带渠道专享标记的优惠券有返利</view>
			</view>
			<view class="item_view">
				<view class="yuan"></view>
				<view class="text">领券后在红包有效期内下单均有返利。</view>
			</view>
			<view class="item_view">
				<view class="yuan"></view>
				<view class="text">收货后半小时内会有返利通知提醒</view>
			</view>
			<view class="item_view">
				<view class="yuan"></view>
				<view class="text">无论美团新老用户，每个手机号每天可领一次，红包金额随机发放</view>
			</view>


			<!-- <view style="display: flex;align-items: center;margin-left: 31upx;margin-top: 38upx;">
				<view style="width: 12upx;height: 12upx;background: #FCCF17;border-radius: 50%;margin-top: 13upx;">
				</view>
				<view style="font-size: 24upx;font-weight: 500;color: #3E393E;margin-left: 15upx;">领券后在红包有效期内下单均有返利。
				</view>
			</view>
			<view style="display: flex;align-items: center;margin-left: 31upx;margin-top: 38upx;">
				<view style="width: 12upx;height: 12upx;background: #FCCF17;border-radius: 50%;margin-top: 13upx;">
				</view>
				<view style="font-size: 24upx;font-weight: 500;color: #3E393E;margin-left: 15upx;">收货后半小时内会有返利通知提醒
				</view>
			</view>
			<view style="">
				<view style="width: 12upx;height: 12upx;background: #FCCF17;border-radius: 50%;margin-top: 13upx;">
				</view>
				<view style="font-size: 24upx;font-weight: 500;color: #3E393E;margin-left: 15upx;">
					无论美团新老用户，每个手机号每天可领一次，红包金额随机发放</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				releationId: 0,
				shareUrl:'',
				tuiguang:'',
				url: ''
			}
		},
		onLoad() {
			//获取全局邀请码
			this.$Request.getT('/common/type/4').then(res => {
				if (res.status == 0) {
					if (res.data && res.data.value) {
						this.releationId = res.data.value;
						this.getUrl();
					}
				}
			});
			
			this.$Request.getT('/common/type/130').then(res => {
				if (res.status == 0) {
					if (res.data && res.data.value) {
						this.tuiguang = res.data.value;
					}
				}
			});
		},
		methods: {
			sharurl() {
				let that = this;
			
				uni.showModal({
					title: '分享文案',
					content: this.tuiguang + this.url,
					showCancel: true,
					cancelText: '关闭',
					confirmText: '一键复制',
					success: res => {
						if (res.confirm) {
							uni.setClipboardData({
								data: this.tuiguang +  this.url,
								success: function() {
									console.log('success');
									that.$queue.showToast('复制成功');
								}
							});
						}
					}
				});
			},
			shareWeiXin() {
				let relation_id = this.$queue.getData('relation_id') ? this.$queue.getData('relation_id') : this
					.releationId;
				let shareData = {
					shareUrl: this.shareUrl,
					shareTitle: '邀请你加入淇湘优购！先领券，再购物，更划算！',
					shareContent: this.tuiguang,
					shareImg: this.$queue.publicYuMing() + '/logo.png',
					type: 0
				};
				appShare(shareData, res => {
					console.log('分享成功回调', res);
				});
			},
			getUrl() {
				let relation_id = this.$queue.getData('relation_id') ? this.$queue.getData('relation_id') : this
					.releationId;
				let meituanOpen = this.$queue.getData('meituanOpenUrl');
				this.$Request.getT('/order/getMtUrl?relationId=' + relation_id + '&linkType=4').then(res => {
					if (res.status === 0) {
						this.url = res.data;
					} else {
						this.url = meituanOpen + '' + relation_id;
					}
					console.log(this.url)
				});
			},
			goHongbao() {
				// #ifdef MP-WEIXIN
				uni.navigateToMiniProgram({
					appId: 'wxde8ac0a21135c07d',
					path: this.url,
					fail(res) {
						console.error(res)
					}
				})
				// #endif
				
				// #ifdef H5
				window.location.href = this.url;
				//#endif
				
				// #ifdef APP-PLUS
				// url=' + meituanOpen  + '' + relation_id
				this.$queue.setData('mturl', this.url);
				uni.navigateTo({
					url: '/pages/member/webview?class=mt&url=123'
				});
				// #endif
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #FEBD0B;
	}

	.top_view_image {
		width: 750upx;
		height: 438upx;
		background-size: 100%;
	}

	.center_view {
		height: 560upx;
		margin: 0 32upx;
		margin-top: -7upx;
	}

	.fanli_view {
		width: 686upx;
		height: 492upx;
		background: #FFFFFF;
		border-radius: 20upx;
		margin: 20upx 32upx;
		text-align: center;

		.zhuyi {
			font-size: 30upx;
			color: #333333;
			font-weight: bold;
			padding-top: 23upx;
		}

		.item_view {
			display: flex;
			margin-left: 31upx;
			margin-top: 38upx;
			text-align: left;
		}

		.yuan {
			width: 12upx;
			height: 12upx;
			background: #FCCF17;
			border-radius: 50%;
			margin-top: 13upx;
		}

		.text {
			font-size: 24upx;
			font-weight: 600;
			color: #3E393E;
			margin-left: 15upx;
		}
	}

	.btn_view {
		height: 80upx;
		display: flex;
		margin: 32upx;

		.btn_view1 {
			width: 680upx;
			height: 80upx;
			background: #FF1A1F;
			border-radius: 8upx;
			font-size: 30upx;
			color: #FFFFFF;
			text-align: center;
			line-height: 80upx;
		}

		.btn_view2 {
			width: 327upx;
			height: 80upx;
			background: #FFFFFF;
			border-radius: 8upx;
			font-size: 30upx;
			color: #333333;
			text-align: center;
			margin-left: 32upx;
			line-height: 80upx;
		}
	}

	.center_view_backgroundImage {
		width: 686upx;
		height: 560upx;
		background-size: 100%;
		position: absolute;
	}

	.center_view_item {
		position: absolute;
		margin-left: 30upx;

		.Hongbao {
			text-align: center;
			line-height: 80upx;
			font-weight: bold;
			margin: 27upx 20upx;
			width: 580upx;
			height: 80upx;
			background: linear-gradient(0deg, #FFB447 0%, #FFE59F 100%);
			border-radius: 40px;
			font-size: 30upx;
			color: #6C3906;
		}

		.youhui_view {
			width: 638upx;
			height: 175upx;
			margin-top: 37upx;

			.item_view {
				position: absolute;
				display: flex;
				margin: 50upx;
				width: 100%;
			}

			.youhui_image {
				width: 638upx;
				height: 175upx;
				position: absolute;
				background-size: 100%;
			}

			.item_name {
				font-size: 30upx;
				color: #6C3906;
				font-weight: 800;
			}

			.zuigao {
				font-size: 24upx;
				color: #333333;
				font-weight: bold;
				margin-top: 10upx;
			}

			.item_zhekou {
				font-size: 20upx;
				color: #FDBF60;
				margin-top: 10upx;
				font-weight: 500;
			}
		}

		.logo {
			width: 64upx;
			height: 65upx;
		}

		.logo_text {
			font-size: 30upx;
			color: #6C3906;
			font-weight: 800;
			margin-left: 20upx;
			margin-top: 20upx;
		}

		.view_item_jieshao {
			display: flex;
			align-items: center;
			margin-top: 31upx;
			margin-left: 20upx;

			.jieshao_image {
				width: 70upx;
				height: 70upx;
			}

			.jieshao_text {
				font-size: 24upx;
				color: #666666;
			}

			.jieshao_right {
				width: 64upx;
				height: 21upx;
				margin-left: 58upx;
				margin-right: 64upx;
			}
		}
	}
</style>
