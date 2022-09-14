<template>
	<view>
		<view style="padding: 20rpx 0 0 20rpx;color: #000000;font-weight: bold;" v-if="dianpu.length > 0">最近关注</view>
		<view style="display: flex;margin: 10rpx;" v-if="dianpu.length > 0">
			<scroll-view scroll-with-animation :scroll-x="true" :show-scrollbar="false">
				<view style="display: flex;">
					<view style="margin: 10rpx;" v-for="(item,index) in dianpu">
						<view style="background: #FFFFFF;height: 150rpx;width: 150rpx;text-align: center;border-radius: 10rpx;" @click="goDianpu(item)">
							<image :src="item.store.logo ? item.store.logo : '/static/logo2.png'" style="width: 80rpx;height: 80rpx;margin-top: 20rpx;border-radius: 10rpx;"></image>
							<view style="font-size: 22rpx;width: 75%;margin: 5rpx 20rpx;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;">{{item.storeName}}</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>

		<view style="padding: 20rpx 0 0 20rpx;color: #000000;font-weight: bold;" v-if="dianpu.length > 0">店铺上新</view>
		<view class="dianpu" v-for="(it,index) in dianpu">
			<view style="display: flex;">
				<image :src="it.store.logo ? it.store.logo : '/static/logo2.png'" style="width: 80rpx;height: 80rpx;border-radius: 10rpx;"></image>
				<view style="margin-left: 10rpx;margin-top: 5rpx;width: 65%;">
					<view style="font-size: 26rpx;font-weight: 500;">{{it.store.storeName}}</view>
					<view v-if="it.store" style="font-size: 22rpx;color: #999999;margin-top: 5rpx;">已售{{it.store.sale}}件</view>
				</view>
				<view class="gengduo" @click="goDianpu(it)">更多商品
					<image src="/static/img/goods/right_icon.png" style="width: 15rpx;height: 25rpx;margin-top: 10rpx;margin-left: 5rpx;"></image>
				</view>
			</view>
			<view class="tuijian" v-if="it.goodsList">
				<view v-for="(item,index) in it.goodsList.slice(0,9)" style="margin: 10rpx;">
					<image v-if="item.status == 1" @click="goDetail(item.id)" :src="item.coverImg" style="width: 200rpx;height: 200rpx;border-radius: 10rpx;"></image>
				</view>
			</view>
		</view>
		<!-- 悬浮上拉 -->
		<view class="scroll_top" @tap="topScrollTap" v-bind:class="[scrollTop ? 'active' : '', '']" style="bottom: 56px;"><text
			 class="iconfont icon-shangla"></text></view>

		<!-- 加载更多提示 -->
		<view class="s-col is-col-24" v-if="dianpu.length > 0">
			<load-more :loadingType="loadingType" :contentText="contentText"></load-more>
		</view>

		<!-- #ifndef MP-WEIXIN -->
		<empty v-if="dianpu.length === 0" des="暂无关注店铺信息" show="false"></empty>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<empty class="empty-content1" v-if="dianpu.length === 0" des="暂无关注店铺信息" show="false"></empty>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dianpu: [],
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
			this.page = 0;
			this.getList('');
		},
		methods: {
			goDetail(id) {
				uni.navigateTo({
					url: '../zysc/index/commoditydetail?ordersId=' + id
				});
			},
			goDianpu(item) {
				uni.navigateTo({
					url: '/packagetwo/pages/index/dianpu?storeId=' + item.storeId + '&storeName=' + item.storeName
				});
			},
			getList(type) {
				this.loadingType = 1;
				uni.showLoading({
					title: '加载中...'
				});
				let userId = this.$queue.getData('userId');
				this.$Request.getT('/selfStoreCollect/list?userId=' + userId + '&page=' + this.page + '&size=' + this.size).then(
					res => {
						if (res.status === 0) {
							if (this.page === 0 || res.status) {
								this.dianpu = [];
							}
							res.data.content.forEach(d => {
								this.dianpu.push(d);
							})

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
		background: #F3F3F3;
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

	.dianpu {
		width: 95%;
		height: max-content;
		padding: 20rpx;
		margin-left: 20rpx;
		background: #FFFFFF;
		margin-top: 20rpx;
		border-radius: 10rpx;
		margin-bottom: 50rpx;
	}

	.gengduo {
		color: #999999;
		height: 50rpx;
		display: flex;
		padding-left: 20rpx;
		width: 170rpx;
		border: 1rpx solid #999999;
		text-align: center;
		border-radius: 50rpx;
		line-height: 45rpx;
		margin-top: 20rpx;
	}

	.tuijian {
		display: flex;
		flex-wrap: wrap;
		margin-top: 10rpx;
		margin-left: 10rpx;
	}
</style>
