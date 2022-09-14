ss
<template>
	<view>
		<view style="position: absolute;width: 100%;height: 380upx;background: #FF0000;"></view>
		<view style="color: #FFFFFF;position: relative;padding-left: 80upx;padding-top: 80upx;">
			<view style="font-size: 32upx;">当前积分（个）</view>
			<view style="display: flex;">
				<view style="padding-top: 16upx;font-size: 50upx;font-weight: bold;width: 70%;">{{ total ? total : 0 }}</view>
			</view>
			<view style="margin-top: 32upx;font-size: 26upx;">注：1000积分=1元，最低可提现积分为1000积分</view>
		</view>
		<view style="margin: 32upx;">
			<view class="main" style="margin-top: 180upx;"><wInput v-model="jifen" type="number" maxlength="11" placeholder="请输入要兑换的积分"></wInput></view>

			<wButton text="立即兑换" :rotate="isRotate" @click.native="duihuan()"></wButton>
		</view>
	</view>
</template>

<script>
import wInput from '../../components/watch-login/watch-input.vue'; //input
import wButton from '../../components/watch-login/watch-button.vue'; //button
export default {
	data() {
		return {
			contents: [],
			modalName: '',
			jifen: '',
			isRotate: false, //是否加载旋转
			isLogin: false,
			percent: 0,
			total: 0
		};
	},
	components: {
		wInput,
		wButton
	},
	onLoad() {
		let userId = this.$queue.getData('userId');
		if (userId) {
			this.getUserInfo(userId)
			// this.getToatal(userId);
		}
	},
	methods: {
		duihuan() {
			if (!this.jifen) {
				this.$queue.showToast('请输入要兑换的积分');
			} else if (this.jifen > this.total) {
				uni.showModal({
					title: '积分提醒',
					content: '当前可用积分为' + this.total + '，快去领券购物或参与每日签到获取积分吧！',
					showCancel: false
				});
			} else if (this.jifen < 1000) {
				this.$queue.showToast('最低可提现积分为1000');
			} else {
				let userId = this.$queue.getData('userId');
				this.$Request.getT('/user/cashMoney/' + userId + '?money=' + this.jifen).then(res => {
					if (res.status === 0) {
						this.jifen='';
						
						this.getUserInfo(userId)
						// this.getToatal(userId);
						uni.showModal({
							title: '积分提醒',
							content: '兑换成功！请在【我的提现】中提现',
							showCancel: false
						});
					}else{
						this.$queue.showToast(res.msg);
					}
				});
			}
		},
		hideModal() {
			this.modalName = '';
		},
		showModals() {
			this.modalName = 'RadioModal';
		},
		goMoney() {
			uni.navigateTo({
				url: '/pages/member/chongzhi'
			});
		},
		goBack() {
			uni.navigateBack({});
		},
		changeLogin() {
			this.isLogin = true;
			this.percent = 100;
		},
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
							//#ifdef H5
							if (e.confirm) {
								window.location.reload();
							} else {
								window.location.reload();
							}
							//#endif
							//#ifndef H5
							this.navTo('/pages/public/login');
							//#endif
						}
					});
				}
			});
		},
		getToatal(userId) {
			this.$Request.postT('/user/getUserJifenList/' + userId).then(res => {
				if (res.status === 0) {
					this.contents = res.data;
				} else {
					this.contents = [];
				}
			});
		},
		goPage(url) {
			uni.navigateTo({
				url: url
			});
		}
	}
};
</script>

<style scoped>
.jifenguize {
	width: 180upx;
	height: 60upx;
	background: rgba(255, 255, 255, 1);
	border-radius: 30upx 0px 0px 30upx;
	opacity: 0.3;
}

.news_title {
	font-weight: bold;
	color: #e67817;
	margin-right: 16px;
	margin-left: 16px;
	width: 6px;
}

.back_img {
	position: relative;
	width: 24upx;
	height: 32upx;
}

.jifen_active {
	background: #f0f0f0;
	padding: 6upx 16upx;
	height: 50upx;
	border-radius: 8upx;
	margin-top: 40upx;
	color: #999999;
}

.jifen_noactive {
	background: #0055b8;
	padding: 6upx 16upx;
	height: 50upx;
	border-radius: 8upx;
	margin-top: 40upx;
	color: #ffffff;
}

.jifen_login {
	display: flex;
	margin-left: 32upx;
	margin-right: 32upx;
	border-bottom: 1upx solid #f1f1f1;
	padding-bottom: 32upx;
}

.jifen_number {
	color: #ff7800;
	margin-left: 8upx;
}

.total_jifen {
	width: 40%;
	text-align: right;
	font-size: 14px;
	color: grey;
}

.jifen_title {
	width: 60%;
	font-size: 32upx;
}

.jifen {
	display: flex;
	margin: 8px 16px 8px 16px;
	border-bottom: 1upx solid #f1f1f1;
	padding-bottom: 20upx;
	padding-top: 8upx;
}

.top_yuan {
	margin-left: 37%;
	border-radius: 200px;
	width: 200upx;
	height: 200upx;
	border: 4upx dotted #f1f1f1;
}

.title {
	text-align: center;
	color: #ffffff;
	font-size: 26px;
	/* background-position: center; */
	/* background-image: url(../../../static/jifenimg.png); */
	/* background: #0055b8; */
	/* border-bottom-left-radius: 180px;
		border-bottom-right-radius: 180px; */
	height: 250upx;
}

.news_title {
	font-weight: bold;
	color: #f9221d;
	margin-right: 16px;
	margin-left: 16px;
	width: 6px;
}

.news_content {
	display: flex;
	text-align: left;
	padding: 8px 16px 8px 16px;
	background: #ffffff;
	margin-top: 1px;
}

.news_content_text {
	margin-top: 8px;
	width: 200px;
	overflow: hidden;
	font-size: 16px;
	white-space: nowrap;
	text-overflow: ellipsis;
}
</style>
