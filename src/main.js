/*
 * @Author: flyharvest
 * @Date: 2020-05-24 15:23:41
 * @LastEditTime: 2020-05-30 17:33:36
 * @LastEditors: flyharvest
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueGuidePlugin from './lib'
Vue.use(VueGuidePlugin)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
