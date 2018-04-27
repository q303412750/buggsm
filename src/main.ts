
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios/index.js';
import './style/animate.min.css';
import app from './nmb/app';
import rely from './nmb/oauth2/oauth2rely';
import clientConfig from './params/config';
import oauth2 from './params/oauth2';

Vue.use(ElementUI);

Vue.config.productionTip = false;
app.params = Object.assign(app.params, clientConfig);

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
