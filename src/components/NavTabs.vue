<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const tabs = [
  { path: '/', name: '首页', key: 'home' },
  { path: '/weapons', name: '武器库', key: 'weapons' },
  { path: '/bag', name: '背包', key: 'bag' },
  { path: '/helmet', name: '头盔', key: 'helmet' },
  { path: '/vest', name: '护甲', key: 'vest' },
  { path: '/chestrig', name: '胸挂', key: 'chestrig' },
  { path: '/magazine', name: '弹匣', key: 'magazine' },
  { path: '/optic', name: '瞄具', key: 'optic' },
  { path: '/functional', name: '功能配件', key: 'functional' },
  { path: '/fore-grip', name: '前握把', key: 'fore-grip' },
  { path: '/rear-grip', name: '后握把', key: 'rear-grip' },
  { path: '/forend', name: '护木', key: 'forend' },
  { path: '/barrel', name: '枪管', key: 'barrel' },
  { path: '/muzzle', name: '枪口', key: 'muzzle' },
  { path: '/stock', name: '枪托', key: 'stock' },
  { path: '/items', name: '道具库', key: 'items' }
]

const isActive = (tab) => {
  if (tab.key === 'home') return route.path === '/'
  return route.path.startsWith(tab.path)
}
</script>

<template>
  <nav class="nav-tabs">
    <router-link
      v-for="tab in tabs"
      :key="tab.key"
      :to="tab.path"
      class="nav-tab"
      :class="{ active: isActive(tab) }"
    >
      {{ tab.name }}
    </router-link>
  </nav>
</template>

<style scoped>
.nav-tabs {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
  padding: 15px;
  background: rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid rgba(0, 255, 65, 0.2);
}

.nav-tab {
  padding: 10px 18px;
  border: 1px solid rgba(0, 255, 65, 0.3);
  background: rgba(0, 0, 0, 0.4);
  color: #8a9a8a;
  text-decoration: none;
  transition: all 0.3s ease;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  letter-spacing: 1px;
}

.nav-tab:hover {
  border-color: rgba(0, 255, 65, 0.6);
  color: #00ff41;
  background: rgba(0, 255, 65, 0.1);
}

.nav-tab.active {
  background: rgba(0, 255, 65, 0.15);
  border-color: #00ff41;
  color: #00ff41;
  text-shadow: 0 0 10px rgba(0, 255, 65, 0.5);
}
</style>
