<template style="background: white">
	<view>
		<view style="z-index: 100;position: fixed;padding: 16px;color: #666666;background-color: #FFFFFF;display: flex;font-size: 32rpx;width: 100%;text-align: center;
font-weight: 600;">
			<view style="width: 33%;text-align: center;" @tap="change(1)" :class="[current==1?'active':'']">
				新人免单
				<view v-if="selectId == 1" style="color: #FF2637;" class="line"></view>
			</view>
			<view style="width: 33%;text-align: center;" @tap="change(2)" :class="[current==2?'active':'']">
				省钱教程
				<view v-if="selectId == 2" style="color: #FF2637;" class="line"></view>
			</view>
			<view style="width: 33%;text-align: center;" @tap="change(3)" :class="[current==3?'active':'']">
				赚钱教程
				<view v-if="selectId == 3" style="color: #FF2637;" class="line"></view>
			</view>
		</view>
		<view v-if="selectId == 2" style="padding-top: 72px;height: 100vh;background: #FFFFFF;">
			<view style="background: #FFFFFF;text-align: center;padding: 16px;color: #FF2638;font-size: 20px;">
				<view>▼</view>
				省钱流程
				<view>▼</view>
				<view style="font-size: 14px;color: #FF6600;">进入淘宝/京东/拼多多购物车选择任意商品点击进入详情</view>
				<view>▼</view>
				<!-- #ifdef H5 -->
				<view style="font-size: 14px;color: #FF6600;">长按复制商品标题</view>
				<view>▼</view>
				<view style="font-size: 14px;color: #FF6600;">发送至淇湘优购公众号</view>
				<view>▼</view>
				<view style="font-size: 14px;color: #FF6600;">找到对应商品进入商品详情</view>
				<view>▼</view>
				<view style="font-size: 14px;color: #FF6600;">点击立即领券（一键复制）</view>
				<view>▼</view>
				<view style="font-size: 14px;color: #FF6600;">打开淘宝自动弹出（点击立即领券）</view>
				<view style="font-size: 14px;color: #FF6600;">打开京东/拼多多直接点击立即领券购买</view>
				<!-- #endif -->
				<!-- #ifndef H5 -->
				<view style="font-size: 14px;color: #FF6600;">长按复制商品标题</view>
				<view>▼</view>
				<view style="font-size: 14px;color: #FF6600;">打开淇湘优购APP</view>
				<view>▼</view>
				<view style="font-size: 14px;color: #FF6600;">点击立即搜索</view>
				<view>▼</view>
				<view style="font-size: 14px;color: #FF6600;">找到对应商品进入商品详情</view>
				<view>▼</view>
				<view style="font-size: 14px;color: #FF6600;">点击立即领券</view>
				<view>▼</view>
				<view style="font-size: 14px;color: #FF6600;">进入京东/拼多多/淘宝（点击立即领券）</view>
				<!-- #endif -->
				<view>▼</view>
				<view style="font-size: 14px;color: #FF6600;">进入商品点击立即购买</view>
				<view>▼</view>
				<view style="font-size: 14px;color: #FF6600;">选择优惠券</view>
				<view>▼</view>
				<view style="font-size: 14px;color: #FF6600;">立即付款</view>
			</view>

		</view>
		<view v-if="selectId == 3" style="padding-top: 72px;height: 100vh;background: #FFFFFF;">
			<view style="background: #FFFFFF;text-align: center;padding: 16px;color: #FF2638;font-size: 20px;">
				<view>▼</view>
				加入会员流程
				<view style="font-size: 14px;margin-top: 8px;color: #FF6600;">注册账号 »进入我的 » 会员申请 »淘宝授权</view>
			</view>
			<view style="margin-bottom: 1px;background: #FFFFFF;text-align: center;padding: 16px;color: #FF2638;font-size: 20px;">
				<view>▼</view>
				会员赚钱流程
				<view style="font-size: 14px;margin-top: 8px;color: #FF6600;">选择任意商品 »商品详情 » 生成海报 »分享给朋友</view>
			</view>
			<view style="margin-bottom: 1px;background: #FFFFFF;text-align: center;padding: 16px;color: #FF2638;font-size: 20px;">
				<view>▼</view>
				会员升级流程
				<view style="font-size: 14px;margin-top: 8px;color: #FF6600;">进入我的 »推广中心 » 会员升级 »</view>
				<view style="font-size: 14px;margin-top: 8px;color: #FF6600;">生成海报 »分享给朋友</view>
			</view>
		</view>

		<view v-if="selectId == 1" style="padding-top: 72px;">
			<!-- <view style="background: #FFFFFF;text-align: center;padding: 16px;color: #FF2638;font-size: 20px;">
				<view>▼</view>
				新人免单流程
				<view style="font-size: 14px;margin-top: 8px;color: #FF6600;">
					<text @tap="register">注册会员</text>
					» 领券下单 » 等待收货 » 返至我的 » 提现
				</view>
			</view>
			<view style="margin-bottom: 1px;background: #FFFFFF;text-align: center;padding: 16px;color: #FF2638;font-size: 20px;">
				<view>▼</view>
				以下商品，新人免单
				<view style="font-size: 14px;margin-top: 8px;color: #FF6600;">仅限还未出过单的会员参与，出过单会员购买不免单</view>
				<view style="font-size: 14px;margin-top: 8px;color: #FF6600;">（仅限5元内商品全额免单）</view>
			</view> -->
			<view class="new_person">
				<image src="https://taobao.xianmxkj.com/static/news/xr.png"></image>
				<view class="liu">
					<view class="txt">新人免单流程</view>
					 <view class="step_wrap">
						 <view>
							 <image src="https://taobao.xianmxkj.com/static/news/vip.png"></image>
							 <text>会员注册</text>
						 </view>
						 <image class="arrow" src="https://taobao.xianmxkj.com/static/news/right.png"></image>
						 <view>
							 <image src="https://taobao.xianmxkj.com/static/news/lj.png"></image>
							 <text>领券下单</text>
						 </view>
						 <image class="arrow" src="https://taobao.xianmxkj.com/static/news/right.png"></image>
						 <view>
							 <image src="https://taobao.xianmxkj.com/static/news/dd.png"></image>
							 <text>等待收货</text>
						 </view>
						 <image class="arrow" src="https://taobao.xianmxkj.com/static/news/right.png"></image>
						 <view>
							 <image src="https://taobao.xianmxkj.com/static/news/wd.png"></image>
							 <text>返至我的</text>
						 </view>
						  <image class="arrow" src="https://taobao.xianmxkj.com/static/news/right.png"></image>
						 <view>
							 <image src="https://taobao.xianmxkj.com/static/news/tx.png"></image>
							 <text>提现</text>
						 </view>
					 </view>
					  
				</view> 

			</view>
			<view class="block"></view>
			<view class="liu2">
				<view class="txt">新人免单商品</view>
				<view class="txt1">仅限还未出过单的会员参与，出过单会员购买不免单</view>
				<view class="txt2">仅限5元内商品全额免单</view>
			</view>
			<view class="index-content">
				<view class="index-coupon has-bg-white has-pd-10 top_30">
					<view class="goods-list" v-if="couponlist.length > 0">
						<orange-goods-news-list v-for="(item, index) in couponlist" :key="index" :tkmoney="'返现 ￥' + item.tkmoney" :itemid="item.itemid"
						 :is-invitation="isInvitation" :logo="item.shoptype === 'B' ? logo : taobao" :itempic="item.itempic + '_310x310.jpg'"
						 :itemtitle="item.itemtitle" :shopname='item.shopname' :itemprice="'在售价 ¥' + item.itemprice" :itemsale="item.itemsale" :itemendprice="item.itemendprice"
						 :couponmoney="item.couponmoney"></orange-goods-news-list>
					</view>
				</view>
				<!-- 悬浮上拉 -->
				<view class="scroll_top" @tap="topScrollTap" v-bind:class="[scrollTop ? 'active' : '', '']" style="bottom: 56px;"><text
					 class="iconfont icon-shangla"></text></view>
<!-- active -->
				<!-- 加载更多提示 -->
				<view class="s-col is-col-24" v-if="couponlist.length > 0">
					<load-more :loadingType="loadingType" :contentText="contentText"></load-more>
				</view>
				<!-- 加载更多提示 -->
				<empty v-if="couponlist.length === 0" des="暂无数据" show="false"></empty>
			</view>
		</view>
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
				current:1,
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				},
				logo: '../../static/img/mao.png',
				taobao: '../../static/img/mao.png',
				TabCur: 0,
				TabCurs: 0,
				scrollLeft: 0,
				scrollLefts: 0,
				couponlist: [],
				selectId: 1,
				page: 1,
				min_id: 1,
				cid: 0,
				type: 4,
				sort: 3,
				genderKey: 'gender',
				loadingType: 0,
				isInvitation: 0,
				scrollTop: false,
				contentText: {
					contentdown: '上拉显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				}
			};
		},
		onLoad: function(e) {
			//this.type = 4;
			uni.setNavigationBarTitle({
				title: '新人免单'
			});
			uni.showLoading({
				title: '加载中...'
			});
			this.loadCouponList();
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
		onPageScroll: function(e) {
			this.scrollTop = e.scrollTop > 200;
		},
		methods: {
			change(index) {
				this.current=index;
				this.selectId = index;
			},
			searchSelect(e) {
				this.TabCurs = e.currentTarget.dataset.id;
				this.sort = 3;
				this.scrollLefts = (e.currentTarget.dataset.id - 1) * 60;
				this.page = 1;
				this.min_id = 1;
				uni.showLoading({
					title: '加载中...'
				});
				//#ifdef H5
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
				//#endif
				this.loadCouponList('Refresh');
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.cid = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
				this.page = 1;
				this.min_id = 1;
				uni.showLoading({
					title: '加载中...'
				});
				//#ifdef H5
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
				//#endif
				this.loadCouponList('Refresh');
			},
			topScrollTap: function() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
			},

			loadCouponList: function(type) {
				this.loadingType = 1;
				this.$Request.get('/api/low_price_Pinkage_data/order/4/type/4/apikey/maxd/back/10/min_id/' + this.min_id).then(res => {
					this.loadingType = 0;
					if (res.code === 1) {
						if (this.page === 1) {
							this.couponlist = [];
						}
						this.min_id = res.min_id;
						res.data.forEach(d => {
							let grade = this.$queue.getData('grade');
							d.tkmoneys = (d.tkmoney * parseFloat(this.$queue.maxMoney())).toFixed(2);
							if (grade) {
								d.tkmoney = (d.tkmoney * parseFloat(grade)).toFixed(2);
							} else {
								d.tkmoney = (d.tkmoney * parseFloat(this.$queue.minMoney())).toFixed(2);
							}
							d.itemsale = d.itemsale > 10000 ? (d.itemsale / 10000).toFixed(1) + '万' :  d.itemsale;
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
			register() {
				uni.navigateTo({
					url: '/pages/member/register??invitation=' + this.$queue.getInvitation()
				});
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
			}
		},

		onReachBottom: function() {
			this.page = this.page + 1;
			this.loadCouponList();
		},
		onPullDownRefresh: function() {
			this.page = 1;
			this.min_id = 1;
			this.loadCouponList('Refresh');
		}
	};
</script> class="line"

<style>
	@import '../../static/css/index.css';
	/* page{
		background: #FF2637;
	} */
	.active{
		color: #FF2638;
	}
	.block{
		height: 148upx;
	}
	.line{
		width: 61rpx;
		height: 8rpx;
		background: #FF2637;
		border-radius: 4rpx;
		margin: 4rpx auto 0;
	}
	/* .goods-list{
		background: #FF2637;
	} */
	.new_person{
		width: 750rpx;
		height: 500rpx;
		position: relative;
	}
	.new_person>image{
		display: block;
		width: 100%;
		height: 100%;
	}
	.liu{
		width: 690rpx;
		height: 259rpx;
		background: url(https://taobao.xianmxkj.com/static/news/kp.png);
		background-size: cover;
		position: absolute;
		top: 0;
		bottom: -412rpx;
		margin: auto;
		left: 0;
		right: 0;
   		margin: auto;
	}
	.liu2{
		width: 690upx;
		height: 218upx;
		background: url(https://taobao.xianmxkj.com/static/news/r1.png);
		background-size: cover;
		margin: 0 auto 20upx;
	}
	.liu>.txt{
		text-align: center;
		line-height: 68upx; 
		font-size: 38upx;
		font-weight: bold;
		color: #ffffff;
	}
	.liu2>.txt{
		text-align: center;
		line-height: 68upx; 
		font-size: 38upx;
		font-weight: bold;
		color: #ffffff;
	}
	.liu2>.txt1{
			text-align: center;
		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #666666;
		margin-top: 30upx;
		margin-bottom: 13upx;
	}
	.liu2>.txt2{
			text-align: center;
		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FE1E23;
	}
	.step_wrap{
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: 0 12upx;
		margin-top: 30upx;
	}
	.step_wrap>view{
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
	}
	.step_wrap>view>image{
		width: 68upx;
		height: 68upx;
	}
	.arrow{
		width: 53upx;
		height: 17upx;
		position: relative;
		top: -24upx;
	}
	.step_wrap text{
		font-size: 24upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #666666;
		line-height: 36upx;
		margin-top: 21upx;
	}
</style>
