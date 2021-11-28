import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import require1 from '../components/Views/require-1/1'
import require2 from '../components/Views/require-2/2-1'
import require3 from '../components/Views/require-2/2-2'
import require4 from '../components/Views/require-2/2-3'
import require5 from '../components/Views/require-2/2-4'
import require6 from '../components/Views/require-2/2-5'
import require7 from '../components/Views/require-3/3-1'
import require8 from '../components/Views/require-3/3-2'
import require9 from '../components/Views/require-3/3-3'
import require10 from '../components/Views/require-4/4-1'
import require11A from '../components/Views/require-4/4-2-A'
import require11B from '../components/Views/require-4/4-2-B'
import require12 from '../components/Views/require-4/4-3'
import require13 from '../components/Views/require-4/4-4'
import require14 from '../components/Views/require-4/4-5'
import require15 from '../components/Views/require-4/4-6'
import require16 from '../components/Views/require-4/4-7'

Vue.use(Router)

export default new Router({
  // 去掉浏览器后面的“#”
  mode: 'history',
  routes: [
    // 需求1
    {
      path: '/1',
      name: '1',
      component: require1
    },
    // 需求2 2-1
    {
      path: '/2-1',
      name: '2-1',
      component: require2
    },
    // 需求3 2-2
    {
      path: '/2-2',
      name: '2-2',
      component: require3
    },
    // 需求4 2-3
    {
      path: '/2-3',
      name: '2-3',
      component: require4
    },
    // 需求5 2-4
    {
      path: '/2-4',
      name: '2-4',
      component: require5
    },
    // 需求6 2-5
    {
      path: '/2-5',
      name: '2-5',
      component: require6
    },
    // 需求7 3-1
    {
      path: '/3-1',
      name: '3-1',
      component: require7
    },
    //需求8 3-2
    {
      path: '/3-2',
      name: '3-2',
      component: require8
    },
    // 需求9 3-3
    {
      path: '/3-3',
      name: '3-3',
      component: require9
    },
    {
      path: '/4-1',
      name: '4-1',
      component: require10
    },
    {
      path: '/4-2-A',
      name: '4-2-A',
      component: require11A
    },
    {
      path: '/4-2-B',
      name: '4-2-B',
      component: require11B
    },
    {
      path: '/4-3',
      name: '4-3',
      component: require12
    },
    {
      path: '/4-4',
      name: '4-4',
      component: require13
    },
    {
      path: '/4-5',
      name: '4-5',
      component: require14
    },
    {
      path: '/4-6',
      name: '4-6',
      component: require15
    },
    {
      path: '/4-7',
      name: '4-7',
      component: require16
    },

  ]
})
