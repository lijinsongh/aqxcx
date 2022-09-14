<template>
	<view style="margin: 28upx;padding: 16upx;background: #FFFFFF;border-radius: 16upx;">
		<!--头部标题介绍-->
		<view style="display: flex">
			<view>
				<image class="headImage" src="../../../static/logo.png"></image>
			</view>
			<view class="box-name">
				<view class="name" style="width: 100%">
					<text>淇湘优购</text><br>
					<text class="total">{{ showTime | formatDate }}</text>
				</view>
			</view>
		</view>
		<!--短文-->
		<view style="text-align: left;display: flex;margin-top: 8px">
			<view>
				<view class="content" v-html="content"></view>
				<!-- <view style="color: #E40806;margin-top: 4px" @click="copyHref()">#点击此处复制分享素材#</view> -->
			</view>
		</view>

		<!--图片-->
		<view style="display: flex">
			<view>
				<view v-for="(g, index) in goods" :key="index" class="box-float">
					<image lazy-load='true' fade-show='true' class="image" :src="g.image + '_310x310.jpg'" @click="openGoods(g.to)"></image>
					<view style="font-size: 12px;position: absolute; bottom: 0; left: 0;background: #FF896F;color: white;padding-right: 4px;padding-left: 4px">{{ g.price }}</view>
				</view>
			</view>
		</view>

		<!--底部-->
		<view style="display: flex;margin-top:30upx;width: 100%;">
			<view @click="copyHref()" style="padding: 5upx;width: 300upx;border-radius: 50upx;border: 1upx solid #FF1212;text-align: center;color: #FF0000;font-size: 24upx;">#点击此处分享复制素材</view>
			<view style="text-align: right;margin-left: 20%;">
				<text class="total">
					{{ total }}次被领取
				</text>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		name: 'orange-handpick',
		props: ['total', 'content', 'goods', 'showTime', 'price', 'copy_text'],
		methods: {
			/**
			 * 复制链接
			 */
			copyHref() {
				uni.setClipboardData({
					data: this.copy_text,
					success: r => {
						this.$queue.showToast('复制成功');
					}
				});
			},
			openGoods(to) {
				let relation_id = this.$queue.getData('relation_id');
				if (relation_id) {
					uni.navigateTo({
						url: '/pages/detail/goodsinfo?itemid=' + to + '&relation_id=' + relation_id
					});
				} else {
					uni.navigateTo({
						url: '/pages/detail/goodsinfo?itemid=' + to
					});
				}
			}
		},
		filters: {
			formatDate: function(value) {
				value = parseInt(value + '000');
				let date = new Date(value);
				let y = date.getFullYear();
				let MM = date.getMonth() + 1;
				MM = MM < 10 ? '0' + MM : MM;
				let d = date.getDate();
				d = d < 10 ? '0' + d : d;
				let h = date.getHours();
				h = h < 10 ? '0' + h : h;
				let m = date.getMinutes();
				m = m < 10 ? '0' + m : m;
				let s = date.getSeconds();
				s = s < 10 ? '0' + s : s;
				return MM + '-' + d
			}
		}
	};
</script>

<style scoped>
	.headImage {
		margin-right: 8px;
		height: 35px;
		width: 35px;
		border-radius: 50%;
	}

	.name {
		font-size: 15px;
		color: #333333;
	}

	.total {
		font-size: 14px;
		color: #999999;
		/* padding-left: 16px; */
	}

	.box-name {
		display: flex;
		align-items: center;
	}

	.content {
		font-size: 15px;
	}

	.box-float {
		float: left;
		position: relative;
		padding-top: 5px;
		padding-left: 5px;
	}

	.image {
		height: 180upx;
		width: 180upx;
	}

	.time {
		font-size: 15px;
		color: #999999;
	}

	.box-footer {
		margin-bottom: 5px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>