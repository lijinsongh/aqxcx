<template>
	<view>
		<view class="search-pop">
			<view class="main-title" style="background: #FF0000;">
				<view class="search-tab">
					<view class="close-src" @tap="navigateBack"><text class="iconfont icon-zuojiantou"></text></view>

					<view class="search">
						<input type="text" :value="keywords" :placeholder="placeholder" class="search_area"
							@input="searchInput" @confirm="submitSearch" />
						<text v-if="keywords !== ''" class="cuIcon-close clear" @tap="clearInput"></text>
						<view class="search_submit" @tap="submitSearch">ๆ ็ดข</view>
					</view>
					
					<image class="image-src" src="https://taobao.xianmxkj.com/static/img/shaixuan.png"
						style="width: 40upx;height: 40upx;margin-top: -50upx;" @tap='openPopus'></image>
				</view>
			</view>
			<view class="tui-tabs">
				<scroll-view id="tab-bar" scroll-with-animation class="tui-scroll-h" :scroll-x="true"
					:show-scrollbar="false" style="border-bottom: 2upx solid #F8F8F8;">
					<view style="display: flex;">
						<view v-for="(tab, index) in tabBars" :id="tab.id" :data-current="index" @tap='tabSlect(tab)'>
							<!-- <view class="tui-tab-item-title" style="margin-left: 90upx;margin-right: 15upx;background: #FFFFFF;" :class="{ 'tui-tab-item-title-active': tabIndex == tab.id }">{{ tab.name }}</view> -->
							<view>
								<view class="tui-tab-item-title1" style="background: #FFFFFF;"
									:class="{ 'tui-tab-item-title-active1': tabIndex == tab.id }">
									{{ tab.name }}
									<view style="display: flex;justify-content: center;">
										<image v-if="tabIndex == tab.id" src="../../../../static/img/bottomselect.png"
											style="width: 32upx;height: 12upx;">
										</image>
									</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>

		<uni-popup ref="popus" type="top">
			<view
				style="width: 100%;height: max-content;background: #FFFFFF;padding: 20upx 20upx 100upx 20upx;margin-top: 120upx;">
				<view class="">ๅ็</view>
				<view style="display: flex;flex-wrap: wrap;flex-wrap: wrap;">
					<view style="display: flex;flex-wrap: wrap;margin-left: 10upx;" v-for="(item,ind) in brandList"
						@tap='checkState(item)'>
						<view
							:style="item.brandId == brandIndex?
						'width: 150rpx; height: 50rpx;background: #F2F2F2;text-align: center;border-radius: 50rpx;line-height: 50rpx;margin: 20rpx 0rpx 0rpx 10rpx;border: 1rpx solid #e10a07;'
						: 'width: 150rpx; height: 50rpx;background: #F2F2F2;text-align: center;border-radius: 50rpx;line-height: 50rpx;margin: 20rpx 0rpx 0rpx 10rpx;'">
							{{item.brandName}}</view>
					</view>
				</view>
			</view>
		</uni-popup>

		<view style="display: flex;flex-wrap: wrap;margin-top: 80rpx;">

			<view
				style="width: 345upx;min-height: 400upx;background-color: #FFFFFF; border-radius: 20upx;margin-left: 20upx; margin-top: 20upx;box-shadow: rgba(183, 183, 183, 0.3) 1px 1px 10px 1px;"
				@tap='goDetail(item.id)' v-for="(item,index) in list" :key='index' v-if="list.length > 0">
				<image :src="item.coverImg"
					style="width: 345upx;height: 340upx;border-top-left-radius:20upx;border-top-right-radius:20upx;">
				</image>

				<view style="padding: 16upx 2upx 16upx 16upx;">
					<view style="width: 100%;height:  60upx;">
						<text class="limapboxqing2">{{ item.title }}</text>
					</view>
				</view>
				<view style="padding: 0rpx 15rpx;display: flex;margin:20rpx 0 5rpx 0">
					<view v-if="relation"
						style="width: 40%;font-size: 38upx;color: #FF2A47;font-weight: 700;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
						<text style="font-size: 26rpx;">ยฅ</text>{{item.memberPrice}}</view>
					<view v-if='!relation'
						style="width: 40%;font-size: 38upx;color: #FF2A47;font-weight: 700;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
						<text style="font-size: 26rpx;">ยฅ</text>{{item.price}}</view>
					<view
						style="width: 60%;font-size: 24upx;color: #999999;margin-top: 10upx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;text-align: right;">
						{{item.sales}}ไบบๅทฒ่ดญไนฐ</view>
				</view>
				<view style="display: flex;margin-left: 12rpx; padding-bottom: 10rpx;margin-top: 15rpx;">
					<image src="/static/shop.png" style="width: 30upx;height: 30upx;"></image>
					<view v-if="item.store" style="margin-left: 10rpx;font-size: 24rpx;color: #999999;">
						{{item.store.storeName}}</view>
					<view v-else style="margin-left: 15rpx;font-size: 24rpx;color: #999999;">ๆทๆนไผ่ดญ่ช่ฅๅบ้บ</view>
				</view>
			</view>
			<!-- ๆฌๆตฎไธๆ -->
			<view class="scroll_top" @tap="topScrollTap" v-bind:class="[scrollTop ? 'active' : '','']"
				style="bottom: 56px;">
				<text class="iconfont icon-shangla"></text>
			</view>

			<!-- ๅ?่ฝฝๆดๅคๆ็คบ -->
			<view class="s-col is-col-24" v-if="list.length > 0">
				<load-more :loadingType="loadingType" :contentText="contentText"></load-more>
			</view>
			<!-- ๅ?่ฝฝๆดๅคๆ็คบ -->
			<empty v-if="list.length === 0" des="ๆๆ?ๆฐๆฎ" show="false"></empty>
		</view>

	</view>
</template>

<script>
	import uniPopup from '@/package/components/uni-popup/uni-popup-shaixuan.vue';
	export default {
		components: {
			uniPopup
		},
		onShareAppMessage(res) {
			return {};
		},
		data() {
			return {
				placeholder: '่พๅฅๅณ้ฎๅญๆ็ฒ่ดดๅฎ่ดๆ?้ข',
				keywords: '',
				keywordlist: [],
				recentKeyword: [],
				copyTklStatus: '',
				visible: false,
				isEnable: 'ๅฆ',
				localKeyword: 'orange-tyh-keyword',
				current: 0,
				tabIndex: '0',
				tabStatus: 'createAt',
				list: [],
				relation: false,
				//็ปผๅcreateAt ้้sales ไฝฃ้ๆฏไพcommissionPrice ่ถไฝไปทprice
				tabBars: [{
						name: '็ปผๅ',
						id: '0',
						status: 'createAt'
					},
					{
						name: '้้',
						id: '1',
						status: 'sales'
					},
					{
						name: 'ไฝฃ้',
						id: '2',
						status: 'commissionPrice'
					},
					{
						name: '่ถไฝไปท',
						id: '3',
						status: 'price'
					}
				],
				page: 0,
				brandId: '',
				brandIndex: 0,
				brandList: [],
				size: 10,
				loadingType: 0,
				type: '',
				title: '',
				scrollTop: false,
				contentText: {
					contentdown: 'ไธๆๆพ็คบๆดๅค',
					contentrefresh: 'ๆญฃๅจๅ?่ฝฝ...',
					contentnomore: 'ๆฒกๆๆดๅคๆฐๆฎไบ'
				}
			};
		},
		onShow() {
			let a = this.$queue.getData('isEnable');
			if (a === 'ๆฏ') {
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
		onLoad(e) {
			let relation_id = this.$queue.getData('relation_id');
			if (relation_id && relation_id !== 'undefined') {
				this.relation = true;
			} else {
				this.relation = false;
			}
			if (e.keyword) {
				this.keywords = e.keyword;
			}
			this.getList('', this.tabStatus);
			this.getBrandList();
		},
		methods: {
			checkState(item) {
				if (item.brandId === this.brandIndex) {
					this.brandIndex = 0;
					this.brandId = '';
				} else {
					this.brandIndex = item.brandId;
					this.brandId = item.brandId;
				}
				this.page = 0;
				this.getList('', this.tabStatus);
				this.$refs.popus.close();
			},
			getBrandList() {
				this.$Request.getT('/goods/brandList?title=' + this.keywords).then(res => {
					if (res.status === 0) {
						res.data.forEach(d => {
							this.brandList.push(d);
						});
					}
				});
			},
			openPopus() {
				this.filter = true;
				this.$refs.popus.open();
			},
			hindPopus() {
				this.$refs.popus.close();
			},
			goDetail(id) {
				uni.navigateTo({
					url: './commoditydetail?ordersId=' + id
				});
			},
			getList(type, sort) {
				this.loadingType = 1;
				uni.showLoading({
					title: 'ๅ?่ฝฝไธญ...',
				});
				this.$Request.getT('/goods/userList?page=' + this.page + '&size=' + this.size + '&type=' + this.type +
					'&title=' +
					this.keywords + '&sort=' + sort + '&brandId=' + this.brandId).then(res => {
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
							d.sales = d.sales > 10000 ? (d.sales / 10000).toFixed(1) + 'ไธ' : d.sales;
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
						uni.stopPullDownRefresh(); // ๅๆญขๅทๆฐ
					}
				});
			},
			searchInput: function(e) {
				this.keywords = e.detail.value;
			},
			submitSearch: function() {
				if (!this.keywords) {
					this.$queue.showToast('่ฏท่พๅฅ่ฆๆ็ดข็ๅๅฎน!');
					return;
				}
				this.page = 0;
				this.getList('', this.tabStatus)
			},
			clearInput() {
				this.keywords = '';
				this.page = 0;
				this.getList('', this.tabStatus);
			},
			navigateBack() {
				uni.navigateBack();
			},
			tabSlect(item) {
				this.switchTab(item.id);
			},
			switchTab(index) {
				this.page = 0;
				this.tabIndex = index;
				this.tabStatus = this.tabBars[index].status;
				this.list = [];
				this.getList('', this.tabStatus);
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
			this.getList('', this.tabStatus);
		},
		onPullDownRefresh: function() {
			this.page = 0;
			this.getList('Refresh', this.tabStatus);
		}
	};
</script>

<style lang="less" scoped>
	@import '../../../../static/less/index.less';
	@import '../../../../static/css/index.css';

	page {
		background: #FFFFFF;
	}

	.limapboxqing2 {
		font-size: 30upx;
		color: #333333;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.indexr {
		color: #FFFFFF;
		font-size: 22upx;
		padding-left: 12upx;
		display: inline-block;
		padding-right: 13upx;
		border-radius: 8upx;
		margin-right: 8upx;
		line-height: 38upx;

		background: -moz-linear-gradient(left, #FB2C1A 0, #FF2A46 100%);
		background: -webkit-gradient(linear, left top, left right, color-stop(0, #FB2C1A), color-stop(100%, #FF2A46));
		background: -webkit-linear-gradient(left, #FB2C1A 0, #FF2A46 100%);
		background: -o-linear-gradient(left, #FB2C1A 0, #FF2A46 100%);
		background: -ms-linear-gradient(left, #FB2C1A 0, #FF2A46 100%);
		background: linear-gradient(to left, #FB2C1A 0, #FF2A46 100%);
	}

	.main-title {
		background: -webkit-linear-gradient(left, #e10a07 0, #f15b6c 100%);
		background: -o-linear-gradient(left, #e10a07 0, #f15b6c 100%);
		background: -ms-linear-gradient(left, #e10a07 0, #f15b6c 100%);
		background: -webkit-gradient(linear, right top, left top, color-stop(0, #e10a07), to(#f15b6c));
		background: -o-linear-gradient(right, #e10a07 0, #f15b6c 100%);
		background: linear-gradient(to left, #e10a07 0, #f15b6c 100%);

		border-bottom-color: transparent;
		padding: 16upx 20upx;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 120;
		display: block;
		box-sizing: border-box;
	}

	.search-pop .search-tab {
		/* #ifdef APP-PLUS */
		margin: 50upx 0 20upx;
		/* #endif */
		/* #ifndef APP-PLUS */
		margin: 10upx 0 20upx;
		/* #endif */
		color: #fff;
		font-size: 32upx;
		text-align: center;
	}

	.search-pop .search-tab .my-sub-src {
		margin: 0 auto 0 40upx;
		display: inline-block;
		color: #fff;
		line-height: 60upx;
		margin-bottom: 20upx !important;
	}

	.search-pop .search-tab .my-sub-src:nth-child(1) {
		margin-left: 0px !important;
	}

	.main-title .search-tab .cur {
		opacity: 1;
		border-bottom: 2upx solid #fff;
	}

	.main-title .search-tab .close-src {
		position: absolute;
		left: 20upx;
		display: block;
		float: left;
		color: #ffffff;
		margin-top: 10upx;
	}

	.main-title .search-tab .image-src {
		position: fixed;
		left: 680upx;
		display: block;
		float: right;
		color: #ffffff;
	}

	.main-title .search-tab .close-src .iconfont {
		font-size: 40upx;
	}

	.main-title .search {
		background-color: #fff;
		border-radius: 40upx;
		width: 76%;
		margin-left: 10%;
		position: relative;
		padding: 0 18upx;
		height: 64upx;
		line-height: 64upx;
		font-size: 26upx;
		margin-top: 20upx;
	}

	.search_submit {
		width: 25%;
		height: 64upx;
		background: #ffb925;
		color: #fff;
		float: right;
		margin-top: -64upx;
		position: relative;
		border-radius: 32upx;
		margin-right: -32upx;
		z-index: 30;
	}

	.clear {
		width: 70upx;
		background: white;
		color: crimson;
		position: absolute;
		z-index: 999;
		font-size: 32upx;
		/* height: 56upx; */
		margin-left: 86upx;
		margin-top: -64upx;
	}

	.main-title .search input {
		border: none;
		outline: 0;
		height: 64upx;
		font-size: 26upx;
		line-height: 60upx;
		background: #fff;
		color: #666;
		border-radius: 10upx;
		padding: 0 0 0 10upx;
		text-align: left;
	}

	.main-title .search input.search_area {
		background-color: transparent;
		position: relative;
		z-index: 99;
		width: 80%;
		color: #333;
		font-size: 28upx;
	}

	.tui-tabs {
		flex: 1;
		flex-direction: column;
		overflow: hidden;
		background-color: #fafafa;
		/* #ifdef MP-ALIPAY || MP-BAIDU */
		height: 100vh;
		/* #endif */
		padding-top: 130upx;
		/* #ifdef APP-PLUS */
		padding-top: 160upx;
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
		/* #ifdef APP-PLUS */
		position: fixed;
		top: 44px;
		left: 0;
		margin-top: 60upx;
		z-index: 999;
		/* #endif */
		/* #ifdef H5 */
		position: fixed;
		top: 44px;
		left: 0;
		margin-top: 40upx;
		z-index: 999;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		position: fixed;
		top: 44px;
		left: 0;
		margin-top: 40upx;
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
