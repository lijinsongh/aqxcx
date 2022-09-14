<template>
	<view>
		<view @click="open(itemid)" class="itemInfo1" v-bind:key="itemid">

			<view class="img_wrap" style="position: relative">
				<image :src="itempic" style="border-radius: 10upx;" lazy-load="true" fade-show="true"></image>
			</view>

			<view class="right">
				<!-- <view class="dianpu">店铺</view> -->
				<text class="twolist-hidden" style="height: 80upx;font-size: 28upx;margin-right: 8upx;margin-left: 8upx;max-lines:2;overflow: hidden">
					<text
						v-if="logo == '../../static/img/pinduoduo.png'"
						style="color: #FFFFFF;background: #FF2638;font-size: 20upx;padding-left: 12upx;padding-right: 12upx;border-radius: 12upx;margin-right: 8upx;padding-top: 4upx;padding-bottom: 4upx;"
					>
						拼多多
					</text>
					<text
						v-else-if="logo == '../../static/img/jd.png'"
						style="color: #FFFFFF;background: #FF2638;font-size: 20upx;padding-left: 12upx;padding-right: 12upx;border-radius: 12upx;margin-right: 8upx;padding-top: 4upx;padding-bottom: 4upx;"
					>
						京东
					</text>
					<text
						v-else-if="logo == '../../static/img/mao.png'"
						style="color: #FFFFFF;background: #FF2638;font-size: 20upx;padding-left: 12upx;padding-right: 12upx;border-radius: 12upx;margin-right: 8upx;padding-top: 4upx;padding-bottom: 4upx;"
					>
						淇湘优购
					</text>
					<text
						v-else-if="logo == '../../static/img/zy.png'"
						style="color: #FFFFFF;background: #FF2638;font-size: 20upx;padding-left: 12upx;padding-right: 12upx;border-radius: 12upx;margin-right: 8upx;padding-top: 4upx;padding-bottom: 4upx;"
					>
						自营
					</text>
					<text
						v-else
						style="color: #FFFFFF;background: #FF2638;font-size: 20upx;padding-left: 12upx;padding-right: 12upx;border-radius: 12upx;margin-right: 8upx;padding-top: 4upx;padding-bottom: 4upx;"
					>
						淇湘优购
					</text>
					<text>{{ itemtitle }}</text>
				</text>
				<view>
					<!-- 添加 -->
					 
					<!-- 原始 -->
				
					<view style="margin-top: 4upx;display: flex;margin-bottom: 8upx;justify-content: flex-start;">
						
						<!-- <view style="width: 50%;background-color: #FF2638;  margin-top:12upx;margin-bottom: 0upx;border-radius: 10upx;margin-left: 16upx;padding: 2rpx 6rpx;line-height:16rpx;" >
							<text class="quan" v-if="couponmoney!=null" style="font-size: 10px;color:#FFFFFF;text-align: center;display: block;line-height: 32upx;">
								预估返￥{{ tkmoney }}
							</text>
						</view> -->
						<view v-if="isEnable != '否'" style="display: flex;color: white;font-size: 20upx;margin-top: 6upx;margin-left: 14upx;background: #FFD9D9;border-radius: 5px;">
							<view style="color: #FE6C00;padding: 4upx 12upx 4upx 12upx;  border-radius: 10upx;">劵{{couponmoney}}元</view>
						</view>
					</view>
					
						<view style="display: flex;margin-left: 10upx;">
						<view style="width: 30%;margin-bottom: 4upx;font-size: 28upx;color: #FF2638;padding-top: 4upx;text-align: left;margin-top:6upx;margin-right: 0;">
							<text style="font-size: 28upx;margin-right: 4upx">¥</text>
							<text style="text-align: left;font-weight: bold">{{ itemendprice }}</text>
						</view>
						
						<view style="width: 50%;font-size: 22upx;margin-top: 8upx;margin-left:12upx;color: grey; text-overflow: ellipsis;overflow: hidden;float: right;">{{ itemsale }}</view>
						
					</view>

					<view style="display: flex;margin-top: 8upx;margin-left: 16upx;margin-bottom: 16upx;" v-if="shopname">
						<image style="height: 36upx;width:36upx;margin-right: 8upx" src="../../static/shop.png"></image>
						<view style="font-size: 24upx;color: #999999;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{ shopname }}</view>
					</view>

					<!--  -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'orange-goods-card',
	props: [
		'isEnable',
		'itempic',
		'shopname',
		'itemtitle',
		'tkmoneys',
		'itemprice',
		'itemsale',
		'itemendprice',
		'couponmoney',
		'itemid',
		'logo',
		'index',
		'tkmoney',
		'isInvitation'
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
					} else {
						uni.navigateTo({
							url: '/pages/detail/goodsinfo?itemid=' + itemid
						});
					}
				}
			}
		}
	}
};
</script>

<style>
.dianpu {
	background: rgba(0, 0, 0, 0.1);
	color: #333333;
	position: absolute;
	margin-top: -38upx;
	width: 49%;
	padding-left: 8upx;
	
}

.itemInfo1 {
	/* float: left; */
	/* width: 49%; */
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-radius: 20upx;
	background-color: #fff;
	margin-top: 16upx;
	padding-bottom: 8upx;
	margin-right: 6upx;
	box-shadow: 2upx 0 2upx 2upx rgba(0, 0, 0, 0.1);
}
.img_wrap{
	width: 300rpx;
	height: 280rpx;
}

.img_wrap>image{ 
	display: block;
	width: 100%;
	height: 100%;
	border-radius: 20rpx;
	margin: 0 20rpx 0 30rpx;
}
.right{
	width: 372rpx;
}
.quan {
	/* z-index: 1;
	zoom: 1;
	top: 0;
	overflow: hidden;
	float: right;
	background: -webkit-gradient(linear, left top, left right, color-stop(0, #FF2638), color-stop(100%, #ff927c));
	background: -webkit-linear-gradient(left, #FF2638 0, #ff927c 100%);
	background: -o-linear-gradient(left, #FF2638 0, #ff927c 100%);
	background: -ms-linear-gradient(left, #FF2638 0, #ff927c 100%);
	background: -webkit-gradient(linear, right top, left top, color-stop(0, #FF2638), to(#ff927c));
	background: -webkit-linear-gradient(right, #FF2638 0, #ff927c 100%);
	background: linear-gradient(to left, #FF2638 0, #ff927c 100%);
	position: relative;
	font-style: normal;
	display: block;
	border-radius: 3px;
	-moz-border-radius: 3px;
	-webkit-border-radius: 3px;
	-o-border-radius: 3px;
	-ms-border-radius: 3px;
	font-size: 28upx;
	margin-left: 10px;
	min-width: 20px;
	text-align: center;
	padding: 1px 10px;
	margin-bottom: 4px;
	color: #fff; */
}

.quan:before {
	position: absolute;
	z-index: 1;
	zoom: 1;
	top: 50%;
	margin-top: -3px;
	background: #fff;
	display: block;
	width: 5px;
	height: 5px;
	content: '';
	border-radius: 10px;
	border: 1px solid #fff;
	left: auto;
	right: -4px;
}

.quan:after {
	position: absolute;
	z-index: 1;
	zoom: 1;
	top: 50%;
	margin-top: -3px;
	background: #fff;
	display: block;
	width: 5px;
	height: 5px;
	content: '';
	border-radius: 10px;
	border: 1px solid #fff;
	left: -4px;
}

.twolist-hidden {
	max-height: 40px;
	color: #333;
	font-weight: 400;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
}
</style>
