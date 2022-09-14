<template>
	<view class="s-page-wrapper" v-if="showPage">
		<view class="index-goods">
			<view class="swiper">
				<swiper class="swiper-container" :autoplay="true" :interval="4000" :circular="true"
					:indicator-dots="true" indicator-active-color="#FF0000" indicator-color="#cccccc">
					<block v-for="(item, index) in imageView" :key="index">
						<swiper-item class="swiper-wrapper">
							<image :src="item" mode="widthFix" class="is-response" lazy-load="true"
								@tap="previewPhoto(index)"></image>
						</swiper-item>
					</block>
				</swiper>
			</view>

			<view
				style="width: 100%;background: #FF2222;height: 110upx;display: flex;line-height: 110upx;padding: 0upx 20upx;color: #FFFFFF;">
				<view style="width: 60%;display: flex;">
					<view style="display: flex;">{{className === 'miaosha' ? '秒杀价：' : '团购价：' }}<text
							style="font-size: 34upx">￥</text>
						<text style="font-size: 40upx;">{{ordersMoney}}</text>
					</view>
					<text
						style="font-size: 24upx;color: #575353;text-decoration: line-through;margin-left: 20upx;">￥{{ ordersList.originalPrice }}</text>
				</view>
				<view style="width: 40%;text-align: right;">抢购中</view>
			</view>

			<view class="detail_head" style="border-radius: 15upx;background-color: #FFFFFF;">
				<view class="goods_info" style="padding-top: 6px;">
					<view class="coupon-price s-row">
						<view class="price" style="width: 70%">
							<text style="font-size: 34upx">￥</text>
							<text>{{ordersMoney}}</text>
							<text
								style="font-size: 24upx;color: grey;text-decoration: line-through;margin-left: 16upx;">￥{{ ordersList.originalPrice }}</text>
						</view>
						<!-- <uni-countdown color="#999999" :day="item.endTime.day" :hour="item.endTime.hour"
							:minute="item.endTime.minute" :second="item.endTime.second">
						</uni-countdown> -->
					</view>

					<view style="padding: 20rpx 0rpx 15rpx 20rpx;display: flex;">
						<text style="font-weight: bold;font-size: 34rpx;letter-spacing: 1rpx;">
							<text @longpress="copyTitle">{{ ordersList.title }}</text>
						</text>
					</view>
				</view>
				<view v-if="className === ''" style="color: #999999;font-size: 27rpx;margin-left: 16upx;">
					已售{{ ordersList.sales }}件</view>
				<view v-if="className === 'pintuan' || className === 'miaosha'"
					style="color: #999999;font-size: 24upx;margin-left: 16upx;height: 60upx;">
					已售{{ ordersList.goods.sales }}件
				</view>

				<!-- <view class="view_item">
					<view class="item_view">
						<view class="item_view_name">品牌</view>
						<view class="item_view_name1">{{brandName}}</view>
					</view>
				</view>
				<view class="view_item">
					<view class="item_view">
						<view class="item_view_name">店铺</view>
						</image>
						<view class="item_view_name1" style="margin-top: 3rpx;">淇湘优购自营店铺</view>
					</view>
				</view> -->

			</view>

			<view class="pintuan_view" v-if="pinkUserList && pinkUserList.length > 0">
				<view style="width: 100%;padding:20upx;">
					<view style="display: flex;justify-content: space-between;">
						<view class="goods-info-title-pintuan">这些人刚刚发起拼团，可直接参团</view>
					</view>
					<view v-for="(item,index) in pinkUserList">
						<view class="item_view">
							<view class="item1">
								<image
									:src="item.pinkUserList[0].headerImg ? item.pinkUserList[0].headerImg : '/static/logo2.png'">
								</image>
								<view class="item_view_nickName">
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
										:minute="item.endTime.minute" :second="item.endTime.second" :showColon="true">
									</uni-countdown>
								</view>

							</view>
							<button class="cantuan_btn" @tap='goPinDan(item.pinkUserList,item.id,item)'>去参团</button>
						</view>
					</view>
				</view>
			</view>

			<!-- <view class="bimailiyou_view">
				<view class="item">
					<view class="item_name">
						<view class="goods-info-title-pintuan">必买理由</view>
						<view class='view_button' @tap="copyTklWenAns">文案分享</view>
					</view>

					<view v-if="className === '' && ordersList.buyReason" class="goods_reco1">
						<image src="../../../static/detail/559.png" class="goods_reco1_image"></image>
						<view class="goods_desc" @click="TklmaskShow">
							<text>{{ ordersList.buyReason }}</text>
						</view>
					</view>

					<view v-if="ordersList.goods.buyReason" class="goods_reco1">
						<image src="../../../static/detail/559.png" class="goods_reco1_image"></image>
						<view class="goods_desc" @click="TklmaskShow">
							<text>{{ ordersList.goods.buyReason }}</text>
						</view>
					</view>
				</view>
			</view> -->

			<view v-if="pinglunList && pinglunList.length > 0">
				<view style="margin: 0 15rpx;background: #ffffff;border-radius: 11rpx;padding: 15rpx;">
					<view style="display: flex;justify-content: space-between;">
						<view class="goods-info-title"
							style="color: #333;font-weight: bold;width: 78%;text-align: left;float:left;">
							宝贝评论({{totalElements}})</view>
						<view style="color: #999999;" @tap="goPingLunList()">查看更多</view>
						<image src="../../../../static/img/goods/right_icon.png"
							style="width: 15rpx;height: 26rpx;margin-top: 8rpx;"></image>
					</view>

					<view style="display: flex;padding: 20rpx;">
						<image :src="pinglunList[0].userHeader ? pinglunList[0].userHeader : '/static/logo2.png'"
							style="width: 80rpx;height: 80rpx;border-radius: 50rpx;"></image>
						<view style="margin-top: 5rpx;margin-left: 10rpx;width: 40%;">
							<view
								style="margin-left: 20rpx;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">
								{{pinglunList[0].userName}}
							</view>
							<urate style="margin-left: 15rpx;margin-top: 10rpx;" :size='18'
								:value="pinglunList[0].score" />
						</view>
						<view style="margin-left: 20rpx;margin-top: 20rpx;color: #666666;">{{pinglunList[0].createTime}}
						</view>
					</view>
					<!-- #ifdef MP-WEIXIN -->
					<view style="padding: 0 20rpx 0 20rpx;">{{pinglunList[0].content}}</view>
					<view style="display: flex;padding: 10rpx 0 0 10rpx;flex-wrap: wrap;"
						v-if="pinglunList[0].img && pinglunList[0].img.length > 0">
						<view style="margin: 5rpx;" v-for="(item,index) in pinglunList[0].img">
							<image :src="item" lazy-load="true"
								style="width: 210rpx;height: 210rpx;border-radius: 10rpx;" @tap='selectPhoto(item)'>
							</image>
						</view>
					</view>
					<!-- #endif -->
					<!-- #ifndef MP-WEIXIN -->
					<view style="padding: 20rpx 20rpx 0 20rpx;">{{pinglunList[0].content}}</view>
					<view style="display: flex;padding: 10rpx 0 0 10rpx;flex-wrap: wrap;"
						v-if="pinglunList[0].img && pinglunList[0].img.length > 0">
						<view style="margin: 5rpx;" v-for="(item,index) in pinglunList[0].img">
							<image :src="item" lazy-load="true"
								style="width: 210rpx;height: 210rpx;border-radius: 10rpx;" @tap='selectPhoto(item)'>
							</image>
						</view>
					</view>
					<!-- #endif -->
				</view>
			</view>

			<view class="goods_reco" style="border-radius: 15upx;margin-top: 30upx;" v-if="ordersList.descrition">
				<view class="goods-info-title" style="color: #333;font-weight: bold;">商品详情</view>
				<view class="imglist" style="padding: 0upx 20upx;">
					<!-- <view style="width: 100%;text-align: center;">商品详情</view> -->
					<uParse :content="ordersList.descrition" @navigate="navigate" class="is-response"></uParse>
				</view>
			</view>
			<!-- <view class="goods_reco" style="border-radius: 15upx;"
				v-if="ordersList.descrition && className === 'miaosha'">
				<view class="goods-info-title" style="color: #333;font-weight: bold;">相关秒杀</view>
				<view class="imglist">
				</view>
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
						style="text-align: center;width: 10%;margin-top: 4px;margin-bottom: 4px;display: flex;margin-left: 10rpx;"
						v-if="className != 'pintuan' && className != 'miaosha'">
						<view style="width: 90%;text-align: center;" @tap="goCollection()">
							<image v-if="shoucang"
								src="https://api.shengqianxiong.com.cn/img/20201121/3a81ebb4b34a44b2840d63b33ec73126.png"
								style="width: 42upx;height: 44upx;margin-top: 3upx;"></image>
							<image v-if="!shoucang"
								src="https://api.shengqianxiong.com.cn/img/20201112/770dc7edb8134a37ac7528acac65b768.png"
								style="width: 42upx;height: 44upx;margin-top: 3upx;"></image>
							<view style="font-size: 12px">收藏</view>
						</view>
					</view>
					<!-- #ifdef MP-WEIXIN -->
					<view
						:style="className === 'pintuan' || className === 'miaosha' ? 'width: 75%;display: flex;color: white;margin-top: 13rpx;margin-right: 20rpx;margin-left: 80rpx;' :'width: 75%;display: flex;color: white;margin-top: 13rpx;margin-right: 20rpx;'">

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
									【在售价】{{ ordersMoney }}元
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
			<view class="xinrenhongbao">
				<image @click="goMaijia(ordersList.id)"
					src="https://api.shengqianxiong.com.cn/img/20201215/286e5f357bce465bb4eafbd3ec858512.png"
					style="width: 130upx;height: 130upx;position: fixed;bottom: 160upx;right: 25upx;z-index: 99;">
				</image>
			</view>
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
			<!-- 弹框 -->
			<uni-popup ref="popus" type="bottom">
				<view
					style="width: 100%;height: max-content;background: #FFFFFF;border-top-left-radius: 20upx;border-top-right-radius: 20upx;padding: 40upx;">
					<view style="display: flex;">
						<image :src="attrValuecoverImg" style="width: 150upx;height: 150upx;"></image>
						<view style="margin-top: 20upx;margin-left: 20upx;">
							<view class="name">
								{{ ordersList.title }}
							</view>
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
								'width: 150rpx; height: 50rpx;background: #F2F2F2;text-align: center;border-radius: 50rpx;line-height: 50rpx;margin: 20rpx 0rpx 0rpx 10rpx;border: 1rpx solid #FF0000;'
								: 'width: 150rpx; height: 50rpx;background: #F2F2F2;text-align: center;border-radius: 50rpx;line-height: 50rpx;margin: 20rpx 0rpx 0rpx 10rpx;'">
									{{de.name}}
								</view>
							</view>
						</view>
					</view>
					<view style="display: flex;" v-if='ordersList.isExpress == 1'>
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
	import uParse from '../../../../package/components/u-parse/u-parse.vue'
	import simpleModal from '../../../../components/simple-pro/customModal.vue';
	import uniPopup from '../../../../components/uni-popup/uni-popup.vue';
	import wmPoster from '../../../../components/wm-poster/wm-posterorders.vue';
	import tkiQrcode from '../../../components/tki-qrcode/tki-qrcode.vue';
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

				day: 1,
				hour: 1,
				minute: 1,
				second: 1,

				showPage: false,
				goods: '',
				relation: false,
				brandName: '',
				numberMoney1: 0,
				scrollTop: false,
				checkStateList: [],
				navBarButton: false,
				copyTklStatus: false,
				attrValuecoverImg: '',
				name: '',
				XCXErweima: '',
				icon: '',
				CheckattrValue: false,
				save: false,
				tkl: '',
				relation_id: null,
				money: 0,
				grade: '',
				groupPinkId: '',
				isInvitation: 0,
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
				footprintKey: 'orange-sqx-footprint-zy',
				collectKey: 'orange-sqx-collect-zy',
				userId: '',
				stars: [1, 2, 3, 4, 5],
				ordersList: {},
				checkString: '',
				bottomData: [{
						text: '分享好友',
						icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-2.png',
						name: 'wx'
					},
					{
						text: '生成海报',
						icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-5.png',
						name: 'more'
					}
				]
			};
		},
		components: {
			urate,
			uParse,
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
				this.relation = true;
			} else {
				this.relation = false;
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
			console.log(this.$queue.getData('relation_id'), '88')
			let relation_id = this.$queue.getData('relation_id');
			if (relation_id) {
				this.erweima = this.$queue.publicYuMing() +
					'/#/package/pages/zysc/index/commoditydetail?userByinvitationId=' +
					relation_id +
					'&ordersId=' + this.ordersId;

				//分享好友
				if (this.className === 'pintuan') {
					this.XCXErweima = this.$queue.publicYuMing() +
						'/tao/user/getImg?page=pages/zysc/index/commoditydetail&scene=' + this.ordersId + ',' +
						relation_id + ',pintuan' + '&width=200'
				} else if (this.className === 'miaosha') {
					this.XCXErweima = this.$queue.publicYuMing() +
						'/tao/user/getImg?page=pages/zysc/index/commoditydetail&scene=' + this.ordersId + ',' +
						relation_id + ',miaosha' + '&width=200'
				} else {
					this.XCXErweima = this.$queue.publicYuMing() +
						'/tao/user/getImg?page=pages/zysc/index/commoditydetail&scene=' + this.ordersId + ',' +
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
				this.erweima = this.$queue.publicYuMing() + '/#/package/pages/zysc/index/commoditydetail?ordersId=' +
					this
					.ordersId;
				//分享好友
				if (this.className === 'pintuan') {
					this.XCXErweima = this.$queue.publicYuMing() +
						'/tao/user/getImg?page=pages/zysc/index/commoditydetail&scene=' + this.ordersId + ',,' +
						'pintuan' +
						'&width=200'
				} else if (this.className === 'miaosha') {
					this.XCXErweima = this.$queue.publicYuMing() +
						'/tao/user/getImg?page=pages/zysc/index/commoditydetail&scene=' + this.ordersId + ',,' +
						'miaosha' +
						'&width=200'
				} else {
					this.XCXErweima = this.$queue.publicYuMing() +
						'/tao/user/getImg?page=pages/zysc/index/commoditydetail&scene=' + this.ordersId + '&width=200'
				}

				//分享海报
				if (this.className === 'pintuan' || this.className === 'miaosha') {
					this.shareMessage = '/package/pages/zysc/index/commoditydetail?ordersId=' + this.ordersId +
						'&className=' +
						this.className;
				} else {
					this.XCXErweima = this.$queue.publicYuMing() +
						'/tao/user/getImg?page=package/pages/zysc/index/commoditydetail&scene=' + this.ordersId +
						'&width=200'
				}
				this.relation = false;
			}

			// let userId = this.$queue.getData('userId');
			let userId = this.$queue.getData('userId');

			if (userId) {
				// this.checkCollection(userId);
				this.getUserInfo(userId);

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
				title: '在售价' + this.ordersMoney + '   ' + this.ordersList.title,
				imageUrl: this.imageView[0]
			}
		},
		methods: {
			goMaijia() {
				let userId = this.$queue.getData('userId');
				if (userId) {
					let sales = this.ordersList.sales;
					if (this.className === 'pintuan' || this.className === 'miaosha') {
						sales = this.ordersList.goods.sales;
					}
					uni.navigateTo({
						url: '/package/pages/chat/chat?className=shop&title=' + this.ordersList.title +
							'&ordersId=' + this
							.ordersId + '&image=' + this.attrValuecoverImg +
							'&money=' + this.ordersMoney + '&sales=' + sales + '&className1=' + this.className
					});
				} else {
					this.loginS();
				}
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
				let userId = this.$queue.getData('userId');
				if (userId) {
					if (this.shoucang) {
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
						this.$Request.postJson('/selfUserCollect/save', data).then(res => {
							if (res.status === 0) {
								this.$queue.showToast('收藏成功');
								this.checkCollection(userId);
							}
						});
					} else {
						this.$Request.getT('/selfUserCollect/delete?id=' + this.shoucangId).then(res => {
							if (res.status === 0) {
								this.$queue.showToast('取消收藏');
								this.checkCollection(userId);
							}
						});
					}
				}
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
			//获取用户信息
			getUserInfo(userId) {
				this.$Request.getT('/user/' + userId).then(res => {
					if (res.status === 0) {
						if (res.data.orderJifen) {
							this.jifen = parseFloat(res.data.orderJifen).toFixed(0);
						}
						this.$queue.setData('image_url', res.data.image_url);
						this.$queue.setData('relation_id', res.data.relationId);
						this.$queue.setData('nickName', res.data.nickName);
						this.$queue.setData('isInvitation', res.data.isInvitation);
						if (res.data.isTuan) {
							this.isTuan = parseInt(res.data.isTuan);
						}
						if (res.data.gradeDes) {
							this.dengji = res.data.gradeDes;
						} else {
							this.dengji = '已邀请0人';
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
							this.image_url = '/static/img/common/logo.png';
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
								uni.navigateTo({
									url: '/pages/member/register'
								});
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
					this.loginS();
				} else {
					if (!relation_id) {
						uni.navigateTo({
							url: '/pages/member/publisher?uid=' + userId + '&token=' + token
						});
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
								'级返现！\n2、购买商品可享受省钱 +返现！\n3、分享商品给好友购买拿返现金额！\n4、邀好友加入享受永久粉丝提成！\n5、可生成专属商城推广链接;\n6、更多会员特权我们将陆续上线！\n注：VIP越高返现越高哦',
							success: res => {
								if (res.confirm) {
									this.shengJiMethod();
								}
							}
						});
					}
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
				let sales = this.ordersList.sales;
				if (this.className === 'pintuan' || this.className === 'miaosha') {
					sales = this.ordersList.goods.sales;
				}
				this.$queue.setData('coverImg', this.attrValuecoverImg);
				this.$queue.setData('title', this.ordersList.title);
				this.$queue.setData('pinkUserList', pinkUserList);
				this.$queue.setData('money', this.ordersMoney);
				this.$queue.setData('sales', sales);
				this.$queue.setData('originalPrice', this.ordersList.originalPrice);
				uni.navigateTo({
					url: '/package/pages/zysc/index/pintuanDetail?id=' + this.ordersId
				});

				// uni.showLoading({
				// 	title: '加载中...'
				// });
				// let token = this.$queue.getData('token');
				// let userId = this.$queue.getData('userId');
				// if (token) {
				// 	var boole = false;
				// 	for (var i = 0; i < pinkUserList.length; i++) {
				// 		if (pinkUserList[i].userId == userId) {
				// 			boole = true;
				// 			break;
				// 		}
				// 	}
				// 	uni.hideLoading();
				// 	if (!boole) {
				// 		this.groupPinkId = groupPinkId;
				// 		if (this.ordersList.goods.attr.length === 0) {
				// 			this.ShopCartOrMoney = '立即购买';
				// 			this.shopCartShare('quan');
				// 		} else {
				// 			this.ShopCartOrMoney = '立即购买';
				// 			this.$refs.popus.open();
				// 		}
				// 	} else {
				// 		this.$queue.showToast('此团已参加过了，不能重复参与！');
				// 	}
				// } else {
				// 	uni.hideLoading();
				// 	this.loginS();
				// }
			},
			countDownFun(time) {
				//当前时间戳
				let timestamp = new Date().getTime()
				let times = time - timestamp
				let playTime,
					day = 0,
					hour = 0,
					minute = 0,
					second = 0; //时间默认值
				if (times > 0) {
					second = Math.floor(times / 1000); //未来时间距离现在的秒数
					day = Math.floor(second / 86400); //整数部分代表的是天；一天有24*60*60=86400秒 ；
					second = second % 86400; //余数代表剩下的秒数；
					hour = Math.floor(second / 3600); //整数部分代表小时；
					second %= 3600; //余数代表 剩下的秒数；
					minute = Math.floor(second / 60);
					second %= 60;
				}
				//不足两位时添加0
				if (day <= 9) day = '0' + day;
				if (hour <= 9) hour = '0' + hour;
				if (minute <= 9) minute = '0' + minute;
				if (second <= 9) second = '0' + second;

				if (day > 0) {
					playTime = `${day}天${hour}小时${minute}分钟${second}秒`;
				}
				if (day <= 0 && hour > 0) {
					playTime = `${hour}小时${minute}分${second}秒`;
				}
				if (day <= 0 && hour <= 0) {
					playTime = `${minute}分钟${second}秒`;
				}
				return playTime
			},
			timeFormat(param) {
				return param < 10 ? '0' + param : param;
			},
			getpintuanNumber(groupId) {
				this.$Request.postJson('/selfGroupPink/findByGroupId?groupId=' + groupId).then(res => {
					if (res.status === 0) {
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
				console.log(this.ordersList.sku)
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
								this.CheckattrValue = false;
								this.Maxnumber = 0;
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
								this.Maxnumber = 0;
								this.CheckattrValue = false;
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
							console.log(this.relation, '11111111')
							this.ordersMoney = res.data.price;
							this.numberMoney = res.data.price;
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
							if (res.data.goods.brand.brandName) {
								this.brandName = res.data.goods.brand.brandName;
							}
							this.ordersList = res.data;
							this.imageView = res.data.img.split(',');
							this.attrValuecoverImg = res.data.coverImg;
							console.log(this.name)
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
							this.checkCollection(userId);
							this.setFootprint();
						}
					});
				} else if (this.className === 'miaosha') {
					this.$Request.getT('/selfSecKill/find?id=' + id).then(res => {
						if (res.status === 0) {
							this.imageView = [];
							this.ordersList = {};
							this.ordersMoney = res.data.price;
							this.numberMoney = res.data.price;
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
							this.checkCollection(userId);
							this.setFootprint();
						}
						uni.hideLoading();
						this.showPage = true;
					});
				} else {
					this.$Request.getT('/goods/find?id=' + id).then(res => {
						if (res.status === 0) {
							this.imageView = [];
							this.ordersList = {};
							console.log(this.relation, '111111a')
							this.ordersMoney = res.data.price;
							this.numberMoney = res.data.price;
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
							if (res.data.brand) {
								this.brandName = res.data.brand.brandName;
							}
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
							this.checkCollection(userId);
							this.setFootprint();
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
					let token = this.$queue.getData('token');
					let userId = this.$queue.getData('userId');
					uni.navigateTo({
						url: '/pages/member/publisher?uid=' + userId + '&token=' + token
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
											'&className=pintuan&groupPinkId=' + groupPinkId + '&title=' + this
											.ordersList.title
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
												'&className=pintuan&groupPinkId=' + this.groupPinkId +
												'&title=' + this.ordersList.title
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
											'&className=miaosha' + '&title=' + this.ordersList.title
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
												'&className=miaosha' + '&title=' + this.ordersList.title
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
											'&attrValuecoverImg=' + this.attrValuecoverImg + '&title=' + this
											.ordersList.title
									});
								} else {
									let _this = this;
									let data = {
										userId: userId,
										skuId: _this.skuId,
										goodsId: _this.ordersId,
										number: _this.number
									}
									_this.$Request.postJson('/selfCart/save', data).then(
										res => {
											if (res.status === 0) {
												_this.$queue.showToast('加入成功');
											}
										});
								}
							} else {
								if (this.ordersList.sku[0].stock < 1) {
									this.$queue.showToast('库存不足，请稍后在来购买吧！');
									return;
								}
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
											money + '&maxNumber=' + this.ordersList.sku[0].stock

									});
								} else {
									let _this = this;
									let data = {
										userId: userId,
										skuId: _this.ordersList.sku[0].id,
										goodsId: _this.ordersId,
										number: _this.number
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
						'\n【在售价】' +
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
			/**
			 * 返回
			 */
			goBackUp() {
				uni.switchTab({
					url: '/package/pages/zysc/index/index'
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
						url: '/package/pages/zysc/index/index'
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

<style lang="scss" scoped>
	@import '../../../../static/css/index.css';

	page {
		background: #f8f8f8;
	}




	.view_item {
		width: 100%;
		height: 60rpx;
		// line-height: 80rpx;
	}

	.item_view {
		float: right;
		width: 100%;
		display: flex;

		image {
			height: 24upx;
			width: 24upx;
			// margin-top: 13px;
			margin-right: 10upx;
		}
	}

	.item_view_name {
		margin-right: 60upx;
		margin-left: 20upx;
		color: #999999;
		font-size: 28rpx;
	}

	.item_view_name1 {
		color: #666666;
		font-size: 28rpx;
	}


	.goods_reco {
		background: #FFFFFF;
		margin-bottom: 120upx;
		// position: relative;
		// top: -100rpx;
	}

	.cantuan_btn {
		width: 150upx;
		height: 50upx;
		font-size: 24upx;
		color: #FFFFFF;
		background: #FF0000;
		line-height: 50upx;
		margin-left: 20upx;
		margin-top: 7upx;
	}

	.bimailiyou_view {
		margin: 30rpx 20rpx;
		border-radius: 15rpx;
		background-color: #FFFFFF;
		margin-bottom: 30rpx;
		// position: relative;

		.item {
			width: 100%;

			padding: 6rpx 24rpx 20rpx 24rpx;
		}

		.item_name {
			display: flex;
			justify-content: space-between;
		}
	}

	.goods_desc {
		font-size: 24upx;
		line-height: 48upx;
		padding: 10upx 20upx;
		color: #888888;
		padding-bottom: 16upx;
		padding-top: 20upx;
	}

	.goods_reco1 {
		background: #FFFFFF;
		display: flex;
		background-color: #F2F2F2;
		width: 100%;
		// position: relative;
		border-radius: 8upx;
	}

	.goods_reco1_image {
		width: 14upx;
		height: 12upx;
		display: block;
		position: absolute;
		top: -12upx;
		left: 34upx
	}

	.goods-info-title-pintuan {
		font-weight: 400;
		font-size: 28upx;
		height: 60upx;
		line-height: 60upx;
		color: #333333;
		width: 100%;
		text-align: left;
		float: left;
	}

	.goods-info-title {
		font-weight: 400;
		text-align: center;
		font-size: 28upx;
		height: 80upx;
		line-height: 80upx;
		color: #333333;
	}

	.pintuan_view {
		margin: 20upx 15upx;
		padding-bottom: 30upx;
		border-radius: 15upx;
		background-color: #FFFFFF;
		overflow: hidden;

		.pintuan_syrs {
			width: 100%;
			color: #999999;
			justify-content: flex-end;
			font-size: 20upx;
			margin-left: 20upx;
			display: flex;
			padding-right: 18upx;
		}

		.item1 {
			display: flex;
			width: 45%;
			margin-top: 6upx;
		}

		.item_view_nickName {
			margin-top: 15upx;
			font-size: 24upx;
			margin-left: 20upx;
			text-overflow: ellipsis;
			overflow: hidden;
			width: 200upx;
		}

		image {
			width: 50upx;
			height: 50upx;
			border-radius: 100upx;
		}
	}

	.fenxiang_view {
		width: 120upx;
		height: 48upx;
		text-align: center;
		line-height: 48upx;
		margin-left: 20upx;
		margin-top: -10upx;
	}

	.juan_item {
		font-size: 26upx;
		color: #FB2C1C;
		margin: 6upx 10upx;
		border: 2upx solid #FB2C1C;
		border-radius: 7upx;
		width: max-content;
		text-align: center;
		padding: 1upx 10upx 1upx 10upx;
	}

	.price1 {
		font-size: 24upx;
		color: grey;
		text-decoration: line-through;
		margin-left: 16upx;
	}

	.huiyuan_view1 {
		background: #333333;
		padding: 16upx;
		display: flex;
		font-size: 28upx;

		image {
			width: 40upx;
			height: 35upx;
			display: block;
			margin-top: 10upx;
			margin-right: 17upx;
		}
	}

	.vip-card-box {
		width: 93%;
		margin: 0 auto;
		height: 100rpx;
		overflow: hidden;
		background: linear-gradient(#161616 0%, #363636 100%);
		border-radius: 15rpx;
		// position: relative;
		// top: -160rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.card-bg {
			width: 440upx;
			height: 320upx;
		}

		.b-btn {
			width: 160rpx;
			height: 55rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 25rpx;
			color: #333333;
			border-radius: 32rpx;
			z-index: 1;
			background: #fde3de;
			margin-right: 20rpx;
		}

		.b-btn image {
			width: 30rpx;
			height: 30rpx;
		}

		.tit {
			font-size: 14px;
			color: #fde3de;
			margin-left: 20upx;
		}
	}

	.yticon {
		font-size: 33rpx;
		font-weight: bold;
		margin-right: 10rpx;
	}

	.detail_head {
		// border-radius: 15upx;
		background-color: #FFFFFF;
		margin: 0 auto;
		// box-shadow: 0rpx 5rpx 10rpx 2rpx #e5e5e5;
		margin-bottom: 20rpx;
		// position: relative;
		// top: -145rpx;
	}

	.huiyuan_view {
		background: #333333;
		padding: 8px;
		display: flex;
		font-size: 14px;
		font-weight: bold
	}

	.vipicon {
		width: 57upx;
		height: 28upx;
		display: block;
		margin-top: 16upx;
		margin-right: 17upx;
	}

	.vipName {
		color: #FCDFB8;
		width: 74%;
		line-height: 60upx
	}

	.vip_itemview {
		// position: relative;
		margin-top: 4upx;
	}

	.vip_itemview_icon {
		width: 130upx;
		height: 50upx;
	}

	/* .xinrenhongbao image {
		animation: myfirst 1s infinite;
	}

	@keyframes myfirst {
		0% {
			transform: translate(0px, 0px);
		}

		50% {
			transform: translate(0px, -15px);
		}

		100% {
			transform: translate(0px, 0px);
		}
	} */

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
		margin-bottom: 10upx;
		padding-left: 24rpx;
		float: right;
		line-height: 45upx;
		font-size: 24upx;
		width: 140upx;
		height: 45upx;
		// box-shadow: rgba(183, 183, 183, 0.3) 1px 1px 10px 1px;
		border-radius: 100upx;
		color: #FF3333;
		background: #FFE2E2;
		margin-top: 15rpx;
	}

	.swiper-container {
		min-height: 48vh;
	}

	button {
		font-size: 14px;
	}

	button::after {
		border: none;
	}


	.is-response {
		height: 100% !important;
	}
</style>
