<template>
	<view class="container" style="padding-bottom: 50rpx;">
		<view class="user-section">
			<view class="bg" style="height:120px;"></view>
			<view class="user-info-box">
				<view style="display: flex;flex-direction: row;justify-content: space-between;margin-top: 20px;">
					<view style="width: 24%;" class="portrait-box" @click="goLogin">
						<image class="portrait" :src="image_url"></image>
					</view>
					<view style="text-align: left;margin-left: 12upx;width: 260px;position: relative;">
						<view class="info-box" @click="goUpdataNickName" style="margin-top: 16upx">
							<text v-if="mobile" class="username"
								style="color: #FEFEFE">{{ mobile ? mobile : '游客' }}</text>
						</view>
						<view style="display: flex;">
							<view v-if="isTuan == 1&&isEnable != '否'"
								style="margin-top: 12upx;font-size: 24upx;color: #FEFEFE;padding: 4upx 20upx;">
								团长
							</view>
							<view @click="copyHref" v-if="relation_id&&isEnable != '否'"
								style="margin-top: 12upx;font-size: 24upx;color: #FEFEFE;padding: 4upx 20upx;">
								ID：{{ invitationCode }}
							</view>
						</view>

					</view>

				</view>

			</view>

		</view>

		<view style="width: 100%;margin-top:-30px;" class="tools">
			<!-- @tap="href(7)" -->
			<view class="tui-box tui-tool-box" style="margin:0 auto;">
				<view class="tui-cell-header">
					<view class="tui-cell-title">常用工具</view>
				</view>
				<view class="tui-order-list tui-flex-wrap">
					<view class="tui-tool-item" @click="navTo('/packagetwo/pages/footer/like')">
						<view class="tui-icon-box">
							<image src="https://taobaoshop.xianmxkj.com/user/gj1.png" class="tui-tool-icon"></image>
						</view>
						<view class="tui-tool-text">我的订单</view>
					</view>
					<!-- @click="navTo('/package/pages/zysc/member/customer')"-->
					<view class="tui-tool-item" >
						<button class="tui-tool-text"  @click="tel">
							<view class="tui-icon-box" style="display: flex;justify-content: center;">
								<image src="https://taobaoshop.xianmxkj.com/user/gj3.png" class="tui-tool-icon"></image>
							</view>
							联系客服
							</button>
					</view>
					<view class="tui-tool-item" @click="navTo('/package/pages/chat/feedback')">
						<view class="tui-icon-box">
							<image src="https://taobaoshop.xianmxkj.com/user/gj6.png" class="tui-tool-icon"></image>
						</view>
						<view class="tui-tool-text">意见反馈</view>
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="popus" type="bottom">
			<view style="width: 98%;height: max-content;background: #FFFFFF;border-radius: 20upx;margin: 10rpx;">
				<view style="width: 100%;text-align: center;padding: 40upx;color: #09BB07;"
					@click="navTo('/package/pages/member/shopapply')">新商户入驻</view>
				<view style="height: 1rpx;background: #c1c1c1;"></view>
				<view style="width: 100%;text-align: center;padding: 40upx;"
					@click="navTo('/package/pages/member/checkShopApply')">商户修改</view>
			</view>
			<view style="width: 98%;height: max-content;background: #FFFFFF;border-radius: 20upx;margin: 10rpx;">
				<view style="width: 100%;text-align: center;padding: 40upx;color: #999999;" @click="closePopu">取消</view>
			</view>
		</uni-popup>
	</view>
	</view>
	</view>
</template>
<script>
	import listCell from '../../components/mix-list-cell';
	import wmPosters from '@/components/wm-poster/wm-posters.vue';
	import configdata from '../../common/config.js';
	export default {
		components: {
			listCell,
			wmPosters
		},
		data() {
			return {
				maxNum: false,
				modalName: '',
				couponlist: [],
				des: '会员申请',
				coverTransform: 'translateY(0px)',
				coverTransition: '0s',
				mobile: '游客',
				relation_id: '',
				invitationCode: '',
				jifen: '0',
				image_url: '/static/logo.png',
				gender: '',
				isTuan: 0,
				moneyAll: '0',
				moneys: '0',
				messageList: [],
				jiesuan: '0',
				grade: '',
				phone: '',
				dengji: '',
				dengjides: '',
				lastjiesuan: '0',
				lastMoneyAll: '0',
				orderNum: '0',
				orderMonthNum: '0',
				totalMoney: '0',
				isInvitation: 0,
				moving: false,
				isEnable: '是',
				itemendprice: '识别二维码免费领取',
				itemtitle: '',
				totalMoney1: '0',
				itemprice: '',
				erweima: '',
				itempic: '',
				maxMoney: '0.7',
				footprintKey: 'orange-sqx-footprint'
			};
		},

		onLoad() {
			let userId = this.$queue.getData('userId');
			if (userId) {
				this.getUserInfo(userId);
			}
			//#ifdef H5
			if (window.location.href.indexOf('?invitation=') !== -1 || window.location.href.indexOf('&invitation=') !== -
				1) {
				if (window.location.href.indexOf('?invitation=') !== -1) {
					this.$queue.setData('relation', window.location.href.split('?invitation=')[1].split('&')[0]);
				} else {
					this.invitation = window.location.href.split('&invitation=')[1].split('&')[0];
					this.$queue.setData('relation', window.location.href.split('&invitation=')[1].split('&')[0]);
				}
			}
			//#endif
		},
		onShow() {
			let a = this.$queue.getData('isEnable');
			if (a) {
				this.isEnable = a;
			}
			this.maxMoney = this.$queue.maxMoney();
			let mobile = this.$queue.getData('nickName');
			this.phone = this.$queue.getData('mobile');
			let image_url = this.$queue.getData('image_url');
			let gender = this.$queue.getData('gender');

			if (mobile && mobile !== 'undefined') {
				this.mobile = mobile;
			} else {
				this.mobile = '游客';
			}
			if (image_url && image_url !== 'undefined') {
				this.image_url = image_url;
			} else {
				this.image_url = '/static/logo.png';
			}
			if (gender) {
				this.gender = gender;
			}
			let relation_id = this.$queue.getData('relation_id');
			if (relation_id && relation_id !== 'undefined') {
				this.des = '我的特权';
				this.relation_id = relation_id;
			} else {
				this.des = '会员申请';
				this.relation_id = '';
			}

			// let isMember = this.$queue.getData('isMember');
			// if (isMember == 1) {
			// 	this.des = '我的会员';
			// } else {
			// 	this.des = '开通会员';
			// }

			let userId = this.$queue.getData('userId');
			if (userId) {
				this.getMoney();
				this.getUserInfo(userId);
				this.couponlist = this.$queue.get(this.footprintKey);
				this.$Request.getT('/cash/money/' + userId).then(res => {
					if (res.status === 0 && res.data) {
						this.moneys = parseFloat(res.data).toFixed(2);

						// this.$Request.getT('/userMoney/selectUserMoney?userId=' + userId).then(ress => {
						// 	if (ress.status === 0) {
						// 		ress.data.money = ress.data.money ? ress.data.money : 0;
						// 		this.moneys = parseFloat(parseFloat(res.data) + parseFloat(ress.data
						// 			.money)).toFixed(2);
						// 	}
						// 	uni.hideLoading();
						// });

					} else {
						this.moneys = '0';
					}
				});
			} else {
				this.isTuan = 0;
				this.totalMoney = '0';
				this.orderNum = '0';
				this.moneys = '0';
				this.moneyAll = '0';
				this.lastjiesuan = '0';
				this.lastMoneyAll = '0';
				this.orderMonthNum = '0';
				this.jiesuan = '0';
				this.jifen = '0';
			}
		},

		methods: {
			tel(){
				// #ifdef  MP-WEIXIN  || APP || H5
				wx.openCustomerServiceChat({
					extInfo: {
						url:'https://work.weixin.qq.com/kfid/kfc66a4602ac1be2737', //客服地址链接
					},
					corpId:'ww86fece788c7a821c', //必须和你小程序上的一致
					success(res) {
						console.log(res, 1)
					},
					fail(res) {
						console.log(res, 2)
					},
				})
				// #endif
			},
			closePopu() {
				this.$refs.popus.close();
			},
			goEditShop() {
				let token = this.$queue.getData('token');
				if (token) {
					this.$refs.popus.open();
				} else {
					this.goLoginInfo();
				}
			},
			// 添加  我的返利 
			navTomy() {
				uni.navigateTo({
					url: '/pages/my/my'
				});
			},
			//升级规则弹框
			shengJiMethod() {
				uni.navigateTo({
					url: '/pages/member/yao'
				});
			},
			//邀请码复制
			copyHref() {
				uni.setClipboardData({
					data: this.invitationCode,
					success: r => {
						this.$queue.showToast('邀请码复制成功');
					}
				});
			},
			getLevelList(memberId) {
				let userId = this.$queue.getData('userId');
				this.$Request.getT('/memberConfig/selectMemberConfigLists?classify=2').then(res => {
					if (res.status == 0) {
						res.data.forEach((d, index) => {
							if (memberId == d.memberIndex) {
								if (res.data.length == index + 1) {
									this.maxNum = true;
								} else {
									this.$Request.getT('/selfGoodsMember/selectMemberConfigByNum?userId=' +
										userId).then(ress => {
										if (ress.status == 0) {
											this.dengjides = parseInt(res.data[index + 1].num) -
												parseInt(ress.data)
										}
									});
								}
							}
						});
					}
				})
			},
			//获取用户信息
			getUserInfo(userId) {
				this.$Request.getT('/user/' + userId).then(res => {
					if (res.status === 0 && res.data) {
						if (res.data.orderJifen) {
							this.jifen = parseFloat(res.data.orderJifen).toFixed(0);
						}
						this.$queue.setData('image_url', res.data.image_url);
						this.$queue.setData('relation_id', res.data.relationId);
						this.$queue.setData('rate', res.data.rate);
						this.$queue.setData('fanRate', res.data.fanRate);
						this.$queue.setData('isMember', res.data.isMember);
						this.$queue.setData('nickName', res.data.nickName);
						this.$queue.setData('isInvitation', res.data.isInvitation);
						if (res.data.isTuan) {
							this.isTuan = parseInt(res.data.isTuan);
						}
						this.invitationCode = res.data.invitationCode;


						// if (res.data.memberId) {
						// 	this.dengji = res.data.memberId;
						// 	this.getLevelList(res.data.memberId);
						// } else {
						// 	this.dengji = 0;
						// }

						if (res.data.gradeDes) {
							this.dengji = res.data.gradeDes;
						} else {
							this.dengji = 'VIP 0';
						}

						if (res.data.gradeDes) {
							this.dengji = res.data.gradeDes;
						} else {
							this.dengji = 'VIP 0';
						}
						if (res.data.gradeNumber) {
							if (res.data.gradeNumber == '还可邀请0人') {
								this.dengjides = '已到达最高等级';
							} else {
								this.dengjides = res.data.gradeNumber;
							}
						} else {
							let number = this.$queue.invitaionNum();
							this.dengjides = '还可邀请' + number + '人';
						}






						this.grade = res.data.grade;
						this.isInvitation = res.data.isInvitation;
						this.$queue.setData('relation', res.data.invitation);
						this.$queue.setData('gender', parseInt(res.data.gender));
						this.gender = parseInt(res.data.gender);
						if (res.data.image_url) {
							this.image_url = res.data.image_url;
						} else {
							this.image_url = '/static/logo.png';
						}
						if (res.data.relationId) {
							this.relation_id = res.data.relationId;
							this.des = '我的特权';
						} else {
							this.relation_id = '';
							this.des = '会员申请';
						}
						if (res.data.nickName) {
							this.mobile = res.data.nickName;
						} else {
							this.mobile = res.data.phone;
						}
					} else {
						this.$queue.logout();
						uni.showModal({
							title: '用户信息提示',
							content: '本地用户信息失效需要重新授权登录',
							showCancel: false,
							success: e => {
								//#ifdef H5
								if (e.confirm) {
									window.location.reload();
								} else {
									window.location.reload();
								}
								//#endif
								//#ifndef H5
								this.navTo('/pages/public/login');
								//#endif
							}
						});
					}
				});
			},

			//会员申请弹框
			copyTklWenAn: function() {
				let relation_id = this.$queue.getData('relation_id');
				let token = this.$queue.getData('token');
				let userId = this.$queue.getData('userId');
				let gradle = this.$queue.getData('gradle');
				if (!token) {
					this.goLoginInfo();
				} else {
					// uni.navigateTo({
					// 	url: '/pages/my/vipdetail'
					// });
					if (!relation_id) {
						this.navTo('/pages/member/publisher?uid=' + userId + '&token=' + token);
					} else {
						uni.showModal({
							cancelText: '关闭',
							confirmColor: '#FF0000',
							cancelColor: '#999999',
							confirmText: '我要升级',
							showCancel: true,
							title: '我的特权',
							content: '1、享受 ' +
								this.dengji +
								'级返现！\n2、购买商品可享受省钱 +返现！\n3、分享商品给好友购买拿返现金额！\n4、邀好友加入享受永久粉丝提成！\n5、享受积分免费兑换商品;\n6、更多会员特权我们将陆续上线！\n注：VIP越高返现越高哦',
							success: res => {
								if (res.confirm) {
									this.shengJiMethod();
								}
							}
						});
					}
				}
			},
			//获取付款收入查询
			getMoney() {
				let that = this;
				let token = this.$queue.getData('token');
				let relation_id = this.$queue.getData('relation_id');
				if (token && relation_id && relation_id !== 'undefined') {
					//团队本月付款收入
					var date = new Date();
					var year = date.getFullYear();
					var month = date.getMonth() + 1;
					var day = date.getDate();
					if (month < 10) {
						month = '0' + month;
					}
					if (day < 10) {
						day = '0' + day;
					}
					var month1 = date.getMonth();
					var nowDate = year + '-' + month;
					if (month1 < 10) {
						month1 = '0' + month1;
					}
					var lastDate = year + '-' + month1;
					this.$Request.getT('/statistics/TeamOrderTotalByRelation?relation=' + relation_id +
						'&tk_status=12&time=' +
						nowDate).then(res => {
						if (res.status === 0) {
							let totalMoney = 0;
							if (res.data) {
								totalMoney = parseFloat(res.data).toFixed(2);
							}
							this.$Request.getT('/statistics/TeamOrderTotalByRelation?relation=' + relation_id +
								'&tk_status=3&time=' +
								nowDate).then(res => {
								if (res.status === 0 && res.data) {
									this.totalMoney = (parseFloat(res.data) + parseFloat(totalMoney))
										.toFixed(2);
								} else {
									this.totalMoney = totalMoney;
								}

								uni.hideLoading();
							});
						} else {
							this.totalMoney = '0';
						}

						uni.hideLoading();
					});

					//预估本月付款收入查询
					this.$Request.getT('/order/count?relation_id=' + relation_id + '&tk_status=12').then(res => {
						if (res.status === 0 && res.data) {
							that.moneyAll = parseFloat(res.data).toFixed(2);
						} else {
							that.moneyAll = '0';
						}
					});
					//预估本月结算查询
					this.$Request.getT('/order/count?relation_id=' + relation_id + '&tk_status=3').then(res => {
						if (res.status === 0 && res.data) {
							that.jiesuan = parseFloat(res.data).toFixed(2);
						} else {
							that.jiesuan = '0';
						}
					});

					//预估上月结算查询
					this.$Request.getT('/order/last/count?relation_id=' + relation_id + '&tk_status=3').then(res => {
						if (res.status === 0 && res.data) {
							that.lastjiesuan = parseFloat(res.data).toFixed(2);
						} else {
							that.lastjiesuan = '0';
						}
						this.$Request.getT('/statistics/TeamOrderTotalByRelation?relation=' + relation_id +
							'&tk_status=3&time=' +
							lastDate).then(res => {
							if (res.status === 0 && res.data) {
								this.lastjiesuan = (parseFloat(res.data) + parseFloat(this.lastjiesuan))
									.toFixed(2);
							} else {
								this.lastjiesuan = this.lastjiesuan;
							}

							uni.hideLoading();
						});
					});
					//预估上月付款查询
					this.$Request.getT('/order/last/count?relation_id=' + relation_id + '&tk_status=12').then(res => {
						if (res.status === 0 && res.data) {
							that.lastMoneyAll = parseFloat(res.data).toFixed(2);
						} else {
							that.lastMoneyAll = '0';
						}
						this.$Request.getT('/statistics/TeamOrderTotalByRelation?relation=' + relation_id +
							'&tk_status=12&time=' +
							lastDate).then(res => {
							if (res.status === 0 && res.data) {
								this.lastMoneyAll = (parseFloat(res.data) + parseFloat(this.lastMoneyAll))
									.toFixed(2);
							} else {
								this.lastMoneyAll = this.lastMoneyAll;
							}

							uni.hideLoading();
						});
					});
					//今日付款订单数
					this.$Request.getT('/order/paidCount/' + relation_id).then(res => {
						if (res.status === 0 && res.data) {
							that.orderNum = res.data;
						} else {
							that.orderNum = '0';
						}
					});
				} else {
					that.totalMoney = '0';
					that.orderNum = '0';
					that.moneys = '0';
					that.moneyAll = '0';
					that.lastjiesuan = '0';
					that.lastMoneyAll = '0';
					that.orderMonthNum = '0';
					that.jiesuan = '0';
				}
			},
			//立即提现
			getMoneys() {
				let token = this.$queue.getData('token');
				if (token) {
					this.navTo('/pages/member/cash');
				} else {
					this.goLoginInfo();
				}
			},
			//结算弹框
			showMessage() {
				uni.showModal({
					showCancel: false,
					title: '结算提示',
					confirmColor: '#FF2638',
					content: '每个月25号结算上月【确认收货】的订单，结算完成后【可提现金额】才会同步更新金额。因结算订单量大，结算时间会较长，结算会在25号晚上完成，建议您26号进行提现。\n举例：5月份确认收货订单，6月25号才会进行结算，以此类推'
				});
			},
			//上月预估收入弹框
			shangyueyugu() {
				uni.showModal({
					showCancel: false,
					confirmColor: '#FF2638',
					title: '上月预估',
					content: '上月预估个人【确认收货】和团队【确认收货】订单的佣金收入\n本月25号结算提现'
				});
			},
			shangyueyugu1() {
				uni.showModal({
					showCancel: false,
					confirmColor: '#FF2638',
					title: '上月付款收入说明',
					content: '上月个人【已付款】和团队【已付款】订单的佣金收入\n本月25号结算'
				});
			},
			//团队收益
			taunduishouyi() {
				uni.showModal({
					showCancel: false,
					confirmColor: '#FF2638',
					title: '团队收益说明',
					content: '本月团队【确认收货】和【已付款】订单的佣金收入！下月25号结算'
				});
			},
			//积分说明弹框
			jifenDes() {
				uni.showModal({
					showCancel: false,
					title: '积分说明',
					content: '咖哧优品中累计付款金额，积分到达一定数量可免费兑换商品'
				});
			},
			//本月结算收入弹框
			benyuejiesuan() {
				uni.showModal({
					showCancel: false,
					confirmColor: '#FF2638',
					title: '本月结算收入说明',
					content: '本月【确认收货】订单的佣金收入\n下月25号结算'
				});
			},
			//本月付款收入说明弹框
			benyuefukuan() {
				uni.showModal({
					showCancel: false,
					confirmColor: '#FF2638',
					title: '本月返利收入说明',
					content: '本月【已付款】订单的佣金收入\n用户付款未确认收货的订单'
				});
			},
			//今日订单说明弹框
			jinridingdan() {
				uni.showModal({
					showCancel: false,
					confirmColor: '#FF2638',
					title: '今日订单说明',
					content: '今日用户【已付款】的订单笔数'
				});
			},
			/**
			 * 统一跳转接口,拦截未登录路由
			 * navigator标签现在默认没有转场动画，所以用view
			 */
			navTo(url) {
				console.log(url);
				this.closePopu();
				console.log(this.$queue.publicYuMing());
				if (url === '/pages/member/help') {
					//#ifdef H5
					window.location.href = this.$queue.publicYuMing()+'/help/custom.html';
					console.log(window.location.href);
					//#endif
					//#ifndef H5
					uni.navigateTo({
						url: '/pages/member/webview?url=' + this.$queue.publicYuMing() + '/help/custom.html'
					});
					//#endif
				} else {
					
					uni.navigateTo({
						url
					});
				}
			},
			//订单详情跳转
			navToOrder(itemid) {
				let relation_id = this.$queue.getData('relation_id');
				if (relation_id && relation_id !== 'undefined') {
					uni.navigateTo({
						url: '/pages/detail/goodsinfo?itemid=' + itemid + '&relation_id=' + relation_id
					});
				} else {
					uni.navigateTo({
						url: '/pages/detail/goodsinfo?itemid=' + itemid
					});
				}
			},


			/**
			 * 统一跳转接口,拦截未登录路由
			 * navigator标签现在默认没有转场动画，所以用view
			 */
			navToLogin(url) {
				let token = this.$queue.getData('token');
				let mobile = this.$queue.getData('mobile');
				let userId = this.$queue.getData('userId');
				if (token) {
					uni.navigateTo({
						url
					});
				} else {
					this.goLoginInfo();
				}
			},
			//统一登录跳转
			goLoginInfo() {
				this.$queue.setData('href', '/pages/member/user');
				uni.navigateTo({
					url: '/pages/member/register'
				});
			},
			navToLogins(url) {
				let token = this.$queue.getData('token');
				if (token) {
					let relation_id = this.$queue.getData('relation_id');
					if (relation_id) {
						uni.navigateTo({
							url
						});
					} else {
						uni.showModal({
							showCancel: true,
							title: '温馨提示',
							confirmColor: '#FF2638',
							cancelText: '#999999',
							cancelText: '关闭',
							confirmText: '开通会员',
							content: '此功能为会员专享功能\n申请成为会员后可使用',
							success: res => {
								if (res.confirm) {
									this.copyTklWenAn();
								}
							}
						});
					}
				} else {
					this.goLoginInfo();
				}
			},
			goUpdataNickName() {
				let token = this.$queue.getData('token');
				if (token) {
					uni.navigateTo({
						url: './updateNickName'
					});
				} else {
					this.goLoginInfo();
				}
			},
			goLogin() {
				let token = this.$queue.getData('token');
				if (!token) {
					this.goLoginInfo();
				} else {
					let that = this;
					var url = null;
					let userId = this.$queue.getData('userId');
					uni.showActionSheet({
						// itemList按钮的文字接受的是数组
						itemList: ["查看头像", "从相册选择图片"],
						success(e) {
							var index = e.tapIndex
							if (index === 0) {
								// 用户点击了预览当前图片
								// 可以自己实现当前头像链接的读取
								let url = that.image_url;
								let arr = []
								arr.push(url)
								uni.previewImage({
									// 预览功能图片也必须是数组的
									urls: arr
								})
							} else if (index === 1) {
								uni.chooseImage({
									count: 1, //默认9
									sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
									sourceType: ['album'], //从相册选择
									success: function(res) {
										uni.showLoading({
											title: '上传中...'
										});
										let token = uni.getStorageSync('token');
										uni.uploadFile({
											url: that.config("APIHOST1") +
												'/alioss/uploadUniApp', //仅为示例，非真实的接口地址
											filePath: res.tempFilePaths[0],
											header: {
												token: token
											},
											name: 'file',
											success: uploadFileRes => {
												url = uploadFileRes.data;
												that.$Request.postJson(
													'/user/updateImgUrl?userId=' +
													userId + '&imgUrl=' + url).then(
													res => {
														uni.hideLoading();
														if (res.status === 0) {
															that.$queue.showToast(
																"更新成功");
															that.getUserInfo(userId);
														}
													});
											}
										});
									}
								});
							}
						}
					})
				}
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
			}
		}
	};
</script>
<style lang="scss" scoped>
	page {
		background: #f8f8f8;
	}

	.tui-order-text,
	.tui-tool-text {
		font-size: 26rpx;
		font-weight: 400;
		color: #666;
		padding-top: 16rpx;
	}

	.tui-tool-text {
		font-size: 24rpx;
	}

	.tui-order-list {
		width: 100%;
		height: 134rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.tui-order-item {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.tui-box {
		width: 100%;
		background: #fff;
		box-shadow: 0 3rpx 20rpx rgba(183, 183, 183, 0.3);
		border-radius: 10rpx;
		// overflow: hidden;
	}

	.tui-cell-header {
		width: 100%;
		height: 74rpx;
		padding: 0 26rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.tui-cell-title {
		font-size: 30rpx;
		line-height: 30rpx;
		font-weight: 600;
		color: #333;
	}

	.tui-tool-box {
		margin-top: 20rpx;
	}

	// 收藏夹
	.addTo {
		display: flex;
		flex-direction: column;
		color: #ffff;
		text-align: center;
	}

	.tui-flex-wrap {
		flex-wrap: wrap;
		height: 350upx;
		padding-bottom: 30rpx;
	}

	.tui-tool-item {
		width: 25%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding-top: 30rpx;
	}

	.tti {
		width: 20%;
	}

	.tui-tool-icon {
		width: 60rpx;
		height: 60rpx;
		display: block;
		padding: 4upx;
	}

	.tui-badge-icon {
		width: 66rpx;
		height: 30rpx;
		position: absolute;
		right: 0;
		transform: translateX(88%);
		top: -15rpx;
	}

	%flex-center {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	%section {
		display: flex;
		justify-content: space-around;
		align-content: center;
		background: #fff;
		border-radius: 10px;
	}

	.tixian {
		background: -moz-linear-gradient(left, #FF2638, #FF2638 100%);
		background: -webkit-gradient(linear, left top, left right, color-stop(0, #FF2638), color-stop(100%, #FF2638));
		background: -webkit-linear-gradient(left, #FF2638 0, #FF2638 100%);
		background: -o-linear-gradient(left, #FF2638 0, #FF2638 100%);
		background: -ms-linear-gradient(left, #FF2638 0, #FF2638 100%);
		background: linear-gradient(to left, #FF2638 0, #FF2638 100%);
	}

	.user-section {
		margin-top: -20upx;
		height: 400upx;
		padding: 50upx 50upx 0;
		position: relative;

		.bg {
			background: -webkit-linear-gradient(left, #FF2638 0, #FF2638 100%);
			background: -o-linear-gradient(left, #FF2638 0, #FF2638 100%);
			background: -ms-linear-gradient(left, #FF2638 0, #FF2638 100%);
			background: -webkit-gradient(linear, right top, left top, color-stop(0, #FF2638), to(#FF2638));
			background: -o-linear-gradient(right, #FF2638 0, #FF2638 100%);
			background: linear-gradient(to left, #FF2638 0, #FF2638 100%);
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			filter: blur(1px);
		}
	}

	.user-info-box {
		width: 100%;
		height: 200upx;
		// display: flex;
		align-items: center;
		position: relative;
		z-index: 1;

		.portrait {
			width: 140upx;
			height: 140upx;
			border-radius: 50%;
		}

		.username {
			font-size: 32upx;
			color: #f2f2f2;
			margin-top: 32upx;
			margin-left: 20upx;
		}

		.username1 {
			font-size: 28upx;
			color: whitesmoke;
			margin-top: 32upx;
			margin-left: 20upx;
		}
	}

	.vip-card-box {
		display: flex;
		flex-direction: column;
		margin-top: 52upx;
		color: #f7d680;
		border: 2upx dashed #F2F2F2;
		height: 110upx;
		overflow: hidden;
		position: relative;
		padding: 40upx 28upx;

		.card-bg {
			position: absolute;
			top: 40upx;
			right: 0;
			width: 440upx;
			height: 320upx;
		}

		.b-btn {
			position: absolute;
			right: 20upx;
			top: 24upx;
			width: 160upx;
			height: 60upx;
			text-align: center;
			line-height: 60upx;
			font-size: 28upx;
			color: #36343c;
			border-radius: 32upx;
			background: linear-gradient(to left, #f9e6af, #ffd465);
			z-index: 1;
		}

		.tit {
			font-size: 14px;
			color: #f7d680;
			margin-bottom: 16px;
		}
	}

	.cover-container {
		padding: 0 28upx;
		position: relative;
		margin-top: -44upx;
		padding-bottom: 24upx;

		.arc {
			position: absolute;
			left: 0;
			top: -17px;
			width: 100%;
			height: 22px;
		}
	}

	.tj-sction {
		@extend %section;

		.tj-item {
			display: flex;
			// @extend %flex-center;
			flex-direction: column;
			// height: 80px;
			font-size: $font-sm;
			color: #75787d;
		}

		.num {
			// font-size: $font-lg;
			// color: $font-color-dark;
			margin-bottom: 8px;

			font-size: 38upx;
			font-family: DINPro;
			font-weight: bold;
			color: #333333;
		}

		.gry {

			font-size: 24upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #999999;
		}
	}

	.order-section {
		@extend %section;
		padding: 16px 0;
		margin-top: 12px;

		.order-item {
			@extend %flex-center;
			width: 70px;
			height: 70px;
			border-radius: 10px;
			font-size: $font-sm;
			color: $font-color-dark;
		}

		.yticon {
			font-size: 24px;
			margin-bottom: 12px;
			color: #fa436a;
		}

		.icon-shouhoutuikuan {
			font-size: 22px;
		}
	}

	.history-section {
		padding: 16px 0 0;
		margin-top: 12px;
		background: #fff;
		border-radius: 10px;

		.sec-header {
			display: flex;
			align-items: center;
			font-size: $font-base;
			color: $font-color-dark;
			line-height: 22px;
			margin-left: 15px;

			.yticon {
				font-size: 22px;
				color: #5eba8f;
				margin-right: 10px;
				line-height: 20px;
			}
		}

		.h-list {
			white-space: nowrap;
			padding: 15px 15px 0;

			image {
				display: inline-block;
				width: 100px;
				height: 100px;
				margin-right: 12px;
				border-radius: 10px;
			}
		}
	}

	.orders,
	.tools,
	.my_goods {
		background-color: #F2F2F2;
		padding: 0 30rpx;
		margin-top: 20rpx;
	}

	.goods_flex {
		height: 250upx;
		display: flex;
		justify-content: space-around;
		align-items: center;

		.number {
			width: 305rpx;
			height: 200upx;
			background: #F7F8FC;
			border-radius: 10rpx;
			padding-top: 30upx;

			image {
				width: 22rpx;
				height: 22rpx;
			}

			&>view {
				margin-left: 32rpx;
			}

			.price_num {
				font-size: 58rpx;
				font-family: DINPro;
				font-weight: bold;
				color: #333333;

				.rmb {
					font-size: 38rpx;
				}
			}

			.note {
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				margin-right: 10rpx;
			}
		}
	}

	.dates {
		font-size: 24upx;
		text-align: center;
		padding: 20upx 10upx;
		background: #ffffff;
		margin: 0 30upx;
		font-weight: 500;
		color: #999999;
		line-height: 28upx;
		border-radius: 8upx;

	}

	.dates::before {
		content: '*';
		font-size: 38upx;
		font-family: FZZongYi-M05;
		font-weight: 400;
		color: #FF1E43;
		line-height: 28upx;
		position: relative;
		top: 14upx;
		margin-right: 6upx;
	}
	button{
		background-color: #fff;
		margin: 0 auto;
	}
	button::after{
	  border: none;
	}
</style>
