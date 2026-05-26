import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/weapons',
    name: 'weapons',
    component: () => import('../views/CategoryView.vue'),
    props: { category: 'weapons', title: '武器库', color: '#00d4ff' }
  },
  {
    path: '/ammo',
    name: 'ammo',
    component: () => import('../views/CategoryView.vue'),
    props: { category: 'ammo', title: '弹药库', color: '#ff9500' }
  },
  {
    path: '/items',
    name: 'items',
    component: () => import('../views/CategoryView.vue'),
    props: { category: 'items', title: '道具库', color: '#ffd700' }
  },
  {
    path: '/bag',
    name: 'bag',
    component: () => import('../views/CategoryView.vue'),
    props: { category: 'bag', title: '背包', color: '#00ff41' }
  },
  {
    path: '/helmet',
    name: 'helmet',
    component: () => import('../views/CategoryView.vue'),
    props: { category: 'helmet', title: '头盔', color: '#ff6b35' }
  },
  {
    path: '/vest',
    name: 'vest',
    component: () => import('../views/CategoryView.vue'),
    props: { category: 'vest', title: '护甲', color: '#e63946' }
  },
  {
    path: '/chestrig',
    name: 'chestrig',
    component: () => import('../views/CategoryView.vue'),
    props: { category: 'chestrig', title: '胸挂', color: '#9d4edd' }
  },
  {
    path: '/magazine',
    name: 'magazine',
    component: () => import('../views/CategoryView.vue'),
    props: { category: 'magazine', title: '弹匣', color: '#06d6a0' }
  },
  {
    path: '/functional',
    name: 'functional',
    component: () => import('../views/CategoryView.vue'),
    props: { category: 'functional', title: '功能性配件', color: '#118ab2' }
  },
  {
    path: '/rear-grip',
    name: 'rear-grip',
    component: () => import('../views/CategoryView.vue'),
    props: { category: 'rear-grip', title: '后握把', color: '#ef476f' }
  },
  {
    path: '/forend',
    name: 'forend',
    component: () => import('../views/CategoryView.vue'),
    props: { category: 'forend', title: '护木', color: '#ffd166' }
  },
  {
    path: '/optic',
    name: 'optic',
    component: () => import('../views/CategoryView.vue'),
    props: { category: 'optic', title: '瞄具', color: '#8338ec' }
  },
  {
    path: '/fore-grip',
    name: 'fore-grip',
    component: () => import('../views/CategoryView.vue'),
    props: { category: 'fore-grip', title: '前握把', color: '#fb5607' }
  },
  {
    path: '/barrel',
    name: 'barrel',
    component: () => import('../views/CategoryView.vue'),
    props: { category: 'barrel', title: '枪管', color: '#3a86ff' }
  },
  {
    path: '/muzzle',
    name: 'muzzle',
    component: () => import('../views/CategoryView.vue'),
    props: { category: 'muzzle', title: '枪口', color: '#ff006e' }
  },
  {
    path: '/stock',
    name: 'stock',
    component: () => import('../views/CategoryView.vue'),
    props: { category: 'stock', title: '枪托', color: '#c77dff' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
