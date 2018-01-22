<template>
	<transition name="fade">
		<div class="login">
			<div class="head">
				<i class="icon-wangyi icon"></i>
				<p class="title">网易云音乐</p>
				<p class="listen">&nbsp;听见·好时光！</p>
			</div>
			<div class="content">
				<input class="phone" type="text" placeholder="手机号" v-model="phone">
				<input class="password" type="password" placeholder="密码" v-model="password">
				<p class="submit" @click="login">登录</p>
			</div>
		    <!-- loading -->
		    <loading v-if="isLoading"></loading>
		</div>
	</transition>
</template>

<script>
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import Vueaxios from 'vue-axios';
import store from '../store';
import loading from './loading.vue';

Vue.use(Vueaxios,axios);

export default{
	data(){
		return{
			phone: '',
			password: ''
		}
	},
	computed:{
		isLoading(){
			return store.getters.getIsLoading
		}
	},
	methods:{

	  	//登录逻辑
	  	login(){
	  		console.log("loading")
	  		if(this.phone!='' && this.password!=''){
	  			this.toLogin();
	  		}
	  		
	  		
	  	},

	  	//登录请求
	  	toLogin(){

	  		//一般要跟后端了解密码的加密规则

	  		//需要想后端发送的登录参数
	  		let loginParam = {
	  			phone: this.phone,
	  			password: this.password
	  		}

	  		
			store.commit("Loading",true)
	  		//请求后端,比如:
	  		axios.get('/api/login/cellphone?phone='+loginParam.phone+'&password='+loginParam.password).then((res) => {
	  			if(res.data.code == 200){
	  				console.log('登录成功')
	  				this.$router.push('/index')
	  				store.commit('setInfo',loginParam),
	  				store.commit('Loading',false)
	  			}else{
	  				console.log('登录失败')
	  				this.$router.push('/login');
	  				console.log(this.$router.push('/login'))
	  			}
	  		}).catch((err)=>{
	  			console.log(err)
	  		})
	  	}
	  },
	  components: {
	  	loading
	  }
}
</script>
<!-- background: linear-gradient(to right, #e2e5dc 50%,#fcfefd 50%,#e6e8e3 50%); -->
<style lang="less">
	.login{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: radial-gradient(ellipse,#fcfefd 42%,#cbd1d1);
		z-index: 1000;
		&.fade-enter-active,&.fade-leave-active{
			transition: opacity 0.5s;
		}
		&.fade-enter,&.fade-leave-active{
			opacity: 0;
		}
		.head{
			text-align: center;
			.icon{
				width: 80px;
				height: 80px;
				background: #e93527;
				font-size:74px;
				color: #fff;
				line-height: 80px;
				text-align: center;
				border-radius: 6px;
				margin: 10vh auto 0;
				display: block;
			}
			.title{
				font-family: '隶书';
				font-size: 40px;
				font-weight: bold;
				color: #333;
				margin-top: 15px;
			}
			.listen{
				font-family: "华文新魏";
				font-size: 22px;
				color: #888;
				letter-spacing: 10px;
			}
		}
		.content{
			margin: 10vh;
			.phone,.password{
				width: 200px;
				height: 24px;
				font-size: 14px;
				color: #666;
				padding: 2px 15px;
				border: 1px solid #aaa;
				border-radius: 14px;
				display: block;
				outline: none;
				margin: 0 auto 15px;
			}
			.submit{
				width: 230px;
				height:28px;
				font-size:16px;
				color: #333;
				letter-spacing: 10px;
				line-height: 28px;
				text-align: center;
				border: 1px solid #aaa;
				border-radius:13px;
				margin: 0 auto;
			}
		}
	}
</style>