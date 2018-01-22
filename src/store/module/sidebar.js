//侧面滑动菜单效果
const SIDE_SHOW = true;
const SIDE_HIDE = false;

const Sidebar ={
	state: {
		isShow: false
	},
	mutations: {
		showBar(state){
			state.isShow = SIDE_SHOW
		},
		hideBar(state){
			state.isShow = SIDE_HIDE
		}
	},
	actions: {
		showSidebar({commit}){
			commit('showBar')
		},
		hideSidebar({commit}){
			commit('hideBar')
		}
	},
	getters: {
		isShowMethod: state => state.isShow
	}
}

export default Sidebar;