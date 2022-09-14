<template>
	<view class="newTask" v-if="shopSelect != '否'">
		<view class="taskBox">
			<form @submit="formSubmit">
				<tui-list-cell :hover="false">
					<view class="tui-line-cell">
						<view class="tui-title">商户名称</view>
						<input style="font-size: 28upx;text-align: right;" placeholder-class="tui-phcolor" class="tui-input" name="shopName"
						 v-model="shopName" placeholder="请输入商户名称" maxlength="20" type="text" />
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false">
					<view class="tui-line-cell">
						<view class="tui-title">商户负责人</view>
						<input style="font-size: 28upx;text-align: right;" placeholder-class="tui-phcolor" class="tui-input" name="shopFuzeName"
						 v-model="shopFuzeName" placeholder="请输入商户负责人姓名" maxlength="5" type="text" />
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false">
					<view class="tui-line-cell">
						<view class="tui-title">客服电话</view>
						<input style="font-size: 28upx;text-align: right;" placeholder-class="tui-phcolor" class="tui-input" name="shopKeFuPhone"
						 v-model="shopKeFuPhone" placeholder="请输入客服电话" maxlength="11" type="number" />
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false">
					<view class="tui-line-cell">
						<view class="tui-title">负责人电话</view>
						<input style="font-size: 28upx;text-align: right;" placeholder-class="tui-phcolor" class="tui-input" name="shopFuzeNumber"
						 v-model="shopFuzeNumber" placeholder="请输入商户负责人电话" maxlength="11" type="number" />
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false">
					<view class="tui-line-cell">
						<view class="tui-title">商户地址</view>
						<pickerAddress style="padding-bottom: 20upx;color: #000000;font-size: 30upx;" @change="changeShopAddress">{{shopAddress}}</pickerAddress>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false">
					<view class="tui-line-cell">
						<view class="tui-title">商户详细地址</view>
						<input style="font-size: 28upx;text-align: right;" placeholder-class="tui-phcolor" class="tui-input" name="shopDescAddress"
						 v-model="shopDescAddress" placeholder="请输入商户详细地址" maxlength="50" type="text" />
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false">
					<view class="tui-line-cell" style="font-size: 28upx;">
						<view class="tui-title">商户类型</view>
						<radio-group class="radio-group" name="openWay" style="text-align: right;">
							<label class="tui-radio" @click="selectWay(item.id)" v-for="(item,index) in openLists" :key='index'>
								<radio :checked="openWay == item.id" :value="item.id" color="#5677fc" class="myRadio" />
								<text style="font-size: 28upx;">{{ item.text }}</text>
							</label>
						</radio-group>
					</view>
				</tui-list-cell>
				<view v-if="zhuti">
					<block v-if="openWay != 1">
						<view class="title" style="margin-top: 20rpx;">主体信息</view>
						<tui-list-cell :hover="false">
							<view class="tui-line-cell">
								<view class="tui-title">主体名称</view>
								<input style="font-size: 28upx;text-align: right;" placeholder-class="tui-phcolor" class="tui-input" v-model="zhutiName"
								 name="zhutiName" placeholder="请输入主体名称" maxlength="50" type="text" />
							</view>
						</tui-list-cell>
						<tui-list-cell :hover="false">
							<view class="tui-line-cell">
								<view class="tui-title">营业执照编号</view>
								<input style="font-size: 28upx;text-align: right;" placeholder-class="tui-phcolor" class="tui-input" v-model="zhutiYYzhizhao"
								 name="zhutiYYzhizhao" placeholder="请输入营业执照编号" maxlength="50" type="number" />
							</view>
						</tui-list-cell>
						<tui-list-cell :hover="false">
							<view class="tui-line-cell">
								<view class="tui-title">注册地址</view>
								<pickerAddress style="padding-bottom: 20upx;color: #000000;font-size: 30upx;" v-model="zhutiProvince" @change="changeZhuti">{{zhutiProvince}}</pickerAddress>
								<!-- <input style="font-size: 28upx;text-align: right;" placeholder-class="tui-phcolor" class="tui-input" name="zhutiProvince"
								 placeholder="请选择注册地址省市区" maxlength="50" type="text" /> -->
							</view>
						</tui-list-cell>
						<tui-list-cell :hover="false">
							<view class="tui-line-cell">
								<view class="tui-title">详细地址</view>
								<input style="font-size: 28upx;text-align: right;" placeholder-class="tui-phcolor" v-model="zhutiAddressDetail"
								 class="tui-input" name="zhutiAddressDetail" placeholder="请输入详细地址" maxlength="50" type="text" />
							</view>
						</tui-list-cell>
						<view style="width: 50%;">
							<image style="width: 100%;height: 300upx;" :src="yyzhizhaoPicture" @click="uploadImg(0)" />
							<view style="font-size: 28upx;margin-top: 16upx;">
								<text style="margin-left: 12upx;color: red;">*添加营业执照</text>
							</view>
						</view>
					</block>
				</view>
				<view v-if="!zhuti && openWay != 1" @click="addStep" style="padding: 40upx;background: #F0F0F0;text-align: center;margin-top: 16upx;">+主体信息</view>
				<view class="title" style="margin-top: 20rpx;">经营者信息</view>
				<tui-list-cell :hover="false">
					<view class="tui-line-cell">
						<view class="tui-title">经营者姓名</view>
						<input style="font-size: 28upx;text-align: right;" placeholder-class="tui-phcolor" class="tui-input" name="jingyingName"
						 v-model="jingyingName" placeholder="请输入经营者姓名" maxlength="50" type="text" />
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false">
					<view class="tui-line-cell">
						<view class="tui-title">证件类型</view>
						<picker @change="bindPickerChange" :value="index_zj" :range="zhengjian">
							<view class="uni-input">{{ zhengjian[index_zj] }}</view>
						</picker>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false">
					<view class="tui-line-cell">
						<view class="tui-title">证件号码</view>
						<input style="font-size: 28upx;text-align: right;" placeholder-class="tui-phcolor" class="tui-input" name="jingyingSFZ"
						 v-model="jingyingSFZ" placeholder="请输入证件号码" maxlength="18" type="idcard"/>
					</view>
				</tui-list-cell>
				<view style="margin-left: 30rpx;">{{shopSelect != '否' ? '证件照片' : '店铺照片'}}</view>
				<view style="display: flex;margin-top: 16upx;margin-bottom: 16upx;">
					<view style="width: 49%;">
						<image style="width: 100%;height: 300upx;" :src="sfzZheng" @click="uploadImg(1)" />
						<view style="font-size: 28upx;margin-top: 16upx;">
							<text style="margin-left: 12upx;color: red;">{{shopSelect != '否' ? '*正面' : ''}}</text>
						</view>
					</view>
					<view style="width: 49%;margin-left: 10rpx;">
						<image style="width: 100%;height: 300upx;" :src="sfzFan" @click="uploadImg(2)" />
						<view style="font-size: 28upx;margin-top: 16upx;">
							<text style="margin-left: 12upx;color: red;">{{shopSelect != '否' ? '*国徽面' : ''}}</text>
						</view>
					</view>
				</view>
				<view style="width: 49%;margin-left: 10rpx;">
					<image style="width: 100%;height: 300upx;" :src="sfzShou" @click="uploadImg(3)" />
					<view style="font-size: 28upx;margin-top: 16upx;">
						<text style="margin-left: 12upx;color: red;">{{shopSelect != '否' ? '*手持照片' : ''}}</text>
					</view>
				</view>
				<!-- <view class="footer" style="color: #5677FC;">
					<text @tap="isShowAgree" class="cuIcon" :class="showAgree ? 'cuIcon-radiobox' : 'cuIcon-round'">我已阅读、理解并同意</text>
					<navigator url="/pages/task/xieyi" open-type="navigate">《发布规则》</navigator>
				</view> -->
				<view style="color: #999999;font-size: 26upx;padding-left: 32upx;margin-top: 16upx;">
					提示：平台禁止发布黄赌毒、谣言及政治等一切法律禁止的内容；另禁发布与平台同性质的软件，拉人信息（加群，加微信，QQ等），违者将冻结账户，谢谢合作！
				</view>
				<view class="tui-btn-box">
					<button class="tui-button-primary" hover-class="tui-button-hover" formType="submit" type="primary" style="color: #FFFFFF;background: #E6325C;">保存</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	const form = require('@/packagetwo/components/tui-validation/tui-validation.js');
	import pickerAddress from '@/packagetwo/components/wangding-pickerAddress/wangding-pickerAddress.vue'
	import tuiModal from '@/packagetwo/components/tui-modal/tui-modal.vue';
	import tuiListCell from '@/packagetwo/components/tui-list-cell/tui-list-cell.vue';
	import configdata from '../../../common/config.js';
	export default {
		components: {
			tuiModal,
			tuiListCell,
			pickerAddress
		},
		data() {
			return {
				shopSelect: '否',
				index: '0',
				zhuti: false,
				checkState: 0,
				SelectAddress: 0,
				index_zj: 0,
				shopName: '',
				shopFuzeName: '',
				shopKeFuPhone: '',
				shopFuzeNumber: '',
				shopAddress: '选择地址信息',
				shopDescAddress: '',
				jingyingName: '',
				jingyingSFZ: '',
				shopAddressData: [],
				zhutiName: '',
				zhutiYYzhizhao: '',
				zhutiProvince: '选择地址信息',
				zhutiAddressData: [],
				zhutiAddressDetail: '',
				yyzhizhaoPicture: 'https://shop.shengqianxiong.com.cn/img/20201211/0ab14fafa08f404eb03a667bf1ab3882.png',
				sfzZheng: 'https://shop.shengqianxiong.com.cn/img/20201211/0ab14fafa08f404eb03a667bf1ab3882.png',
				sfzFan: 'https://shop.shengqianxiong.com.cn/img/20201211/0ab14fafa08f404eb03a667bf1ab3882.png',
				sfzShou: 'https://shop.shengqianxiong.com.cn/img/20201211/0ab14fafa08f404eb03a667bf1ab3882.png',
				zhengjian: ['中国大陆居民身份证', '中国香港居民来往内地通行证', '中国澳门居民来往内地通行证', '中国台湾居民来往内地通行证', '其他国家或地区居民护照'],
				showAgree: true,
				openWay: 1,
				state: '',
				id: '',
				openLists: [{
						id: '1',
						text: '个人'
					},
					{
						id: '2',
						text: '个体工商户'
					},
					{
						id: '3',
						text: '企业'
					},
					{
						id: '4',
						text: '其他组织'
					}
				]
			};
		},
		onLoad(d) {
			this.shopSelect = this.$queue.getData('shopSelect') ? this.$queue.getData('shopSelect') : '是';
			if(this.shopSelect == '否'){
				uni.setNavigationBarTitle({
					title:'我的店铺'
				})
			}
			if (d.state) {
				this.state = d.state;
				let list = this.$queue.getData('shopApplyList');
				uni.showModal({
					title: '拒绝理由',
					content: '' + list.refundReason,
					showCancel: false,
					confirmText: '确认',
					success: res => {

					}
				});
				this.id = list.id;
				this.shopName = list.storeName;
				this.shopFuzeName = list.legal;
				this.shopKeFuPhone = list.serverPhone;
				this.shopFuzeNumber = list.legalPhone;
				this.shopAddress = list.storeAddressProvince + list.storeAddressCity + list.storeAddressDistrict;
				this.shopAddressData = [list.storeAddressProvince, list.storeAddressCity, list.storeAddressDistrict]
				this.shopDescAddress = list.storeAddressDetail;
				this.jingyingName = list.storeHead;
				this.jingyingSFZ = list.idCardNumber;
				this.sfzZheng = list.idCardImg1;
				this.sfzFan = list.idCardImg2;
				this.sfzShou = list.idCardImg3;
				if (list.storeType != 1) {
					this.openWay = list.storeType;
					this.zhuti = true;
					this.zhutiName = list.companyName;
					this.zhutiYYzhizhao = list.companyCode;
					this.zhutiProvince = list.companyAddressProvince + list.companyAddressCity + list.companyAddressDistrict;
					this.zhutiAddressDetail = list.companyAddressDetail;
					this.yyzhizhaoPicture = list.companyLicenseImg;
					this.zhutiAddressData = [list.companyAddressProvince, list.companyAddressCity, list.companyAddressDistrict];
				}
			}
		},
		methods: {
			bindPickerChange: function(e) {
				this.index_zj = e.target.value;
			},
			changeZhuti(data) {
				this.zhutiProvince = data.data.join('');
				this.zhutiAddressData = data.data;
			},
			changeShopAddress(data) {
				this.shopAddress = data.data.join('');
				this.shopAddressData = data.data;
			},
			selectWay: function(id) {
				this.openWay = id;
				this.zhuti = false;
			},
			addStep() {
				this.zhuti = true;
			},
			uploadImg(index) {
				let that = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: function(res) {
						let token = uni.getStorageSync('token');
						uni.showLoading({
							title: '上传中...'
						});
						uni.uploadFile({
							url: that.config("APIHOST1") + '/alioss/upload', //仅为示例，非真实的接口地址
							filePath: res.tempFilePaths[0],
							header: {
								token: token
							},
							name: 'file',
							success: uploadFileRes => {
								//index 0：营业执照  1，身份证正面  2，身份证反面  3，手持身份证
								if (index === 0) {
									that.yyzhizhaoPicture = JSON.parse(uploadFileRes.data).data;
								} else if (index === 1) {
									that.sfzZheng = JSON.parse(uploadFileRes.data).data;
								} else if (index === 2) {
									that.sfzFan = JSON.parse(uploadFileRes.data).data;
								} else if (index === 3) {
									that.sfzShou = JSON.parse(uploadFileRes.data).data;
								}
								uni.hideLoading();
							}
						});
					}
				});
			},
			config: function(name) {
				var info = null;
				if (name) {
					var name2 = name.split("."); //字符分割
					if (name2.length > 1) {
						info = configdata[name2[0]][name2[1]] || null;
					} else {
						info = configdata[name] || null;
					}
					if (info == null) {
						let web_config = cache.get("web_config");
						if (web_config) {
							if (name2.length > 1) {
								info = web_config[name2[0]][name2[1]] || null;
							} else {
								info = web_config[name] || null;
							}
						}
					}
				}
				return info;
			},
			formSubmit: function(e) {
				if (this.checkState != 0) return;
				this.checkState = 1;
				uni.showLoading({
					title: '提交中...'
				});
				var that = this;
				//表单规则
				let rules = [{
						name: 'shopName',
						rule: ['required'], //可使用区间，此处主要测试功能
						msg: ['请输入商户名称']
					},
					{
						name: 'shopFuzeName',
						rule: ['required'],
						msg: ['请输入商户负责人名称']
					},
					{
						name: 'shopKeFuPhone',
						rule: ['required'],
						msg: ['请输入客服电话']
					},
					{
						name: 'shopFuzeNumber',
						rule: ['required'],
						msg: ['请输入负责人电话']
					},
					{
						name: 'shopDescAddress',
						rule: ['required'],
						msg: ['请输入商户详细地址信息']
					},
					{
						name: 'jingyingName',
						rule: ['required'],
						msg: ['请输入经营者名称']
					},
					{
						name: 'jingyingSFZ',
						rule: ['required'],
						msg: ['请输入经营者身份证号']
					}
				];
				//进行表单检查
				let formData = e.detail.value;
				if (formData) {
					let checkRes = form.validation(formData, rules);
					if (!checkRes) {
						if(this.shopKeFuPhone.length < 11){
							uni.hideLoading();
							uni.showToast({
								icon: 'none',
								title: '请输入正确客服电话'
							});
							this.checkState = 0;
							return;
						}
						if(this.shopFuzeNumber.length < 11){
							uni.hideLoading();
							uni.showToast({
								icon: 'none',
								title: '请输入正确负责人手机号'
							});
							this.checkState = 0;
							return;
						}
						if (this.shopAddress === '' || this.shopAddress === '选择地址信息') {
							uni.hideLoading();
							uni.showToast({
								icon: 'none',
								title: '请选择商户地址信息'
							});
							this.checkState = 0;
							return;
						}

						if (this.sfzZheng === 'https://shop.shengqianxiong.com.cn/img/20201211/0ab14fafa08f404eb03a667bf1ab3882.png') {
							uni.hideLoading();
							uni.showToast({
								icon: 'none',
								title: '请上传身份证正面照片'
							});
							this.checkState = 0;
							return;
						}
						if (this.sfzFan === 'https://shop.shengqianxiong.com.cn/img/20201211/0ab14fafa08f404eb03a667bf1ab3882.png') {
							uni.hideLoading();
							uni.showToast({
								icon: 'none',
								title: '请上传身份证国徽面照片'
							});
							this.checkState = 0;
							return;
						}
						if (this.sfzShou === 'https://shop.shengqianxiong.com.cn/img/20201211/0ab14fafa08f404eb03a667bf1ab3882.png') {
							uni.hideLoading();
							uni.showToast({
								icon: 'none',
								title: '请上传手持身份证照片'
							});
							this.checkState = 0;
							return;
						}

						if (this.openWay != 1) {
							if (this.zhutiName === '') {
								uni.hideLoading();
								uni.showToast({
									icon: 'none',
									title: '请输入主体信息'
								});
								this.checkState = 0;
								return;
							}
							if (this.zhutiYYzhizhao === '') {
								uni.hideLoading();
								uni.showToast({
									icon: 'none',
									title: '请输入营业执照编号'
								});
								this.checkState = 0;
								return;
							}
							if (this.zhutiProvince === '' || this.zhutiProvince === '选择地址信息') {
								uni.hideLoading();
								uni.showToast({
									icon: 'none',
									title: '请选择主体注册地址'
								});
								this.checkState = 0;
								return;
							}
							if (this.zhutiAddressDetail === '') {
								uni.hideLoading();
								uni.showToast({
									icon: 'none',
									title: '请输入主体详细地址信息'
								});
								this.checkState = 0;
								return;
							}

							if (this.yyzhizhaoPicture ===
								'https://shop.shengqianxiong.com.cn/img/20201211/0ab14fafa08f404eb03a667bf1ab3882.png') {
								uni.hideLoading();
								uni.showToast({
									icon: 'none',
									title: '请上传营业执照照片'
								});
								this.checkState = 0;
								return;
							}
						}
						let data = {};
						if (this.openWay != 1) {
							data = {
								id: this.id,
								storeName: formData.shopName, //店铺名称
								storeType: this.openWay, //店铺类型（1个人 2个体工商户 3企业 4其他组织）
								serverPhone: formData.shopKeFuPhone, //客服电话
								legal: formData.shopFuzeName, //店铺负责人
								legalPhone: formData.shopFuzeNumber, //负责人电话
								storeAddressProvince: this.shopAddressData[0], //店铺地址省
								storeAddressCity: this.shopAddressData[1], //店铺地址市
								storeAddressDistrict: this.shopAddressData[2], //店铺地址区
								storeAddressDetail: formData.shopDescAddress, //店铺地址详细
								companyName: formData.zhutiName, //公司名称
								companyCode: formData.zhutiYYzhizhao, //营业执照编号
								companyAddressProvince: this.zhutiAddressData[0], //公司注册地址省
								companyAddressCity: this.zhutiAddressData[1], //公司注册地址市
								companyAddressDistrict: this.zhutiAddressData[2], //公司注册地址区
								companyAddressDetail: formData.zhutiAddressDetail, //公司注册地址
								companyLicenseImg: this.yyzhizhaoPicture, //营业执照照片
								storeHead: formData.jingyingName, //负责人姓名  //经营者个人信息
								idCardType: this.index_zj + 1, //证件类型(1中国大陆居民身份证 2中国香港居民来往内地通行证 3中国澳门居民来往内地通行证 4中国台湾居民来往内地通行证 5其他国家或地区居民护照)
								idCardNumber: formData.jingyingSFZ, //身份证号码
								idCardImg1: this.sfzZheng, //证件照片正面
								idCardImg2: this.sfzFan, //证件照片国徽面
								idCardImg3: this.sfzShou, //手持证件照片
							};
						} else {
							data = {
								id: this.id,
								storeName: formData.shopName, //店铺名称
								storeType: this.openWay, //店铺类型（1个人 2个体工商户 3企业 4其他组织）
								serverPhone: formData.shopKeFuPhone, //客服电话
								legal: formData.shopFuzeName, //店铺负责人
								legalPhone: formData.shopFuzeNumber, //负责人电话
								storeAddressProvince: this.shopAddressData[0], //店铺地址省
								storeAddressCity: this.shopAddressData[1], //店铺地址市
								storeAddressDistrict: this.shopAddressData[2], //店铺地址区
								storeAddressDetail: formData.shopDescAddress, //店铺地址详细
								storeHead: formData.jingyingName, //负责人姓名  //经营者个人信息
								idCardType: this.index_zj + 1, //证件类型(1中国大陆居民身份证 2中国香港居民来往内地通行证 3中国澳门居民来往内地通行证 4中国台湾居民来往内地通行证 5其他国家或地区居民护照)
								idCardNumber: formData.jingyingSFZ, //身份证号码
								idCardImg1: this.sfzZheng, //证件照片正面
								idCardImg2: this.sfzFan, //证件照片国徽面
								idCardImg3: this.sfzShou, //手持证件照片
							};
						}
						if (this.state === '') {
							let token = uni.getStorageSync('token');
							this.$Request.postJson('/self/merchantApply/save', data).then(res => {
								uni.hideLoading();
								if (res.status === 0) {
									uni.showToast({
										title: '提交成功,请等待审核！',
										icon: 'none'
									});
									setTimeout(d => {
										this.checkState = 0;
										uni.navigateBack();
									}, 1000);
								} else {
									this.checkState = 0;
									uni.showToast({
										title: "" + res.msg,
										icon: 'none'
									});
								}
							});
						} else {
							let token = uni.getStorageSync('token');
							this.$Request.postJson('/self/merchantApply/update', data).then(res => {
								uni.hideLoading();
								if (res.status === 0) {
									uni.showToast({
										title: '提交成功,请等待审核！',
										icon: 'none'
									});
									setTimeout(d => {
										this.checkState = 0;
										uni.navigateBack();
									}, 1000);
								} else {
									this.checkState = 0;
									uni.showToast({
										title: "" + res.msg,
										icon: 'none'
									});
								}
							});
						}
					} else {
						uni.hideLoading();
						this.checkState = 0;
						uni.showToast({
							title: checkRes,
							icon: 'none'
						});
					}
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	page {
		background: #FFFFFF;
	}

	.newTask {
		.footer {
			padding-left: 32upx;
			margin-top: 16upx;
			text-align: center;
			display: flex;
		}

		background: #FFFFFF;

		.taskBox {
			// margin-top: 40rpx;
			background: #ffffff;
			padding: 40rpx 24rpx;

			.title {
				border-bottom: 2upx solid #f2f2f2;
				padding-bottom: 32upx;
				margin-left: 32upx;
				font-size: 38upx;
				font-weight: bold;

				.link {
					margin-left: 32upx;
					color: #5677fc;
					font-size: 28upx;
					font-weight: normal;
				}
			}

			.titles {
				border-bottom: 2upx solid #f2f2f2;
				// padding-bottom: 32upx;
				margin-left: 32upx;
				font-size: 32upx;
				font-weight: bold;

				.link {
					margin-left: 32upx;
					color: #5677fc;
					font-size: 28upx;
					font-weight: normal;
				}
			}
		}

		.tui-line-cell {
			width: 100%;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 2upx solid #f2f2f2;
			padding: 0 0 16upx 0;
		}

		.tui-title {
			line-height: 32rpx;
			min-width: 120rpx;
			flex-shrink: 0;
		}

		.tui-input {
			font-size: 32rpx;
			color: #333;
			padding-left: 20rpx;
			flex: 1;
		}

		// .radio-group {
		// 	margin-left: auto;
		// 	transform: scale(0.8);
		// 	transform-origin: 100% center;
		// 	flex-shrink: 0;
		// }

		.tui-radio {
			display: inline-block;
			padding-left: 28rpx;
			font-size: 36rpx;
			vertical-align: middle;
		}

		.myRadio {
			// height: 16upx;
			// width: 16upx;
			margin-top: 16upx;
			margin-right: 16upx;
		}

		.tui-btn-box {
			padding: 40rpx 50rpx;
			box-sizing: border-box;
		}

		.tui-button-gray {
			margin-top: 30rpx;
		}

		.tui-tips {
			padding: 30rpx;
			color: #999;
			font-size: 24rpx;
		}
	}
</style>
