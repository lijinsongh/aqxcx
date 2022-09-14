<template>
	<view>
		<view style="font-size: 24upx;color: #999999;margin: 16upx 16upx 0upx 16upx">
			提示: 收藏最多保存100个宝贝，如果超出100个宝贝，如果此时收藏了新的宝贝，最末尾的宝贝将会自动删除
		</view>
		<view class="index-content" style="background: transparent;">
			<view class="index-coupon has-pd-10 top_30">
				<view class="goods-list" style="display: flex;flex-wrap: wrap;justify-content: space-between;"
					v-if="couponlist.length > 0">
					<view @tap='goDetail(item.id)'
						style="width: 49%;box-shadow: 1px 0 1px 1px rgb(0 0 0 / 10%);border-radius: 20upx;background-color: #fff;margin-top: 16upx;padding-bottom: 18upx;"
						v-for="(item,index) in couponlist" :index='index'>
						<view style="height: 400upx;">
							<image style="height: 400upx;border-radius: 8upx;" :src="item.coverImg"></image>
						</view>
						<view style="margin-top: 8upx;">
							<view
								style="padding:0 4upx;height: 80rpx;font-size: 28rpx;margin-right: 8rpx;margin-left: 8rpx;overflow: hidden;margin-top: 8upx;">
								<text
									style="color: rgb(255, 255, 255);background: rgb(225, 10, 7);font-size: 20upx;padding: 4upx 12upx;border-radius: 12upx;margin-right: 8upx;">自营</text>
								<text>{{item.title}}</text>
							</view>
							<view
								style="padding:0 12upx;display: flex;flex-direction: column;justify-content: space-between;">
								<view style="padding: 10upx 0;">
									<view style="display: flex;">
										<view
											style="font-size: 28upx;color: #FF2638;font-weight: 700;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
											<text style="font-size:28upx;">¥</text>{{item.price}}
										</view>
										<view
											style="margin-left:20px;font-size: 24upx;color: #999999;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;text-align: left;">
											{{item.sales}}件
										</view>
									</view>
								</view>
								<view
									style="display: flex;align-items: center;font-size: 24upx;color: rgb(153, 153, 153);">
									<image style="height: 30upx;width:30upx;margin-right: 4upx;"
										src="https://renwu.xiansqx.com/img/20210813/78058c9a635e4822853306964fa02d09.png">
									</image>
									<view>优享帮自营店铺</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 悬浮上拉 -->
			<view class="scroll_top" @tap="topScrollTap" v-bind:class="[scrollTop ? 'active' : '','']"
				style="bottom: 56px;">
				<text class="iconfont icon-shangla"></text>
			</view>
			<!-- 空白页 -->
			<empty v-if="couponlist.length === 0" des="你还没有收藏，快去逛逛吧"></empty>
		</view>
	</view>
</template>

<script>
	export default {
		onShareAppMessage(res) {
			return {
				title: '购物先领券，一年省一半',
				path: '/pages/index/index'
			}
		},
		data() {
			return {
				jdlogo: "../../static/img/jd.png",
				logo: "../../static/img/mao.png",
				taobao: "../../static/img/taobao.png",
				pddlogo: "../../static/img/pinduoduo.png",
				zylogo: "../../static/img/zy.png",
				fromTabIndex: 0,
				couponlist: [],
				loadingType: 0,
				isInvitation: 0,
				isEnable: '否',
				scrollTop: false,
				collectKey: 'orange-sqx-collect',
				collectPddKey: 'orange-sqx-collect-pdd',
				collectJdKey: 'orange-sqx-collect-jd',
				collectZyKey: 'orange-sqx-collect-zy',

			}
		},
		onLoad: function(e) {
			let a = this.$queue.getData("isEnable")
			if (a) {
				this.isEnable = a;
			}
			this.getUserInfo();
		},
		onShow() {
			this.couponlist = [];
			this.getZy();
		},
		methods: {
			goDetail(id) {
				uni.navigateTo({
					url: '/package/pages/zysc/index/commoditydetail?ordersId=' + id
				});
			},
			getZy() {
				this.$queue.get(this.collectZyKey).forEach(d => {
					let grade = this.$queue.getData("grade");
					d.descrition = '';
					if (d.commissionPrice != 0) {
						d.descrition = parseFloat(d.commissionPrice)
							.toFixed(2);
					}
					d.sales = d.sales > 10000 ? "已售" + (d.sales / 10000).toFixed(1) + '万' : d.sales;
					this.couponlist.push(d);
					console.log(this.couponlist)
				});
			},
			fromTabSelect(index) {
				this.fromTabIndex = index;
				this.couponlist = [];
				this.getZy();
			},
			getUserInfo() {
				let userId = this.$queue.getData("userId");
				if (userId) {
					this.$Request.getT("/user/" + userId).then(res => {
						if (res.status === 0) {
							this.$queue.setData("image_url", res.data.image_url);
							this.$queue.setData("mobile", res.data.phone);
							this.isInvitation = res.data.isInvitation;
							this.$queue.setData("isInvitation", res.data.isInvitation);
							this.$queue.setData("relation", res.data.invitation);
							this.$queue.setData("grade", res.data.grade);
							this.$queue.setData("nickName", res.data.nickName);
							this.$queue.setData("relation_id", res.data.relationId);
							this.$queue.setData("gender", parseInt(res.data.gender));
						}
					});
				}
			},
			topScrollTap: function() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
			},
			onPageScroll: function(e) {
				this.scrollTop = e.scrollTop > 200;
			}
		},

	}
</script>

<style lang="scss">
	@import "../../../../static/css/index.css";

	.navbar {
		display: flex;
		height: 80upx;
		padding: 0 5px;
		background: #fff;
		box-shadow: 0 2upx 10upx rgba(0, 0, 0, .06);
		position: relative;
		z-index: 10;

		.nav-item {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 32upx;
			color: $font-color-dark;
			position: relative;

			&.current {
				color: $base-color;

				&:after {
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 44px;
					height: 0;
					border-bottom: 4upx solid $base-color;
				}
			}
		}
	}
</style>
