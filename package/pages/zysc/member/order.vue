<template>
	<view>
		<view v-if="isExpress === 1"
			style="width: 700upx;height: 130upx;background: #FFFFFF;margin: 20upx 30upx 20upx 27upx; padding: 10upx;border-radius: 15upx;"
			@tap='goEditAddress'>
			<view style="display: flex;margin: 10upx 0 0 20upx;align-items: center;">
				<image src="https://api.shengqianxiong.com.cn/img/20201118/276b48a6ab854b64bcfbd5377b5f5901.png"
					style="width: 80upx; height: 80upx;margin-top: 10upx;"></image>
				<view style="margin-left: 20upx;width: 80%;" v-if="checkAddress">
					<view style="display: flex;">
						<view style="font-size: 32upx;color: #333333;margin-top: 10rpx;">{{consignee}}</view>
						<view style="font-size: 28upx;color: #999999;margin-left: 10upx;margin-top: 10rpx;">{{mobile}}
						</view>
					</view>
					<view v-if="consignee"
						style="margin-top: 10upx;font-size: 30upx;color: #333333;width: 90%; white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
						{{provinces}}{{detail}}
					</view>
				</view>
				<view v-if="checkAddress == false" style="margin-left: 20upx;width: 80%;">
					暂无地址信息，请添加地址信息</view>
				<image src="https://api.shengqianxiong.com.cn/img/20201112/e0eb6f49777b4b3293d402cb2f991eb5.png"
					style="width: 17upx;height: 28upx;"></image>
			</view>
		</view>

		<view
			style="width: 700upx;height: max-content;background: #FFFFFF;margin: 20upx 30upx 20upx 27upx; padding: 10upx;border-radius: 15upx;">
			<view style="display: flex;padding: 20upx;">
				<image :src="attrValuecoverImg" style="width: 200upx; height: 200upx;border-radius: 4upx;"></image>
				<view style="width: 65%;margin-left: 20upx;">
					<view
						style="font-size: 32upx;color: #333333;height: 84upx;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;">
						{{title}}
					</view>
					<view style="display: flex;width: 70%;" v-if="checkString != ''">
						<view style="font-size: 24upx;color: #333333;margin-top: 25upx;">商品规格:</view>
						<view style="font-size: 24upx;color: #333333;margin-top: 25upx;margin-left: 15upx;">
							{{checkString}}
						</view>
					</view>
					<view style="display: flex;">
						<view
							:style="checkString != '' ? 'display: flex;width: 70%;;' : 'display: flex;width: 70%;margin-top: 50upx;'">
							<view v-if="className != 'jifen'"
								style="font-size: 30upx;color: #333333;margin-top: 35upx;">¥ {{money}}</view>
							<view v-else style="font-size: 30upx;color: #333333;margin-top: 35upx;">{{money}}</view>
							<view style="font-size: 26upx;color: #666666;margin-top: 35upx;margin-left: 10upx;">
								x{{number}}</view>
						</view>
						<!-- <view v-if="className == '' && isExpress === 1 && checkString == ''"
							style="width:200upx;height: 60upx;display: flex;margin-top: 60upx;border-radius: 5upx;border:1px solid #c3c3c3;">
							<view
								style="border-right:1px solid #c3c3c3;width: 70upx;color: #999999;text-align: center;padding-top: 10upx;"
								@click="jian">-</view>
							<view
								style="width: 80upx;text-align: center;font-size: 30upx;color: #333333;margin-top: 10upx;">
								{{number}}
							</view>
							<view
								style="border-left:1px solid #c3c3c3;width: 70upx;color: #999999;text-align: center;padding-top: 10upx"
								@click="jia">+</view>
						</view> -->
					</view>
				</view>
			</view>
			<view style="display: flex;padding: 20upx 20upx;">
				<view style="font-size: 32upx;color: #333333;width: 25%;">快递</view>
				<view style="font-size: 30upx;color: #999999;margin-left: 5upx;width: 40%;">
					{{postagePrice == 0 ? '包邮' : postagePrice + '元'}}
				</view>
			</view>
			<!-- 领劵start -->
			<view v-if="className != 'pintuan' && className != 'miaosha' && CouponIssueList.length> 0"
				style="display: flex;padding: 10upx 20upx;" @tap='showLingJuan()'>
				<view style="font-size: 32upx;color: #333333;width: 25%;">优惠券</view>
				<view style="font-size: 30upx;color: #FF3737;margin-left: 5upx;width: 40%;">{{couponName}}</view>
			</view>
			<!-- 领劵end -->
			<view style="display: flex;padding: 15upx 20upx">
				<view style="font-size: 32upx;color: #333333;width: 25%;">订单备注</view>
				<input type="text" style="width: 70%;font-size: 30upx;color: #999999;margin-left: 5upx;"
					v-model="descrition" placeholder="选填" />
			</view>
		</view>
		<uni-popup ref="popusLingJuan" type="bottom">
			<view
				style="width: 100%;height: 1000rpx;background: #FFFFFF;border-top-left-radius: 20upx;border-top-right-radius: 20upx;padding: 40upx;">
				<view style="width: 100%;text-align: center;font-size: 32rpx;color: #DD514C;">优惠明细</view>
				<scroll-view scroll-y="true" style="height: 900rpx;">
					<view style="width: 100%;text-align: center;" v-for='(item,index) in CouponIssueList' :key='index'>
						<view
							style="background: #fcf3e8;width: 100%;height: 130rpx;border-radius: 10rpx;margin-top: 20rpx;">
							<view style="display: flex;color: #e23922;">
								<view
									style="line-height: 130rpx;margin-left: 0rpx;font-size: 40rpx;color: #e23922;font-weight: 600;width: 150rpx;">
									<text style="font-size: 20upx;">￥</text>{{item.lessMoney}}
								</view>
								<view style="margin-left: 20rpx;">
									<view style="margin-top: 25rpx;text-align: left;">
										满{{item.minMoney}}减{{item.lessMoney}}</view>
									<view style="margin-top: 10rpx;font-size: 26rpx;">截止：{{item.failureTime}}</view>
								</view>
								<view
									style="height: 105rpx;width: 2rpx;background: #e23922;margin-left: 20rpx;margin-top: 15rpx;">
								</view>
								<view
									style="color: #e23922;line-height: 130rpx;height: 130rpx;width: 145rpx;font-weight: 600;"
									@tap='lingJuan(item)'>立即使用</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</uni-popup>
		<view style="display: flex;background-color: #FFFFFF;width: 100%;height: 100upx;position: fixed;bottom: 0upx;">
			<view style="display: flex;font-size: 28upx;color: #333333;padding: 25upx 0 10upx 20upx;width: 60%;">
				<view v-if="className != 'jifen'" style="font-size: 28upx;color: #333333;padding: 5upx 0 10upx 10upx;">
					总金额：</view>
				<view v-if="className != 'jifen'" style="font-size: 40upx;color: #FF3737;padding: 0upx 0 10upx 10upx;">
					¥{{price + postagePrice}}</view>
				<view v-if="className === 'jifen'" style="font-size: 40upx;color: #FF3737;padding: 0upx 0 10upx 10upx;">
					{{price}}
					<text style="font-size: 28rpx;">积分</text>
				</view>
			</view>
			<button
				style="border-radius: 0;background-color: #FF332F;width: 300upx;font-size: 36upx;color: #FFFFFF;text-align: center;line-height: 100rpx;"
				@tap='goPay'>提交订单</button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				descrition: '',
				number: 1,
				money: 0,
				checkGoodsstatus: 0,
				consignee: '',
				provinces: '',
				commissionPrice: 0,
				id: 0,
				price: 0,
				couponName: '点击选择优惠券',
				couponUserId: '',
				postagePrice: 0,
				title: '',
				CouponIssueList: [],
				attrValuecoverImg: '',
				isExpress: 0,
				checkString: '',
				detail: '',
				skuId: 0,
				lessMoney: 0,
				groupPinkId: '',
				mobile: '',
				jianMoney: 0,
				list: {},
				editAddress: {},
				className: '',
				userByinvitationId: '',
				checkAddress: false
			}
		},
		onShow() {
			this.editAddress = this.$queue.getData('EditAddress');
			if (this.editAddress) {
				this.checkAddress = true;
				this.detail = this.editAddress.detail;
				this.consignee = this.editAddress.consignee;
				this.mobile = this.editAddress.mobile;
				this.provinces = this.editAddress.provinces;
			} else {
				this.getAddressList();
			}
		},
		onLoad(d) {
			if (d.id) {
				this.className = d.className;
				this.id = d.id;
				this.groupPinkId = d.groupPinkId;
				if (d.userByinvitationId) {
					this.userByinvitationId = d.userByinvitationId;
				}
				if (d.checkString) {
					this.money = d.numberMoney;
					this.checkString = d.checkString;
					this.number = d.number;
					this.price = parseFloat(d.money);
					this.skuId = d.skuId;
					this.attrValuecoverImg = d.attrValuecoverImg;
				} else {
					this.number = 1;
					this.price = parseFloat(d.money);
					this.money = d.numberMoney;
				}
				this.jianMoney = this.price;
				this.getCommondityList(d.id);
				this.getCouponIssueList(d.id);
			}
		},
		methods: {
			lingJuan(item) {
				var money = item.minMoney;
				if (this.price >= money) {
					this.couponName = '-￥' + item.lessMoney;
					this.couponUserId = item.couponUserId;
					this.lessMoney = item.lessMoney;
					this.price = parseFloat(this.numFilter(parseFloat(this.jianMoney) - parseFloat(item.lessMoney)));
					this.$refs.popusLingJuan.close();
				} else {
					this.$queue.showToast('您不满足使用此劵的资格');
				}
			},
			numFilter(value) {
				// 截取当前数据到小数点后三位
				let tempVal = parseFloat(value).toFixed(3)
				let realVal = tempVal.substring(0, tempVal.length - 1)
				return realVal
			},
			getCouponIssueList(goodsId) {
				let userId = this.$queue.getData('userId');
				this.$Request.getT('/selfCouponUser/useList?goodsId=' + goodsId + '&userId=' + userId).then(res => {
					if (res.status === 0) {
						res.data.forEach(d => {
							this.CouponIssueList.push(d);
						});
					}
				});
			},
			showLingJuan() {
				this.$refs.popusLingJuan.open();
			},
			getCommondityList(id) {
				uni.showLoading({
					title: '加载中...'
				});
				if (this.className === 'pintuan') {
					this.$Request.getT('/selfGroup/find?id=' + id).then(res => {
						if (res.status === 0) {
							this.attrValuecoverImg = res.data.coverImg;
							this.isExpress = res.data.goods.isExpress;
							this.checkGoodsstatus = res.data.goods.status;
							this.list = res.data;
							let relation_id = this.$queue.getData('relation_id');
							this.title = this.list.title;
							if (this.list.postagePrice) {
								this.postagePrice = this.list.postagePrice;
							} else {
								this.postagePrice = 0;
							}

							this.commissionPrice = parseFloat(this.list.commissionPrice);
						}
						uni.hideLoading();
					});
				} else if (this.className === 'miaosha') {
					this.$Request.getT('/selfSecKill/find?id=' + id).then(res => {
						if (res.status === 0) {
							this.attrValuecoverImg = res.data.coverImg;
							this.isExpress = res.data.goods.isExpress;
							this.checkGoodsstatus = res.data.goods.status;
							this.list = res.data;
							let relation_id = this.$queue.getData('relation_id');
							this.title = this.list.title;
							if (this.list.postagePrice) {
								this.postagePrice = this.list.postagePrice;
							} else {
								this.postagePrice = 0;
							}
							this.commissionPrice = parseFloat(this.list.commissionPrice);
						}
						uni.hideLoading();
					});
				} else {
					this.$Request.getT('/goods/find?id=' + id).then(res => {
						if (res.status === 0) {
							this.list = res.data;
							let relation_id = this.$queue.getData('relation_id');
							this.attrValuecoverImg = res.data.coverImg;
							this.checkGoodsstatus = res.data.status;
							if (this.checkString == '') {
								if (this.className != 'jifen') {
									if (relation_id && relation_id !== 'undefined') {
										this.price = parseFloat(this.list.sku[0].memberPrice);
										this.money = parseFloat(this.list.sku[0].memberPrice);
									} else {
										this.price = parseFloat(this.list.sku[0].skuPrice);
										this.money = parseFloat(this.list.sku[0].skuPrice);
									}
								} else {
									this.price = parseFloat(this.list.sku[0].skuPrice);
									this.money = parseFloat(this.list.sku[0].skuPrice);
								}
							}
							this.isExpress = res.data.isExpress;
							this.title = this.list.title;
							if (this.list.postagePrice) {
								this.postagePrice = this.list.postagePrice;
							} else {
								this.postagePrice = 0;
							}
							this.commissionPrice = parseFloat(this.list.commissionPrice);
						}
						uni.hideLoading();
					});
				}
			},
			getAddressList() {
				let userId = this.$queue.getData('userId');
				this.$Request.getT('/address/findDefaultByUserId?userId=' + userId).then(res => {
					if (res.status === 0) {
						if (res.data) {
							this.checkAddress = true;
							this.detail = res.data.detail;
							this.consignee = res.data.consignee;
							this.mobile = res.data.mobile;
							this.provinces = res.data.provinces;
						} else {
							this.checkAddress = false;
						}
					} else {
						this.checkAddress = false;
					}
				});
			},
			goPay() {
				if (!this.checkAddress && this.isExpress === 1) {
					this.$queue.showToast('请设置收货地址信息');
					return;
				}

				if (this.checkGoodsstatus != 1) {
					this.$queue.showToast('商品已下架无法购买！');
					return;
				}

				let userId = this.$queue.getData('userId');
				if (this.skuId === 0) {
					this.skuId = this.list.sku[0].id;
				}

				var orderType = '1'; //1普通订单 2拼团 3秒杀
				var type = '';
				var status = '';
				var secKillId = '';
				var groupId = '';
				var goodsId = '';
				var storeId = '';
				var merchantId = '';
				var storeName = '';
				var isExpress = '';
				var commissionPrice = '';
				let grade = this.$queue.getData('grade');
				if (this.className === 'pintuan') {
					orderType = '2';
					status = '9';
					type = this.list.goods.type.id;
					merchantId = this.list.goods.merchantId;
					storeId = this.list.goods.storeId;
					storeName = this.list.goods.storeName;
					groupId = this.list.id;
					isExpress = '1';
					goodsId = this.list.goodsId;
					commissionPrice = ((parseFloat(this.price) * parseFloat(this.commissionPrice)) * parseFloat(grade))
						.toFixed(2);
				} else if (this.className === 'miaosha') {
					orderType = '3';
					status = '1';
					type = this.list.goods.type.id;
					storeId = this.list.goods.storeId;
					storeName = this.list.goods.storeName;
					merchantId = this.list.goods.merchantId;
					secKillId = this.list.secKillId;
					isExpress = '1';
					groupId = this.list.secKillId;
					goodsId = this.list.goodsId;
					commissionPrice = ((parseFloat(this.price) * parseFloat(this.commissionPrice)) * parseFloat(grade))
						.toFixed(2);
				} else if (this.className === 'jifen') {
					orderType = '4';
					status = '1';
					type = '';
					goodsId = this.list.id;
					isExpress = this.isExpress;
				} else {
					status = '1';
					storeId = this.list.storeId;
					if (this.list.store) {
						storeName = this.list.store.storeName;
						merchantId = this.list.store.merchantId;
					}
					type = this.list.type.id;
					isExpress = this.isExpress;
					goodsId = this.list.id;
					commissionPrice = ((parseFloat(this.price) * parseFloat(this.commissionPrice)) * parseFloat(grade))
						.toFixed(2);
				}
				let data = {
					userId: userId,
					status: status,
					consignee: this.consignee,
					mobile: this.mobile,
					provinces: this.provinces,
					detail: this.detail,
					type: type,
					secKillId: secKillId,
					groupPinkId: this.groupPinkId,
					orderType: orderType,
					storeId: storeId,
					storeName: storeName,
					merchantId: merchantId,
					title: this.list.title,
					groupId: groupId,
					couponMoney: this.lessMoney, //这个是优惠券金额，替换了descrition的值描述
					userCouponsId: this.couponUserId,
					goodsId: goodsId,
					img: this.attrValuecoverImg,
					isExpress: isExpress,
					descrition: this.descrition,
					skuId: this.skuId,
					price: this.money,
					number: this.number,
					postagePrice: this.postagePrice,
					payMoney: this.price + this.postagePrice,
					relationId: this.userByinvitationId,
					detailJson: this.checkString,
					commissionPrice: commissionPrice,
					storeMoney: this.price - (this.price * this.commissionPrice)
				}
				this.$Request.postJson('/orders/save', data).then(res => {
					if (res.status === 0) {
						uni.redirectTo({
							url: '../my/payment?money=' + this.price + '&title=' + this.list.title +
								'&img=' + this.list.img + '&id=' +
								res.data.id + '&orderType=' + orderType
						});
					} else {
						this.$queue.showToast(res.msg);
					}
				});
			},
			goEditAddress() {
				uni.navigateTo({
					url: '../my/myaddress'
				});
			},
			jian() {
				if (this.number != 1) {
					let number = this.number - 1
					this.number = number
					// this.price = parseFloat(this.price - this.money).toFixed(1);
					this.price = parseFloat(this.numFilter(parseFloat(this.price) - parseFloat(this.money)));
				}
			},
			jia() {
				let number = this.number + 1
				this.number = number
				this.price = parseFloat(this.numFilter(parseFloat(this.money) * parseFloat(number)));
				// this.price = parseFloat(this.money * number).toFixed(1);
			}
		}
	}
</script>

<style scoped>
	page {
		background: #F2F2F2;
	}

	.topic_cont_text {
		padding: 30upx;
		colof: #999;
		background: #E1FFFF;
		max-height: 130upx;
		overflow: hidden;
		word-break: break-all;
		/* break-all(允许在单词内换行。) */
		text-overflow: ellipsis;
		/* 超出部分省略号 */
		display: -webkit-box;
		/** 对象作为伸缩盒子模型显示 **/
		-webkit-box-orient: vertical;
		/** 设置或检索伸缩盒对象的子元素的排列方式 **/
		-webkit-line-clamp: 2;
		/** 显示的行数 **/
	}
</style>
