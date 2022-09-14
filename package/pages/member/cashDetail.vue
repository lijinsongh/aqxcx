<template>
	<view class="cash">
		<view
			style="background-image: url(https://api.shengqianxiong.com.cn/img/20201217/bd7a8d9e78f34c9893622fb44b4787fd.png);background-size: 100%;height: 400upx;">
			<view style="font-size: 32upx;color: #FFFFFF;padding-top: 100upx;">可提现总额</view>
			<view style="font-size: 40upx;color: #FFFFFF;padding-top: 20upx;">¥ {{mayMoney}}</view>

			<view
				style="width: 90%;height: max-content;margin-left: 40upx;background-color: #FFFFFF;box-shadow: rgba(183, 183, 183, 0.3) 0px 1px 10px;margin-top: 50upx;border-radius: 20upx;">
				<view style="display: flex;flex-direction: row;padding: 20upx;">
					<view style="font-size: 32upx;color: #333333;">提现金额 <text style="font-size: 28upx;color: #FF2638;"
							v-if="shouxufei">（注：提现手续费为{{shouxufei * 100}}%）</text>
					</view>
				</view>
				<view style="display: flex;flex-direction: row;padding: 20upx;">
					<view style="font-size: 40upx;color: #333333;">¥</view>
					<input type="number" v-model="money" placeholder="请输入金额"
						style="font-size: 40upx;color: #333333;text-align: left;margin-left: 10upx;width: 100%;" />
				</view>
				<view style="background: #E6E6E6;width: 100%;height: 1upx;"></view>
				<view style="display: flex;flex-direction: row;flex-wrap: wrap;">
					<view style="display: flex;flex-direction: row;" v-for="(item, index) in moneyList" :key="index">
						<view>
							<view style="padding: 20upx;" @click="getOut(true,item.money)">
								<view
									style="padding-top: 40upx;width: 180upx; height: 120upx;background-color: #FFFFFF;border:1px solid #FF2638;border-radius: 10upx;">
									{{ item.money }}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view style="display: flex;flex-direction: row;flex-wrap: wrap;margin-top: 20upx;"
				v-if="zhifubaoTiXian && weixinTiXian">
				<view style="display: flex;flex-direction: row;">
					<view class="zhifuSlect_btn" @tap="zhifuSelectTap(1)" v-if="zhifubaoTiXian"
						:style="zhifuSelect == 1 ? 'border: 1px solid #FF2638;' : 'border: 1px solid #c8c8c8;'">
						<image src="https://taobao.xianmxkj.com/static/img/zysc/zhifubao.png"></image>
						<view style="margin-left:10upx">支付宝</view>
					</view>
					<view class="zhifuSlect_btn" @tap="zhifuSelectTap(3)" v-if="weixinTiXian"
						:style="zhifuSelect == 3 ? 'border: 1px solid #FF2638;' : 'border: 1px solid #c8c8c8;'">
						<image src="https://taobao.xianmxkj.com/static/share/icon_weixin.png"></image>
						<view style="margin-left:10upx">微信</view>
					</view>
				</view>
			</view>
			<view @click="getOut(false)"
				style="margin: 32upx;font-size: 18px;background: #FF2638;color: white;border-radius: 10px;height: 40px;line-height: 40px">
				提现
			</view>
			<view style="display: flex;width: 100%;justify-content: center;">
				<view style="color: grey;padding-bottom: 30px;padding-top: 20upx;flex: 1;" @click="goZhifuBao">提现账号
				</view>
				<view v-if="weixinTiXian" style="color: grey;padding-bottom: 30px;padding-top: 20upx;flex: 1;"
					@click="goWxImg()">微信收款码</view>
				<view style="color: grey;padding-bottom: 30px;padding-top: 20upx;flex: 1;" @click="goqianbao">钱包明细
				</view>
				<view style="color: grey;padding-bottom: 30px;padding-top: 20upx;flex: 1;" @click="gojilu">提现记录</view>
			</view>

			<!-- 微信收款码弹框 -->
			<view v-if="show" class="popup">
				<view class="padding">
					<view class="text-center text-lg text-bold flex justify-between">
						<view></view>
						<view>添加微信收款码</view>
						<view @click="show=false">X</view>
					</view>
					<!-- <view class="text-center padding-top-sm padding-bottom-lg" style="color: #999999;">请提交微信号和微信二维码
					</view> -->
					<view style="width: 80%;margin: 0 auto;">
						<view class="margin-top" @click.stop="addImages"
							style="border: 4rpx solid #010101;border-radius: 16rpx;overflow: hidden;">
							<image v-if="!wxImg" src="https://taobao.xianmxkj.com/static/erweima.png"></image>
							<image v-if="wxImg" :src="wxImg"></image>
						</view>
					</view>
					<view class="text-center margin-top-sm " @click="SaveWxImg"
						style="border-radius: 10rpx;background: #FF2638;color: white;height: 80rpx;line-height: 80rpx;">
						保存</view>
				</view>
			</view>

			<!-- <upopup v-model="show" mode="center" :closeable="true" close-icon-pos="top-right" close-icon="close-circle"
				close-icon-size="50" border-radius="20" width="80%" @close="closeWxImag">
				<view class="padding">
					<view class="text-center text-lg text-bold text-black">添加微信</view>
					<view class="text-center padding-top-sm padding-bottom-lg" style="color: red;">请提交微信收款二维码
					</view>
					<view style="width: 80%;margin: 0 auto;">
						<view class="margin-top-sm " @click="addImages"
							style="border: 4rpx solid #010101;border-radius: 16rpx;overflow: hidden;">
							<image v-if="!wxImg" src="../../static/erweima.png"></image>
							<image v-else :src="wxImg"></image>
						</view>
					</view>
					<view class="text-center margin-top-sm " @click="SaveWxImg"
						style="border-radius: 10rpx;background-color: #FF2638;color: #FFFFFF;height: 80rpx;line-height: 80rpx;">
						保存</view>
				</view>
			</upopup> -->
		</view>
	</view>
</template>

<script>
	import configdata from '@/common/config.js';
	export default {
		data() {
			return {
				wxImg: '',
				mywxImg: '',
				WxTXFangShi: 1,
				show: false,
				maxTiXian: 0,
				zhifuSelect: -1,
				weixinTiXian: false,
				zhifubaoTiXian: false,
				money: '',
				zhifubao: '',
				mayMoney: '0',
				zhifubaoName: '',
				shouxufei: '',
				moneyList: [{
						money: '10'
					},
					{
						money: '20'
					},
					{
						money: '50'
					},
					{
						money: '100'
					},
					{
						money: '200'
					},
					{
						money: '500'
					}
				],
				value: 0,
				min: ''
			};
		},
		onLoad: function() {
			this.getMoney();
			this.getuserinfo();
			this.$Request.getT('/common/type/107').then(res => {
				if (res.status == 0) {
					if (res.data && res.data.value) {
						this.shouxufei = res.data.value;
					}
				}
			});
			this.WxTXFangShi = this.$queue.getData('wxtxType');
		},
		onNavigationBarButtonTap() {
			this.list();
		},
		methods: {
			closeWxImag() {
				this.show = false;
			},
			goWxImg() {
				this.show = true;
			},
			SaveWxImg() {
				let that = this;
				this.$queue.showLoading('上传中...')
				let userId = this.$queue.getData('userId');
				if (this.wxImg == '') {
					uni.hideLoading();
					this.$queue.showToast('请上传微信二维码！')
					return;
				}

				let data = {
					wxImg: that.wxImg,
					userId: userId
				}
				that.$Request.postT('/user/updateUserWxImg', data).then(res => {
					uni.hideLoading();
					if (res.status == 0) {
						that.show = false;
						that.$queue.showToast('绑定成功！')
						that.$Request.getT('/cash/userinfo/' + userId).then(res => {
							if (res.status == 0) {
								that.mywxImg = res.data.wxImg ? res.data.wxImg : '';
							}
						});
					} else {
						that.$queue.showToast(res.msg)
					}
				});
			},
			// 图片上传
			addImages() {
				let that = this;
				uni.chooseImage({
					count: 1,
					sourceType: ['album', 'camera'],
					success: res => {
						for (let i = 0; i < 1; i++) {
							that.$queue.showLoading("上传中...");
							uni.uploadFile({ // 上传接口
								url: that.config("APIHOST1") + '/alioss/uploadUniApp', //真实的接口地址
								filePath: res.tempFilePaths[i],
								name: 'file',
								success: (uploadFileRes) => {
									uni.hideLoading();
									that.wxImg = uploadFileRes.data;
								}
							});
						}
					}
				})
			},
			config: function(name) {
				var info = null;
				if (name) {
					var name2 = name.split("."); //字符分割
					if (name2.length > 1) {
						info = configdata[name2[0]][name2[1]] || null;
					} else {
						info = configdata[name] || null;
					}
					if (info == null) {
						let web_config = cache.get("web_config");
						if (web_config) {
							if (name2.length > 1) {
								info = web_config[name2[0]][name2[1]] || null;
							} else {
								info = web_config[name] || null;
							}
						}
					}
				}
				return info;
			},
			zhifuSelectTap(index) {
				this.zhifuSelect = index;
			},
			gojilu() {
				uni.navigateTo({
					url: '/pages/member/cashList'
				});
			},
			goqianbao() {
				uni.navigateTo({
					url: './moneyList'
				});
			},
			list() {
				uni.navigateTo({
					url: '/pages/member/cashList'
				})
			},
			goZhifuBao() {
				uni.navigateTo({
					url: '/pages/member/zhifubao'
				});
			},
			getuserinfo(){
				let userId = this.$queue.getData('userId');
				this.$Request.getT("/cash/userinfo/" + userId).then(des => {
					if (des.status === 0 && des.data) {
						this.zhifubao = des.data.zhifubao;
						this.zhifubaoName = des.data.zhifubaoName;
						this.mywxImg = des.data.wxImg;
						this.wxImg = des.data.wxImg;
						if (des.data.openId) {
							// #ifndef APP-PLUS
							//是否开启微信提现
							this.$Request.getT('/common/type/246').then(rese => {
								if (rese.status == 0) {
									if (rese.data && rese.data.value) {
										if (rese.data.value === '是') {
											// #ifdef MP-WEIXIN
											this.weixinTiXian = true;
											this.zhifuSelect = 3;
											// #endif
											// #ifdef H5
											if (this.WxTXFangShi == 2) {
												this.weixinTiXian = true;
												this.zhifuSelect = 3;
											} else {
												if (des.data.openId) {
													this.weixinTiXian = true;
													this.zhifuSelect = 3;
												}
											}
											// #endif
										} else {
											this.weixinTiXian = false;
											this.zhifuSelect = -1;
										}
									}
								}
							});
							// #endif
						}else{
							this.weixinTiXian = false;
						}
						
						//是否开启支付宝提现
						this.$Request.getT('/common/type/247').then(ras => {
							if (ras.status == 0) {
								if (ras.data && ras.data.value) {
									if (ras.data.value === '是') {
										this.zhifubaoTiXian = true;
										this.zhifuSelect = 1;
									} else {
										this.zhifubaoTiXian = false;
										if (!this.weixinTiXian) {
											this.zhifuSelect = -1;
										}
									}
								}
							}
						});
					}
				});
			},
			getMoney() {
				let that = this;
				let token = this.$queue.getData('token');
				let userId = this.$queue.getData('userId');
				if (token) {
					//this.$queue.showLoading("加载中...");
					//可以提现金额查询预估收入查询
					this.$Request.getT("/cash/money/" + userId).then(res => {
						if (res.status === 0 && res.data) {
							that.mayMoney = parseFloat(res.data).toFixed(2);
							that.money = parseFloat(res.data).toFixed(2);;

							// that.$Request.getT('/userMoney/selectUserMoney?userId=' + userId).then(ress => {
							// 	if (ress.status === 0) {
							// 		ress.data.money = ress.data.money ? ress.data.money : 0;
							// 		that.mayMoney = parseFloat(parseFloat(res.data) + parseFloat(ress.data
							// 			.money)).toFixed(2);
							// 	}
							// });
						} else if (res.status === -102) {
							this.$queue.showToast(res.msg);
							this.$queue.logout();
							uni.navigateTo({
								url: '/pages/member/register'
							});
						} else {
							that.mayMoney = '0.00';
							// that.money = '0.00';
							//this.$queue.showToast(res.msg);
						}
					});
				}
			},
			//校验用户输入金额
			checkMobile(money) {
				return RegExp(/^1[34578]\d{9}$/).test(money);
			},
			getOut(state, money) {
				let that = this;
				let token = this.$queue.getData("token");
				let userId = this.$queue.getData("userId");
				let cashMoney = this.$queue.getData("cashMoney");
				if (token) {
					if (state) {
						this.money = money;
					}
					if (!/^\d+$/.test(this.money)) {
						uni.showToast({
							icon: 'none',
							title: '请输入正确金额，不能包含中文，英文，特殊字符和小数'
						});
						return;
					}

					if (this.zhifuSelect == -1) {
						return;
					}

					if (this.zhifuSelect == 1) {
						if (that.zhifubao && that.zhifubaoName) {} else {
							uni.navigateTo({
								url: "/pages/member/zhifubao"
							})
							return;
						}
					}
					if (this.zhifuSelect == 3 && this.WxTXFangShi == 2) {
						if (!this.mywxImg) {
							this.show = true;
							return;
						}
					}
					if (parseFloat(this.mayMoney) >= parseFloat(this.money)) {
						if (parseFloat(this.money) >= parseFloat(cashMoney)) {
							if (this.shouxufei > 0) {
								let shouxufei = parseFloat(this.money * this.shouxufei).toFixed(2);
								let contentName = '请仔细确认收款人信息\n\n收款人姓名:' + that.zhifubaoName + '\n\n提现金额:' + this
									.money + '元\n\n提现手续费：' + shouxufei +
									'\n\n收款人账号：' + that.zhifubao + '';
								if (this.zhifuSelect == 3) {
									contentName = '请仔细确认提现信息\n\n提现金额:' + this
										.money + '元\n\n提现手续费：' + shouxufei;
								}
								uni.showModal({
									title: "提现申请提示",
									content: contentName,
									success: (e) => {
										if (e.confirm) {
											this.$queue.showLoading("提现中...");
											this.$Request.getT('/cash/v2/out/' + userId + '/' + this.money +
													'?classify=' + this.zhifuSelect)
												.then(res => {
													if (res.status === 0 && res.data) {
														that.$queue.showToast("提现申请成功，预计三个工作日到账");
														that.getMoney();
													} else {
														that.$queue.showToast(res.msg);
													}
													uni.hideLoading();
												});
										}
									}
								});
							} else {
								let contentName = '请仔细确认收款人信息\n\n收款人姓名:' + that.zhifubaoName + '\n\n提现金额:' + this
									.money + '元\n\n收款人账号：' + that.zhifubao +
									'';
								if (this.zhifuSelect == 3) {
									contentName = '请仔细确认提现信息\n\n提现金额:' + this
										.money + '元\n\n提现手续费：' + shouxufei;
								}
								uni.showModal({
									title: "提现申请提示",
									content: contentName,
									success: (e) => {
										if (e.confirm) {
											this.$queue.showLoading("提现中...");
											this.$Request.getT('/cash/v2/out/' + userId + '/' + this.money +
													'?classify=' + this.zhifuSelect)
												.then(res => {
													if (res.status === 0 && res.data) {
														that.$queue.showToast("提现申请成功，预计三个工作日到账");
														that.getMoney();
													} else {
														that.$queue.showToast(res.msg);
													}
													uni.hideLoading();
												});
										}
									}
								});
							}

						} else {
							this.$queue.showToast("提现金额必须大于或等于" + cashMoney + "元才可提现");
						}
					} else {
						this.$queue.showToast("您的余额不足");
					}
				} else {
					uni.navigateTo({
						url: '/pages/member/register'
					});
				}
			},
			getOut1(money) {
				let that = this;
				let token = this.$queue.getData('token');
				let userId = this.$queue.getData('userId');
				if (token) {
					if (that.zhifubao && that.zhifubaoName) {
						if (parseFloat(this.mayMoney).toFixed(1) >= parseFloat(money)) {
							if (parseFloat(money).toFixed(1) >= 10) {
								if (this.shouxufei > 0) {
									let shouxufei = parseFloat(money * this.shouxufei).toFixed(2);
									uni.showModal({
										title: '提现申请提示',
										content: '请仔细确认收款人信息\n\n收款人姓名:' + that.zhifubaoName + '\n\n提现金额:' + money +
											'元\n\n提现手续费：' + shouxufei +
											'\n\n收款人账号：' + that.zhifubao + '',
										success: e => {
											if (e.confirm) {
												this.$queue.showLoading('提现中...');
												this.$Request.getT('/cash/v1/out/' + userId + '/' + money)
													.then(res => {
														if (res.status === 0) {
															that.$queue.showToast('提现申请成功，预计三个工作日到账');
															that.getMoney();
														} else {
															uni.showModal({
																title: '温馨提示',
																content: res.msg,
																showCancel: false,
																cancelText: '取消',
																confirmText: '确认'
															});
														}
														uni.hideLoading();
													});
											}
										}
									});
								} else {
									uni.showModal({
										title: '提现申请提示',
										content: '请仔细确认收款人信息\n\n收款人姓名:' + that.zhifubaoName + '\n\n提现金额:' + money +
											'元\n\n收款人账号：' + that.zhifubao +
											'',
										success: e => {
											if (e.confirm) {
												this.$queue.showLoading('提现中...');
												this.$Request.getT('/cash/v1/out/' + userId + '/' + money)
													.then(res => {
														if (res.status === 0) {
															that.$queue.showToast('提现申请成功，预计三个工作日到账');
															that.getMoney();
														} else {
															uni.showModal({
																title: '温馨提示',
																content: res.msg,
																showCancel: false,
																cancelText: '取消',
																confirmText: '确认'
															});
														}
														uni.hideLoading();
													});
											}
										}
									});
								}
							} else {
								this.$queue.showToast('提现金额必须大于或等于10元才可提现');
							}
						} else {
							this.$queue.showToast("您的余额不足");
						}
					} else {
						uni.navigateTo({
							url: '/pages/member/zhifubao'
						});
					}
				} else {
					uni.navigateTo({
						url: '/pages/public/login'
					});
				}
			}
		}
	};
</script>

<style lang="less">
	// @import '../../static/css/index.css';

	.popup {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		margin: auto;
		z-index: 9999;
		background-color: #FFFFFF;
		width: 80%;
		height: 730rpx;
		border-radius: 10rpx;
		box-shadow: 0rpx 0rpx 20rpx #000000;
	}

	.zhifuSlect_btn {
		justify-content: center;
		border-radius: 15upx;
		padding: 20upx;
		margin-left: 40upx;
		display: flex;
		background-color: #FFFFFF;
		width: 320upx;
		align-items: center;
		height: 80upx;

		image {
			width: 50upx;
			height: 50upx;
			border-radius: 50upx;
		}
	}

	.view2-view-text {
		font-size: 14px;
		color: #000000;
		margin-left: 20upx;
		width: 80%;
	}

	.view2-view-image-right {
		width: 18upx;
		height: 30upx;
		margin-left: 50upx;
	}

	.cash {
		text-align: center;
		background: white;
		height: 100%;
		position: absolute;
		width: 100%;

		.cash-top {
			padding: 32upx 32upx 50upx 32upx;
			/* border-bottom: 1px solid gainsboro; */
			background: #FF2638;
		}

		.leiji {
			font-size: 14px;
			color: #ffffff;
			margin-bottom: 10px;
		}
	}
</style>
