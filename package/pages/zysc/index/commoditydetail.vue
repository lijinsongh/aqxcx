<template>
	<view class="s-page-wrapper" v-if="showPage">
		<view class="index-goods">
			<view class="swiper">
				<swiper class="swiper-container" :autoplay="true" :interval="4000" :circular="true"
					:indicator-dots="true" indicator-active-color="#e10a07" indicator-color="#cccccc">
					<block v-for="(item, index) in imageView" :key="index">
						<swiper-item class="swiper-wrapper">
							<image :src="item" mode="widthFix" class="is-response" lazy-load="true"
								@tap="previewPhoto(index)"></image>
						</swiper-item>
					</block>
				</swiper>
			</view>
			<view
				style="width: 95%;margin: 0 auto;border-radius: 15rpx;background: #333333;padding: 8px;display: flex;font-size: 14px;font-weight: 500;position: relative;top: -18rpx;"
				v-if="ordersList && !relation_id && isEnable != '否'" @tap="goPublisher">
				<image src="https://api.shengqianxiong.com.cn/img/20201112/ffc96219d73f46ce860e51c7cd73f5e0.png"
					style="width: 64upx;height: 32upx;display: block;margin-top: 16upx;margin-right: 17upx;"></image>
				<view style="color: #FCDFB8;width: 74%;line-height: 60upx;font-size: 24rpx">成为会员最高可返现金￥{{ shengji }}元
				</view>
				<view style="position: relative;margin-top: 4upx;">
					<image src="https://api.shengqianxiong.com.cn/img/20201112/9258e4b77ae44689800fa22bc4c27b7f.png"
						style="width:130upx;height: 50upx;"></image>
					<view
						style="text-align: center;font-size: 24upx;position: absolute;color: #333333;top:0upx;left: 0;"
						class="b-btn">
						立即升级
					</view>
				</view>
			</view>
			<view
				style="width: 95%;margin: 0 auto;border-radius: 15rpx;background: #333333;padding: 8px;display: flex;font-size: 14px;font-weight: 500;position: relative;top: -18rpx;"
				v-if="ordersList && relation_id && grade != '0.7' && isEnable != '否'" @tap="shengJiMethod">
				<image src="https://api.shengqianxiong.com.cn/img/20201112/ffc96219d73f46ce860e51c7cd73f5e0.png"
					style="width: 64upx;height: 32upx;display: block;margin-top: 16upx;margin-right: 17upx;"></image>
				<view style="color: #FCDFB8;width: 74%;line-height: 60upx;font-size: 24rpx">
					预估返￥{{ money }}元,升级最高返￥{{ shengji }}元</view>
				<view style="position: relative;margin-top: 4upx;">
					<image src="https://api.shengqianxiong.com.cn/img/20201112/9258e4b77ae44689800fa22bc4c27b7f.png"
						style="width:130upx;height: 50upx;"></image>
					<view
						style="text-align: center;font-size: 24upx;position: absolute;color: #333333;top:0upx;left: 0upx;"
						class="b-btn">
						立即升级
					</view>
				</view>
			</view>
			<view
				style="width: 95%;margin: 0 auto;border-radius: 15rpx;background: #333333;padding: 16upx;display: flex;font-size: 28upx;font-weight: bold;position: relative;top: -18rpx;"
				v-if="ordersList && grade === '0.7' && isEnable != '否'">
				<image src="http://hnqxkj.oss-cn-chengdu.aliyuncs.com/uploads/mall1/20220901/7936010d1bfa860180f9e2b4dfb850a6.png"	style="width: 40upx;height: 35upx;display: block;margin-top: 10upx;margin-right: 17upx;"></image>
				<view style="color: #FCDFB8;width: 74%;line-height: 60upx;font-size: 24rpx">已成为高级会员,预估返现￥ {{ money }}元
				</view>
			</view>
			<view
				:style=" isEnable != '否' ? 'margin: 0upx 15upx;border-radius: 10upx;' : 'margin: 20upx 15upx;border-radius: 10upx;'">
				<view class="goods_info" style="padding-top: 30rpx;margin-bottom: 16upx;border-radius: 10rpx;">
					<view class="coupon-price s-row">
						<view class="price" style="width: 70%">
							<text style="font-size: 34upx">￥</text>
							<text>{{ordersMoney}}</text>
							<text
								style="font-size: 28upx;color: #999999;text-decoration:line-through;margin-left: 8px;font-weight: 400;">￥{{ ordersList.originalPrice }}</text>
						</view>
						<view v-if="className === ''"
							style="color: #999999;font-size: 26upx;margin-right: 16upx;text-align: end;">
							已售{{ ordersList.sales }}件</view>
						<view v-if="className === 'pintuan'"
							style="color: #999999;font-size: 26upx;margin-right: 16upx;text-align: end;">
							已拼{{ ordersList.goods.sales }}单</view>
						<view v-if="className === 'miaosha'"
							style="color: #999999;font-size: 26upx;margin-right: 16upx;text-align: end;">
							已抢{{ ordersList.goods.sales }}件</view>
						<!-- <view v-if="className === 'pintuan' || className === 'miaosha'" style="color: #999999;font-size: 26upx;margin-right: 16upx;text-align: end;">已售{{ ordersList.goods.sales }}件</view> -->
					</view>
					<!-- 领劵start -->
					<view style="display: flex;" v-if="className != 'pintuan' && className != 'miaosha'">
						<view v-for="(item,index) in CouponIssueList.slice(0,1)" @tap='showLingJuan()'>
							<view
								style="font-size: 26upx;color:#FB2C1C;margin: 6upx 10upx;border:1px solid #FB2C1C;border-radius: 7upx;width: max-content;text-align: center;padding: 1upx 10upx 1upx 10upx;">
								{{item.couponName}}
							</view>
						</view>
					</view>
					<!-- 领劵end -->
					<view style="display: flex;justify-content: space-between;">
						<!-- <view v-if="className === ''" style="color: #999999;font-size: 26upx;margin-left: 16upx;">已售{{ ordersList.sales }}件</view>
						<view v-if="className === 'pintuan' || className === 'miaosha'" style="color: #999999;font-size: 26upx;margin-left: 16upx;">已售{{ ordersList.goods.sales }}件</view> -->
						<!-- <view style="width: 120upx;height:48upx; text-align: center;line-height: 48upx;margin-left: 20upx;margin-top: -10upx;">
							<text @click="onShare()">
								<text class="cuIcon cuIcon-share"></text>
								<text style="color: #999999;">分享</text>
							</text>
						</view> -->
					</view>
					<view style="padding: 16upx 32upx 16upx 16upx;display: flex;">
						<view style="width: 100%;display: flex;" class="justify-between">
							<text style="font-weight: bold;font-size: 34rpx;">
								<text @longpress="copyTitle">{{ ordersList.title }}</text>
							</text>
							<view style="width: 200upx;height:48upx;text-align: center;line-height: 48upx;">
								<text @click="onShare()">
									<text class="cuIcon cuIcon-share"></text>
									<text style="color: #999999;">分享</text>
								</text>
							</view>
						</view>
					</view>

					<view style="width:100%;height: 65rpx;">
						<view
							style="float: right;height: 68upx;width:100%;background-color:#FFFFFF;float: right; line-height: 68upx;display:  flex;">
							<image
								src="https://api.shengqianxiong.com.cn/img/20201203/0cc05aab3eb64d4898c02320eb674810.png"
								style="width: 50rpx;height: 50rpx;padding: 10rpx;margin: 10rpx 20rpx;"></image>
							<view v-if="ordersList.store != null"
								style="font-weight: 400;color: #505050;font-size: 32rpx;">{{ordersList.store.storeName}}
							</view>
							<view v-else style="font-weight: 400;color: #999999;font-size: 28rpx;letter-spacing: 4rpx;">
								淇湘优购自营店铺</view>
						</view>
					</view>
					<!-- <view style="height: 1rpx;width: 95%;background: #E6E6E6;margin-left: 18rpx;"></view> -->
					<view style="width:100%;height: 78rpx;">
						<view
							style="float: right;height: 68upx;width:100%;background-color:#FFFFFF;float: right; line-height: 68upx;display:  flex;">
							<image
								src="https://api.shengqianxiong.com.cn/img/20201203/a712da051d8444b2b0cea2af306cd45a.png"
								style="width: 50rpx;height: 50rpx;padding: 10rpx;margin: 10rpx 20rpx;"></image>
							<view style="font-weight: 400;color: #999999;font-size: 28rpx;letter-spacing: 4rpx;">
								{{brandName}}
							</view>
						</view>
					</view>

				</view>

			</view>
			<view style="margin: 20upx 15upx;border-radius: 10upx;background-color: #FFFFFF;"
				v-if="pinkUserList.length > 0">
				<view style="width: 100%;padding:20upx 10upx;">
					<view style="display: flex;justify-content: space-between;">
						<view class="goods-info-title" style="color:#333333;width: 20%;text-align: center;float:left;">
							拼团列表</view>
					</view>

					<view v-for="(item,index) in pinkUserList">
						<view style="display: flex;padding: 20upx;">
							<view style="width: 45%;display: flex;align-items: center;">
								<image
									:src="item.pinkUserList[0].headerImg ? item.pinkUserList[0].headerImg : '/static/logo2.png'"
									style="width: 50upx;height: 50upx;border-radius: 100upx;"></image>
								<view
									style="font-size: 24upx;margin-left: 20upx;width: 30%;text-overflow: ellipsis;overflow: hidden;">
									{{item.pinkUserList[0].nickName}}
								</view>
							</view>

							<view style="width: 50%;">
								<!--  已拼成{{item.countNumber}}/{{item.needNumber}} -->
								<view style="font-size: 24upx;margin-left: 20upx;text-align: right;">还差 <text
										style="color: #FF0000;">
										{{item.needNumber - item.countNumber}}人</text>拼成</view>
								<view class="pintuan_syrs" v-if="item.endTime.day">
									剩余
									<uni-countdown color="#999999" :day="item.endTime.day" :hour="item.endTime.hour"
										:minute="item.endTime.minute" :second="item.endTime.second">
									</uni-countdown>
								</view>

							</view>

							<!-- <view style="margin-top: 10upx;font-size: 24upx;margin-left: 20upx;width: 35%;text-align: right;">已拼成{{item.countNumber}}/{{item.needNumber}}</view> -->
							<button
								style="width: 150upx;height: 50upx;font-size: 24upx;color: #FFFFFF;background: #FF0000;line-height: 50upx;margin-left: 20upx;"
								@tap='goPinDan(item.pinkUserList,item.id)'>去参团</button>
						</view>
					</view>
				</view>
			</view>

			<view style="margin: 20upx 15upx;border-radius: 10upx;background-color: #FFFFFF;">
				<view style="width: 100%;padding:20upx;">
					<view style="display: flex;justify-content: space-between;">
						<view class="goods-info-title" style="color:#333333;width: 20%;text-align: left;float:left;">
							必买理由</view>
						<view class='view_button' @tap="copyTklWenAns">文案分享</view>
					</view>

					<view v-if="className === '' && ordersList.buyReason" @click="TklmaskShow" class="goods_reco"
						style="display: flex;margin-top: 20upx;background-color: #F2F2F2;width: 100%;margin:20upx auto 0;position: relative;border-radius: 8upx;">
						<image src="https://taobao.xianmxkj.com/static/detail/559.png"
							style="width:14upx;height:12upx;display: block;position: absolute;top:-12upx;left:34upx">
						</image>
						<view class="goods_desc" style="padding-bottom: 16upx;padding-top:20upx;">
							<text>{{ ordersList.buyReason }}</text>
						</view>
					</view>

					<view v-if="className === 'pintuan' || className === 'miaosha'  && ordersList.goods.buyReason"
						@click="TklmaskShow" class="goods_reco"
						style="display: flex;margin-top: 20upx;background-color: #F2F2F2;width: 96%;margin:20upx auto 0;position: relative;border-radius: 8upx;">
						<image src="https://taobao.xianmxkj.com/static/detail/559.png"
							style="width:14upx;height:12upx;display: block;position: absolute;top:-12upx;left:34upx">
						</image>
						<view class="goods_desc" style="padding-bottom: 16upx;padding-top:20upx;">
							<text>{{ ordersList.goods.buyReason }}</text>
						</view>
					</view>
				</view>
			</view>

			<view style="margin: 20upx 15upx;border-radius: 10upx;background-color: #FFFFFF;"
				v-if="pinglunList.length > 0">
				<view style="padding:20upx;">
					<view style="display: flex;justify-content: space-between;">
						<view class="goods-info-title"
							style="font-size: 32rpx;color: #333;font-weight: bold;width: 80%;text-align: left;">
							宝贝评论({{totalElements}})</view>
						<view style="color: #999999;font-size: 24rpx;" @tap="goPingLunList()">查看更多</view>
						<image src="http://hnqxkj.oss-cn-chengdu.aliyuncs.com/uploads/mall1/20220901/75c0b52fb81c6d991166d5d317022ab1.png"
							style="width: 10rpx;height: 20rpx;margin-top: 7rpx;"></image>
					</view>

					<view style="display: flex;padding: 20rpx 0;">
						<image :src="pinglunList[0].userHeader ? pinglunList[0].userHeader : '/static/logo2.png'"
							style="width: 80rpx;height: 80rpx;border-radius: 50rpx;"></image>
						<view style="margin-top: 5rpx;margin-left: -5rpx;width: 48%;">
							<view
								style="font-size: 30rpx;color: #505050;margin-left: 20rpx;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">
								{{pinglunList[0].userName}}
							</view>
							<urate style="margin-left: 15rpx;margin-top: 3rpx;" :size='18'
								:value="pinglunList[0].score" />
						</view>
						<view style="margin-top: 5rpx;color: #999999;font-size: 28rpx;">{{pinglunList[0].createTime}}
						</view>
					</view>
					<view style="padding: 0 20rpx 0 0rpx;font-size: 26rpx;">{{pinglunList[0].content}}</view>
					<view style="display: flex;padding: 10rpx 0 0 0rpx;flex-wrap: wrap;"
						v-if="pinglunList[0].img.length > 0">
						<view style="margin: 5rpx;" v-for="(item,index) in pinglunList[0].img">
							<image :src="item" lazy-load="true" mode="aspectFill"
								style="width: 210rpx;height: 210rpx;border-radius: 10rpx;" @tap='selectPhoto(item)'>
							</image>
						</view>
					</view>
				</view>
			</view>

			<!-- 店铺信息 -->
			<view style="margin: 20upx 15upx;border-radius: 10upx;background-color: #FFFFFF;padding: 10rpx;"
				v-if="ordersList.store">
				<view style="display: flex;margin:20rpx;">
					<image :src="ordersList.store.logo ? ordersList.store.logo : '/static/logo2.png'" style="border-radius: 10rpx;width: 90rpx;height: 90rpx;">
					</image>
					<view style="margin-left: 20rpx;width: 400rpx;">
						<view
							style="font-size: 32rpx;color: #333333;font-weight: bold;width: 75%;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;">
							{{ordersList.store.storeName}}
						</view>
						<view style="display: flex;">
							<view style="font-size: 24rpx;color: #333333;margin-top: 3rpx;">综合评分：</view>
							<!-- #ifdef MP-WEIXIN -->
							<urate style="margin-top: 25rpx;margin-left: -15rpx;" :size='12'
								:value="ordersList.store.score / 20" />
							<!-- #endif -->
							<!-- #ifndef MP-WEIXIN -->
							<urate style="margin-top: 5rpx;" :size='12' :value="ordersList.store.score / 20" />
							<!-- #endif -->
						</view>
					</view>
					<view
						style="background: #FF2D36;margin-top: 20rpx;width: 150rpx;height: 50rpx;color: #FFFFFF;font-size: 28rpx;border-radius: 50rpx;text-align: center;line-height: 50rpx;margin-left: 10rpx;"
						@tap='goDianpu(ordersList.store.storeId,ordersList.store.storeName)'>进店看看</view>
				</view>
				<view style="display: flex;text-align: center;margin: 0 20rpx;">
					<view class="dianpu-canshu" style="text-align: left;">卖家销量:{{sale}}</view>
					<view class="dianpu-canshu">粉丝数量:{{fensi}}</view>
					<view class="dianpu-canshu" style="text-align: right;">综合评分:{{pinfen}}</view>
				</view>
				<view style="height: 1rpx;background: #E6E6E6;margin: 20rpx 0;"></view>
				<view style="display: flex;">
					<view style="margin-left: 20rpx;color: #333333;font-size: 33rpx;font-weight: bold;width: 75%;">店铺推荐
					</view>
					<view style="display: flex;" @tap='goDianpu(ordersList.store.storeId,ordersList.store.storeName)'>
						<view style="color: #999999;margin-top: 5rpx;">查看更多</view>
						<image src="http://hnqxkj.oss-cn-chengdu.aliyuncs.com/uploads/mall1/20220901/75c0b52fb81c6d991166d5d317022ab1.png"
							style="width: 15rpx;height: 25rpx;margin-top: 11rpx;margin-left: 5rpx;"></image>
					</view>
				</view>
				<view class="tuijian" v-if="storeGoodsList">
					<view v-for="(item,index) in storeGoodsList.slice(0,6)" style="margin: 10rpx;text-align: center;">
						<image :src="item.coverImg" style="width: 210rpx;height: 210rpx;border-radius: 10rpx;"
							@tap='goDianpu(ordersList.store.storeId,ordersList.store.storeName)'></image>
						<!-- <text style="font-size: 34upx">￥</text>
						<text>{{ordersMoney}}</text> -->
						<!-- <text style="font-size: 24upx;color: grey;text-decoration:line-through;margin-left: 8px">￥{{ ordersList.originalPrice }}</text> -->
						<view v-if="relation" class="index-conts2"><text style="font-size: 34upx;">¥</text><text
								style="font-size: 38upx;">{{ item.memberPrice }}</text>
							<text
								style="font-size: 24upx;color: #999999;text-decoration:line-through;margin-left: 5px"><text
									style="font-size: 24rpx;">¥</text>{{ item.originalPrice }}</text>
						</view>

						<view v-if='!relation' class="index-conts2">
							<text style="font-size: 38upx;"><text
									style="font-size: 24rpx;">¥</text></text>{{ item.price }}
							<text
								style="font-size: 30upx;color: #999999;text-decoration:line-through;margin-left: 20px;font-weight: 100;"><text
									style="font-size: 24rpx;">¥</text>{{ item.originalPrice }}</text>
						</view>
					</view>
				</view>
			</view>

			<view class="goods_reco" style="margin: 20rpx 20rpx 120upx;border-radius: 10upx;"
				v-if="ordersList.descrition">
				<view class="goods-info-title"
					style="font-size: 32rpx;color: #333;font-weight: bold;width: 100%;text-align: left;margin-left: 20upx;">
					宝贝详情</view>
				<view class="imglist">
					<uparse :content="ordersList.descrition" @navigate="navigate" class="is-response"></uparse>
				</view>
			</view>
			<!-- <view v-if="className != 'pintuan' && className != 'miaosha' && ordersList.isExpress === 1"
				class="xinrenhongbao">
				<image @tap='goShopCart()'
					src="https://api.shengqianxiong.com.cn/file/uploadPath/2022/03/03/9a9a6927900b7686d5f6d460e630610c.png"
					style="width: 130upx;height: 130upx;position: fixed;bottom: 160upx;right: 25upx;z-index: 99;">
				</image>
			</view> -->
			<!-- 购买按钮 -->
			<view class="goods_shop_cart">
				<view class="cent" style="display: flex">
					<view
						style="text-align: center;width: 10%;margin-top: 4px;margin-bottom: 4px;display: flex;margin-left: 15rpx;">
						<view style="width: 90%;text-align: center;" @tap="goBackUp()">
							<image
								src="https://api.shengqianxiong.com.cn/img/20201112/3e384e9272b545a9828924f3b33eec39.png"
								style="width: 42upx;height: 44upx;margin-top: 3upx;"></image>
							<view style="font-size: 12px">首页</view>
						</view>
					</view>
					<view
						style="text-align: center;width: 15%;margin-top: 5px;margin-bottom: 4px;display: flex;margin-left: 10rpx;">
						<view style="width: 90%;text-align: center;" @click="goMaijia()">
							<image
								src="https://api.shengqianxiong.com.cn/file/uploadPath/2022/03/03/cfd8dd4400ba1e81f6b3ce5d47b1e186.png"
								style="width: 42upx;height: 44upx;margin-top: 3upx;"></image>
							<view style="font-size: 24rpx">客服</view>
						</view>
					</view>
					<!-- <view v-if="className != 'pintuan' && className != 'miaosha' && ordersList.isExpress === 1" style="text-align: center;width: 15%;margin-top: 4px;margin-bottom: 4px;display: flex;margin-left: 10rpx;">
						<view style="width: 90%;text-align: center;" @tap='goShopCart()'>
							<image src="https://api.shengqianxiong.com.cn/img/20201112/3a55b8c9acb44ab6bd04c467cce4cb07.png" style="width: 42upx;height: 44upx;margin-top: 3upx;"></image>
							<view style="font-size: 12px">购物车</view>
						</view>
					</view> -->
					<view v-if="className != 'pintuan' && className != 'miaosha'"
						style="text-align: center;width: 10%;margin-top: 4px;margin-bottom: 4px;display: flex;margin-left: 10rpx;">
						<!-- <view style="width: 100%;text-align: center">
							<view class="iconfont icon-shoucang" :style="collect.isCollect" @tap="goCollection()">
							</view>
							<view style="font-size: 12px" :style="collect.isCollect">{{ collect.name }}</view>
						</view> -->
						<view style="width: 90%;text-align: center;" @tap="goCollection()">
							<image v-if="!shoucang"
								src="https://api.shengqianxiong.com.cn/img/20201121/3a81ebb4b34a44b2840d63b33ec73126.png"
								style="width: 42upx;height: 44upx;margin-top: 3upx;"></image>
							<image v-if="shoucang"
								src="https://api.shengqianxiong.com.cn/img/20201112/770dc7edb8134a37ac7528acac65b768.png"
								style="width: 42upx;height: 44upx;margin-top: 3upx;"></image>
							<view style="font-size: 12px">收藏</view>
						</view>
					</view>
					<!-- #ifdef MP-WEIXIN -->
					<view
						:style="className === 'pintuan' || className === 'miaosha' ? 'width: 75%;display: flex;color: white;margin-top: 13rpx;margin-right: 20rpx;margin-left: 80rpx;' :'width: 75%;display: flex;color: white;margin-top: 10rpx;margin-right: 20rpx;'">

						<view v-if="isEnable != '否'"
							style="border-radius: 39px 0px 0px 39px;width: 50%;background: #FFBC00;text-align: center;height: 78upx;line-height: 78upx;"
							@tap="shopCartShare('fanxian')">{{ buyDes }}</view>
						<view v-if="className!='pintuan'" class="getTbk"
							:style="isEnable != '否' ? 'border-radius: 0px 39px 39px 0px;width: 50%;background:#FF2222; text-align: center;height: 78rpx;line-height: 78rpx;' : 'border-radius: 50rpx;width: 100%;background:#FF2222; text-align: center;height: 78rpx;line-height: 78rpx;'"
							@tap="openPopus()">立即购买</view>
						<view v-if="className==='pintuan'" class="getTbk"
							:style="isEnable != '否' ? 'border-radius: 0px 39px 39px 0px;width: 50%;background:#FF2222; text-align: center;height: 78rpx;line-height: 78rpx;' : 'border-radius: 50rpx;width: 100%;background:#FF2222; text-align: center;height: 78rpx;line-height: 78rpx;'"
							@tap="openPopus()">立即开团</view>
					</view>
					<!-- #endif -->
					<!-- #ifndef MP-WEIXIN -->
					<view
						:style="className === 'pintuan' || className === 'miaosha' ? 'width: 75%;display: flex;color: white;margin-top: 10upx;margin-right: 20upx;margin-left: 80upx;' :'width: 75%;display: flex;color: white;margin-top: 10upx;margin-right: 20upx;'">

						<view v-if="isEnable != '否'"
							style="border-radius: 39px 0px 0px 39px;width: 50%;background: #FFBC00;text-align: center;height: 78upx;line-height: 78upx;"
							@tap="shopCartShare('fanxian')">{{ buyDes }}</view>
						<view v-if="className!='pintuan'" class="getTbk"
							:style="isEnable != '否' ? 'border-radius: 0px 39px 39px 0px;width: 50%;background:#FF2222; text-align: center;height: 78upx;line-height: 78upx;' : 'border-radius: 50rpx;width: 100%;background:#FF2222; text-align: center;height: 78upx;line-height: 78upx;'"
							@tap="openPopus()">立即购买</view>
						<view v-if="className==='pintuan'" class="getTbk"
							:style="isEnable != '否' ? 'border-radius: 0px 39px 39px 0px;width: 50%;background:#FF2222; text-align: center;height: 78upx;line-height: 78upx;' : 'border-radius: 50rpx;width: 100%;background:#FF2222; text-align: center;height: 78upx;line-height: 78upx;'"
							@tap="openPopus()">立即开团</view>
					</view>
					<!-- #endif -->
				</view>
			</view>

			<view class="navBarButtonBox">
				<!-- 顶部右侧菜单 -->
				<view v-if="navBarButton" class="goods_shop_cart_bg navBarButton" @tap="showShopCartBg('nav')"
					@touchmove.stop.prevent="moveHandleStop"></view>
				<!-- #ifdef H5 -->
				<view style="margin-top: 16upx;" class="h_newlit" v-bind:class="[navBarButton ? 'active' : '', '']">

					<!-- #endif -->
					<!-- #ifndef H5 -->
					<view style="margin-top: 66upx;" class="h_newlit" v-bind:class="[navBarButton ? 'active' : '', '']">

						<!-- #endif -->
						<view class="em">
							<view style="font-size: 14px" @tap="navBarButtontO('home')">
								<text class="iconfont icon-shouye"></text>
								返回首页
							</view>
							<view style="font-size: 14px" @tap="navBarButtontO('like')">
								<text class="iconfont icon-shoucang"></text>
								个人中心
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 淘口令分享 -->
			<simpleModal ref="simpleModalTkl" @maskClose="TklmaskClose">
				<view class="buy-box-title">复制分享文案</view>
				<view class="buy-box-center">
					<view class="code-cent">
						<div class="cente-text">
							<div>
								<view class="textarea">
									{{ ordersList.title }}
									<br />
									【抢购价】{{ ordersMoney }}元
									<br />
									【下单链接】{{ erweima }}
									<br />
									【必买理由】{{ ordersList.buyReason }}
									<br />
								</view>
							</div>
						</div>
					</view>
					<view class="buy-btn-copy" v-bind:class="[copyTklStatus ? 'active' : '', '']" @tap="copyTklWenAns">
						{{ copyTklStatus ? '已复制到剪切板' : '一键复制' }}
					</view>
				</view>
			</simpleModal>
			<!-- <view class="xinrenhongbao">
				<image @click="goMaijia" src="https://api.shengqianxiong.com.cn/img/20201215/286e5f357bce465bb4eafbd3ec858512.png"
				 style="width: 130upx;height: 130upx;position: fixed;bottom: 160upx;right: 32upx;z-index: 99;"></image>
			</view> -->
			<tki-qrcode ref="qrcode" :val="erweima" :size="200" background="#fff" foreground="#000" pdground="#000"
				:onval="true" :loadMake="true" @result="qrR" :show="false"></tki-qrcode>
			<!-- #ifdef MP-WEIXIN -->
			<view class="cu-modal" :class="modalName == 'Image' ? 'show' : ''" @tap="hideModal">
				<view class="cu-dialog" v-if="ordersList && XCXErweima && haibaoShow" @tap="hideModal">
					<view class="bg-img">
						<wm-poster @success="posterSuccess" :imgSrc="imageView[0]" :QrSrc="XCXErweima"
							:Title="ordersList.title" :PriceTxt="ordersList.memberPrice"
							:OriginalTxt="ordersList.originalPrice" :LineType="false"></wm-poster>
					</view>
				</view>
			</view>
			<!-- #endif -->
			<!-- #ifndef MP-WEIXIN -->
			<view class="cu-modal" :class="modalName == 'Image' ? 'show' : ''" @tap="hideModal">
				<view class="cu-dialog" v-if="ordersList && erweimapath && haibaoShow" @tap="hideModal">
					<view class="bg-img">
						<wm-poster @success="posterSuccess" :imgSrc="imageView[0]" :QrSrc="erweimapath"
							:Title="ordersList.title" :PriceTxt="ordersList.memberPrice"
							:OriginalTxt="ordersList.originalPrice" :LineType="false"></wm-poster>
					</view>
				</view>
			</view>
			<!-- #endif -->
			<uni-popup ref="popusLingJuan" type="bottom">
				<view
					style="width: 100%;height: 1000rpx;background: #FFFFFF;border-top-left-radius: 20upx;border-top-right-radius: 20upx;padding: 40upx;">
					<view style="width: 100%;text-align: center;font-size: 32rpx;color: #DD514C;">领劵</view>
					<scroll-view scroll-y="true" style="height: 900rpx;">
						<view style="width: 100%;text-align: center;" v-for='(item,index) in CouponIssueList'
							:key='index'>
							<view
								style="background: #fcf3e8;width: 100%;height: 130rpx;border-radius: 10rpx;margin-top: 20rpx;">
								<view style="display: flex;color: #e23922;">
									<view
										style="line-height: 130rpx;margin-left: 0rpx;font-size: 40rpx;color: #e23922;font-weight: 600;width: 150rpx;">
										<text style="font-size: 20upx;">￥</text>{{item.coupon.lessMoney}}
									</view>
									<view style="margin-left: 20rpx;">
										<view style="margin-top: 25rpx;text-align: left;">
											每{{item.coupon.minMoney}}减{{item.coupon.lessMoney}}</view>
										<view style="margin-top: 10rpx;font-size: 26rpx;">截止：{{item.endTime}}</view>
									</view>
									<view
										style="height: 105rpx;width: 2rpx;background: #e23922;margin-left: 20rpx;margin-top: 15rpx;">
									</view>
									<view
										style="color: #e23922;line-height: 130rpx;height: 130rpx;width: 145rpx;font-weight: 600;"
										@tap='lingJuan(item)'>立即领取</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</uni-popup>
			<uni-popup ref="popusshare" type="bottom">
				<view
					style="width: 100%;height: max-content;background: #FFFFFF;border-top-left-radius: 20upx;border-top-right-radius: 20upx;padding: 40upx;">
					<view style="display: flex;flex-wrap: wrap;flex-wrap: wrap;">
						<view style="width: 50%;text-align: center;" v-for='(item,index) in bottomData' :key='index'
							@tap='goShare(index)'>
							<button v-if="index === 0" style="text-align:center;background: #FFFFFF;" open-type='share'>
								<image :src="item.icon" style="width: 80rpx;height: 80rpx;"></image>
								<view style="color: #000000;">{{item.text}}</view>
							</button>
							<view v-if="index != 0">
								<image :src="item.icon" style="width: 80rpx;height: 80rpx;"></image>
								<view style="color: #000000;margin-top: 38rpx;">{{item.text}}</view>
							</view>
						</view>
					</view>
				</view>
			</uni-popup>
			<uni-popup ref="popus" type="bottom">
				<view
					style="width: 100%;height: max-content;background: #FFFFFF;border-top-left-radius: 20upx;border-top-right-radius: 20upx;padding: 40upx;">
					<view style="display: flex;">
						<image :src="attrValuecoverImg" style="width: 150upx;height: 150upx;border-radius: 4upx;">
						</image>
						<view style="margin-top: 70upx;margin-left: 20upx;">
							<view style="display: flex;">
								<view style="font-size: 28upx;color: #FF4733;">¥ {{numberMoney}}</view>
								<view v-if="Maxnumber != -1"
									style="margin-left: 20upx;font-size: 24upx;color: #333333;">库存：{{Maxnumber}}</view>
							</view>
							<view style="font-size: 28upx;color: #333333;margin-top: 10upx;">请选择产品类型</view>
						</view>
					</view>
					<view v-for="(item,index) in attrValue" :key='index'>
						<view style="margin-top: 50upx;font-size: 32upx;color: #000000;">{{item.value}}</view>
						<view style="display: flex;flex-wrap: wrap;flex-wrap: wrap;">
							<view style="display: flex;flex-wrap: wrap;" v-for="(de,ind) in item.detail"
								@tap='checkState(de,index,ind)'>
								<view
									:style="item.goodsId == index && item.attrId == ind && de.state != ''?
								'width: 150rpx; height: 50rpx;background: #F2F2F2;text-align: center;border-radius: 50rpx;line-height: 50rpx;margin: 20rpx 0rpx 0rpx 10rpx;border: 1rpx solid #e10a07;'
								: 'width: 150rpx; height: 50rpx;background: #F2F2F2;text-align: center;border-radius: 50rpx;line-height: 50rpx;margin: 20rpx 0rpx 0rpx 10rpx;'">
									{{de.name}}
								</view>
							</view>
						</view>
					</view>
					<view style="display: flex;" v-if="ordersList.isExpress === 1">
						<view style="margin-top: 50upx;font-size: 32upx;color: #000000;width: 80%;">数量</view>
						<view
							style="width:200upx;height: 60upx;display: flex;margin-top: 30upx;border-radius: 5upx;border:1px solid #E6E6E6">
							<view
								style="border-right:1px solid #E6E6E6;width: 70upx;color: #999999;text-align: center;margin-top: 15upx;"
								@click="jian">-</view>
							<view
								style="width: 80upx;text-align: center;font-size: 24upx;color: #333333;margin-top: 15upx;">
								{{number}}
							</view>
							<view
								style="border-left:1px solid #E6E6E6;width: 70upx;color: #999999;text-align: center;margin-top: 15upx"
								@click="jia">+</view>
						</view>
					</view>
					<button style="background: #FF332F;color: #FFFFFF;margin-top: 50upx;"
						@tap="shopCartShare('quan')">{{ShopCartOrMoney}}</button>
				</view>
			</uni-popup>
		</view>
</template>

<script>
	import uparse from '@/package/components/u-parse/u-parse.vue';
	import simpleModal from '../../../../components/simple-pro/customModal.vue';
	import uniPopup from '../../../../components/uni-popup/uni-popup.vue';
	import wmPoster from '../../../../components/wm-poster/wm-posterorders.vue';
	import tkiQrcode from '../../../../components/tki-qrcode/tki-qrcode.vue';
	import uniCountdown from '../../../components/uni-countdown/uni-countdown.vue';
	import urate from '../../../components/uni-rate/uni-rate.vue';
	export default {
		data() {
			return {
				erweima: '',
				erweimapath: '',
				ordersId: 0,
				number: 1,
				Maxnumber: -1,
				shoucang: true,
				shoucangId: '',
				modalName: '',
				ShopCartOrMoney: '立即购买',
				ordersMoney: 0,
				numberMoney: 0,
				buyDes: '口令购买',
				shengji: '',
				attrValue: [],
				showPage: false,
				goods: '',
				relation: false,
				brandName: '',
				numberMoney1: 0,
				scrollTop: false,
				checkStateList: [],
				storeGoodsList: [],
				navBarButton: false,
				copyTklStatus: false,
				attrValuecoverImg: '',
				XCXErweima: '',
				icon: '',
				CheckattrValue: false,
				save: false,
				tkl: '',
				relation_id: null,
				money: 0,
				sale: 0,
				pinfen: 0,
				fensi: 0,
				grade: '',
				groupPinkId: '',
				isInvitation: 0,
				storeId: '',
				merchantId: '',
				storeName: '',
				skuId: 0,
				CouponIssueList: [],
				poster: {},
				imageView: [],
				pinkUserList: [],
				userByinvitationId: '',
				haibaoImg: null,
				haibaoShow: false,
				isEnable: '否',
				shareMessage: '',
				className: '',
				pinglunList: [],
				totalElements: '',
				userId: '',
				collect: {
					name: '收藏',
					isCollect: ''
				},
				footprintKey: 'orange-sqx-footprint-zy',
				collectKey: 'orange-sqx-collect-zy',
				stars: [1, 2, 3, 4, 5],
				ordersList: {},
				checkString: '',
				bottomData: [{
						text: '分享好友',
						icon: 'https://api.shengqianxiong.com.cn/static/grid2.png',
						name: 'wx'
					},
					{
						text: '生成海报',
						icon: 'https://api.shengqianxiong.com.cn/static/grid5.png',
						name: 'more'
					}
				]
			};
		},
		components: {
			urate,
			uparse,
			simpleModal,
			tkiQrcode,
			uniPopup,
			wmPoster,
			uniCountdown
		},
		onShow: function() {
			this.copyTklStatus = false;
			let relation_id = this.$queue.getData('relation_id');
			if (relation_id) {
				this.relation_id = relation_id;
			}
			if (this.ordersId) {
				if (this.className === 'pintuan') {
					this.getpintuanNumber(this.ordersId);
				}
			}
		},
		onLoad: function(e) {
			// #ifdef MP-WEIXIN
			//传值切记不要加参数名称，第一位商品id，第二位当前用户邀请码，第三位商品状态（普通不传，拼团传pintuan，秒杀传miaosha）
			if (e.scene) {
				const scene = decodeURIComponent(e.scene);
				var ordersId = '';
				var userByinvitationId = '';
				var className = '';
				this.userByinvitationId = '';
				let ss = scene.split(',');
				for (var i = 0; i < ss.length; i++) {
					console.log(ss[i])
					if (i === 0) {
						this.ordersId = ss[i];
					} else if (i === 1) {
						this.userByinvitationId = ss[i];
						this.$queue.setData('userByinvitationId', ss[i]);
						this.$queue.setData('relation', ss[i]);
					} else if (i === 2) {
						this.className = ss[i];
						if (ss[i] === 'pintuan') {
							this.getpintuanNumber(this.ordersId);
						}
					}
				}
				this.getCommondityList(this.ordersId);
			}
			wx.getSetting({
				success(res) {
					if (!res.authSetting['scope.writePhotosAlbum']) {
						wx.authorize({
							scope: 'scope.writePhotosAlbum',
							success() {
								console.log('授权成功');
							}
						});
					}
				}
			});
			// #endif
			this.$queue.showLoading("加载中...")
			let a = this.$queue.getData('isEnable');
			if (a) {
				this.isEnable = a;
			}

			if (e.className) {
				this.className = e.className;
			}

			if (e.ordersId) {
				if (this.className === 'pintuan') {
					this.getpintuanNumber(e.ordersId);
				}

				let InvitationUser = this.$queue.getData('userByinvitationId');
				if (e.userByinvitationId) {
					this.userByinvitationId = e.userByinvitationId;
				} else if (InvitationUser) {
					this.userByinvitationId = InvitationUser;
				}

				this.ordersId = e.ordersId;
				this.getCommondityList(e.ordersId);
			}

			let relation_id = this.$queue.getData('relation_id');
			if (relation_id) {
				this.erweima = this.$queue.publicYuMing() +
					'/package/pages/zysc/index/commoditydetail?userByinvitationId=' +
					relation_id +
					'&ordersId=' + this.ordersId;

				//分享好友
				if (this.className === 'pintuan') {
					this.XCXErweima = this.$queue.publicYuMing() +
						'/tao/user/getImg?page=package/pages/zysc/index/commoditydetail&scene=' + this.ordersId + ',' +
						relation_id + ',pintuan' + '&width=200'
				} else if (this.className === 'miaosha') {
					this.XCXErweima = this.$queue.publicYuMing() +
						'/tao/user/getImg?page=package/pages/zysc/index/commoditydetail&scene=' + this.ordersId + ',' +
						relation_id + ',miaosha' + '&width=200'
				} else {
					this.XCXErweima = this.$queue.publicYuMing() +
						'/tao/user/getImg?page=package/pages/zysc/index/commoditydetail&scene=' + this.ordersId + ',' +
						relation_id + '&width=200'
				}
				//分享海报
				if (this.className === 'pintuan' || this.className === 'miaosha') {
					this.shareMessage = '/package/pages/zysc/index/commoditydetail?userByinvitationId=' +
						relation_id +
						'&ordersId=' + this.ordersId + '&className=' + this.className;
				} else {
					this.shareMessage = '/package/pages/zysc/index/commoditydetail?userByinvitationId=' +
						relation_id +
						'&ordersId=' + this.ordersId;
				}
				this.relation = true;
			} else {
				this.erweima = this.$queue.publicYuMing() + '/package/pages/zysc/index/commoditydetail?ordersId=' +
					this.ordersId;
				//分享好友
				if (this.className === 'pintuan') {
					this.XCXErweima = this.$queue.publicYuMing() +
						'/tao/user/getImg?page=package/pages/zysc/index/commoditydetail&scene=' + this.ordersId +
						',,' + 'pintuan' +
						'&width=200'
				} else if (this.className === 'miaosha') {
					this.XCXErweima = this.$queue.publicYuMing() +
						'/tao/user/getImg?page=package/pages/zysc/index/commoditydetail&scene=' + this.ordersId +
						',,' + 'miaosha' +
						'&width=200'
				} else {
					this.XCXErweima = this.$queue.publicYuMing() +
						'/tao/user/getImg?page=package/pages/zysc/index/commoditydetail&scene=' + this.ordersId +
						'&width=200'
				}

				//分享海报
				if (this.className === 'pintuan' || this.className === 'miaosha') {
					this.shareMessage = '/package/pages/zysc/index/commoditydetail?ordersId=' + this.ordersId +
						'&className=' + this.className;
				} else {
					this.XCXErweima = this.$queue.publicYuMing() +
						'/tao/user/getImg?page=package/pages/zysc/index/commoditydetail&scene=' + this.ordersId +
						'&width=200'
				}
				this.relation = false;
			}

			let userId = this.$queue.getData('userId');
			if (userId) {
				this.$Request.getT('/user/' + userId).then(res => {
					if (res.status === 0) {
						if (res.data.isInvitation) {
							this.isInvitation = res.data.isInvitation;
							this.$queue.setData('isInvitation', res.data.isInvitation);
						}
						this.$queue.setData('relation', res.data.invitation);
						this.$queue.setData('grade', res.data.grade);
						this.$queue.setData('pddpid', res.data.pdd);
						this.$queue.setData('jdpid', res.data.jd);
						if (res.data.image_url) {
							this.$queue.setData('image_url', res.data.image_url);
						}
						this.$queue.setData('mobile', res.data.phone);

						this.$queue.setData('nickName', res.data.nickName);
						this.$queue.setData('relation_id', res.data.relationId);
						this.$queue.setData('gender', parseInt(res.data.gender));
					}
				});
			}
			this.getCouponIssueList();
			this.getPingLunList();
		},
		onPageScroll: function(e) {
			this.scrollTop = e.scrollTop > 200;
		},
		onNavigationBarButtonTap: function() {
			this.navBarButton = !this.navBarButton;
		},
		onShareAppMessage(res) {
			return {
				path: this.shareMessage, //这是为了传参   onload(data){let id=data.id;} 
				title: '抢购价' + this.ordersMoney + '   ' + this.ordersList.title,
				imageUrl: this.imageView[0]
			}
		},
		methods: {
			getDianpuList() {
				this.$Request.getT('/self/store/find?id=' + this.storeId).then(res => {
					if (res.status === 0) {
						this.sale = res.data.sale > 10000 ? (res.data.sale / 10000).toFixed(1) + '万' : res.data
							.sale;
						this.pinfen = res.data.score;
					}
				});
			},
			getCount() {
				this.$Request.getT('/self/store/count?storeId=' + this.storeId).then(res => {
					if (res.status === 0) {
						this.fensi = res.data.count1 > 10000 ? (res.data.count1 / 10000).toFixed(1) + '万' : res
							.data.count1;
					}
				});
			},
			getDianpuTuijianList() {
				this.$Request.getT('/goods/userList?page=0&size=10&storeId=' + this.storeId +
					'&sort=sales&storeTypeId=').then(
					res => {
						if (res.status === 0) {
							this.storeGoodsList = [];
							this.storeGoodsList = res.data.content;
						}
					});
			},
			goDianpu(storeId, storeName) {
				uni.navigateTo({
					url: '/packagetwo/pages/index/dianpu?storeId=' + storeId + '&storeName=' + storeName
				});
			},
			checkCollection(userId) {
				let goodsId = this.ordersId
				if (this.className === 'pintuan' || this.className === 'miaosha') {
					goodsId = this.ordersList.goodsId;
				}
				this.$Request.getT('/selfUserCollect/check?goodsId=' + goodsId + '&userId=' + userId).then(res => {
					if (res.status === 0) {
						this.shoucang = res.data;
						this.shoucangId = res.msg;
					}
				});
			},
			//收藏
			goCollection() {
				//收藏
				let isExist = this.$queue.isExistZy(this.collectKey, this.ordersList.id);
				console.log(isExist);
				if (isExist) {
					let items = [];
					items.push(this.ordersList.id);
					this.$queue.removeItemId(this.collectKey, items);
					this.shoucang = false;
					this.collect.name = "收藏";
					this.collect.isCollect = "";
				} else {
					this.$queue.insert({
						key: this.collectKey,
						value: this.ordersList,
					});
					this.shoucang = true;
					this.collect.name = "已收藏";
					this.collect.isCollect = "color: #FC3F78";
				}
				// let userId = this.$queue.getData('userId');
				// if (userId) {
				// 	if (this.shoucang) {
				// 		let goodsId = this.ordersId
				// 		if (this.className === 'pintuan' || this.className === 'miaosha') {
				// 			goodsId = this.ordersList.goodsId;
				// 		}

				// 		let data = {
				// 			"coverImg": this.ordersList.coverImg,
				// 			"goodsId": goodsId,
				// 			"price": this.ordersMoney,
				// 			"title": this.ordersList.title,
				// 			"userId": userId
				// 		}
				// 		this.$Request.postJson('/selfUserCollect/save', data).then(res => {
				// 			if (res.status === 0) {
				// 				this.$queue.showToast('收藏成功');
				// 				this.checkCollection(userId);
				// 			}
				// 		});
				// 	} else {
				// 		this.$Request.getT('/selfUserCollect/delete?id=' + this.shoucangId).then(res => {
				// 			if (res.status === 0) {
				// 				this.$queue.showToast('取消收藏');
				// 				this.checkCollection(userId);
				// 			}
				// 		});
				// 	}
				// }
			},
			setFootprint() {
				let userId = this.$queue.getData('userId');
				let goodsId = this.ordersId
				if (this.className === 'pintuan' || this.className === 'miaosha') {
					goodsId = this.ordersList.goodsId;
				}
				let data = {
					"coverImg": this.ordersList.coverImg,
					"goodsId": goodsId,
					"price": this.ordersMoney,
					"title": this.ordersList.title,
					"userId": userId
				}
				this.$Request.postJson('/selfUserBrowse/save', data).then(res => {
					if (res.status === 0) {

					}
				});
			},
			lingJuan(item) {
				let userId = this.$queue.getData('userId');
				let nickName = this.$queue.getData('nickName');
				let data = {
					"couponId": item.couponId,
					"couponIssueId": item.couponIssueId,
					"couponName": item.couponName,
					"createTime": item.createTime,
					"goodsIds": item.goodsIds,
					"lessMoney": item.coupon.lessMoney,
					"minMoney": item.coupon.minMoney,
					"nickName": nickName,
					"status": item.status,
					"type": item.type,
					"userId": userId
				}
				this.$Request.postJson('/selfCouponUser/save', data).then(res => {
					if (res.status === 0) {
						this.$queue.showToast('领劵成功');
						this.CouponIssueList = [];
						this.getCouponIssueList();
					}
				});
			},
			getCouponIssueList() {
				let userId = this.$queue.getData('userId');
				this.$Request.getT('/selfCouponIssue/useList?goodsId=' + this.ordersId + '&userId=' + userId).then(res => {
					if (res.status === 0) {
						res.data.forEach(d => {
							if (d.getStatus === 1) {
								this.CouponIssueList.push(d);
							}
						});
					}
				});
			},
			goPingLunList() {
				uni.navigateTo({
					url: './pinglunList?id=' + this.ordersId
				});
			},
			getPingLunList() {
				this.$Request.getT('/selfGoodsComment/list?page=0&size=1&scoreType=0&goodsId=' + this.ordersId).then(
					res => {
						if (res.status === 0) {
							res.data.content.forEach(d => {
								if (d.img) {
									let img = d.img.split(',');
									d.img = img;
								}
								this.pinglunList = res.data.content;
							});
							this.totalElements = res.data.totalElements;
						}
					});
			},
			showLingJuan() {
				this.$refs.popusLingJuan.open();
			},
			goShare(index) {
				this.$refs.popusshare.close();
				//0,分享好友	1，生成海报
				if (index === 1) {
					this.showModal();
				}
			},
			onShare() {
				// #ifdef MP-WEIXIN
				this.$refs.popusshare.open();
				// #endif
				// #ifndef MP-WEIXIN
				this.showModal();
				// #endif
			},
			goPinDan(pinkUserList, groupPinkId) {
				uni.showLoading({
					title: '加载中...'
				});
				let token = this.$queue.getData('token');
				let userId = this.$queue.getData('userId');
				if (token) {
					var boole = false;
					for (var i = 0; i < pinkUserList.length; i++) {
						if (pinkUserList[i].userId == userId) {
							boole = true;
							break;
						}
					}
					uni.hideLoading();
					if (!boole) {
						this.groupPinkId = groupPinkId;
						if (this.ordersList.goods.attr.length === 0) {
							this.ShopCartOrMoney = '立即购买';
							this.shopCartShare('quan');
						} else {
							this.ShopCartOrMoney = '立即购买';
							this.$refs.popus.open();
						}
					} else {
						this.$queue.showToast('此团已参加过了，不能重复参与！');
					}
				} else {
					uni.hideLoading();
					this.loginS();
				}
			},
			goMaijia() {
				if (this.ordersList.store) {
					this.$queue.setData('store', this.ordersList.store);
				} else {
					this.$queue.remove('store');
				}
				let sales = this.ordersList.sales;
				if (this.className === 'pintuan' || this.className === 'miaosha') {
					sales = this.ordersList.goods.sales;
				}
				let userId = this.$queue.getData('userId');
				if (userId) {
					uni.navigateTo({
						url: '/package/pages/chat/chat?className=shop&title=' + this.ordersList.title +
							'&ordersId=' + this.ordersId +
							'&image=' + this.attrValuecoverImg +
							'&money=' + this.ordersMoney + '&sales=' + sales + '&className1=' + this.className
					});
				} else {
					this.loginS();
				}
			},
			timeFormat(param) {
				return param < 10 ? '0' + param : param;
			},
			getpintuanNumber(groupId) {
				this.$Request.postJson('/selfGroupPink/findByGroupId?groupId=' + groupId).then(res => {
					if (res.status === 0) {
						// this.pinkUserList = res.data;
						this.pinkUserList = [];
						res.data.forEach(d => {
							let data = {}
							data.day = 0;
							data.hour = 0;
							data.minute = 0;
							data.second = 0;
							var now = new Date().getTime();
							var endDate = new Date(d.endTime).getTime();
							let time = (endDate - now) / 1000;
							data.day = this.timeFormat(parseInt(time / (60 * 60 * 24)));
							data.hour = this.timeFormat(parseInt(time % (60 * 60 * 24) / 3600));
							data.minute = this.timeFormat(parseInt(time % (60 * 60 * 24) % 3600 / 60));
							data.second = this.timeFormat(parseInt(time % (60 * 60 * 24) % 3600 % 60));
							d.endTime = data;
							this.pinkUserList.push(d);
						});
					}
				});
			},
			goShopCart() {
				let token = this.$queue.getData('token');
				if (token) {
					if (this.className === 'pintuan') {
						if (this.ordersList.goods.attr.length === 0) {
							this.ShopCartOrMoney = '加入购物车';
							this.shopCartShare('quan');
						} else {
							this.ShopCartOrMoney = '加入购物车';
							this.$refs.popus.open();
						}
					} else {
						if (this.ordersList.attr.length === 0) {
							this.ShopCartOrMoney = '加入购物车';
							this.shopCartShare('quan');
						} else {
							this.ShopCartOrMoney = '加入购物车';
							this.$refs.popus.open();
						}
					}

				} else {
					this.loginS();
				}
			},
			checkState(item, index, ind) {
				this.number = 1;
				this.attrValue[index].detail.forEach(d => {
					d.state = '';
				})
				this.checkStateList[index].name = item.name;
				this.attrValue[index].goodsId = index;
				this.attrValue[index].attrId = ind;
				this.attrValue[index].detail[ind].state = '123';
				this.checkString = '';
				this.checkStateList.forEach(d => {
					if (d.name) {
						if (this.checkString) {
							this.checkString = this.checkString + ',' + d.name;
						} else {
							this.checkString = d.name;
						}

					}
				});
				for (var i = 0; i < this.ordersList.sku.length; i++) {
					let d = this.ordersList.sku[i];
					if (d.detailJson == this.checkString) {
						if (this.className === 'pintuan') {
							if (d.pinkStock > 0) {
								this.numberMoney = d.pinkPrice;
								this.numberMoney1 = d.pinkPrice;
								this.Maxnumber = d.pinkStock;
								this.skuId = d.id;
								this.attrValuecoverImg = d.skuImg;
								this.CheckattrValue = true;
							} else {
								this.Maxnumber = 0;
								this.CheckattrValue = false;
								this.$queue.showToast('库存不足请选择其他的类型')
							}
						} else if (this.className === 'miaosha') {
							if (d.secKillStock > 0) {
								this.numberMoney = d.secKillPrice;
								this.numberMoney1 = d.secKillPrice;
								this.Maxnumber = d.secKillStock;
								this.skuId = d.id;
								this.attrValuecoverImg = d.skuImg;
								this.CheckattrValue = true;
							} else {
								this.Maxnumber = 0;
								this.CheckattrValue = false;
								this.$queue.showToast('库存不足请选择其他的类型')
							}
						} else {
							if (d.stock > 0) {
								if (this.relation) {
									this.numberMoney = d.memberPrice;
									this.numberMoney1 = d.memberPrice;
								} else {
									this.numberMoney = d.skuPrice;
									this.numberMoney1 = d.skuPrice;
								}
								this.Maxnumber = d.stock;
								this.skuId = d.id;
								this.attrValuecoverImg = d.skuImg;
								this.CheckattrValue = true;
							} else {
								this.CheckattrValue = false;
								this.Maxnumber = 0;
								this.$queue.showToast('库存不足请选择其他的类型')
							}
						}
						break
					} else {
						this.CheckattrValue = false;
					}
				}
			},
			jian() {
				if (this.CheckattrValue) {
					if (this.number != 1) {
						let number = this.number - 1
						this.number = number
						this.numberMoney = parseFloat(this.numberMoney - this.numberMoney1).toFixed(2);
					}
				} else {
					this.$queue.showToast('请先选择正确的商品规格');
				}
			},
			jia() {
				if (this.CheckattrValue) {
					let number = this.number + 1
					if (number <= this.Maxnumber) {
						this.number = number
						this.numberMoney = parseFloat(this.numberMoney1 * number).toFixed(2);
					} else {
						this.$queue.showToast('商品只能买这么多了');
					}
				} else {
					this.$queue.showToast('请先选择正确的商品规格');
				}
			},
			openPopus() {
				let token = this.$queue.getData('token');
				let userId = this.$queue.getData('userId');
				if (token) {
					this.ShopCartOrMoney = '立即购买';
					if (this.className === 'pintuan' || this.className === 'miaosha') {
						if (this.ordersList.goods.attr.length === 0) {
							this.shopCartShare('quan');
						} else {
							this.$refs.popus.open();
						}
					} else {
						if (this.ordersList.attr.length === 0) {
							this.shopCartShare('quan');
						} else {
							this.$refs.popus.open();
						}
					}
				} else {
					this.loginS();
				}
			},
			hindPopus() {
				this.$refs.popus.close();
				this.groupPinkId = '';
			},
			navigate(href, e) {
				// #ifdef H5
				window.location.href = href;
				//#endif

				//#ifdef APP-PLUS
				setTimeout(function() {
					plus.runtime.openURL(href);
				}, 500);
				// #endif
			},
			getCommondityList(id) {
				uni.showLoading({
					title: '加载中...'
				});

				if (this.className === 'pintuan') {
					this.$Request.getT('/selfGroup/find?id=' + id).then(res => {
						if (res.status === 0) {
							this.imageView = [];
							this.ordersList = {};
							if (this.relation) {
								this.ordersMoney = res.data.memberPrice;
								this.numberMoney = res.data.memberPrice;
							} else {
								this.ordersMoney = res.data.price;
								this.numberMoney = res.data.price;
							}
							if (res.data.goods.attr.length > 0) {
								this.attrValue = [];
								res.data.goods.attr[0].attrValue.forEach(d => {
									let data = {
										name: ''
									}
									this.checkStateList.push(data);
									let detail = [];
									d.detail.split(',').forEach(d => {
										let data = {
											name: '',
											state: ''
										}
										data.name = d;
										detail.push(data);
									});
									d.detail = detail;
									d.attrId = '';
									d.goodsId = '';
									this.attrValue.push(d);
								});
							}
							var sales = res.data.goods.sales;
							res.data.goods.sales = sales > 10000 ? (sales / 10000).toFixed(1) + '万' : sales;
							this.brandName = res.data.goods.brand.brandName;
							this.ordersList = res.data;
							this.imageView = res.data.img.split(',');

							this.attrValuecoverImg = res.data.coverImg;
							let grade = this.$queue.getData('grade');
							if (res.data.commissionPrice != 0) {
								if (grade) {
									if (this.relation) {
										this.money = ((parseFloat(res.data.memberPrice) * parseFloat(res.data
												.commissionPrice)) * parseFloat(
												grade))
											.toFixed(
												2);
									} else {
										this.money = ((parseFloat(res.data.price) * parseFloat(res.data
											.commissionPrice)) * parseFloat(grade)).toFixed(
											2);
									}
								} else {
									if (this.relation) {
										this.money = ((parseFloat(res.data.memberPrice) * parseFloat(res.data
											.commissionPrice)) * parseFloat(this
											.$queue
											.minMoney())).toFixed(2);
									} else {
										this.money = ((parseFloat(res.data.price) * parseFloat(res.data
												.commissionPrice)) * parseFloat(this.$queue
												.minMoney()))
											.toFixed(2);
									}
								}
								if (this.relation) {
									this.shengji = ((parseFloat(res.data.memberPrice) * parseFloat(res.data
										.commissionPrice)) * parseFloat(
										this.$queue
										.maxMoney())).toFixed(2);
								} else {
									this.shengji = ((parseFloat(res.data.price) * parseFloat(res.data
											.commissionPrice)) * parseFloat(this.$queue
											.maxMoney()))
										.toFixed(2);
								}
								this.grade = grade;

								if (this.isEnable != '否') {
									if (grade) {
										if (grade === '0.7') {
											this.buyDes = '返现 ￥' + this.money;
										} else {
											this.buyDes = '分享赚 ￥' + this.shengji;
										}
									} else {
										this.buyDes = '返现 ￥' + this.shengji;
									}
								} else {
									this.buyDes = '分享给好友';
								}
							} else {
								this.isEnable = '否';
							}
						}
						uni.hideLoading();
						this.showPage = true;
						let userId = this.$queue.getData('userId');
						if (userId) {
							// this.checkCollection(userId);
							// this.setFootprint();
						}
					});
				} else if (this.className === 'miaosha') {
					this.$Request.getT('/selfSecKill/find?id=' + id).then(res => {
						if (res.status === 0) {
							this.imageView = [];
							this.ordersList = {};
							if (this.relation) {
								this.ordersMoney = res.data.memberPrice;
								this.numberMoney = res.data.memberPrice;
							} else {
								this.ordersMoney = res.data.price;
								this.numberMoney = res.data.price;
							}
							if (res.data.goods.attr.length > 0) {
								this.attrValue = [];
								res.data.goods.attr[0].attrValue.forEach(d => {
									let data = {
										name: ''
									}
									this.checkStateList.push(data);
									let detail = [];
									d.detail.split(',').forEach(d => {
										let data = {
											name: '',
											state: ''
										}
										data.name = d;
										detail.push(data);
									});
									d.detail = detail;
									d.attrId = '';
									d.goodsId = '';
									this.attrValue.push(d);
								});
							}
							var sales = res.data.goods.sales;
							res.data.goods.sales = sales > 10000 ? (sales / 10000).toFixed(1) + '万' : sales;
							this.brandName = res.data.goods.brand.brandName;
							this.ordersList = res.data;
							this.Maxnumber = res.data.number;
							this.imageView = res.data.img.split(',');
							this.attrValuecoverImg = res.data.coverImg;
							let grade = this.$queue.getData('grade');
							if (res.data.commissionPrice != 0) {
								if (grade) {
									if (this.relation) {
										this.money = ((parseFloat(res.data.memberPrice) * parseFloat(res.data
												.commissionPrice)) * parseFloat(
												grade))
											.toFixed(
												2);
									} else {
										this.money = ((parseFloat(res.data.price) * parseFloat(res.data
											.commissionPrice)) * parseFloat(grade)).toFixed(
											2);
									}
								} else {
									if (this.relation) {
										this.money = ((parseFloat(res.data.memberPrice) * parseFloat(res.data
											.commissionPrice)) * parseFloat(this
											.$queue
											.minMoney())).toFixed(2);
									} else {
										this.money = ((parseFloat(res.data.price) * parseFloat(res.data
												.commissionPrice)) * parseFloat(this.$queue
												.minMoney()))
											.toFixed(2);
									}
								}
								if (this.relation) {
									this.shengji = ((parseFloat(res.data.memberPrice) * parseFloat(res.data
										.commissionPrice)) * parseFloat(
										this.$queue
										.maxMoney())).toFixed(2);
								} else {
									this.shengji = ((parseFloat(res.data.price) * parseFloat(res.data
											.commissionPrice)) * parseFloat(this.$queue
											.maxMoney()))
										.toFixed(2);
								}
								this.grade = grade;

								if (this.isEnable != '否') {
									if (grade) {
										if (grade === '0.7') {
											this.buyDes = '返现 ￥' + this.money;
										} else {
											this.buyDes = '分享赚 ￥' + this.shengji;
										}
									} else {
										this.buyDes = '返现 ￥' + this.shengji;
									}
								} else {
									this.buyDes = '分享给好友';
								}
							} else {
								this.isEnable = '否';
							}
						}
						let userId = this.$queue.getData('userId');
						if (userId) {
							// this.checkCollection(userId);
							// this.setFootprint();
						}
						uni.hideLoading();
						this.showPage = true;
					});
				} else {
					this.$Request.getT('/goods/find?id=' + id).then(res => {
						if (res.status === 0) {
							this.imageView = [];
							this.ordersList = {};
							if (this.relation) {
								this.ordersMoney = res.data.memberPrice;
								this.numberMoney = res.data.memberPrice;
							} else {
								this.ordersMoney = res.data.price;
								this.numberMoney = res.data.price;
							}
							if (res.data.attr.length > 0) {
								this.attrValue = [];
								res.data.attr[0].attrValue.forEach(d => {
									let data = {
										name: ''
									}
									this.checkStateList.push(data);
									let detail = [];
									d.detail.split(',').forEach(d => {
										let data = {
											name: '',
											state: ''
										}
										data.name = d;
										detail.push(data);
									});
									d.detail = detail;
									d.attrId = '';
									d.goodsId = '';
									this.attrValue.push(d);
								});
							}
							this.storeId = res.data.storeId
							if (res.data.storeId) {
								this.getCount();
								this.getDianpuList();
								this.getDianpuTuijianList();
							}
							this.merchantId = res.data.merchantId;
							if (res.data.store) {
								this.storeName = res.data.store.storeName;
							}
							var sales = res.data.sales;
							res.data.sales = sales > 10000 ? (sales / 10000).toFixed(1) + '万' : sales;
							this.brandName = res.data.brand.brandName;
							this.ordersList = res.data;
							let isExists = this.$queue.isExistZy(this.collectKey, res.data.id);
							if (isExists === true) {
								this.shoucang = true;
								this.collect.name = '已收藏';
								this.collect.isCollect = 'color: #E41F19';
							} else {
								this.shoucang = false;
								this.collect.name = '收藏';
								this.collect.isCollect = false;
							}
							let isExist = this.$queue.isExistZy(this.footprintKey, res.data.id);
							if (isExist) {
								let items = [];
								items.push(this.ordersList.id);
								this.$queue.removeItemId(this.footprintKey, items);
							} else {
								this.$queue.insert({
									key: this.footprintKey,
									value: this.ordersList
								});
							}
							this.imageView = res.data.img.split(',');
							this.attrValuecoverImg = res.data.coverImg;
							let grade = this.$queue.getData('grade');
							if (res.data.commissionPrice != 0) {
								if (grade) {
									if (this.relation) {
										this.money = ((parseFloat(res.data.memberPrice) * parseFloat(res.data
												.commissionPrice)) * parseFloat(
												grade))
											.toFixed(
												2);
									} else {
										this.money = ((parseFloat(res.data.price) * parseFloat(res.data
											.commissionPrice)) * parseFloat(grade)).toFixed(
											2);
									}
								} else {
									if (this.relation) {
										this.money = ((parseFloat(res.data.memberPrice) * parseFloat(res.data
											.commissionPrice)) * parseFloat(this
											.$queue
											.minMoney())).toFixed(2);
									} else {
										this.money = ((parseFloat(res.data.price) * parseFloat(res.data
												.commissionPrice)) * parseFloat(this.$queue
												.minMoney()))
											.toFixed(2);
									}
								}
								if (this.relation) {
									this.shengji = ((parseFloat(res.data.memberPrice) * parseFloat(res.data
										.commissionPrice)) * parseFloat(
										this.$queue
										.maxMoney())).toFixed(2);
								} else {
									this.shengji = ((parseFloat(res.data.price) * parseFloat(res.data
											.commissionPrice)) * parseFloat(this.$queue
											.maxMoney()))
										.toFixed(2);
								}
								this.grade = grade;

								if (this.isEnable != '否') {
									if (grade) {
										if (grade === '0.7') {
											this.buyDes = '返现 ￥' + this.money;
										} else {
											this.buyDes = '分享赚 ￥' + this.shengji;
										}
									} else {
										this.buyDes = '返现 ￥' + this.shengji;
									}
								} else {
									this.buyDes = '分享给好友';
								}
							} else {
								this.isEnable = '否';
							}
						}
						uni.hideLoading();
						this.showPage = true;
						let userId = this.$queue.getData('userId');
						if (userId) {
							// this.checkCollection(userId);
							// this.setFootprint();
						}
					});
				}
			},
			posterSuccess(haibaoImg) {
				this.haibaoImg = haibaoImg;
				this.modalName = 'Image';
			},
			showModal() {
				if (!this.haibaoImg) {
					this.haibaoShow = true;
					this.$queue.showLoading('海报生成中...');
				} else {
					this.modalName = 'Image';
				}
			},
			hideModal() {
				this.modalName = null;
			},
			TklmaskClose: function(e) {
				this.$refs.simpleModalTkl.hide();
				this.copyTklStatus = false;
			},
			TklmaskShow: function(e) {
				this.$refs.simpleModalTkl.show({
					showConfirmButton: false
				});
			},
			shengJiMethod() {
				let relation_id = this.$queue.getData('relation_id');
				if (!relation_id) {
					uni.navigateTo({
						url: '/pages/public/mobile'
					});
				} else {
					uni.navigateTo({
						url: '/pages/member/yao'
					});
				}
			},
			qrR(path) {
				this.erweimapath = path;
			},
			selectPhoto(item) {
				let imgsArray = [];
				imgsArray[0] = item;
				uni.previewImage({
					current: 0,
					urls: imgsArray
				});
			},
			/* 预览照片 */
			previewPhoto(index) {
				uni.previewImage({
					current: this.imageView[index],
					urls: this.imageView,
					longPressActions: {
						itemList: ['保存图片'],
						success: function(res) {
							uni.getImageInfo({
								src: this.imageView[res.index],
								success: function(image) {
									uni.saveImageToPhotosAlbum({
										filePath: image.path,
										success: function() {
											uni.showToast({
												title: '图片保存成功',
												icon: 'none',
												duration: 3000
											});
										}
									});
								}
							});
						}
					}
				});
			},
			shopCartShare: function(type) {
				let token = this.$queue.getData('token');
				let userId = this.$queue.getData('userId');
				if (token) {
					this.$queue.remove("userByinvitationId");
					if (type == 'fanxian') {
						this.shengJiMethod();
					} else {
						if (this.className === 'pintuan') {
							console.log(this.className)
							if (this.ordersList.goods.attr.length > 0) {
								if (this.checkString == '' || !this.CheckattrValue) {
									this.$queue.showToast('请选择正确的商品规格');
									return;
								}
								var groupPinkId = this.groupPinkId;
								this.hindPopus();
								if (this.ShopCartOrMoney == '立即购买') {
									uni.navigateTo({
										url: '../member/order?id=' + this.ordersId + '&userByinvitationId=' +
											this.userByinvitationId +
											'&numberMoney=' + this.numberMoney1 + '&checkString=' + this
											.checkString + '&number=' + this.number +
											'&money=' + this.numberMoney + '&skuId=' + this.skuId +
											'&attrValuecoverImg=' + this.attrValuecoverImg +
											'&className=pintuan&groupPinkId=' + groupPinkId
									});
								}
							} else {
								this.numberMoney1 = this.ordersList.sku[0].pinkPrice;
								if (this.ordersList.sku[0].pinkStock > 0) {
									if (this.ShopCartOrMoney == '立即购买') {
										uni.navigateTo({
											url: '../member/order?id=' + this.ordersId +
												'&userByinvitationId=' + this.userByinvitationId +
												'&numberMoney=' + this.numberMoney1 + '&checkString=&number=' +
												this.number +
												'&money=' + this.numberMoney1 + '&skuId=' + this.skuId +
												'&attrValuecoverImg=' + this.attrValuecoverImg +
												'&className=pintuan&groupPinkId=' + this.groupPinkId
										});
									}
								} else {
									this.$queue.showToast('库存不足无法购买商品');
								}
							}
						} else if (this.className === 'miaosha') {
							if (this.ordersList.goods.attr.length > 0) {
								if (this.checkString == '' || !this.CheckattrValue) {
									this.$queue.showToast('请选择正确的商品规格');
									return;
								}
								this.hindPopus();
								if (this.ShopCartOrMoney == '立即购买') {
									uni.navigateTo({
										url: '../member/order?id=' + this.ordersId + '&userByinvitationId=' +
											this.userByinvitationId +
											'&numberMoney=' + this.numberMoney1 + '&checkString=' + this
											.checkString + '&number=' + this.number +
											'&money=' + this.numberMoney + '&skuId=' + this.skuId +
											'&attrValuecoverImg=' + this.attrValuecoverImg +
											'&className=miaosha'
									});
								}
							} else {
								this.numberMoney = this.ordersList.sku[0].secKillPrice;
								if (this.ordersList.sku[0].secKillStock > 0) {
									if (this.ShopCartOrMoney == '立即购买') {
										uni.navigateTo({
											url: '../member/order?id=' + this.ordersId +
												'&userByinvitationId=' + this.userByinvitationId +
												'&numberMoney=' + this.numberMoney + '&checkString=&number=' +
												this.number +
												'&money=' + this.numberMoney + '&skuId=' + this.skuId +
												'&attrValuecoverImg=' + this.attrValuecoverImg +
												'&className=miaosha'
										});
									}
								} else {
									this.$queue.showToast('库存不足无法购买商品');
								}
							}
						} else {
							if (this.ordersList.attr.length > 0) {
								if (this.checkString == '' || !this.CheckattrValue) {
									this.$queue.showToast('请选择正确的商品规格');
									return;
								}
								this.hindPopus();
								if (this.ShopCartOrMoney == '立即购买') {
									uni.navigateTo({
										url: '../member/order?id=' + this.ordersId + '&userByinvitationId=' +
											this.userByinvitationId +
											'&numberMoney=' + this.numberMoney1 + '&checkString=' + this
											.checkString + '&number=' + this.number +
											'&money=' + this.numberMoney + '&skuId=' + this.skuId +
											'&attrValuecoverImg=' + this.attrValuecoverImg
									});
								} else {
									let _this = this;
									let data = {
										userId: userId,
										skuId: _this.skuId,
										goodsId: _this.ordersId,
										number: _this.number,
										merchantId: _this.merchantId,
										storeId: _this.storeId,
										storeName: _this.storeName
									}
									_this.$Request.postJson('/selfCart/save', data).then(
										res => {
											if (res.status === 0) {
												_this.$queue.showToast('加入成功');
											}
										});
								}
							} else {
								if (this.ShopCartOrMoney == '立即购买') {
									var money = '';
									if (this.relation) {
										money = this.ordersList.sku[0].memberPrice;
									} else {
										money = this.ordersList.sku[0].skuPrice;
									}
									uni.navigateTo({
										url: '../member/order?id=' + this.ordersId + '&userByinvitationId=' +
											this.userByinvitationId + '&money=' +
											money

									});
								} else {
									let _this = this;
									let data = {
										userId: userId,
										skuId: _this.ordersList.sku[0].id,
										goodsId: _this.ordersId,
										number: _this.number,
										merchantId: _this.merchantId,
										storeId: _this.storeId,
										storeName: _this.storeName
									}
									console.log(_this.ordersList.sku[0].id)
									_this.$Request.postJson('/selfCart/save', data).then(
										res => {
											if (res.status === 0) {
												_this.$queue.showToast('加入成功');
											}
										});
								}
							}
						}
					}
				} else {
					this.loginS();
				}
			},
			copyTklWenAns: function() {
				uni.setClipboardData({
					data: this.ordersList.title +
						'\n【抢购价】' +
						this.ordersMoney +
						'元\n【必买理由】' +
						this.ordersList.buyReason +
						'\n下单链接：' +
						this.erweima,
					success: r => {
						this.$queue.showToast('复制成功')
						this.copyTklStatus = true;
					}
				});
			},
			goPublisher() {
				let token = this.$queue.getData('token');
				let userId = this.$queue.getData('userId');
				if (token) {
					uni.navigateTo({
						url: '/pages/public/mobile'
					});
				} else {
					this.loginS();
				}
			},
			/**
			 * 返回
			 */
			goBackUp() {
				uni.switchTab({
					url: '/pages/zysc/index/index'
				});
			},
			topScrollTap: function() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
			},
			navBarButtontO: function(type) {
				if (type === 'like') {
					uni.switchTab({
						url: '/pages/member/user'
					});
				} else if (type === 'home') {
					uni.switchTab({
						url: '/pages/zysc/index/index'
					});
				}
			},
			loginS() {
				this.$queue.setData('href', '/package/pages/zysc/index/commoditydetail?ordersId=' + this.ordersId);
				uni.navigateTo({
					url: '/pages/member/register'
				});
			},
			copyTitle: function() {
				uni.setClipboardData({
					data: this.goods.title,
					success: r => {
						this.$queue.showToast('复制成功');
					}
				});
			}
		}
	};
</script>

<style scoped>
	@import '../../../../static/css/index.css';

	page {
		background: #EDEDED;
	}

	.pintuan_syrs {
		width: 100%;
		color: #999999;
		justify-content: flex-end;
		font-size: 20upx;
		margin-left: 20upx;
		display: flex;
		padding-right: 18upx;
	}

	.tuijian {
		display: flex;
		flex-wrap: wrap;
		margin-top: 10rpx;
		margin-left: 10rpx;
	}

	.dianpu-canshu {
		width: 33%;
		color: #999999;
		font-size: 28rpx;
	}

	/* 星星 */
	@font-face {
		font-family: uniicons;
		font-weight: normal;
		font-style: normal;
		src: url('https://img-cdn-qiniu.dcloud.net.cn/fonts/uni.ttf') format('truetype');
	}

	.ping-view2 {
		font-size: 24upx;
		color: #999999;
		margin-top: 20upx;
	}

	.index-conts2 {
		font-size: 30upx;
		/* position: absolute;
		float: left; */
		color: #FD3B2C;
		text-align: left;
	}

	.feedback-star {
		font-family: uniicons;
		margin-left: 18upx;
		color: #999999;
	}

	.feedback-star-view {
		margin-left: 0upx;
		margin-top: -2upx;
	}

	.feedback-star:after {
		content: '\e408';
	}

	.feedback-star.active {
		color: #FF440C;
	}

	.feedback-star.active:after {
		content: '\e438';
	}

	/* 星星 */

	.view_button {
		float: right;
		line-height: 45upx;
		font-size: 24upx;
		color: #FF3333;
		width: 140upx;
		height: 45upx;
		border-radius: 100upx;
		background: #FFE2E2;
		text-align: center;
	}

	.swiper-container {
		min-height: 90vw;
	}

	button {
		font-size: 14px;
	}

	button::after {
		border: none;
	}

	.b-btn {
		right: 10px;
		top: 16px;
		width: 100%;
		line-height: 50upx;
		text-align: center;
		font-size: 14px;
		/* padding: 4px 1px 4px 6px; */
		color: #FCDFB8;
		z-index: 1;
	}


	.swiper-wrapper {
		width: 100%;
	}
</style>
