<template>
	<view class="myTask">
		<view class="tui-tabs" v-if="className != 'tuikuan'">
			<scroll-view id="tab-bar" scroll-with-animation class="tui-scroll-h" :scroll-x="true" :show-scrollbar="false" style="border-bottom: 2upx solid #F8F8F8;">
				<view style="display: flex;">
					<view v-for="(tab, index) in tabBars" :id="tab.id" :data-current="index" @tap='tabSlect(tab)'>
						<!-- <view class="tui-tab-item-title" style="margin-left: 50upx;margin-right: 15upx;background: #FFFFFF;" :class="{ 'tui-tab-item-title-active': tabIndex == tab.id }">{{ tab.name }}{{tab.count != 0 ? '('+tab.count+')' : ''}}</view> -->
						
						<view>
							<view class="tui-tab-item-title1" style="background: #FFFFFF;"
								:class="{ 'tui-tab-item-title-active1': tabIndex == tab.id }">
								{{ tab.name }}{{tab.count != 0 ? '('+tab.count+')' : ''}}
								<view style="display: flex;justify-content: center;">
									<image v-if="tabIndex == tab.id" src="/static/img/bottomselect.png"
										style="width: 32upx;height: 12upx;">
									</image>
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- #ifdef MP-WEIXIN -->
		<view :style="className != 'tuikuan' ? 'margin-top: 20rpx;' : 'margin-top: 20rpx;'">
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<view :style="className != 'tuikuan' ? 'margin-top: 100rpx;' : 'margin-top: 20rpx;'">
				<!-- #endif -->
				<!-- #ifdef APP-PLUS -->
				<view style="margin-top: 20rpx;">
					<!-- #endif -->
				<view style="border-radius: 20rpx;background: #FFFFFF;width: 710upx;height: max-content;margin: 20upx" v-for="(item,index) in newsList"
				 :key='index'>
					<view style="display: flex;">
						<view style="display: flex;padding: 5rpx 20rpx;width: 75%;" @click="goDianpu(item.storeId,item.storeName)">
							<image src="/static/shop.png" style="width: 35upx;height: 35upx;margin-top: 20upx;margin-left: 10upx;"></image>
							<view v-if="item.storeName" style="padding: 15upx 0 0upx 10upx;text-align: left;color: #000;font-size: 32upx;">{{item.storeName}}</view>
							<view v-else style="padding: 15upx 0 0upx 10upx;text-align: left;color: #000;font-size: 32upx;">淇湘优购自营店铺</view>
							<image v-if="item.storeName" src="/static/img/goods/right_icon.png" style="width: 15upx;height: 25upx;margin-top: 26upx;margin-left: 10upx;"></image>
						</view>
						<view style="padding: 20upx 0 0upx 0upx;width: 20%;text-align: right;color: #FF332F;font-size: 28upx;">{{item.status}}</view>
					</view>
					<view style="display: flex;padding: 20upx 10upx 0 10upx" @tap='goOrderDetail(item.id)'>
						<image :src="item.img" style="width: 30%;height: 190upx;margin-left: 20upx;border-radius: 4upx;"></image>
						<view style="margin-left: 20upx;width: 68%;">
							<view style="font-size: 32upx;color: #333333;width: 97%;height: 84upx;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;">{{item.title}}</view>
							<view style="display: flex;width: 90%;margin-top: 10upx;" v-if="item.detailJson">
								<view style="font-size: 28upx;color: #999999;">商品规格：</view>
								<view style="font-size: 28upx;color: #999999;">{{item.detailJson}}</view>
							</view>
							<view :style="item.detailJson ? 'display: flex;height: 50upx;margin-top: 20rpx;': 'display: flex;height: 50upx;margin-top: 70rpx;'">
								<view style="display: flex;width: 45%;">
									<view v-if="item.orderType != 4" style="font-size: 28upx;color: #333333;padding-bottom:10rpx;text-align: left;">实付款:<text style="font-size: 38rpx;color: #FF3333;"> <text style="font-size: 28rpx;">¥</text>{{item.payMoney}}</text></view>
									<view v-else style="font-size: 26upx;color: #333333;padding-bottom:10rpx;text-align: left;">实付积分：<text style="font-size: 38rpx;">{{item.payMoney}}</text></view>
								</view>
								<view v-if="item.relationList && item.relationList.length > 1" style="font-size: 26upx;color: #909399;padding-bottom:10rpx;width: 50%;text-align: right;">佣金:
									¥{{item.relationList[1].commissionPrice}}</view>
							</view>
						</view>
					</view>
					<view v-if="item.relationList && item.relationList.length > 0" style="margin-left: 35%;font-size: 26upx;color: #909399;">直属【{{item.relationList[0].userName}}】佣金:
						￥{{item.relationList[0].commissionPrice}}</view>
					<view v-if="item.relationList && item.relationList.length > 2" style="margin-left: 35%;font-size: 26upx;color: #909399;margin-top: 10rpx;margin-bottom: 20rpx;">非直属【{{item.relationList[2].userName}}】佣金:
						￥{{item.relationList[2].commissionPrice}}</view>
					<view style="height: 2rpx;margin-left: 20rpx;margin-right: 20rpx;background: #E6E6E6;margin-top: 20rpx;"></view>
					<view style="overflow: hidden;">
						<view style="display: flex;text-align: center;width: max-content;float: right;padding-bottom: 10rpx;">
							<view v-if="item.status == '待收货' && item.isExpress === 1" class='view_button' style="color: #e10a07;border: 3rpx solid #e10a07;"
							 @tap='goconfirm(item)'>确认收货</view>
							<view v-else-if="item.status == '已退款' || item.status == '已评价' || item.status == '已取消'" class='view_button' @tap='deleteOder(item.id)'>删除订单</view>
							<view v-else-if="item.status == '待发货'" class='view_button' @tap='goRemind(item)'>提醒发货</view>
							<view v-else-if="item.status == '待评价'" class='view_button' @tap='gopinglun(item)'>去评价</view>
							<view v-else-if="item.status == '拼团中'" class='view_button' @tap='goPinkCancle'>取消订单</view>
							<view v-else-if="item.status == '待付款'" class='view_button'  @tap='goPay(item)'>去支付</view>
							<view v-else-if="item.status == '待使用' && item.isExpress === 3" class='view_button' @tap='goconfirm(item)'>确认使用</view>
							<view v-else class='view_button' style="border: none;" @tap='goPinkCancle'></view>
						</view>
					</view>
				</view>
				<!-- 悬浮上拉 -->
				<view class="scroll_top" @tap="topScrollTap" v-bind:class="[scrollTop ? 'active' : '', '']" style="bottom: 56px;"><text
					 class="iconfont icon-shangla"></text></view>

				<!-- 加载更多提示 -->
				<view class="s-col is-col-24" v-if="newsList.length > 0">
					<load-more :loadingType="loadingType" :contentText="contentText"></load-more>
				</view>
				<!-- 加载更多提示 -->
				<!-- #ifdef H5 -->
				<empty :style="className != 'tuikuan' ? 'margin-top: 155upx;' : 'margin-top: 80upx;'" v-if="newsList.length === 0"
				 des="暂无订单数据" show="false"></empty>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<empty class="empty-content1" :style="className != 'tuikuan' ? 'margin-top: 148rpx;' : 'margin-top: -20rpx;'" v-if="newsList.length === 0"
				 des="暂无订单数据" show="false"></empty>
				<!-- #endif -->
				<!-- #ifdef APP-PLUS -->
				<empty :style="className != 'tuikuan' ? 'margin-top: 80upx;' : 'margin-top: 0upx;'" v-if="newsList.length === 0"
				 des="暂无订单数据" show="false"></empty>
				<!-- #endif -->
			</view>
		</view>
</template>

<script>
	export default {
		data() {
			return {
				//0全部 1待支付 2已支付 3已完成 4已取消
				tabIndex: '0',
				tabBars: [{
						name: '全部',
						count: 0,
						id: '0'
					},
					{
						name: '待付款',
						count: 0,
						id: '1'
					},
					{
						name: '待发货',
						count: 0,
						id: '2'
					},
					{
						name: '待收货',
						count: 0,
						id: '3'
					},
					{
						name: '待评价',
						count: 0,
						id: '4'
					}
				],
				itemName: '',
				state: 0,
				isExpress: 0,
				newsList: [],
				className: '',
				type: 1,
				page: 0,
				size: 10,
				loadingType: 0,
				scrollTop: false,
				contentText: {
					contentdown: '上拉显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				}
			}
		},
		onShow() {
			let userId = this.$queue.getData('userId');
			if (userId) {
				this.getSelectOrderList('', this.tabIndex);
			}
		},
		onLoad(d) {
			if (d.itemName) {
				this.className = d.itemName;
				if (d.itemName === 'daifukuan') {
					this.tabIndex = 1;
				} else if (d.itemName === 'daifahuo') {
					this.tabIndex = 2;
				} else if (d.itemName === 'daishouhuo') {
					this.tabIndex = 3;
				} else if (d.itemName === 'yishouhuo') {
					this.tabIndex = 4;
				} else if (d.itemName === 'tuikuan') {
					uni.setNavigationBarTitle({
						title: '退款/售后'
					})
				}
			}
		},
		methods: {
			goDianpu(id, name) {
				if (!id) {
					return;
				}
				uni.navigateTo({
					url: '/packagetwo/pages/index/dianpu?storeId=' + id + '&storeName=' + name
				});
			},
			getDingDanCount() {
				let userId = this.$queue.getData('userId');
				this.$Request.getT('/orders/count?userId=' + userId).then(res => {
					if (res.status === 0) {
						this.tabBars[1].count = res.data.count1;
						this.tabBars[2].count = res.data.count2;
						this.tabBars[3].count = res.data.count3;
						this.tabBars[4].count = res.data.count4;
					}
				});
			},
			getSelectOrderList(type, status) {
				this.getDingDanCount();
				this.loadingType = 1;
				uni.showLoading({
					title: '加载中...'
				});
				let userId = this.$queue.getData('userId');
				if (this.className === 'tuikuan') {
					this.$Request.getT('/orders/findMyRefundList?page=' + this.page + '&size=' + this.size + '&userId=' + userId).then(
						res => {
							if (res.status === 0) {
								if (this.page === 0 || res.status) {
									this.newsList = [];
								}
								res.data.content.forEach(d => {
									if (d.status === 1) {
										d.status = '待付款'
									} else if (d.status === 2) {
										d.status = '待发货'
									} else if (d.status === 3) {
										if (d.isExpress != 3) {
											d.status = '待收货'
										} else {
											d.status = '待使用'
										}
									} else if (d.status === 4) {
										d.status = '待评价'
									} else if (d.status === 5) {
										d.status = '已取消'
									} else if (d.status === 6) {
										d.status = '退款中'
									} else if (d.status === 7) {
										d.status = '已退款'
									} else if (d.status === 8) {
										d.status = '拒绝退款'
									} else if (d.status === 9) {
										d.status = '拼团中'
									} else if (d.status === 10) {
										d.status = '已评价'
									}
									this.newsList.push(d);
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
				} else {
					this.$Request.getT('/orders/findMyList?page=' + this.page + '&size=' + this.size + '&userId=' + userId +
						'&status=' +
						status).then(res => {
						if (res.status === 0) {
							if (this.page === 0 || res.status) {
								this.newsList = [];
							}
							res.data.content.forEach(d => {
								if (d.status === 1) {
									d.status = '待付款'
								} else if (d.status === 2) {
									d.status = '待发货'
								} else if (d.status === 3) {
									if (d.isExpress != 3) {
										d.status = '待收货'
									} else {
										d.status = '待使用'
									}
								} else if (d.status === 4) {
									d.status = '待评价'
								} else if (d.status === 5) {
									d.status = '已取消'
								} else if (d.status === 6) {
									d.status = '退款中'
								} else if (d.status === 7) {
									d.status = '已退款'
								} else if (d.status === 8) {
									d.status = '拒绝退款'
								} else if (d.status === 9) {
									d.status = '拼团中'
								} else if (d.status === 10) {
									d.status = '已评价'
								}
								this.newsList.push(d);
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
				}

			},
			gopinglun(item) {
				uni.navigateTo({
					url: './pinglun?ordersId=' + item.id,
				});
			},
			goPinkCancle() {
				uni.showModal({
					title: '温馨提示',
					content: '规定时间内未拼团成功，将自动取消订单并退款哦',
					showCancel: false,
					confirmText: '知道了',
					success: res => {

					}
				});
			},
			goRemind(item) {
				this.$Request.getT('/orders/remind?ordersId=' + item.id + '&merchantId=' + item.merchantId).then(res => {
					if (res.status === 0) {
						this.$queue.showToast('已提醒商家及时发货，请注意查收');
					} else {
						this.$queue.showToast(res.msg);
					}
				});
			},
			gocancle(list) {
				uni.showModal({
					title: '温馨提示',
					content: '确定要取消此订单吗？',
					showCancel: true,
					cancelText: '取消',
					confirmText: '确认',
					success: res => {
						if (res.confirm) {
							this.$Request.getT('/orders/cancel?id=' + list.id).then(res => {
								if (res.status === 0) {
									this.page = 0;
									this.getSelectOrderList('', this.tabIndex);
								} else {
									this.$queue.showToast(res.msg);
								}
							});
						}
					}
				});
			},
			goconfirm(list) {
				uni.showModal({
					title: '温馨提示',
					content: list.isExpress != 3 ? '确定收到货物了吗？' : '确定核销完成了吗？',
					showCancel: true,
					cancelText: '取消',
					confirmText: '确认',
					success: res => {
						if (res.confirm) {
							this.$Request.getT('/orders/confirm?id=' + list.id).then(res => {
								if (res.status === 0) {
									this.page = 0;
									this.getSelectOrderList('', this.tabIndex);
								} else {
									this.$queue.showToast(res.msg);
								}
							});
						}
					}
				});
			},
			goPay(list) {
				uni.redirectTo({
					url: '../my/payment?money=' + list.payMoney + '&title=' + list.title + '&img=' + list.img + '&id=' + list.id + '&orderType=' + list.orderType
				});
			},
			goOrderDetail(id) {
				uni.navigateTo({
					url: '../member/orderdetail?id=' + id
				});
			},
			deleteOder(id) {
				uni.showModal({
					title: '温馨提示',
					content: '确定要删除此订单吗？',
					showCancel: true,
					cancelText: '取消',
					confirmText: '确认',
					success: res => {
						if (res.confirm) {
							this.$Request.getT('/orders/delete?id=' + id).then(res => {
								if (res.status === 0) {
									this.page = 0;
									this.getSelectOrderList('', this.tabIndex);
								} else {
									this.$queue.showToast(res.msg);
								}
							});
						}
					}
				});
			},
			tabSlect(item) {
				this.switchTab(item.id);
			},
			switchTab(index) {
				this.page = 0;
				this.tabIndex = index;
				this.newsList = [];
				this.getSelectOrderList('switch', this.tabIndex);
			},
			topScrollTap: function() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
			}
		},
		//统一登录跳转
		goLoginInfo() {
			uni.navigateTo({
				url: '/pages/member/register'
			});
		},
		onPageScroll: function(e) {
			this.scrollTop = e.scrollTop > 200;
		},
		onReachBottom: function() {
			this.page = this.page + 1;
			this.getSelectOrderList('', this.tabIndex);
		},
		onPullDownRefresh: function() {
			this.page = 0;
			this.getSelectOrderList('Refresh', this.tabIndex);
		}
	}
</script>

<style lang="less" scoped>
	@import '../../../../static/less/index.less';
	@import '../../../../static/css/index.css';

	page {
		background: #F2F2F2;
	}

	.empty-content {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		position: fixed;
		left: 0;
		top: 0;
		/* #ifdef MP-WEIXIN */
		top: 80rpx;
		/* #endif */
		right: 0;
		bottom: 0;
		background: #FFFFFF;
		padding-bottom: 120upx;

		&-image {
			width: 200upx;
			height: 200upx;
		}
	}

	.empty-content1 {
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

	.view_button {
		margin: 20upx 20upx 10upx 30upx;
		line-height: 60upx;
		font-size: 28upx;
		color: #333333;
		width: 160upx;
		height: 60upx;
		border-radius: 9rpx;
		border: 3rpx solid #bababa;
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

	.tui-scroll-h1 {
		width: 750rpx;
		height: 80rpx;
		background-color: #ffffff;
		flex-direction: row;
		/* #ifndef APP-PLUS */
		white-space: nowrap;
		/* #endif */
		/* #ifdef H5 */
		position: fixed;
		top: 43px;
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

	.tui-tab-item-title1 {
		display: flex;
		flex-direction: column;
		color: #555;
		width: 185rpx;
		font-size: 30rpx;
		height: 80rpx;
		line-height: 55rpx;
		flex-wrap: nowrap;
		text-align: center;
		/* #ifndef APP-PLUS */
		white-space: nowrap;
		/* #endif */
	}
	
	.tui-tab-item-title-active1 {
		color: #FF1D48;
		font-size: 32upx;
		font-weight: bold;
		// border-bottom-width: 6upx;
		text-align: center;
	}
</style>
