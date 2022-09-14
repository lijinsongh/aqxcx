<template>
	<view>
		<!-- #ifdef H5 -->
		<view class="navbar" style="position: fixed;z-index: 100;text-align: center;width: 100%;top: 80upx;">
			<!-- #endif -->
			<!-- #ifndef H5 -->
			<view class="navbar" style="position: fixed;z-index: 100;text-align: center;width: 100%;top: 0;">
				<!-- #endif -->
				<view v-for="(item, index) in tabList" :key="index" style="margin-left: 90upx;"
					@tap="fromTabSelect(index)">
					<view :style="fromTabIndex === index?'color: #FF2638;':'color: #000000;'">{{ item.name }}
					</view>
					<image v-if="fromTabIndex === index" src="../../../static/img/bottomselect.png"
						style="width: 32upx;height: 12upx;"></image>
				</view>
			</view>
			<view style="font-size: 24upx;color: #999999;margin: 100upx 16upx 0upx 16upx">
				提示: 收藏最多保存100个宝贝，如果超出100个宝贝，如果此时收藏了新的宝贝，最末尾的宝贝将会自动删除
			</view>
			<view class="index-content" style="background: transparent;">
				<view class="index-coupon has-pd-10 top_30">
					<!-- <view class="goods-list" v-if="couponlist.length > 0&&fromTabIndex==0">
						<orange-goods-card-home v-for="(item,index) in couponlist" :index="index%2"
							:tkmoney='item.tkmoney' :tkmoneys='item.tkmoneys' :itemid="item.itemid" :isEnable='isEnable'
							:logo="logo" :is-invitation="isInvitation" :itempic="item.itempic+'_310x310.jpg'"
							:itemtitle="item.itemtitle" :shopname='item.shopname' :itemprice='"¥"+item.itemprice'
							:itemsale='item.itemsale' :itemendprice='""+item.itemendprice'
							:couponmoney="item.couponmoney"></orange-goods-card-home>
					</view> -->
					<view class="goods-list" v-if="couponlist.length > 0&&fromTabIndex==0">
						<orange-goods-card-home v-for="(item,index) in couponlist" :index="index%2" :logo="pddlogo"
							:tkmoney='item.tkmoney' :tkmoneys='item.tkmoneys' :shopname='item.mallName'
							:itemid="item.goodsId" :isEnable='isEnable' :is-invitation="isInvitation"
							:itempic="item.goodsImageUrl" :itemtitle="item.goodsName" :itemprice='"¥"+item.itemprice'
							:itemsale='"已售 "+item.salesTip' :itemendprice='item.itemendprice'
							:couponmoney="item.couponDiscount*0.01">
						</orange-goods-card-home>
					</view>
					<view class="goods-list" v-if="couponlist.length > 0&&fromTabIndex==1">
						<orange-goods-card-home v-for="(item,index) in couponlist" :index='index'
							:tkmoney='item.tkmoney' :tkmoneys='item.tkmoneys' :itemid="item.skuId" :logo="jdlogo"
							:isEnable='isEnable' :is-invitation="isInvitation" :itempic="item.itempic"
							:itemtitle="item.skuName" :shopname='item.shopInfo.shopName' :itemprice='"¥"+item.itemprice'
							:itemsale='item.itemsale' :itemendprice='""+item.itemendprice'
							:couponmoney="item.couponmoney" @success="clickItem"></orange-goods-card-home>
					</view>
					<view class="goods-list" v-if="couponlist.length > 0 && fromTabIndex == 2">
						<orange-goods-card-home v-for="(item, index) in couponlist" :index="index"
							:tkmoney="item.tkmoney" :tkmoneys="item.tkmoneys" :itemid="item.goodsId" :logo="wphlogo"
							:isEnable="isEnable" :is-invitation="isInvitation" :itempic="item.goodsThumbUrl"
							:itemtitle="item.goodsName" :shopname='item.storeInfo.storeName'
							:itemprice="'¥' + item.itemprice" :itemendprice="'' + item.vipPrice" @success="clickItem">
						</orange-goods-card-home>
					</view>
					<view class="goods-list" style="display: flex;flex-wrap: wrap;justify-content: space-between;"
						v-if="couponlist.length > 0&&fromTabIndex==3">
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
												{{item.sales}}人已购买
											</view>
										</view>
									</view>
									<view
										style="display: flex;align-items: center;font-size: 24upx;color: rgb(153, 153, 153);">
										<image style="height: 30upx;width:30upx;margin-right: 4upx;"
											src="../../../static/shop.png"></image>
										<view>淇湘优购自营店铺</view>
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
				tabList: [{
					position: 'pdd',
					name: '拼多多'
				}, {
					position: 'jd',
					name: '京东'
				}, {
					position: 'wph',
					name: '唯品会'
				}, {
					position: 'zy',
					name: '自营'
				}],
				jdlogo: "../../static/img/jd.png",
				logo: "../../static/img/mao.png",
				taobao: "../../static/img/taobao.png",
				wphlogo: '../../static/img/wph.png',
				pddlogo: "../../static/img/pinduoduo.png",
				zylogo: "../../static/img/zy.png",
				fromTabIndex: 0,
				page: 0,
				size: 100,
				couponlist: [],
				loadingType: 0,
				isInvitation: 0,
				isEnable: '否',
				scrollTop: false,
				collectKey: 'orange-sqx-collect',
				collectPddKey: 'orange-sqx-collect-pdd',
				collectWPHKey: 'orange-sqx-collect-wph',
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
			// if (this.fromTabIndex == 0) {
			// 	this.getTaoBao();
			// }
			if (this.fromTabIndex == 0) {
				this.getPddd();
			}
			if (this.fromTabIndex == 1) {
				this.getJD();
			}
			if (this.fromTabIndex == 2) {
				this.getWPH();
			}
			if (this.fromTabIndex == 3) {
				this.getZy();
			}
		},
		methods: {
			goDetail(id) {
				uni.navigateTo({
					url: '/package/pages/zysc/index/commoditydetail?ordersId=' + id
				});
			},
			clickItem(index) {
				this.$queue.setData("jd_list", JSON.stringify(this.couponlist[index]))
				uni.navigateTo({
					url: '/pages/detail/jd'
				});
			},
			getTaoBao() {
				this.$queue.get(this.collectKey).forEach(d => {
					let grade = this.$queue.getData("grade");
					d.tkmoneys = (d.tkmoney * parseFloat(this.$queue.maxMoney())).toFixed(2);
					if (grade) {
						d.tkmoney = (d.tkmoney * parseFloat(grade)).toFixed(2);
					} else {
						d.tkmoney = (d.tkmoney * parseFloat(this.$queue.minMoney())).toFixed(2);
					}
					d.itemsale = d.itemsale > 10000 ? "已售" + (d.itemsale / 10000).toFixed(1) + "万" : "已售" + d
						.itemsale;
					this.couponlist.push(d);
				});
			},
			getPddd() {
				this.$queue.get(this.collectPddKey).forEach(d => {
					let grade = this.$queue.getData("grade");
					d.tkmoneys = ((((d.minGroupPrice - d.couponDiscount) * 0.01) * (d.promotionRate * 0.001)) *
						parseFloat(this.$queue.maxMoney())).toFixed(2);
					if (grade) {
						d.tkmoney = ((((d.minGroupPrice - d.couponDiscount) * 0.01) * (d.promotionRate * 0.001)) *
							parseFloat(
								grade)).toFixed(2);
					} else {
						d.tkmoney = ((((d.minGroupPrice - d.couponDiscount) * 0.01) * (d.promotionRate * 0.001)) *
							parseFloat(this.$queue.minMoney())).toFixed(2);
					}
					d.itemendprice = ((d.minGroupPrice - d.couponDiscount) * 0.01).toFixed(2);
					d.itemprice = ((d.minGroupPrice) * 0.01).toFixed(2);
					this.couponlist.push(d);
				});
			},
			getJD() {
				this.$queue.get(this.collectJdKey).forEach(d => {
					let grade = this.$queue.getData("grade");
					d.itemsale = d.inOrderCount30Days > 10000 ? "已售" + (d.inOrderCount30Days / 10000).toFixed(1) +
						"万" : "已售" + d.inOrderCount30Days;

					if (d.commissionInfo.couponCommission) {
						this.couponlist.push(d);
					}
				});
			},
			getZy() {
				this.$queue.get(this.collectZyKey).forEach(d => {
					let grade = this.$queue.getData("grade");
					d.descrition = '';
					if (d.commissionPrice != 0) {
						if (grade) {
							d.descrition = ((parseFloat(d.memberPrice) * parseFloat(d.commissionPrice)) *
								parseFloat(grade)).toFixed(
								2);
						} else {
							d.descrition = ((parseFloat(d.price) * parseFloat(d.commissionPrice)) * parseFloat(
									this.$queue.minMoney()))
								.toFixed(2);
						}
					}
					d.sales = d.sales > 10000 ? "已售" + (d.sales / 10000).toFixed(1) + '万' : d.sales;
					this.couponlist.push(d);
				});
			},
			getWPH() {
				this.$queue.get(this.collectWPHKey).forEach(d => {
					let grade = this.$queue.getData("grade");
					d.tkmoneys = (d.vipPrice * (d.commissionRate * 0.01) * parseFloat(this
						.$queue
						.maxMoney())).toFixed(2);
					if (grade) {
						d.tkmoney = (d.vipPrice * (d.commissionRate * 0.01) * parseFloat(
								grade))
							.toFixed(2);
					} else {
						d.tkmoney = (d.vipPrice * (d.commissionRate * 0.01) * parseFloat(
							this
							.$queue.minMoney())).toFixed(2);
					}

					this.couponlist.push(d);
				});
			},
			fromTabSelect(index) {
				this.fromTabIndex = index;
				this.couponlist = [];
				// if (index == 0) {
				// 	this.getTaoBao();
				// }
				if (index == 0) {
					this.getPddd();
				}
				if (index == 1) {
					this.getJD();
				}
				if (index == 2) {
					this.getWPH();
				}
				if (index == 3) {
					this.getZy();
				}
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
	@import "../../../static/css/index.css";

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
