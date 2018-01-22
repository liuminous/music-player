<template>
	<transition name="downRight">
		<div class="highqualitysheet" v-show="isShow" ref="sheetlists">
			<div class="highqualityheader">
				<i class="icon-back" @click="hideHighqualitySheet"></i>
				<p>精品歌单·全部</p>
				<span>筛选</span>
			</div>

			<div class="sheetlists" @touchstart="TouchStart($event)" @touchmove="TouchMove($event)" @touchend="TouchEnd($event)">
				<div class="list" v-for="item in highqualitySheet" @click="showSongSheet(item.id)">
					<div class="coverImg">
						<img :src="item.coverImgUrl">
						<div class="mask"></div>
						<span class="playcount"><i class="icon-erji"></i>&nbsp;{{playCount(item.playCount)}}</span>
					</div>
					<div class="sheetInfo">
						<p class="title">{{item.name}}</p>
						<p class="creator">by {{item.creator.nickname}}</p>
						<p class="description"><span>{{item.tag}}</span>{{item.copywriter}}</p>
					</div>
				</div>
				<div class="load-wrap" ref="sheet">
					<div class="loading" v-if="isShowLoading">
						<div class="load">
							<div class="child"></div>
							<div class="child"></div>
						</div>
					</div>
				</div>
			</div>
			
			<bottom-bar></bottom-bar>
		</div>
	</transition>
</template>

<script>
 	import Vue from 'vue'
 	import axios from 'axios'
 	import Vueaxios from 'vue-axios'
	import bottombar from './bottombar.vue'
	import store from '../store'

	Vue.use(Vueaxios,axios);
	export default{
		data(){
			return{
				page: 1,
				limit: 10,
				isShowLoading: false,
				loading: true,
				height: 0,
				maxY: 40,
				startY: 0,
				curY: 0,
				moveY: 0,
				touchScrollTop: 0,
				direction: 'up'
			}
		},
		computed:{
			isShow(){
				return store.getters.getShowHighqualitySheet
			},
			highqualitySheet(){
					return store.getters.getHighqualitySheet
				}
		},
		methods:{
				hideHighqualitySheet(){
					store.dispatch('set_showhighqualitysheet',false),
					this.$refs.sheetlists.scrollTop = 0
				},
				//听歌数量
				playCount(num){
					return num > 200000 ? Math.floor(num / 10000)+'万' : num 
				},
				//显示歌单的歌曲列表
				showSongSheet(id){
					axios.get('/api/playlist/detail?id='+id).then((res) => {
				  		store.dispatch('music_songsheet',res.data)
				  	},(err) => {
				  		console.log(err)
				  	}),
				  	store.commit({
				  		type: 'setShowSongSheet',
				  		isShow: true
				  	})
				},
				TouchStart(event){
					let e = event || window.event;
					this.startY = e.touches[0].pageY,
					this.touchScrollTop = e.currentTarget.scrollTop
				},
				TouchMove(event){
					let e = event || window.event;
					this.curY = e.touches[0].pageY,
					this.moveY = this.curY - this.startY
					var absmoveY = Math.abs(this.moveY)
					// if(this.moveY > 0){
					// 	this.direction = 'up'
					// 	this.isShowLoading = true
					// 	if(this.moveY <= this.maxY){
					// 		this.height = this.moveY
					// 	}else if(this.maxY < this.moveY <= this.maxY*1.2){
					// 		this.height = this.maxY+(this.moveY - this.maxY)*0.1
					// 	}else{
					// 		this.height =this.maxY+this.maxY*0.1+(this.movY - this.maxY*1.2)*0.02
					// 	}
					// 	this.$refs.sheet.style.height = this.height+"px"
					// 	this.$refs.sheet.style.transition = "height 0s"
					// }else 
					if(this.moveY < 0 && e.currentTarget.scrollTop + e.currentTarget.offsetHeight >= e.currentTarget.scrollHeight && this.page*10 <= 100){
						if(absmoveY <= this.maxY){
							this.height = absmoveY
						}else if(this.maxY < absmoveY <= this.maxY*1.2){
							this.height = this.maxY+(absmoveY - this.maxY)*0.1
							this.isShowLoading = true
						}else{
							this.height =this.maxY+this.maxY*0.1+(absmovY - this.maxY*1.2)*0.02
							this.isShowLoading = true
						}
						this.$refs.sheet.style.height = this.height+"px"
						this.$refs.sheet.style.transition = "height 0s"
					}	
				},
				TouchEnd(event){
					let e = event || window.event;
					
					if(this.moveY < 0 && e.currentTarget.scrollTop + e.currentTarget.offsetHeight >= e.currentTarget.scrollHeight && this.page*10 <= 100){
						this.moveY = 0
						this.$refs.sheet.style.height = 0
						this.$refs.sheet.style.transition = "height 0.3s"
						if(this.loading){
							this.page++
							this.loading = false
							axios.get('/api/top/playlist/highquality?limit='+this.page*10).then((res) =>{
								store.dispatch('set_highqualitysheet',res.data),
								this.isShowLoading = false
								if(res.data.code == 200){
									this.loading = true
								}
							}).catch((err) => {
								console.log(err)
							})
						}
					}
				}
		},
		components: {
			'bottom-bar':bottombar
		}
	}
</script>

<style lang="less">
	.highqualitysheet{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #fff;
		z-index: 5;
		overflow: auto;
		&.downRight-enter-active,&.downRight-leave-active{
			transition: transform cubic-bezier(.13, .51, .56, 1.09) 0.5s;
		}
		&.downRight-enter{
			transform: translate3d(0,-100%,0);
		}
		&.downRight-leave-active{
			transform: translate3d(100%,0,0);
		}
		.highqualityheader{
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			height: 50px;
			z-index: 6;
			background: #C62F2F;
			box-sizing: border-box;
			padding: 0 10px;
			display: flex;
			align-items: center;
			color: #fff;
			i{
				width: 36px;
				height: 36px;
				font-size: 20px;
				text-align: center;
				line-height: 36px;
			}
			p{
				flex: 1 1 auto;
				font-size: 18px;
				margin-left: 5px;
			}
			span{
				width: 42px;
				height: 43px;
				text-align:center;
				line-height: 42px;
				font-size: 16px;
			}
		}
		.sheetlists{
			.load-wrap{
				height: 0;
				overflow: hidden;
				.loading{
					width: 30px;
					height: 30px;
					overflow: hidden;
					margin: 10px auto;
					-webkit-mask: radial-gradient(transparent 10px,#000 11px);
					animation: rotate 1s linear infinite;
					.load{
						width: 30px;
						height: 30px;
						position:relative;
						.child{
							width: 30px;
							height: 30px;
							position: absolute;
							clip: rect(0,30px,30px,15px);
							&::after{
								content: '';
								position: absolute;
								top: 0;
								left: 0;
								width: 30px;
								height: 30px;
								border-radius: 50%;
								transform: rotate(180deg);
								clip: rect(0,15px,30px,0);
							}
							&:nth-of-type(1){
								transform: rotate(0);
								&::after{
									background: linear-gradient(to top,rgba(198,47,47,1),rgba(198,47,47,0.7));
									}
							}
							&:nth-of-type(2){
								transform: rotate(180deg);
								&::after{
									background: linear-gradient(to top,rgba(198,47,47,0.7),rgba(198,47,47,0));
								}
							}
						}
					}
				}
			}
			padding: 50px 0 46px;
			.list{
				width: 100%;
				height:26vw;
				display: flex;
				align-items: center;
				margin-top: 4px;
				.coverImg{
					width: 26vw;
					height:26vw;
					flex: 0 0 auto;
					position: relative;
					img{
						width: 100%;
					}
					.mask{
						position: absolute;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
						z-index: 1;
						background: linear-gradient(to bottom,rgba(0,0,0,.3),rgba(0,0,0,0) 50%,rgba(0,0,0,.3));
					}
					.playcount{
						position: absolute;
						top: 0;
						right: 0;
						padding: 4px 6px;
						font-size: 12px;
						color: #fff;
						z-index: 2;
					}
				}
				.sheetInfo{
					flex: 1 1 auto;
					box-sizing: border-box;
					padding: 0 15px;
					height: 100%;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					.title{
						font-size: 16px;
						color: #333;
					}
					.creator{
						font-size: 12px;
						color: #666;
					}
					.description{
						font-size: 12px;
						color: #666;
						span{
							color: #C62F2F;
							border: 1px solid #C62F2F;
							transform: scale(0.8);
							padding: 2px 4px;
							display: inline-block;
						}
					}
				}
			}
		}
	}
		@keyframes rotate{
		0%{
					transform: rotate(360deg);
				}
				50%{
					transform: rotate(180deg);
				}
				100%{
					transform: rotate(0deg);
				}
	}
</style>