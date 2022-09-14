<template>
	<view class="index-content" style="background:#F2F2F7;">
		<!-- <image lazy-load="true" :src="bj1" style="width: 100%;height: 300upx;position: absolute;"></image> -->
		<view style="position: relative;top: 0;">
			<view class="content-div" style="position: fixed;width: 100%;background-color: #FFFFFF;z-index: 999999;">
				<!-- <image lazy-load="true" :src="imageUrl" style="width: 60upx;height: 60upx;margin: 20upx 15upx 0upx 20upx;border-radius: 50upx;"></image> -->
				<view class="icon_header" @tap='goSearch'>
					<image class="header-imgsuo" src="https://taobao.xianmxkj.com/static/rindex/sou.png"></image>
					<input type="text" placeholder="输入关键字搜索商品" class="icon-headerI" style="width: 100%;" />
				</view>
				<image src="https://shop.shengqianxiong.com.cn/img/20211009/3c3cbe7c1a55408c8451838a2371a056.png"
					style="width: 50rpx;height: 45rpx;margin: 30upx 20upx 0upx 10upx;"
					@click="navToLogin('/pages/member/message')"></image>
			</view>
		</view>
		<!-- #ifdef APP-PLUS -->
		<view style="padding: 130upx 16upx 0;margin: 0upx 6upx;">
			<!-- #endif -->
			<!-- #ifndef APP-PLUS -->
			<view style="padding: 130upx 16upx 0;margin: 0upx 6upx ;">
				<!-- #endif -->
				<swiper class="swiper-container" :autoplay="true" :interval="4000" :circular="true"
					:indicator-dots="true" indicator-active-color="#e10a07" indicator-color="#cccccc"
					style="height: 240rpx;">
					<swiper-item class="swiper-wrapper" style="" v-for="(item, index3) in bannerList" :key="index3"
						@tap='toNavList(item.linkUrl)'>
						<image lazy-load='true' fade-show='true' :src="item.imgUrl" v-if="item"
							style="width: 100%;height: 240rpx;overflow: hidden;border-radius: 20rpx;"
							mode="scaleToFill"></image>
					</swiper-item>
				</swiper>
			</view>
			<!--首页菜单开始-->

			<!-- <view style="display: flex;flex-direction: row;flex-wrap: wrap;background-color: #FFFFFF;padding-bottom: 35upx;margin: 15upx 20upx 0 20upx; border-radius: 15upx;">
							<view style="display: flex;flex-direction: row; padding: 10upx;padding-left: 19upx;" v-for="(item, index) in navlist"
							 :key="index">
								<view style="width: 115upx; height: 120upx;text-align: center;margin-top: 20upx;" @tap='toNavList(item.url)' v-if="item">
									<image v-if="item.image_url" lazy-load="true" :src="item.image_url" style="width: 90upx;height: 90upx;"></image>
									<view style="font-size: 24upx;color: #333333;">{{ item.title }}</view>
								</view>
								<view class="dots">
									<view v-for="(page, pageindex) in navlist" :key="pageindex"
										:class="{ active: pageindex == currentPageindex }"></view>
								</view>
							</view>
					</view> -->

			<view class="category" v-if="navlist.length>0">
				<view class="box">
					<swiper class="swiper" duration="300" :style="{ height: categoryHeight }" @change="categoryChange">
						<swiper-item v-for="(nav, index5) in navlist" :key="index5">
							<view class="category-list">
								<view class="icon" v-for="(item,ind) in nav" :key="ind" @tap='toNavList(item.url)'>
									<image mode="widthFix" :src="item.image_url" style="height: 90upx;width: 90upx;">
									</image>
									<view>{{ item.title }}</view>
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
			<!--首页公告开始-->
			<swiper v-if="messageList.length > 0" :autoplay="true" :vertical="true" :interval="4000" :circular="true"
				:indicator-dots="false"
				style="height: 60upx;line-height: 50upx;background: #FFFFFF;margin-left: 20upx;margin-top: 20upx;margin-right: 32upx;border-radius: 10upx;width: 95%;padding: 5upx 0 0 20upx;">
				<block v-for="(item1, index10) in messageList" :key="index10">
					<swiper-item style="height: 60upx;" @tap='toNavList(item1.url)'>
						<view>
							<image src="https://taobao.xianmxkj.com/static/img/laba.png"
								style="width: 40upx;height: 40upx;margin-top: -5upx;"></image>
							<text>{{ item1.title }}</text>
						</view>
					</swiper-item>
				</block>
			</swiper>

			<view class="index-views" style="margin-top: 20upx;">
				<!-- <image lazy-load="true" src="" style="width:50%;height:300upx;position: relative;border-bottom-right-radius: 15upx;"></image> -->
				<view class="index_view_left" v-if="jingXuan.length > 0">
					<view style="border-radius:12upx;padding: 5upx 0upx 0 5upx;" @tap="goCommondityList('推荐商品')">
						<view style="margin: 15upx 0 0 15upx;color: #333333;font-size: 32upx;font-weight: 700">
							为你推荐
						</view>
						<view style="color:#999999;margin-left: 16upx;font-size:23rpx;">精选畅销品</view>
						<view style="display: flex;margin-left: 16rpx;">
							<view class="go">
								GO
							</view>
							<view class="image_img" style="padding: 20upx 0upx;">
								<image v-if="jingXuan[0].image_url" :src="jingXuan[0].image_url"
									style="height: 350rpx;width: 130px;margin-top: 50rpx;"></image>
							</view>
							<!-- <view style="height: 200upx;text-align: left;width: 100%;padding-top: 10upx;" v-for="(item,index) in jingXuan">
								<image lazy-load="true" :src="item.image_url" style="height: 185upx;width: 160upx;"></image>
							</view> -->
						</view>
					</view>
				</view>
				<view class="index_view_right">
					<view class="right_box" v-if="jingXuan.length > 0">
						<view style="border-radius:12upx;padding: 5upx 0upx 0 5upx;" @tap="goCommondityList('精选好物')">
							<view style="margin: 15upx 0 0 15upx;color: #333333;font-size: 32upx;font-weight: 700">
								精选好物
							</view>
							<view style="color:#999999;margin-left: 16upx;font-size:23rpx;">精选畅销品</view>
							<view style="display: flex;margin-left: 16upx;">
								<view class="go">
									GO
								</view>
								<view style="height: 200upx;text-align: left;width: 100%;padding: 20upx;">
									<image lazy-load="true" :src="jingXuan[0].image_url"
										style="height: 120rpx;width: 200rpx;margin-left: 25rpx;"></image>
								</view>
							</view>
						</view>
					</view>
					<view class="right_box" v-if="reMai.length > 0">
						<view style="width: 50%;height:300upx;border-radius:12upx; margin-left: 3upx;">
							<view style="border-radius:12upx;padding: 5upx 0upx 0 0;" @tap="goCommondityList('热卖榜单')">
								<view style="margin-top:15upx;padding-left: 10upx;">
									<view style="color:#333333;font-size:32upx;font-weight: 700">热卖榜单</view>
									<view style="color:#999999;font-size:23rpx;">高品质生活</view>
								</view>
								<view style="display: flex;margin-left: 16upx;margin-top: 3upx;">
									<view class="go">
										GO
									</view>
									<view style="height: 180rpx;text-align: left;width: 235rpx;padding: 20upx;">
										<image lazy-load="true" :src="reMai[0].image_url"
											style="height: 160rpx;width: 400rpx;margin-left: 20rpx;"></image>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="index-views" style="margin-top: 7px;">
				<!-- <image lazy-load="true" src="" style="width:50%;height:300upx;position: relative;border-bottom-left-radius: 20upx;border-bottom-right-radius: 15upx;"></image> -->
				<view
					style="width: 49%;border-radius:12upx;padding: 5upx 0upx 0 5upx;background-color: #FFFFFF;margin-right: 10rpx;"
					@tap="goCommondityList('每日上新')" v-if="meiRi.length > 0">
					<view style="margin: 15upx 0 0 15upx;color: #333333;font-size: 32upx;font-weight: 700">
						每日上新
					</view>
					<view style="color:#999999;margin-left: 16upx;font-size:23rpx;">热卖好货数量有限</view>
					<view style="display: flex;margin-left: 16upx;">
						<view class="go">
							GO
						</view>
						<view style="height: 200rpx;text-align: left;width: 235rpx;padding: 20upx;">
							<image lazy-load="true" :src="meiRi[0].image_url" style="height: 180rpx;height: 160rpx;">
							</image>
						</view>
					</view>
				</view>
				<view style="width: 50%;border-radius:12upx;" v-if="pinTuan.length > 0">
					<view
						style="width:49%;border-radius:12upx;padding: 5upx 0upx 0 0;position: absolute;background-color: #FFFFFF;margin-left: 7rpx;"
						@tap="goCommondityList('拼团购')">
						<view style="margin-top:15upx;padding-left: 10upx;">
							<view style="color:#333333;font-size:32upx;font-weight: 700">拼团购</view>
							<view style="color:#999999;font-size:23rpx;">一起拼 减更多</view>
						</view>
						<view style="display: flex;margin-left: 16upx;margin-top: 3upx;">
							<view class="go">
								GO
							</view>
							<view style="height: 200upx;text-align: left;width: 235rpx;padding: 20upx;">
								<image lazy-load="true" :src="pinTuan[0].image_url"
									style="height: 160rpx;width: 220rpx;"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- <view class="header-wus">
				<view @tap="goCommondityList('推荐商品')" style="display: flex;margin-bottom: 20upx;">
					<image lazy-load="true" src="https://api.shengqianxiong.com.cn/img/20201112/9c8153e734e44df4866d7a3a341f65f5.png"
					 style="height: 40upx;width: 40upx;"></image>
					<view style="color:#333333;width: 68%; font-size: 32upx;font-weight: 700;margin-left: 10upx;">
						为你推荐
					</view>
					<view class="fr-jutext" style="width: 20%;text-align: right;color: #999999;">查看更多</view>
					<image src="../../../static/img/my/mygoright.png" style="margin-left: 10upx;width: 14upx;height: 26upx;margin-top: 8upx;"></image>
				</view>
				<view style="display: flex;justify-content: space-between;" v-if="mrscList.length>0">
					<view v-for="(g, index) in mrscList" :key="index" class="box-float" @tap='goDetail(g.id)'>
						<image lazy-load='true' fade-show='true' style="border-radius: 16upx;width: 214upx;height: 214upx;margin-right: 20upx;"
						 class="image" :src="g.coverImg" mode="scaleToFill"></image>
						<view class="index-conts">{{g.title}}</view>
						<view>
							<view v-if="relation" class="index-conts2"><text style="font-size: 26rpx;">¥</text><text style="font-size: 36upx;font-weight: 700;">{{ g.memberPrice }}</text>
								<text style="font-size: 24upx;color: grey;text-decoration:line-through;margin-left: 5px"><text style="font-size: 26rpx;">¥</text>{{ g.originalPrice }}</text>
							</view>

							<view v-if='!relation' class="index-conts2">
								<text style="font-size: 30upx;font-weight: 700;"><text style="font-size: 26rpx;">¥</text></text>{{ g.price }}
								<text style="font-size: 24upx;color: grey;text-decoration:line-through;margin-left: 20px;font-weight: 100;"><text
									 style="font-size: 26rpx;">¥</text>{{ g.originalPrice }}</text>
							</view>
						</view>
					</view>
				</view>
			</view> -->

			<!-- <view style="text-align: center;margin-top: 20upx;margin-bottom: 16upx;padding-top: 16upx;">
				<text class="news_title">一一一</text>
				<text style="font-size: 36upx;color: #FF0000;">精选好物</text>
				<text class="news_title">一一一</text>
			</view> -->

			<!-- #ifdef H5 -->
			<view style="display: flex;flex-wrap: wrap;padding-bottom: 30upx;margin-left: 13upx">
				<!-- #endif -->
				<!-- #ifndef H5 -->
				<view style="display: flex;flex-wrap: wrap;padding-bottom: 0upx;margin-left: 15rpx;margin-top: 10rpx;">
					<!-- #endif -->
					<view
						style="width: 350upx;min-height: 400upx;background-color: #FFFFFF; border-radius: 20upx;margin-left: 10upx; margin-top: 15upx;box-shadow: rgba(183, 183, 183, 0.3) 1px 1px 10px 1px;"
						@tap='goDetail(item.id)' v-for="(item,index) in homegoodsList" :key='index'
						v-if="homegoodsList.length > 0">
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
								style="width: 40%;font-size: 40upx;color: #FF2A47;font-weight: 500;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
								<text style="font-size: 26rpx;margin-right: 5rpx;">¥</text>{{item.memberPrice}}
							</view>
							<view v-if='!relation'
								style="width: 40%;font-size: 40upx;color: #FF2A47;font-weight: 500;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
								<text style="font-size: 26rpx;margin-right: 5rpx;">¥</text>{{item.price}}
							</view>
							<view
								style="width: 60%;font-size: 24upx;color: #999999;margin-top: 12upx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;text-align: right;">
								{{item.sales}}人已购买
							</view>
						</view>
						<view style="display: flex;margin-left: 12rpx; padding-bottom: 10rpx;margin-top: 10rpx;">
							<image src="/static/shop.png" style="width: 35upx;height: 35upx;"></image>
							<view v-if="item.store" style="margin-left: 10rpx;font-size: 24rpx;color: #999999;">
								{{item.store.storeName}}</view>
							<view v-else style="margin-left: 10rpx;font-size: 24rpx;color: #999999;">淇湘优购自营店铺</view>
						</view>
					</view>
					<!-- 悬浮上拉 -->
					<view class="scroll_top" @tap="topScrollTap" v-bind:class="[scrollTop ? 'active' : '','']"
						style="bottom: 56px;">
						<text class="iconfont icon-shangla"></text>
					</view>
					<!-- 加载更多提示 -->
					<view class="s-col is-col-24" v-if="homegoodsList.length > 0">
						<load-more :loadingType="loadingType" :contentText="contentText"></load-more>
					</view>
				</view>
			</view>
		</view>
</template>

<script>
	export default {
		data() {
			return {
				currentPageindex: 0,
				categoryHeight: '300rpx',
				TabCur: 0,
				day: 1,
				hour: 2,
				page: 0,
				size: 10,
				minute: 30,
				money: 0,
				scrollLeft: 0,
				relation: false,
				imageUrl: '../../../static/logo2.png',
				isEnable: '否',
				jximg1: '',
				rmimg1: '',
				newsimg1: '',
				homegoodsList: [],
				messageList: [],
				bannerList: [],
				mrscList: [],
				navlist: [],
				navlists: [],
				jingXuan: [],
				guanggao: [],
				bj1: 'https://api.shengqianxiong.com.cn/img/20201112/cbc3370ae18042ceae462663b9345223.png',
				ju2: 'http://api.shengqianxiong.com.cn/img/20201029/9edc1f657e3f477587f93b0b9939e677.png',
				ju3: 'http://api.shengqianxiong.com.cn/img/20201029/ef30a031176c44b4997e7d928fd70cf1.png',
				reMai: [],
				ShareAppimage: '',
				meiRi: [],
				ShareApptitle: '',
				pinTuan: [],
				arr: [],
				showModal: true,
				loadingType: 0,
				scrollTop: false,
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				}
			}
		},
		onLoad(e) {
			if (e.userByinvitationId) {
				this.$queue.setData('userByinvitationId', e.userByinvitationId);
				this.$queue.setData('relation', e.userByinvitationId);
			}
			this.$Request.getT('/selfActivity/state?state=7').then(res => {
				if (res.status === 0) {
					this.ShareAppimage = res.data[0].image_url;
					this.ShareApptitle = res.data[0].title;
				}
			});
			this.getBannerList();
			this.loadMenuList();
			this.loadMessage();
			this.getHomeGoods();
			// #ifdef MP-WEIXIN
			if (e.scene) {
				const scene = decodeURIComponent(e.scene);
				this.$queue.setData('userByinvitationId', scene.split(',')[0]);
				this.$queue.setData('relation', scene.split(',')[0]);
			}
			// #endif

			this.$Request.getT('/common/type/293').then(res => { //接单成功
				if (res.status == 0) {
					if (res.data && res.data.value) {
						this.arr.push(res.data.value)
					}
				}
			})
			this.$Request.getT('/common/type/294').then(res => { //开始派单
				if (res.status == 0) {
					if (res.data && res.data.value) {
						this.arr.push(res.data.value)
					}
				}
			})
			this.$Request.getT('/common/type/295').then(res => { //完成
				if (res.status == 0) {
					if (res.data && res.data.value) {
						this.arr.push(res.data.value)
					}
				}
			})
		},
		onShareAppMessage(res) {
			let relation_id = this.$queue.getData('relation_id');
			var image = '';
			var title = '';
			var pathName = '';
			if (relation_id) {
				pathName = 'pages/zysc/index/index?userByinvitationId=' + relation_id;
			} else {
				pathName = 'pages/zysc/index/index';
			}
			return {
				path: pathName, //这是为了传参   onload(data){let id=data.id;} 
				title: this.ShareApptitle,
				imageUrl: this.ShareAppimage
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
			let relation_id = this.$queue.getData('relation_id');
			if (relation_id && relation_id !== 'undefined') {
				this.relation = true;
			} else {
				this.relation = false;
			}
			let image_url = this.$queue.getData('image_url');
			if (image_url && image_url !== 'undefined') {
				this.imageUrl = image_url;
			} else {
				this.imageUrl = '/static/img/common/logo.png';
			}
			this.page = 0;
			this.getmrsc();
			this.getGuangGao();
			// this.getSelectOrderList();

			// #ifdef MP-WEIXIN
			let token = this.$queue.getData('token');
			//订阅
			if (token && !uni.getStorageSync('sendindexMsg')) {
				// this.openMsg();
			}
			// #endif

		},
		methods: {
			openMsg() {
				var that = this
				wx.getSetting({
					withSubscriptions: true, //是否获取用户订阅消息的订阅状态，默认false不返回
					success(ret) {
						if (ret.subscriptionsSetting.itemSettings) {
							uni.setStorageSync('sendindexMsg', true)
							uni.openSetting({ // 打开设置页 
								success(rea) {
									console.log(rea.authSetting)
								}
							});
						} else { // 用户没有点击“总是保持以上，不再询问”则每次都会调起订阅消息
							uni.setStorageSync('sendindexMsg', false)
							uni.showModal({
								title: '提示',
								content: '为了更好的体验,请绑定消息推送',
								confirmText: '确定',
								cancelText: '取消',
								success: function(res) {
									if (res.confirm) {
										uni.requestSubscribeMessage({
											tmplIds: that.arr,
											success(re) {
												// console.log(re,'**********')
												var datas = JSON.stringify(re);
												if (datas.indexOf("accept") != -1) {
													console.log(re)
												}
											},
											fail: (res) => {
												console.log(res)
											}
										})
										that.showModal = false
									} else if (res.cancel) {
										that.showModal = true
									}
								}
							})
						}
					}
				})
			},
			getSelectOrderList(type) {
				let userId = this.$queue.getData('userId');
				this.$Request.getT('/selfCart/list?page=' + this.page + '&size=' + this.size + '&userId=' + userId).then(
					res => {
						if (res.status === 0) {
							if (res.data.totalElements > 0) {
								uni.setTabBarBadge({
									index: 2,
									text: '' + res.data.totalElements
								})
							}
						}
					});
			},
			/**
			 * 统一跳转接口,拦截未登录路由
			 * navigator标签现在默认没有转场动画，所以用view
			 */
			navToLogin(url) {
				let token = this.$queue.getData('token');
				let mobile = this.$queue.getData('mobile');
				let userId = this.$queue.getData('userId');
				if (token) {
					// #ifdef MP-WEIXIN
					if (uni.getStorageSync('sendindexMsg')) {
						uni.requestSubscribeMessage({
							tmplIds: this.arr,
							success(re) {
								// console.log(re,'**********')
								var datas = JSON.stringify(re);
								if (datas.indexOf("accept") != -1) {
									console.log(re)
								}
							},
							fail: (res) => {
								console.log(res)
							}
						})
					}
					// #endif
					this.$Request.getT('/user/' + userId).then(res => {
						if (res.status === 0 && res.data.phone) {
							uni.navigateTo({
								url
							});
						} else {
							uni.navigateTo({
								url: '/pages/public/mobile'
							});
						}
					});
				} else {
					this.goLoginInfo();
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
			getGuangGao() {
				this.$Request.getT('/selfBanner/list').then(res => {
					if (res.status === 0) {
						this.guanggao = res.data;
					}
				});
			},
			getmrsc() {
				this.$Request.getT('/goods/recommend?page=0&size=3&sort=createAt').then(res => {
					if (res.status === 0) {
						this.mrscList = res.data.content;
					}
				});
			},
			topScrollTap: function() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
			},
			getHomeGoods(type) {
				this.loadingType = 1;
				this.$Request.getT('/goods/homeGoods?page=' + this.page + '&size=' + this.size).then(res => {
					if (res.status === 0) {
						if (this.page === 0 || res.status) {
							this.homegoodsList = [];
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
							d.sales = d.sales > 10000 ? (d.sales / 10000).toFixed(1) + '万' : d.sales;
							this.homegoodsList.push(d);
						});
						if (res.data.content.length === this.size) {
							this.loadingType = 0;
						} else {
							this.loadingType = 3;
						}
					} else {
						this.loadingType = 2;
					}
					if (type === "Refresh") {
						uni.stopPullDownRefresh(); // 停止刷新
					}
				});
			},
			goSearch() {
				// #ifdef MP-WEIXIN
				if (uni.getStorageSync('sendindexMsg')) {
					uni.requestSubscribeMessage({
						tmplIds: this.arr,
						success(re) {
							// console.log(re,'**********')
							var datas = JSON.stringify(re);
							if (datas.indexOf("accept") != -1) {
								console.log(re)
							}
						},
						fail: (res) => {
							console.log(res)
						}
					})
				}
				// #endif
				uni.navigateTo({
					url: '/package/pages/zysc/index/search'
				});
			},
			goCommondityList(name) {
				// #ifdef MP-WEIXIN
				if (uni.getStorageSync('sendindexMsg')) {
					uni.requestSubscribeMessage({
						tmplIds: this.arr,
						success(re) {
							// console.log(re,'**********')
							var datas = JSON.stringify(re);
							if (datas.indexOf("accept") != -1) {
								console.log(re)
							}
						},
						fail: (res) => {
							console.log(res)
						}
					})
				}
				// #endif
				uni.navigateTo({
					url: '/package/pages/zysc/index/commodityList?name=' + name
				});
			},
			//更新分类指示器
			categoryChange(event) {
				this.currentPageindex = event.detail.current;
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
				this.$Request.getT('/selfActivity/list').then(res => {
					if (res.status === 0) {
						if (res.data.length > 0) {
							this.navlist = [];
							this.jingXuan = [];
							this.reMai = [];
							this.meiRi = [];
							this.pinTuan = [];
							let list = [];
							res.data.forEach(d => {
								if (d.state == '1') {
									list.push(d);
								} else if (d.state == '2') {
									this.jingXuan.push(d);
								} else if (d.state == '3') {
									this.reMai.push(d);
								} else if (d.state == '4') {
									this.meiRi.push(d);
								} else if (d.state == '5') {
									this.pinTuan.push(d);
								}
							});

							if (list.length > 0) {
								var datanew = this.chunk(list, 10)
								this.navlist = datanew;
								console.log('navlist的数据', datanew)
								if (list.length > 5) {
									this.categoryHeight = "300rpx"
								} else {
									this.categoryHeight = "150rpx"
								}
							} else {
								var datanew = this.chunk(list, 10)
								this.navlist = datanew;
							}
						}
					}
				});
			},
			goDetail(id) {
				// #ifdef MP-WEIXIN
				if (uni.getStorageSync('sendindexMsg')) {
					uni.requestSubscribeMessage({
						tmplIds: this.arr,
						success(re) {
							// console.log(re,'**********')
							var datas = JSON.stringify(re);
							if (datas.indexOf("accept") != -1) {
								console.log(re)
							}
						},
						fail: (res) => {
							console.log(res)
						}
					})
				}
				// #endif
				uni.navigateTo({
					url: '/package/pages/zysc/index/commoditydetail?ordersId=' + id
				});
			},
			/**
			 * @param {Object} url
			 */
			toNavList: function(url, title) {
				let token = this.$queue.getData('token');
				if (token) {
					if (url.indexOf('/pages/') !== -1) {
						url = '/package' + url
						uni.navigateTo({
							url
						});
					} else {
						//#ifndef H5
						uni.navigateTo({
							url: '/pages/member/webview?url=' + url
						});
						//#endif
						//#ifdef H5
						if (url.indexOf('http://') !== -1) {
							window.location.href = url;
						} else {
							window.location.href = 'http://' + url;

						}
						//#endif
					}
				} else {
					this.goLoginInfo();
				}
			},
			getBannerList() {
				this.$Request.getT('/advert/list').then(res => {
					if (res.status === 0) {
						this.bannerList = [];
						res.data.forEach(d => {
							this.bannerList.push(d)
						});
					}
				});
			},
			goMyList() {
				let token = this.$queue.getData('token');
				if (token) {
					// #ifdef MP-WEIXIN
					if (uni.getStorageSync('sendindexMsg')) {
						uni.requestSubscribeMessage({
							tmplIds: this.arr,
							success(re) {
								// console.log(re,'**********')
								var datas = JSON.stringify(re);
								if (datas.indexOf("accept") != -1) {
									console.log(re)
								}
							},
							fail: (res) => {
								console.log(res)
							}
						})
					}
					// #endif
					uni.navigateTo({
						url: '/package/pages/zysc/my/myList'
					});
				} else {
					this.goLoginInfo();
				}
			},
			//统一登录跳转
			goLoginInfo() {
				uni.navigateTo({
					url: '/pages/member/register'
				});
			},
			tabSlect(item, index) {
				this.TabCur = index;
			}
		},
		onPageScroll: function(e) {
			this.scrollTop = e.scrollTop > 200;
		},
		onReachBottom: function() {
			this.page = this.page + 1;
			this.getHomeGoods('');
		},
		onPullDownRefresh: function() {
			this.page = 0;
			this.getHomeGoods("Refresh");
		}
	}
</script>

<style lang="scss">
	@import '../../../static/css/index.css';

	page {
		background: #F2F2F7;
	}

	.category {
		width: 97%;
		margin: 20upx;

		.box {
			width: 98%;
			border-radius: 15upx;
			background-color: #ffffff;

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
					width: 100%;
					height: auto;
					display: flex;
					justify-content: flex-start;
					padding: 10upx 0;
					flex-flow: wrap;

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

	.index-views {
		display: flex;
		position: relative;
		width: 95%;
		margin: 0 auto;
	}

	.index_view_left {
		width: 50%;
		background: #ffffff;
		margin-right: 7rpx;
		border-radius: 10rpx;
	}

	.index_view_right {
		width: 50%;
		margin-left: 7rpx;
		border-radius: 10rpx;
	}

	.right_box {
		background: #ffffff;
		border-radius: 10rpx;
	}

	.right_box:nth-child(1) {
		margin-bottom: 10rpx;
	}

	.go {
		background: #FF3333;
		color: #ffffff;
		height: 45rpx;
		line-height: 45rpx;
		padding: 0rpx 15rpx;
		border-radius: 28rpx;
		margin-top: 20rpx;
	}

	.index-conts {
		width: 200upx;
		margin-top: 10upx;
		overflow: hidden;
		-o-text-overflow: ellipsis;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: block;
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
		background: linear-gradient(to left, #FB2C1A 0, #FF2A46 100%);
	}

	.index-conts2 {
		font-size: 30upx;
		position: absolute;
		float: left;
		color: #FD3B2C;
		width: 80%;
		text-align: left;
	}

	.header-imgsuo {
		width: 37rpx;
		height: 35rpx;
		margin-right: 10upx;
		align-items: center;
		display: block;
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

	.icon_header {
		width: 590rpx;
		display: flex;
		height: 72upx;
		align-items: center;
		line-height: 40upx;
		padding: 10upx 20upx;
		background-color: #F0F1F5;
		border-radius: 10upx;
		margin-top: 14upx;
		margin-left: 18rpx;
	}

	.swiper-container {
		height: 300upx;
		border-radius: 15rpx;
		transform: translateY(0);
		overflow: hidden;
		overflow: hidden !important;
		/* 兼容IOS，否则在swiper组件内的布局都不受border-radius和overflow的约束 */
		transform: translateY(0) !important;
	}

	.content-div {
		width: 100%;
		display: flex;
		justify-content: space-around;
		z-index: 999;
		height: 104upx;
		/* #ifdef APP-PLUS */
		height: 110upx;
		// margin-top: -20rpx;
		// padding-top: 70rpx;
		/* #endif */
	}

	.icon-headerI {
		font-size: 24rpx;
		color: #999999;
	}

	.news_title {
		font-weight: bold;
		color: #FF0000;
		margin-right: 32upx;
		margin-left: 32upx;
		width: 12upx;
	}

	.header-wus {
		background-color: #FFFFFF;
		margin: 20upx 20upx 0upx 20upx;
		border-radius: 10upx;
		padding: 28upx 28upx 50upx;
	}

	.header-wus2 {
		color: #333333;
		font-size: 32upx;
		margin-bottom: 10upx;
		font-weight: bold;
	}

	.box-float {
		width: 235upx;
		position: relative;
		border-radius: 10upx;
		padding: 6upx 0;
	}
</style>
