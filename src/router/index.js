import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import require1 from '../components/Views/require-1/1'
import require2 from '../components/Views/require-2/2-1'
import require3 from '../components/Views/require-2/2-2'
import require4 from '../components/Views/require-2/2-3'
import require5 from '../components/Views/require-2/2-4'
import require6 from '../components/Views/require-2/2-5'

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
    }
  ]
})
