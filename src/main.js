import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import { routes } from './routes';
import './directives/Transform';
import VeeValidate from 'vee-validate';

Vue.use(VueResource);
Vue.http.options.root='http://localhost:3000';
Vue.use(VueRouter); 

const router = new VueRouter({ routes, mode: 'history' });

Vue.use(VeeValidate);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
