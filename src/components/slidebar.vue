<template>
	<div class="slidebar">
		<!-- 遮罩层 -->
		<transition name="fade">
			<div class="menu-mask" v-show="isAllShow" @click="hideMenu"></div>
		</transition>
		<!-- 侧边栏列表 -->
		<transition name="slide">
			<div class="menu-content" v-show="isAllShow">
				<!-- 用户信息 -->
				<div class="menu-detail" v-if="userInfo.profile" :style="{ backgroundImage: 'url('+userInfo.profile.backgroundUrl+')',backgroundSize: 'contain'}">
					<div class="menu-userInfo">
						<img class="user-pic" src="../assets/images/zore.jpg" width="56" height="56">
						<div class="user-detail">
							<span class="user-name" v-if="userInfo.profile.nickname.length != 0">{{userInfo.profile.nickname}}</span>
							<img class="isvip" src="../assets/images/vip.png">
							<span class="level">Lv.{{userInfo.level}}</span>
						</div>
						<span class="sign"><i class="icon-coin"></i>签到</span>
					</div>
				</div>
				<!-- 列表信息 -->
				<div class="user-list">
					<sidelist iconclass="icon-message" sidetitle="我的消息" disc=""></sidelist>
					<sidelist iconclass="icon-vip" sidetitle="我的会员" disc="2018.9.26到期"></sidelist>
					<sidelist iconclass="icon-market" sidetitle="商城"></sidelist>
					<split background="#f0f0f0" height="5" border="#eee"></split>
					<sidelist iconclass="icon-friend" sidetitle="我的好友"></sidelist>
					<sidelist iconclass="icon-place" sidetitle="附近的人"></sidelist>
					<split background="#f0f0f0" height="5" border="#eee"></split>
					<sidelist iconclass="icon-theme" sidetitle="个性换肤" disc="官方红"></sidelist>
					<sidelist iconclass="icon-set-time" sidetitle="定时播放"></sidelist>
					<sidelist iconclass="icon-lock" sidetitle="音乐闹钟"></sidelist>
					<sidelist iconclass="icon-car" sidetitle="驾驶模式"></sidelist>
					<sidelist iconclass="icon-cloud" sidetitle="音乐云盘"></sidelist>
				</div>
				<!-- 侧边栏底部 -->
				<div class="footer">
					<p class="border-1px"></p>
					<div class="nightmode">
						<i class="icon-night"></i>
						<span>夜间模式</span>
					</div>
					<div class="setting">
						<i class="icon-setting"></i>
						<span>设置</span>
					</div>
					<div class="exit" @click="logout">
						<i class="icon-exit"></i>
						<span>退出</span>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	import store from '../store';
	import sidelist from './sidelist.vue';
	import split from './split.vue';

	export default {
		data(){
			return {
				info : ""
			}
		},
		methods:{
			hideMenu(){
				store.dispatch({
					type: "hideSidebar"
				})
			},
			logout(){	
		      //删除cookie并跳到登录页
		      localStorage.removeItem('phone');
		      localStorage.removeItem('password');
		      this.$router.push('/login');
		      store.dispatch({
					type: "hideSidebar"
				})
			}
		},
		computed: {
			userInfo(){
				return store.getters.getUserInfo
			},
			isAllShow(){
				return store.state.sideBar.isShow
			}
		},
		components: {
			"sidelist": sidelist,
			"split": split
		}
	}
</script>

<style lang="less">
	.slidebar{
		width: 100%;
		height: 100%;
		.menu-mask{
			width: 100%;
			height: 100%;
			position: fixed;
			top: 0;
			left: 0;
			background: rgba(0,0,0,.5);
			opacity: 1;
			z-index: 10;
			&.fade-enter-active,&.fade-leave-active{
				transition: opacity 0.5s;
			}
			&.fade-enter,&.fade-leave-to{
				opacity: 0;
			}
		}
		.menu-content{
			width: 286px;
			height: 100%;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 11;
			background: #fff;
			overflow-y: auto;
			-webkit-overflow-scrolling: touch;
			display: inline;
			&::-webkit-scrollbar{
				display:none;
			} 
			&.slide-enter-active,&.slide-leave-active{
				transition: transform 0.8s;
			}
			&.slide-enter,&.slide-leave-to{
				transform: translate3d(-286px,0,0);
			}
			.menu-userInfo{
				box-sizing: border-box;
				width: 100%;
				height: 168px;
				padding: 50px 15px 15px;
				position: relative;
				background: rgba(0,0,0,.3);
				.user-pic{
					position: absolute;
					bottom: 50px;
					left: 15px;
					border-radius: 50%;
				}
				.user-detail{
					position: absolute;
					bottom: 20px;
					left: 15px;
					color: #fff;
					font-size: 0;
					.user-name{
						display: inline-block;
						font-size: 16px;
						vertical-align: middle;
						max-width: 130px;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
					}
					.isvip{
						width: 14px;
						height: 14px;
						vertical-align: middle;
						margin-left: 6px;
					}
					.level{
						font-size: 8px;
						padding: 1px 4px;
						border: 1px solid #fff;
						border-radius: 8px;
						display: inline-block;
						vertical-align: middle;
						margin-left: 6px;
					}
				}
				.sign{
					display: inline-block;
					height: 14px;
					color: #fff;
					font-size: 14px;
					padding: 4px 8px;
					border: 1px solid #e1e1e1;
					border-radius: 12px;
					position: absolute;
					bottom: 15px;
					right: 15px;
					i{
						line-height: 14px;
						margin-right: 5px;
						vertical-align: top;
					}
				}
			}
			.user-list{
				padding-bottom: 40px;
				display: block;
			}
			.footer{
				position:fixed;
				bottom:0;
				left: 0;
				height:40px;
				width:286px;
				font-size:0;
				background: #fff;
				.border-1px{
					position: absolute;
					width: 100%;
					height: 1px;
					background: #eee;
					top: -1px;
					left: 0;
				}	
				div{
					display:inline-block;
					text-align: center;
					line-height: 40px;
					i{
						font-size: 18px;
						color: #999;
						vertical-align: middle;
						margin-right: 5px;
					}
					span{
						font-size: 16px;
						color: #333;
						vertical-align:middle;
					}
				}
				.nightmode{
					width: 40%;
				}
				.setting,.exit{
					width: 30%;
				}
			}
		}
	}
</style>