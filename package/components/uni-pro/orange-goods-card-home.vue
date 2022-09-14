<template>
	<view class="coupon-page s-row" @tap="open(itemid)" v-bind:key='itemid'
		style="margin:16upx 16upx 8upx 16upx;background: white;border-radius: 32upx;border: 2upx solid rgba(0, 0, 0, 0.1)">
		<view class="image">
			<image lazy-load='true' fade-show='true' :src="itempic"></image>
		</view>
		<view class="content" style="padding: 16upx;">

			<view class="tit">
				<text v-if="logo == '../../static/img/pinduoduo.png'" class="tag_type">拼多多</text>
				<text v-else-if="logo == '../../static/img/jd.png'" class="tag_type">京东</text>
				<text v-else-if="logo == '../../static/img/mao.png'" class="tag_type">淇湘优购</text>
				<text v-else-if="logo == '../../static/img/zy.png'" class="tag_type">自营</text>
				<text v-else-if="logo == '../../static/img/wph.png'" class="tag_type">唯品会</text>
				<text v-else class="tag_type">淇湘优购</text>
				<text>{{ itemtitle }}</text>
			</view>
			<!-- 返利 -->
			<view class="reverse">
				<view v-if="isEnable!='否'">预估返￥{{ tkmoney }}</view>
				<view v-if="couponmoney!=null">券{{couponmoney}}元</view>
			</view>
			<view class="list_price">
				<text style="font-size: 24upx;color:#FF2638;">¥<text
						style="font-weight: bold;color:#FF2638;font-size: 34upx;">{{itemendprice}}</text></text>
				<text class="volume" style="font-size: 20upx;color: #999999;margin-left: 16upx;"
					v-if="itemsale">{{itemsale}}</text>
			</view>
			<view style="font-size: 24upx;color: #999999;" v-if="shopname">{{shopname}}</view>

		</view>


	</view>
</template>

<script>
	export default {
		name: "orange-goods-list",
		props: [
			'isEnable', "shopname", "itempic", "tkmoneys", "itemtitle", "itemprice", "itemsale", "itemendprice",
			"couponmoney",
			"itemid",
			"logo", "tkmoney", "isInvitation"
		],

		methods: {
			open(itemid) {
				if (this.logo == '../../static/img/maos.png') {
					this.$emit('success', this.itemid);
				} else {
					let relation_id = this.$queue.getData('relation_id');
					if (relation_id) {
						if (this.logo == '../../static/img/pinduoduo.png') {
							uni.navigateTo({
								url: '/pages/detail/pdd?itemid=' + itemid + '&relation_id=' + relation_id
							});
						} else if (this.logo == '../../static/img/jd.png') {
							uni.navigateTo({
								url: '/pages/detail/jd?itemid=' + itemid + '&relation_id=' + relation_id
							});
						} else if (this.logo == '../../static/img/wph.png') {
							uni.navigateTo({
								url: '/package/pages/detail/wph?itemid=' + itemid + '&relation_id=' + relation_id
							});
						} else {
							uni.navigateTo({
								url: '/pages/detail/goodsinfo?itemid=' + itemid + '&relation_id=' + relation_id
							});
						}
					} else {
						if (this.logo == '../../static/img/pinduoduo.png') {
							uni.navigateTo({
								url: '/pages/detail/pdd?itemid=' + itemid
							});
						} else if (this.logo == '../../static/img/jd.png') {
							uni.navigateTo({
								url: '/pages/detail/jd?itemid=' + itemid
							});
						} else if (this.logo == '../../static/img/wph.png') {
							uni.navigateTo({
								url: '/package/pages/detail/wph?itemid=' + itemid 
							});
						} else {
							uni.navigateTo({
								url: '/pages/detail/goodsinfo?itemid=' + itemid
							});
						}
					}
				}
			}
		}
	}
</script>

<style scoped lang="less">
	@import "../../../static/css/index.css";

	.itemInfo1 {
		/* float: left; */
		/* width: 49%; */
		// display: flex;
		// justify-content: space-between;
		// align-items: center;
		// border-radius: 20upx;
		// background-color: #fff;
		// margin-top: 16upx;
		// padding-bottom: 8upx;
		// margin-right: 6upx;
		// box-shadow: 2upx 0 2upx 2upx rgba(0, 0, 0, 0.1);
		// border: 2upx solid rgba(0, 0, 0, 0.1);
	}

	.logo {
		width: 40rpx;
		height: 40rpx;
		position: relative;
		top: 8rpx;
		margin-right: 8rpx;
	}

	.tit {
		height: 100rpx;
		overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;

		.tag_type {
			color: #FFFFFF;
			background: #FF2638;
			font-size: 24upx;
			padding-left: 12upx;
			padding-right: 12upx;
			border-radius: 6upx;
			margin-right: 8upx;
			padding-top: 4upx;
			padding-bottom: 4upx;
		}
	}

	.tit>text {
		font-size: 32rpx;
		font-weight: 500;
		color: #333333;
		line-height: 48rpx;
	}

	.reverse {
		display: flex;
		justify-content: flex-start;
		align-items: flex-end;
		margin-top: 16rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		/* font-weight: bold; */
		color: #FFFFFF;
		line-height: 32rpx;
	}

	.reverse>view:nth-child(1) {
		padding: 4rpx 10rpx;
		background: #FF2638;
		border-radius: 5px;
		color: #ffffff;
		margin-right: 20rpx;

	}

	.reverse>view:nth-child(2) {
		padding: 4rpx 10rpx;
		background: #FFD9D9;
		border-radius: 5px;
		color: #FF2638;
	}

	.list_price {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		margin-top: 20rpx;
		margin-bottom: 8rpx;
	}
</style>
