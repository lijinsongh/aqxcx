<template>
	<view class="index-content">
		<view class="navbar" style="position: fixed;z-index: 100;text-align: center;width: 100%">
			<view style="display: flex;">
				<view style="width: 160upx;margin-left: 20upx;" v-for="(item, index) in tabList" :key="index"
					@tap="fromTabSelect(index)">
					<!-- {{ item.name }} -->
					<view style="width: 100%;text-align: center;line-height: 80upx;">
						<view :style="index==fromTabIndex?'color: #FF2638;':'color: #000000;'">{{ item.name }}
						</view>
						<image v-if="index==fromTabIndex" src="https://taobao.xianmxkj.com/static/img/bottomselect.png"
							style="width: 32upx;height: 12upx;top: -50upx;"></image>
					</view>
					</view>
			</view>
		</view>
		<scroll-view scroll-x class="bg-white nav yt-nav" scroll-with-animation
			style="position: fixed;z-index: 100;text-align: center;width: 100%;margin-top: 80upx;">
			<view class="cu-item yt-item" :class="index==TabCur?'active':''" v-for="(item,index) in tab"
				@tap="tabSelect" :data-id="index">
				<text>
					{{item.name}}
				</text>
			</view>
		</scroll-view>
		<!-- <view class="index-coupon has-bg-white has-pd-10" style="padding-top: 170upx" v-if="fromTabIndex==0">
			<view class="goods-list" v-if="couponlist.length > 0">
				<orange-goods-card-home v-for="(item,index) in couponlist" :index="index%2" :tkmoney='item.tkmoney'
					:tkmoneys='item.tkmoneys' :itemid="item.itemid" :isEnable='isEnable' :shopname='item.shopname'
					:logo="logo" :is-invitation="isInvitation" :itempic="item.itempic+'_310x310.jpg'"
					:itemtitle="item.itemtitle" :itemprice='"¥"+item.itemprice' :itemsale='item.itemsale'
					:itemendprice='""+item.itemendprice' :couponmoney="item.couponmoney"></orange-goods-card-home>
			</view>
		</view> -->
		<view class="index-coupon has-bg-white has-pd-10" style="padding-top: 170upx" v-if="fromTabIndex==0">
			<view class="goods-list" v-if="couponlist.length > 0">
				<orange-goods-card-home v-for="(item,index) in couponlist" :index="index%2" :logo="pddlogo"
					:tkmoney='item.tkmoney' :tkmoneys='item.tkmoneys' :itemid="item.goodsId" :isEnable='isEnable'
					:is-invitation="isInvitation" :itempic="item.goodsThumbnailUrl" :itemtitle="item.goodsName"
					:shopname='item.mallName' :itemprice='"¥"+item.itemprice' :itemsale='"已售 "+item.salesTip'
					:itemendprice='item.itemendprice' :couponmoney="item.couponDiscount*0.01">
				</orange-goods-card-home>
			</view>
		</view>
		<view class="index-coupon has-bg-white has-pd-10" style="padding-top: 170upx" v-if="fromTabIndex==1">
			<view class="goods-list" v-if="couponlist.length > 0&&fromTabIndex==1">
				<orange-goods-card-home v-for="(item,index) in couponlist" :index='index' :tkmoney='item.tkmoney'
					:tkmoneys='item.tkmoneys' :itemid="item.skuId" :logo="jdlogo" :isEnable='isEnable'
					:is-invitation="isInvitation" :itempic="item.itempic" :itemtitle="item.skuName"
					:itemprice='"¥"+item.itemprice' :itemsale='item.itemsale' :itemendprice='""+item.itemendprice'
					:couponmoney="item.couponmoney" :shopname='item.shopInfo.shopName' @success="clickItem">
				</orange-goods-card-home>
			</view>
		</view>
		<view class="index-coupon has-bg-white has-pd-10" style="padding-top: 170upx" v-if="fromTabIndex==3">
			<view class="goods-list" v-if="couponlist.length > 0&&fromTabIndex==3">
				<orange-goods-card-home v-for="(item, index) in couponlist" :index="index % 2" :logo="wphlogo"
					:tkmoney="item.tkmoney" :tkmoneys="item.tkmoneys" :itemid="item.goodsId"
					:shopname='item.storeInfo.storeName' :isEnable="isEnable" :is-invitation="isInvitation"
					:itempic="item.goodsThumbUrl" :itemtitle="item.goodsName" :itemprice="'¥' + item.vipPrice"
					:itemendprice="'' + item.vipPrice" :couponmoney="item.couponmoney"></orange-goods-card-home>
			</view>
		</view>
		<view class="index-coupon has-bg-white has-pd-10"
			style="display: flex;flex-wrap: wrap;margin-bottom: 0upx;padding: 185upx 20upx 20upx;" v-if="couponlist.length>0 && fromTabIndex == 2">
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
					<view style="display: flex;flex-direction: column;justify-content: space-between;">
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
		<!-- 加载更多提示 -->
		<view class="s-col is-col-24" v-if="couponlist.length > 0">
			<load-more :loadingType="loadingType" :contentText="contentText"></load-more>
		</view>
		<!-- 加载更多提示 -->
		<!-- 悬浮上拉 -->
		<view class="scroll_top" @tap="topScrollTap" v-bind:class="[scrollTop ? 'active' : '','']"
			style="bottom: 56px;">
			<text class="iconfont icon-shangla"></text>
		</view>
		<empty v-if="couponlist.length === 0" des="暂无数据" show="false"></empty>
	</view>
</template>

<script>
	export default {
		onShareAppMessage(res) {
			return {
				title: '购物先领券，一年省一半',
				path: '/pages/index/index'
			}
		},
		data() {
			return {
				show: false,
				jdlogo: "../../static/img/jd.png",
				logo: "../../static/img/mao.png",
				taobao: "../../static/img/taobao.png",
				pddlogo: "../../static/img/pinduoduo.png",
				wphlogo: '../../static/img/wph.png',
				wphSort: 'COMM_RATIO',
				recentKeyword: [],
				fromTabIndex: 0,
				pddSort: 6,
				size: 10,
				jdSort: 'inOrderCount30Days',
				tabList: [{
					position: 'pdd',
					name: '拼多多'
				}, {
					position: 'jd',
					name: '京东'
				}, {
					position: 'zy',
					name: '自营'
				}, {
					position: 'wph',
					name: '唯品会'
				}],
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
					},
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
					},
				],
				TabCur: 0,
				scrollLeft: 0,
				scrollTop: false,
				couponlist: [],
				page: 1,
				localKeyword: 'orange-tyh-keyword',
				min_id: 1,
				sort: 4,
				tb_p: 1,
				pdd: '',
				cid: 1,
				keywords: "",
				isInvitation: 0,
				loadingType: 0,
				isEnable: '否',
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				}
			}
		},
		onLoad: function(e) {
			uni.showLoading({
				title: '加载中...'
			});
			let a = this.$queue.getData("isEnable")
			if (a) {
				this.isEnable = a;
			}
			this.cid = e.cid;
			this.keywords = e.name;
			uni.setNavigationBarTitle({
				title: e.name
			});
			this.loadPddCouponList("Refresh");
			this.getUserInfo();
		},
		onPageScroll: function(e) {
			this.scrollTop = e.scrollTop > 200;
		},
		methods: {
			getUserInfo() {
				let userId = this.$queue.getData("userId");
				if (userId) {
					this.$Request.getT("/user/" + userId).then(res => {
						if (res.status === 0) {
							this.$queue.setData("image_url", res.data.image_url);
							this.$queue.setData("mobile", res.data.phone);
							this.isInvitation = res.data.isInvitation;
							this.$queue.setData("isInvitation", res.data.isInvitation);
							this.$queue.setData("relation", res.data.invitation);
							this.$queue.setData("grade", res.data.grade);
							this.$queue.setData("nickName", res.data.nickName);
							this.$queue.setData("relation_id", res.data.relationId);
							this.$queue.setData("gender", parseInt(res.data.gender));
						}
					});
				}
			},
			loadPddCouponList: function(type) {
				if (!this.keywords) {
					this.keywords = "全部"
				}
				if (this.$queue.getData('pddpid')) {
					this.pdd = this.$queue.getData('pddpid');
				} else {
					this.pdd = this.$queue.getPingDuoDuoPid();
				}
				this.loadingType = 1;
				this.$Request.getT('/pdd/list/keyword/' + this.pddSort + '/page/' + this.page +
						'/pageSize/10?keyword=' + this.keywords +
						'&pid=' + this.pdd)
					.then(res => {
						this.loadingType = 0;
						if (res.goodsSearchResponse) {
							if (this.page === 1) {
								this.couponlist = [];
							}
							res.goodsSearchResponse.goodsList.forEach(d => {
								let grade = this.$queue.getData("grade");
								d.tkmoneys = ((((d.minGroupPrice - d.couponDiscount) * 0.01) * (d
									.promotionRate * 0.001)) * parseFloat(this
									.$queue.maxMoney())).toFixed(2);
								if (grade) {
									d.tkmoney = ((((d.minGroupPrice - d.couponDiscount) * 0.01) * (d
										.promotionRate * 0.001)) * parseFloat(
										grade)).toFixed(2);
								} else {
									d.tkmoney = ((((d.minGroupPrice - d.couponDiscount) * 0.01) * (d
										.promotionRate * 0.001)) * parseFloat(this
										.$queue.minMoney())).toFixed(2);
								}
								d.itemendprice = ((d.minGroupPrice - d.couponDiscount) * 0.01).toFixed(2);
								d.itemprice = ((d.minGroupPrice) * 0.01).toFixed(2);
								this.couponlist.push(d);
							})
						} else {
							this.loadingType = 2;
						}
						uni.hideLoading();

						if (type === "Refresh") {
							uni.stopPullDownRefresh(); // 停止刷新
						}
					})
			},
			clearInput() {
				this.keywords = '';
			},
			clickItem(index) {
				this.$queue.setData("jd_list", JSON.stringify(this.couponlist[index]))
				uni.navigateTo({
					url: '/pages/detail/jd'
				});
			},
			loadJdCouponList: function(type) {
				this.loadingType = 1;
				this.$Request.getT('/jd/goods/list/' + this.page + "?sortName=" + this.jdSort + "&keywords=" + this
					.keywords).then(
					res => {
						this.loadingType = 0;
						if (res.code === 200) {
							if (this.page === 1) {
								this.couponlist = [];
							}
							res.data.list.forEach(d => {
								let grade = this.$queue.getData("grade");
								if (d.imageInfo.imageList.length > 0) {
									d.itempic = d.imageInfo.imageList[0].url
								}
								d.itemprice = d.priceInfo.price
								d.couponmoney = d.couponInfo.couponList[0].discount
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
								d.itemsale = d.inOrderCount30Days > 10000 ? "已售 " + (d.inOrderCount30Days /
										10000).toFixed(1) + "万" : "已售 " +
									d.inOrderCount30Days;
								if (d.commissionInfo.couponCommission) {
									this.couponlist.push(d);
								}

							})
						} else {
							this.loadingType = 2;
						}
						uni.hideLoading();

						if (type === "Refresh") {
							uni.stopPullDownRefresh(); // 停止刷新
						}
					})
			},
			fromTabSelect(index) {
				this.fromTabIndex = index;
				this.page = 1;
				this.min_id = 1;
				this.couponlist = [];
				uni.showLoading({
					title: '加载中...'
				});
				if (index == 0) { //拼多多商品
					this.tab = this.tabData;
					this.loadPddCouponList("Refresh");
				}
				if (index == 1) { //京东商品
					this.tab = [{
								name: '热销',
								position: 2,
								pdd: 6,
								jd: "inOrderCount30Days",
								total: 0,
								data: []
							},
							{
								name: '高佣',
								position: 6,
								pdd: 14,
								jd: "commission",
								total: 0,
								data: []
							}
						],
						this.loadJdCouponList("Refresh");
				}

				if (index == 2) {
					//自营商品
					this.page = 0;
					this.tab = this.tabBars;
					this.getList('Refresh');
				}
				if (index == 3) {
					//唯品会商品
					this.tab = this.wphTabData;
					this.wphSort = this.tab[0].sortType;
					this.loadWphCouponList('Refresh');
				}
				//#ifdef H5
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
				//#endif
			},
			tabSelect(e) {
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
				if (this.fromTabIndex == 0) { //拼多多商品
					this.loadPddCouponList("Refresh");
				}
				if (this.fromTabIndex == 1) { //京东商品
					this.loadJdCouponList("Refresh");
				}
				if (this.fromTabIndex == 2) { //自营商品
					this.tabStatus = this.tab[e.currentTarget.dataset.id].status;
					this.getList('Refresh');
				}
				if (this.fromTabIndex == 3) {
					this.wphSort = this.tab[e.currentTarget.dataset.id].sortType;
					//唯品会商品
					this.loadWphCouponList('Refresh');
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
					url: '/pages/zysc/index/commoditydetail?ordersId=' + id
				});
			},
			getList(type) {
				this.loadingType = 1;
				uni.showLoading({
					title: '加载中...',
				});
				this.$Request.getT('/goods/userList?page=' + this.page + '&size=' + this.size + '&title=' +
					this.keywords + '&sort=' + this.tabStatus).then(res => {
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
			deleteKeyword() { //清空最近搜索的关键词
				this.recentKeyword = [];
				this.$queue.remove(this.localKeyword);
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
			loadTaoBaoCouponList: function(type) {
				this.loadingType = 1;
				this.$Request.get('/api/get_keyword_items/apikey/F9775E715DF1/keyword/' + this.keywords +
					'/back/10/sort/' + this.sort +
					'/min_id/' + this.min_id + '/cid/' + this.cid).then(res => {
					this.loadingType = 0;
					if (res.code === 1) {
						if (this.page === 1) {
							this.couponlist = [];
						}
						this.min_id = res.min_id;
						this.tb_p = res.tb_p;
						res.data.forEach(d => {
							let grade = this.$queue.getData("grade");
							d.tkmoneys = ((d.itemendprice * (d.tkrates * 0.01)) * parseFloat(this
								.$queue.maxMoney())).toFixed(2);
							if (grade) {
								d.tkmoney = ((d.itemendprice * (d.tkrates * 0.01)) * parseFloat(grade))
									.toFixed(2);
							} else {
								d.tkmoney = ((d.itemendprice * (d.tkrates * 0.01)) * parseFloat(this
									.$queue.minMoney())).toFixed(2);
							}
							d.itemsale = d.itemsale > 10000 ? "已售 " + (d.itemsale / 10000).toFixed(1) +
								"万" : "已售 " + d.itemsale;
							this.couponlist.push(d);
						})
					} else {
						this.loadingType = 2;
					}
					uni.hideLoading();

					if (type === "Refresh") {
						uni.stopPullDownRefresh(); // 停止刷新
					}
				})
			},
			navigateBack: function() {
				uni.navigateBack();
			},
			toGoodsInfo: function(itemid) {
				let relation_id = this.$queue.getData("relation_id");
				if (relation_id) {
					uni.navigateTo({
						url: "/pages/detail/goodsinfo?itemid=" + itemid + "&relation_id=" + relation_id,
					})
				} else {
					uni.navigateTo({
						url: "/pages/detail/goodsinfo?itemid=" + itemid,
					})
				}
			},
			searchInput: function(e) {
				this.keywords = e.detail.value;

			},
			submitSearch: function() {
				let keywords = this.$queue.get(this.localKeyword);
				if (JSON.stringify(keywords).indexOf(this.keywords) === -1) {
					this.$queue.insert({
						key: this.localKeyword,
						value: {
							keyword: this.keywords
						},
						capacityNum: 20, //队列容量
					});
				}
				uni.showLoading({
					title: '加载中...'
				});
				// #ifdef MP-ALIPAY
				if (this.$queue.getSearchKeys(this.keywords)) {
					uni.showToast({
						title: "输入内容带有非法关键字请重新输入",
						mask: false,
						duration: 1500,
						icon: "none"
					});
					this.keywords = '';
				} else {
					this.page = 1;
					this.min_id = 1;
					this.tb_p = 1;
					if (this.fromTabIndex == 0) { //拼多多商品
						this.loadPddCouponList("Refresh");
					}
					if (this.fromTabIndex == 1) { //京东商品
						this.loadJdCouponList("Refresh");
					}
					if (this.fromTabIndex == 2) {
						this.page = 0;
						//自营商品
						this.getList('Refresh');
					}
					if (this.fromTabIndex == 3) { //唯品会
						this.loadWphCouponList("Refresh");
					}
					this.topScrollTap();
				}
				// #endif
			},
		},
		onReachBottom: function() {
			this.page = this.page + 1;
			if (this.fromTabIndex == 0) { //拼多多商品
				this.loadPddCouponList();
			}
			if (this.fromTabIndex == 1) { //京东商品
				this.loadJdCouponList();
			}
			if (this.fromTabIndex == 2) {
				//自营商品
				this.getList();
			}
			if (this.fromTabIndex == 3) { //京东商品
				this.loadWphCouponList();
			}
		},
		onPullDownRefresh: function() {
			this.page = 1;
			this.min_id = 1;
			this.tb_p = 1;
			if (this.fromTabIndex == 0) { //拼多多商品
				this.loadPddCouponList("Refresh");
			}
			if (this.fromTabIndex == 1) { //京东商品
				this.loadJdCouponList("Refresh");
			}
			if (this.fromTabIndex == 2) {
				this.page = 0;
				//自营商品
				this.getList('Refresh');
			}
			if (this.fromTabIndex == 3) { //京东商品
				this.loadWphCouponList("Refresh");
			}
		}
	}
</script>

<style lang="scss">
	@import "../../../static/css/index.css";
	
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
		box-shadow: 0 2upx 10upx rgba(0, 0, 0, .06);
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

	.main-title {
		background: -moz-linear-gradient(left, #FB2C1A, #FF896F 100%);
		background: -webkit-gradient(linear, left top, left right, color-stop(0, #FB2C1A), color-stop(100%, #FF896F));
		background: -webkit-linear-gradient(left, #FB2C1A 0, #FF896F 100%);
		background: -o-linear-gradient(left, #FB2C1A 0, #FF896F 100%);
		background: -ms-linear-gradient(left, #FB2C1A 0, #FF896F 100%);
		background: linear-gradient(to left, #FB2C1A 0, #FF896F 100%);

		border-bottom-color: transparent;
		padding: 8px 10px;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 120;
		display: block;
		box-sizing: border-box;
	}

	.search-pop .search-tab {
		margin: 5px 0 10px;
		color: #fff;
		font-size: 15px;
		text-align: center;
		/* #ifdef APP-PLUS */
		padding-top: var(--status-bar-height);
		/* #endif */
	}

	.search-pop .search-tab .my-sub-src {
		margin: 0 auto 0 20px;
		display: inline-block;
		color: #fff;
		line-height: 30px;
		margin-bottom: 10px !important;
	}

	.search-pop .search-tab .my-sub-src:nth-child(1) {
		margin-left: 0px !important;
	}

	.main-title .search-tab .cur {
		opacity: 1;
		border-bottom: 1px solid #fff;
	}

	.main-title .search-tab .close-src {
		position: absolute;
		left: 20px;
		display: block;
		float: left;
		color: #ffffff;
		margin-top: 5px;
	}

	.main-title .search-tab .close-src .iconfont {
		font-size: 20px;
	}

	.uni-input-input,
	.uni-input-placeholder {
		width: 93%;
	}

	.main-title .search {
		background-color: #fff;
		border-radius: 20px;
		width: 76%;
		margin-left: 12%;
		position: relative;
		padding: 0 9px;
		height: 32px;
		line-height: 32px;
		font-size: 13px;
		margin-top: 10px;
	}

	.search_submit {
		width: 25%;
		height: 32px;
		background: #ffb925;
		color: #fff;
		float: right;
		margin-top: -32px;
		position: relative;
		border-radius: 15px;
		margin-right: -20px;
		z-index: 30;
	}

	.clear {
		float: right;
		color: crimson;
		width: 23px;
		height: 22px;
		margin-top: -31px;
		position: relative;
		margin-right: 50px;
		z-index: 100;
		background: white;
	}

	.main-title .search input {
		border: none;
		outline: 0;
		height: 32px;
		font-size: 13px;
		line-height: 30px;
		background: #fff;
		color: #666;
		border-radius: 5px;
		padding: 0 0 0 5px;
		text-align: left;
	}

	.main-title .search input.search_area {
		background-color: transparent;
		position: relative;
		z-index: 99;
		width: 80%;
		color: #333;
		font-size: 12px;
	}
</style>
