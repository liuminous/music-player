<template>
	<transition name="UpRight">
		<div class="musicdetail" v-show="isShowDetail">
			<div class="filterbg" :style="{backgroundImage:'url('+musicPic+')'}"></div>
			<div class="detail-content">
				<!-- 歌曲信息 -->
				<div class="detail-headr">
					<i class="icon-back" @click="hiddenMusicDetail"></i>
					<div class="detail-info" v-if="musicDetailType">
						<p class="music-name">{{musicName}}</p>
						<p class="music-singer">{{musicSinger}}</p>
					</div>
					<div class="detail-title" v-if="!musicDetailType">
						<i class="icon-fm"></i>
						<p class="fm">私人FM</p>
					</div>
					<i class="icon-share"v-if="musicDetailType"></i>
					<i class="icon-list-circle-small" v-if="!musicDetailType"></i>
				</div>
				<!-- 音乐cd光盘 -->
				<transition name="Cd">
					<!-- 非私人FM -->
					<div class="detail-conent" v-if="musicDetailType" v-show="isShow" @click="toggleCd">
						<div class="cd">
							<div class="line">
								<div class="triger" :class="isPlay ? '' : 'pause'"></div>
							</div>
							<div class="cd-wrapper" ref="cdwrapper">
								<div class="cd-content" ref="cd" :class="isPlayPause ? 'animate' : ''">
									<div class="underpan"></div>
									<img class="musicpic" :src="musicPic">
								</div>
							</div>
						</div>
						<div class="function">
							<i class="icon-like"></i>
							<i class="icon-download"></i>
							<i class="icon-msg"></i>
							<i class="icon-list-circle-small"></i>
						</div>
					</div>
					<!-- 私人FM -->
					<div class="detail-fm" v-if="!musicDetailType" v-show="isShow" @click="toggleCd">
						<div class="musicpic-wrap"><img class="musicpic" :src="musicPic"></div>
						<div class="fm-info">
							<p class="name">{{musicName}}</p>
							<p class="singer">{{musicSinger}}</p>
						</div>
					</div>
				</transition>
				<!-- 歌词 -->
				<transition name="Lrc">
					<div class="lyric" v-show="!isShow" @click="toggleCd">
						<div class="volume">
							<i class="icon-volume-medium"></i>
							<div class="range" ref="range" @click="onclick">
								<span class="volume-current" ref="volume"></span>
								<span class="volume-tag" ref="ball" @touchstart.stop="mouseDown" @touchmove.stop="touchMove($event)" @touchend="touchEnd"></span>
							</div>
						</div>
						<div class="lrc-wrapper" ref="lrc">
							<div class="lrc">
								<p v-for="(lrc,index) in lyric" :class="lrcIndex==index ? 'active musiclrc':'musiclrc'">{{lrc}}</p>
							</div>
						</div>
					</div>
				</transition>
				<!-- 音乐播放控制 -->
				<div class="detail-footer">
					<div class="progress">
						<span class="playtime">{{musicCurrTime}}</span>
						<div class="progressbar" ref="progress">
							<span class="playprogress" ref="playtime"></span>
							<span class="tag" ref="tag" @touchstart.stop="mouseDown" @touchmove.stop="musicprogress" @touchend="controlplay"></span>
						</div>
						<span class="duration">{{musicDuration}}</span>
					</div>
					<div class="controls">
						<!-- 非私人FM 播放类型 -->
						<i class="playmode" v-if="musicDetailType" :class="iconClass" @click="playType"></i>
						<!-- 私人FM 删除 -->
						<i class="icon-delete" v-if="!musicDetailType"></i>
						<!-- 非私人FM 上一首 -->
						<i class="prev icon-prevdetail" v-if="musicDetailType" @click="playPrev"></i>
						<!-- 私人FM 收藏为喜欢的歌曲 -->
						<i class="icon-like" v-if="!musicDetailType" @click="isLike(musicId)" :class="islike ? 'active' : ''"></i>
						<i class="playpause icon-playdetail" :class="isPlayPause ? 'icon-pause-detail' : 'icon-playdetail'" @click="playpause"></i>
						<i class="next icon-nextdetail" @click="playNext"></i>
						<!-- 非私人FM 菜单 -->
						<i class="menu icon-list-music" v-if="musicDetailType" @click="showMenuList"></i>
						<!-- 私人FM  -->
						<i class="icon-msg" v-if="!musicDetailType"></i>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>	
	import Vue from 'vue';
	import axios from 'axios';
	import Vueaxios from 'vue-axios';
	import store from '../store';
 	
 	Vue.use(Vueaxios,axios);

 	let canDrag = false;
 	let volumeWidth = 1;
 	let progressWidth = 0;
	export default {
		data(){
			return{
				isPlay: false,
				isShow: true
			}
		},
		computed: {
			//是否显示歌曲详情页
			isShowDetail(){
				return store.getters.getShowMusicDetail
			},
			musicDetailType(){
				return store.getters.getMusicDetailType
			},
			//获取当前正在播放音乐的歌名
			musicName(){
				// if(store.getters.getMusicDetailType){
				// 	return store.getters.getCurrentMusic ? store.getters.getCurrentMusic.name : ''
				// }else{
				// 	return store.getters.getFmCurrentMusic ? store.getters.getFmCurrentMusic.name : ''
				// }
				
				return store.getters.getMusicDetailType ? (store.getters.getCurrentMusic ? store.getters.getCurrentMusic.name : '') : (store.getters.getFmCurrentMusic ? store.getters.getFmCurrentMusic.name : '')
			},
			//获取歌手
			musicSinger(){
				//是否是非私人FM  是否是每日推荐 if： 好理解
				// if(store.getters.getMusicDetailType){

				// 	if(store.getters.getCurrentMusic){
				// 		return store.getters.getCurrentMusic.ar ? store.getters.getCurrentMusic.ar[0].name : store.getters.getCurrentMusic.artists[0].name
				// 	}
				// }else{
				// 	return store.getters.getFmCurrentMusic ? store.getters.getFmCurrentMusic.artists[0].name : ''
				// }

				//三元嵌套格式
				return store.getters.getMusicDetailType ? (store.getters.getCurrentMusic ? (store.getters.getCurrentMusic.ar ? store.getters.getCurrentMusic.ar[0].name : store.getters.getCurrentMusic.artists[0].name) : '') : (store.getters.getFmCurrentMusic ? store.getters.getFmCurrentMusic.artists[0].name : '')
			},
			//获取歌曲的图片
			musicPic(){
				// if(store.getters.getMusicDetailType){

				// 	if(store.getters.getCurrentMusic){
				// 		return store.getters.getCurrentMusic.al ? store.getters.getCurrentMusic.al.picUrl : store.getters.getCurrentMusic.album.picUrl
				// 	}
					
				// }else{
				// 	return store.getters.getFmCurrentMusic ? store.getters.getFmCurrentMusic.album.picUrl : ''
				// }

				return store.getters.getMusicDetailType ? (store.getters.getCurrentMusic ? (store.getters.getCurrentMusic.al ? store.getters.getCurrentMusic.al.picUrl : store.getters.getCurrentMusic.album.picUrl) : '') : (store.getters.getFmCurrentMusic ? store.getters.getFmCurrentMusic.album.picUrl : '')
			},
			//获取歌曲总时长
			musicDuration(){
				let total = store.getters.getDuration;
				let minutes = Math.floor(total / 60);
				let seconds = Math.floor(total % 60);
				if(minutes < 10){
					minutes = '0'+minutes
				}
				if(seconds < 10){
					seconds = '0'+seconds
				}
				return minutes+':'+seconds
			},
			//获取当前的播放时长
			musicCurrTime(){
				let total = store.getters.getCurrentTime;
				let minutes = Math.floor(total / 60);
				let seconds = Math.floor(total % 60);
				if(minutes < 10){
					minutes = '0'+minutes
				}
				if(seconds < 10){
					seconds = '0'+seconds
				}
				return minutes+':'+seconds
			},
			//播放与暂停
			isPlayPause(){
				//用于监听，控制cd转盘的旋转
				this.isPlay = store.getters.getPlaying;
				return store.getters.getPlaying
			},
			//当前歌词的id
			musicId(){
				// if(store.getters.getMusicDetailType){
				// 	return store.getters.getCurrentMusic ? store.getters.getCurrentMusic.id : ''
				// }else{
				// 	return store.getters.getFmCurrentMusic ? store.getters.getFmCurrentMusic.id : store.getters.getCurrentMusic.id
				// }

				return store.getters.getMusicDetailType ? (store.getters.getCurrentMusic ? store.getters.getCurrentMusic.id : '') : (store.getters.getFmCurrentMusic ? store.getters.getFmCurrentMusic.id : store.getters.getCurrentMusic.id)
			},
			//获取歌词信息
			lyric(){
				return store.getters.getLyric		
			},
			//获取当前歌词的行数
			lrcIndex(){
				return store.getters.getLrcIndex
			},
			//设置播放类型的icon
			iconClass(){
				let type = store.getters.getPlayType;
				switch(type){
					case 1: 
						return "icon-music-danqu1";
						break;
					case 2: 
						return "icon-music-shunxu";
						break;
					case 3:
						return "icon-music-random";
						break;
				}
			},
			//私人fm音乐的喜欢状态
			islike(){
				return store.getters.getIsLike
			}
		},
		methods: {
			//控制详情页的显示与隐藏
			hiddenMusicDetail(){
				store.commit('setShowMusicDetail',false)
			},
			//显示cd转盘
			toggleCd(){
				this.isShow = !this.isShow
			},
			//控制播放与暂停
			playpause(){
				store.commit('togglePlay');
			},
			//显示播放菜单
			showMenuList(){
				store.commit('setMusicList',true)
			},
			//移动圆点控制音量
			mouseDown(){
				canDrag = true
			},
			touchMove(event){
				if(canDrag){
					let e = event || window.event;				
					let rangeLeft = this.$refs.range.offsetLeft;
					let rangeWidth = this.$refs.range.offsetWidth;
					volumeWidth = Math.floor(((e.touches[0].pageX - rangeLeft)/rangeWidth)*100);
					volumeWidth = volumeWidth < 0 ? 0 : volumeWidth;
					volumeWidth = volumeWidth > 100 ? 100 : volumeWidth;
					store.getters.getAudioElement.volume = volumeWidth/100;
					//音量进度条
					this.$refs.volume.style.width = volumeWidth+'%'; 
					//小球位置
					this.$refs.ball.style.left = volumeWidth+'%';
				}
			},
			touchEnd(){
				store.getters.getAudioElement.volume = volumeWidth/100;
			},
			//点击音量条控制音量
			onclick(event){
				let e = event || window.event;
				let rangeLeft = this.$refs.range.offsetLeft;
				let rangeWidth = this.$refs.range.offsetWidth;
				progressWidth = Math.floor(((e.pageX - rangeLeft)/rangeWidth)*100);
				progressWidth = progressWidth < 0 ? 0 : progressWidth;
				progressWidth = progressWidth > 100 ? 100 : progressWidth;
				store.getters.getAudioElement.volume = progressWidth/100;
				//音量进度条
				this.$refs.volume.style.width = progressWidth+'%'; 
				//小球位置
				this.$refs.ball.style.left = progressWidth+'%';
			},
			//音乐播放进度条控制
			musicprogress(){
				if(canDrag){
					let e = event || window.event;				
					let progressLeft = this.$refs.progress.offsetLeft;
					let durationWidth = this.$refs.progress.offsetWidth;
					progressWidth = Math.floor(((e.touches[0].pageX - progressLeft)/durationWidth)*100);
					progressWidth = progressWidth < 0 ? 0 : progressWidth;
					progressWidth = progressWidth > 100 ? 100 : progressWidth;

					//音量进度条
					this.$refs.playtime.style.width = progressWidth+'%'; 
					//小球位置
					this.$refs.tag.style.left = progressWidth+'%';
				}
			},
			controlplay(){
				store.getters.getAudioElement.currentTime = (progressWidth/100)*store.getters.getAudioElement.duration;
			},
			//切换播放类型
			playType(){
				let type = store.getters.getPlayType;
				store.commit('setPlayType',type)
			},
			//播放下一首歌曲
			playNext(){
				store.dispatch('set_playnext')
			},
			//播放上一首歌曲
			playPrev(){
				store.dispatch('set_playprev')
			},
			isLike(id){
				store.dispatch('set_islike',id)
			}
		},
		watch:{
			//监听musicId是否需要更换歌词
			musicId(newId,oldId){
				axios.get('/api/lyric?id='+newId).then((res) => {
			  		store.dispatch('set_lyric',res.data)
			  	}).catch((err) => {
			  		console.log(err)
			  	}),
			  	store.dispatch('set_personallike',false)
			  	// store.getters.getMyLoveMusic.trackIds.forEach((item) => {
			  	// 	if(item.id == newId){
			  	// 		store.dispatch('set_personallike',true)
			  	// 	}
			  	// })
			},
			//cd转盘的动画控制
			isPlay(newPlay,oldPlay){
				//暂停时重新设置外层的旋转角度：原本的transform+内层的transform
				if(newPlay !== true && store.getters.getMusicDetailType){
					//外层的旋转角度
					let wrapperTrans = getComputedStyle(this.$refs.cdwrapper).transform;
					//内层的旋转角度
					let cdTrans = getComputedStyle(this.$refs.cd).transform;
					// console.log(cdTrans.concat('', wrapperTrans));
					this.$refs.cdwrapper.style.transform = wrapperTrans === 'none' ?cdTrans : cdTrans.concat('', wrapperTrans);
				}
			},
			//进度条
			musicCurrTime(newtime,oldtime){
				let rad = store.getters.getCurrentTime /store.getters.getDuration;
				this.$refs.playtime.style.width = (rad*100).toFixed(2)+'%';
				this.$refs.tag.style.left = (rad*100).toFixed(2)+'%';
				// console.log(store.getters.getCurrentTime);
				let currtime = store.getters.getCurrentTime;
				
			},
			//歌词同步
			lrcIndex(newIndex,oldIndex){
				let aP = document.getElementsByClassName('musiclrc');

				//清除样式
				for(let i = 0;i<aP.length;i++){
					aP[i].className="musiclrc"
				}
				
				//正在播放的歌词移到歌词容器中间并高亮显示
				if (aP[newIndex]) {
					let height = this.$refs.lrc.offsetHeight
					let top = aP[newIndex].offsetTop
					this.$refs.lrc.scrollTop=top-height/2
					aP[newIndex].className="musiclrc active"
				}
			}
		}
	}
</script>

<style lang="less">
	@keyframes goRotate{
		0% {
			transform: rotate(0)
		}
		50%{
			transform: rotate(180deg)
		}
		100%{
			transform: rotate(360deg)
		}
	}

	.musicdetail{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 10;
		background: #aaa;
		&.UpRight-enter-active,&.UpRight-leave-active{
			transition: transform 0.7s;
		}
		&.UpRight-enter{
			transform: translate3d(0,100%,0);
		}
		&.UpRight-leave-active{
			transform: translate3d(100%,0,0);
		}
		.filterbg{
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			-webkit-filter: blur(30px);
			filter: blur(30px);
		}
		.detail-content{
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: rgba(0,0,0,.15);
			.detail-headr{
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 56px;
				box-sizing: border-box;
				display: flex;
				padding: 10px 0 5px;
				i{
					width: 50px;
					height: 51px;
					font-size: 24px;
					color: #fff;
					line-height: 45px;
					text-align: center;
					flex: 0 0 auto;
					&.icon-share{
						font-size: 32px;
					}
				}
				.detail-info{
					flex: 1 1 auto;
					color: #fff;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					.music-name{
						font-size: 14px;
					}
					.music-singer{
						font-size: 12px;
						color: rgba(255,255,255,.5);
					}
				}
				.detail-title{
					flex: 1 1 auto;
					color: #fff;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					text-align: center;
					.icon-fm{
						width: 100%;
						height: 28px;
						font-size: 28px;
						line-height: 28px;
						text-align: center;
					}	
					.fm{
						font-size: 12px;
					}
				}
			}
			.detail-conent{
				width: 100%;
				position: absolute;
				top: 56px;
				left: 0;
				right: 0;
				bottom: 100px;
				overflow: hidden;
				&.Cd-enter-active,&.Cd-leave-active{
					transition: opacity 1s;
				}
				&.Cd-enter,&.Cd-leave-active{
					opacity: 0;
				}
				.cd{
					.line{
						position: relative;
						width: 80%;
						height: 1px;
						margin: 0 auto;
						background-image: linear-gradient(to left,rgba(255,255,255,0),rgba(255,255,255,0.75),rgba(255,255,255,0));
						.triger{
							width: 90px;
							height: 140px;
							background: url('../assets/images/swith.png');
							background-size: 100% 100%;
							position: absolute;
							top: -15px;
							left: 50%;
							z-index: 1;
							transform: translate3d(-20%,0,0);
							transform-origin: 14px 16px;
							transition: all 0.5s;
							&.pause{
								transform: translate3d(-20%,0,0) rotateZ(-20deg);
							}
						}
					}
					.cd-wrapper{
						width: 44vh;
						height: 44vh;
						margin: 70px auto 0;
						position: relative;
						.cd-content{
							&.animate{
								animation: goRotate 4s linear infinite 0.1s;
							}
						}
						.underpan{
							width: 44vh;
							height: 44vh;
							background-image: url('../assets/images/cd-mine.png');
							background-size: 100% 100%;
						}
						img{
							width: 28vh;
							height: 28vh;
							border-radius: 50%;
							position: absolute;
							top:50%;
							left: 50%;
							transform: translate3d(-50%,-50%,0);
						}
					}
				}
				.function{
					width: 70%;
					margin: 20px auto 0;
					display: flex;
					justify-content: space-between;
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translate3d(-50%,0,0);
					i{
						flex: 0 0 auto;
						width: 40px;
						height: 40px;
						font-size: 20px;
						color: #fff;
						line-height: 40px;
						text-align: center;
					}
				}
			}
			.detail-fm{
				width: 100%;
				position: absolute;
				top: 64px;
				left: 0;
				right: 0;
				bottom: 100px;
				&.Cd-enter-active,&.Cd-leave-active{
					transition: opacity 1s;
				}
				&.Cd-enter,&.Cd-leave-active{
					opacity: 0;
				}
				.musicpic-wrap{
					padding-top: 3vh;
					width: 54vh;
					height: 54vh;
					margin: 0 auto;
					.musicpic{
						width: 54vh;
						height: 54vh;
					}
				}
				.fm-info{
					width: 100%;
					position: absolute;
					bottom: 2vh;
					p{
						text-align:center;
						line-height: 26px;
						&.name{
							color: #fff;
							font-size: 18px;
						}
						&.singer{
							color: rgba(255,255,255,0.6);
							font-size: 14px;
						}
					}
				}
			}
			.lyric{
				position: absolute;
				top: 56px;
				left: 0;
				right: 0;
				bottom: 100px;
				overflow: hidden;
				&.Lrc-enter-active,&.Lrc-leave-active{
					transition: opacity 1s;
				}
				&.Lrc-enter,&.Lrc-leave-active{
					opacity: 0
				}
				.volume{
					width: 80%;
					height: 30px;
					margin: 0 auto;
					display: flex;
					align-items: center;
					i{
						width: 40px;
						height: 30px;
						font-size: 16px;
						color: #fff;
						line-height: 30px;
						text-align: center;
					}
					.range{
						flex: 1 1 auto;
						height: 2px;
						background: rgba(255,255,255,0.3);
						border-radius: 2px;
						position: relative;
						.volume-current{
							width: 100%;
							height: 2px;
							background: #fff;
							border-radius: 2px;
							position: absolute;
						}
						.volume-tag{
							width: 10px;
							height: 10px;
							margin-top: -4px;
							margin-left: -4px;
							border-radius: 50%;
							background:#fff;
							position: absolute;
							top: 0;
							left: 100%;
						}
					}
				}
				.lrc-wrapper{
					height:calc(~"100% - 30px");
					overflow-y: scroll;
					.lrc{
						padding: 50% 5%;
						p{
							font-size: 14px;
							color: rgba(255,255,255,.5);
							line-height: 28px;
							text-align: center;
							&.active{
								font-size: 16px;
								color: #fff;
							}
						}
					}
				}
			}
			.detail-footer{
				width: 100%;
				position: absolute;
				bottom: 0;
				left: 0;
				height: 90px;
				.progress{
					width: 84%;
					height: 30px;
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin: 0 auto;
					.playtime,.duration{
						font-size: 12px;
						
					}
					.playtime{
						color: rgba(255,255,255,1);
					}
					.duration{
						color: rgba(255,255,255,0.6);
					}
					.progressbar{
						flex: 1 1 auto;
						height: 2px;
						background: rgba(255,255,255,0.4);
						margin: 0 10px;
						border-radius: 2px;
						position: relative;
						.playprogress{
							width: 0;
							height: 2px;
							border-radius: 2px;
							background: #c62f2f;
							position: absolute;
							top: 0;
							left: 0;
						}
						.tag{
							width: 16px;
							height: 16px;
							background: rgba(255,255,255,.9);
							border-radius: 50%;
							margin-top: -7px;
							margin-left: -8px;
							position: absolute;
							top: 0;
							left: 0;
						}
					}
				}
				.controls{
					width: 100%;
					height: 60px;
					display: flex;
					align-items: center;
					justify-content: space-around;
					i{
						width: 80px;
						height: 60px;
						font-size: 32px;
						color: #fff;
						line-height: 60px;
						text-align: center;
						&.playmode{
							color: rgba(255,255,255,.7);
						}
						&.icon-delete{
							font-size: 26px;
							color: rgba(255,255,255,.7);
						}
						&.icon-like{
							font-size: 24px;
							color: rgba(255,255,255,.6);
							&.active{
								color: #C62F2F;
							}
						}
						&.icon-music-danqu1{
							font-size: 22px;
						}
						&.icon-music-shunxu{
							font-size: 24px;
						}
						&.icon-music-random{
							font-size: 27px;
						}
						&.playpause{
							font-size: 40px;
						}
						&.menu{
							font-size: 24px;
							color: rgba(255,255,255,.7);
						}
						&.icon-msg{
							font-size: 24px;
							color: rgba(255,255,255,.7);
						}
					}
				}
			}
		}
	}
</style>