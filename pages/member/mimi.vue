<template>
	<view style="font-size: 14px;line-height: 26px;padding: 32upx;background: #FFFFFF;" class="home1">
		<view style="text-align: left;text-indent: 2rem;">
			<view v-html="xieyi"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				xieyi: ''
			}
		},
		onLoad() {
			this.getXieYi();
		},
		methods: {
			getXieYi() {
				this.$queue.showLoading('加载中...');
				this.$Request.getT(`/agreement/find?id=2`).then(res => {
					if (res.status === 0) {
						if (res.data.content) {
							this.xieyi = res.data.content;
						}
					}
					uni.hideLoading();
				});
			}
		}
	}
</script>

<style scoped>
	page {
		background: #FFFFFF;
	}
</style>
