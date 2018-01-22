import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login'
import Index from '../components/index'
import Header from '../components/header'
import Bottombar from '../components/bottombar'
import Mymusic from '../components/mymusic'
import Findmusic from '../components/findmusic'
import Findnewmusic from '../components/findnewmusic'
import Findvideo from '../components/findvideo'
import Findstation from '../components/findstation'

import search from '../components/search'
import single from '../components/single'

Vue.use(Router)

export default new Router({
  routes: [
    {   path: '/',
        redirect: '/login',
        component: Login
    },
    {   path: '/login',
        component: Login
    },
    {
        path: '/index',
        redirect: '/index/mymusic',
        component: Index,
        children:[
            {
                path: '/index/mymusic',
                component: Mymusic
            },
            {
                path: '/index/findmusic',
                redirect: '/index/findmusic/findnewmusic',
                component: Findmusic,
                children: [
                    {
                        path: '/index/findmusic/findnewmusic',
                        component: Findnewmusic
                    },
                    {
                        path: '/index/findmusic/findvideo',
                        component: Findvideo
                    },
                    {
                        path: '/index/findmusic/findstation',
                        component: Findstation
                    }
                ]
            }
        ]
    }
  ]
})
