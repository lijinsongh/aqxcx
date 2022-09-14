<template>
	<view class="index-content">
		<view class="tui-content-box">
			<view class="search_wrap">
				<view class="close-src" @tap="navigateBack"><text class="iconfont icon-zuojiantou"></text></view>
				<view class="search_wraps">
					<icon type="search" size="16" />
					<input type="text" :value="keywords" @confirm="submitSearch" :placeholder="placeholder"
						class="search_area" style="color: #555555;" @input="searchInput" maxlength="1000" />
				</view>
				<view class="search_txt" @tap="submitSearch">搜索</view>
			</view>

		</view>


		<view style="background: #FFFFFF;">
			<view class="navbar" style="position: fixed;z-index: 100;text-align: center;width: 100%;">

				<view style="display: flex;">
					<view style="width: 120upx;margin-left: 52upx;" v-for="(item, index) in tabList" :key="index"
						@tap="fromTabSelect(index)">
						<!-- {{ item.name }} -->
						<view style="width: 100%;text-align: center;line-height: 80upx;">
							<view :style="index==fromTabIndex?'color: #FF2638;':'color: #000000;'">{{ item.name }}
							</view>
							<image v-if="index==fromTabIndex" src="../../static/img/bottomselect.png"
								style="width: 32upx;height: 12upx;top: -50upx;"></image>
						</view>
					</view>
				</view>
			</view>
			<scroll-view scroll-x class="bg-white nav yt-nav" scroll-with-animation
				style="position: fixed;z-index: 100;text-align: center;width: 100%;margin-top: 80upx">
				<view class="cu-item yt-item" :class="index == TabCur ? 'text-green cur' : ''"
					v-for="(item, index) in tab" @tap="tabSelect" :data-id="index">
					<text>
						{{ item.name }}
					</text>
				</view>
			</scroll-view>
		</view>
		<view class="index-coupon has-bg-white has-pd-10" :style="{ marginTop: 40 + 'px' }">
			<view class="goods-list" v-if="couponlist.length > 0 && fromTabIndex == 0" style="padding-top: 160upx">
				<orange-goods-card-home v-for="(item, index) in couponlist" :index="index % 2" :logo="pddlogo"
					:tkmoney="item.tkmoney" :tkmoneys="item.tkmoneys" :itemid="item.goodsId" :isEnable="isEnable"
					:shopname='item.mallName' :is-invitation="isInvitation" :itempic="item.goodsThumbnailUrl"
					:itemtitle="item.goodsName" :itemprice="'¥' + item.itemprice" :itemsale="'已售 ' + item.salesTip"
					:itemendprice="item.itemendprice" :couponmoney="item.couponDiscount * 0.01">
				</orange-goods-card-home>
			</view>
		</view>
		<view class="index-coupon has-bg-white has-pd-10" :style="{ marginTop: 40 + 'px' }">
			<view class="goods-list" v-if="couponlist.length > 0 && fromTabIndex == 1" style="padding-top: 160upx">
				<orange-goods-card-home v-for="(item, index) in couponlist" :index="index" :tkmoney="item.tkmoney"
					:tkmoneys="item.tkmoneys" :itemid="item.skuId" :logo="jdlogo" :isEnable="isEnable"
					:is-invitation="isInvitation" :itempic="item.itempic" :itemtitle="item.skuName"
					:shopname='item.shopInfo.shopName' :itemprice="'¥' + item.itemprice" :itemsale="item.itemsale"
					:itemendprice="'' + item.itemendprice" :couponmoney="item.couponmoney" @success="clickItem">
				</orange-goods-card-home>
			</view>
		</view>

		<view class="index-coupon has-bg-white has-pd-10" :style="{ marginTop: 40 + 'px' }">
			<view class="goods-list" v-if="couponlist.length > 0 && fromTabIndex == 2" style="padding-top: 160upx">
				<orange-goods-card-home v-for="(item, index) in couponlist" :index="index % 2" :logo="wphlogo"
					:tkmoney="item.tkmoney" :tkmoneys="item.tkmoneys" :itemid="item.goodsId"
					:shopname='item.storeInfo.storeName' :isEnable="isEnable" :is-invitation="isInvitation"
					:itempic="item.goodsThumbUrl" :itemtitle="item.goodsName" :itemprice="'¥' + item.vipPrice"
					:itemendprice="'' + item.vipPrice" :couponmoney="item.couponmoney"></orange-goods-card-home>
			</view>
		</view>
		<view class="index-coupon has-bg-white has-pd-10"
			style="display: flex;flex-wrap: wrap;margin-bottom: 0upx;padding: 160upx 20upx 20upx;"
			:style="{ marginTop: 40 + 'px' }" v-if="couponlist.length>0 && fromTabIndex == 3">
			<view
				style="width: 100%;border-radius: 20upx;overflow: hidden;box-shadow: rgba(183, 183, 183, 0.3) 1px 1px 10px 1px;margin-bottom: 20upx;display: flex;"
				@tap='goDetail(item.id)' v-for="(item,index) in couponlist" :key='index' v-if="couponlist.length > 0">
				<image :src="item.coverImg" lazy-load="true" style="width: 250upx;height: 250upx;flex-shrink: 0;">
				</image>
				<view style="padding: 16upx 16upx 16upx 20upx;flex: 1;">
					<view style="margin: 5upx 2upx 20upx;">
						<view style="width: 100%;height:  60upx;">
							<text class="limapboxqing2"><text class="indexr"
									style=""><text>自营</text></text>{{ item.title }}</text>
						</view>
					</view>
					<view class="reverse">
						<view class="" v-if="item.descrition&&isEnable == '是'">预估返￥{{ item.descrition }}</view>
						<!-- <view class=""  v-if="couponmoney!=null">券{{couponmoney}}元</view> -->
					</view>
					<view
						style="display: flex;flex-direction: column;justify-content: space-between;margin-top: 20upx;">
						<view
							:style="item.descrition? 'padding: 0rpx 0;display: flex;justify-content: space-between;margin:20upx 0 12upx;' :  'padding: 0rpx 0;'">
							<view style="display: flex;justify-content: space-between;width: 94%;">
								<view v-if="relation"
									style="font-size: 38upx;color: #FF2638;font-weight: 700;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
									<text style="font-size:20upx;">¥</text> {{item.memberPrice}}
								</view>
								<view v-if='!relation'
									style="font-size: 38upx;color: #FF2638;font-weight: 700;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
									<text style="font-size:20upx;margin-right: 10upx">¥</text> {{item.price}}
								</view>
								<view
									style="margin-left:10px;font-size: 24upx;color: #999999;margin-top: 10upx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;text-align: left;">
									已售{{item.sales}}件</view>
							</view>
							<!-- <view v-if="item.descrition&&isEnable == '是'" style="color: rgb(254, 108, 0);font-size: 24upx;padding: 8upx 0;">预估返￥ {{item.descrition}}</view> -->
						</view>

						<view style="display: flex;align-items: center;font-size: 24upx;color: rgb(153, 153, 153);">
							<!-- <image style="height: 30upx;width:30upx;margin-right: 4upx;"
									src="../../../static/shop.png"></image> -->
							<view>淇湘优购自营店铺</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 领券直播 -->

		<!-- 加载更多提示 -->
		<view class="s-col is-col-24" v-if="couponlist.length > 0">
			<load-more :loadingType="loadingType" :contentText="contentText"></load-more>
		</view>
		<!-- 加载更多提示 -->
		<!-- 悬浮上拉 -->
		<view class="scroll_top" @tap="topScrollTap" v-bind:class="[scrollTop ? 'active' : '', '']"
			style="bottom: 56px;"><text class="iconfont icon-shangla"></text></view>
		<empty v-if="couponlist.length === 0 && !success" des="数据加载中..." show="false"></empty>

		<empty v-if="couponlist.length === 0 && success" des="没有搜索到数据 换个搜索条件试试" show="false"></empty>
	</view>
</template>

<script>
	export default {
		onShareAppMessage(res) {
			return {
				title: '购物先领券，一年省一半',
				path: '/pages/index/index'
			};
		},
		data() {
			return {
				top: 0,
				logo: '../../static/img/mao.png',
				jdlogo: '../../static/img/jd.png',
				pddlogo: '../../static/img/pinduoduo.png',
				taobao: '../../static/img/taobao.png',
				wphlogo: '../../static/img/wph.png',
				recentKeyword: [],
				success: false,
				fromTabIndex: 0,
				pddSort: 6,
				wphSort: 'COMM_RATIO',
				jdSort: 'inOrderCount30Days',
				tabList: [{
						position: 'pdd',
						name: '拼多多'
					},
					{
						position: 'jd',
						name: '京东'
					},
					{
						position: 'wph',
						name: '唯品会'
					},
					{
						position: 'zy',
						name: '自营'
					}
				],
				tabStatus: 'createAt',
				tabBars: [{
						name: '综合',
						status: 'createAt',
						position: 2,
						pdd: 6,
						jd: 5,
						total: 0,
						data: []
					},
					{
						name: '销量',
						status: 'sales',
						position: 2,
						pdd: 6,
						jd: 5,
						total: 0,
						data: []
					},
					{
						name: '佣金',
						status: 'commissionPrice',
						position: 2,
						pdd: 6,
						jd: 5,
						total: 0,
						data: []
					},
					{
						name: '超低价',
						status: 'price',
						position: 2,
						pdd: 6,
						jd: 5,
						total: 0,
						data: []
					}
				],
				wphTabData: [{
						name: '综合',
						sortType: 'COMM_RATIO',
					},
					{
						name: '佣金',
						sortType: 'COMMISSION',
					},
					{
						name: '热销',
						sortType: 'PRICE',
					},
					{
						name: '折扣',
						sortType: 'DISCOUNT',
					},
				],
				tab: [{
						name: '热销',
						position: 2,
						pdd: 6,
						jd: 5,
						total: 0,
						data: []
					},
					{
						name: '综合',
						position: 0,
						pdd: 0,
						jd: 5,
						total: 0,
						data: []
					},
					{
						name: '最新',
						position: 1,
						pdd: 12,
						jd: 5,
						total: 0,
						data: []
					},
					{
						name: '高佣',
						position: 6,
						pdd: 14,
						jd: 5,
						total: 0,
						data: []
					},
					{
						name: '低价',
						position: 4,
						pdd: 9,
						jd: 5,
						total: 0,
						data: []
					}
				],
				tabData: [{
						name: '热销',
						position: 2,
						pdd: 6,
						jd: 5,
						total: 0,
						data: []
					},
					{
						name: '综合',
						position: 0,
						pdd: 0,
						jd: 5,
						total: 0,
						data: []
					},
					{
						name: '最新',
						position: 1,
						pdd: 12,
						jd: 5,
						total: 0,
						data: []
					},
					{
						name: '高佣',
						position: 6,
						pdd: 14,
						jd: 5,
						total: 0,
						data: []
					},
					{
						name: '低价',
						position: 4,
						pdd: 9,
						jd: 5,
						total: 0,
						data: []
					}
				],
				TabCur: 0,
				scrollLeft: 0,
				scrollTop: false,
				placeholder: '输入关键字或粘贴宝贝标题',
				couponlist: [],
				pddPage: 1,
				sortName: '',
				page: 1,
				size: 10,
				localKeyword: 'orange-tyh-keyword',
				min_id: 1,
				sort: 2,
				pdd: '',
				tb_p: 1,
				keywords: '',
				isInvitation: 0,
				loadingType: 0,
				isEnable: '否',
				contentText: {
					contentdown: '上拉显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				}
			};
		},
		onLoad: function(e) {
			this.keywords = e.keywords;
			this.checkOrder(e.keywords)
			let keywords = this.$queue.get(this.localKeyword);
			if (JSON.stringify(keywords).indexOf(e.keywords) === -1) {
				this.$queue.insert({
					key: this.localKeyword,
					value: {
						keyword: e.keywords
					},
					capacityNum: 20 //队列容量
				});
			}
			let a = this.$queue.getData('isEnable');
			if (a) {
				this.isEnable = a;
			}

			uni.showLoading({
				title: '加载中...'
			});
			this.loadPddCouponList();
			this.getUserInfo();
		},
		onPageScroll: function(e) {
			this.scrollTop = e.scrollTop > 200;
		},
		methods: {
			clickItem(index) {
				this.$queue.setData('jd_list', JSON.stringify(this.couponlist[index]));
				uni.navigateTo({
					url: '/pages/detail/jd'
				});
			},
			getUserInfo() {
				let userId = this.$queue.getData('userId');
				if (userId) {
					this.$Request.getT('/user/' + userId).then(res => {
						if (res.status === 0) {
							this.$queue.setData('image_url', res.data.image_url);
							this.$queue.setData('mobile', res.data.phone);
							this.isInvitation = res.data.isInvitation;
							this.$queue.setData('isInvitation', res.data.isInvitation);
							this.$queue.setData('relation', res.data.invitation);
							this.$queue.setData('grade', res.data.grade);
							this.$queue.setData('nickName', res.data.nickName);
							this.$queue.setData('relation_id', res.data.relationId);
							this.$queue.setData('gender', parseInt(res.data.gender));
						}
					});
				}
			},
			clearInput() {
				this.keywords = '';
			},
			tabSelect(e) {
				this.success = false;
				this.TabCur = e.currentTarget.dataset.id;
				this.sort = this.tab[e.currentTarget.dataset.id].position;
				this.pddSort = this.tab[e.currentTarget.dataset.id].pdd;
				this.jdSort = this.tab[e.currentTarget.dataset.id].jd;
				this.page = 1;
				this.min_id = 1;
				this.tb_p = 1;
				uni.showLoading({
					title: '加载中...'
				});
				// if (this.fromTabIndex == 0) {
				// 	//淘宝商品
				// 	this.loadTaoBaoCouponList('Refresh');
				// }
				if (this.fromTabIndex == 0) {
					//拼多多商品
					this.loadPddCouponList('Refresh');
				}
				if (this.fromTabIndex == 1) {
					//京东商品
					this.loadJdCouponList('Refresh');
				}
				if (this.fromTabIndex == 2) {
					this.wphSort = this.tab[e.currentTarget.dataset.id].sortType;
					//唯品会商品
					this.loadWphCouponList('Refresh');
				}
				if (this.fromTabIndex == 3) {
					this.tabStatus = this.tab[e.currentTarget.dataset.id].status;
					this.getList('Refresh');
					//自营商品
					console.log('自营商品')
				}
				//#ifdef H5
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
				//#endif
			},
			checkOrder(keywords) {
				let that = this;
				that.$Request.postT('/order/selectItemIdByUrl?content=' + encodeURIComponent(keywords)).then(res => {
					if (res.status === 0) {
						if (res.data) {
							//0 淘宝  1 京东  2拼多多  3苏宁  4 考拉  5 唯品会
							if (res.data.type === 0) {
								uni.navigateTo({
									url: '/pages/detail/goodsinfo?itemid=' + res.data.id
								});
							} else if (res.data.type === 1) {
								uni.navigateTo({
									url: '/pages/detail/jd?itemid=' + res.data.id
								});
							} else if (res.data.type === 2) {
								uni.navigateTo({
									url: '/pages/detail/pdd?itemid=' + res.data.id
								});
							}
						}
					}
				});
			},
			fromTabSelect(index) {
				this.success = false;
				this.fromTabIndex = index;
				this.page = 1;
				this.min_id = 1;
				this.tb_p = 1;
				this.couponlist = [];
				uni.showLoading({
					title: '加载中...'
				});
				// if (index == 0) {
				// 	//淘宝商品
				// 	this.tab = this.tabData;
				// 	this.loadTaoBaoCouponList('Refresh');
				// }
				if (index == 0) {
					//拼多多商品
					this.tab = this.tabData;
					this.loadPddCouponList('Refresh');
				}
				if (index == 1) {
					//京东商品
					(this.tab = [{
							name: '热销',
							position: 2,
							pdd: 6,
							jd: 'inOrderCount30Days',
							total: 0,
							data: []
						},
						{
							name: '高佣',
							position: 6,
							pdd: 14,
							jd: 'commission',
							total: 0,
							data: []
						}
					]),
					this.loadJdCouponList('Refresh');
				}
				if (index == 2) {
					//唯品会商品
					this.tab = this.wphTabData;
					this.wphSort = this.tab[0].sortType;
					this.loadWphCouponList('Refresh');
				}
				if (index == 3) {
					//自营商品
					this.page = 0;
					this.tab = this.tabBars;
					this.getList('Refresh');
				}
				//#ifdef H5
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
				//#endif
			},
			topScrollTap: function() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
			},
			goDetail(id) {
				uni.navigateTo({
					url: '/package/pages/zysc/index/commoditydetail?ordersId=' + id
				});
			},
			// 唯品会
			loadWphCouponList: function(type) {
				this.loadingType = 1;
				let params = {
					keyword: this.keywords,
					page: this.page,
					sort: this.wphSort,
					size: 10
				}
				this.$Request.getT('/wph/list', params).then(res => {
					this.loadingType = 0;
					this.success = true;
					if (res.status == 0) {
						if (res.data.data.list) {
							if (this.page === 1) {
								this.couponlist = [];
							}
							res.data.data.list.forEach(d => {
								if (!d.vipPrice) return;
								let grade = this.$queue.getData('grade');
								if (grade) {
									// 分享赚-用户自己商品佣金=用户自己佣金比例*商品佣金比例
									d.tkmoney = ((d.vipPrice * (d.commissionRate * 0.01)) *
										parseFloat(grade)).toFixed(2);
								} else {
									// 分享赚-用户自己商品佣金=用户自己佣金比例*商品佣金比例
									d.tkmoney = ((d.vipPrice * (d.commissionRate * 0.01)) *
										parseFloat(this.$queue.maxMoney())).toFixed(
										2);
								}
								// d.itemsale = d.itemsale > 10000 ? '已售 ' + (d.itemsale / 10000).toFixed(
								// 		1) +
								// 	'万' : '已售 ' + d.itemsale;
								this.couponlist.push(d);
							})
							if (res.data.data.list.length === 10) {
								this.loadingType = 0;
							} else {
								this.loadingType = 3;
							}
						} else {
							uni.hideLoading();
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
			getList(type) {
				this.loadingType = 1;
				uni.showLoading({
					title: '加载中...',
				});
				this.$Request.getT('/goods/userList?page=' + this.page + '&size=' + this.size + '&title=' +
					this.keywords + '&sort=' + this.tabStatus).then(res => {
					this.loadingType = 0;
					this.success = true;
					if (res.status === 0) {
						if (this.page === 0 || res.status) {
							this.couponlist = [];
						}
						let grade = this.$queue.getData('grade');
						let relation_id = this.$queue.getData('relation_id');
						res.data.content.forEach(d => {
							d.descrition = '';
							if (d.commissionPrice != 0) {
								if (grade) {
									if (relation_id) {
										d.descrition = ((parseFloat(d.memberPrice) * parseFloat(d
											.commissionPrice)) * parseFloat(grade)).toFixed(
											2);
									} else {
										d.descrition = ((parseFloat(d.price) * parseFloat(d
											.commissionPrice)) * parseFloat(grade)).toFixed(2);
									}
								} else {
									if (relation_id) {
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
							d.sales = d.sales > 10000 ? (d.sales / 10000).toFixed(1) + '万' : d.sales;
							this.couponlist.push(d);
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
			loadTaoBaoCouponList: function(type) {
				this.loadingType = 1;
				this.$Request
					.get('/api/supersearch/apikey/maxd/keyword/' + this.keywords + '/back/10/sort/' + this.sort +
						'/min_id/' + this.min_id +
						'/is_coupon/1/tb_p/' + this.tb_p)
					.then(res => {
						this.loadingType = 0;
						this.success = true;
						if (res.code === 1) {
							if (this.page === 1) {
								this.couponlist = [];
							}
							this.min_id = res.min_id;
							this.tb_p = res.tb_p;
							res.data.forEach(d => {
								let grade = this.$queue.getData('grade');
								d.tkmoneys = (d.itemendprice * (d.tkrates * 0.01) * parseFloat(this.$queue
									.maxMoney())).toFixed(2);
								if (grade) {
									d.tkmoney = (d.itemendprice * (d.tkrates * 0.01) * parseFloat(grade))
										.toFixed(2);
								} else {
									d.tkmoney = (d.itemendprice * (d.tkrates * 0.01) * parseFloat(this
										.$queue.minMoney())).toFixed(2);
								}
								d.itemsale = d.itemsale > 10000 ? '已售 ' + (d.itemsale / 10000).toFixed(1) +
									'万' : '已售 ' + d.itemsale;
								this.couponlist.push(d);
							});
							if (this.couponlist.length < 10) {
								this.loadingType = 2;
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

			loadPddCouponList: function(type) {
				this.loadingType = 1;
				if (this.$queue.getData('pddpid')) {
					this.pdd = this.$queue.getData('pddpid');
				} else {
					this.pdd = this.$queue.getPingDuoDuoPid();
				}
				this.$Request.getT('/pdd/list/keyword/' + this.pddSort + '/page/' + this.page +
						'/pageSize/10?keyword=' + this.keywords + "&pid=" + this.pdd)
					.then(res => {
						this.success = true;
						this.loadingType = 0;
						if (res.goodsSearchResponse) {
							if (this.page === 1) {
								this.couponlist = [];
							}
							res.goodsSearchResponse.goodsList.forEach(d => {
								if (!d.mallName) return;
								let grade = this.$queue.getData('grade');
								d.tkmoneys = ((d.minGroupPrice - d.couponDiscount) * 0.01 * (d
									.promotionRate * 0.001) * parseFloat(this.$queue
									.maxMoney())).toFixed(2);
								if (grade) {
									d.tkmoney = ((d.minGroupPrice - d.couponDiscount) * 0.01 * (d
										.promotionRate * 0.001) * parseFloat(grade)).toFixed(
										2);
								} else {
									d.tkmoney = ((d.minGroupPrice - d.couponDiscount) * 0.01 * (d
										.promotionRate * 0.001) * parseFloat(this.$queue
										.minMoney())).toFixed(2);
								}
								d.itemendprice = ((d.minGroupPrice - d.couponDiscount) * 0.01).toFixed(2);
								d.itemprice = (d.minGroupPrice * 0.01).toFixed(2);
								this.couponlist.push(d);
							});
						} else {
							this.loadingType = 2;
						}
						uni.hideLoading();

						if (type === 'Refresh') {
							uni.stopPullDownRefresh(); // 停止刷新
						}
					});
			},

			loadJdCouponList: function(type) {
				this.loadingType = 1;
				this.$Request.getT('/jd/goods/list/' + this.page + '?sortName=' + this.jdSort + '&keywords=' + this
					.keywords).then(
					res => {
						this.success = true;
						this.loadingType = 0;
						if (res.code === 200) {
							if (this.page === 1) {
								this.couponlist = [];
							}
							res.data.list.forEach(d => {
								let grade = this.$queue.getData('grade');
								if (d.imageInfo.imageList.length > 0) {
									d.itempic = d.imageInfo.imageList[0].url;
								}
								d.itemprice = d.priceInfo.price;
								d.couponmoney = d.couponInfo.couponList[0].discount;
								if (Math.round(d.priceInfo.price - d.couponInfo.couponList[0].discount) >
									0) {
									d.itemendprice = (d.priceInfo.price - d.couponInfo.couponList[0]
										.discount).toFixed(2)
								} else {
									d.itemendprice = d.priceInfo.price

								}
								d.tkmoneys = (d.commissionInfo.couponCommission * 0.9 * parseFloat(this
									.$queue.maxMoney())).toFixed(2);
								if (grade) {
									d.tkmoney = (d.commissionInfo.couponCommission * 0.9 * parseFloat(
										grade)).toFixed(2);
								} else {
									d.tkmoney = (d.commissionInfo.couponCommission * 0.9 * parseFloat(this
										.$queue.minMoney())).toFixed(2);
								}
								d.itemsale = d.inOrderCount30Days > 10000 ? '已售 ' + (d.inOrderCount30Days /
										10000).toFixed(1) + '万' : '已售 ' +
									d.inOrderCount30Days;
								if (d.commissionInfo.couponCommission) {
									this.couponlist.push(d);
								}
							});
						} else {
							this.loadingType = 2;
						}
						uni.hideLoading();

						if (type === 'Refresh') {
							uni.stopPullDownRefresh(); // 停止刷新
						}
					});
			},

			navigateBack: function() {
				uni.navigateBack();
			},
			toGoodsInfo: function(itemid) {
				let relation_id = this.$queue.getData('relation_id');
				if (relation_id) {
					uni.navigateTo({
						url: '/pages/detail/goodsinfo?itemid=' + itemid + '&relation_id=' + relation_id
					});
				} else {
					uni.navigateTo({
						url: '/pages/detail/goodsinfo?itemid=' + itemid
					});
				}
			},
			searchInput: function(e) {
				this.keywords = e.detail.value;
			},
			submitSearch: function() {
				if (this.$queue.getSearchKeys(this.keywords) != -1) {
					uni.showToast({
						title: "输入内容带有非法关键字请重新输入",
						mask: false,
						duration: 1500,
						icon: "none"
					});
					this.keywords = '';
				} else {
					let keywords = this.$queue.get(this.localKeyword);
					if (JSON.stringify(keywords).indexOf(this.keywords) === -1) {
						this.$queue.insert({
							key: this.localKeyword,
							value: {
								keyword: this.keywords
							},
							capacityNum: 20 //队列容量
						});
					}
					uni.showLoading({
						title: '加载中...'
					});
					this.checkOrder(this.keywords);

					this.page = 1;
					this.min_id = 1;
					this.tb_p = 1;
					// if (this.fromTabIndex == 0) {
					// 	//淘宝商品
					// 	this.loadTaoBaoCouponList('Refresh');
					// }
					if (this.fromTabIndex == 0) {
						//拼多多商品
						this.loadPddCouponList('Refresh');
					}
					if (this.fromTabIndex == 1) {
						//京东商品
						this.loadJdCouponList('Refresh');
					}
					if (this.fromTabIndex == 2) {
						//唯品会商品
						this.loadWphCouponList('Refresh');
					}
					if (this.fromTabIndex == 3) {
						this.page = 0;
						//自营商品
						this.getList('Refresh');
					}
					this.topScrollTap();
				}

			}
		},

		onReachBottom: function() {
			this.page = this.page + 1;
			// if (this.fromTabIndex == 0) {
			// 	//淘宝商品
			// 	this.loadTaoBaoCouponList();
			// }
			if (this.fromTabIndex == 0) {
				//拼多多商品
				this.loadPddCouponList();
			}
			if (this.fromTabIndex == 1) {
				//京东商品
				this.loadJdCouponList();
			}
			if (this.fromTabIndex == 2) {
				//唯品会商品
				this.loadWphCouponList();
			}
			if (this.fromTabIndex == 3) {
				//自营商品
				this.getList();
			}
		},
		onPullDownRefresh: function() {
			this.page = 1;
			this.min_id = 1;
			this.tb_p = 1;
			// if (this.fromTabIndex == 0) {
			// 	//淘宝商品
			// 	this.loadTaoBaoCouponList('Refresh');
			// }
			if (this.fromTabIndex == 0) {
				//拼多多商品
				this.loadPddCouponList('Refresh');
			}
			if (this.fromTabIndex == 1) {
				//京东商品
				this.loadJdCouponList('Refresh');
			}
			if (this.fromTabIndex == 2) {
				//唯品会商品
				this.loadWphCouponList('Refresh');
			}
			if (this.fromTabIndex == 3) {
				this.page = 0;
				//自营商品
				this.getList('Refresh');
			}
		}
	};
</script>

<style lang="scss">
	@import '../../static/css/index.css';

	.yt-nav {
		width: 100%;
		height: 78upx;
		display: flex;
		justify-content: space-between;
		align-items: center !important;
		padding: 15upx 0;

		.yt-item {
			width: 120upx;
			height: 48upx;
			background: #F2F2F2;
			border-radius: 5upx;
			line-height: 48upx !important;
		}

		.active {
			color: #FF2D36;
			background: #FFEBEC;
			border: 2upx solid #FF2D36;
		}
	}

	.search-pop .search-tab {
		// margin: 10upx 0 20upx;
		padding: 8upx;
		color: #fff;
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 99;
		height: 100upx;
		background: #E20C0A;
		font-size: 32upx;
		text-align: center;
		padding-top: 20rpx;

	}

	.zy_jx_tit {

		font-size: 42rpx;
		font-family: YouSheBiaoTiHei;
		font-weight: 400;
		line-height: 32rpx;
		color: #FF0000;
		margin: 0 10rpx;
	}

	.reverse {
		display: flex;
		justify-content: flex-start;
		align-items: flex-end;
		height: 32upx;
		margin-top: 28rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		/* font-weight: bold; */
		color: #FFFFFF;
		line-height: 32rpx;
	}

	.reverse>view:nth-child(1) {
		padding: 4rpx 10rpx;
		background: #FF2638;
		border-radius: 5px;
		color: #ffffff;
		margin-right: 20rpx;
		position: relative;
		top: 10rpx;
	}

	.search-pop .search-tab .my-sub-src {
		margin: 0 auto 0 40upx;
		display: inline-block;
		background: #FFFFFF;
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
		left: 40upx;
		display: block;
		float: left;
		color: #ffffff;
		margin-top: 10upx;
	}

	.main-title .search-tab .close-src .iconfont {
		font-size: 40upx;
	}

	.uni-input-input,
	.uni-input-placeholder {
		width: 93%;
	}

	.main-title .search {
		background-color: #fff;
		border-radius: 40upx;
		width: 90%;
		margin-left: 5%;
		position: relative;
		padding: 0 18upx;
		height: 64upx;
		line-height: 64upx;
		font-size: 26upx;
		// margin-top: 2upx;
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
		// background: white;
		color: crimson;
		position: absolute;
		z-index: 999;
		font-size: 32upx;
		/* height: 56upx; */
		margin-left: 96upx;
		margin-top: -60upx;
	}

	.main-title .search input {
		border: none;
		outline: 0;
		height: 64upx;
		font-size: 26upx;
		line-height: 60upx;
		// background: #F8F6FC;
		color: #666;
		border-radius: 10upx;
		padding: 0 0 0 10upx;
		text-align: left;
	}

	.main-title .search input.search_area {
		// background-color: transparent;

		position: relative;
		z-index: 99;
		width: 80%;
		color: #333;
		font-size: 24upx;
	}

	.top_30 {
		margin-top: 120upx;
	}

	.search-default image {
		display: block;
		margin: auto;
		width: 80%;
	}

	.navbar {
		display: flex;
		height: 80upx;
		padding: 0 5px;
		background: #fff;
		box-shadow: 0 2upx 10upx rgba(0, 0, 0, 0.06);
		position: relative;
		z-index: 10;

		.nav-item {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 32upx;
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
					border-bottom: 4upx solid $base-color;
				}
			}
		}
	}

	// 言棠补充代码
	.index-content {
		.tui-content-box {
			width: 100%;
			height: 88rpx;
			background-color: #FFF;
			padding: 10rpx 40rpx 10rpx 30rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: fixed;
			top: 0;
			z-index: 888;

			.navigator {
				width: 60rpx;
				text-align: left;
			}

			.search-box {
				display: flex;
				box-sizing: border-box;
				flex: 1;
				padding: 0 0 0 34upx;
				justify-content: space-between;
				align-items: center;
				color: #999;
				font-size: 28rpx;
				height: 100%;
				border: 4upx solid #FF2D36;
				border-radius: 15upx;

				.search_area {
					flex: 1;
					font-size: 28upx;
				}

				.clear {
					width: 70upx;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.search_submit {
					width: 98upx;
					height: 100%;
					background: #FF2D36;
					color: #fff;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
		}
	}

	.search_wrap {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.search_wraps {
		width: 544rpx;
		height: 70rpx;
		border-radius: 35rpx;
		background: #EDF1F7;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.search_wraps>icon {
		margin-left: 30rpx;
		margin-right: 10rpx;
	}

	.search_wraps>input {
		width: 432rpx;
		color: #CCCCCC;
	}
</style>
