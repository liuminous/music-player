<template>
	<div class="searching" v-show="isShow">
		<div class="searchheader">
			<i class="icon-back" @click="hideSearch"></i>
			<div class="search-wrap">
				<input class="target" placeholder="音乐、视频、歌词、电台" v-on:input="showResultList" @keydown.enter="searchResults" v-model="value">
				<i class="icon-close" v-show="showDelate" @click="delate"></i>
			</div>
		</div>

		<!-- 搜索推荐页面 歌手分类 热门搜索 历史记录 -->
		<transition>
			<div class="recommend" v-show="!showSearchResult">
				<div class="singer">
					<i class="icon-community"></i>
					<span>歌手分类</span>
					<i class="icon-right"></i>
				</div>
				<div class="hotsearch">
					<p>热门搜索</p>
					<div class="hot">
						<span>狐狸</span>
						<span>RADWIMPS</span>
						<span>带你去旅行</span>
						<span>消愁</span>
						<span>秋天不回来</span>
						<span>全部都是你</span>
						<span>爱的就是你</span>
						<span>短发</span>
						<span>该死的温柔</span>
						<span>醉赤壁</span>
					</div>
				</div>
				<div class="history">
					<div class="list" v-for="item in searchHistory">
						<i class="icon-set-time"></i>
						<div class="list-con">
							<span>{{item}}</span>
							<i class="icon-close"></i>
						</div>
					</div>
				</div>
			</div>
		</transition>

		<search-result></search-result>

		<div class="result" v-show="showResult">
			<div class="searchresult" @click="searchResults()">搜索“{{this.value}}”</div>
			<div class="resultlist" v-for="item in searchResult">
				<i class="icon-search"></i>
				<span @click="chooseKeywords($event)">{{item.name}}</span>
			</div>
		</div>

		<bottom-bar></bottom-bar>
	</div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import Vueaxios from 'vue-axios'
import searchresult from './searchresult.vue'
import bottombar from './bottombar.vue'
import store from '../store'

	export default{
		data(){
			return{
				isShowResult: false,
				isShowDelate: false,
				value: '',
				history: JSON.parse(localStorage.getItem("searchhistory"))||[]
			}
		},
		computed: {
			isShow(){
				return store.getters.getIsShowSearch
			},
			showResult(){
				return this.isShowResult
			},
			showDelate(){
				return this.isShowDelate
			},
			searchResult(){
				return store.getters.getSearchResult
			},
			searchHistory(){
				return store.getters.getSearchHistory
			},
			showSearchResult(){
				return store.getters.getIsShowSearchResult
			}
		},
		methods: {
			hideSearch(){
				store.dispatch('set_showsearch',false)
			},
			showResultList(){
				this.isShowResult = this.value == '' ? false : true
				if(this.value){
					this.isShowDelate = true,
					axios.get('/api/search?keywords='+this.value).then((res) => {
						store.dispatch('set_searchresult',res.data.result)
					}).catch((err) => {
						console.log(err)
					})
				}else{
					this.isShowDelate = false
				}
			},
			//按enter或点击点击联想词 搜索结果
			searchResults(){
				if(this.value){
					store.dispatch('set_keywords',this.value),

					axios.get('/api/search/multimatch?keywords='+this.value).then((res)=>{
						store.dispatch('set_bestmatch',res.data.result)
					}).catch((err)=>{
						console.log(err)
					})

					axios.get('/api/search?keywords='+this.value).then((res) => {
						store.dispatch('set_searchresult',res.data.result)
					}).catch((err) => {
						console.log(err)
					})

					axios.get('/api/search?keywords='+this.value+'&type=100').then((res)=> {
						console.log(res.data),
						store.dispatch('set_searchsinger',res.data.result)
					}).catch((err)=>{
						console.log(err)
					})

					this.isShowResult = false,
					this.history.unshift(this.value),
					this.history.length > 5 ? this.history.pop() : this.history,
					localStorage.setItem("searchhistory",JSON.stringify(this.history)),
					store.dispatch('set_searchhistory'),
					store.commit('setShowSearchResult',true)
				}
			},
			chooseKeywords(event){
				let e = event || window.event;
				this.value = e.target.innerText;
				this.searchResults();
			},
			delate(){
				this.value = this.value.slice(0,-1);
				this.isShowResult = this.value == '' ? false : true
				if(this.value){
					this.isShowDelate = true,
					axios.get('/api/search?keywords='+this.value).then((res) => {
						store.dispatch('set_searchresult',res.data.result)
					}).catch((err) => {
						console.log(err)
					})
				}else{
					this.isShowDelate = false
				}
			}
		},
		components: {
			'search-result': searchresult,
			'bottom-bar': bottombar
		},
		watch: {
			isShow(){
				this.value = '',
				this.isShowResult = false,
				this.isShowDelate = false
			}
		},
		mounted(){
			if(localStorage.getItem("searchhistory")){
				store.dispatch('set_searchhistory')
			}
		}
	}	
</script>

<style lang="less">
	.searching{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #fff;
		z-index: 10;
		.searchheader{
			width: 100%;
			height: 50px;
			background: #C62F2F;
			display: flex;
			align-items: center;
			justify-content: space-around;
			box-sizing: border-box;
			padding: 0 10px; 
			.icon-back{
				width: 36px;
				height: 36px;
				line-height: 36px;
				text-align: center;
				font-size: 20px;
				color: #fff;
			}
			.search-wrap{
				flex: 1 1 auto;
				display: flex;
				align-items: flex-end;
				margin-left: 10px;
				border-bottom: 1px solid rgba(255,255,255,0.5);
				.target{
					width: calc(~"100% - 36px");
					height: 28px;
					border: none;
					outline: none;
					background: #C62F2F;
					font-size: 16px;
					color: #fff;
					&::placeholder{
						color: rgba(255,255,255,0.5);
					}
				}
				.icon-close{
					width: 30px;
					height: 30px;
					line-height: 30px;
					text-align: center;
					font-size: 20px;
					color: #fff;
				}
			}
		}
		.recommend{
			.singer{
				width: 100%;
				height: 36px;
				border-bottom: 1px solid #ececec;
				display: flex;
				align-items: center;
				justify-content: center;
				.icon-community{
					width: 36px;
					height: 30px;
					font-size: 20px;
					color: #bcbcbc;
					line-height: 30px;
					text-align: center;
				}
				span{
					font-size: 14px;
					color: #555;
				}
				.icon-right{
					width: 20px;
					height: 30px;
					font-size: 16px;
					color: #bebebe;
					line-height: 30px;
					text-align: center;
				}
			}
			.hotsearch{
				margin-top: 20px;
				p{
					box-sizing: border-box;
					padding-left: 10px;
					font-size: 14px;
					color: #777;
				}
				.hot{
					margin-top: 6px;
					box-sizing: border-box;
					padding: 0 5px;
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					span{
						font-size: 14px;
						padding: 6px 10px; 
						margin: 4px 5px;
						border: 1px solid #dedede;
						border-radius: 13px;
					}
				}
			}
			.history{
				margin-top: 20px;
				padding: 0 10px;
				.list{
					height: 36px;
					display: flex;
					align-items: center;
					justify-content: space-between;
					.icon-set-time{
						width: 30px;
						height: 30px;
						font-size: 14px;
						color: #666;
						line-height: 30px;
						text-align: center;
					}
					.list-con{
						flex: 1 1 auto;
						display: flex;
						align-items: center;
						border-bottom: 1px solid #ebebeb;
						span{
							width: calc(~"100% - 30px");
							font-size: 14px;
							color: #333;
						}
						.icon-close{
							width: 30px;
							height: 30px;
							font-size: 14px;
							color: #666;
							line-height: 30px;
							text-align: center;
						}
					}
				}
			}
		}
		.result{
			position: absolute;
			top: 54px;
			left: 18px;
			width: calc(~"100% - 28px");
			height: auto;
			max-height: calc(~"100% - 120px");
			overflow: auto;
			background: #fff;
			box-shadow: 0 0 10px rgba(0,0,0,0.5);
			z-index: 1;
			.searchresult,.resultlist{
				width: 100%;
				height: 36px;
				box-sizing: border-box;
				padding: 0 10px;
				border-bottom: 1px solid #ebebeb;
				font-size: 14px;
			}
			.searchresult{
				color: #6074df;
				line-height: 36px;
			}
			.resultlist{
				display: flex;
				align-items: center;
				.icon-search{
					width: 20px;
					height: 30px;
					line-height: 30px;
					text-align: left;
					color: #aaa;
				}
				span{
					color: #666;
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow:hidden;
					flex: 1 1 auto;
					height: 36px;
					line-height: 36px;
				}
			}
		}
	}
</style>