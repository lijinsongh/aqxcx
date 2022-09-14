import Vue from 'vue'
import App from './App'
import HttpRequest from './common/httpRequest'
import HttpCache from './common/cache'
import queue from './common/queue'
import loadMore from './package/components/uni-pro/load-more'
import orangeGoodsList from './package/components/uni-pro/orange-goods-list'
import orangeGoodsNewsList from './package/components/uni-pro/orange-goods-news-list'
import orangeGoodsCargHome from './package/components/uni-pro/orange-goods-card-home'
import orangeGoodsCargHomeTwo from './package/components/uni-pro/orange-goods-card-home-two'
import orangeGoodsCargHomeShu from './package/components/uni-pro/orange-goods-card-home-shu'
import orangeGoodsCargHomeShuTwo from './package/components/uni-pro/orange-goods-card-home-shutwo'
import orangeHandpick from './package/components/uni-pro/orange-handpick'
import orangeMian from './package/components/uni-pro/orange-mian'
import orangeMians from './package/components/uni-pro/orange-mians'
import orangeNews from './package/components/uni-pro/orange-news'
import empty from './components/empty'
import tuiModal from '@/components/tui-modal/tui-modal'
Vue.config.productionTip = false;
Vue.prototype.$Request = HttpRequest;
Vue.prototype.$queue = queue;
Vue.prototype.$Sysconf = HttpRequest.config;
Vue.prototype.$SysCache = HttpCache;
// Vue.prototype.uma = uma || {};// 此处用来挂载入uma到组件实例上，方便组件内使用this.uma

App.mpType = 'app';
Vue.component('orange-news', orangeNews);
Vue.component('orange-handpick', orangeHandpick);
Vue.component('orange-mian', orangeMian);
Vue.component('orange-mians', orangeMians);
Vue.component('load-more', loadMore);
Vue.component('empty', empty);
Vue.component('tui-modal',tuiModal);
Vue.component('orange-goods-list', orangeGoodsList);
Vue.component('orange-goods-news-list', orangeGoodsNewsList);
Vue.component('orange-goods-card-home', orangeGoodsCargHome);
Vue.component('orange-goods-card-home-two', orangeGoodsCargHomeTwo);
Vue.component('orange-goods-card-home-shu', orangeGoodsCargHomeShu);
Vue.component('orange-goods-card-home-shutwo', orangeGoodsCargHomeShuTwo);

const app = new Vue({
    ...App
});
app.$mount();
