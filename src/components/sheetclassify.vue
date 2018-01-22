<template>
	<transition name="leftRight">
		<div class="classify" v-show="isShow" ref="classify">
			<div class="classifyheader">
				<i class="icon-back" @click="hideSheetClassify"></i>
				<p>选择分类</p>
			</div>
			<div class="allclassify">
				<div class="all_wrap">
					<div class="allclassifysheet" :class="sheetClassify == '全部歌单' ? 'active' : ''" >
						<p @click="choose($event)">全部歌单</p>
						<span class="triangle"></span>
						<span class="right"></span>
					</div>
				</div>
				<table>
					<tr>
						<td class="style" rowspan="2">
							<i class="icon-sphere"></i>
							<h4>语种</h4>
						</td>
						<td class="borderLeft borderBot" :class="sheetClassify == '华语' ? 'active' : ''">
							<strong><span>HOT</span></strong>
							<p @click="choose($event)">华语</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
						<td class="borderLeft borderBot" :class="sheetClassify == '欧美' ? 'active' : ''">
							<p @click="choose($event)">欧美</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
						<td class="borderLeft borderBot" :class="sheetClassify == '日语' ? 'active' : ''">
							<p @click="choose($event)">日语</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
					</tr>
					<tr>
						<td class="borderLeft" :class="sheetClassify == '韩语' ? 'active' : ''">
							<p @click="choose($event)">韩语</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
						<td class="borderLeft" :class="sheetClassify == '粤语' ? 'active' : ''">
							<p @click="choose($event)">粤语</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
						<td class="borderLeft" :class="sheetClassify == '小语种' ? 'active' : ''">
							<p @click="choose($event)">小语种</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
					</tr>
				</table>
				<table>
					<tr>
						<td class="style borderBot" rowspan="2">
							<i class="icon-gift"></i>
							<h4>风格</h4>
						</td>
						<td class="borderLeft borderBot" :class="sheetClassify == '流行' ? 'active' : ''">
							<strong><span>HOT</span></strong>
							<p @click="choose($event)">流行</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
						<td class="borderLeft borderBot" :class="sheetClassify == '摇滚' ? 'active' : ''">
							<strong><span>HOT</span></strong>
							<p @click="choose($event)">摇滚</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
						<td class="borderLeft borderBot" :class="sheetClassify == '民谣' ? 'active' : ''">
							<strong><span>HOT</span></strong>
							<p @click="choose($event)">民谣</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
					</tr>
					<tr>
						<td class="borderLeft borderBot" :class="sheetClassify == '电子' ? 'active' : ''">
							<strong><span>HOT</span></strong>
							<p @click="choose($event)">电子</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
						<td class="borderLeft borderBot" :class="sheetClassify == '舞曲' ? 'active' : ''">
							<p @click="choose($event)">舞曲</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
						<td class="borderLeft borderBot" :class="sheetClassify == '说唱' ? 'active' : ''">
							<p @click="choose($event)">说唱</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
					</tr>
					<tr>
						<td class="borderLeft borderBot" :class="sheetClassify == '轻音乐' ? 'active' : ''">
							<strong><span>HOT</span></strong>
							<p @click="choose($event)">轻音乐</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
						<td class="borderLeft borderBot" :class="sheetClassify == '爵士' ? 'active' : ''">
							<p @click="choose($event)">爵士</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
						<td class="borderLeft borderBot" :class="sheetClassify == '乡村' ? 'active' : ''">
							<p @click="choose($event)">乡村</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
						<td class="borderLeft borderBot" :class="sheetClassify == 'R&B/Soul' ? 'active' : ''">
							<p @click="choose($event)">R&B/Soul</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
					</tr>
					<tr>
						<td class="borderLeft borderBot" :class="sheetClassify == '古典' ? 'active' : ''">
							<p @click="choose($event)">古典</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
						<td class="borderLeft borderBot" :class="sheetClassify == '民族' ? 'active' : ''">
							<p @click="choose($event)">民族</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
						<td class="borderLeft borderBot" :class="sheetClassify == '英伦' ? 'active' : ''">
							<p @click="choose($event)">英伦</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
						<td class="borderLeft borderBot" :class="sheetClassify == '金属' ? 'active' : ''">
							<p @click="choose($event)">金属</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
					</tr>
					<tr>
						<td class="borderLeft borderBot" :class="sheetClassify == '朋克' ? 'active' : ''">
							<p @click="choose($event)">朋克</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
						<td class="borderLeft borderBot" :class="sheetClassify == '蓝调' ? 'active' : ''">
							<p @click="choose($event)">蓝调</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
						<td class="borderLeft borderBot" :class="sheetClassify == '雷鬼' ? 'active' : ''">
							<p @click="choose($event)">雷鬼</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
						<td class="borderLeft borderBot" :class="sheetClassify == '世界快乐' ? 'active' : ''">
							<p @click="choose($event)">世界快乐</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
					</tr>
					<tr>
						<td class="borderLeft borderBot" :class="sheetClassify == '拉丁' ? 'active' : ''">
							<p @click="choose($event)">拉丁</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
						<td class="borderLeft borderBot" :class="sheetClassify == '另类/独立' ? 'active' : ''">
							<p @click="choose($event)">另类/独立</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
						<td class="borderLeft borderBot" :class="sheetClassify == 'New Age' ? 'active' : ''">
							<p @click="choose($event)">New Age</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
						<td class="borderLeft borderBot" :class="sheetClassify == '古风' ? 'active' : ''">
							<p @click="choose($event)">古风</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
					</tr>
					<tr>
						<td class="borderLeft" :class="sheetClassify == '后摇' ? 'active' : ''">
							<p @click="choose($event)">后摇</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
						<td class="borderLeft" :class="sheetClassify == 'Bossa Nova' ? 'active' : ''">
							<p @click="choose($event)">Bossa Nova</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
						<td class="borderLeft"></td>
						<td class="borderLeft"></td>
					</tr>
				</table>
				<table>
					<tr>
						<td class="style borderBot" rowspan="2">
							<i class="icon-coffee"></i>
							<h4>场景</h4>
						</td>
						<td class="borderLeft borderBot" :class="sheetClassify == '清晨' ? 'active' : ''">
							<p @click="choose($event)">清晨</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
						<td class="borderLeft borderBot" :class="sheetClassify == '夜晚' ? 'active' : ''">
							<strong><span>HOT</span></strong>
							<p @click="choose($event)">夜晚</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
						<td class="borderLeft borderBot" :class="sheetClassify == '学习' ? 'active' : ''">
							<strong><span>HOT</span></strong>
							<p @click="choose($event)">学习</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
					</tr>
					<tr>
						<td class="borderLeft borderBot" :class="sheetClassify == '工作' ? 'active' : ''">
							<p @click="choose($event)">工作</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
						<td class="borderLeft borderBot" :class="sheetClassify == '午休' ? 'active' : ''">
							<p @click="choose($event)">午休</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
						<td class="borderLeft borderBot" :class="sheetClassify == '下午茶' ? 'active' : ''">
							<p @click="choose($event)">下午茶</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
					</tr>
					<tr>
						<td class="borderLeft borderBot" :class="sheetClassify == '地铁' ? 'active' : ''">
							<p @click="choose($event)">地铁</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
						<td class="borderLeft borderBot" :class="sheetClassify == '驾车' ? 'active' : ''">
							<p @click="choose($event)">驾车</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
						<td class="borderLeft borderBot" :class="sheetClassify == '运动' ? 'active' : ''">
							<strong><span>HOT</span></strong>
							<p @click="choose($event)">运动</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
						<td class="borderLeft borderBot" :class="sheetClassify == '旅行' ? 'active' : ''">
							<p @click="choose($event)">旅行</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
					</tr>
					<tr>
						<td class="borderLeft" :class="sheetClassify == '散步' ? 'active' : ''">
							<p @click="choose($event)">散步</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
						<td class="borderLeft" :class="sheetClassify == '酒吧' ? 'active' : ''">
							<p @click="choose($event)">酒吧</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
						<td class="borderLeft"></td>
						<td class="borderLeft"></td>
					</tr>
				</table>
				<table>
					<tr>
						<td class="style borderBot" rowspan="2">
							<i class="icon-smile"></i>
							<h4>情感</h4>
						</td>
						<td class="borderLeft borderBot" :class="sheetClassify == '怀旧' ? 'active' : ''">
							<strong><span>HOT</span></strong>
							<p @click="choose($event)">怀旧</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
						<td class="borderLeft borderBot" :class="sheetClassify == '清新' ? 'active' : ''">
							<strong><span>HOT</span></strong>
							<p @click="choose($event)">清新</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
						<td class="borderLeft borderBot" :class="sheetClassify == '浪漫' ? 'active' : ''">
							<p @click="choose($event)">浪漫</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
					</tr>
					<tr>
						<td class="borderLeft borderBot" :class="sheetClassify == '性感' ? 'active' : ''">
							<p @click="choose($event)">性感</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
						<td class="borderLeft borderBot" :class="sheetClassify == '伤感' ? 'active' : ''">
							<p @click="choose($event)">伤感</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
						<td class="borderLeft borderBot" :class="sheetClassify == '治愈' ? 'active' : ''">
							<strong><span>HOT</span></strong>
							<p @click="choose($event)">治愈</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
					</tr>
					<tr>
						<td class="borderLeft borderBot" :class="sheetClassify == '放松' ? 'active' : ''">
							<p @click="choose($event)">放松</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
						<td class="borderLeft borderBot" :class="sheetClassify == '孤独' ? 'active' : ''">
							<p @click="choose($event)">孤独</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
						<td class="borderLeft borderBot" :class="sheetClassify == '感动' ? 'active' : ''">
							<p @click="choose($event)">感动</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
						<td class="borderLeft borderBot" :class="sheetClassify == '兴奋' ? 'active' : ''">
							<p @click="choose($event)">兴奋</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
					</tr>
					<tr>
						<td class="borderLeft" :class="sheetClassify == '快乐' ? 'active' : ''">
							<p @click="choose($event)">快乐</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
						<td class="borderLeft" :class="sheetClassify == '安静' ? 'active' : ''">
							<p @click="choose($event)">安静</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
						<td class="borderLeft" :class="sheetClassify == '思念' ? 'active' : ''">
							<p @click="choose($event)">思念</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
						<td class="borderLeft"></td>
					</tr>
				</table>
				<table>
					<tr>
						<td class="style borderBot" rowspan="2">
							<i class="icon-grid"></i>
							<h4>主题</h4>
						</td>
						<td class="borderLeft borderBot" :class="sheetClassify == '影视原声' ? 'active' : ''">
							<strong><span>HOT</span></strong>
							<p @click="choose($event)">影视原声</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
						<td class="borderLeft borderBot" :class="sheetClassify == 'ACG' ? 'active' : ''">
							<strong><span>HOT</span></strong>
							<p @click="choose($event)">ACG</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
						<td class="borderLeft borderBot" :class="sheetClassify == '校园' ? 'active' : ''">
							<p @click="choose($event)">校园</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
					</tr>
					<tr>
						<td class="borderLeft borderBot" :class="sheetClassify == '游戏' ? 'active' : ''">
							<p @click="choose($event)">游戏</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
						<td class="borderLeft borderBot" :class="sheetClassify == '70后' ? 'active' : ''">
							<p @click="choose($event)">70后</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
						<td class="borderLeft borderBot" :class="sheetClassify == '80后' ? 'active' : ''">
							<p @click="choose($event)">80后</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
					</tr>
					<tr>
						<td class="borderLeft borderBot" :class="sheetClassify == '90后' ? 'active' : ''">
							<p @click="choose($event)">90后</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
						<td class="borderLeft borderBot" :class="sheetClassify == '网络歌曲' ? 'active' : ''">
							<p @click="choose($event)">网络歌曲</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
						<td class="borderLeft borderBot" :class="sheetClassify == 'KTV' ? 'active' : ''">
							<p @click="choose($event)">KTV</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
						<td class="borderLeft borderBot" :class="sheetClassify == '经典' ? 'active' : ''">
							<p @click="choose($event)">经典</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
					</tr>
					<tr>
						<td class="borderLeft" :class="sheetClassify == '翻唱' ? 'active' : ''">
							<p @click="choose($event)">翻唱</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
						<td class="borderLeft" :class="sheetClassify == '吉他' ? 'active' : ''">
							<p @click="choose($event)">吉他</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
						<td class="borderLeft" :class="sheetClassify == '钢琴' ? 'active' : ''">
							<p @click="choose($event)">钢琴</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
						<td class="borderLeft" :class="sheetClassify == '器乐' ? 'active' : ''">
							<p @click="choose($event)">器乐</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
					</tr>
					<tr>
						<td class="borderLeft" :class="sheetClassify == '儿童' ? 'active' : ''">
							<p @click="choose($event)">儿童</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
						<td class="borderLeft" :class="sheetClassify == '榜单' ? 'active' : ''">
							<p @click="choose($event)">榜单</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
						<td class="borderLeft" :class="sheetClassify == '00后' ? 'active' : ''">
							<p @click="choose($event)">00后</p>
							<span class="triangle"></span>
							<span class="right"></span>
						</td>
						<td class="borderLeft"></td>
					</tr>
				</table>
			</div>

			<bottom-bar></bottom-bar>
		</div>
	</transition>
</template>

<script>
import store from '../store'
import bottombar from './bottombar.vue'

export default{
	computed: {
		//是否显示本页
		isShow(){
			return store.getters.getShowSheetClassify
		} ,
		//store中存放的当前歌单类型
		sheetClassify(){
			return store.getters.getSheetClassify
		}
	},
	methods: {
		hideSheetClassify(){
			store.dispatch('set_showsheetclassify',false)
		},
		choose(event){
			store.dispatch('set_showsheetclassify',false);
			let e = event || window.event;
			store.dispatch('set_sheetclassify',e.target.innerText)
			
		}
	},
	components: {
		'bottom-bar': bottombar
	},
	watch: {
		isShow(){
			this.$refs.classify.scrollTop = 0
		}
	}
}
</script>

<style lang="less">
	.classify{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #efefef;
		z-index: 5;
		overflow-y: auto;
		overflow-x: hidden;
		&.leftRight-enter-active,&.leftRight-leave-active{
			transition: transform 0.5s;
		}
		&.leftRight-enter{
			transform: translate3d(-100%,0,0);
		}
		&.leftRight-leave-active{
			transform: translate3d(100%,0,0);
		}
		.classifyheader{
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
		}
		.allclassify{
			width: 100%;
			padding: 50px 0;
			.all_wrap{
				width: 100%;
				padding: 1% 0;
				background: #fff;
				.allclassifysheet{
					width:98%;
					height: 42px;
					margin: 0 auto;
					background: #fff;
					box-sizing: border-box;
					p{
						font-size: 14px;
						color: #333;
						text-align: center;
						line-height:42px;
					}
				}
			}
			table{
				border-spacing: 0;
				width:100%;
				background: #fff;
				margin-top: 2%;
				tr{
					td{
						width: 25vw;
						height: 10vw;
						font-size: 14px;
						text-align: center;
						overflow: hidden;
						position: relative;
						
						&.style{
							color: #acacac;
							i{
								display: block;
								font-size: 28px;
								margin-bottom: 8px;
							}
							h4{
								font-weight: normal;
							}
						}
						strong{
							width: 60%;
							height: 10px;
							background: #C62F2F;
							transform: rotateZ(-45deg) translate(-50%,100%);
							transform-origin: 0% 0%;
							color: #fff;
							font-weight: normal;
							text-align: center;
							line-height: 10px;
							position: absolute;
							top: 0;
							left: 0;
							span{
								display: block;
								transform: scale(0.5);
							}
						}
					}
				}
			}
			.borderLeft{
				border-left: 1px solid #ededed;
			}
			.borderBot{
				border-bottom: 1px solid #ededed;
			}
			.active{
				position: relative;
				border: 1px solid #C62F2F;
				.triangle{
						position: absolute;
						right: 0;
						bottom: 0;
						width: 0;
						height: 0;
						border: 12px solid transparent;
						border-top: 12px solid #C62F2F;
						transform-origin: 100% 100%;
						transform: rotate(-45deg) translate(12px,12px);
					}
					.right{
						width: 4px;
						height: 8px;
						border-right: 1px solid #fff;
						border-bottom: 1px solid #fff; 
						position: absolute;
						bottom: 0;
						right: 0;
						z-index: 2;
						transform: rotate(40deg) translate(-3px,0px);
					}	
			}
		}
	}
</style>