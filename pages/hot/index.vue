<template>

	<view class="index-content" style="background: #F8F8F8;">
		<scroll-view scroll-x class="nav" scroll-with-animation :scroll-left="scrollLeft"
			style="position: fixed;z-index: 999;background: white;text-align: center;height: 90upx;">
			<view style="height: 60upx;line-height: 60upx;padding-top: 10upx;" class="cu-item" v-bind:key='index'
				:class="index==TabCur?'text-green cur':''" v-for="(item,index) in category" @tap="tabSelect"
				:data-id="index">
				<text
					:style="index==TabCur?'color: #E40806;padding: 4px 10px 4px 10px;border-radius: 16px;margin-right: -12px;font-size:34upx':'background: #FFFFFF;color: #666666;margin-right: -12px;padding: 4px 10px 4px 10px;border-radius: 16px;'">
					{{item.classifyName}}
				</text>
				<view v-if="index == TabCur"
					style="width: 40upx;height: 4upx;background: #E40806;color: #FFFFFF;margin-left: 66upx;">-</view>
				<view v-if="index != TabCur" style="width: 40upx;height: 4upx;color: transparent;margin-left: 66upx;">-
				</view>
			</view>
		</scroll-view>


		<view class="index-coupon has-pd-10">
			<view v-if="handpick.length > 0&&TabCur==0" style="padding-top: 90upx">
				<orange-handpick v-bind:key='index' v-for="(h,index) in handpick" :copy_content="h.copy_content"
					:total="h.dummy_click_statistics" :content="h.show_content" :images="h.itempic"
					:showTime="h.show_time" :to="h.itemid"></orange-handpick>
			</view>
		</view>
		<view class="index-coupon has-pd-10 top_30">
			<view v-if="news.length > 0&&TabCur==1" style="padding-top: 90upx">
				<orange-news v-bind:key='index' v-for="(h,index) in news" :total="h.share_times"
					:copy_text="h.copy_text" :content="h.show_text" :showTime="h.activity_start_time" :goods="h.goods">
				</orange-news>
			</view>
		</view>
		<view class="index-coupon has-pd-10 top_30">
			<view v-if="suCaiList.length > 0&&TabCur==2" style="padding-top: 90upx">
				<orange-mians v-bind:key="index" v-for="(h, index) in suCaiList" :copy_content="h.content"
					:content="h.content"
					:images="h.imgsrc" :url="h.articleUrl"></orange-mians>
			</view>
		</view>

		<view class="index-coupon has-pd-10 top_30">
			<view v-if="newsList.length > 0&&TabCur>2" style="padding-top: 90upx">
				<orange-mians v-bind:key="index" v-for="(h, index) in newsList" :copy_content="h.content"
					:total="h.messageId" :content="h.content" :showTime="h.createTime" :to="h.itemid"
					:images="h.picture" :url="h.articleUrl"></orange-mians>

			</view>
			<!-- <view style="padding-top: 400upx;text-align: center;color: #999999;font-size: 28upx;" v-if="newsList.length== 0">暂无数据</view> -->

		</view>
		<view class="scroll_top" @tap="topScrollTap" v-bind:class="[scrollTop ? 'active' : '','']"
			style="bottom: 56px;">
			<text class="iconfont icon-shangla"></text>
		</view>
		<!-- 加载更多提示 -->
		<view v-if="TabCur<3">
			<view class="s-col is-col-24" v-if="handpick.length > 0||news.length>0">
				<load-more :loadingType="loadingType" :contentText="contentText"></load-more>
			</view>
		</view>

	</view>

</template>

<script>
	export default {
		name: "Card",
		data() {
			return {
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				loadingType: 0,
				scrollTop: false,
				TabCur: 0,
				showNews: false,
				showHandPick: true,
				scrollLeft: 0,
				res: [],
				mianDan: [],
				newsList: [],
				handpick: [],
				handpickLoad: {
					loading: false,
					finished: false,
					total: 1,
				},
				category: [{
						"id": 17,
						"classifyName": "精选单品",
						"state": 1,
						"sort": 0,
						"createTime": "2020-08-19 18:26:10",
						"remark": "精选单品"
					},
					{
						"id": 18,
						"classifyName": "好货专场",
						"state": 1,
						"sort": 0,
						"createTime": "2020-08-19 18:26:10",
						"remark": "好货专场"
					}
				],
				news: [],
				classifyId: 1,
				suCaiList:[],
				newsLoad: {
					loading: false,
					finished: false,
					total: 1,
				},
				min_id: 1,
				min_id1: 1,
			}
		},
		onLoad: function(e) {
			uni.showLoading({
				title: '加载中...'
			});
			this.getTopList();
			this.getHandpick(1);

			var that = this;
			var timer = setInterval(function() {
				that.min_id = 1;
				that.min_id1 = 1;
				if (that.TabCur == 0) {
					that.getHandpick(1);
				}
				if (that.TabCur == 1) {
					that.getNews(1);
				}

				if (that.TabCur > 2) {
					that.classifyId = that.category[that.TabCur].id;
					this.newsList = [];
					that.getNewsList();
				}
			}, 1000 * 30);

			// this.getNews(1);
		},
		onPageScroll: function(e) {
			this.scrollTop = e.scrollTop > 200;
		},
		onReachBottom: function() {
			if (this.TabCur == 0) {
				this.handpickOnLoad();
			} else if (this.TabCur == 1) {
				this.newsOnLoad();
			} else if (this.TabCur == 2) {
				this.getSuCai();
			} else {
				this.getNewsList();
			}
		},
		onPullDownRefresh: function() {
			this.min_id = 1;
			this.min_id1 = 1;
			if (this.TabCur == 0) {
				this.getHandpick(1);
			}
			if (this.TabCur == 1) {
				this.getNews(1);
			}
			if (this.TabCur == 2) {
				this.getSuCai();
			}

			if (this.TabCur > 2) {
				this.classifyId = this.category[this.TabCur].id;
				this.newsList = [];
				this.getNewsList();
			}
		},
		methods: {
			tabSelect(e) {
				uni.hideLoading();
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 500
				});
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
				if (e.currentTarget.dataset.id == 0) {
					if (this.handpick.length == 0) {
						uni.showLoading({
							title: '加载中...'
						});
						this.getHandpick(1);
					} else {
						this.showNews = false;
						this.showHandPick = true;
					}
				}
				if (e.currentTarget.dataset.id == 1) {
					if (this.news.length == 0) {
						uni.showLoading({
							title: '加载中...'
						});
						this.getNews(1);
					} else {
						this.showNews = true;
						this.showHandPick = false;
					}
				}
				if (e.currentTarget.dataset.id == 2) {
					if (this.suCaiList.length == 0) {
						uni.showLoading({
							title: '加载中...'
						});
						this.getSuCai(1);
					} else {
						this.showNews = false;
						this.showHandPick = true;
					}
				}

				if (this.TabCur > 2) {
					this.classifyId = this.category[this.TabCur].id;
					this.getNewsList();
				}
			},
			topScrollTap: function() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
			},
			getOrderList() {
				this.$Request.getT('/freeOfCharge/selectList?page=0&size=20').then(res => {
					if (res.status === 0) {
						this.mianDan = [];
						for (let i = 0; i < res.data.content.length; i++) {
							res.data.content[i].message = res.data.content[i].message.replace(/↵/g, "\n");
							this.mianDan.push(res.data.content[i])
						}

					}
					uni.hideLoading();
					uni.stopPullDownRefresh(); // 停止刷新
				});
			},
			//获取素材
			getSuCai() {
				this.$Request.get('/api/get_salutation_data/apikey/maxd/min_id/'+this.min_id).then(res => {
					if (res.code === 200) {
						this.min_id = res.min_id;
						// this.suCaiList = [];
						for (let i = 0; i < res.data.length; i++) {
							// res.data.content[i].message = res.data.content[i].message.replace(/↵/g, "\n");
							this.suCaiList.push(res.data[i])
						}

					}
					uni.hideLoading();
					uni.stopPullDownRefresh(); // 停止刷新
				});
			},
			getTopList() {
				this.$Request.getT('/article/selectArticleClassifyList').then(res => {
					if (res.status == 0) {
						this.category = res.data;
					}
				});
			},
			handpickOnLoad() {
				this.getHandpick(this.handpickLoad.total += 1);
			},
			getNewsList() {
				this.loadingType = 1;
				this.$Request.getT('/article/selectArticleList?classifyId=' + this.classifyId).then(res => {
					this.loadingType = 0;
					if (res.status === 0) {
						this.newsList = res.data;
					} else {
						this.loadingType = 2;
					}
					uni.hideLoading();
					uni.stopPullDownRefresh(); // 停止刷新
				});
			},
			getHandpick(page) { //获取精选商品数据
				this.showNews = false;
				this.showHandPick = true;
				this.loadingType = 1;
				this.$Request.get('/api/selected_item/apikey/F9775E715DF1/min_id/' + this.min_id).then(res => {
					this.loadingType = 0;
					if (res.code === 1) {
						if (page === 1) {
							this.handpick = [];
						}
						this.min_id = res.min_id;
						for (let i = 0; i < res.data.length; i++) {
							res.data[i].show_content = res.data[i].show_content
								.replace(/&lt;/g, "<")
								.replace(/&gt;/g, ">")
								.replace(/&amp;/g, "&")
								.replace(/&quot;/g, '"')
								.replace(/&apos;/g, "'");
							res.data[i].copy_content = res.data[i].copy_content
								.replace(/&lt;/g, "<")
								.replace(/&gt;/g, ">")
								.replace(/&amp;/g, "&")
								.replace(/&quot;/g, '"')
								.replace(/&apos;/g, "'");
							res.data[i].copy_content = res.data[i].copy_content
								.replace(/<br>/g, "\n");
							this.handpick.push(res.data[i]);
						}
						this.handpickLoad.loading = false;
					} else {
						this.loadingType = 2;
						this.handpickLoad.loading = false;
						this.handpickLoad.finished = true;
					}
					uni.hideLoading();
					uni.stopPullDownRefresh(); // 停止刷新
				})
			},

			getBian(page) { //获取精选商品数据
				this.loadingType = 1;
				this.$Request.get1('/api/excellent_editor/apikey/F9775E715DF1/back/10/min_id/' + this.min_id1).then(
				res => {
					this.loadingType = 0;
					if (res.code === 1) {
						if (page === 1) {
							this.news = [];
						}
						this.min_id1 = res.min_id;
						for (let i = 0; i < res.data.length; i++) {
							res.data[i].copy_text = res.data[i].copy_text
								.replace(/&lt;/g, "<")
								.replace(/&gt;/g, ">")
								.replace(/&amp;/g, "&")
								.replace(/&quot;/g, '"')
								.replace(/&apos;/g, "'");
							this.news.push(res.data[i]);
						}

						this.newsLoad.loading = false;
					} else {
						this.loadingType = 2;
						this.newsLoad.loading = false;
						this.newsLoad.finished = true;
					}
					uni.hideLoading();
					uni.stopPullDownRefresh(); // 停止刷新
				})
			},
			newsOnLoad() {
				this.getNews(this.newsLoad.total += 1);
			},
			getNews(page) { //获取好货专场数据
				this.loadingType = 1;
				this.showNews = true;
				this.showHandPick = false;
				this.$Request.get('/api/subject_hot/apikey/F9775E715DF1/min_id/' + this.min_id1).then(res => {
					this.loadingType = 0;
					if (res.code === 1) {
						if (page === 1) {
							this.news = [];
						}
						this.min_id1 = res.min_id;
						for (let i = 0; i < res.data.length; i++) {
							res.data[i].goods = [];
							let itemData = res.data[i].item_data;
							for (let p = 0; p < itemData.length; p++) {
								//有些商品出现无效情况，所以判断...
								if (itemData[p].itemendprice !== undefined) {
									res.data[i].goods.push({
										image: itemData[p].itempic,
										price: '券后价￥' + itemData[p].itemendprice,
										to: itemData[p].itemid,
									});
								}
							}

							res.data[i].show_text = res.data[i].show_text
								.replace(/&lt;/g, "<")
								.replace(/&gt;/g, ">")
								.replace(/&amp;/g, "&")
								.replace(/&quot;/g, '"')
								.replace(/&apos;/g, "'");
							res.data[i].copy_text = res.data[i].copy_text
								.replace(/&lt;/g, "<")
								.replace(/&gt;/g, ">")
								.replace(/&amp;/g, "&")
								.replace(/&quot;/g, '"')
								.replace(/&apos;/g, "'");
							res.data[i].copy_text = res.data[i].copy_text
								.replace(/<br>/g, "\n");
							this.news.push(res.data[i]);
						}
						this.newsLoad.loading = false;
					} else {
						this.loadingType = 2;
						this.newsLoad.loading = false;
						this.newsLoad.finished = true;
					}
					uni.stopPullDownRefresh(); // 停止刷新
					uni.hideLoading();
				})
			},
		}
	}
</script>

<style>
	@import "../../static/css/index.css";

	page {
		background: #F2F2F2;
	}
</style>
