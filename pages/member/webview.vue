<template>
	<view>
		<web-view :webview-styles="webviewStyles" :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		onShareAppMessage(res) {
			return {
				title: '购物先领券，一年省一半',
				path: '/pages/index/index'
			};
		},
		data() {
			return {
				url: '',
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				}
			};
		},
		onLoad(e) {
			
			let url = this.$queue.getData('mturl');
			let url_1 = this.url = this.$queue.getData('dmurl');
			console.log(url, url_1)
			if (e.title) {
				uni.setNavigationBarTitle({
					title: e.title
				});
			}
			// this.url = e.url;
			// console.log(this.url);
			if (e.url) {
				if (e.class) {

					if (e.class === 'mt') {
						clog
						this.url = this.$queue.getData('mturl');
					}

					if (e.class === 'dm') {
						this.url = this.$queue.getData('dmurl');
					}
				} else {
					this.url = e.url;
				}
			} else {
				uni.navigateBack();
			}
		},
		onPullDownRefresh: function() {
			uni.stopPullDownRefresh(); // 停止刷新
		},
		methods: {}
	};
</script>

<style>
	@import '../../static/css/index.css';
</style>
