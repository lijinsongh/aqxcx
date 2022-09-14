<template>
	<view style="background-color: #FFFFFF;height: 100rpx;">
		<view v-for="(item,index) in list">
			<view style="display: flex;background: #FFFFFF;height: max-content;padding: 20rpx 10rpx 20rpx 30rpx;" @tap='goChat(item)'>
				<min-badge :count='item.userCount'>
					<image :src="item.storeHead ? item.storeHead : '../../../static/logo2.png'" style="width: 80rpx;height: 80rpx;border-radius: 10rpx;"></image>
				</min-badge>
				<view style="margin-left: 20rpx;width: 83%;">
					<view style="display: flex;margin-top: 5rpx;">
						<view style="font-size: 28rpx;color: #000000;width: 55%;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">{{item.storeName}}</view>
						<view style="font-size: 24rpx;margin-top: 8rpx;width: 270rpx;text-align: right;float: right;color: #B3B3B3;">{{item.createTime}}</view>
						<!-- <view style="font-size: 24rpx;margin-top: 8rpx;width: 270rpx;text-align: right;float: right;color: #B3B3B3;">{{item.contentTime}}</view> -->
					</view>
					<view style="margin-top: 10rpx;font-size: 24rpx;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;" v-if="item.content">{{item.content}}</view>
					<view :style="item.content ? 'margin-top: 20rpx;height: 1rpx;background-color: #d8d8d8;' : 'margin-top: 40rpx;height: 1rpx;background-color: #d8d8d8;'"></view>
				</view>
			</view>
		</view>
		<!-- 加载更多提示 -->
		<empty v-if="list.length === 0" des="暂无数据" show="false"></empty>

	</view>
</template>

<script>
	import minBadge from '@/package/components/min-badge/min-badge.vue'
	export default {
		comments: {
			minBadge
		},
		data() {
			return {
				list: []
			}
		},
		onShow() {
			this.getList('');
		},
		onUnload() {
			console.log('onUnload');
		},
		methods: {
			getDateDiff(data) {
				// 传进来的data必须是日期格式，不能是时间戳
				//var str = data;
				//将字符串转换成时间格式
				var timePublish = new Date(data);
				var timeNow = new Date();
				var minute = 1000 * 60;
				var hour = minute * 60;
				var day = hour * 24;
				var month = day * 30;
				var result = "2";

				var diffValue = timeNow - timePublish;
				var diffMonth = diffValue / month;
				var diffWeek = diffValue / (7 * day);
				var diffDay = diffValue / day;
				var diffHour = diffValue / hour;
				var diffMinute = diffValue / minute;


				if (diffMonth > 3) {
					result = timePublish.getFullYear() + "-";
					result += timePublish.getMonth() + "-";
					result += timePublish.getDate();
				} else if (diffMonth > 1) { //月
					result = data.substring(0, 10);
				} else if (diffWeek > 1) { //周
					result = data.substring(0, 10);
				} else if (diffDay > 1) { //天
					result = data.substring(0, 10);
				} else if (diffHour > 1) { //小时
					result = parseInt(diffHour) + "小时前";
				} else if (diffMinute > 1) { //分钟
					result = parseInt(diffMinute) + "分钟前";
				} else {
					result = "刚刚";
				}
				return result;
			},
			goChat(list) {
				uni.navigateTo({
					url: './chat?storeId=' + list.storeId + '&storeHead=' + list.storeHead + '&storeName=' + list.storeName
				});
			},
			getList(type) {
				let invitationCode = this.$queue.getData('invitationCode');
				this.loadingType = 1;
				uni.showLoading({
					title: '加载中...'
				});
				this.$Request.getT('/chat/userList?&userId=' + invitationCode).then(res => {
					if (res.status === 0) {
						this.list = [];
						res.data.forEach(d => {
							d.contentTime = this.getDateDiff(d.contentTime);
							this.list.push(d);
						});
					}
					uni.hideLoading();
					if (type === 'Refresh') {
						uni.stopPullDownRefresh(); // 停止刷新
					}
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	@import '../../../static/less/index.less';
	@import '../../../static/css/index.css';

	page {
		background: #FFFFFF !important;
	}
</style>
