<template>
	<view>
		<!-- #ifndef H5 -->
		<view style="position: fixed;top: 0upx;height: 180upx;z-index: 99;width: 100%;">
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<view style="position: fixed;top: 75upx;height: 180upx;z-index: 99;width: 100%;">
		<!-- #endif -->
			<!-- 搜索板块 -->
			<view class="index-header" style="background: #F94C4C;">
				<view class="cu-bar search">
					<view class="search-form radius" style="border-radius: 16rpx;" @tap='goSearch'>
						<text class="cuIcon-search"></text>
						<input @input="InputFocus" :adjust-position="false" type="text" placeholder="搜索商品 - 好货等你"
							confirm-type="search"></input>
					</view>
				</view>
			</view>
		</view>

		<view class="tui-tabs">
			<scroll-view id="tab-bar" scroll-with-animation :scroll-left="scrollLeft" scroll-with-animation
				class="tui-scroll-h" :scroll-x="true" :show-scrollbar="false" style="height: 110upx;width: 100%;">
				<view style="display: flex;height: 110upx;width: 200upx;">
					<view v-for="(tab, index) in SecKillTime" :id="tab.secKillTimeId" :data-current="index"
						@tap='tabSlect(tab)' style="width: 200upx;height: 110upx;display: flex;align-items: center;">
						<view v-if="index != 0" style="height: 80upx;width: 1upx;display: flex;align-items: center;border:1px dashed #BBBBBB;"></view>
						<view class="tui-tab-item-title"
							style="display: flex;flex-direction: column;width: 200upx;text-align: center;height: 110upx;justify-content: center;"
							:class="{ 'tui-tab-item-title-active': tabIndex == tab.secKillTimeId }">
							{{ tab.startHour }}:00
							<view>{{tab.status}}</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- #ifdef H5 -->
		<view style="display: flex;flex-wrap: wrap;margin-top: 200upx;">
			<!-- #endif -->
			<!-- #ifndef H5 -->
			<view style="display: flex;flex-wrap: wrap;margin-top: 210upx;">
				<!-- #endif -->
				<view class="seckillItem" @tap='goDetail(item.secKillId)' v-for="(item,index) in list" :key='index'>
					<image :src="item.coverImg"></image>
					<view class="item_right">
						<view style="height: 80upx;">
							<text class="limapboxqing2">{{ item.title }}</text>
						</view>
						<view class="right_money"><text>¥</text>
							{{item.price}} <text
								class="oldMoney">￥{{ item.originalPrice }}</text>
						</view>
						<view style="width: 100%;display: flex;">
							<view style="width: 60%;">
								<view class="fanli_money">返利{{item.descrition ? item.descrition : 0}}</view>
								<view class="right_sales">
									{{item.goods.sales}}人已购买
								</view>
							</view>
							<view style="width: 40%;display: flex;justify-content: flex-end;align-items: center;">
								<view class="goBtn">{{tabStatus}}</view>
							</view>
						</view>
					</view>
				</view>

				<!-- 悬浮上拉 -->
				<view class="scroll_top" @tap="topScrollTap" v-bind:class="[scrollTop ? 'active' : '','']"
					style="bottom: 56px;">
					<text class="iconfont icon-shangla"></text>
				</view>

				<!-- 加载更多提示 -->
				<view class="s-col is-col-24" v-if="list.length > 0">
					<load-more :loadingType="loadingType" :contentText="contentText"></load-more>
				</view>
				<!-- 加载更多提示 -->
				<!-- #ifdef APP-PLUS -->
				<empty v-if="list.length === 0" des="暂无商品数据" show="false" style="margin-top: 80rpx;"></empty>
				<!-- #endif -->
				<!-- #ifdef H5 -->
				<empty v-if="list.length === 0" des="暂无商品数据" show="false"></empty>
				<!-- #endif -->
			</view>
		</view>
</template>

<script>
	export default {
		data() {
			return {
				tabIndex: '1',
				list: [],
				SecKillTime: [],
				relation: false,
				page: 0,
				isEnable: '否',
				scrollLeft: 0,
				size: 10,
				tabStatus: '',
				loadingType: 0,
				type: 1,
				scrollTop: false,
				contentText: {
					contentdown: '上拉显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				}
			}
		},
		onShow() {
			let a = this.$queue.getData('isEnable');
			if (a === '是') {
				let b = this.$queue.getData('isLieBiaoEnable');
				if (b) {
					this.isEnable = b;
				} else {
					this.isEnable = a;
				}
			} else {
				this.isEnable = a;
			}
		},
		onLoad(d) {
			let relation_id = this.$queue.getData('relation_id');
			if (relation_id && relation_id !== 'undefined') {
				this.relation = true;
			} else {
				this.relation = false;
			}
			this.getallList();
		},
		methods: {
			goSearch() {
				uni.navigateTo({
					url: '/pages/girdList/search'
				});
			},
			goDetail(id) {
				if (this.tabStatus === '抢购中') {
					let token = this.$queue.getData('token');
					if (token) {
						uni.navigateTo({
							url: './scekAndTeamDetail?className=miaosha&ordersId=' + id
						});
					} else {
						this.goLoginInfo();
					}
				} else {
					this.$queue.showToast('当前时段的秒杀活动还未开始，请耐心等待！')
				}
			},
			//统一登录跳转
			goLoginInfo() {
				uni.navigateTo({
					url: '/pages/member/register'
				});
			},
			getSeckillUserList(type, secKillTimeId) {
				this.loadingType = 1;
				uni.showLoading({
					title: '加载中...'
				});
				this.$Request.getT('/selfSecKill/userList?page=' + this.page + '&size=' + this.size + '&secKillTimeId=' +
					secKillTimeId).then(res => {
					if (res.status === 0) {
						if (this.page === 0 || res.status) {
							this.list = [];
						}
						let grade = this.$queue.getData('grade');
						res.data.content.forEach(d => {
							d.descrition = '';
							if (d.commissionPrice != 0) {
								if (grade) {
									if (this.relation) {
										d.descrition = ((parseFloat(d.memberPrice) * parseFloat(d
											.commissionPrice)) * parseFloat(grade)).toFixed(
											2);
									} else {
										d.descrition = ((parseFloat(d.price) * parseFloat(d
											.commissionPrice)) * parseFloat(grade)).toFixed(2);
									}
								} else {
									if (this.relation) {
										d.descrition = ((parseFloat(d.memberPrice) * parseFloat(d
												.commissionPrice)) * parseFloat(this.$queue
												.minMoney()))
											.toFixed(2);
									} else {
										d.descrition = ((parseFloat(d.price) * parseFloat(d
												.commissionPrice)) * parseFloat(this.$queue
												.minMoney()))
											.toFixed(2);
									}
								}
							}
							d.goods.sales = d.goods.sales > 10000 ? (d.goods.sales / 10000).toFixed(1) +
								'万' : d.goods.sales;
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
			getallList() {
				this.$Request.getT('/selfSecKillTime/allList').then(res => {
					if (res.status === 0) {
						for (var i = 0; i < res.data.length; i++) {
							if (res.data[i].status > 1) {
								if (res.data[i].status === 2) {
									this.tabIndex = res.data[i].secKillTimeId;
									res.data[i].status = '抢购中';
									this.getSeckillUserList('', this.tabIndex);
									this.tabStatus = '抢购中';
								} else if (res.data[i].status === 3) {
									res.data[i].status = '即将开始';
								}
								this.SecKillTime.push(res.data[i]);
							}
						}
					}
				});
			},
			tabSlect(item) {
				this.tabStatus = item.status
				this.switchTab(item.secKillTimeId);
			},
			switchTab(index) {
				this.page = 0;
				this.tabIndex = index;
				this.scrollLeft = (index - 1) * 50;
				this.list = [];
				this.getSeckillUserList('switch', index);
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
			this.getSeckillUserList('', this.tabIndex);
		},
		onPullDownRefresh: function() {
			this.page = 0;
			this.getSeckillUserList('Refresh', this.tabIndex);
		}
	}
</script>

<style lang="less" scoped>
	@import '../../../../static/less/index.less';
	@import '../../../../static/css/index.css';

	page {
		background: #F8F8F8;
	}

	.seckillItem {
		display: flex;
		width: 710upx;
		height: 264upx;
		background-color: #FFFFFF;
		border-radius: 20upx;
		margin-left: 20upx;
		margin-top: 20upx;
		padding: 15upx 20upx;
		box-shadow: rgba(183, 183, 183, 0.3) 1px 1px 10px 1px;

		image {
			width: 256upx;
			height: 234upx;
		}

		.item_right {
			margin-left: 20upx;
			width: 390upx;
			height: 230upx;

			.goBtn {
				width: fit-content;
				padding: 0upx 20upx;
				height: 56upx;
				line-height: 50upx;
				border-radius: 8upx;
				background-color: rgba(249, 76, 76, 100);
				color: rgba(255, 255, 255, 100);
				font-size: 24upx;
				text-align: center;
				font-family: Microsoft Yahei;
				border: 3upx solid rgba(187, 187, 187, 100);
			}

			.fanli_money {
				width: fit-content;
				padding: 0upx 20upx;
				font-size: 26upx;
				max-width: 400upx;
				margin-top: 10upx;
				background: #FFBC09;
				text-align: center;
				height: 40upx;
				line-height: 40upx;
				color: #FFFFFF;
				border-radius: 10upx;
			}

			.right_sales {
				font-size: 24upx;
				color: #999999;
				margin-top: 15upx;
			}

			.right_money {
				margin-top: 10upx;
				font-size: 40upx;
				color: #FF2A47;
				font-weight: 600;

				text {
					font-size: 30rpx;
				}

				.oldMoney {
					font-size: 24upx;
					color: grey;
					text-decoration: line-through;
					margin-left: 16upx;
				}
			}
		}
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

	.indexr {
		color: #FFFFFF;
		font-size: 22upx;
		padding-left: 12upx;
		display: inline-block;
		padding-right: 13upx;
		border-radius: 8upx;
		margin-right: 8upx;
		padding-top: 4upx;
		line-height: 38upx;

		background: -moz-linear-gradient(left, #FB2C1A 0, #FF2A46 100%);
		background: -webkit-gradient(linear, left top, left right, color-stop(0, #FB2C1A), color-stop(100%, #FF2A46));
		background: -webkit-linear-gradient(left, #FB2C1A 0, #FF2A46 100%);
		background: -o-linear-gradient(left, #FB2C1A 0, #FF2A46 100%);
		background: -ms-linear-gradient(left, #FB2C1A 0, #FF2A46 100%);
		background: linear-gradient(to left, #FB2C1A 0, #FF2A46 100%);
	}

	.tui-scroll-h {
		background-color: #ff7c77;
		width: 750rpx;
		height: 79rpx;
		flex-direction: row;
		/* #ifndef H5 */
		position: fixed;
		top: 100upx;
		left: 0;
		z-index: 999;
		/* #endif */
		/* #ifdef H5 */
		position: fixed;
		top: 175upx;
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
	}

	.tui-tab-item-title {
		color: #555;
		font-size: 30rpx;
		height: 80rpx;
		line-height: 40rpx;
		flex-wrap: nowrap;
		text-align: center;
		white-space: nowrap;
		border-bottom: none;
	}

	.tui-tab-item-title-active {
		background: #F94C4C;
		color: #ffffff;
		font-size: 32upx;
		font-weight: bold;
		// border-bottom: 1px solid rgb(225, 10, 7);
		text-align: center;
	}

	.limapboxqing2 {
		font-size: 26upx;
		color: #333333;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
</style>
