<template>
	<view class="index-content">
		<view class="top-bckground">
			<!-- 搜索板块 -->
			<view class="index-header" style="top: 0px;">
				<!-- #ifndef H5 -->
				<view class="icon_header" style="padding-top: 100upx;">
					<!--#endif-->
					<!-- #ifdef H5 -->
					<view class="icon_header" style="padding-top: 20upx;">
						<!--#endif-->
						<view class="index-search" style="margin-right: 120upx;" @tap="toSearchIndex">
							<view class="icon_search" style="text-align: left;color: #999999;">
								<text class="cuIcon cuIcon-search" style="margin-right: 12upx"></text>
								<text>输入关键字或粘贴宝贝标题</text>
							</view>
						</view>
						<!-- #ifndef H5 -->
						<view class="icon_suji" @tap="toZujiIndex" style="margin-right: 20upx;margin-top: 120upx">
							<!-- <text class="iconfont icon-zuji"
								style="color:#FFFFFF;font-size: 50upx;font-weight: bold;"></text> -->
							<image
								src="https://dianqianh5.xianmaxiong.com/file/uploadPath/2022/05/23/343c322148058c36924273872da57c81.png"
								style="width:46upx;height:48upx;"></image>
						</view>
						<!--#endif-->
						<!-- #ifdef H5 -->
						<view class="icon_suji" @tap="toZujiIndex" style="margin-right: 20upx;margin-top: 40upx">
							<image
								src="https://dianqianh5.xianmaxiong.com/file/uploadPath/2022/05/23/343c322148058c36924273872da57c81.png"
								style="width:46upx;height:48upx;"></image>
						</view>
						<!--#endif-->
					</view>
				</view>
			</view>
			<view style="width: 100%;padding-bottom: 20px;">
				<!-- banner板块 -->
				<view>
					<!-- #ifdef H5 -->
					<view class="home-bg" style="height: 300upx;"></view>
					<!--#endif-->
					<!-- #ifndef H5 -->
					<view class="home-bg" style="height: 360upx;"></view>
					<!--#endif-->

					<!-- 分类轮播 -->
					<!-- #ifndef H5 -->
					<view class="category" style="margin-top: -160upx;">
						<!--#endif-->
						<!-- #ifdef H5 -->
						<view class="category" style="margin-top: -160upx;">
							<!--#endif-->
							<view class="box">
								<swiper class="swiper" duration="300" :style="{ height: categoryHeight }"
									@change="categoryChange">
									<swiper-item v-for="(nav, index5) in navlist" :key="index5">
										<view class="category-list">
											<view class="icon" v-for="(item,ind) in nav" :key="ind"
												@tap="toNavList(item.url, item.title)">
												<image mode="widthFix" :src="item.image_url"
													style="height: 90upx;width: 90upx"></image>
												<view>{{ item.title }}</view>
												<image v-if="item.classify == 1 || item.classify == '1'" class="remen"
													src="/static/img/remen.png"></image>
												<image v-if="item.classify == 2 || item.classify == '2'" class="lijian"
													src="/static/img/lijian.png"></image>
											</view>
										</view>
									</swiper-item>
								</swiper>
								<view class="dots">
									<view v-for="(page, pageindex) in navlist" :key="pageindex"
										:class="{ active: pageindex == currentPageindex }"></view>
								</view>
							</view>
						</view>
						<!--首页菜单开始-->
						<!--首页菜单结束-->

						<view class="swiper" style="background: #FFFFFF;" v-if="banners.length > 0">
							<swiper class="swiper-container" :autoplay="true" :interval="4000" :circular="true"
								:indicator-dots="true" indicator-active-color="#FB2C1A" indicator-color="#cccccc"
								style="height: 240upx;padding: 18upx 16upx 8upx 16upx">
								<block v-for="(item, index3) in banners" :key="index3">
									<swiper-item class="swiper-wrapper" @tap="toGoodsInfo(item.url)">
										<image lazy-load='true' fade-show='true' :src="item.image_url"
											style="width: 100%;height: 220upx;border-radius: 32upx;" mode="scaleToFill">
										</image>
									</swiper-item>
								</block>
							</swiper>
						</view>
						<!-- 修改一 -->
						<view style="display: flex;padding: 16upx;background: #FFFFFF;" v-if="navlist3.length>0">
							<view class="tuiguang_view1"
								:style="{backgroundImage:`url(${navlist3[0].backgroundImage ? navlist3[0].backgroundImage : '/static/indexs/foot2.png'})`}"
								@tap="toNavList(navlist3[0].url)">
								<view class="padding-sm" style="color:#FFFFFF;">
									<view>{{navlist3[0].title}}</view>
								</view>
								<view class="flex align-center justify-center">
									<view style="width: 330upx;height: 175upx;position: relative;">
										<image :src="navlist3[0].image_url"
											style="height: 160upx;width: 100%;border-radius: 15upx;">
										</image>
									</view>
								</view>
							</view>

							<view class="tuiguang_view2"
								:style="{backgroundImage:`url(${navlist3[1].backgroundImage ? navlist3[1].backgroundImage : '/static/indexs/foot1.png'})`}"
								@tap="toNavList(navlist3[1].url)">
								<view class="padding-sm" style="color:#FFFFFF;">
									<view>{{navlist3[1].title}}</view>
								</view>
								<view class="flex align-center justify-center">
									<view style="width: 330upx;height: 175upx;position: relative;">
										<image :src="navlist3[1].image_url"
											style="height: 160upx;width: 100%;border-radius: 15upx;">
										</image>
									</view>
								</view>
							</view>
						</view>

						<!-- 类别 -->
						<view v-if="navlist3.length>0"
							style="margin-left: 16upx;margin-right: 16upx;display: flex;height: 250upx;justify-content: space-around;background: #FFFFFF;">
							<!-- 美团生鲜红包 -->
							<view class="tuiguang_view3"
								:style="{backgroundImage:`url(${navlist3[2].backgroundImage ? navlist3[2].backgroundImage : '/static/indexs/111.png'})`}"
								@tap="toNavList(navlist3[2].url)">
								<view class="nablist-1">{{navlist3[2].title}}</view>
								<view class="dis" style="text-align: center;width: 97%;padding-left: 6upx;">
									<image :src="navlist3[2].image_url" class="com1"></image>
								</view>
							</view>
							<view class="tuiguang_view3"
								:style="{backgroundImage:`url(${navlist3[3].backgroundImage ? navlist3[3].backgroundImage : '/static/indexs/222.png'})`}"
								@tap="toNavList(navlist3[3].url)">
								<view class="nablist-1">{{navlist3[3].title}}</view>
								<view class="dis" style="text-align: center;width: 97%;padding-left: 6upx;">
									<image :src="navlist3[3].image_url" class="com1"></image>
								</view>
							</view>
							<view class="tuiguang_view3"
								:style="{backgroundImage:`url(${navlist3[4].backgroundImage ? navlist3[4].backgroundImage : '/static/indexs/333.png'})`}"
								@tap="toNavList(navlist3[4].url)">
								<view class="nablist-1">{{navlist3[4].title}}</view>
								<view class="dis" style="text-align: center;width: 97%;padding-left: 6upx;">
									<image :src="navlist3[4].image_url" class="com1"></image>
								</view>
							</view>
							<view class="tuiguang_view3"
								:style="{backgroundImage:`url(${navlist3[5].backgroundImage ? navlist3[5].backgroundImage : '/static/indexs/444.png'})`}"
								@tap="toNavList(navlist3[5].url)">
								<view class="nablist-1">{{navlist3[5].title}}</view>
								<view class="dis" style="text-align: center;width: 97%;padding-left: 6upx;">
									<image :src="navlist3[5].image_url" class="com1"></image>
								</view>
							</view>
						</view>
					</view>

					<view
						style="display: flex;background: #FFFFFF;border-radius: 50upx;margin: 32upx;padding: 8upx;text-align: center;">
						<view :class="douyinCurrent==0?'douyintabselect':'douyintab'" @click="selctDouyin(0)">抖音直播
						</view>
						<view :class="douyinCurrent==1?'douyintabselect':'douyintab'" @click="selctDouyin(1)">抖音好物
						</view>
					</view>
					<view style="background:#F2F2F2;" v-if="douyinCurrent==0">
						<view style="display: flex;margin-left: 16upx;margin-right: 16upx;flex-wrap:wrap;"
							v-if="zhiboList.length>0">
							<view class="zhibo" v-for="(g, index7) in zhiboList" :key="index7">
								<view class="g_left">
									<image lazy-load='true' fade-show='true' :src="g.author_pic" mode="scaleToFill">
									</image>
								</view>
								<view v-if="g.is_live==1">
									<image style="width: 130upx;height: 46upx;position: absolute;margin-top: -400upx;"
										src="https://dianqianh5.xianmaxiong.com/file/uploadPath/2022/05/23/9e7bb00c9584cbeb50362c8e14dd33b2.png">
									</image>
								</view>

								<view class="g_right">
									<text class="g_tit">{{g.author_name}}</text>


								</view>
								<view class="g_right">
									<text class="g_tit1"
										style="color: #FF2638;">平均佣金{{g.average_commission_rate}}%</text>


								</view>
								<view class="g_right">
									<text class="g_tit1" style="color: #999999;font-size: 28upx;">粉丝{{g.number}}万</text>


								</view>

								<view>
									<view class="douyinZhibo" @click="goZhiBo(g.author_openid)">进入直播间</view>
								</view>
							</view>
						</view>

					</view>

					<view style="background:#F2F2F2;" v-if="douyinCurrent==1">
						<scroll-view scroll-x class="nav selectTopn padding-tb-sm" style="height: 120upx;"
							scroll-with-animation :scroll-left="scrollLeft">
							<view style="height: 60upx;line-height: 60upx;" class="cu-item"
								:class="index1 == TabCur ? 'text-green cur' : ''" v-for="(item, index1) in category"
								:key="index1" @tap="tabSelect(index1)" :data-id="index1">
								<text :style="
										index1 == TabCur
											? 'border-radius: 32upx;margin-right: -20upx;font-size:36upx'
											: 'background: transparent;margin-right: -20upx'
									">
									{{ item.name }}
								</text>
								<view v-if="index1 == TabCur"
									style="width: 40upx;height: 8upx;background: #FF2638;color: transparent;margin-left: 14upx;">
									-</view>
								<view v-if="index1 != TabCur"
									style="width: 40upx;height: 4upx;color: transparent;margin-left: 14upx;">-
								</view>
							</view>
						</scroll-view>




						<!-- 布局样式修改一 -->
						<view
							style="display: flex;justify-content: space-around;margin-left: 16upx;margin-right: 16upx;"
							v-if="category[TabCur].orderList.length>0">
							<view>
								<view class="g_wrap" v-for="(g, index7) in category[TabCur].orderList" :key="index7"
									@click="toGoodsInfos(g.itemid)">
									<view class="g_left">
										<image lazy-load='true' fade-show='true' :src="g.item_pic"
											@click="toGoodsInfos(g.itemid)" mode="scaleToFill"></image>
									</view>
									<view class="g_right">
										<text class="g_tit"><text class="xbox">抖音</text>{{g.itemtitle}}</text>
										<!-- <view class="share">分享赚{{g.tkmoney}}</view> -->
										<view class="flex justify-between align-center margin-top-xs"
											style="margin-top: 40upx;">
											<view class="txt">
												<text>售价</text>
												<text>￥</text>
												<text>{{ g.price }}</text>
												<!-- <text>￥{{ g.max_price }}</text> -->
											</view>
											<view style="color:#999999;font-size:24upx;">{{g.sales}}</view>
										</view>
										<view style="color:#999999;font-size:24upx;margin-top: 10upx;">{{g.shop_name}}
										</view>
									</view>
								</view>
							</view>
						</view>
						<!-- 加载更多提示 -->
						<!-- <empty v-if="category[TabCur].orderList.length === 0 && category[TabCur].loadingType == 0"
									des="暂无数据"></empty> -->
					</view>
					<!-- 加载更多提示 -->
					<!-- <view class="s-col is-col-24">
								<load-more :loadingType="category[TabCur].loadingType" :contentText="contentText"></load-more>
							</view> -->
				</view>

				<simpleModal ref="simpleModalTklBuy" @maskClose="TklBuymaskClose">
					<view class="buy-box-center">
						<view class="code-cent" style="margin-top: 10px;">
							<div class="cente-text" style="height: auto;">
								<div>
									<view class="textarea" style="height: auto;">复制框内整段文字，打开【抖音APP】即可购买。{{ douyinLink }}
									</view>
								</div>
							</div>
						</view>
						<button class="buy-btn-copy" v-bind:class="[copyTklStatus ? 'active' : '', '']"
							@tap="copyTklWenAn">
							{{ copyTklStatus ? ' 复制成功！请打开【抖音APP】购买' : '一键复制' }}
						</button>
					</view>
				</simpleModal>

			</view>

		</view>
	</view>

</template>

<script>
	import simpleModal from '@/components/simple-pro/customModal.vue';
	import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue';
	export default {
		components: {
			simpleModal,
			tkiQrcode
		},
		onPageScroll: function(e) {
			this.scrollTop = e.scrollTop > 200;
		},
		data() {
			return {
				zhibomin_id: 0,
				douyinCurrent: 0,
				zhiboList: [],
				douyinLink: '',
				currentPageindex: 0,
				categoryHeight: '300rpx',
				modalName: '',
				topH: 1000,
				logo: '../../static/img/mao.png',
				TabCur: 0,
				scrollLeft: 0,
				messageList: [],
				imageUrl: '../../static/img/common/logo.png',
				showEmpty: false,
				banner: [{
					id: '1'
				}],
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				category: [{
						name: '美食',
						positon: 11,
						loadingType: 0,
						page: 1,
						orderList: [],
						banner: []
					},
					{
						name: '居家',
						positon: 10,
						loadingType: 0,
						page: 1,
						orderList: [],
						banner: []
					},
					{
						name: '美妆',
						positon: 4,
						loadingType: 0,
						page: 1,
						orderList: [],
						banner: []
					},
					{
						name: '女装',
						positon: 1,
						loadingType: 0,
						page: 1,
						orderList: [],
						banner: []
					},

					{
						name: '母婴',
						positon: 9,
						loadingType: 0,
						page: 1,
						orderList: [],
						banner: []
					},

					{
						name: '男装',
						positon: 2,
						loadingType: 0,
						page: 1,
						orderList: [],
						banner: []
					},

					{
						name: '鞋品',
						positon: 6,
						loadingType: 0,
						page: 1,
						orderList: [],
						banner: []
					},
					{
						name: '箱包',
						positon: 7,
						loadingType: 0,
						page: 1,
						orderList: [],
						banner: []
					},
					{
						name: '配饰',
						positon: 5,
						loadingType: 0,
						page: 1,
						orderList: [],
						banner: []
					},
					{
						name: '儿童',
						positon: 8,
						loadingType: 0,
						page: 1,
						orderList: [],
						banner: []
					},
					{
						name: '数码',
						positon: 12,
						loadingType: 0,
						page: 1,
						orderList: [],
						banner: []
					},
					{
						name: '家电',
						positon: 13,
						loadingType: 0,
						page: 1,
						orderList: [],
						banner: []
					},

					{
						name: '内衣',
						positon: 3,
						loadingType: 0,
						page: 1,
						orderList: [],
						banner: []
					},
					{
						name: '车品',
						positon: 15,
						loadingType: 0,
						page: 1,
						orderList: [],
						banner: []
					},
					{
						name: '文体',
						positon: 16,
						loadingType: 0,
						page: 1,
						orderList: [],
						banner: []
					},
					{
						name: '宠物',
						positon: 17,
						loadingType: 0,
						page: 1,
						orderList: [],
						banner: []
					},
					{
						name: '其他',
						positon: 14,
						loadingType: 0,
						page: 1,
						orderList: [],
						banner: []
					}
				],
				banners: [],
				haowuList: [],
				navlist: [],
				navlists: [],
				juhuasuanlist: [],
				couponlist: [],
				dataList: [],
				page: 1,
				min_id: 1,
				wanghong: false,
				min_ids: 1,
				min_ida: 1,
				erweima: '',
				cat_id: 0,
				navlist3: [],
				gender: 0,
				loadingType: 0,
				index: 0,
				show_share: false,
				genderKey: 'gender',
				copyTklStatus: '',
				isInvitation: 0,
				isEnable: "否",
				relation_id: '',
				contentText: {
					contentdown: '上拉显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				}
			};
		},
		onPullDownRefresh() {
			this.loadBanner();
			this.loadMenuList();
			this.loadMenuList1();
			this.loadMessage();

		},
		onLoad: function() {
			let a = this.$queue.getData("isEnable")
			if (a) {
				this.isEnable = a;
			}
			this.$queue.setData('gradeIndex', 0);
			let gender = this.$queue.getData(this.genderKey);
			if (gender) {
				if (gender === 1) {
					this.gender = gender;
				}
				if (gender === 2) {
					this.gender = gender;
				}
			}
			this.getDouYinZhiBo();
			this.getdouyinList();
			this.loadBanner();
			this.loadMenuList();
			this.loadMenuList1();
			this.loadMessage();
			this.getAvatar();
		},
		onReachBottom() {
			if (this.douyinCurrent == 0) {
				this.getDouYinZhiBo();
			} else {
				this.getdouyinList();
			}
		},
		onShow() {
			if (this.navlist.length == 0) {
				this.loadBanner();
				this.loadMenuList();
				this.loadMenuList1();
				this.loadMessage();

			}
			this.getUserInfo();
			this.getAvatar();
		},
		methods: {
			goZhiBo: function(open_id) {
				this.$queue.showLoading('请求中...');
				let relation_id = this.$queue.getData('relation_id') ? this.$queue.getData('relation_id') : this.$queue
					.getInvitation();
				this.$Request.post('/api/get_dylive_link', {
					open_id: open_id,
					channel: relation_id,
					apikey: this.$queue.getTaoBaoKey()
				}).then(res => {
					uni.hideLoading();
					if (res.code == 200) {
						this.douyinLink = res.data.dy_password;
						this.$refs.simpleModalTklBuy.show({
							showConfirmButton: false
						});
					} else {
						this.$queue.showToast(res.msg)
					}
				});
			},
			//获取直播
			getDouYinZhiBo() {
				this.$queue.showLoading('加载中...')
				this.$Request.get('/api/dy_live_list?apikey=maxd&back=100&min_id=' + this.zhibomin_id).then(res => {
					this.zhibomin_id = res.min_id
					if (res.code === 200) {

						res.data.forEach(d => {
							if (d.is_live == 1) {
								d.number = parseFloat(d.fans_num / 10000).toFixed(0)
								this.zhiboList.push(d);
							}
						});
					}
					uni.hideLoading();
				});
			},
			//处理抖音筛选切换
			selctDouyin(status) {
				this.douyinCurrent = status
			},
			copyTklWenAn: function() {
				let that = this;
				uni.setClipboardData({
					data: this.douyinLink,
					success: r => {
						this.copyTklStatus = true;
						// #ifdef APP-PLUS
						if (plus.os.name == 'Android') {
							plus.runtime.launchApplication({
									pname: 'com.ss.android.ugc.aweme'
								},
								function(e) {
									that.$queue.showToast('您的手机中并未安装此软件');
								}
							);
						} else if (plus.os.name == 'iOS') {
							plus.runtime.launchApplication({
								action: 'com.ss.android.ugc.aweme'
							}, function(e) {
								that.$queue.showToast('您的手机中并未安装此软件');
							});
						}
						// #endif
					}
				});
			},
			TklBuymaskClose: function() {
				this.$refs.simpleModalTklBuy.hide();
				this.copyTklStatus = false;
			},
			getdouyinList(type) {
				this.$queue.showLoading('加载中...')
				this.$Request.get('/tao/douyin/list?page=' + this.category[this.TabCur].page + '&size=10&sort=1&keyword=' +
					this.category[this.TabCur].name).then(res => {
					this.category[this.TabCur].loadingType = 0;
					if (res.status === 0) {
						if (this.category[this.TabCur].page == 1) {
							this.category[this.TabCur].orderList = [];
						}
						this.category[this.TabCur].page = res.data.min_id;
						res.data.data.forEach(d => {
							let grade = this.$queue.getData('grade');
							// d.tkmoneys = (d.tkmoney * parseFloat(this.$queue.maxMoney())).toFixed(2);
							// if (grade) {
							// 	d.tkmoney = (d.tkmoney * parseFloat(grade)).toFixed(2);
							// } else {
							// 	d.tkmoney = (d.tkmoney * parseFloat(this.$queue.minMoney())).toFixed(
							// 		2);
							// }
							d.sales = d.sales > 10000 ? '已售 ' + (d.sales / 10000).toFixed(1) +
								'万件' : '已售 ' + d.sales + '件';
							this.category[this.TabCur].orderList.push(d);

							// this.category[this.TabCur].orderList.push(d);
						});
					} else {
						this.category[this.TabCur].loadingType = 2;
					}
					if (type === 'Refresh') {
						uni.stopPullDownRefresh(); // 停止刷新
					}
					uni.hideLoading();
				});



				// this.$Request
				// 	.get('/api/column/apikey/maxd/type/9/back/10/min_id/' + this.category[this.TabCur].page +
				// 		'/sort/9/cid/' + this.category[
				// 			this.TabCur].positon)
				// 	.then(res => {
				// 		this.category[this.TabCur].loadingType = 0;
				// 		if (res.code === 1) {
				// 			this.category[this.TabCur].page = res.min_id;
				// 			res.data.forEach(d => {
				// 				let grade = this.$queue.getData('grade');
				// 				d.tkmoneys = (d.tkmoney * parseFloat(this.$queue.maxMoney())).toFixed(2);
				// 				if (grade) {
				// 					d.tkmoney = (d.tkmoney * parseFloat(grade)).toFixed(2);
				// 				} else {
				// 					d.tkmoney = (d.tkmoney * parseFloat(this.$queue.minMoney())).toFixed(
				// 						2);
				// 				}
				// 				d.itemsale = d.itemsale > 10000 ? '已售 ' + (d.itemsale / 10000).toFixed(1) +
				// 					'万件' : '已售 ' + d.itemsale + '件';
				// 				this.category[this.TabCur].orderList.push(d);

				// 				// this.category[this.TabCur].orderList.push(d);
				// 			});
				// 		} else {
				// 			this.category[this.TabCur].loadingType = 2;
				// 		}
				// 		if (type === 'Refresh') {
				// 			uni.stopPullDownRefresh(); // 停止刷新
				// 		}
				// 		uni.hideLoading();
				// 	});
			},
			//更新分类指示器
			categoryChange(event) {
				this.currentPageindex = event.detail.current;
			},
			getAvatar() {
				let image_url = this.$queue.getData('image_url');
				if (image_url) {
					this.imageUrl = image_url;
				} else {
					this.imageUrl = '../../static/img/common/logo.png';
				}
			},
			goHongbao() {
				// this.show_share=false;
				uni.navigateTo({
					url: "/pages/index/mian"
				})
			},
			closeShare() {
				this.show_share = false;
			},
			hideModal() {
				this.modalName = ''
			},
			showModals() {
				this.modalName = 'RadioModal'
			},
			/**
			 * 首页轮播
			 */
			loadBanner: function() {
				this.$Request.get('/tao/activity/state/13').then(res => {
					if (res.status === 0) {
						if (res.data.length > 0) {
							console.log(res.data);
							this.banners = res.data;
						}

					}
				});

			},
			loadMenuList1: function() {
				this.$Request.get('/tao/activity/state/12').then(res => {
					if (res.status === 0) {
						if (res.data.length > 0) {
							this.navlist3 = res.data;
						}
					}
				});
			},
			// 传进数组和指定个数，进行拆分
			chunk: function(array, size) {
				//获取数组的长度，如果你传入的不是数组，那么获取到的就是undefined
				const length = array.length
				//判断不是数组，或者size没有设置，size小于1，就返回空数组
				if (!length || !size || size < 1) {
					return []
				}
				//核心部分
				let index = 0 //用来表示切割元素的范围start
				let resIndex = 0 //用来递增表示输出数组的下标

				//根据length和size算出输出数组的长度，并且创建它。
				let result = new Array(Math.ceil(length / size))
				//进行循环
				while (index < length) {
					//循环过程中设置result[0]和result[1]的值。该值根据array.slice切割得到。
					result[resIndex++] = array.slice(index, (index += size))
				}
				//输出新数组
				return result
			},
			loadMenuList: function() {
				// https://taobao.xianmxkj.com/tao/activity/state/11
				// https://taobao.xianmxkj.com/activity/state/11
				this.$Request.get('/tao/activity/state/11?type=1').then(res => {
					console.log(res);
					if (res.status === 0) {
						if (res.data.length > 0) {
							var datanew = this.chunk(res.data, 10)
							this.navlist = datanew;
							console.log('navlist的数据', datanew)
							if (res.data.length > 5) {
								this.categoryHeight = "300rpx"
							} else {
								this.categoryHeight = "150rpx"
							}
						} else {
							var datanew = this.chunk(this.navlists, 10)
							this.navlist = datanew;
						}
					}
				});
			},

			/**
			 * @param {Object} type加载
			 */
			loadCouponList: function(type) {
				this.category[this.TabCur].loadingType = 1;
				this.$Request
					.get('/api/column/apikey/maxd/type/9/back/10/min_id/' + this.category[this.TabCur].page +
						'/sort/9/cid/' + this.category[
							this.TabCur].positon)
					.then(res => {
						this.category[this.TabCur].loadingType = 0;
						if (res.code === 1) {
							this.category[this.TabCur].page = res.min_id;
							res.data.forEach(d => {
								let grade = this.$queue.getData('grade');
								d.tkmoneys = (d.tkmoney * parseFloat(this.$queue.maxMoney())).toFixed(2);
								if (grade) {
									d.tkmoney = (d.tkmoney * parseFloat(grade)).toFixed(2);
								} else {
									d.tkmoney = (d.tkmoney * parseFloat(this.$queue.minMoney())).toFixed(
										2);
								}
								d.itemsale = d.itemsale > 10000 ? '已售 ' + (d.itemsale / 10000).toFixed(1) +
									'万件' : '已售 ' + d.itemsale + '件';
								this.category[this.TabCur].orderList.push(d);

								// this.category[this.TabCur].orderList.push(d);
							});
						} else {
							this.category[this.TabCur].loadingType = 2;
						}
						if (type === 'Refresh') {
							uni.stopPullDownRefresh(); // 停止刷新
						}
						uni.hideLoading();
					});
			},


			getUserInfo() {
				let userId = this.$queue.getData('userId');
				if (userId) {
					this.$Request.getT('/user/' + userId).then(res => {
						if (res.status === 0 && res.data) {
							this.$queue.setData('image_url', res.data.image_url);
							this.$queue.setData('mobile', res.data.phone);
							this.isInvitation = res.data.isInvitation;
							this.topH = 1050;
							if (res.data.relationId) {
								this.relation_id = res.data.relationId;
								this.topH = 850;

							} else {
								this.topH = 1050;
							}
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
			/**
			 * 加载公告
			 */
			loadMessage() {
				this.$Request.getT('/message/page/1/0/5').then(res => {
					if (res.status === 0) {
						this.messageList = res.data.content;
					}
				});
			},

			/**
			 * @param {Object} e tab切换
			 */
			tabSelect(e) {
				this.TabCur = e;
				this.scrollLeft = (e - 1) * 50;
				this.category[this.TabCur].page = 1;
				this.getdouyinList();
			},

			qrR(path) {
				this.$queue.setData('erweimas', path);
			},

			toCategory(son_name) {
				uni.navigateTo({
					url: '/package/pages/categray/search?cid=' + this.category[this.TabCur].positon + '&name=' +
						son_name
				});
			},

			//app查询
			goSearch() {
				uni.navigateTo({
					url: '/pages/search/search?keywords=' + this.copyTklStatus
				});
				this.$refs.simpleModalTkls.hide();
				this.copyTklStatus = '';
				uni.setClipboardData({
					data: '',
					success: r => {
						uni.showToast({
							icon: 'none',
							title: '搜索中',
							duration: 1500
						});
					}
				});
			},
			// //app查询弹框
			TklmaskClose: function(e) {
				this.$refs.simpleModalTkls.hide();
				this.copyTklStatus = '';
				uni.setClipboardData({
					data: '',
					success: r => {
						uni.showToast({
							icon: 'none',
							title: '已取消',
							duration: 1500
						});
					}
				});
			},
			TklmaskCloses: function(e) {
				this.$refs.simpleModalTkls.hide();
			},
			//获取剪切板
			async getClipboardData() {
				let that = this;
				uni.getClipboardData({
					success: function(res) {
						that.copyTklStatus = res.data;
						if (res.data) {
							if (res.data.indexOf('http') == -1 && res.data.indexOf('&') == -1 && res.data
								.indexOf('￥') == -1) {
								that.$refs.simpleModalTkls.show({
									showConfirmButton: false
								});
							} else {
								that.$refs.simpleModalTkls.hide();
							}
						} else {
							that.$refs.simpleModalTkls.hide();
						}
					},
					fail: function(res) {}
				});
			},




			/**
			 * 会员授权界面
			 */
			goPublisherInfo() {
				let token = this.$queue.getData('token');
				let userId = this.$queue.getData('userId');
				if (token) {
					uni.navigateTo({
						url: '/pages/member/publisher?uid=' + userId + '&token=' + token
					});
				} else {
					this.loginS();
				}
			},
			/**
			 * 登录检测
			 */
			loginS() {
				//#ifdef H5
				uni.navigateTo({
					url: '/pages/member/register'
				});
				//#endif
				//#ifndef H5
				uni.navigateTo({
					url: '/pages/public/login'
				});
				//#endif
			},
			goWebView(item) {
				if (item.type == 'url') {
					//#ifndef H5
					uni.navigateTo({
						url: '/pages/member/ping?url=' + item.url
					});
					//#endif
					//#ifdef H5
					window.location.href = item.url;
					//#endif
				}
			},
			showGender() {
				this.$refs.simpleModalTkl.show({
					showConfirmButton: false
				});
			},
			/**
			 * 快速置顶
			 */
			topScrollTap: function() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
			},

			/**
			 * @param {Object} url
			 * @param {Object} titles 首页item跳转
			 */
			toNavList: function(url, title) {
				if (url.indexOf('/pages/') !== -1) {
					if (url.indexOf('/pages/index/duomai') !== -1) {
						let relation_id = this.relation_id ? this.relation_id : this.$queue.getData('publicRelation');
						this.$queue.showLoading('跳转中...');
						// this.$queue.showToast('我是多麦');
						let id = url.split('?ids=')[1].split('&')[0]
						this.$Request.getT('/order/getDmUrl?relationId=' + relation_id + '&adsId=' + id).then(res => {
							uni.hideLoading();
							this.$queue.setData('dmurl', res.data.data.url);
							if (res.status === 0) {
								//#ifndef H5
								uni.navigateTo({
									url: '/pages/member/webview?class=dm&url=123'
								});
								//#endif


								//#ifdef H5
								window.location.href = res.data.data.url;
								//#endif
							}
						});
					} else {
						console.log(url);
						if (url == "/pages/index/meituan") {
							uni.navigateTo({
								url: "../../package/pages/index/meituan"
							});
						} else if (url == "/pages/index/eleme") {
							uni.navigateTo({
								url: "../../package/pages/index/eleme"
							});
						} else if (url == "/pages/member/meituan") {
							uni.navigateTo({
								url: "../../package/pages/member/meituan"
							});
						} else if (url == "/pages/member/eleme") {
							uni.navigateTo({
								url: "../../package/pages/member/eleme"
							});
						} else {
							uni.navigateTo({
								url: "category"
							});
						}

					}
				} else {
					if (url == '话费充值') {
						let pddpid = this.$queue.getData('pddpid');
						if (!pddpid) {
							pddpid = this.$queue.getData('pinduoduopid')
						}
						this.$Request.getT("/pdd/getGeneratePromUrl?pid=" + pddpid).then(res => {
							if (res.resourceUrlResponse) {
								let weAppInfo = res.resourceUrlResponse.singleUrlList;
								if (weAppInfo) {
									//#ifndef H5
									uni.navigateTo({
										url: '/pages/member/webview?url=' + weAppInfo.mobileShortUrl
									});
									//#endif
									//#ifdef H5
									window.location.href = weAppInfo.weAppWebViewShortUrl;
									//#endif	
								} else {
									this.$queue.showToast('暂无活动')
								}
							}
							uni.hideLoading();


						});
					} else {
						//#ifndef H5
						uni.navigateTo({
							url: '/pages/member/webview?url=' + url
						});
						//#endif
						//#ifdef H5
						window.location.href = url;
						//#endif
					}

				}
			},
			toGoodsInfo: function(url) {
				if (url.indexOf('/pages/') !== -1) {
					uni.navigateTo({
						url
					});
				} else {
					// http://taobaoshop.xianmxkj.com/tao/order/getDmUrl?relationId=2242941210&adsId=10130

					//#ifndef H5
					uni.navigateTo({
						url: '/pages/member/webview?url=' + url
					});
					//#endif
					//#ifdef H5
					window.location.href = url;
					//#endif	


				}
			},
			toGoodsInfos: function(itemid) {
				this.$queue.showLoading('获取链接中...');
				let relation_id = this.$queue.getData('relation_id') ? this.$queue.getData('relation_id') : this.$queue
					.getInvitation();
				this.$Request.get('/tao/douyin/getLink?itemid=' + itemid + '&channel=' + relation_id).then(res => {
					uni.hideLoading();
					if (res.status == 0) {
						if (res.data.code == 200) {
							this.douyinLink = res.data.data.dy_password;
							this.$refs.simpleModalTklBuy.show({
								showConfirmButton: false
							});
						} else {
							this.$queue.showToast('商品已下架！')
						}
					}
				});

				// if (relation_id) {
				// 	uni.navigateTo({
				// 		url: '/pages/detail/goodsinfo?itemid=' + itemid + '&relation_id=' + relation_id
				// 	});
				// } else {
				// 	uni.navigateTo({
				// 		url: '/pages/detail/goodsinfo?itemid=' + itemid
				// 	});
				// }
			},
			toSearchIndex: function() {
				uni.navigateTo({
					url: '/pages/homeSearch/index'
				});
			},
			toZujiIndex: function() {
				uni.navigateTo({
					url: '/packagetwo/pages/footer/index'
				});
			},
			toMessage: function() {
				if (token) {
					uni.navigateTo({
						url: '/pages/member/message'
					});
				} else {
					this.loginS();
				}
			}
		},
	};
</script>

<style lang="scss">
	@import '../../static/css/index.css';

	.tuiguang_view1 {
		width: 49%;
		border-radius: 15upx;
		// box-shadow: rgba(183, 183, 183, 0.3) 0px 1px 10px;
		background-size: cover;
	}

	.tuiguang_view2 {
		width: 49%;
		margin-left: 15upx;
		border-radius: 15upx;
		// box-shadow: rgba(183, 183, 183, 0.3) 0px 1px 10px;
		background-size: cover;
	}

	.douyinZhibo {
		text-align: center;
		// width: 100%;
		margin: 0 32upx 32upx 32upx;
		background-image: url(../../packagetwo/static/indexs/douyin.png);
		background-repeat: round;
		height: 80upx;
		line-height: 80upx;
		color: #BE0EFF;
	}

	.douyintabselect {
		width: 50%;
		background-image: url(../../packagetwo/static/indexs/douyin.png);
		background-repeat: round;
		height: 80upx;
		line-height: 80upx;
		color: #BE0EFF;
	}

	.douyintab {
		width: 50%;
		// background-image: url(../../static/img/douyin.png);
		background-repeat: round;
		height: 80upx;
		line-height: 80upx;
		color: #333333;
	}

	.tuiguang_view3 {
		width: 23%;
		height: 238upx;
		text-align: center;
		border-radius: 15upx;
		background-size: 100%;
		// background: url(../../static/indexs/111.png);
	}

	.com1 {
		height: 170upx;
		width: 100%;
		margin-top: 15upx;
		border-radius: 15upx;
		background-size: 100%;
	}

	.font {
		color: #666666;
		font-size: 24upx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin-top: 4rpx;
	}

	.dis {
		display: flex;
		justify-content: space-around;
	}

	.g_wrap {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		margin-bottom: 20rpx;
		background: #ffffff;
		padding: 10px 10px;
		border-radius: 5px;

		.g_left {
			margin-right: 19rpx;

			image {
				width: 200rpx;
				height: 200rpx;
				display: block;
				border-radius: 8px;
			}
		}

		.g_right {
			position: relative;

			.g_tit {
				display: block;
				width: 467rpx;
				height: 88rpx;
				margin-bottom: 14rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				line-height: 48rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box; // 作为弹性伸缩盒子模型显示。
				-webkit-box-orient: vertical; // 设置伸缩盒子的子元素排列方式--从上到下垂直排列
				-webkit-line-clamp: 2;
			}

			.g_salse {
				width: 120rpx;
				height: 34rpx;
				text-align: center;
				// background: url(../../static/img/nav/pic_bg.png);
				background-size: cover;
				line-height: 34rpx;
				margin-bottom: 20rpx;
				font-size: 28upx;
				color: #fff;
			}

			.txt {
				&>text:nth-child(1) {
					font-size: 24rpx;
					font-family: PingFang SC;
					// font-weight: bold;
					color: #FF2638;
					line-height: 32rpx;
				}

				&>text:nth-child(2) {
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #FF2638;
					line-height: 32rpx;
				}

				&>text:nth-child(3) {
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #FF2638;
					line-height: 32rpx;
				}

				&>text:nth-child(4) {
					margin-left: 9rpx;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 500;
					text-decoration: line-through;
					color: #999999;
					line-height: 32rpx;
				}
			}

			.buy {
				position: absolute;
				right: 0;
				bottom: 0;
				width: 110rpx;
				height: 68rpx;
				background: #FF2638;
				border-radius: 10rpx;
				color: #ffffff;
				line-height: 68rpx;
				text-align: center;
			}
		}
	}

	.zhibo {
		width: 48%;
		// flex-direction: row;
		// justify-content: flex-start;
		margin-bottom: 20rpx;
		background: #ffffff;
		margin-left: 10upx;
		font-size: 30upx;

		color: #000;
		// padding: 20upx;
		border-radius: 10upx;

		.g_left {


			image {
				width: 100%;
				height: 400rpx;
				display: block;
				border-radius: 8px;
			}
		}

		.g_right {
			position: relative;

			.g_tit {
				text-align: center;
				display: block;
				margin-bottom: 16upx;
				margin-top: 16upx;
				// width: 467rpx;
				// height: 88rpx;
				// margin-bottom: 14rpx;
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				line-height: 48rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box; // 作为弹性伸缩盒子模型显示。
				-webkit-box-orient: vertical; // 设置伸缩盒子的子元素排列方式--从上到下垂直排列
				-webkit-line-clamp: 2;
			}

			.g_tit1 {
				text-align: center;
				display: block;
				margin-bottom: 8upx;
				margin-top: 8upx;
				// width: 467rpx;
				// height: 88rpx;
				// margin-bottom: 14rpx;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				line-height: 48rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box; // 作为弹性伸缩盒子模型显示。
				-webkit-box-orient: vertical; // 设置伸缩盒子的子元素排列方式--从上到下垂直排列
				-webkit-line-clamp: 2;
			}

			.g_salse {
				width: 120rpx;
				height: 34rpx;
				text-align: center;
				// background: url(../../static/img/nav/pic_bg.png);
				background-size: cover;
				line-height: 34rpx;
				margin-bottom: 20rpx;
				font-size: 28upx;
				color: #fff;
			}

			.txt {
				&>text:nth-child(1) {
					font-size: 24rpx;
					font-family: PingFang SC;
					// font-weight: bold;
					color: #FF2638;
					line-height: 32rpx;
				}

				&>text:nth-child(2) {
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #FF2638;
					line-height: 32rpx;
				}

				&>text:nth-child(3) {
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #FF2638;
					line-height: 32rpx;
				}

				&>text:nth-child(4) {
					margin-left: 9rpx;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 500;
					text-decoration: line-through;
					color: #999999;
					line-height: 32rpx;
				}
			}

			.buy {
				position: absolute;
				right: 0;
				bottom: 0;
				width: 110rpx;
				height: 68rpx;
				background: #FF2638;
				border-radius: 10rpx;
				color: #ffffff;
				line-height: 68rpx;
				text-align: center;
			}
		}
	}

	.g_wrap {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		margin-bottom: 20rpx;
		background: #ffffff;
		padding: 10px 10px;
		border-radius: 5px;

		.g_left {
			margin-right: 19rpx;

			image {
				width: 200rpx;
				height: 200rpx;
				display: block;
				border-radius: 8px;
			}
		}

		.g_right {
			position: relative;

			.g_tit {
				display: block;
				width: 467rpx;
				height: 88rpx;
				margin-bottom: 14rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				line-height: 48rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box; // 作为弹性伸缩盒子模型显示。
				-webkit-box-orient: vertical; // 设置伸缩盒子的子元素排列方式--从上到下垂直排列
				-webkit-line-clamp: 2;
			}

			.g_salse {
				width: 120rpx;
				height: 34rpx;
				text-align: center;
				// background: url(../../packagetwo/static/indexs/pic_bg.png);
				background-size: cover;
				line-height: 34rpx;
				margin-bottom: 20rpx;
				font-size: 28upx;
				color: #fff;
			}

			.txt {
				&>text:nth-child(1) {
					font-size: 24rpx;
					font-family: PingFang SC;
					// font-weight: bold;
					color: #FF2638;
					line-height: 32rpx;
				}

				&>text:nth-child(2) {
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #FF2638;
					line-height: 32rpx;
				}

				&>text:nth-child(3) {
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #FF2638;
					line-height: 32rpx;
				}

				&>text:nth-child(4) {
					margin-left: 9rpx;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 500;
					text-decoration: line-through;
					color: #999999;
					line-height: 32rpx;
				}
			}

			.buy {
				position: absolute;
				right: 0;
				bottom: 0;
				width: 110rpx;
				height: 68rpx;
				background: #FF2638;
				border-radius: 10rpx;
				color: #ffffff;
				line-height: 68rpx;
				text-align: center;
			}
		}
	}

	.arrow_img {
		width: 78rpx;
		height: 23rpx;

	}


	.news_title {
		font-weight: bold;
		color: #FB2C1A;
		margin-right: 32upx;
		margin-left: 32upx;
		width: 12upx;
	}

	.xinrenhongbao image {
		animation: myfirst 1s infinite;
	}

	@keyframes myfirst {
		0% {
			transform: translate(0px, 0px);
		}

		50% {
			transform: translate(0px, -15px);
		}

		100% {
			transform: translate(0px, 0px);
		}
	}

	.box-float {
		width: 32%;
		float: left;
		position: relative;
		border-radius: 16upx;
		padding: 6upx;
	}

	.img-gender {
		border-radius: 60upx;
		/* #ifndef H5 */
		width: 60upx;
		height: 60upx;
		margin-top: 66upx
			/* #endif */
			/* #ifdef H5 */
			width: 60upx;
		height: 60upx;
		margin-top: 20upx
			/* #endif */


	}

	.top-background {
		background: -webkit-linear-gradient(left, #FB2C1A 0, #FF896F 100%);
		background: -o-linear-gradient(left, #FB2C1A 0, #FF896F 100%);
		background: -ms-linear-gradient(left, #FB2C1A 0, #FF896F 100%);
		background: -webkit-gradient(linear, right top, left top, color-stop(0, #FB2C1A), to(#FF896F));
		background: -o-linear-gradient(right, #FB2C1A 0, #FF896F 100%);
		background: linear-gradient(to left, #FB2C1A 0, #FF896F 100%);
	}

	.swiper-item img {
		display: block;
	}

	.title .fr {
		float: right;
		line-height: 50px;
		margin-right: 16px;
		font-size: 10px;
		color: #ccc;
	}

	/*#ifndef APP-PLUS*/
	.scroll_top_act {
		background: white;
		top: 45px;
		position: fixed;
	}

	/*#endif*/
	/*#ifdef APP-PLUS*/
	.scroll_top_act {
		background: white;
		top: 65px;
		position: fixed;
	}

	/*#endif*/

	.banner {
		border-radius: 10px;
		margin: 8px 8px 0 8px;
		overflow: hidden;
		display: flex;
	}

	.banner img {
		width: 100%;
	}

	.banner>.left {
		flex: 4;
		/* margin-right: 10upx; */
		border-right: 2px solid #f2f2f2;
		overflow: hidden;
	}

	.banner>.right {
		flex: 7;
	}

	.right .top {
		width: 100%;
		/* margin-bottom: 7upx; */
		/*border-bottom: 2px solid #f2f2f2;*/
		overflow: hidden;
	}

	.right .bottom {
		display: flex;
		width: 100%;
	}

	.right .bottom .bottom-left {
		flex: 6;
		/* margin-right: 5upx; */
		overflow: hidden;
		border-right: 1px solid #f2f2f2;
	}

	.right .bottom .bottom-right {
		flex: 6;
		/* margin-left: 5upx; */
		/* border-left: 1px solid #f2f2f2; */
		overflow: hidden;

	}

	.marquee-box {

		border-radius: 5px;
		overflow: hidden;
		position: relative;
		background: #fff;
		height: 26px;
		line-height: 26px;
	}

	.marquee-title {
		padding-left: 8px;
		padding-right: 8px;
		position: absolute;
		color: #ff5100;
		top: 0;
		left: 0;
		z-index: 3;
		background: #fff;
		font-size: 14px;
	}

	.marquee {
		padding: 6px 10px;
		color: #000;
		display: inline-block;
		white-space: nowrap;
		animation: 35s wordsLoop linear infinite normal;
		font-size: 14px;
	}

	@keyframes wordsLoop {
		0% {
			transform: translateX(350px);
			-webkit-transform: translateX(350px);
		}

		100% {
			transform: translateX(-100%);
			-webkit-transform: translateX(-100%);
		}
	}

	.selectTop {
		z-index: 100;
		padding-left: 16upx;
		padding-right: 16upx;
		// position: fixed;
		// top: 90upx;
		// background: -webkit-linear-gradient(left, #FF2638 0, #FF2638 100%);
		// background: -o-linear-gradient(left, #FF2638 0, #FF2638 100%);
		// background: -ms-linear-gradient(left, #FF2638 0, #FF2638 100%);
		// background: -webkit-gradient(linear, right top, left top, color-stop(0, #FF2638), to(#FF2638));
		// background: -o-linear-gradient(right, #FF2638 0, #FF2638 100%);
		// background: -webkit-linear-gradient(right, #FF2638 0, #FF2638 100%);
		// background: linear-gradient(to left, #FF2638 0, #FF2638 100%);
	}

	.selectTop1 {
		z-index: 999;
		padding-left: 16upx;
		padding-right: 16upx;
		// position: fixed;
		// top: 130upx;
		// background: -webkit-linear-gradient(left, #FF2638 0, #FF2638 100%);
		// background: -o-linear-gradient(left, #FF2638 0, #FF2638 100%);
		// background: -ms-linear-gradient(left, #FF2638 0, #FF2638 100%);
		// background: -webkit-gradient(linear, right top, left top, color-stop(0, #FF2638), to(#FF2638));
		// background: -o-linear-gradient(right, #FF2638 0, #FF2638 100%);
		// background: -webkit-linear-gradient(right, #FF2638 0, #FF2638 100%);
		// background: linear-gradient(to left, #FF2638 0, #FF2638 100%);
	}

	#shareit {
		-webkit-user-select: none;
		position: fixed;
		width: 100%;
		height: 2000px;
		background: rgba(0, 0, 0, 0.85);
		text-align: center;
		top: 0;
		left: 0;
		z-index: 999;
	}

	#shareit img {
		max-width: 100%;
	}

	.arrow {
		width: 80%;
		height: 420px;
		margin-top: 100px;
	}

	// 新加
	.nablist-1 {
		text-align: center;
		color: #ffffff;
		font-size: 24upx;
		padding-top: 16upx;
	}

	.nablist-1 image {
		margin: 0 auto;
	}

	.share_close {
		position: absolute;
		bottom: -0.5rem;
		left: 50%;
		margin-left: -0.3rem;
		width: 0.6rem;
		height: 0.6rem;
		background: url(http://img.haodanku.com/Fo2-nJ_43fsFStbAfqMUEcCFJnJ6);
		background-size: 100% 100%;
		cursor: pointer;
	}

	.home-bg {
		background: -webkit-linear-gradient(left, #FF2638 0, #FF2638 100%);
		background: -o-linear-gradient(left, #FF2638 0, #FF2638 100%);
		background: -ms-linear-gradient(left, #FF2638 0, #FF2638 100%);
		background: -webkit-gradient(linear, right top, left top, color-stop(0, #FF2638), to(#FF2638));
		background: -o-linear-gradient(right, #FF2638 0, #FF2638 100%);
		background: -webkit-linear-gradient(right, #FF2638 0, #FF2638 100%);
		background: linear-gradient(to left, #FF2638 0, #FF2638 100%);
		height: 350upx;
		border-bottom-right-radius: 32upx;
		border-bottom-left-radius: 32upx;

	}

	#follow {
		margin-right: 60px;
		margin-left: 30px;
		width: 90%;
		height: 50px;
		line-height: 50px;
		text-align: left;
		text-decoration: none;
		font-size: 18px;
		color: white;
		float: left;
		margin-top: 160px;
	}

	.category {
		// padding: 4upx;
		// background: #FFFFFF;

		.list {
			margin-top: 20upx;
			width: 100%;
			display: flex;
			flex-wrap: wrap;

			.box {
				width: 20%;
				margin-bottom: 20upx;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-wrap: wrap;

				image {
					width: 60%;
					height: calc(71.44vw / 3 * 0.6);
				}

				.text {
					margin-top: 5upx;
					width: 100%;
					display: flex;
					justify-content: center;
					font-size: 26upx;
				}
			}
		}
	}

	.swiper-box {
		height: calc(100% - 40px);
	}



	.category {
		width: 100%;

		.box {
			width: 100%;
			// border-radius: 40upx;
			border-top-left-radius: 40upx;
			border-top-right-radius: 40upx;
			background-color: #ffffff;
			padding: 15upx 0upx;

			.dots {
				display: flex;
				justify-content: center;
				height: 15upx;
				width: 100%;

				view {
					width: 30upx;
					height: 5upx;
					background-color: rgba(0, 0, 0, 0.2);

					&.active {
						background-color: #ff570a;
					}
				}
			}

			.swiper {
				width: 100%;
				padding: 10upx 0;

				.uni-swiper-dot {
					width: 20upx;
				}

				.category-list {
					// width: 100%;
					// height: auto;
					// display: flex;
					// justify-content: flex-start;
					// padding: 10upx 0;
					// flex-flow: wrap;
					display: flex;
					flex-wrap: wrap;
					width: 100%;
					align-items: center;

					.icon {
						width: 20%;
						display: flex;
						flex-flow: wrap;
						justify-content: center;
						font-size: 22upx;
						color: #666;
						margin-bottom: 20upx;
						position: relative;

						image {
							width: 70%;
							height: 13.3vw;
						}

						view {
							width: 100%;
							display: flex;
							justify-content: center;
						}

						.remen,
						.lijian {
							width: 60upx;
							height: 30upx;
							position: absolute;
							top: 0;
							right: 0;
						}
					}
				}
			}
		}
	}

	.category-list {
		// width: 100%;
		// height: auto;
		// display: flex;
		// justify-content: flex-start;
		// padding: 10upx 0;
		// flex-flow: wrap;
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		align-items: center;

		.icon {
			width: 20%;
			display: flex;
			flex-flow: wrap;
			justify-content: center;
			font-size: 22upx;
			color: #666;
			margin-bottom: 20upx;
			position: relative;

			image {
				width: 70%;
				height: 13.3vw;
			}

			view {
				width: 100%;
				display: flex;
				justify-content: center;
			}

			.remen,
			.lijian {
				width: 60upx;
				height: 30upx;
				position: absolute;
				top: 0;
				right: 0;
			}
		}
	}

	.sale {
		background: url(https://taobao.xianmxkj.com/static/img/nav/salse.png);
		background-size: cover;
		font-size: 20upx;
		width: 320rpx;
		height: 32rpx;
		text-align: center;
		color: #fff;
		position: relative;
		left: -108rpx;
		top: 8rpx;
	}

	.xbox {
		border: 2upx solid #FF1D19;
		border-radius: 6upx;
		padding: 0px 10rpx;
		color: #FF1D19;
		margin-right: 8upx;
		font-size: 22rpx;
	}

	.share {
		background: #FF1D19;
		border-radius: 5upx;
		color: #ffffff;
		font-size: 11px;
		/* padding: 0px 5px; */
		display: flex;
		width: 30%;
		height: 40upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
