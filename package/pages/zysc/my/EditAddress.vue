<template>
	<view>
		<view style="margin-top: 20upx;background-color: #FFFFFF;height: max-content;padding: 20upx 20upx 20upx 35upx;">
			<input type="text" placeholder="收货人" style="height: 80upx;color: #000000;font-size: 30upx;" v-model="consignee" />
			<input type="number" placeholder="手机号码" maxlength="11" style="height: 80upx;margin-top: 20upx;color: #000000;font-size: 30upx;"
			 v-model="mobile" />
			<!-- <view style="height: 1upx;margin-top: 50upx;"></view> -->
			<input type="text" disabled="disabled" placeholder="请选择地址信息" style="height: 80upx;margin-top: 20upx;color: #000000;font-size: 30upx;" v-model="provinces" @tap="dingwei" />
			<!-- <pickerAddress style="padding-bottom: 20upx;color: #000000;font-size: 30upx;height: 30upx;" @change="change">{{provinces}}</pickerAddress> -->
			<input type="text" v-model="detail" placeholder="详情地址:如道路，门牌号，小区，楼栋号，单元室等" style="height: 80upx;margin-top: 30upx;color: #000000;font-size: 30upx;" />
		</view>
		<view style="height: 100upx;background:#FFFFFF;display: flex;margin-top: 30upx;">
			<view style="font-size: 30upx;color: #333333;text-align: left;padding: 30upx;width: 70%;">设为默认地址</view>
			<switch type="switch" :checked='isDefault === 1 ? true : false' @change="switch1Change" style="padding: 20upx;transform:scale(0.9)" />
		</view>
		<button style="width: 85%;height: 90upx;background: #FF332F;font-size: 32upx;color: #FFFFFF;margin-top: 40upx;border-radius: 50upx;line-height: 100upx;"
		 @tap='setEditAddress'>保存</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				provinces: '',
				consignee: '',
				mobile: '',
				detail: '',
				createAt: '',
				isDefault: 0,
				id: 0
			}
		},
		onLoad(d) {
			let id = d.id;
			if (id) {
				uni.setNavigationBarTitle({
					title: '编辑地址'
				});
				this.getAddressList(id);
			} else {
				uni.setNavigationBarTitle({
					title: '添加地址'
				});
			}
		},
		methods: {
			dingwei() {
				const that = this;
				uni.chooseLocation({
					success: function(res) {
						console.log(res)
						console.log('位置名称：' + res.name);
						console.log('详细地址：' + res.address);
						console.log('纬度：' + res.latitude);
						console.log('经度：' + res.longitude);
						if (res.name && res.address) {
							that.provinces = res.address;
							that.detail = res.name;
							// that.initLocation(res.latitude, res.longitude);
							// that.weizhi.names = res.name;
							// that.weizhi.dizhi = res.address
						} else {
							that.$queue.showToast('请选择正确地址信息！');
						}
					}
				});
			},
			change(data) {
				this.provinces = data.data.join('')
			},
			getAddressList(id) {
				uni.showLoading({
					title: '加载中...'
				});
				this.$Request.getT('/address/find?id=' + id).then(res => {
					if (res.status === 0) {
						this.consignee = res.data.consignee;
						this.mobile = res.data.mobile;
						this.detail = res.data.detail;
						this.isDefault = res.data.isDefault;
						this.id = res.data.id;
						this.createAt = res.data.createAt;
						this.provinces = res.data.provinces;
					}
					uni.hideLoading();
				});
			},
			setEditAddress() {
				let userId = this.$queue.getData('userId');
				let data = {
					consignee: this.consignee,
					detail: this.detail,
					id: this.id,
					isDefault: this.isDefault,
					mobile: this.mobile,
					createAt: this.createAt,
					userId: userId,
					provinces: this.provinces
				}
				if (this.consignee != undefined && this.consignee != '') {} else {
					uni.showToast({
						icon: 'none',
						title: '收货人不能为空'
					});
					return;
				}
				if (this.mobile.length < 11) {
					uni.showToast({
						icon: 'none',
						title: '请输入正确的电话信息'
					});
					return;
				}
				if (this.provinces != undefined && this.provinces != '') {} else {
					uni.showToast({
						icon: 'none',
						title: '请选择地址信息'
					});
					return;
				}
				if (this.detail != undefined && this.detail != '') {} else {
					uni.showToast({
						icon: 'none',
						title: '地址信息不能为空'
					});
					return;
				}
				this.$Request.postJson('/address/save', data).then(res => {
					if (res.status === 0) {
						this.$queue.showToast("修改成功!");
						uni.navigateBack();
					} else {
						this.$queue.showToast(res.msg);
					}
				});
			},
			//校验手机格式
			checkMobile(mobile) {
				return RegExp(/^1[34578]\d{9}$/).test(mobile);
			},
			switch1Change(e) {
				this.isDefault = e.detail.value == true ? 1 : 0;
			}
		}
	}
</script>

<style scoped>
	page {
		background: #F2F2F2;
	}
</style>
