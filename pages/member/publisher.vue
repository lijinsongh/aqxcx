<template>
	<view>
		<view class="container">
			<view style="text-align: center;">
				<image style="width: 120upx;height: 120upx;margin-top: 140upx;border-radius:20upx" src="../../static/logo.png"></image>
				<view style="font-size: 28upx;margin-top: 32upx">你的网购省钱专家</view>

				<view style="margin-top: 100upx;color: #FF0000;font-size: 32upx;font-weight: bold;">会员特权</view>
				<view style="margin-top: 32upx">1、会员购买商品享受省钱+返现！</view>
				<view style="margin-top: 2px">2、邀好友享受永久团队佣金提成！</view>
				<view style="margin-top: 2px">3、分享商品给好友购买拿高额佣金！</view>
				<view style="font-size: 32upx;margin-top: 52upx;color: #FF0000;font-size: 32upx;font-weight: bold;">{{ des }}</view>

				<!-- #ifdef H5 -->
				<button class="confirm-btn" @click="goHome">{{ description }}</button>
				<!-- #endif -->

				<!-- #ifdef MP-WEIXIN -->
				<view v-if="urls&&!relation_id" style="color: #FF0000;font-size: 32upx">
					<view style="margin-bottom: 16upx;">请长按复制授权链接粘贴到手机浏览器授权</view>
					<text style="padding: 32upx;" selectable="true" @longpress="copyTklWenAns()">{{urls}}</text>
				</view>

				<view v-if="!relation_id&&!urls" style="color:white;padding: 10px;background: #FF0000;width: 60%;margin-right: 20%;margin-left: 20%;border-radius: 42upx;margin-top: 32upx"
				 @click="copyHref">
					加入会员
				</view>
				<button v-if="relation_id" class="confirm-btn" @click="goHome">{{ description }}</button>
				<!-- #endif -->
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				weiXin: false,
				urls: '',
				description: '立即申请',
				show_share: false,
				des: '',
				timer: null,
				userInfo: 'userInfo',
				relation_id: ''
			};
		},
		onPullDownRefresh: function() {
			uni.stopPullDownRefresh(); // 停止刷新
		},
		onUnload: function() {
			if (this.timer) {
				clearInterval(this.timer);
				this.timer = null;
			}
		},
		onLoad() {
			console.log(this.urls);
			console.log(this.urls);
			console.log(this.urls);
			console.log(this.urls);
			console.log(this.urls);
			//#ifdef H5
			let ua = navigator.userAgent.toLowerCase();
			if (ua.indexOf('micromessenger') !== -1) {
				this.weiXin = true;
				if (window.location.href.indexOf('?uid=') !== -1 && window.location.href.indexOf('&time=order') === -1 && window.location
					.href.indexOf('&code=') === -1) {
					window.location.href = window.location.href + '&time=order';
				}
				if (window.location.href.indexOf('?uid=') === -1 && window.location.href.indexOf('?time=order') === -1 && window.location
					.href.indexOf('&code=') === -1) {
					window.location.href = window.location.href + '?time=order';
				}
			} else {
				if (window.location.href.indexOf('?code=') !== -1 || window.location.href.indexOf('&code=') !== -1) {
					let code;
					if (window.location.href.indexOf('?code=') !== -1) {
						code = window.location.href.split('?code=')[1].split('&')[0];
					} else {
						code = window.location.href.split('&code=')[1].split('&')[0];
					}
					this.getUserInfo(code);
				}
				if (window.location.href.indexOf('?uid=') !== -1 && window.location.href.indexOf('&token=') !== -1) {
					let uid = window.location.href.split('?uid=')[1].split('&')[0];
					let token = window.location.href.split('&token=')[1].split('&')[0];
					this.$queue.setData('token', token);
					this.$queue.setData('userId', uid);
					//#ifdef H5
					let ua = navigator.userAgent.toLowerCase();
					if (ua.indexOf('micromessenger') === -1) {
						this.getUserInfos(uid);
					}
					//#endif
					//#ifndef H5
					this.getUserInfos(uid);
					//#endif
				}
			}
			//#endif

		},
		onShow() {
			let relation_id = this.$queue.getData('relation_id');
			if (relation_id) {
				this.relation_id = relation_id;
				this.description = '返回';
				this.des = '恭喜你已成为【淇湘优购】的会员！';
			} else {
				let token = this.$queue.getData('token');
				let userId = this.$queue.getData('userId');
				if (token && userId) {
					this.getUserInfos(userId);
					this.copyHref();
				}
				this.description = '立即申请';
			}
		},
		methods: {
			copyTklWenAns: function() {
				uni.setClipboardData({
					data: this.urls,
					success: r => {
						this.$queue.showToast('复制成功！');
					}
				});
			},
			copyHref() {
				let token = this.$queue.getData('token');
				let userId = this.$queue.getData('userId');
				this.$Request.getT('/user/' + userId).then(res => {
					if (res.status === 0) {
						if (!res.data.relationId) {
							if (res.data.phone) {
								this.urls = this.$queue.getTaoBaoRedirect() + '?uid=' + userId + '&token=' + token
								console.log(this.urls);
								console.log(this.urls);
								console.log(this.urls);
								console.log(this.urls);
								console.log(this.urls);
							} else {
								uni.navigateTo({
									url: '/pages/member/mobile'
								});
							}
						} else {

						}

					}
				});
			},
			goBack() {
				uni.navigateBack({

				})
			},

			getUserInfos(userId) {
				this.$Request.getT('/user/' + userId).then(res => {
					if (res.status === 0) {
						this.$queue.setData('image_url', res.data.image_url);
						this.$queue.setData('relation_id', res.data.relationId);
						this.$queue.setData('nickName', res.data.nickName);
						this.$queue.setData('gender', parseInt(res.data.gender));
						if (res.data.relationId) {
							this.relation_id = res.data.relationId;
							this.description = '返回';
							this.des = '恭喜你已成为【淇湘优购】的会员！';
							let href = this.$queue.getData('href');
							if (href) {
								this.$queue.remove('href');
								uni.redirectTo({
									url: href
								});
							} else {
								uni.switchTab({
									url: '/pages/index/index'
								});
							}
						} else {
							this.description = '立即申请';
						}
					} else {
						this.$queue.logout();
					}
				});
			},
			closeShare() {
				this.show_share = false;
			},
			goHome() {
				let that = this;
				let userId = this.$queue.getData('userId');
				let relation = this.$queue.getData('relation');
				if (userId) {
					this.$Request.getT('/user/' + userId).then(res => {
						if (res.status === 0) {
							if (res.data.phone) {
								if (res.data.relationId) {
									this.$queue.setData('relation_id', res.data.relationId);
									let href = this.$queue.getData('href');
									if (href) {
										this.$queue.remove('href');
										uni.redirectTo({
											url: href
										});
									} else {
										uni.switchTab({
											url: '/pages/index/index'
										});
									}
								} else {
									that.authorized();
								}
							} else {
								uni.navigateTo({
									url: '/pages/member/mobile'
								});
							}
						}
					});
				} else {
					this.$queue.setData('href', '/pages/member/publisher');
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
				}
			},

			authorized() {


				// #ifndef APP-PLUS
				let ua = navigator.userAgent.toLowerCase();
				if (ua.indexOf('micromessenger') !== -1) {
					this.show_share = true;
				} else {
					window.location.assign(
						'https://oauth.taobao.com/authorize?response_type=code&client_id=' +
						this.$queue.getTaoBaoAppid() +
						'&redirect_uri=' +
						this.$queue.publicYuMing() +
						'/pages/member/publisher&state=1&view=wap'
					);
				}
				// #endif
			},
			getUserInfo(code) {

				let that = this;
				that.$Request
					.post('/sessionKey', {
						grant_type: 'authorization_code',
						response_type: 'code',
						client_id: this.$queue.getTaoBaoAppid(),
						client_secret: this.$queue.getTaoBaoSecret(),
						redirect_uri: this.$queue.getTaoBaoRedirect(),
						code: code
					})
					.then(res => {
						if (res) {
							that.$queue.setData('access_token', res.access_token);
							that.$queue.setData('taobao_user_nick', res.taobao_user_nick);
							that.$Request.get('/tao/taobao/savePublisher/' + res.access_token).then(res => {
								if (res.tbk_sc_publisher_info_save_response && res.tbk_sc_publisher_info_save_response.data.relation_id) {
									that.$Request
										.getT('/user/bind/relationId/' + res.tbk_sc_publisher_info_save_response.data.relation_id + '/' + this.$queue
											.getData('userId'))
										.then(ress => {
											if (ress.status === 0) {
												that.$queue.setData('relation_id', ress.data.relationId);
												that.relation_id = res.tbk_sc_publisher_info_save_response.data.relation_id;
												if (res.tbk_sc_publisher_info_save_response.data.relation_id) {
													this.relation_id = res.tbk_sc_publisher_info_save_response.data.relation_id;
													this.description = '回首页分享赚钱';
													this.des = '恭喜你已成为【淇湘优购】的会员！';
												}
											} else {
												uni.showModal({
													title: '加入会员失败',
													content: ress.msg,
													showCancel: false
												});
											}
										});
								} else {
									uni.showModal({
										title: '加入会员失败',
										content: res.error_response.sub_msg,
										showCancel: false
									});
								}
							});
						}
					});
			}
		}
	};
</script>

<style lang="scss">
	@import '../../static/css/index.css';

	page {
		background: #ffffff;
	}

	.container {
		top: 0;
		padding-top: 50px;
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
		background: #fff;
	}

	.confirm-btn {
		width: 200px;
		height: 42px;
		line-height: 42px;
		border-radius: 30px;
		margin-top: 80upx;
		background: #FF0000;
		color: #fff;
		font-size: $font-lg;

		&:after {
			border-radius: 60px;
		}
	}

	#shareit {
		-webkit-user-select: none;
		position: fixed;
		/*width: 100%;*/
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
</style>
