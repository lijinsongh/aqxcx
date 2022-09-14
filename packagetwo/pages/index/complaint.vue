<template>
	<view>
		<view style="background: #FFFFFF;padding: 20upx;margin: 20upx;width: 95%;border-radius: 20rpx;">
			<view style="font-size: 32rpx;color: #333333;">投诉详情</view>
			<view class="orang-view">
				<view><textarea placeholder="请输入具体内容" v-model="content"
						style="color: #999999;font-size: 26rpx;width: 100%;" /></view>
			</view>
			<shmily-drag-image :list.sync="imageList"></shmily-drag-image>
		</view>
		<button style="background-color: #FF332F;width: 690upx;color: #FFFFFF;border-radius: 20rpx;margin-top: 40rpx;"
			@click='addPinglun()'>发起投诉</button>
	</view>
</template>

<script>
	import shmilyDragImage from '@/package/components/shmily-drag-image/shmily-drag-image.vue'
	export default {
		components: {
			shmilyDragImage
		},
		data() {
			return {
				stars: [1, 2, 3, 4, 5],
				imageList: [],
				userImage: '',
				userName: '',
				userId: '',
				merchantId: '',
				logo: '',
				sale: '',
				storeId: '',
				storeName: '',
				content: '',
				list: [],
				evaluate: '',
				score: 0
			};
		},
		onLoad(d) {
			this.merchantId = d.merchantId;
			this.storeId = d.storeId;
			this.getDianpuList(this.storeId);
			this.storeName = d.storeName;
			this.userId = this.$queue.getData('userId');
			if (this.userId) {
				this.getUserInfo(this.userId);
			}
		},
		methods: {
			getDianpuList(id) {
				this.$Request.getT('/self/store/find?id=' + id).then(res => {
					if (res.status === 0) {
						this.logo = res.data.logo;
						this.sale = res.data.sale > 10000 ? (res.data.sale / 10000).toFixed(1) + '万' : res.data
							.sale;
					}
				});
			},
			getUserInfo(userId) {
				this.$Request.getT('/user/' + userId).then(res => {
					if (res.status === 0) {
						this.userImage = res.data.image_url;
						this.userName = res.data.nickName;
					}
				});
			},
			getListById(id) {
				uni.showLoading({
					title: '加载中...'
				});
				this.$Request.getT('/orders/find?id=' + id).then(res => {
					if (res.status === 0) {
						this.list = res.data;
					}
					uni.hideLoading();
				});
			},
			addPinglun() {
				uni.showLoading({
					title: '加载中...'
				});
				var image = '';
				for (var i = 0; i < this.imageList.length; i++) {
					if (i === 0) {
						image = this.imageList[i];
					} else {
						image = image + ',' + this.imageList[i];
					}
				}
				if (this.content == '') {
					uni.hideLoading();
					this.$queue.showToast('评论信息不能为空！');
					return;
				}
				let phone = this.$queue.getData('mobile');
				let nickName = this.$queue.getData('nickName');
				let data = {
					content: this.content,
					img: image,
					merchantId: this.merchantId,
					storeId: this.storeId,
					storeName: this.storeName,
					userId: this.userId,
					nickName: nickName,
					phone: phone
				}
				this.$Request.postJson('/self/storeComplain/save', data).then(res => {
					if (res.status === 0) {
						uni.showToast({
							title: '投诉成功！'
						});
						setTimeout(res => {
							uni.hideLoading();
							uni.navigateBack();
						}, 1000);
					}
				});
			}
		}
	};
</script>

<style>
	page {
		background-color: #F2F2F2;
	}

	.orang-view {
		background: #F5F6F8;
		padding: 20upx;
		border-radius: 15upx;
		margin: 20upx 0 40upx;
	}
</style>
