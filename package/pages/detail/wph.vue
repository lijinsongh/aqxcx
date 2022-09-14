<template>
	<view class="s-page-wrapper">
		<view class="index-goods" v-if="goodsInfo.goodsGalleryUrls">
			<view class="swiper">
				<swiper class="swiper-container" :autoplay="true" :interval="4000" :circular="true"
					:indicator-dots="true" indicator-active-color="#FF2638" indicator-color="#cccccc">
					<block v-for="(item, index) in goodsInfo.goodsGalleryUrls" :key="index">
						<swiper-item class="swiper-wrapper">
							<image :src="item" mode="widthFix" class="is-response" lazy-load="true" :data-index="index"
								@tap="previewPhoto"></image>
						</swiper-item>
					</block>
				</swiper>
			</view>
			<view style="background: #333333;padding: 8px;display: flex;font-size: 14px;font-weight: bold"
				v-if="!relation_id && isEnable != '否'" @tap="goPublisher">
				<image src="../../../static/detail/2x.png"
					style="width: 40upx;height: 35upx;display: block;margin-top: 10upx;margin-right: 17upx;" mode="">
				</image>
				<view style="color: #FCDFB8;width: 74%;line-height: 60upx">成为会员最高可返现￥{{ shengji }}</view>
				<view style="width: 24%;text-align: center;font-size: 28upx;margin-top:4upx" class="b-btn">
					立即加入
					<text class="cuIcon cuIcon-right"
						style="background-color: #FFE9C6;width: 40upx;height: 40upx;border-radius: 50%;color:#000000;margin-left: 6upx;"></text>
				</view>
			</view>
			<view style="background: #333333;padding: 8px;display: flex;font-size: 14px;font-weight: bold"
				v-if="goods && relation_id && grade !== maxMoney && isEnable != '否'" @tap="shengJiMethod">
				<image src="../../../static/detail/2x.png"
					style="width: 40upx;height: 35upx;display: block;margin-top: 10upx;margin-right: 17upx;"></image>
				<view style="color: #FCDFB8;width: 74%;line-height: 60upx;font-size: 28upx">
					预估返￥{{ money }},升级最高返￥{{ shengji }}</view>
				<view style="width: 24%;text-align: center;font-size: 28upx;margin-top:4upx" class="b-btn">
					立即升级
					<text class="cuIcon cuIcon-right"
						style="background-color: #FFE9C6;width: 40upx;height: 40upx;border-radius: 50%;color:#000000;margin-left: 6upx;"></text>
				</view>
			</view>
			<view style="background: #333333;padding: 16upx;display: flex;font-size: 28upx;font-weight: bold"
				v-if="goods && grade === maxMoney && isEnable != '否'">
				<image src="../../../static/detail/2x.png"
					style="width: 40upx;height: 35upx;display: block;margin-top: 10upx;margin-right: 17upx;" mode="">
				</image>
				<view style="color: #FCDFB8;width: 74%">已成为高级会员,预估返现￥ {{ money }}</view>
			</view>

			<view class="goods_info" style="padding-top: 6px;padding-bottom: 16upx">
				<view class="coupon-price s-row">
					<view class="price" style="width: 70%">
						<text style="font-size: 24upx;margin-left: 4upx;">抢购价</text>
						<text style="font-size: 34upx">￥</text>
						<text style="font-weight: 700;">{{ goodsInfo.nowPrice }}</text>
						<text
							style="font-size: 24upx;color: grey;text-decoration:line-through;margin-left: 8px">￥{{ goodsInfo.oldPrice }}</text>
					</view>
				</view>
				<view style="padding: 16upx 16upx 32upx 16upx;display: flex;">
					<view style="width: 90%;">
						<text
							style="color: #FFFFFF;background: #FF2638;font-size: 24upx;padding-left: 12upx;padding-right: 12upx;border-radius: 16upx;margin-right: 8upx;padding-top: 4upx;padding-bottom: 4upx;">
							<text>唯品会</text>
						</text>
						<text style="font-weight: bold">
							<text @longpress="copyTitle">{{ goodsInfo.goodsName }}</text>
						</text>
					</view>
					<view
						style="width: 120upx;height:48upx; text-align: center;line-height: 48upx; background-color: #ebebeb;border-radius:24upx 0upx 0upx 24upx;">
						<text @click="showModal()">
							<text class="cuIcon cuIcon-share"></text>
							<text>分享</text>
						</text>
					</view>
				</view>
				<view style="width:100%;height: 98upx;background-color:#F2F2F2;">
					<view v-if="goodsInfo.mallName"
						style="float: right;height: 68upx;width:100%;background-color:#FFFFFF;float: right; line-height: 68upx;margin-top: 16upx;margin-bottom:16upx;display:  flex;">
						<view style="margin-right:60upx ;margin-left: 20upx;">店铺</view>
						<image style="height: 40upx;width:40upx;margin-top: 6px;margin-right: 4upx;"
							src="../../../static/img/dianpu.png"></image>
						<view style="font-weight: bold;">{{ goodsInfo.mallName }}</view>
					</view>
				</view>
				<view style="width: 100%;padding:30upx">
					<view class="goods-info-title" style="color:#333333;width: 20%;text-align: center;float:left;">必买理由
					</view>
					<!-- <view class="volume" style="font-size: 14px;width: 22%;float: right;color:#333333;"><text
							style="color:#FF2638;font-weight: bold;">{{ goodsInfo.salesTip}}人付款</text></view>-->
					<view class="coupon-price s-row"></view>

					<view class="goods_reco"
						style="display: flex;margin-top: 20upx;background-color: #F2F2F2;width: 96%;margin:20upx auto 0;position: relative;border-radius: 8upx;">
						<image src="../../../static/detail/559.png"
							style="width:14upx;height:12upx;display: block;position: absolute;top:-12upx;left:34upx">
						</image>
						<view class="goods_desc" style="padding-bottom: 16upx;padding-top:20upx;" @click="TklmaskShow">
							<text>{{ goodsInfo.goodsName }}</text>
						</view>
					</view>
				</view>
				<view class="coupon-price s-row"></view>
			</view>
			<view class="goods_reco"
				style="text-align: center;font-size: 36upx;color: #333333;background: white;margin-top:6upx;padding: 10upx;"
				v-if="goodsInfo.goodsGalleryUrls">
				<view class="imglist">
					<view class="goods-info-title" style="margin-bottom: 10upx;">宝贝详情</view>
					<block v-for="(item, index) in goodsInfo.goodsGalleryUrls">
						<image lazy-load :src="item" mode="widthFix" class="is-response" @longpress="toSave(item)">
						</image>
					</block>
				</view>
			</view>
			<!-- 购买按钮 -->
			<view class="goods_shop_cart">
				<view class="cent" style="display: flex">
					<view style="text-align: center;width: 25%;margin-top: 4px;margin-bottom: 4px;display: flex">
						<view style="width: 50%;text-align: center">
							<view class="iconfont icon-shouye" @tap="goBackUp()"></view>
							<view style="font-size: 12px">首页</view>
						</view>
						<view style="width: 50%;text-align: center">
							<view class="iconfont icon-shoucang" :style="collect.isCollect" @tap="clickCollect()">
							</view>
							<view style="font-size: 12px" :style="collect.isCollect">{{ collect.name }}</view>
						</view>
					</view>
					<view style="width: 75%;display: flex;color: #FFFFFF">
						<view
							style="border-radius: 32upx;width: 50%;background: #FF2638;text-align: center;padding-top:8px;margin: 4px"
							@tap="shopCartShare('fanxian')">分享赚￥{{goodsInfo.fenXiangZhuan}}</view>
						<view class="getTbk"
							style="border-radius: 32upx;width: 50%;background:#FF2638; text-align: center;padding-top: 8px;margin: 4px"
							@tap="shopCartShare('quan')">自购省￥{{goodsInfo.ziGouSheng}}</view>
					</view>
				</view>
			</view>
			<view class="navBarButtonBox">
				<!-- 顶部右侧菜单 -->
				<view v-if="navBarButton" class="goods_shop_cart_bg navBarButton" @tap="showShopCartBg('nav')"
					@touchmove.stop.prevent="moveHandleStop"></view>
				<!-- #ifdef H5 -->
				<view style="margin-top: 16upx;" class="h_newlit" v-bind:class="[navBarButton ? 'active' : '', '']">

					<!-- #endif -->
					<!-- #ifndef H5 -->
					<view style="margin-top: 66upx;" class="h_newlit" v-bind:class="[navBarButton ? 'active' : '', '']">

						<!-- #endif -->
						<view class="em">
							<view style="font-size: 14px" @tap="navBarButtontO('home')">
								<text class="iconfont icon-shouye"></text>
								返回首页
							</view>
							<view style="font-size: 14px" @tap="navBarButtontO('search')">
								<text class="iconfont icon-sousuo"></text>
								超级搜索
							</view>
							<view style="font-size: 14px" @tap="navBarButtontO('footer')">
								<text class="iconfont icon-zuji"></text>
								我的足迹
							</view>
							<view style="font-size: 14px" @tap="navBarButtontO('like')">
								<text class="iconfont icon-shoucang"></text>
								个人中心
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 淘口令分享 -->
			<simpleModal ref="simpleModalTkl" @maskClose="TklmaskClose">
				<view class="buy-box-title">复制分享文案</view>
				<view class="buy-box-center">
					<view class="code-cent">
						<div class="cente-text">
							<div>
								<view class="textarea">
									【唯品会】{{ goodsInfo.goodsName }}<br />
									【抢购价】{{ goodsInfo.nowPrice }}元<br />
									【下单链接】{{ goodsInfo.placeAnOrderLink.substring(0,29) }}<br />
								</view>
							</div>
						</div>
					</view>
					<view class="buy-btn-copy" v-bind:class="[copyTklStatus ? 'active' : '', '']" @tap="copyTklWenAns">
						{{ copyTklStatus ? '已复制到剪切板' : '一键复制' }}
					</view>
				</view>
			</simpleModal>
			<!-- 淘口令分享 -->
			<view class="" v-if="!loadGoods">
				<view class="s-page">
					<view class="is-100vh is-flex is-column is-justify-center is-align-center ">
						<image src="../../../static/img/load.gif" style="width:75px;height: 75px;" class="is-response"
							mode="widthFix"></image>
					</view>
				</view>
			</view>
			<tki-qrcode ref="qrcode" :val="erweima" :size="200" background="#fff" foreground="#000" pdground="#000"
				:onval="true" :loadMake="true" @result="qrR" :show="false"></tki-qrcode>
			<view class="cu-modal" :class="modalName == 'Image' ? 'show' : ''" @tap="hideModal">
				<view class="cu-dialog" v-if="goodsInfo && haibaoShow && erweimapath" @tap="hideModal">
					<view class="bg-img">
						<wm-poster @success="posterSuccess" :imgSrc="goodsInfo.goodsGalleryUrls[0]" :QrSrc="erweimapath"
							:Title="goodsInfo.goodsName" :PriceTxt="goodsInfo.nowPrice"
							:OriginalTxt="goodsInfo.oldPrice" :LineType="false"></wm-poster>
					</view>
				</view>
			</view>
		</view>
</template>

<script>
	import simpleModal from '@/components/simple-pro/customModal.vue';
	import wmPoster from '@/components/wm-poster/wm-poster.vue';
	import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue';
	export default {
		data() {
			return {
				erweima: '',
				erweimapath: '',
				modalName: '',
				logo: '../../static/img/mao.png',
				taobao: '../../static/img/taobao.png',
				buyDes: '口令购买',
				collect: {
					name: '收藏',
					isCollect: ''
				},
				show_share: false,
				shengji: '',
				getQun: '立即领券',
				follow: false,
				loadGoods: true,
				goods: '',
				taoBaoBuy: true,
				shopCartBg: false,
				scrollTop: false,
				couponlist: [],
				navBarButton: false,
				copyTklStatus: false,
				showPage: true,
				save: false,
				messageList: [],
				tkl: '',
				relation_id: null,
				money: 0,
				grade: '',
				skuId: '',
				isInvitation: 0,
				showFollow: false,
				isWeiXin: false,
				footprintKey: 'orange-sqx-footprint-wph',
				collectKey: 'orange-sqx-collect-wph',
				poster: {},
				coupon_click_url: '',
				qrShow: false,
				haibaoImg: null,
				maxMoney: '0.7',
				haibaoShow: false,
				isEnable: '否',
				canvasId: 'default_PosterCanvasId',
				wxLink: '',
				goodsInfo: {
					goodsId: "", //商品Id
					supplierCode: "",
					goodsName: "", //商品名
					goodsDesc: "", //商品描述
					goodsImg: "", //商品主图
					goodsGalleryUrls: [], //商品介绍图
					mallName: "", //店铺名称
					couponDiscount: "", //可用优惠
					couponStartTime: "", //优惠券生效时间
					couponEndTime: "", //优惠券失效时间
					oldPrice: "", //原价
					nowPrice: "", //现价
					salesTip: "", //销量
					placeAnOrderLink: "", //需要分享出去的链接
					fenXiangZhuan: "", //分享赚
					ziGouSheng: "", //自购省
				}
			};
		},
		components: {
			simpleModal,
			tkiQrcode,
			wmPoster
		},
		onShow: function() {
			this.copyTklStatus = false;
			let relation_id = this.$queue.getData('relation_id');
			if (relation_id) {
				this.relation_id = relation_id;
			}
			this.maxMoney = this.$queue.maxMoney();
		},
		onLoad: function(e) {
			// this.$queue.showLoading('加载中...');
			let a = this.$queue.getData('isEnable');
			if (a) {
				this.isEnable = a;
			}
			let userId = this.$queue.getData('userId');
			if (userId) {
				this.$Request.getT('/user/' + userId).then(res => {
					if (res.status === 0) {
						if (res.data.isInvitation) {
							this.isInvitation = res.data.isInvitation;
							this.$queue.setData('isInvitation', res.data.isInvitation);
						}
						this.$queue.setData('relation', res.data.invitation);
						this.$queue.setData('grade', res.data.grade);
						this.$queue.setData('pddpid', res.data.pdd);
						this.$queue.setData('jdpid', res.data.jd);
						if (res.data.image_url) {
							this.$queue.setData('image_url', res.data.image_url);
						}
						this.$queue.setData('mobile', res.data.phone);
						this.$queue.setData('nickName', res.data.nickName);
						this.$queue.setData('relation_id', res.data.relationId);
						this.$queue.setData('gender', parseInt(res.data.gender));
					}
				});
			}
			if (e.itemid) {
				this.goodsId = e.itemid;
				this.loadGoodsInfo();
				// this.getOrderList();
			} else {
				uni.navigateBack({});
			}
		},
		onPageScroll: function(e) {
			this.scrollTop = e.scrollTop > 200;
		},
		onNavigationBarButtonTap: function() {
			this.navBarButton = !this.navBarButton;
		},
		methods: {
			getOrderList() {
				//获取用户提现
				this.$Request.getT('/statistics/getOrderList/0/10').then(res => {
					if (res.status == 0 && res.data) {
						let index = 1;
						res.data.content.forEach(d => {
							d.userName = d.userName.substring(0, 1) + '**';
							this.messageList.push(d);
							this.messageList.push(d);
						});
					}
					uni.hideLoading();
				});
			},
			posterSuccess(haibaoImg) {
				this.haibaoImg = haibaoImg;
				this.modalName = 'Image';
			},
			showModal() {
				if (!this.haibaoImg) {
					this.haibaoShow = true;
					this.$queue.showLoading('海报生成中...');
				} else {
					this.modalName = 'Image';
				}
			},
			hideModal() {
				this.modalName = null;
			},
			bijiage() {
				uni.navigateTo({
					url: '../bijia/index?keywords=' + this.goods.goodsName
				});
			},
			TklmaskClose: function(e) {
				this.$refs.simpleModalTkl.hide();
				this.copyTklStatus = false;
			},
			TklmaskShow: function(e) {
				this.$refs.simpleModalTkl.show({
					showConfirmButton: false
				});
			},
			shengJiMethod() {
				uni.navigateTo({
					url: '/pages/member/yao'
				});
			},
			qrR(path) {
				this.erweimapath = path;
			},
			/* 预览照片 */
			previewPhoto(e) {
				let index = e.currentTarget.dataset.index;
				let list = this.goodsInfo.goodsGalleryUrls.map((item, index) => {
					return item;
				});
				uni.previewImage({
					current: list[index],
					urls: list,
					longPressActions: {
						itemList: ['保存图片'],
						success: function(res) {
							uni.getImageInfo({
								src: list[res.index],
								success: function(image) {
									console.log('图片信息：', JSON.stringify(image));
									uni.saveImageToPhotosAlbum({
										filePath: image.path,
										success: function() {
											uni.showToast({
												title: '图片保存成功',
												icon: 'none',
												duration: 3000
											});
										}
									});
								}
							});
						}
					}
				});
			},
			//初始化加载详情数据
			loadGoodsInfo: function() {
				this.$queue.showLoading('加载中...')
				let that = this;
				this.$Request.getT('/wph/details?itemid=' + this.goodsId).then(res => {
					if (res.status == 0) {
						let item = res.data.data[0];
						that.keywords = item.categoryName;
						that.goodsInfo.goodsId = item.goodsId;
						that.goodsInfo.goodsGalleryUrls = item.goodsCarouselPictures;
						that.goodsInfo.goodsImg = item.goodsThumbUrl;
						that.goodsInfo.mallName = item.storeInfo.storeName;
						that.goodsInfo.couponStartTime = '';
						that.goodsInfo.couponEndTime = '';
						that.goodsInfo.couponDiscount = '';
						that.goodsInfo.nowPrice = item.vipPrice; //现价
						that.goodsInfo.oldPrice = item.marketPrice; //原价
						that.goodsInfo.goodsName = item.goodsName;
						that.goodsInfo.goodsDesc = item.goodsDesc;
						// that.goodsInfo.salesTip = item.salesTip;
						that.goods = item;
						let grade = that.$queue.getData('grade'); //佣金
						that.shengji = ((item.vipPrice * (item.commissionRate * 0.01)) * parseFloat(this
							.maxMoney)).toFixed(2);
						if (grade) {
							// 当前用户等级应得到的佣金（未登录不会显示）
							that.money = ((item.vipPrice * (item.commissionRate * 0.01)) * parseFloat(grade))
								.toFixed(2);
							// 分享赚-用户自己商品佣金=用户自己佣金比例*商品佣金比例
							that.goodsInfo.fenXiangZhuan = ((item.vipPrice * (item.commissionRate * 0.01)) *
								parseFloat(grade)).toFixed(2);
							// 自购省
							that.goodsInfo.ziGouSheng = that.goodsInfo.fenXiangZhuan;
						} else {
							// 分享赚-用户自己商品佣金=用户自己佣金比例*商品佣金比例
							that.goodsInfo.fenXiangZhuan = ((item.vipPrice * (item.commissionRate * 0.01)) *
								parseFloat(this.maxMoney)).toFixed(2);
							// 自购省
							that.goodsInfo.ziGouSheng = that.goodsInfo.fenXiangZhuan;
						}
						// 获取唯品会转链信息
						this.getWphUrl();
						// 收藏
						let isExistSC = that.$queue.isExistWPH(that.collectKey, that.goodsId);
						if (isExistSC === true) {
							that.collect.name = '已收藏';
							that.collect.isCollect = 'color: #FF2638';
						} else {
							that.collect.name = '收藏';
							that.collect.isCollect = '';
						}
						// 足迹
						let isExistsZJ = that.$queue.isExistWPH(that.footprintKey, that.goodsId);
						if (isExistsZJ === false) {
							that.$queue.insert({
								key: that.footprintKey,
								value: that.goods
							});
						}
					} else {
						uni.navigateBack({})
					}
					uni.hideLoading();
					this.showPage = true;
				});
			},
			getWphUrl() {
				let that = this;
				let url = "/sn/query";
				let relation_id = this.$queue.getData('relation_id') ? this.$queue.getData('relation_id') : this.$queue
					.getInvitation();
				let params = {
					itemid: that.goodsId,
					relationId: relation_id
				};
				that.$Request.getT('/wph/getLink', params).then(res => {
					if (res.status == 0) {
						let item = res.data.data.list[0];
						that.wxLink = item.vipWxUrl;
						that.goodsInfo.placeAnOrderLink = item.url;
						this.erweima = that.goodsInfo.placeAnOrderLink;
					}
				})
			},
			shopCartShare: function(type) {
				let token = this.$queue.getData('token');
				if (token) {
					let relation_id = this.$queue.getData('relation_id');
					if (type == 'fanxian') {
						if (!relation_id) {
							this.$queue.setData('href', '/pages/detail/goodsinfo?itemid=' + this.itemid);
							let token = this.$queue.getData('token');
							let userId = this.$queue.getData('userId');
							if (token) {
								uni.navigateTo({
									url: '/pages/member/publisher?uid=' + userId + '&token=' + token
								});
							} else {
								this.loginS();
							}
							return;
						}
					}
					if (type == 'fanxian') {
						if (relation_id) {
							let grade = this.$queue.getData('grade');
							if (grade == this.maxMoney) {
								this.TklmaskShow();
							} else {
								this.shengJiMethod();
							}
						} else {
							let relation_id = this.$queue.getData('relation_id');
							let userId = this.$queue.getData('userId');
							if (userId) {
								this.getQuan();
							} else {
								this.loginS();
							}
						}
					} else {
						let relation_id = this.$queue.getData('relation_id');
						let userId = this.$queue.getData('userId');
						if (userId) {
							this.getQuan();
						} else {
							this.loginS();
						}
					}
				} else {
					this.loginS();
				}
			},
			copyTklWenAns: function() {
				uni.setClipboardData({
					data: '【唯品会】' +
						this.goodsInfo.goodsName +
						'\n【抢购价】' +
						this.goodsInfo.nowPrice +
						'元' +
						'\n下单链接：' +
						this.goodsInfo.placeAnOrderLink.substring(0, 29) +
						'\n',
					success: r => {
						this.copyTklStatus = true;
					}
				});
			},
			//获取优惠券
			getQuan: function() {
				let isFaKa = this.$queue.getData('isFaKa');
				let relation_id = this.$queue.getData('relation_id');
				if (relation_id && relation_id !== 'undefined') {
					// #ifdef MP-WEIXIN
					uni.navigateToMiniProgram({
						appId: 'wxe9714e742209d35f',
						path: this.wxLink,
						fail(res) {
							console.error(res)
						}
					})
					// #endif
					// #ifdef H5
					window.location.href = this.goodsInfo.placeAnOrderLink;
					//#endif

					// #ifdef APP-PLUS
					uni.navigateTo({
						url: '/pages/member/webview?url=' + this.goodsInfo.placeAnOrderLink
					});
					// #endif
				} else {
					uni.showModal({
						showCancel: true,
						title: '温馨提示',
						cancelText: '关闭',
						confirmText: '开通会员',
						content: '此功能为会员专享功能\n申请成为会员后可使用',
						success: res => {
							if (res.confirm) {
								this.copyTklWenAn1();
							}
						}
					});
				}
			},
			//会员申请弹框
			copyTklWenAn1: function() {
				let relation_id = this.$queue.getData('relation_id');
				let token = this.$queue.getData('token');
				let userId = this.$queue.getData('userId');
				let gradle = this.$queue.getData('gradle');
				if (!token) {
					this.loginS();
				} else {
					if (!relation_id) {
						uni.navigateTo({
							url: '/pages/member/publisher?uid=' + userId + '&token=' + token
						});
					}
				}
			},
			goPublisher() {
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
			 * 保存图片
			 * @param url
			 */
			toSave(url) {
				//#ifndef H5
				uni.getImageInfo({
					src: url,
					success: function(image) {
						console.log('图片信息：', JSON.stringify(image));
						uni.saveImageToPhotosAlbum({
							filePath: image.path,
							success: function() {
								console.log('save success');
								uni.showToast({
									title: '图片保存成功',
									icon: 'none',
									duration: 3000
								});
							}
						});
					}
				});

				//#endif
			},
			/**
			 * 返回
			 */
			goBackUp() {
				uni.switchTab({
					url: '/pages/index/index'
				});
			},
			clickCollect() {
				//收藏
				let isExist = this.$queue.isExistWPH(this.collectKey, this.goodsId);
				if (isExist) {
					let items = [];
					items.push(this.goodsId);
					this.$queue.removeItemWPH(this.collectKey, items);
					this.collect.name = '收藏';
					this.collect.isCollect = '';
				} else {
					this.$queue.insert({
						key: this.collectKey,
						value: this.goods
					});
					this.collect.name = '已收藏';
					this.collect.isCollect = 'color: #FF2638';
				}
			},

			formatDate: function(now) {
				const year = now.getFullYear();
				const month = now.getMonth() + 1;
				const date = now.getDate();
				return year + '-' + month + '-' + date;
			},

			haibao: function() {
				uni.navigateTo({
					url: '/pages/detail/share'
				});
			},
			topScrollTap: function() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
			},
			navBarButtontO: function(type) {
				if (type === 'search') {
					uni.navigateTo({
						url: '/pages/homeSearch/index'
					});
				} else if (type === 'like') {
					uni.switchTab({
						url: '/pages/member/user'
					});
				} else if (type === 'footer') {
					uni.navigateTo({
						url: '/packagetwo/pages/footer/index'
					});
				} else if (type === 'home') {
					uni.switchTab({
						url: '/pages/index/index'
					});
				}
			},
			loginS() {
				uni.navigateTo({
					url: 'pages/member/register'
				});
			},
			copyTitle: function() {
				uni.setClipboardData({
					data: this.goodsInfo.goodsName,
					success: r => {
						this.$queue.showToast('复制成功');
					}
				});
			}
		}
	};
</script>

<style scoped>
	@import '../../../static/css/index.css';

	page {
		background: #f8f8f8;
	}

	.swiper-container {
		min-height: 100vw;
	}

	.hideCanvasView {
		position: relative;
	}

	.hideCanvas {
		position: fixed;
		top: -99999 upx;
		left: -99999 upx;
		z-index: -99999;
	}

	.flex_row_c_c {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.modalView {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		opacity: 0;
		outline: 0;
		transform: scale(3);
		perspective: 2500 upx;
		background: rgba(0, 0, 0, 0.6);
		transition: all 0.3s ease-in-out;
		pointer-events: none;
		backface-visibility: hidden;
		z-index: 999;
	}

	.modalView.show {
		opacity: 1;
		transform: scale(1);
		pointer-events: auto;
	}

	.flex_column {
		display: flex;
		flex-direction: column;
	}

	.backgroundColor-white {
		background-color: white;
	}

	.border_radius_10px {
		border-radius: 10px;
	}

	.padding1vh {
		padding: 1vh;
	}

	.posterImage {
		width: 60vw;
	}

	.flex_row {
		display: flex;
		flex-direction: row;
	}

	.marginTop2vh {
		margin-top: 2vh;
	}

	.shareInfos {
		color: #FF2638;
	}

	.shareInfo::after {
		border: none;
	}

	button {
		font-size: 14px;
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
		width: 100px;
		height: 150px;
		position: absolute;
		right: 5%;
		top: 1%;
	}

	.b-btn {
		right: 10px;
		top: 16px;
		width: 80px;
		text-align: center;
		font-size: 14px;
		padding: 4px 1px 4px 6px;
		color: #FCDFB8;
		z-index: 1;
	}

	#follow {
		width: 100%;
		height: 50px;
		line-height: 50px;
		text-align: center;
		text-decoration: none;
		font-size: 18px;
		color: white;
		float: left;
		margin-top: 160px;
	}

	#follow1 {
		width: 100%;
		height: 50px;
		line-height: 50px;
		text-align: center;
		text-decoration: none;
		font-size: 18px;
		color: white;
		float: left;
		margin-top: 170px;
	}

	button::after {
		border: none;
	}

	.swiper-wrapper {
		width: 100%;
	}
</style>
