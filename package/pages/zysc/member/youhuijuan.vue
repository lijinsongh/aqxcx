<template>
	<view>
		<view class="tui-tabs">
			<scroll-view id="tab-bar" scroll-with-animation class="tui-scroll-h" :scroll-x="true" :show-scrollbar="false">
				<view style="display: flex;">
					<view v-for="(tab, index) in tabBars" :id="tab.id" :data-current="index" @tap='tabSlect(tab)'>
						<view class="tui-tab-item-title" style="margin-left: 200upx;" :class="{ 'tui-tab-item-title-active': tabIndex == tab.id }">{{ tab.name }}</view>
					</view>
				</view>
			</scroll-view>
		</view>

		<view style="width: 100%;background: #FFFFFF;position: fixed;z-index: 200;bottom: 0;height: 100rpx;align-items: center;line-height: 100rpx;display: flex;box-shadow: rgba(177, 177, 177, 0.3) 1px 1px 15rpx 3rpx;"
		 @tap='zhongxin()'>
			<view style="margin-left: 35%;">抢购更多好劵</view>
			<image src="https://api.shengqianxiong.com.cn/file/uploadPath/2021/10/08/9a7ea5f18fae76c2f9c9d5b3e8323f4e.png" style="width: 13rpx;height: 18rpx;margin-left: 15rpx;"></image>
		</view>

		<!-- #ifdef MP-WEIXIN -->
		<view style="width: 100%;margin-top: -20rpx;padding-bottom: 70rpx;">
			<view style="width: 100%;margin-left: 12rpx;" v-for='(item,index) in list' :key='index'>
				<view style="background-image: url('https://api.shengqianxiong.com.cn/img/20201109/0d67c059b6064a9f9eb011e0d494b973.png');background-size: 100%;height: 240rpx;margin-top: 10rpx;border-radius: 10rpx;">
					<!-- #endif -->
					<!-- #ifdef H5 -->
					<view style="width: 100%;margin-top: 90rpx;">
						<view style="width: 100%;margin-left: 12rpx;" v-for='(item,index) in list' :key='index'>
							<view style="background-image: url('https://api.shengqianxiong.com.cn/img/20201109/0d67c059b6064a9f9eb011e0d494b973.png');background-size: 100%;height: 240rpx;margin-top: 10rpx;border-radius: 10rpx;">
								<!-- #endif -->
								<!-- #ifdef APP-PLUS -->
								<view style="width: 100%;margin-top: 20rpx;">
									<view style="width: 100%;margin-left: 12rpx;" v-for='(item,index) in list' :key='index'>
										<view style="background-image: url('https://api.shengqianxiong.com.cn/img/20201109/0d67c059b6064a9f9eb011e0d494b973.png');background-size: 100%;height: 240rpx;margin-top: 10rpx;border-radius: 10rpx;">
											<!-- #endif -->
											<view style="width: 100%;border-radius: 10rpx;padding: 10rpx;">
												<view style="display: flex;">
													<image :src="item.coupon.goodsImages" style="width: 140rpx;height:140rpx;margin: 25rpx 20rpx 20rpx 20rpx;"></image>
													<view style="margin-top: 25rpx;width: 48%;">
														<view style="font-size: 28rpx;color: #000000;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{item.coupon.couponName}}</view>
														<view style="font-size: 22rpx;color: #666666;border: 1rpx solid #909090;width: 80rpx;text-align: center;margin-top: 20rpx;line-height: 30rpx;">{{item.type === 2 ? '折扣券' : '通用劵'}}</view>
														<view style="font-size: 24rpx;color: #666666;margin-top: 15rpx;">有效期至{{item.failureTime}}</view>
													</view>
													<view style="text-align: center;width: 20%;margin-top: 60rpx;text-align: right;">
														<view v-if="item.type == 1" style="color: #e23922;font-size: 44rpx;"><text style="font-size: 22rpx;">￥</text>{{item.lessMoney}}</view>
														<view v-if="item.type == 2" style="color: #e23922;font-size: 33rpx;">{{item.lessMoney * 10}}折券</view>
														<view style="font-size: 24rpx;margin-top: 15rpx;">满{{item.minMoney}}可用</view>
													</view>
												</view>
												<!-- #ifdef MP-WEIXIN -->
												<view style="display: flex;margin-left: 30rpx;margin-top: 3rpx;">
													<view style="width: 78%;font-size: 22rpx;">在线支付专享。</view>
													<view style="background: #F15B6C;color: #FFFFFF;font-size: 22rpx;padding: 5rpx;border-radius: 5rpx;width: 100rpx;text-align: center;"
													 @tap='shiyong(item)'>立即使用</view>
												</view>
												<!-- #endif -->
												<!-- #ifndef MP-WEIXIN -->
												<view style="display: flex;margin-left: 30rpx;margin-top: 5rpx;">
													<view style="width: 78%;font-size: 22rpx;margin-top: 5rpx;">在线支付专享。</view>
													<view style="background: #F15B6C;margin-top: 5rpx;color: #FFFFFF;font-size: 22rpx;padding: 5rpx;border-radius: 5rpx;width: 100rpx;text-align: center;height: 30rpx;line-height: 25rpx;"
													 @tap='shiyong(item)'>立即使用</view>
												</view>
												<!-- #endif -->
											</view>
										</view>
									</view>
								</view>
								<!-- 悬浮上拉 -->
								<view class="scroll_top" @tap="topScrollTap" v-bind:class="[scrollTop ? 'active' : '','']" style="bottom: 56px;">
									<text class="iconfont icon-shangla"></text>
								</view>

								<!-- 加载更多提示 -->
								<view class="s-col is-col-24" v-if="list.length > 0">
									<load-more :loadingType="loadingType" :contentText="contentText"></load-more>
								</view>
								<!-- 加载更多提示 -->
								<!-- 加载更多提示 -->
								<!-- #ifdef APP-PLUS -->
								<empty v-if="list.length === 0" des="您当前没有优惠券哦~" style="margin-top: 80rpx;" show="false"></empty>
								<!-- #endif -->
								<!-- #ifndef APP-PLUS -->
								<empty v-if="list.length === 0" des="您当前没有优惠券哦~" show="false"></empty>
								<!-- #endif -->
							</view>
</template>

<script>
	export default {
		data() {
			return {
				page: 0,
				size: 10,
				loadingType: 0,
				scrollTop: false,
				tabIndex: 2,
				bj1: 'https://api.shengqianxiong.com.cn/img/20201109/0d67c059b6064a9f9eb011e0d494b973.png',
				list: [],
				tabBars: [{
						name: '折扣券',
						id: '2',
					},
					{
						name: '通用劵',
						id: '1',
					}
				],
				contentText: {
					contentdown: '上拉显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多劵了'
				}
			};
		},
		onShow() {
			this.getYouHuiJuanList('', this.tabIndex);
		},
		methods: {
			zhongxin() {
				uni.navigateTo({
					url: './lingjuanzhongxin'
				});
			},
			getCouponIssueList() {
				let userId = this.$queue.getData('userId');
				this.$Request.getT('/selfCouponIssue/useList?goodsId=&userId=' + userId).then(res => {
					if (res.status === 0) {
						res.data.forEach(d => {
							this.CouponIssueList.push(d);
						});
					}
				});
			},
			shiyong(item) {
				if (item.type === 2) {
					uni.navigateTo({
						url: '../zysc/index/commoditydetail?ordersId=' + item.goodsIds
					});
				} else {
					uni.switchTab({
						url: '../zysc/index/index'
					})
				}
			},
			getYouHuiJuanList(type, status) {
				this.loadingType = 1;
				uni.showLoading({
					title: '加载中...'
				});
				let userId = this.$queue.getData('userId');
				this.$Request.getT('/selfCouponUser/userList?page=' + this.page + '&size=' + this.size + '&userId=' + userId +
					'&goodsId=&type=' + status).then(res => {
					if (res.status === 0) {
						if (this.page === 0 || res.status) {
							this.list = [];
						}
						res.data.content.forEach(d => {
							if (!d.coupon.goodsImages) {
								d.coupon.goodsImages =
									'https://api.shengqianxiong.com.cn/img/20201111/ce41a2e45ba0415991d8ffd099f1b1c6.png';
							}
							this.list.push(d);
						});
						if (res.data.content.length === this.size) {
							this.loadingType = 0;
						} else {
							this.loadingType = 3;
						}
					} else {
						this.loadingType = 2;
					}
					uni.hideLoading();
					if (type === 'Refresh') {
						uni.stopPullDownRefresh(); // 停止刷新
					}
				});
			},
			tabSlect(item) {
				this.tabIndex = item.id;
				this.page = 0;
				this.getYouHuiJuanList('', this.tabIndex);
			},
			topScrollTap: function() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
			}
		},
		onPageScroll: function(e) {
			this.scrollTop = e.scrollTop > 200;
		},
		onReachBottom: function() {
			this.page = this.page + 1;
			this.getYouHuiJuanList('', this.tabIndex);
		},
		onPullDownRefresh: function() {
			this.page = 0;
			this.getYouHuiJuanList('Refresh', this.tabIndex);
		}
	};
</script>

<style>
	@import '../../../../static/css/index.css';

	page {
		background: #F5F0F0;
	}

	.tui-tabs {
		flex: 1;
		flex-direction: column;
		overflow: hidden;
		background-color: #fafafa;
		/* #ifdef MP-ALIPAY || MP-BAIDU */
		height: 100vh;
		/* #endif */
	}

	.tui-scroll-h {
		width: 750rpx;
		height: 80rpx;
		background-color: #ffffff;
		flex-direction: row;
		/* #ifndef APP-PLUS */
		white-space: nowrap;
		/* #endif */
		/* #ifdef H5 */
		position: fixed;
		top: 44px;
		left: 0;
		z-index: 999;
		/* #endif */
	}

	.tui-line-h {
		/* #ifdef APP-PLUS */
		height: 1rpx;
		background-color: #cccccc;
		/* #endif */
		position: relative;
	}

	/* #ifndef APP-PLUS*/
	.tui-line-h::after {
		content: '';
		position: absolute;
		border-bottom: 1rpx solid #cccccc;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		bottom: 0;
		right: 0;
		left: 0;
	}

	/* #endif */
	.tui-tab-item {
		/* #ifndef APP-PLUS */
		display: flex;
		/* #endif */
		// flex-wrap: nowrap;
		// padding-left: 34rpx;
		// padding-right: 34rpx;
	}

	.tui-tab-item-title {
		color: #555;
		font-size: 30rpx;
		height: 80rpx;
		line-height: 80rpx;
		flex-wrap: nowrap;
		/* #ifndef APP-PLUS */
		white-space: nowrap;
		/* #endif */
	}

	.tui-tab-item-title-active {
		color: #E10A07;
		font-size: 32upx;
		font-weight: bold;
		border-bottom: 1rpx solid #E10A07;
		border-bottom-width: 5upx;
		text-align: center;
	}

	.limapboxqing2 {

		font-size: 28upx;
		color: #333333;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}
</style>
