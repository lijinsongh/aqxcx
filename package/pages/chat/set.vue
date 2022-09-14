<template>
	<view class="container">
		<view style="margin-top: 1px" class="list-cell b-b" @click="navTo1('/pages/member/xieyi')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">用户协议</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view style="margin-top: 1px" class="list-cell b-b" @click="navTo1('/pages/member/mimi')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">隐私政策</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view style="margin-top: 1px" class="list-cell b-b" @click="about('关于')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">关于我们</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<!-- <view style="margin-top: 1px" v-if="isShow" class="list-cell b-b" @click="navTo1('/pages/member/zhuxiao')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">注销账号</text>
			<text class="cell-more yticon icon-you"></text>
		</view> -->
		<view style="margin-top: 1px" class="list-cell b-b" @click="navTo1('/package/pages/zysc/member/customer')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">联系客服</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view style="margin-top: 1px" class="list-cell b-b" @click="navTo1('/package/pages/chat/feedback')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">意见反馈</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<!--#ifdef APP-PLUS-->
		<view style="margin-top: 1px" class="list-cell" @click="update()">
			<text class="cell-tit">检查更新</text>
			<text class="cell-tip">当前版本 {{ version }}</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<!--        #endif-->
		<button v-if="isShow" class="confirm-btn" @click="toLogout">退出登录</button>
		<!-- <view v-if="isShow" class="list-cell log-out-btn" @click="toLogout"><text class="cell-tit" style="color: #FF2638">退出登录</text></view> -->
	</view>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
	data() {
		return {
			tbShow: false,
			wxShow: false,
			isShow: false,
			relation_id: '',
			version: ''
		};
	},
	onShow() {
		let token = this.$queue.getData('token');
		if (token) {
			this.isShow = true;
		}
	},
	onLoad() {
		let userId = this.$queue.getData('userId');
		if (userId) {
			this.$Request.getT('/user/' + userId).then(res => {
				if (res.data.tb_openid) {
					this.tbShow = true;
				}
			});
		}
	},
	methods: {
		navTo(url) {
			let token = this.$queue.getData('token');
			if (token) {
				uni.navigateTo({
					url: url
				});
			} else {
				uni.navigateTo({
					url: '/pages/public/login'
				});
			}
		},
		navTo1(url) {
			uni.navigateTo({
				url: url
			});
		},
		about(url) {
			uni.showModal({
				showCancel: false,
				title: '关于我们',
				content:
					'淇湘优购是一个汇聚了全网隐藏优惠券的网购返利软件 ！这里汇聚淘宝、京东、天猫、拼多多等商城优惠券信息！每天实时更新优惠券，发放一些商家的大额优惠券！这里可以帮你网购省钱返利，也可以帮你兼职赚钱！每年最高能让你网购省50%的钱！\n\n淇湘优购',
				success: e => {
					if (e.confirm) {
					}
				}
			});
		},
		//退出登录
		toLogout() {
			let that = this;
			uni.showModal({
				title: '退出提醒',
				content: '确定要退出登录么',
				success: e => {
					if (e.confirm) {
						that.$queue.remove('token');
						that.$queue.remove('userId');
						that.$queue.remove('mobile');
						that.$queue.remove('openid');
						that.$queue.remove('grade');
						that.$queue.remove('nickName');
						that.$queue.remove('isInvitation');
						that.$queue.remove('image_url');
						that.$queue.remove('relation_id');
						that.$queue.remove('relation');
						that.isShow = false;
						setTimeout(() => {
							uni.switchTab({ url: '/pages/member/user' });
						}, 200);
					}
				}
			});
		},
	}
};
</script>

<style lang="scss">
page {
	background: $page-color-base;
}
.confirm-btn {
	width: 300px;
	height: 42px;
	line-height: 42px;
	border-radius: 30px;
	margin-top: 60upx;
	background: -moz-linear-gradient(left, #FF2638, #FF2638 100%);
	background: -webkit-gradient(linear, left top, left right, color-stop(0, #FF2638), color-stop(100%, #FF2638));
	background: -webkit-linear-gradient(left, #FF2638 0, #FF2638 100%);
	background: -o-linear-gradient(left, #FF2638 0, #FF2638 100%);
	background: -ms-linear-gradient(left, #FF2638 0, #FF2638 100%);
	background: linear-gradient(to left, #FF2638 0, #FF2638 100%);
	color: #fff;
	font-size: $font-lg;

	&:after {
		border-radius: 60px;
	}
}
.list-cell {
	display: flex;
	align-items: baseline;
	padding: 10px $page-row-spacing;
	line-height: 30px;
	position: relative;
	background: #fff;
	justify-content: center;

	&.log-out-btn {
		margin-top: 20px;

		.cell-tit {
			color: $uni-color-primary;
			text-align: center;
			margin-right: 0;
		}
	}

	&.cell-hover {
		background: #fafafa;
	}

	&.b-b:after {
		left: 16px;
	}

	&.m-t {
		margin-top: 9px;
	}

	.cell-more {
		align-self: baseline;
		font-size: $font-lg;
		color: $font-color-light;
		margin-left: 6px;
	}

	.cell-tit {
		flex: 1;
		font-size: $font-base + 2upx;
		color: $font-color-dark;
		margin-right: 6px;
	}

	.cell-tip {
		font-size: $font-base;
		color: $font-color-light;
	}

	switch {
		transform: translateX(8px) scale(0.84);
	}
}
</style>
