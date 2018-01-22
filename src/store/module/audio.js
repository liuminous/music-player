import Vue from 'vue';
import axios from 'axios';
import Vueaxios from 'vue-axios';

Vue.use(Vueaxios,axios);

const audioInfo = {
	state:{
		//loading
		isLoading: false,
		//Info
		Info: {
			phone:() => localStorage.getItem("phone"),
			password: () => localStorage.getItem("password")
		},
		//audio元素
		audioelement: '',
		//audio信息
		audio: {

		},
		//用户全部信息
		userinfo: [],
		//显示搜索页面
		isshowsearch: false,
		//搜索词
		keywords: [],
		//显示搜索结果页
		isshowsearchresult: false,
		//搜索结果
		searchresult: [],
		//搜索历史记录
		searchhistory: {},
		//搜索单曲中的最佳匹配
		bestmatch: {},
		//搜索歌手
		searchsinger: {},
		//用户全部歌单
		musicalllist: [],
		//我喜欢的音乐
		mylovemusic: [],
		//歌单详情
		musicsongsheet: [],
		//需要播放的歌单详情
		playmusicsheet: [],
		//私人fm的歌单详情
		fmplaymusicsheet: [],
		//私人fm的音乐是否添加为喜欢的音乐
		islike: false,
		//是否显示每日推荐歌曲详情页
		showdayrecommend: false,
		//每日推荐的歌曲
		recommendsongs: [],
		//网友精选歌单
		allsheet: [],
		//是否显示网友精选歌单
		isshowallsheet: false,
		//是否显示选择歌单类型页
		isshowsheetclassify: false,
		//选择歌单类型
		sheetclassify: '全部歌单',
		//切换歌单类型时的加载状态
		sheetloading: false,
		//精品歌单
		highqualitysheet: [],
		//是否显示精品歌单
		isshowhighqualitysheet: false,
		//是否读取默认的歌单
		isdefault: true,
		//歌单的显示状态
		showSongSheet: false,
		//是否显示歌单的设置菜单及菜单类型
		showmenu: {},
		//是否显示正在播放音乐歌曲的详情页
		showMusicDetail: false,
		//是否显示音乐列表
		showmenulist: false,
		//是否正在播放
		playing: false,
		//播放类型  1: 循环播放  2: 顺序播放  3: 随机播放
		playtype: 3,
		//歌曲当前的播放时间
		currenttime: 0,
		//当前播放歌曲的总时长
		duration: 0,
		//当前播放音乐的索引值
		currentindex: 0,
		//歌词
		lyric: [],
		//当前歌词的行数
		lrcindex: -1,
		//音乐url
		musicurl: ['../static/media/between.mp3','../static/media/leave.mp3','../static/media/live.mp3','../static/media/city of sky.mp3','../static/media/butterfly.mp3'],
		//轮播图信息
		banner: [],
		//音乐播放详情页  true: 不是私人FM false: 是私人FM
 		musicdetailtype: true,
		//推荐歌单信息
		recommendsheet: [],
		//推荐新音乐
		recommendmusic: [],
		//推荐电台
		recommendstation: [],
		//独家放送
		recommendprivate: [],
		//推荐MV
		recommendvideo: []
	},
	getters: {
		//loading
		getIsLoading: state => state.isLoading,
		//Info
		getInfo: state => state.Info,
		//获取audio元素
		getAudioElement: state => state.audioelement,
		//获取用户全部信息
		getUserInfo: state => state.userinfo,
		//是否显示搜索页面
		getIsShowSearch: state => state.isshowsearch,
		//搜索词
		getKeywords:state => state.keywords,
		//是否显示搜索结果
		getIsShowSearchResult: state => state.isshowsearchresult,
		//获取搜索结果
		getSearchResult: state => state.searchresult,
		//获取搜索历史记录
		getSearchHistory: state => state.searchhistory,
		//搜索单曲中的最佳匹配
		getBestMatch: state => state.bestmatch,
		//搜索歌手
		getSearchSinger: state => state.searchsinger,
		//获取用户全部歌单
		getMusicAllList: state => state.musicalllist,
		//获取我喜欢的音乐
		getMyLoveMusic: state => state.mylovemusic,
		//获取歌单详情
		getMusicSongSheet: state => state.musicsongsheet,
		//获取歌单的显示状态
		getShowSongSheet: state => state.showSongSheet,
		//获取歌单设置菜单的显示状态
		getIsShowMenu: state => state.showmenu.isShow,
		//获取正在播放的音乐列表显示状态
		getIsShowMenuList: state => state.showmenulist,
		//获取歌单的类型
		getMenuType: state => state.showmenu.menuType,
		//获取播放状态
		getPlaying: state => state.playing,
		//获取播放类型
		getPlayType: state => state.playtype,
		//获取歌曲当前的播放时间
		getCurrentTime: state => state.currenttime,
		//获取当前播放歌曲的总时长
		getDuration: state => state.duration,
		//获取是否显示正在播放音乐歌曲的详情页
		getShowMusicDetail: state => state.showMusicDetail,
		//获取歌曲详情
		// getMusicDetail: state => state.musicdetail,
		//测试歌曲地址
		getMusicUrl: state => state.musicurl,
		//获取当前正在播放的音乐的索引值
		getCurrentIndex: state => state.currentindex,
		//获取当前的音乐播放列表
		getMusicSheet: state => state.playmusicsheet,
		//获取当前正在播放的音乐信息
		getCurrentMusic: state => {
				return state.playmusicsheet.tracks ? state.playmusicsheet.tracks[state.currentindex] : state.playmusicsheet[state.currentindex]
		},
		//获取当前私人Fm正在播放的音乐信息
		getFmCurrentMusic: state => {
			return state.fmplaymusicsheet != '' ? state.fmplaymusicsheet[state.currentindex] : ''
		},
		//私人fm的音乐是否添加为喜欢的音乐
		getIsLike: state => state.islike,
		//获取是否显示每日推荐歌曲
		getShowDayRecommend: state => state.showdayrecommend,
		//获取每日推荐歌曲
		getRecommendSongs: state => state.recommendsongs,
		//获取网友精选歌单
		getAllSheet: state => state.allsheet,
		//获取是否显示网友精选歌单
		getShowAllSheet: state => state.isshowallsheet,
		//获取是否显示歌单类型页
		getShowSheetClassify: state => state.isshowsheetclassify,
		//选择歌单类型
		getSheetClassify: state => state.sheetclassify,
		//获取切换歌单类型时的加载状态
		getSheetLoading: state => state.sheetloading,
		//获取精品歌单
		getHighqualitySheet: state => state.highqualitysheet,
		//获取是否显示精品歌单
		getShowHighqualitySheet: state => state.isshowhighqualitysheet,
		//获取歌词
		getLyric: state => state.lyric,
		//获取当前歌词的行数
		getLrcIndex: state => state.lrcindex,
		//获取轮播图信息
		getBanner: state => state.banner,
		//获取正在播放的歌单类型是否是私人FM
		getMusicDetailType: state => state.musicdetailtype,
		//获取推荐歌单
		getRecommendSheet: state => state.recommendsheet,
		//获取推荐新音乐
		getRecommendMusic: state => state.recommendmusic,
		//获取推荐电台
		getRecommendStation: state => state.recommendstation,
		//获取独家放送
		getRecommendPrivate: state => state.recommendprivate,
		//获取推荐MV
		getRecommendVideo: state => state.recommendvideo
	},
	mutations: {
		//登录信息
		setInfo(state,obj){
			localStorage.setItem("phone",obj.phone);
            localStorage.setItem("password",obj.password);
		},
		//loading
		Loading(state,bool){
			state.isLoading = bool
		},
		//存储用户全部信息
		userInfo(state,obj){
			state.userinfo = obj
		},
		//是否显示搜索页面
		setShowSearch(state,bool){
			state.isshowsearch = bool
		},
		//搜索词
		setKeywords(state,string){
			state.keywords = string
		},
		setShowSearchResult(state,bool){
			state.isshowsearchresult = bool
		},
		//获取搜索结果
		setSearchResult(state,obj){
			state.searchresult = obj
		},
		//存储搜索历史记录
		setSearchHistory(state){
			state.searchhistory = JSON.parse(localStorage.getItem("searchhistory"))
		},
		//搜索单曲中的最佳匹配
		setBestMatch(state,obj){
			state.bestmatch = obj
		},
		//搜索歌手
		setSearchSinger(state,obj){
			state.searchsinger = obj
		},
		//存储用户全部歌单
		musicAllList(state,obj){
			state.musicalllist = obj
		},
		//保存一份我喜欢的音乐
		setMyLoveMusic(state,obj){
			state.mylovemusic = obj
		},
		//存储歌单详情
		musicSongSheet(state,obj){
			state.musicsongsheet = obj
		},
		//存储正在需要播放的歌单详情
		playmusicsongsheet(state,obj){
			state.playmusicsheet = obj
		},
		//存储歌单显示状态
		setShowSongSheet(state,obj){
			state.showSongSheet = obj.isShow
		},
		//存储歌单设置菜单的显示状态及类型
		setShowMenu(state,object){
			state.showmenu = object.obj
		},
		//存储myaudio元素
		setAudioElement(state,ele){
			state.audioelement = ele
		},
		//存储音乐列表的显示状态
		setMusicList(state,bloo){
			state.showmenulist = bloo
		},
		//存储播放的歌单是否不是私人FM
		setMusicDetailType(state,bloo){
			state.musicdetailtype = bloo
		},
		//私人fm的歌单
		setPersonalfm(state,obj){
			state.fmplaymusicsheet = obj
		},
		//私人fm的音乐是否添加为喜欢的音乐
		setIsLike(state,id){
				axios.get('/api/like?id='+id+'&like='+!state.islike).then((res) => {
					if(res.data.code == 200){
						state.islike= !state.islike
					}
				}).catch((err) => {console.log(err)})
		},
		//重置新的一首私人音乐的喜欢状态
		setPersonalLike(state,bool){
			state.islike = bool
		},
		//设置是否显示每日推荐歌曲
		setNewDayRecommend(state,bool){
			state.showdayrecommend = bool
		},
		//获取每日推荐歌曲
		setRecommendSongs(state,obj){
			state.recommendsongs = obj
		},
		//获取网友精选歌单
		setAllSheet(state,obj){
			state.allsheet = obj
		},
		//设置是否显示网友精选歌单
		setRecommendAllSheet(state,bool){
			state.isshowallsheet = bool
		},
		//是否显示歌单类型页
		setShowSheetClassify(state,bool){
			state.isshowsheetclassify = bool
		},
		//选择歌单类型
		setSheetClassify(state,string){
			state.sheetclassify = string
		},
		//切换歌单类型时的加载状态
		setSheetLoading(state,bool){
			state.sheetloading = bool
		},
		//获取精品歌单
		setHighqualitySheet(state,obj){
			state.highqualitysheet = obj
		},
		//设置是否显示精品歌单
		setShowHighqualitySheet(state,bool){
			state.isshowhighqualitysheet = bool
		},
		//播放音乐
		play(state){
			state.playing = true;
			state.audioelement.play()
		},
		//音乐播放与暂停设置
		togglePlay(state){
			if (state.playing) {
				state.playing = false;
				state.audioelement.pause()
			} else {
				state.playing = true;
				state.audioelement.play()
			}
		},
		//存储歌曲当前的播放时间
		setCurrentTime(state,time){
			state.currenttime = time
		},
		//播放下一首歌曲
		setPlayNext(state){
			let musicUrlId ;

			//播放的是否不是私人Fm
			if( state.musicdetailtype ){

				//判断播放类型
				if(state.playtype == 3){
					state.currentindex = Math.round((state.playmusicsheet.tracks.length-1)*Math.random());
				}else {
					state.currentindex++;
					if(state.currentindex >= state.playmusicsheet.tracks.length){
						state.currentindex = 0
					}
				}
				musicUrlId = state.playmusicsheet.tracks[state.currentindex].id
			}else{
				state.isrequestfm = false;
				state.currentindex++;
				if(state.currentindex >= state.fmplaymusicsheet.length){
					state.isrequestfm = true;
					state.currentindex = 0
				}
				musicUrlId = state.fmplaymusicsheet[state.currentindex].id
			}
			
			state.currenttime = 0;
			//测试  本地音乐
			state.audioelement.setAttribute('src',state.musicurl[state.currentindex%5]);
			state.audioelement.load();
			state.playing = true;
			state.audioelement.play();

			//正式环境
			// axios.get('/api/music/url?id='+musicUrlId).then((res) => {
			//   		state.audioelement.setAttribute('src',res.data.data[0].url);
			//   		console.log(res.data.data[0].url); 
			//   		state.playing = true;
			//   		state.audioelement.load();
			// 		state.audioelement.play();
			//   	},(err) => {
			//   		console.log(err)
			// 	})	

		},
		//播放上一首歌曲
		setPlayPrev(state){
			if(state.playtype == 3){
				state.currentindex = Math.round((state.playmusicsheet.tracks.length-1)*Math.random());
			}else {
				state.currentindex--;
				if(state.currentindex < 0){
					state.currentindex = state.playmusicsheet.tracks.length-1
				}
			}
			state.currenttime = 0;
			//测试  本地音乐
			state.audioelement.setAttribute('src',state.musicurl[state.currentindex%5]);
			state.playing = true;
			state.audioelement.load();
			state.audioelement.play();

			//正式环境
			// axios.get('/api/music/url?id='+state.playmusicsheet.tracks[state.currentindex].id).then((res) => {
			//   		state.audioelement.setAttribute('src',res.data.data[0].url);
			//   		console.log(res.data.data[0].url); 
			//   		state.playing = true;
			//   		state.audioelement.load();
			// 		state.audioelement.play();
			//   	},(err) => {
			//   		console.log(err)
			// 	})	
		},
		//歌曲播放结束后执行的事件
		playEnded(state){
			let musicUrlId;

			if( state.musicdetailtype ){
				//循环播放
				// if(state.playtype == 1){
				// 	state.currenttime = 0;
				// 	state.playing = true;
				// 	state.audioelement.load();
				// 	state.audioelement.play();
				// }else {

				//顺序播放
				if(state.playtype == 2){
					state.currentindex ++;
					if( state.currentindex >= state.playmusicsheet.tracks.length ){
						state.currentindex = 0
					}
				} else if(state.playtype == 3){ //随机播放
					state.currentindex = Math.round((state.playmusicsheet.tracks.length-1) * Math.random());
				}
				musicUrlId = state.playmusicsheet.tracks[state.currentindex].id
			}else{
				state.isrequestfm = false;
				state.currentindex++;
				if(state.currentindex >= state.fmplaymusicsheet.length){
					state.isrequestfm = true;
					state.currentindex = 0
				}
				musicUrlId = state.fmplaymusicsheet[state.currentindex].id
			}
				state.currenttime = 0;

				//测试  本地音乐
				state.audioelement.setAttribute('src',state.musicurl[state.currentindex%5]);
				state.playing = true;
				state.audioelement.load();
				state.audioelement.play();

				//正式环境
				// axios.get('/api/music/url?id='+musicUrlId).then((res) => {
				//   		state.audioelement.setAttribute('src',res.data.data[0].url);
				//   		console.log(res.data.data[0].url); 
				//   		state.playing = true;
				//   		state.audioelement.load();
				// 		state.audioelement.play();
				//   	},(err) => {
				//   		console.log(err)
				// 	})		
				// }
		},
		//获取是否切换掉默认歌单
		set_default(state,obj){
			state.isdefault = obj.isdefault
		},
		//获取歌曲详情
		// setMusicDetail(state,obj){
		// 	state.musicdetail = obj
		// },
		//获取当前播放音乐的总时长
		setDuration(state,time){
			state.duration = time
		},
		//获取音乐url
		setMusicUrl(state,id){
			axios.get('/api/music/url?id='+id).then((res) => {
			  		state.promusicurl = res.data.data[0].url
			  	},(err) => {
			  		console.log(err)
				})
		},
		//设置当前播放的音乐
		currentMusicIndex(state,obj){
			state.currentindex = obj.index;
			//获取当前需要播放的音乐url
			// axios.get('/api/music/url?id='+obj.id).then((res) => {
			//   		state.audioelement.setAttribute('src',res.data.data[0].url);
			//   		console.log(res.data.data[0].url); 
			// 			state.playing = true;
			//   			state.audioelement.load();
			// 			state.audioelement.play();
			//   	},(err) => {
			//   		console.log(err)
			// 	})
			//本地测试
			state.audioelement.setAttribute('src',state.musicurl[state.currentindex%5]);
			state.playing = true;
			state.audioelement.load();
			state.audioelement.play();
		},
		//设置播放类型
		setPlayType(state,type){
			type++;
			if( type > 3 ){
				type = 1
			}
			state.playtype = type;
		},
		//设置是否显示当前正在播放的音乐详情页
		setShowMusicDetail(state,bool){
			state.showMusicDetail = bool
		},
		//解析歌词
		setLyric(state,data){
			if(data.lrc){
				let lyrics = data.lrc.lyric.split('\n');
				let lrcObject = {};
				for( let i = 0; i < lyrics.length; i++){
					let lyric = decodeURIComponent(lyrics[i]);
					let timeReg = /\[\d*:\d*(\.||\:)\d*\]/g;
					let timeArry = lyric.match(timeReg);
					if(!timeArry) continue;
					let lrc = lyric.replace(timeReg,'');
					// console.log(timeArry);
					// console.log(lrc);
					for( let j = 0; j < timeArry.length; j++ ){
						let min = Number(String(timeArry[j].match(/\[\d*/i)).slice(1)),
							sec = Number(String(timeArry[j].match(/\:\d*/i)).slice(1)),
							msec = Number(String(timeArry[j].match(/\.\d*\]/i)).slice(1,-1));
						let time = (min*60 + sec + (msec/1000)).toFixed(2);
						lrcObject[time] = lrc;
					}
				}
				state.lyric = lrcObject;
			}else{
				state.lyric = {"0":"暂无歌词"};
			}
		},
		//当前歌词的行数
		setLrcIndex(state,index){
			state.lrcindex = index
		},
		//发现音乐的轮播图信息
		setBanner(state,data){
			state.banner = data
		},
		//推荐歌单的信息
		setRecommendSheet(state,data){
			state.recommendsheet = data
		},
		//推荐新音乐的信息
		setRecommendMusic(state,data){
			state.recommendmusic = data
		},
		//推荐电台的信息
		setRecommendStation(state,data){
			state.recommendstation = data
		},
		//独家放送
		setRecommendPrivate(state,data){
			state.recommendprivate = data
		},
		//推荐MV
		setRecommendVideo(state,data){
			state.recommendvideo = data
		}
	},
	actions: {
		//loading
		set_loading({commit},bool){
			commit('Loading',bool)
		},
		user_info({commit},obj){
			commit('userInfo',obj)
		},
		//是否显示搜索页面
		set_showsearch({commit},bool){
			commit('setShowSearch',bool)
		},
		//获取搜索结果
		set_searchresult({commit},obj){
			commit('setSearchResult',obj.songs)
		},
		//搜索词
		set_keywords({commit},string){
			commit('setKeywords',string)
		},
		//搜索历史记录
		set_searchhistory({commit}){
			commit('setSearchHistory')
		},
		//搜索单曲中的最佳匹配
		set_bestmatch({commit},obj){
			commit("setBestMatch",obj)
		},
		// 搜索歌手
		set_searchsinger({commit},obj){
			commit("setSearchSinger",obj.artists)
		},
		music_alllist({commit},obj){
			commit('musicAllList',obj.playlist)
		},
		//保存一份我喜欢的音乐
		set_mylovemusic({commit},obj){
			commit('setMyLoveMusic',obj.playlist)
		},
		music_songsheet({commit},obj){
			commit('musicSongSheet',obj.playlist)
		},
		set_audioelement({commit},ele){
			commit('setAudioElement',ele)
		},
		set_musicurl({commit},id){
			commit('setMusicUrl',id)
		},
		set_currenttime({commit},time){
			commit('setCurrentTime',time)
		},
		//播放下一首歌曲
		set_playnext({commit}){
			commit('setPlayNext')
		},
		//播放上一首歌曲
		set_playprev({commit}){
			commit('setPlayPrev')
		},
		play_ended({commit}){
			commit('playEnded')
		},
		// set_musicdetail({commit},obj){
		// 	commit('setMusicDetail',obj)
		// },
		set_currentmusicindex({commit},obj){
			commit('currentMusicIndex',obj)
		},
		play_musicsongsheet({commit},obj){
			commit('playmusicsongsheet',obj.playlist)
		},
		//每日推荐的的歌曲歌单
		play_recommendsongs({commit},obj){
			commit('playmusicsongsheet',obj)
		},
		set_duration({commit},time){
			commit('setDuration',time)
		},
		//获取歌词
		set_lyric({commit},data){
			commit('setLyric',data)
		},
		//获取轮播图信息banner
		set_banner({commit},data){
			commit('setBanner',data.banners)
		},
		//获取私人FM
		set_musicdetailtype({commit},bool){
			commit('setMusicDetailType',bool)
		},
		set_personalfm({commit},obj){
			commit('setPersonalfm',obj.data)
		},
		//私人fm的音乐是否添加为喜欢的音乐
		set_islike({commit},id){
			commit('setIsLike',id)
		},
		//重置新的一首歌的喜欢状态
		set_personallike({commit},bool){
			commit('setPersonalLike',bool)
		},
		//设置是否显示每日推荐歌曲
		set_newdayrecommend({commit},bool){
			commit('setNewDayRecommend',bool)
		},
		//获取每日推荐歌曲
		set_recommendsongs({commit},obj){
			commit('setRecommendSongs',obj.recommend)
		},
		//获取网友精选歌单
		set_allsheet({commit},obj){
			commit('setAllSheet',obj.playlists)
		},
		//是否显示网友精选歌单
		set_recommendallsheet({commit},bool){
			commit('setRecommendAllSheet',bool)
		},
		//是否显示歌单类型页
		set_showsheetclassify({commit},bool){
			commit('setShowSheetClassify',bool)
		},
		//选择歌单类型
		set_sheetclassify({commit},string){
			commit('setSheetClassify',string)
		},
		//切换歌单类型时的加载状态
		set_sheetloading({commit},bool){
			commit('setSheetLoading',bool)
		},
		//获取精品歌单
		set_highqualitysheet({commit},obj){
			commit('setHighqualitySheet',obj.playlists)
		},
		//是否显示精品歌单
		set_showhighqualitysheet({commit},bool){
			commit('setShowHighqualitySheet',bool)
		},
		//获取推荐歌单信息
		set_recommendsheet({commit},data){
			commit('setRecommendSheet',data.result)
		},
		//获取推荐新音乐
		set_recommendmusic({commit},data){
			commit('setRecommendMusic',data.result)
		},
		//获取推荐电台
		set_recommendstation({commit},data){
			commit('setRecommendStation',data.result)
		},
		//获取独家放送
		set_recommendprivate({commit},data){
			commit('setRecommendPrivate',data.result)
		},
		//获取推荐MV
		set_recommendvideo({commit},data){
			commit('setRecommendVideo',data.result)
		}
	}
}

export default audioInfo;