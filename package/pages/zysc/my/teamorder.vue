<template>
	<view class="content">
		<view class="bg">
			<view style="text-align: center;display: flex;padding: 100upx 32upx 0upx 32upx;color: #FFFFFF;">
				<view style="width: 49%;text-align: center;">
					<view>本月未到账（元）</view>
					<view style="margin-top: 28upx;font-size: 60upx;">{{sum1}}</view>
				</view>
				<view style="background: #FFFFFF;width: 2upx;"></view>
				<view style="width: 49%;text-align: center;">
					本月已到账（元）
					<view style="margin-top: 28upx;font-size: 60upx;">{{sum2}}</view>
				</view>
			</view>
			<view style="font-size: 24upx;color: #FFFFFF;padding-top: 30upx; padding-left: 95upx;">注：确认收货后七个工作日金额自动到账</view>
		</view>
		<view class="navbar">
			<view class="nav-item" :class="{current: index == 1}" @tap="zhishu(1)">
				直属收益
			</view>
			<view class="nav-item" :class="{current: index == 3}" @tap="tuan(3)">
				非直属收益
			</view>
		</view>
		<view class="navbar">
			<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{current: tabCurrentIndex === index}"
			 @click="tabClick(index)">
				{{item.text}}
			</view>
		</view>
		<swiper :current="tabCurrentIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item class="tab-content" v-for="(tabItem,tabIndex) in navList" :key="tabIndex">
				<scroll-view class="list-scroll-content" @scrolltolower="loadMore" scroll-y>
					<!-- 订单列表 -->
					<view v-for="(item,index) in list" :key="index" class="order-item" @click="toGoodsInfo(item.goodsId)">
						<view class="i-top b-b">
							<text class="time" style="font-size: 14px;color: grey">{{item.createAt}}付款</text>
							<text class="state" style="color: #FF2638" v-if="item.status==1"> 未到账</text>
							<text class="state" style="color: #0e80d2" v-if="item.status==2"> 已到账</text>
						</view>
						<view class="goods-box-single">
							<image class="goods-img" :src='item.goodsImg'></image>
							<view class="right">
								<text class="title clamp">{{item.goodsTitle}}</text>
								<text class="attr-box">店铺名称：淇湘优购自营店铺</text>
								<text class="price">实付款 ￥{{item.payMoney}}</text>
								<view v-if="moneyFrom === 1" style="display: flex;flex-direction: column;">
									<text class="attr-box">直属名称 {{item.lowerUserName}}</text>
									<text class="attr-box">直属提成 ￥{{item.commissionMoney}}</text>
								</view>
								<view v-if="moneyFrom != 1" style="display: flex;flex-direction: column;">
									<text class="attr-box">非直属名称 {{item.lowerUserName}}</text>
									<text class="attr-box">非直属提成 ￥{{item.commissionMoney}}</text>
								</view>
							</view>
						</view>
						<view class="price-box">
							<text>预估收入</text>
							<text class="price" style="color: #FF2638;font-weight: bold">
								{{item.commissionPrice}}
							</text>
						</view>
					</view>
					<!-- 悬浮上拉 -->
					<view class="scroll_top" @tap="topScrollTap" v-bind:class="[scrollTop ? 'active' : '', '']" style="bottom: 56px;"><text
						 class="iconfont icon-shangla"></text></view>

					<!-- 加载更多提示 -->
					<view class="s-col is-col-24" v-if="list.length > 0">
						<load-more :loadingType="loadingType" :contentText="contentText"></load-more>
					</view>
					<!-- 空白页 -->
					<empty class="empty-content" v-if="list.length === 0" des="暂无数据"></empty>

				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import empty from "@/components/empty";

	export default {
		components: {
			empty
		},
		data() {
			return {
				tabFromIndex: 0,
				index: 1,
				moneyFrom: 1,
				page: 0,
				size: 10,
				sum1: 0,
				sum2: 0,
				toBase64Url: 'https://api.shengqianxiong.com.cn/retabeback.png',
				tabCurrentIndex: 0,
				scrollTop: false,
				list: [],
				loadingType: 0,
				navList: [{
						state: 0,
						text: '全部'
					}, {
						state: 1,
						text: '未到账'
					},
					{
						state: 2,
						text: '已到账'
					}
				],
				contentText: {
					contentdown: '上拉显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				}
			};
		},
		onPageScroll: function(e) {
			this.scrollTop = e.scrollTop > 200;
		},
		onShow() {
			this.tabCurrentIndex = 0;
			this.loadData('');
			this.getLIst();
		},
		methods: {
			zhishu(nub) {
				this.index = nub
				this.page = 0;
				this.moneyFrom = nub;
				this.list = [];
				this.loadData('');
			},
			tuan(nub) {
				this.index = nub
				this.page = 0;
				this.moneyFrom = nub;
				this.list = [];
				this.loadData('');
			},
			toGoodsInfo(id) {
				uni.navigateTo({
					url: '../index/commoditydetail?ordersId=' + id
				});
			},
			loadMore() {
				this.loadData('');
			},
			getLIst() {
				let userId = this.$queue.getData('userId');
				this.$Request.getT('/ordersRelation/tuanStatistaical?userId=' + userId).then(res => {
					if (res.status === 0) {
						if (res.data.sum1) {
							this.sum1 = res.data.sum1;
						} else {
							this.sum1 = 0;
						}
						if (res.data.sum2) {
							this.sum2 = res.data.sum2;
						} else {
							this.sum2 = 0;
						}
					}
				});
			},
			loadData(type) {
				this.loadingType = 1;
				uni.showLoading({
					title: '加载中...'
				});
				let userId = this.$queue.getData('userId');
				this.$Request.getT('/ordersRelation/list?page=' + this.page + '&moneyFrom=' + this.moneyFrom + '&size=' + this.size +
					'&userId=' + userId + '&status=' + this.tabCurrentIndex).then(res => {
					if (res.status === 0) {
						if (this.page === 0 || res.status) {
							this.list = [];
						}
						res.data.content.forEach(d => {
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
			//swiper 切换
			changeTab(e) {
				this.tabCurrentIndex = e.target.current;
			},
			//顶部tab点击
			tabClick(index) {
				this.tabCurrentIndex = index;
				this.page = 0;
				this.loadData('');
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
			this.loadData('');
		},
		onPullDownRefresh: function() {
			this.page = 0;
			this.loadData('Refresh');
		}
	}
</script>

<style lang="scss">
	@import '../../../../static/less/index.less';
	@import '../../../../static/css/index.css';

	page,
	.content {
		background: $page-color-base;
		height: 100%;
	}

	.bg {
		// background: #FFFFFF;
		background-image: url(https://taobao.xianmxkj.com/static/img/zysc/retabeback.png);
		background-size: 100%;
		height: 350upx;
	}

	.swiper-box {
		height: calc(100% - 40px);
	}

	.list-scroll-content {
		height: 100%;
	}

	.navbar {
		display: flex;
		height: 40px;
		padding: 0 5px;
		background: #fff;
		box-shadow: 0 1px 5px rgba(0, 0, 0, .06);
		position: relative;
		z-index: 10;

		.nav-item {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 15px;
			color: $font-color-dark;
			position: relative;

			&.current {
				color: $base-color;

				&:after {
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 44px;
					height: 0;
					border-bottom: 2px solid $base-color;
				}
			}
		}
	}

	.uni-swiper-item {
		height: auto;
	}

	.order-item {
		display: flex;
		flex-direction: column;
		padding-left: 15px;
		background: #fff;
		margin-top: 8px;

		.i-top {
			display: flex;
			align-items: center;
			height: 40px;
			padding-right: 16px;
			font-size: $font-base;
			color: $font-color-dark;
			position: relative;

			.time {
				flex: 1;
			}

			.state {
				font-weight: 400;
				color: $base-color;
			}

			.del-btn {
				padding: 6px 0 6px 18px;
				font-size: $font-lg;
				color: $font-color-light;
				position: relative;

				&:after {
					content: '';
					width: 0;
					height: 16px;
					border-left: 1px solid $border-color-dark;
					position: absolute;
					left: 10px;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}


		/* 单条商品 */
		.goods-box-single {
			display: flex;
			padding: 10px 0;

			.goods-img {
				width: 100px;
				height: 100px;
			}

			.right {
				flex: 1;
				display: flex;
				flex-direction: column;
				padding: 0 15px 0 12px;
				overflow: hidden;

				.title {
					height: 32px;
					overflow: hidden;
					text-overflow: ellipsis;
					font-size: $font-base + 2upx;
					color: $font-color-dark;
					line-height: 1;
				}

				.attr-box {
					font-size: $font-sm + 2upx;
					color: $font-color-light;
					padding: 5px 0px;
				}

				.price {
					font-size: $font-base + 2upx;
					color: $font-color-dark;

					&:before {
						font-size: $font-sm;
						margin: 0 1px 0 4px;
					}
				}
			}
		}

		.price-box {
			display: flex;
			justify-content: flex-end;
			align-items: baseline;
			padding: 10px 16px;
			font-size: $font-sm + 2upx;
			color: $font-color-light;

			.num {
				margin: 0 4px;
				color: $font-color-dark;
			}

			.price {
				font-size: $font-lg;
				color: $font-color-dark;

				&:before {
					content: '￥';
					font-size: $font-sm;
					margin: 0 1px 0 4px;
				}
			}
		}

		.action-box {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			height: 50px;
			position: relative;
			padding-right: 16px;
		}

		.action-btn {
			width: 80px;
			height: 30px;
			margin: 0;
			margin-left: 12px;
			padding: 0;
			text-align: center;
			line-height: 30px;
			font-size: $font-sm + 2upx;
			color: $font-color-dark;
			background: #fff;
			border-radius: 100px;

			&:after {
				border-radius: 100px;
			}

			&.recom {
				background: #fff9f9;
				color: $base-color;

				&:after {
					border-color: #f7bcc8;
				}
			}
		}
	}


	/* load-more */
	.uni-load-more {
		display: flex;
		flex-direction: row;
		height: 40px;
		align-items: center;
		justify-content: center
	}

	.uni-load-more__text {
		font-size: 14px;
		color: #999
	}

	.uni-load-more__img {
		height: 24px;
		width: 24px;
		margin-right: 10px
	}

	.uni-load-more__img>view {
		position: absolute
	}

	.uni-load-more__img>view view {
		width: 6px;
		height: 2px;
		border-top-left-radius: 1px;
		border-bottom-left-radius: 1px;
		background: #999;
		position: absolute;
		opacity: .2;
		transform-origin: 50%;
		animation: load 1.56s ease infinite
	}

	.uni-load-more__img>view view:nth-child(1) {
		transform: rotate(90deg);
		top: 2px;
		left: 9px
	}

	.uni-load-more__img>view view:nth-child(2) {
		transform: rotate(180deg);
		top: 11px;
		right: 0
	}

	.uni-load-more__img>view view:nth-child(3) {
		transform: rotate(270deg);
		bottom: 2px;
		left: 9px
	}

	.uni-load-more__img>view view:nth-child(4) {
		top: 11px;
		left: 0
	}

	.load1,
	.load2,
	.load3 {
		height: 24px;
		width: 24px
	}

	.load2 {
		transform: rotate(30deg)
	}

	.load3 {
		transform: rotate(60deg)
	}

	.load1 view:nth-child(1) {
		animation-delay: 0s
	}

	.load2 view:nth-child(1) {
		animation-delay: .13s
	}

	.load3 view:nth-child(1) {
		animation-delay: .26s
	}

	.load1 view:nth-child(2) {
		animation-delay: .39s
	}

	.load2 view:nth-child(2) {
		animation-delay: .52s
	}

	.load3 view:nth-child(2) {
		animation-delay: .65s
	}

	.load1 view:nth-child(3) {
		animation-delay: .78s
	}

	.load2 view:nth-child(3) {
		animation-delay: .91s
	}

	.load3 view:nth-child(3) {
		animation-delay: 1.04s
	}

	.load1 view:nth-child(4) {
		animation-delay: 1.17s
	}

	.load2 view:nth-child(4) {
		animation-delay: 1.3s
	}

	.load3 view:nth-child(4) {
		animation-delay: 1.43s
	}

	@-webkit-keyframes load {
		0% {
			opacity: 1
		}

		100% {
			opacity: .2
		}
	}
</style>
