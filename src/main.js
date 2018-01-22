// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'

Vue.use(VueAwesomeSwiper);

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  // watch:{
  //   "$route" : 'checkLogin'
  // },
  created() {
    // this.checkLogin();
  },
  methods:{
    checkLogin(){

      //检查是否存在session
      if(!localStorage.getItem("phone")){
        this.$router.push('/login');
      }else{
        this.$router.push('/index');
      }
    }
  }
})

