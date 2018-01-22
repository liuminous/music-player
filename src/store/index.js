import Vue from 'vue';
import Vuex from 'vuex';
import Sidebar from './module/sidebar.js';
import Audioinfo from './module/audio.js';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {

	},
	getters: {

	},
	mutations: {

	},
	actions: {

	},
	modules: {
		sideBar: Sidebar,
		audioInfo: Audioinfo
	}
})

export default store;