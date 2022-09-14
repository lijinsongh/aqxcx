<template>
	<view>
		<view
			style="width: 710upx;height: 180upx;background: #FFFFFF;margin: 30upx 20upx 30upx 23upx; padding: 20upx;border-radius: 15upx;">
			<view style="display: flex;margin: 15upx 0 0 20upx;">
				<image :src="image" style="width: 20%; height: 120upx;border-radius: 4upx;"></image>
				<view style="margin-left: 20upx;width: 70%;">
					<view style="font-size: 28upx;color: #FF332F;font-weight: bold;margin-top: 10upx;">¥ {{money}}
					</view>
					<view
						style="width: 100%;margin-top: 20upx;font-size: 28upx;color: #333333;font-weight: bold;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
						{{title}}
					</view>
				</view>
			</view>
		</view>

		<view style="width: 710upx;background: #FFFFFF;margin: 30upx 20upx; border-radius: 15upx;"
			v-if="payList.length > 0">
			<view style="display: flex;margin: 0upx 0 0 30upx;align-items: center;" v-for="(item,index) in payList"
				:key='index'>
				<view style="display: flex;width: 100%;padding: 20upx;height: 90rpx;"
					v-if="item.name != '钱包零钱' && item.name != '积分'">
					<image :src="item.image" style="width: 50upx;height: 50upx;border-radius: 50upx;"></image>
					<view style="font-size: 28upx;color: #333333;margin-left: 20upx;width: 70%;">{{item.name}}</view>
					<radio-group name="openWay" style="margin-left: 40upx;" @tap='selectWay(item.id)'>
						<label class="tui-radio">
							<radio color="#FF332F" :checked="openWay === item.id ? true : false" />
						</label>
					</radio-group>
				</view>
				<view style="display: flex;width: 100%;padding: 20upx;height: 90rpx;"
					v-if="lingqian != 0 && item.name == '钱包零钱'">
					<image :src="item.image" style="width: 50upx;height: 50upx;border-radius: 50upx;"></image>
					<view style="font-size: 28upx;color: #333333;margin-left: 20upx;width: 70%;">
						{{item.name}}({{lingqian}})
					</view>
					<radio-group name="openWay" style="margin-left: 40upx;" @tap='selectWay(item.id)'>
						<label class="tui-radio">
							<radio color="#FF332F" :checked="openWay === item.id ? true : false" />
						</label>
					</radio-group>
				</view>
				<view style="display: flex;width: 100%;padding: 20upx;height: 90rpx;"
					v-if="total != 0 && item.name == '积分'">
					<image :src="item.image" style="width: 50upx;height: 50upx;border-radius: 50upx;"></image>
					<view style="font-size: 28upx;color: #333333;margin-left: 20upx;width: 70%;">
						{{item.name}}({{total}})
					</view>
					<radio-group name="openWay" style="margin-left: 40upx;" @tap='selectWay(item.id)'>
						<label class="tui-radio">
							<radio color="#FF332F" :checked="openWay === item.id ? true : false" />
						</label>
					</radio-group>
				</view>
			</view>
		</view>

		<button v-if="payList.length > 0"
			style="background-color: #FF332F;width: 700upx;height: 80upx;font-size: 28upx;color: #FFFFFF;text-align: center;margin: 70upx 20upx;border-radius: 50upx;padding-top: 5upx;"
			@tap='goPay'>确定支付</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				openWay: 0,
				money: 0,
				payMoney: 0,
				total: 0,
				lingqian: 0.00,
				title: '',
				image: '',
				id: '',
				payNum: '',
				providerList: [],
				lingqianImage: 'https://api.shengqianxiong.com.cn/app-image/lingqian.png',
				zhifubaoImage: 'https://api.shengqianxiong.com.cn/img/20201215/1137f42c4cf84c6f94f2662c8dabea8a.png',
				payList: []
			}
		},
		onBackPress(event) {
			console.log(this.id);
			if (event.from == 'backbutton') {
				uni.showModal({
					title: '温馨提示',
					content: '订单尚未完成支付,确认退出吗?',
					showCancel: true,
					cancelText: '继续支付',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							uni.redirectTo({
								url: '../member/orderdetail?id=' + this.id
							});
						}
					}
				});
				return true; //阻止默认返回行为
			}
		},
		onLoad(d) {
			this.getlingqian();
			this.orderType = d.orderType;
			if (this.orderType != 4) {
				// #ifdef H5
				let target = navigator.userAgent.toLowerCase();
				let isWeixin = (/micromessenger/.test(target)) ? true : false;
				this.payList = [];
				if (isWeixin) {
					this.openWay = 0;
					let data = [{
							id: 0,
							image: 'https://api.shengqianxiong.com.cn/img/20201216/206743676c7c4fb999ed1cb8c123a18b.png',
							name: '微信'
						},
						{
							id: 2,
							image: this.lingqianImage,
							name: '钱包零钱'
						}
					]
					this.payList = data;
				} else {
					this.openWay = 0;
					let data = [{
						id: 0,
						image: 'https://api.shengqianxiong.com.cn/img/20201216/206743676c7c4fb999ed1cb8c123a18b.png',
						name: '微信'
					}, {
						id: 1,
						image: this.zhifubaoImage,
						name: '支付宝'
					}, {
						id: 2,
						image: this.lingqianImage,
						name: '钱包零钱'
					}]
					this.payList = data;
				}
				// #endif
				// #ifdef APP-PLUS
				this.openWay = 0;
				let data = [{
						id: 0,
						image: 'https://api.shengqianxiong.com.cn/img/20201216/206743676c7c4fb999ed1cb8c123a18b.png',
						name: '微信'
					}, {
						id: 1,
						image: this.zhifubaoImage,
						name: '支付宝'
					},
					{
						id: 2,
						image: this.lingqianImage,
						name: '钱包零钱'
					}
				]
				this.payList = data;
				// #endif
				// #ifdef MP-WEIXIN
				this.openWay = 0;
				let data = [{
						id: 0,
						image: 'https://api.shengqianxiong.com.cn/img/20201216/206743676c7c4fb999ed1cb8c123a18b.png',
						name: '微信'
					},
					{
						id: 2,
						image: this.lingqianImage,
						name: '钱包零钱'
					}
				]
				this.payList = data;
				// #endif
			} else {
				let userId = this.$queue.getData('userId');
				this.getUserInfo(userId);
				this.openWay = 3;
				let data = [{
					id: 3,
					image: this.lingqianImage,
					name: '积分'
				}]
				this.payList = data;
			}
			if (d) {
				this.id = d.id;
				this.getCheckPay(d.id);
				this.getCommondityList(d.id);
			}
			uni.getProvider({
				service: 'payment',
				success: e => {
					let providerList = [];
					e.provider.map(value => {
						switch (value) {
							case 'wxpay':
								providerList.push({
									name: '微信',
									id: value,
									loading: false
								});
								break;
							default:
								break;
						}
					});
					this.providerList = providerList;
				},
				fail: e => {
					console.log('获取支付通道失败：', e);
				}
			});
		},
		methods: {
			//获取用户信息
			getUserInfo(userId) {
				this.$Request.getT('/user/' + userId).then(res => {
					if (res.status === 0) {
						if (res.data.orderJifen) {
							this.total = parseFloat(res.data.orderJifen).toFixed(0);
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
			getlingqian() {
				let userId = this.$queue.getData('userId');
				this.$Request.getT("/cash/money/" + userId).then(res => {
					if (res.status === 0 && res.data) {
						this.lingqian = parseFloat(res.data).toFixed(2);
					} else if (res.status === -102) {
						this.$queue.showToast(res.msg);
						this.$queue.logout();
						uni.navigateTo({
							url: '/pages/member/register'
						});
					} else {
						this.lingqian = '0.00';
					}
				});
			},
			getCheckPay(id) {
				this.$Request.getT('/orders/wxPay?ordersId=' + id).then(res => {
					if (res.status === 0) {
						uni.redirectTo({
							url: './myList'
						});
					}
				});
			},
			getCommondityList(id) {
				uni.showLoading({
					title: '加载中...'
				});
				this.$Request.getT('/orders/find?id=' + id).then(res => {
					if (res.status === 0) {
						this.image = res.data.img;
						this.money = res.data.payMoney;
						this.title = res.data.title;
						this.payNum = res.data.payNum;
						this.payMoney = res.data.payMoney;
					}
					uni.hideLoading();
				});
			},
			selectWay: function(id) {
				this.openWay = id;
			},
			goPay() {
				let userId = this.$queue.getData('userId');
				uni.showLoading({
					title: '支付中'
				});
				if (this.openWay === 0) {
					let that = this;
					// #ifdef MP-WEIXIN
					this.$Request.postJson('/pay/wxPayMp?ordersId=' + this.id + '&userId=' + userId).then(
						res => {
							uni.requestPayment({
								provider: 'wxpay',
								timeStamp: res.timestamp,
								nonceStr: res.noncestr,
								package: res.package,
								signType: res.signType,
								paySign: res.sign,
								success: function(res) {
									uni.showLoading({
										title: '支付成功'
									});
									uni.hideLoading();
									setTimeout(() => {
										uni.redirectTo({
											url: '/package/pages/zysc/my/myList'
										});
									}, 1000);
								},
								fail: function(err) {
									uni.hideLoading();
									that.$queue.showToast('支付失败');
									setTimeout(() => {
										uni.redirectTo({
											url: '/package/pages/zysc/my/myList'
										});
									}, 1000);
								}
							});
						});
					// #endif


					// #ifdef H5
					let target = navigator.userAgent.toLowerCase();
					let isWeixin = (/micromessenger/.test(target)) ? true : false;
					if (isWeixin) {
						this.$Request.postJson('/pay/wxPayWeb?payNum=' + this.payNum + '&userId=' + userId + '&payMoney=' +
								this.payMoney)
							.then(
								res => {
									that.callPay(res);
								});
					} else {

						this.$Request.postJson('/pay/wxH5Pay?payNum=' + this.payNum + '&userId=' + userId + '&payMoney=' +
								this.payMoney)
							.then(
								res => {
									const urlArr = window.location.href;
									const hostUrl = urlArr.split("/");
									const callBack = hostUrl[0] + "//" + hostUrl[2] + "/";
									const url = '&redirect_url=' + callBack + 'pages/zysc/my/myList';
									window.location = res.mweb_url + url
								});

					}

					// #endif
					// #ifdef APP-PLUS
					this.$Request.postJson('/pay/wxPayApp?payNum=' + this.payNum + '&userId=' + userId + '&payMoney=' +
							this.payMoney)
						.then(
							res => {
								console.log(JSON.stringify(res))
								this.setPayment('wxpay', JSON.stringify(res));
							});
					// #endif
				} else if (this.openWay === 1) {
					// #ifdef H5
					this.$Request.getT('/aliPay/payH5?payNum=' + this.payNum + '&userId=' + userId + '&payMoney=' + this
						.payMoney).then(
						res => {
							const div = document.createElement('div')
							div.innerHTML = res.data //此处form就是后台返回接收到的数据
							document.body.appendChild(div)
							document.forms[0].submit()
						});
					// #endif
					// #ifdef APP-PLUS
					this.$Request.getT('/aliPay/payApp?payNum=' + this.payNum + '&userId=' + userId + '&payMoney=' + this
						.payMoney).then(
						res => {
							this.setPayment('alipay', res.data);
						});
					// #endif
				} else if (this.openWay === 2) {
					if (this.lingqian > 0) {
						this.$Request.getT('/orders/changePay?ordersId=' + this.id).then(res => {
							if (res.status === 0) {
								uni.hideLoading();
								this.$queue.showToast('支付成功');
								setTimeout(function() {
									uni.hideLoading();
									uni.redirectTo({
										url: './myList'
									});
								}, 1000);
							} else {
								uni.hideLoading();
								this.$queue.showToast(res.msg);
							}
						});
					} else {
						this.$queue.showToast('零钱余额为空，请前往微信打开进行支付');
					}
				} else if (this.openWay === 3) { //零钱支付
					if (this.total > 0) {
						this.$Request.getT('/orders/jiFenPay?ordersId=' + this.id).then(res => {
							if (res.status === 0) {
								uni.hideLoading();
								this.$queue.showToast('支付成功');
								setTimeout(function() {
									uni.hideLoading();
									uni.redirectTo({
										url: './myList'
									});
								}, 1000);
							} else {
								uni.hideLoading();
								this.$queue.showToast(res.msg);
							}
						});
					} else {
						this.$queue.showToast('积分余额为空!');
					}
				}
			},
			callPay: function(response) {
				if (typeof WeixinJSBridge === "undefined") {
					if (document.addEventListener) {
						document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady(response), false);
					} else if (document.attachEvent) {
						document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady(response));
						document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady(response));
					}
				} else {
					this.onBridgeReady(response);
				}
			},
			onBridgeReady: function(response) {
				let that = this;
				if (!response.package) {
					return;
				}
				WeixinJSBridge.invoke(
					'getBrandWCPayRequest', {
						"appId": response.appid, //公众号名称，由商户传入
						"timeStamp": response.timestamp, //时间戳，自1970年以来的秒数
						"nonceStr": response.noncestr, //随机串
						"package": response.package,
						"signType": response.signType, //微信签名方式：
						"paySign": response.sign //微信签名
					},
					function(res) {
						if (res.err_msg === "get_brand_wcpay_request:ok") {
							// 使用以上方式判断前端返回,微信团队郑重提示：
							//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
							uni.showLoading({
								title: '支付成功'
							});
							setTimeout(function() {
								uni.hideLoading();
								uni.redirectTo({
									url: './myList'
								});
							}, 1000);
						} else {
							uni.hideLoading();
						}
						WeixinJSBridge.log(response.err_msg);
					}
				);
			},
			setPayment(name, order) {
				let that = this;
				uni.requestPayment({
					provider: name,
					orderInfo: order, //微信、支付宝订单数据
					success: function(res) {
						uni.hideLoading();
						uni.showLoading({
							title: '支付成功'
						});
						setTimeout(function() {
							uni.hideLoading();
							uni.redirectTo({
								url: '../member/orderdetail?id=' + that.id
							});
						}, 1000);
					},
					fail: function(err) {
						uni.hideLoading();
						console.log(12)
					}
				});
			}
		}
	}
</script>

<style scoped>
	page {
		background: #F2F2F2;
	}
</style>
