<template>
	<view class="s-page-wrapper">
		<view class="index-goods" v-if="goods&&goods.imageInfo">
			<view class="swiper">
				<swiper class="swiper-container" :autoplay="true" :interval="4000" :circular="true" :indicator-dots="true"
				 indicator-active-color="#FF0000" indicator-color="#cccccc">
					<block v-for="(item,index) in goods.imageInfo.imageList" :key="index">
						<swiper-item class="swiper-wrapper">
							<image :src="item.url" mode="widthFix" class="is-response" lazy-load="true" :data-index="index" @tap="previewPhoto"></image>
						</swiper-item>
					</block>
				</swiper>
			</view>
			<view style="background: #333333;padding: 8px;display: flex;font-size: 14px;font-weight: bold" v-if="goods && !relation_id && isEnable != '否'"
			 @tap="goPublisher">
				<image src="../../static/detail/2x.png" style="width: 40upx;height: 35upx;display: block;margin-top: 10upx;margin-right: 17upx;"
				 mode=""></image>
				<view style="color: #FCDFB8;width: 98%;line-height: 60upx">成为会员最高可返现金￥{{ shengji }}元</view>
				<view style="width: 35%;text-align: center;font-size: 28upx;margin-top:4upx;position: relative;top:0upx" class="b-btn">
					立即加入
					<view class="cuIcon cuIcon-right" style=" position: absolute;top:14upx;left:160upx; background-color: #FFE9C6;width: 30upx;height: 26upx;padding-top:2upx; display: block; border-radius: 50%;color:#000000;">
						<image src="https://taobaoshop.xianmxkj.com/static/my/you.png" style="width: 24upx;height: 24upx;margin-left: 4upx; display: block ;line-height: 40upx;"></image>
					</view>
				</view>
			</view>
			<view style="background: #333333;padding: 8px;display: flex;font-size: 14px;font-weight: bold" v-if="goods && relation_id && grade !== maxMoney && isEnable != '否'"
			 @tap="shengJiMethod">
				<image src="../../static/detail/2x.png" style="width: 40upx;height: 35upx;display: block;margin-top: 10upx;margin-right: 17upx;"
				 mode=""></image>
				<view style="color: #FCDFB8;width: 98%;line-height: 60upx;font-size: 28upx">预估返￥{{ money }}元,升级最高返￥{{ shengji }}元</view>
				<view style="width: 35%;text-align: center;font-size: 28upx;margin-top:4upx;position: relative;top:0upx" class="b-btn">
					立即升级
					<view class="cuIcon cuIcon-right" style=" position: absolute;top:14upx;left:160upx; background-color: #FFE9C6;width: 30upx;height: 26upx;padding-top:2upx; display: block; border-radius: 50%;color:#000000;">
						<image src="https://taobaoshop.xianmxkj.com/static/my/you.png" style="width: 24upx;height: 24upx;margin-left: 4upx; display: block ;line-height: 40upx;"></image>
					</view>
				</view>
			</view>
			<view style="background: #333333;padding: 16upx;display: flex;font-size: 28upx;font-weight: bold" v-if="goods && grade === maxMoney && isEnable != '否'">
				<image src="../../static/detail/2x.png" style="width: 40upx;height: 35upx;display: block;margin-top: 10upx;margin-right: 17upx;"
				 mode=""></image>
				<view style="color: #FCDFB8;width: 75%">已成为高级会员,预估返现￥ {{ money }}元</view>
			</view>
			<view class="goods_info" style="padding-top: 6px;padding-bottom: 16upx"  v-if="goods.skuName">
				<view class="coupon-price s-row">
					<view class="price" style="width: 70%">
						<text style="font-size: 24upx;margin-left: 4upx;">券后价</text>
						<text style="font-size: 34upx">￥</text>
						<text style="font-weight: 700;"
							v-if="goods.couponInfo && goods.couponInfo.couponList.length > 0">{{ goods.itemendprice }}</text>
						<text style="font-weight: 700;" v-else>{{ goods.itemendprice }}</text>
						<text style="font-size: 24upx;color: grey;text-decoration:line-through;margin-left: 8px">￥{{ goods.itemprice }}</text>
					</view>
				</view>
				<view style="padding: 16upx 16upx 32upx 16upx;display: flex;" v-if="goods.skuName">
					<view style="width: 100%;">
						<text style="color: #FFFFFF;background: #FF0000;font-size: 24upx;padding-left: 12upx;padding-right: 12upx;border-radius: 16upx;margin-right: 8upx;padding-top: 4upx;padding-bottom: 4upx;">
							<text>京东</text>
						</text>
						<text style="font-weight: bold;font-size: 32upx;">
							<text @longpress="copyTitle">{{ goods.skuName }}</text>
						</text>
					</view>
					<button open-type="share" style="width: 180upx;height:48upx; text-align: center;line-height: 48upx; background-color: #ebebeb;border-radius:24upx 0upx 0upx 24upx;">
						<text>
							<text class="cuIcon cuIcon-share"></text>
							<text>分享</text>
						</text>
					</button>
				</view>
				<view style="width:100%;height: 98upx;background-color:#F2F2F2;">
					<view v-if="goods.shopInfo && goods.shopInfo.shopName" style="float: right;height: 68upx;width:100%;background-color:#FFFFFF;float: right; line-height: 68upx;margin-top: 16upx;margin-bottom:16upx;display:  flex;">
						<view style="margin-right:60upx ;margin-left: 20upx;">店铺</view>
						<image style="height: 40upx;width:40upx;margin-top: 6px;margin-right: 4upx;" src="../../static/img/dianpu.png"></image>
						<view style="font-weight: bold;">{{ goods.shopInfo.shopName }}</view>
					</view>
				</view>
				<view style="width:100%;height: 84upx;background-color:#F2F2F2;">
					<view @click="bijiage()" style="padding: 0upx 32upx 16upx 32upx;float: right;height: 68upx;width:100%;background-color:#FFFFFF;float: right; line-height: 68upx;display:  flex;">
						<image style="height: 40upx;width:40upx;margin-top: 6px;margin-right: 14upx;" src="https://taobaoshop.xianmxkj.com/static/my/bijia.png"></image>
						<view style="color:#333333;width:22%; font-size: 30upx;">
							我要比价
						</view>
						<view class="fr-jutext" style="width: 86%;text-align: right;color: #999999;">查看更多 ></view>
					</view>
				</view>
				<view style="width: 100%;padding:30upx 30upx 50upx">
					<view class="goods-info-title" style="color:#333333;width: 20%;text-align: center;float:left;">必买理由</view>
					<view class="volume" style="font-size: 14px;width: 24%;float: right;color:#333333;"><text style="color:#E20C0A;font-weight: bold;">{{ goods.inOrderCount30Days}}人付款</text></view>
					<view class="coupon-price s-row"></view>

					<view class="goods_reco" style="display: flex;margin-top: 20upx;background-color: #F2F2F2;width: 96%;margin:20upx auto 30upx;position: relative;border-radius: 8upx;">
						<image src="../../static/detail/559.png" style="width:14upx;height:12upx;display: block;position: absolute;top:-12upx;left:34upx"></image>
						<view class="goods_desc" style="padding-bottom: 16upx;padding-top:20upx;" @click="TklmaskShow">
							<text>{{ goods.skuName }}</text>
						</view>
					</view>
					<view style="width: 25%;float: right;margin-right: 36upx; text-align:center;border-radius: 16px;border: 1px solid #FF0000;color: #FF0000;padding: 1px 6px 1px 6px"
					 @click="shareFriend()">
						文案分享
					</view>
				</view>

			</view>

			<view v-if="goods.skuName" class="goods_quan s-row" style="padding-top: 8upx;padding-bottom: 8upx;background-color: #F2F2F2;">
				<view class="row getGoodsLink" @click="shopCartShare('quan')">
					<view class="is-col-16 money" style="color: #DE2E2D;">
						<view style="font-weight: bold" v-if="goods.couponInfo && goods.couponInfo.couponList.length > 0">
							<text>{{ goods.couponmoney }}</text>
							元优惠券
						</view>
						<view style="font-weight: bold;margin-top: 18upx;color: #DE2E2D;" v-else>优惠券已被抢光</view>
						<view class="date-coupon" style="color: #DE2E2D;" v-if="goods.couponStartTime">使用期限: {{ goods.couponStartTime }}
							- {{ goods.couponEndTime }}</view>
					</view>
				</view>
				<image lazy-load src="https://taobao.xianmxkj.com/static/detail/21.png" mode="widthFix" class="is-response"></image>
			</view>

			<view class="goods_reco" style="text-align: center;font-size: 36upx;color: #333333;background: white;margin-top:6upx;padding: 10upx;"
			 v-if="goods.imageInfo.imageList">
				<view class="imglist">
					<view class="goods-info-title" style="margin-bottom: 10upx;font-weight: 500;font-size: 32upx;color: #333333;">宝贝详情</view>
					<block v-for="(item, index) in goods.imageInfo.imageList">
						<image lazy-load :src="item.url" mode="widthFix" class="is-response" @longpress="toSave(item.url)"></image>
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
							<view class="iconfont icon-shoucang" :style="collect.isCollect" @tap="clickCollect()"></view>
							<view style="font-size: 12px" :style="collect.isCollect">{{ collect.name }}</view>
						</view>
					</view>
					<view style="width: 75%;display: flex;">
						<button open-type="share" style="color: white;border-radius: 32upx;width: 50%;background: #e43939;text-align: center;margin: 4px"
						 >{{ buyDes }}</button>
						<button class="getTbk" style="color: white;border-radius: 32upx;width: 50%;background:#E41F19; text-align: center;margin: 4px"
						 @tap="shopCartShare('quan')">{{ getQun }}</button>
					</view>
				</view>
			</view>
			<view class="navBarButtonBox">
				<!-- 顶部右侧菜单 -->
				<view v-if="navBarButton" class="goods_shop_cart_bg navBarButton" @tap="showShopCartBg('nav')"
				 @touchmove.stop.prevent="moveHandleStop"></view>
				<view class="h_newlit" v-bind:class="[navBarButton ? 'active' : '', '']">
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
			<!-- #ifdef H5 -->
			<view class="buy-box-title" style="color: #FF0000;font-weight: 600;">复制分享文案</view>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<view class="buy-box-title" style="color: #FF0000;font-weight: 600;">长按复制分享文案</view>
			<!-- #endif -->
			<view class="buy-box-center">
				<view class="code-cent">
					<view class="cente-text">
						<view>
							<text class="textarea" @longpress="copyTklWenAns" selectable="true">
								【京东】{{ goods.skuName }}
								<br />
								【在售价】{{goods.itemprice}}元
								<br />
								【券后价】{{goods.itemendprice}}元
								<br />
								【下单链接】{{ erweima }}
								<br />
							</text>
						</view>
					</view>
					<view class="closeTips" style="padding-bottom: 16upx;">长按上方轮播图片可保存图片素材哦~</view>
				</view>
				<!-- #ifdef H5 -->
				<view class="buy-btn-copy" v-bind:class="[copyTklStatus ? 'active' : '', '']" @tap="copyTklWenAns">
					{{ copyTklStatus ? '已复制到剪切板' : '一键复制' }}
				</view>
				<!-- #endif -->
			</view>
		</simpleModal>
		<!-- <view class="scroll_top active " @click="posterSharing()" style="bottom: 200upx;width: 200upx;right: -24upx;padding-right: 20upx">
			<text>
				<text class="cuIcon cuIcon-calendar"></text>
				生成海报
			</text>
		</view> -->

		<tki-qrcode ref="qrcode" :val="erweima" :size="200" background="#fff" foreground="#000" pdground="#000" :onval="true"
		 :loadMake="true" @result="qrR" :show="false"></tki-qrcode>
		<view class="cu-modal" :class="modalName=='Image'?'show':''" @tap="hideModal">
			<view class="cu-dialog" v-if="goods&&haibaoShow&&erweimapath" @tap="hideModal">
				<view class="bg-img">
					<wm-poster @success="posterSuccess" :imgSrc="goods.itempic" :QrSrc="erweimapath" :Title="goods.skuName" :PriceTxt="goods.itemendprice"
					 :OriginalTxt="goods.itemprice" :LineType='false'></wm-poster>
				</view>
			</view>
		</view>
		<!-- 海报canvas以及模态框展示下载等 -->
		<canvas canvas-id="poster" class="poster_canvas"></canvas>
		<tui-modal :show="posterShow" padding="30rpx" @cancel="closePosterShow" :custom="true">
			<view class="poster-model" @longpress="savePosterPath">
				<view class="down" @click.stop="onSaveImg">
					<text class="cuIcon cuIcon-down"></text>
				</view>
				<view class="img-wrap">
					<image :src="goods.itempic"></image>
				</view>
				<view class="title">{{goods.skuName}}</view>
				<view class="price-box">
					<text class="now">券后价 ￥{{ goods.itemendprice }}</text>
					<text class="old">{{ goods.itemprice }}</text>
				</view>
				<view class="poster_info">
					<view class="info">
						<view class="des">淇湘优购优选精选好物</view>
						<view class="caozuo">点击右上角下载或长按保存图片</view>
					</view>
					<image class="poster_code_image" :src="Qrerweima" mode="aspectFit"></image>
				</view>
			</view>
		</tui-modal>
	</view>
</template>

<script>
	let settingWritePhotosAlbum = false;
	import simpleModal from '../../components/simple-pro/customModal.vue';
	import wmPoster from '@/components/wm-poster/wm-poster.vue';
	import tkiQrcode from '../../package/components/tki-qrcode/tki-qrcode.vue';
	export default {
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: "原价" + this.goods.itemprice + "券后价" + this.goods.itemendprice + this.goods.skuName,
				imageUrl: this.goods.itempic,
				path: '/pages/detail/jd?itemid=' + this.itemid + '&relation_id=' + this.relation_id
			}
		},
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
				itemid: "",
				loadGoods: true,
				goods: '',
				taoBaoBuy: true,
				shopCartBg: false,
				scrollTop: false,
				couponlist: [],
				navBarButton: false,
				copyTklStatus: false,
				save: false,
				tkl: '',
				relation_id: '',
				money: 0,
				grade: '',
				isInvitation: 0,
				showFollow: false,
				isWeiXin: false,
				footprintKey: 'orange-sqx-footprint-jd',
				collectKey: 'orange-sqx-collect-jd',
				poster: {},
				coupon_click_url: '',
				qrShow: false,
				haibaoImg: null,
				haibaoShow: false,
				isEnable: '否',
				canvasId: 'default_PosterCanvasId',
				posterShow: false, //海报模态框
				Qrerweima:'',//小程序码
				maxMoney: '0.7',
				minMoney:'0.3'
			};
		},
		components: {
			simpleModal,
			tkiQrcode,
			wmPoster
		},
		onShow: function() {
			this.maxMoney = this.$queue.maxMoney();
			this.minMoney = this.$queue.minMoney();
			this.copyTklStatus = false;
			let relation_id = this.$queue.getData('relation_id');
			if (relation_id) {
				this.relation_id = relation_id;
			}

		},
		onLoad: function(e) {
			if (e.relation_id) {
				this.$queue.setData('relation', e.relation_id);
			}
			//扫描普通链接进入小程序，并获取参数
			console.log("e.scene",e)
			if (e.scene) {
				const scene = decodeURIComponent(e.scene);
				let arr = scene.split("&");
				if(arr[2] == 'jd') {
					this.$queue.setData('relation', arr[0]);
					this.itemid = arr[1];
					this.loadGoodsInfo();
					this.getQrCode(arr[1]);
				}
			}
			let a = this.$queue.getData("isEnable")
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
				this.itemid = e.itemid
				this.loadGoodsInfo();
				this.getQrCode(e.itemid);
			} else {
				uni.navigateBack({

				})
			}
		},
		onPageScroll: function(e) {
			this.scrollTop = e.scrollTop > 200;
		},
		onNavigationBarButtonTap: function() {
			this.navBarButton = !this.navBarButton;
		},
		methods: {
			shareFriend() {
				this.$refs.simpleModalTkl.show({
					showConfirmButton: false
				});
			},
			posterSuccess(haibaoImg) {
				this.haibaoImg = haibaoImg;
				this.modalName = "Image"
			},
			showModal() {
				//#ifdef H5
				if (!this.haibaoImg) {
					this.haibaoShow = true;
					this.$queue.showLoading("海报生成中...")
				} else {
					this.modalName = "Image"
				}
				//#endif

			},
			hideModal() {
				this.modalName = null
			},
			bijiage() {
				uni.navigateTo({
					url: "../search/search?keywords=" + this.goods.skuName
				})

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
				let list = this.goods.imageInfo.imageList.map((item, index) => {
					return item.url;
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

				let that = this;
				this.$Request.getT('/jd/goods/' + this.itemid).then(res => {
					if (res.code === 200) {
						let item = res.data.list[0];
						let couponInfo = item.couponInfo.couponList[0];
						if (couponInfo && couponInfo.useEndTime && couponInfo.useStartTime) {
							item.couponStartTime = this.formatDate(new Date(couponInfo.useStartTime));
							item.couponEndTime = this.formatDate(new Date(couponInfo.useEndTime));
							item.couponmoney = couponInfo.discount;
						}
						
						item.itempic = 'https://' + item.imageInfo.imageList[0].url.split('://')[1];
						that.goods = item;
						
						let grade = this.$queue.getData('grade');
						if (grade) {
							that.money = (item.commissionInfo.couponCommission * 0.9 * parseFloat(grade))
								.toFixed(2);
						} else {
							that.money = (item.commissionInfo.couponCommission * 0.9 * parseFloat(this.$queue
								.minMoney())).toFixed(2);
						}
						
						
						if (couponInfo) {
							if (item.couponInfo.couponList[0].isBest != 0) {
								//获取京东优惠券地址
								this.getJDUrl();
							} else {
								this.linkUrlType = 1;
								this.erweima = 'https://' + item.materialUrl
								// this.erweima = item.couponInfo.couponList[0].link;
							}
							let info = (item.priceInfo.price - item.couponInfo.couponList[0].discount).toFixed(
								2);
						
							if (info > 0) {
								that.goods.itemprice = item.priceInfo.price;
								that.goods.itemendprice = (item.priceInfo.price - item.couponInfo.couponList[0]
									.discount).toFixed(2);
								that.itemprice = item.priceInfo.price;
								that.itemendprice = (item.priceInfo.price - item.couponInfo.couponList[0]
									.discount).toFixed(2);
								item.itemprice = item.priceInfo.price;
								item.itemendprice = (item.priceInfo.price - item.couponInfo.couponList[0]
									.discount).toFixed(2);
						
								// that.goods.itemendprice = (item.priceInfo.price - item.couponInfo.couponList[0].discount).toFixed(2)
								// that.itemprice = item.priceInfo.price
								// that.itemendprice = (item.priceInfo.price - item.couponInfo.couponList[0].discount).toFixed(2)
							} else {
								that.goods.itemprice = item.priceInfo.price;
								that.goods.itemendprice = item.priceInfo.price
								that.itemprice = item.priceInfo.price
								that.itemendprice = item.priceInfo.price
								item.itemprice = item.priceInfo.price;
								item.itemendprice = item.priceInfo.price;
						
							}
						} else {
							item.itemprice = item.priceInfo.price;
							item.itemendprice = item.priceInfo.price;
							this.getJDUrl();
						}
						item.tkmoney = that.money;
						item.tkmoneys = (item.commissionInfo.couponCommission * 0.9 * parseFloat(this.$queue
							.maxMoney())).toFixed(2);
						// item.itemprice = that.money;
						that.shengji = (item.commissionInfo.couponCommission * 0.9 * parseFloat(this.$queue
							.maxMoney())).toFixed(2);
						that.grade = grade;
						this.skuId = item.skuId;
						let isExist = this.$queue.isExistJd(this.collectKey, item.skuId);
						if (isExist === true) {
							this.collect.name = '已收藏';
							this.collect.isCollect = 'color: #E41F19';
						} else {
							this.collect.name = '收藏';
							this.collect.isCollect = false;
						}
						let isExists = this.$queue.isExistJd(this.footprintKey, item.skuId);
						if (isExists === false) {
							this.$queue.insert({
								key: this.footprintKey,
								value: item
							});
						}
						let jiage = 0;
						if (this.isEnable != '否') {
							if (grade) {
								if (grade === this.maxMoney) {
									this.buyDes = '分享赚 ￥' + that.money;
									jiage = that.money;
								} else {
									this.buyDes = '分享赚 ￥' + that.shengji;
									jiage = that.shengji;
								}
							} else {
								this.buyDes = '分享赚 ￥' + that.shengji;
								jiage = that.shengji;
							}
						} else {
							this.buyDes = '分享给好友';
						}
						// if (!couponInfo) {
						// 	this.getQun = '原价￥' + item.priceInfo.price + ' 购买';
						// } else {
						// 	this.getQun = '自购省￥' + couponInfo.discount;
						// }
						
						
						if (!couponInfo) {
							// this.getQun = '原价' + item.priceInfo.price + '元购买';
							this.getQun = '自购省￥' + jiage;
						} else {
							// this.getQun = '自购省' + couponInfo.discount + '元';
							this.getQun = '自购省￥' + parseFloat(parseFloat(couponInfo.discount) +
								parseFloat(jiage)).toFixed(2);
						}
					} else {
						uni.navigateBack({

						})
					}

				})


			},

			shopCartShare: function(type) {
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
						this.getJDUrl(0)
					}
				} else {
					this.getJDUrl(0)
				}

			},
			copyTklWenAns: function() {
				uni.setClipboardData({
					data: "【京东】" + this.goods.skuName +
						'\n【在售价】' +
						this.goods.itemprice +
						'元\n【券后价】' +
						this.goods.itemendprice +
						'元' +
						'+\n下单链接：' +
						this.erweima + '\n',
					success: r => {
						this.copyTklStatus = true;
					}
				});
			},
			getJDUrl(type) {
				let jdpid = this.$queue.getData('jdpid');
				if (!jdpid) {
					jdpid = this.$queue.getJDPid();
				}
				let url = encodeURIComponent('https://' + this.goods.materialUrl);
				let coupons = '';
				if (this.goods.couponInfo.couponList.length < 1) {
				} else {
					coupons = encodeURIComponent(this.goods.couponInfo.couponList[0].link);
				}
				this.$Request.getT('/jd/goods/couponUrlV2?positionId=' + jdpid + '&materialId=' + url + '&couponUrl=' +
					coupons).then(
					res => {
						if (res.data) {
							this.erweima = res.data.shortURL;
							let url = res.data.shortURL;
							if (type == 0) {
								// #ifdef H5
								window.location.href = url;
								//#endif
								// #ifndef H5
								let targetpath = "/pages/union/proxy/proxy?spreadUrl=" + encodeURIComponent(url);
								uni.navigateToMiniProgram({
									appId: "wxca1fe42a16552094",
									path: targetpath,
									envVersion: 'release',
									success(res) {
										// 打开成功
										console.log(res);
									}
								})
								//#endif
							}

						} else {
							this.$queue.showToast("领券失败")
						}
					})


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
				let isExist = this.$queue.isExistPdd(this.collectKey, this.itemid);
				if (isExist) {
					let items = [];
					items.push(this.itemid);
					this.$queue.removeItem(this.collectKey, items);
					this.collect.name = '收藏';
					this.collect.isCollect = '';
				} else {
					this.$queue.insert({
						key: this.collectKey,
						value: this.goods
					});
					this.collect.name = '已收藏';
					this.collect.isCollect = 'color: #FF0000';
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
					uni.switchTab({
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
				uni.showModal({
					title: '登录提醒',
					showCancel: false,
					content: '当前账号未登录\n请登录后领取优惠券',
					success: (confirmRes) => {
						if (confirmRes.confirm) {
							this.$queue.setData("href", '/pages/detail/jd?itemid=' + this.itemid);
							uni.navigateTo({
								url: '/pages/member/register'
							});
						}
					}
				});
			},
			copyTitle: function() {
				uni.setClipboardData({
					data: this.goods.title,
					success: r => {
						this.$queue.showToast('复制成功')
					}
				});
			},
			// 2021.1.15 YTYTYTYT
			getQrCode(goodsId) {
				let	relation = this.$queue.getData('relation_id');
				this.Qrerweima = this.$queue.publicYuMingTao() + '/wx/mpCreateGoodsQr?relation=' + relation + '&goodsId=' + goodsId + '&type=jd' + '&page=pages/detail/jd'
				// this.Qrerweima = this.$queue.publicYuMing() +
				// 	'/tao/user/getImg?page=pages/detail/jd&scene=' + goodsId +'&width=200'
				console.log("this.Qrerweima___:" + this.Qrerweima)
			},
			posterSharing() {
				let token = this.$queue.getData('token');
				let userId = this.$queue.getData('userId');
				if (token) {
					this.posterShow = true;
				} else {
					this.loginS();
				}
			},
			closePosterShow() {
				this.posterShow = false;
			},
			savePosterPath() {
				uni.showActionSheet({
					itemList: ['保存到本地'],
					success: (res) => {
						this.onSaveImg();
					}
				});
			},
			// 创建海报
			createPoster() {
				return new Promise((resolve, reject) => {
					uni.showLoading({
						title: '海报生成中'
					});
					const ctx = uni.createCanvasContext('poster');
					ctx.fillRect(0, 0, 375, 673);
					ctx.setFillStyle("#FFF");
					ctx.fillRect(0, 0, 375, 673);
					uni.downloadFile({
						url: this.goods.itempic,
						success: (res) => {
							if (res.statusCode === 200) {
								ctx.drawImage(res.tempFilePath, 0, 0, 375, 375);
								uni.downloadFile({
									url: this.Qrerweima,
									success: (res2) => {
										if (res.statusCode === 200) {
											let textTop = 0;
											// 商品标题
											ctx.setFontSize(21);
											ctx.setFillStyle('#000');
											let drawtextList = this.$queue.drawtext(this.goods.skuName, 320);
											drawtextList.forEach((item, index) => {
												if (index < 2) {
													textTop = 380 + (index + 1) * 28;
													ctx.fillText(item.content, 17, textTop);
												}
											});
											// 售价
											let nowPriceW;
											ctx.setFillStyle('#FF5500');
											ctx.setFontSize(18);
											ctx.fillText('券后价 ￥' + this.goods.itemendprice , 17, textTop + 50); //商品价格
											nowPriceW = ctx.measureText('券后价 ￥' + this.goods.itemendprice).width + uni.upx2px(10);
											// 原价
											let oldPriceW;
											ctx.setFillStyle('#ccc');
											ctx.setFontSize(12);
											ctx.fillText('￥' + this.goods.itemprice, nowPriceW + uni.upx2px(40),
												textTop + 50);
											oldPriceW = ctx.measureText('￥' + this.goods.itemprice).width;
											// 原价中划线
											ctx.beginPath()
											ctx.setLineWidth(1)
											ctx.setStrokeStyle('#ccc');
											ctx.moveTo(nowPriceW + uni.upx2px(38), textTop + 46)
											ctx.lineTo(nowPriceW + oldPriceW + uni.upx2px(42), textTop + 46)
											ctx.stroke();
											// 商品分割线
											ctx.beginPath();
											ctx.setLineWidth(1);
											ctx.moveTo(17, textTop + 70);
											ctx.lineTo(358, textTop + 70);
											ctx.setStrokeStyle('#eee');
											ctx.stroke();
											// 淇湘优购优选优选好物
											ctx.setFontSize(21);
											ctx.setFillStyle('#000');
											ctx.fillText("淇湘优购优选优选好物", 17, textTop + 136);
											// 长按识别二维码访问
											ctx.setFontSize(12);
											ctx.setFillStyle('#999');
											ctx.fillText("长按或扫描二维码识别", 17, textTop + 166);
											// 二维码
											ctx.drawImage(res2.tempFilePath, 238, textTop + 88, 120, 120);
											ctx.draw(true, () => {
												// canvas画布转成图片并返回图片地址
												uni.canvasToTempFilePath({
													canvasId: 'poster',
													width: 375,
													height: 673,
													success: (res) => {
														console.log("海报制作成功！");
														resolve(res.tempFilePath);
													},
													fail: () => {
														uni.hideLoading();
														reject();
													}
												})
											});
										} else {
											uni.hideLoading();
											uni.showToast({
												title: '海报制作失败，图片下载失败',
												icon: 'none'
											});
										}
									},
									fail: err => {
										console.log(err)
										uni.hideLoading();
										uni.showToast({
											title: '海报制作失败，图片下载失败',
											icon: 'none'
										});
									}
								});
							} else {
								uni.hideLoading();
								uni.showToast({
									title: '海报制作失败，图片下载失败',
									icon: 'none'
								});
							}
						},
						fail: err => {
							uni.hideLoading();
							uni.showToast({
								title: '海报制作失败，图片下载失败',
								icon: 'none'
							});
						}
					});
				});
			},
			// 保存图片
			async onSaveImg() {
				let imgUrl = await this.createPoster();
				// #ifdef H5
				this.h5SaveImg = imgUrl;
				uni.hideLoading();
				// #endif
				// #ifdef MP-WEIXIN
				uni.showLoading({
					title: '海报下载中'
				});
				if (settingWritePhotosAlbum) {
					uni.getSetting({
						success: res => {
							if (res.authSetting['scope.writePhotosAlbum']) {
								uni.saveImageToPhotosAlbum({
									filePath: imgUrl,
									success: () => {
										uni.hideLoading();
										uni.showToast({
											title: '保存成功'
										});
									}
								});
							} else {
								uni.showModal({
									title: '提示',
									content: '请先在设置页面打开“保存相册”使用权限',
									confirmText: '去设置',
									cancelText: '算了',
									success: data => {
										if (data.confirm) {
											uni.hideLoading();
											uni.openSetting();
										}
									}
								});
							}
						}
					});
				} else {
					uni.hideLoading();
					settingWritePhotosAlbum = true;
					uni.authorize({
						scope: 'scope.writePhotosAlbum',
						success: () => {
							uni.saveImageToPhotosAlbum({
								filePath: imgUrl,
								success: () => {
									uni.hideLoading();
									uni.showToast({
										title: '保存成功'
									});
								}
							});
						}
					});
				}
				// #endif
			},
		}
	};
</script>

<style lang="scss" scoped>
	@import '../../static/css/index.css';

	page {
		background: #F8F8F8;
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
		color: #FF0000;
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
	
	// YT
	.poster_canvas {
		width: 750upx;
		height: 1334upx;
		position: fixed;
		top: -10000upx;
		left: 0;
	}
	
	.poster-model {
		position: relative;
	
		.down {
			width: 60upx;
			height: 60upx;
			border-radius: 50%;
			background-color: #f2f2f2;
			position: absolute;
			top: 20upx;
			right: 20upx;
			z-index: 99;
			text-align: center;
			line-height: 60upx;
			font-size: 34upx;
		}
	
		.img-wrap {
			width: 570upx;
			height: 570upx;
	
			image {
				width: 100%;
				height: 100%;
			}
		}
	
		.title {
			margin: 20upx 0;
			font-size: 32upx;
			font-weight: 600;
			color: #000;
		}
	
		.price-box {
			.now {
				font-size: 34upx;
				color: #FF5500;
				;
			}
	
			.old {
				font-size: 24upx;
				color: #999;
				text-decoration: line-through;
				margin-left: 10upx;
			}
		}
	
		.poster_info {
			display: flex;
			align-items: center;
			justify-content: space-between;
	
			.info {
				.des {
					margin: 20upx 0;
					font-size: 32upx;
					font-weight: 600;
					color: #000;
				}
	
				.caozuo {
					font-size: 24upx;
					color: #999;
					margin-top: 10upx;
				}
			}
	
			.poster_code_image {
				width: 150rpx;
				height: 150rpx;
				flex-shrink: 0;
			}
		}
	}
</style>
