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
				url: 'https://taobao.xianmxkj.com',
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				}
			};
		},
		onLoad(e) {
			if (e.title) {
				uni.setNavigationBarTitle({
					title: e.title
				});
			}
			if (e.url) {
				if (e.url.indexOf('http://') !== -1) {
					this.url = 'http://' + e.url;
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
	@import '../../../../static/css/index.css';
</style>
