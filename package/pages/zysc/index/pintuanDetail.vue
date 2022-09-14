<template>
	<view>
		<view class="shop_top">
			<view class="left">
				<image :src="coverImg"></image>
			</view>
			<view class="right" v-if="ordersList">
				<view class="limapboxqing2">{{ordersList.title}}</view>
				<view class="right_view">
					<view class="right_top">
						<text style="font-size: 30upx">￥</text>
						<text style="font-size: 45upx;">{{money}}</text>
						<text class="oldMoney">￥{{ ordersList.originalPrice }}</text>
					</view>
					<view v-if="ordersList.goods" class="sales">已拼成{{ordersList.goods.sales}}次</view>
				</view>
			</view>
		</view>

		<view class="shop_pintuan" v-if='pinkUserList.length > 0'>
			<view class="endNum_text">等待成团，仅剩 <text
					style="color: #F43B0A;">{{pinkUserList[0].needNumber - pinkUserList[0].countNumber}}</text> 人个名额
			</view>

			<view class="pintuan_person">
				<view style="display: flex;" v-for="(item,index) in pinkUserList[0].needNumber">
					<view class="person_imgeView" v-if="pinkUserList[0].pinkUserList[index]">
						<image :src="pinkUserList[0].pinkUserList[index].headerImg ? pinkUserList[0].pinkUserList[index].headerImg : '/static/logo2.png'"></image>
						<view v-if="index == 0" class="tuanzhang">团长</view>
					</view>
					<view v-else class="more">?</view>
				</view>
			</view>

			<view class="endTime_view" v-if="pinkUserList[0].endTime.day">
				距结束
				<uni-countdown class="coutdown_view" :day="pinkUserList[0].endTime.day" color="#999999"
					:hour="pinkUserList[0].endTime.hour" :minute="pinkUserList[0].endTime.minute"
					:second="pinkUserList[0].endTime.second">
				</uni-countdown>
			</view>

			<view v-if="pintuanMessage === '立即参团'" class="pintuan_btn" @tap="savePinTuan">{{pintuanMessage}}</view>
			<!-- #ifdef MP-WEIXIN -->
			<button v-if="pintuanMessage === '邀请参团'" class="pintuan_btn" open-type="share" style="border: none;">{{pintuanMessage}}</button>
			<!-- #endif -->
			<!-- #ifndef MP-WEIXIN -->
			<view v-if="pintuanMessage === '邀请参团'" class="pintuan_btn" @tap="shareUrl">{{pintuanMessage}}</view>
			<!-- #endif -->
		</view>


		<view class="pintuan_message">
			<view class="message_title">拼团攻略</view>
			<view class="message_item">1. 玩法：支付开团/参团 ＞ 邀请参团 ＞ 人满成团</view>
			<view class="message_item">2. 拼团有效期内，达成参团人数即为拼团成功，商家安排发货。</view>
			<view class="message_item">3. 拼团有效期内，未达成参团人数即为拼团失败，款项原路退回。</view>
		</view>
		
		<!-- 弹框 -->
		<uni-popup ref="popus" type="bottom">
			<view
				style="width: 100%;height: max-content;background: #FFFFFF;border-top-left-radius: 20upx;border-top-right-radius: 20upx;padding: 40upx;">
				<view style="display: flex;">
					<image :src="attrValuecoverImg" style="width: 150upx;height: 150upx;"></image>
					<view style="margin-top: 20upx;margin-left: 20upx;">
						<view class="name">
							{{ ordersList.title }}
						</view>
						<view style="display: flex;">
							<view style="font-size: 28upx;color: #FF4733;">¥ {{numberMoney}}</view>
							<view v-if="Maxnumber != -1"
								style="margin-left: 20upx;font-size: 24upx;color: #333333;">库存：{{Maxnumber}}</view>
						</view>
						<view style="font-size: 28upx;color: #333333;margin-top: 10upx;">请选择产品类型</view>
					</view>
				</view>
				<view v-for="(item,index) in attrValue" :key='index'>
					<view style="margin-top: 50upx;font-size: 32upx;color: #000000;">{{item.value}}</view>
					<view style="display: flex;flex-wrap: wrap;flex-wrap: wrap;">
						<view style="display: flex;flex-wrap: wrap;" v-for="(de,ind) in item.detail"
							@tap='checkState(de,index,ind)'>
							<view
								:style="item.goodsId == index && item.attrId == ind && de.state != ''?
							'width: 150rpx; height: 50rpx;background: #F2F2F2;text-align: center;border-radius: 50rpx;line-height: 50rpx;margin: 20rpx 0rpx 0rpx 10rpx;border: 1rpx solid #FF0000;'
							: 'width: 150rpx; height: 50rpx;background: #F2F2F2;text-align: center;border-radius: 50rpx;line-height: 50rpx;margin: 20rpx 0rpx 0rpx 10rpx;'">
								{{de.name}}
							</view>
						</view>
					</view>
				</view>
				<view style="display: flex;" v-if='ordersList.isExpress == 1'>
					<view style="margin-top: 50upx;font-size: 32upx;color: #000000;width: 80%;">数量</view>
					<view
						style="width:200upx;height: 60upx;display: flex;margin-top: 30upx;border-radius: 5upx;border:1px solid #E6E6E6">
						<view
							style="border-right:1px solid #E6E6E6;width: 70upx;color: #999999;text-align: center;margin-top: 15upx;"
							@click="jian">-</view>
						<view
							style="width: 80upx;text-align: center;font-size: 24upx;color: #333333;margin-top: 15upx;">
							{{number}}
						</view>
						<view
							style="border-left:1px solid #E6E6E6;width: 70upx;color: #999999;text-align: center;margin-top: 15upx"
							@click="jia">+</view>
					</view>
				</view>
				<button style="background: #FF332F;color: #FFFFFF;margin-top: 50upx;"
					@tap="shopCartShare('quan')">{{ShopCartOrMoney}}</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import simpleModal from '../../../../components/simple-pro/customModal.vue';
	import uniPopup from '../../../../components/uni-popup/uni-popup.vue';
	import wmPoster from '../../../../components/wm-poster/wm-posterorders.vue';
	import tkiQrcode from '../../../components/tki-qrcode/tki-qrcode.vue';
	import uniCountdown from '../../../components/uni-countdown/uni-countdown.vue';
	export default {
		components: {
			simpleModal,
			tkiQrcode,
			uniPopup,
			wmPoster,
			uniCountdown
		},
		data() {
			return {
				day: 1,
				hour: 1,
				minute: 1,
				second: 1,
				pintuanMessage:'立即参团',
				ordersList: {},
				coverImg: '',
				money: '',
				orderId: '',
				erweima: '',
				erweimapath: '',
				ordersId: 0,
				number: 1,
				Maxnumber: -1,
				shoucang: true,
				shoucangId: '',
				modalName: '',
				ShopCartOrMoney: '立即购买',
				ordersMoney: 0,
				numberMoney: 0,
				buyDes: '口令购买',
				shengji: '',
				attrValue: [],
				showPage: false,
				goods: '',
				relation: false,
				brandName: '',
				numberMoney1: 0,
				scrollTop: false,
				checkStateList: [],
				navBarButton: false,
				copyTklStatus: false,
				attrValuecoverImg: '',
				name: '',
				XCXErweima: '',
				icon: '',
				CheckattrValue: false,
				tkl: '',
				relation_id: null,
				money: 0,
				grade: '',
				groupPinkId: '',
				isInvitation: 0,
				skuId: 0,
				CouponIssueList: [],
				poster: {},
				imageView: [],
				pinkUserList: [],
				userByinvitationId: '',
				haibaoImg: null,
				haibaoShow: false,
				isEnable: '否',
				shareMessage: '',
				className: '',
				pinglunList: [],
				totalElements: '',
				footprintKey: 'orange-sqx-footprint-zy',
				collectKey: 'orange-sqx-collect-zy',
				userId: '',
				stars: [1, 2, 3, 4, 5],
				ordersList: {},
				checkString: '',
			}
		},
		onLoad(d) {
			let relation_id = this.$queue.getData('relation_id');
			if (relation_id) {
				this.relation = relation_id;
			}
			this.getDetail(d.id);
			this.getpintuanNumber(d.id);
			this.ordersId = d.id;
			this.getCommondityList(d.id);
		},
		onShow() {
			let userId = this.$queue.getData('userId');
			if (userId) {
				this.getUserInfo(userId);
			}else{
				this.loginS();
			}
		},
		onShareAppMessage(res) {
			return {
				title: '快来跟我一起拼团吧！',
				imageUrl: this.coverImg,
				path: '/package/pages/zysc/index/pintuanDetail?id=' + this.ordersId
			};
		},
		methods: {
			shareUrl(){
				let that = this;
				var url = '快来跟我一起拼团吧！' + this.$queue.publicYuMing() + '/package/pages/zysc/index/pintuanDetail?id=' + this.ordersId
				uni.showModal({
					title: '邀请拼团',
					content: url,
					showCancel: true,
					cancelText: '关闭',
					confirmText: '一键复制',
					success: res => {
						if (res.confirm) {
							uni.setClipboardData({
								data: url,
								success: function() {
									console.log('success');
									that.$queue.showToast('复制成功');
								}
							});
						}
					}
				});
			},
			savePinTuan() {
				uni.showLoading({
					title: '加载中...'
				});
				let token = this.$queue.getData('token');
				let userId = this.$queue.getData('userId');
				if (token) {
					var boole = false;
					let pinkUserList = [];
					pinkUserList = this.pinkUserList[0].pinkUserList;
					var groupPinkId = this.pinkUserList[0].id
					for (var i = 0; i < pinkUserList.length; i++) {
						if (parseInt(pinkUserList[i].userId) == parseInt(userId)) {
							boole = true;
							break;
						}
					}
					uni.hideLoading();
					if (!boole) {
						this.groupPinkId = groupPinkId;
						if (this.ordersList.goods.attr.length === 0) {
							this.ShopCartOrMoney = '立即购买';
							this.shopCartShare('quan');
						} else {
							this.ShopCartOrMoney = '立即购买';
							this.$refs.popus.open();
						}
					} else {
						this.$queue.showToast('此团已参加过了，不能重复参与！');
					}
				} else {
					uni.hideLoading();
					this.loginS();
				}
			},
			timeFormat(param) {
				return param < 10 ? '0' + param : param;
			},
			getpintuanNumber(groupId) {
				this.$Request.postJson('/selfGroupPink/findByGroupId?groupId=' + groupId).then(res => {
					if (res.status === 0) {
						this.pinkUserList = [];
						res.data.forEach(d => {
							let data = {}
							data.day = 0;
							data.hour = 0;
							data.minute = 0;
							data.second = 0;
							var now = new Date().getTime();
							var endDate = new Date(d.endTime).getTime();
							let time = (endDate - now) / 1000;
							data.day = this.timeFormat(parseInt(time / (60 * 60 * 24)));
							data.hour = this.timeFormat(parseInt(time % (60 * 60 * 24) / 3600));
							data.minute = this.timeFormat(parseInt(time % (60 * 60 * 24) % 3600 / 60));
							data.second = this.timeFormat(parseInt(time % (60 * 60 * 24) % 3600 % 60));
							d.endTime = data;
							this.pinkUserList.push(d);
						});
						let userId = this.$queue.getData('userId');
						for (var i = 0; i < this.pinkUserList[0].pinkUserList.length; i++) {
							if (parseInt(this.pinkUserList[0].pinkUserList[i].userId) == parseInt(userId)) {
								this.pintuanMessage = '邀请参团';
								break;
							}
						}
					}
				});
			},
			//获取用户信息
			getUserInfo(userId) {
				this.$Request.getT('/user/' + userId).then(res => {
					if (res.status === 0) {
						if (res.data.orderJifen) {
							this.jifen = parseFloat(res.data.orderJifen).toFixed(0);
						}
						this.$queue.setData('image_url', res.data.image_url);
						this.$queue.setData('relation_id', res.data.relationId);
						this.$queue.setData('nickName', res.data.nickName);
						this.$queue.setData('isInvitation', res.data.isInvitation);
						if (res.data.isTuan) {
							this.isTuan = parseInt(res.data.isTuan);
						}
						if (res.data.gradeDes) {
							this.dengji = res.data.gradeDes;
						} else {
							this.dengji = '已邀请0人';
						}
						if (res.data.gradeNumber) {
							if (res.data.gradeNumber == '还可邀请0人') {
								this.dengjides = '已到达最高等级';
							} else {
								this.dengjides = res.data.gradeNumber;
							}
						} else {
							let number = this.$queue.invitaionNum();
							this.dengjides = '还可邀请' + number + '人';
						}
						this.grade = res.data.grade;
						this.isInvitation = res.data.isInvitation;
						this.$queue.setData('relation', res.data.invitation);
						this.$queue.setData('gender', parseInt(res.data.gender));
						this.gender = parseInt(res.data.gender);
						if (res.data.image_url) {
							this.image_url = res.data.image_url;
						} else {
							this.image_url = '/static/img/common/logo.png';
						}
						if (res.data.relationId) {
							this.relation_id = res.data.relationId;
							this.des = '我的特权';
						} else {
							this.relation_id = '';
							this.des = '会员申请';
						}
						if (res.data.nickName) {
							this.mobile = res.data.nickName;
						} else {
							this.mobile = res.data.phone;
						}
					} else {
						this.$queue.logout();
						uni.showModal({
							title: '用户信息提示',
							content: '本地用户信息失效需要重新授权登录',
							showCancel: false,
							success: e => {
								uni.navigateTo({
									url: '/pages/member/register'
								});
							}
						});
					}
				});
			},
			checkState(item, index, ind) {
				this.number = 1;
				this.attrValue[index].detail.forEach(d => {
					d.state = '';
				})

				this.checkStateList[index].name = item.name;
				this.attrValue[index].goodsId = index;
				this.attrValue[index].attrId = ind;
				this.attrValue[index].detail[ind].state = '123';
				this.checkString = '';
				this.checkStateList.forEach(d => {
					if (d.name) {
						if (this.checkString) {
							this.checkString = this.checkString + ',' + d.name;
						} else {
							this.checkString = d.name;
						}

					}
				});
				console.log(this.ordersList.sku)
				for (var i = 0; i < this.ordersList.sku.length; i++) {
					let d = this.ordersList.sku[i];
					if (d.detailJson == this.checkString) {
						if (this.className === 'pintuan') {
							if (d.pinkStock > 0) {
								this.numberMoney = d.pinkPrice;
								this.numberMoney1 = d.pinkPrice;
								this.Maxnumber = d.pinkStock;
								this.skuId = d.id;
								this.attrValuecoverImg = d.skuImg;
								this.CheckattrValue = true;
							} else {
								this.Maxnumber = 0;
								this.CheckattrValue = false;
								this.$queue.showToast('库存不足请选择其他的类型')
							}
						} else if (this.className === 'miaosha') {
							if (d.secKillStock > 0) {
								this.numberMoney = d.secKillPrice;
								this.numberMoney1 = d.secKillPrice;
								this.Maxnumber = d.secKillStock;
								this.skuId = d.id;
								this.attrValuecoverImg = d.skuImg;
								this.CheckattrValue = true;
							} else {
								this.CheckattrValue = false;
								this.Maxnumber = 0;
								this.$queue.showToast('库存不足请选择其他的类型')
							}
						} else {
							if (d.stock > 0) {
								if (this.relation) {
									this.numberMoney = d.memberPrice;
									this.numberMoney1 = d.memberPrice;
								} else {
									this.numberMoney = d.skuPrice;
									this.numberMoney1 = d.skuPrice;
								}
								this.Maxnumber = d.stock;
								this.skuId = d.id;
								this.attrValuecoverImg = d.skuImg;
								this.CheckattrValue = true;
							} else {
								this.Maxnumber = 0;
								this.CheckattrValue = false;
								this.$queue.showToast('库存不足请选择其他的类型')
							}
						}
						break
					} else {
						this.CheckattrValue = false;
					}
				}
			},
			jian() {
				if (this.CheckattrValue) {
					if (this.number != 1) {
						let number = this.number - 1
						this.number = number
						this.numberMoney = parseFloat(this.numberMoney - this.numberMoney1).toFixed(2);
					}
				} else {
					this.$queue.showToast('请先选择正确的商品规格');
				}
			},
			jia() {
				if (this.CheckattrValue) {
					let number = this.number + 1
					if (number <= this.Maxnumber) {
						this.number = number
						this.numberMoney = parseFloat(this.numberMoney1 * number).toFixed(2);
					} else {
						this.$queue.showToast('商品只能买这么多了');
					}
				} else {
					this.$queue.showToast('请先选择正确的商品规格');
				}
			},
			openPopus() {
				let token = this.$queue.getData('token');
				let userId = this.$queue.getData('userId');
				if (token) {
					this.ShopCartOrMoney = '立即购买';
					if (this.className === 'pintuan' || this.className === 'miaosha') {
						if (this.ordersList.goods.attr.length === 0) {
							this.shopCartShare('quan');
						} else {
							this.$refs.popus.open();
						}
					} else {
						if (this.ordersList.attr.length === 0) {
							this.shopCartShare('quan');
						} else {
							this.$refs.popus.open();
						}
					}
				} else {
					this.loginS();
				}
			},
			getCommondityList(id) {
				uni.showLoading({
					title: '加载中...'
				});

				this.$Request.getT('/selfGroup/find?id=' + id).then(res => {
					if (res.status === 0) {
						this.imageView = [];
						this.ordersList = {};
						console.log(this.relation, '11111111')
						if (this.relation) {

							this.ordersMoney = res.data.memberPrice;
							this.numberMoney = res.data.memberPrice;
						} else {
							this.ordersMoney = res.data.price;
							this.numberMoney = res.data.price;
						}
						if (res.data.goods.attr.length > 0) {
							this.attrValue = [];
							res.data.goods.attr[0].attrValue.forEach(d => {
								let data = {
									name: ''
								}
								this.checkStateList.push(data);
								let detail = [];
								d.detail.split(',').forEach(d => {
									let data = {
										name: '',
										state: ''
									}
									data.name = d;
									detail.push(data);
								});
								d.detail = detail;
								d.attrId = '';
								d.goodsId = '';
								this.attrValue.push(d);
							});
						}
						if (res.data.goods.brand.brandName) {
							this.brandName = res.data.goods.brand.brandName;
						}
						this.ordersList = res.data;
						this.imageView = res.data.img.split(',');
						this.attrValuecoverImg = res.data.coverImg;
						console.log(this.name)
					}
					uni.hideLoading();
				});
			},
			hindPopus() {
				this.$refs.popus.close();
				this.groupPinkId = '';
			},
			getDetail(id) {
				this.$Request.getT('/selfGroup/find?id=' + id).then(res => {
					if (res.status === 0) {
						this.ordersList = {};
						if (this.relation) {
							this.money = res.data.memberPrice;
						} else {
							this.money = res.data.price;
						}
						this.ordersList = res.data;
						this.coverImg = res.data.coverImg;
					}
					uni.hideLoading();
				});
			},
			shopCartShare: function(type) {
				let token = this.$queue.getData('token');
				let userId = this.$queue.getData('userId');
				if (token) {
					this.$queue.remove("userByinvitationId");
					if (this.ordersList.goods.attr.length > 0) {
						if (this.checkString == '' || !this.CheckattrValue) {
							this.$queue.showToast('请选择正确的商品规格');
							return;
						}
						var groupPinkId = this.groupPinkId;
						this.hindPopus();
						if (this.ShopCartOrMoney == '立即购买') {
							uni.navigateTo({
								url: '../member/order?id=' + this.ordersId + '&userByinvitationId=' +
									this.userByinvitationId +
									'&numberMoney=' + this.numberMoney1 + '&checkString=' + this
									.checkString + '&number=' + this.number +
									'&money=' + this.numberMoney + '&skuId=' + this.skuId +
									'&attrValuecoverImg=' + this.attrValuecoverImg +
									'&className=pintuan&groupPinkId=' + groupPinkId + '&title=' + this
									.ordersList.title
							});
						}
					} else {
						this.numberMoney1 = this.ordersList.sku[0].pinkPrice;
						if (this.ordersList.sku[0].pinkStock > 0) {
							if (this.ShopCartOrMoney == '立即购买') {
								uni.navigateTo({
									url: '../member/order?id=' + this.ordersId +
										'&userByinvitationId=' + this.userByinvitationId +
										'&numberMoney=' + this.numberMoney1 + '&checkString=&number=' +
										this.number +
										'&money=' + this.numberMoney1 + '&skuId=' + this.skuId +
										'&attrValuecoverImg=' + this.attrValuecoverImg +
										'&className=pintuan&groupPinkId=' + this.groupPinkId +
										'&title=' + this.ordersList.title
								});
							}
						} else {
							this.$queue.showToast('库存不足无法购买商品');
						}
					}
				} else {
					this.loginS();
				}
			},
			loginS() {
				uni.navigateTo({
					url: '/pages/member/register'
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../../../static/css/index.css';

	page {
		background: #f8f8f8;
	}

	.pintuan_message {
		background: #FFFFFF;
		padding: 30upx;
		margin-top: 20upx;
		color: #A1A1A1;
		font-size: 24upx;

		.message_item {
			margin-top: 10upx;
		}

		.message_title {
			width: 100%;
			text-align: center;
			font-size: 30upx;
			color: #000000;
		}
	}

	.shop_pintuan {
		margin-top: 20upx;
		background: #FFFFFF;
		padding: 30upx;

		.endNum_text {
			margin-top: 50upx;
			width: 100%;
			text-align: center;
		}

		.pintuan_btn {
			width: 92%;
			margin: 30upx;
			text-align: center;
			height: 80upx;
			line-height: 80upx;
			color: #FFFFFF;
			background: #F43B0A;
			border-radius: 50upx;
		}

		.more {
			width: 100upx;
			height: 100upx;
			border-radius: 100upx;
			border: 1px dashed rgba(187, 187, 187, 100);
			text-align: center;
			line-height: 100upx;
			color: #888888;
		}

		.person_imgeView {
			width: 120upx;
			height: 120upx;

			.tuanzhang {
				background: #EFAE55;
				padding: 0upx 10upx;
				color: #FFFFFF;
				border-radius: 20upx;
				position: absolute;
				z-index: 1;
				font-size: 22upx;
				align-items: center;
				height: 36upx;
				line-height: 36upx;
			}

			image {
				position: absolute;
				width: 100upx;
				height: 100upx;
				border-radius: 50upx;
			}
		}

		.pintuan_person {
			display: flex;
			width: 100%;
			justify-content: center;
			margin-top: 45upx;
		}

		.endTime_view {
			display: flex;
			width: 100%;
			justify-content: center;
			align-items: flex-end;

			.coutdown_view {
				height: 50upx;
				align-items: flex-end;
				text-align: end;
				font-size: 30upx;
				margin-left: 10upx;
			}
		}
	}

	.shop_top {
		display: flex;
		background: #FFFFFF;
		padding: 20upx;
		width: 100%;

		.left {
			width: 25%;
		}

		.right {
			margin-left: 20upx;
			width: 75%;

			.right_view {
				width: 100%;
				margin-top: 25upx;
				display: flex;

				.sales {
					width: 30%;
					display: flex;
					text-align: right;
					color: #888888;
					align-items: center;
					font-size: 24upx;
				}

				.right_top {
					width: 70%;
					display: flex;
					color: #F43B0A;
					align-items: center;

					.oldMoney {
						font-size: 24upx;
						color: #888888;
						text-decoration: line-through;
						margin-left: 16upx;
					}
				}
			}
		}

		image {
			width: 160upx;
			height: 160upx;
		}
	}

	.limapboxqing2 {
		height: 80upx;
		font-size: 32upx;
		color: #333333;
		font-weight: bold;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
</style>
