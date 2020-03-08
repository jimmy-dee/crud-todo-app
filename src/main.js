import 'normalize.css';
import './main.scss';
// import axios from 'axios';
import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#todo-app');
