<template>
	<view>
		<view class="view_top_background" :style="{backgroundImage:'url('+banner1+')'}">
			<view style="background-color: #000000;height: 300rpx;opacity: 0.5;"></view>
			<view style="margin-left: 20rpx;margin-top: -270rpx;z-index: 1;padding: 10rpx;">
				<view style="display: flex;width: 100%;height: 60rpx;z-index: 1;">
					<image @tap='goBack'
						src="https://shop.shengqianxiong.com.cn/img/20201219/a9255089a6784261b3eb228250f0db26.png"
						style="width: 25rpx;height: 40rpx;margin-top: 10rpx;margin-left: 30rpx;"></image>
					<input confirm-type="search" @confirm="getList1()" type="text" v-model="title"
						style="margin-left: 7%;width: 500rpx;border-radius: 50rpx;background: #FFFFFF;z-index: 1;font-size: 28rpx;height: 60rpx;padding-left: 20rpx;"
						placeholder="搜索" />
					<view
						style="width: 80rpx;height: 60rpx;margin-left: 35rpx;z-index: 1;text-align: center;padding-top: 8rpx;"
						@tap='tabSlect(1)'>
						<image
							src="https://shop.shengqianxiong.com.cn/img/20201219/acebcf0bf50d4192b3f3fc2d6d01dff8.png"
							style="width: 40rpx;height: 30rpx;"></image>
						<view style="color: #FFFFFF;text-align: center;line-height: 40rpx;font-size: 20rpx;">分类</view>
					</view>
				</view>
				<view style="display: flex;margin-top: 20rpx;">
					<image :src="logo ? logo : '/static/logo2.png'" class="view_top_logo"></image>
					<view style="width: 60%;display: flex;z-index: 1">
						<view style="margin-top: 30rpx;z-index: 1">
							<view style="display: flex;" @tap='goDianPuDetail'>
								<view class="view_top_shopName">{{storeName}}</view>
								<image
									src="https://api.shengqianxiong.com.cn/img/20201202/229c89fd2a854d0080dfdcc51a9a3768.png"
									style="margin-left: 10rpx;width: 15rpx;height: 25rpx;margin-top: 8rpx;"></image>
							</view>
							<view style="display: flex;z-index: 1;margin-top: 10rpx;margin-left: 10rpx;">
								<view style="font-size: 24rpx;color: #FFFFFF;margin-top: 3rpx;">评分</view>
								<!-- #ifdef MP-WEIXIN -->
								<urate style="margin-top: 27rpx;margin-left: -10rpx;z-index: 1;" :size='13'
									:value="pinfen / 20" />
								<!-- #endif -->
								<!-- #ifndef MP-WEIXIN -->
								<urate style="margin-top: 6rpx;margin-left: 5rpx;z-index: 1;" :size='13'
									:value="pinfen / 20" />
								<!-- #endif -->
								<view class="view_top_salf">粉丝：{{number}}</view>
							</view>
						</view>
					</view>

					<view
						style="margin-top: 30rpx;z-index: 1;background: #FF2D36;width: 120rpx;height: 48rpx;border-radius: 50rpx;text-align: center;line-height: 48rpx;color: #FFFFFF;"
						@click="shoucang">{{shoucangMessage}}</view>
				</view>
			</view>
		</view>

		<view class="navbar1" v-if="tabIndex == 0">
			<view v-for="(item, index) in tabBars1" :key="index" class="nav-item"
				:class="{current: tabIndex1 == item.id}" @click="tabSlect1(item)">
				{{item.name}}
			</view>
		</view>
		<!-- #ifdef H5 -->
		<view style="display: flex;flex-wrap: wrap;padding-bottom: 30upx;margin-left: 13upx" v-if="tabIndex == 0">
			<!-- #endif -->
			<!-- #ifndef H5 -->
			<view style="display: flex;flex-wrap: wrap;padding-bottom: 0upx;margin-left: 15rpx" v-if="tabIndex == 0">
				<!-- #endif -->
				<view
					style="width: 350upx;height: 510upx;background-color: #FFFFFF; border-radius: 20upx;margin-left: 10upx; margin-top: 15upx;box-shadow: rgba(183, 183, 183, 0.3) 1px 1px 10px 1px;"
					@tap='goDetail(item.id)' v-for="(item,index) in list" :key='index' v-if="list.length > 0">
					<image lazy-load="true" :src="item.coverImg"
						style="width: 350upx;height: 340upx;border-top-left-radius:20upx;border-top-right-radius:20upx;">
					</image>
					<view style="padding: 16upx 2upx 16upx 16upx;">
						<view style="width: 100%;height:  60upx;">
							<text class="limapboxqing2">{{ item.title }}</text>
						</view>
					</view>
					<view style="padding: 0rpx 15rpx;display: flex;margin:20rpx 0">
						<view v-if="relation"
							style="width: 40%;font-size: 38upx;color: #FF2A47;font-weight: 700;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
							<text style="font-size: 26rpx;">¥</text>{{item.memberPrice}}
						</view>
						<view v-if='!relation'
							style="width: 40%;font-size: 38upx;color: #FF2A47;font-weight: 700;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
							<text style="font-size: 26rpx;">¥</text>{{item.price}}
						</view>
						<view
							style="width: 60%;font-size: 24upx;color: #999999;margin-top: 8upx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;text-align: right;">
							{{item.sales}}人已购买
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
			</view>

			<view v-if="tabIndex == 1" style="margin-left: 15rpx;">
				<view style="padding: 20rpx 10rpx;font-size: 38rpx;font-weight: 700;">全部分类</view>
				<view style="display: flex;flex-wrap: wrap;position: relative;">
					<view v-for="(item,index) in TypeList" @click="selectListById(item.storeTypeId)"
						style="margin-left: 10upx;border-radius: 15upx;margin-top: 20upx;">
						<view style="width: 230rpx;">
							<image :src="item.img" style="width: 230rpx;height: 230rpx;border-radius: 20rpx;"></image>
							<view
								style="background-color: #000000;height: 230rpx;width: 230rpx;opacity: 0.3;margin-top: -235rpx;z-index: 2;border-radius: 20rpx;">
							</view>
							<view
								style="text-align: center;position: absolute;margin-top: -200rpx;margin-left: 20rpx;color: #FFFFFF;font-size: 28rpx;">
								{{item.name}}
							</view>
						</view>
					</view>
				</view>
			</view>
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
				provinces: '选择地址',
				consignee: '',
				relation: false,
				tabStatus: 'createAt',
				title: '',
				tabIndex: 0,
				tabIndex1: 0,
				tabBars: [{
						id: '0',
						name: '全部商品'
					},
					{
						id: '1',
						name: '分类查看'
					}
				],
				tabBars1: [{
						name: '综合',
						id: '0',
						status: 'createAt'
					},
					{
						name: '销量',
						id: '1',
						status: 'sales'
					},
					{
						name: '佣金',
						id: '2',
						status: 'commissionPrice'
					},
					{
						name: '超低价',
						id: '3',
						status: 'price'
					}
				],
				list: [],
				banner1: '',
				TypeList: [],
				sort: '',
				mobile: '',
				isEnable: '否',
				detail: '',
				createAt: '',
				isDefault: 0,
				pinfen: 0,
				storeTypeId: '',
				guanzhuIndex: 1,
				storeId: '',
				storeName: '',
				shoucangMessage: '关注',
				id: '',
				number: 0,
				sale: 0,
				page: 0,
				shipAddress: '',
				size: 10,
				logo: '',
				id: 0,
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
			this.storeId = d.storeId;
			this.storeName = d.storeName;
			uni.setNavigationBarTitle({
				title: d.storeName
			});
			let relation_id = this.$queue.getData('relation_id');
			if (relation_id && relation_id !== 'undefined') {
				this.relation = true;
			} else {
				this.relation = false;
			}
			this.getDianpuList(this.storeId);
			this.getCount(this.storeId);
			this.getList('');
			this.checkShoucang();
		},
		methods: {
			goDianPuDetail() {
				uni.navigateTo({
					url: './dianpuItem?storeId=' + this.storeId
				});
			},
			goBack() {
				if (this.tabIndex === 0 && this.storeTypeId === '') {
					uni.navigateBack();
				} else {
					this.tabIndex = 0;
					this.storeTypeId = '';
					this.page = 0;
					this.getList('');
				}
			},
			getCount(storeId) {
				this.$Request.getT('/self/store/count?storeId=' + storeId).then(res => {
					if (res.status === 0) {
						this.number = res.data.count1 > 10000 ? (res.data.count1 / 10000).toFixed(1) + '万' : res
							.data.count1;
					}
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
				if (this.guanzhuIndex === 0) {
					return;
				}
				if (this.shoucangMessage == '关注') {
					this.guanzhuIndex = 0;
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
						this.guanzhuIndex = 1;
					});
				} else {
					this.guanzhuIndex = 0;
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
							this.guanzhuIndex = 1;
						}
					});
				}
			},
			selectListById(storeTypeId) {
				this.tabIndex = 0;
				this.storeTypeId = storeTypeId;
				this.page = 0;
				this.list = [];
				this.getList('');
			},
			getTypeList() {
				this.$Request.getT('/self/storeType/findByStore?storeId=' + this.storeId).then(res => {
					if (res.status === 0) {
						this.TypeList = [];

						this.TypeList = res.data;
					}
				});
			},
			goDetail(id) {
				uni.navigateTo({
					url: '/package/pages/zysc/index/commoditydetail?ordersId=' + id
				});
			},
			getDianpuList(id) {
				this.$Request.getT('/self/store/find?id=' + id).then(res => {
					if (res.status === 0) {
						this.logo = res.data.logo;
						this.sale = res.data.sale > 10000 ? (res.data.sale / 10000).toFixed(1) + '万' : res.data
							.sale;
						this.shipAddress = res.data.shipAddress;
						this.pinfen = res.data.score;
						let image = res.data.img.split(',');
						this.banner1 = image[0];
					}
				});
			},
			getList(type) {
				this.loadingType = 1;
				uni.showLoading({
					title: '加载中...'
				});
				this.$Request.getT('/goods/userList?page=' + this.page + '&size=' + this.size + '&storeId=' + this
					.storeId +
					'&sort=' + this.tabStatus + '&storeTypeId=' + this.storeTypeId + '&title=' + this.title).then(
					res => {
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

						if (type === "Refresh") {
							uni.stopPullDownRefresh(); // 停止刷新
						}
					});
			},
			getList1() {
				this.loadingType = 1;
				uni.showLoading({
					title: '加载中...'
				});
				this.page = 0;
				this.$Request.getT('/goods/userList?page=' + this.page + '&size=' + this.size + '&storeId=' + this
					.storeId +
					'&sort=' + this.tabStatus + '&storeTypeId=' + this.storeTypeId + '&title=' + this.title).then(
					res => {
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
					});
			},
			tabSlect(index) {
				this.switchTab(index);
			},
			switchTab(index) {
				this.tabIndex = index;
				if (this.tabIndex === 0) {
					this.storeTypeId = '';
					this.page = 0;
					this.getList('');
				} else {
					this.getTypeList();
				}
			},
			tabSlect1(item) {
				this.switchTab1(item.id);
			},
			switchTab1(index) {
				this.page = 0;
				this.tabIndex1 = index;
				this.tabStatus = this.tabBars1[index].status;
				this.getList('');
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
			this.getList('');
		},
		onPullDownRefresh: function() {
			this.page = 0;
			this.getList('Refresh');
		}
	}
</script>

<style lang="less" scoped>
	@import '../../../static/less/index.less';
	@import '../../../static/css/index.css';

	page {
		background: #F5F5F5;
	}

	.view_top_background {
		height: 300rpx;
		background-size: 100%;
		margin-left: -20rpx;
		margin-right: -20rpx;
	}

	.view_top_2 {
		background: #FFFFFF;
		width: 97%;
		text-align: center;
		padding-top: 30rpx;
		display: flex;
		margin-left: 12rpx;
		border-radius: 10rpx;
		height: 120rpx;
	}

	.view_top_logo {
		width: 100rpx;
		height: 100rpx;
		margin: 20rpx;
		border-radius: 10rpx;
	}

	.view_top_shopName {
		margin-left: 10rpx;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		color: #FFFFFF;
		font-size: 28rpx;
	}

	.view_top_salf {
		margin-left: 20rpx;
		margin-top: 3rpx;
		color: #FFFFFF;
		font-size: 24rpx;
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
		top: 260rpx;
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
		color: #FF2D36;
		font-size: 32upx;
		font-weight: bold;
		border-bottom-width: 6rpx;
		text-align: center;
	}

	.navbar {
		display: flex;
		height: 40px;
		padding: 0 5px;
		background: #fff;
		margin-top: -30rpx;
		box-shadow: 0 1px 5px rgba(0, 0, 0, .06);
		border-top-right-radius: 20rpx;
		border-top-left-radius: 20rpx;
		position: relative;

		.nav-item {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 15px;
			color: #000000;
			position: relative;

			&.current {
				color: #FF2D36;

				&:after {
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 44px;
					height: 0;
					border-bottom: 2px solid #FF2D36;
				}
			}
		}
	}

	.navbar1 {
		display: flex;
		height: 50px;
		padding: 0 5px;
		margin-top: -30rpx;
		background: #fff;
		border-top-right-radius: 20rpx;
		border-top-left-radius: 20rpx;
		box-shadow: 0 1px 5px rgba(0, 0, 0, .06);
		position: relative;

		.nav-item {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 15px;
			color: #000000;
			position: relative;

			&.current {
				color: #FF2D36;

				&:after {
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 44px;
					height: 0;
					border-bottom: 2px solid #FF2D36;
				}
			}
		}
	}

	.limapboxqing2 {

		font-size: 28upx;
		color: #333333;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
</style>
