<template>
  <div class="Index">
    <!-- 播放器 -->
    <audio ref="myaudio" @canplay="musicCanPlay" @timeupdate="musicTimeUpdate" @ended="musicEnded"></audio>
  	<!-- 头部 -->
  	<music-header></music-header>
  	<!-- 侧边栏列表 -->
  	<side-bar></side-bar>
  	<!-- 我的音乐列表 -->
    <router-view></router-view>
  	<!-- <my-music></my-music> -->
    <!-- 歌单设置菜单 -->
    <menu-list></menu-list>
    <!-- 搜索页面 -->
    <search></search>
  	<!-- 底部固定页 -->
  	<bottom-bar></bottom-bar>
    <!-- 音乐列表 -->
    <music-list></music-list>
    <!-- 歌曲详情页 -->
    <music-detail></music-detail>
    <!-- 歌单详情页 -->
    <songsheet></songsheet>
    <!-- 每日推荐歌曲 -->
    <newday-recommend></newday-recommend>
    <!-- 歌单 -->
    <all-sheet></all-sheet>
    <!-- 精品歌单 -->
    <highquality-sheet></highquality-sheet>
    <!-- 歌单分类 -->
    <sheet-classify></sheet-classify>
    <!-- loading -->
    <loading v-if="isLoading"></loading>
  </div>
</template>

<script>
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import Vueaxios from 'vue-axios';

import header from './header.vue';
import bottombar from './bottombar.vue';
import slidebar from './slidebar.vue';
import mymusic from './mymusic.vue';
import menulist from './menulist.vue';
import search from './search.vue';
import musiclist from './musiclist.vue';
import musicdetail from './musicdetail.vue';
import songsheet from './songsheet.vue';
import newdayRecommend from './newdayrecommend.vue';
import recommendallsheet from './recommendallsheet.vue';
import highqualitysheet from './highqualitysheet.vue';
import sheetclassify from './sheetclassify.vue';
import loading from './loading.vue';

import store from '../store'

Vue.use(Vueaxios,axios);

let currLrcIndex = 0;
export default {
  data(){
  	return {
  		title: "不负好时光",
      // url: require("./assets/city of sky.mp3")
      phone: '',
      password: ''
  	}
  },
  computed:{
    Info(){
      return store.getters.getInfo
    },
    isLoading(){
      return store.getters.getIsLoading
    }
  },
  components:{
  	'music-header': header,
  	'side-bar': slidebar,
  	'bottom-bar': bottombar,
  	'my-music': mymusic,
    'menu-list': menulist,
    'search': search,
    'music-list': musiclist,
    'music-detail': musicdetail,
    'songsheet': songsheet,
    'newday-recommend': newdayRecommend,
    'all-sheet': recommendallsheet,
    'highquality-sheet': highqualitysheet,
    'sheet-classify': sheetclassify,
    'loading': loading
  },
  methods:{
    musicCanPlay(){
      store.dispatch('set_duration',this.$refs.myaudio.duration)
    },
    // musicOnPlaying(){
    //   store.commit('play')
    // },
    musicTimeUpdate(){
      store.dispatch('set_currenttime',this.$refs.myaudio.currentTime);

      let lrc = store.getters.getLyric;
      let currtime = this.$refs.myaudio.currentTime;

      for( let i = 0;i < Object.keys(lrc).length; i++){
        if(Object.keys(lrc)[0] > currtime){
          currLrcIndex = 0;
        }
        if( Object.keys(lrc)[i] <= currtime && currtime < Object.keys(lrc)[i+1] ){
          currLrcIndex = i;
        }
        if(currtime > Object.keys(lrc)[Object.keys(lrc).length-1]){
          currLrcIndex = Object.keys(lrc).length-1;
        }
        store.commit('setLrcIndex',currLrcIndex)
      }
     

    },
    musicEnded(){
      store.dispatch('play_ended')
    }
  },

  mounted(){
    axios.get('/api/login/cellphone?phone='+this.Info.phone()+'&password='+this.Info.password()).then((res) => {
      //获取用户信息
    	axios.get('/api/user/detail?uid='+res.data.account.id).then((res) => {
    		store.dispatch('user_info',res.data)
    	}).catch((err) => {
    		console.log(err)
    	}),
      //获取用户全部歌单
      axios.get('/api/user/playlist?uid='+res.data.account.id).then((res) => {
    		store.dispatch('music_alllist',res.data)
        //获取默认第一个歌单
        axios.get('/api/playlist/detail?id='+res.data.playlist[0].id).then((res) => {
          //把用户第一个歌单的音乐设为默认需要播放的音乐
          store.dispatch('play_musicsongsheet',res.data),
          /*保存一份我喜欢的音乐（好像默认第一个歌单就是我喜欢的音乐），用来判断私人fm的音乐是否是我喜欢的音乐 API中没找到该如何判断是否是我喜欢的音乐*/
          // store.dispatch('set_mylovemusic',res.data),
          //设置默认详情页的类型 true：不是私人fm
          store.commit('setMusicDetailType',true)
        //     //获取默认第一个歌单的第一个首歌
        //     axios.get('/api/music/url?id='+res.data.playlist.tracks[0].id).then((res) => {
        //         //设置默认音乐的url
        //         this.$refs.myaudio.setAttribute('src',res.data.data[0].url)
        //       }).catch((err) => {
        //         console.log(err)
        //       })
            axios.get('/api/lyric?id='+res.data.playlist.tracks[0].id).then((res) => {
             store.dispatch('set_lyric',res.data)
            }).catch((err) => {
              console.log(err)
            })
          }).catch((err) => {
          console.log(err)
        })
    	}).catch((err) => {
    		console.log(err)
    	})

    }).catch((err) => {
      console.log(err)
    }),

    this.$refs.myaudio.setAttribute('src','../static/media/between.mp3'),  
    store.dispatch('set_audioelement',this.$refs.myaudio)
  }
}
/* 92454999  387341103整个的流程是在组件的created中提交dispatch，然后通过action调用一个封装好的axios然后再触发mutation来提交状态改变state中的数据，然后在组件的计算属性中获取state的数据并渲染在页面上*/ 
</script>

<style lang="less">
    .Index{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 2;
    }
</style>