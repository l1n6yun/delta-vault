<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import NavTabs from '../components/NavTabs.vue'

const router = useRouter()
const items = ref([])
const loading = ref(true)

const categories = [
  { name: '武器库', path: '/weapons', icon: '🔫', color: '#00d4ff' },
  { name: '背包', path: '/bag', icon: '🎒', color: '#00ff41' },
  { name: '头盔', path: '/helmet', icon: '⛑️', color: '#ff6b35' },
  { name: '护甲', path: '/vest', icon: '🦺', color: '#e63946' },
  { name: '胸挂', path: '/chestrig', icon: '📦', color: '#9d4edd' },
  { name: '弹匣', path: '/magazine', icon: '📋', color: '#06d6a0' },
  { name: '瞄具', path: '/optic', icon: '🎯', color: '#8338ec' },
  { name: '功能配件', path: '/functional', icon: '🔧', color: '#118ab2' },
  { name: '前握把', path: '/fore-grip', icon: '🤝', color: '#fb5607' },
  { name: '后握把', path: '/rear-grip', icon: '🖐️', color: '#ef476f' },
  { name: '护木', path: '/forend', icon: '🛡️', color: '#ffd166' },
  { name: '枪管', path: '/barrel', icon: '🔩', color: '#3a86ff' },
  { name: '枪口', path: '/muzzle', icon: '💨', color: '#ff006e' },
  { name: '枪托', path: '/stock', icon: '🔙', color: '#c77dff' },
  { name: '道具库', path: '/items', icon: '💎', color: '#ffd700' }
]

const recentItems = ref([])

onMounted(async () => {
  try {
    const data = await import('../data/items.json')
    items.value = data.default
    recentItems.value = items.value.slice(0, 6)
  } catch (e) {
    console.error(e)
  }
  loading.value = false
})

const navigateTo = (path) => {
  router.push(path)
}
</script>

<template>
  <div class="home-view">
    <header class="header">
      <div class="header-decoration"></div>
      <div class="header-content">
        <h1 class="title">DELTA VAULT</h1>
        <div class="title-line"></div>
        <p class="subtitle">三角洲行动 · 装备数据库</p>
      </div>
    </header>
    
    <NavTabs />
    
    <main class="main-content">
      <section class="categories-section">
        <h2 class="section-title">装备分类</h2>
        <div class="categories-grid">
          <div 
            v-for="cat in categories" 
            :key="cat.path"
            class="category-card"
            :style="{ '--cat-color': cat.color }"
            @click="navigateTo(cat.path)"
          >
            <span class="category-icon">{{ cat.icon }}</span>
            <span class="category-name">{{ cat.name }}</span>
            <div class="category-glow"></div>
          </div>
        </div>
      </section>
      
      <section class="recent-section" v-if="!loading">
        <h2 class="section-title">热门道具</h2>
        <div class="recent-grid">
          <div 
            v-for="item in recentItems" 
            :key="item.id"
            class="recent-card"
            @click="navigateTo('/items')"
          >
            <img :src="item.prePic || item.pic" :alt="item.objectName" />
            <span class="recent-name">{{ item.objectName }}</span>
          </div>
        </div>
      </section>
    </main>
    
    <footer class="footer">
      <p>DELTA FORCE · EQUIPMENT DATABASE</p>
    </footer>
  </div>
</template>

<style scoped>
.home-view {
  min-height: 100vh;
  background: #0e1215;
  position: relative;
}

.home-view::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    linear-gradient(90deg, rgba(0, 255, 65, 0.03) 1px, transparent 1px),
    linear-gradient(rgba(0, 255, 65, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  pointer-events: none;
  z-index: 0;
}

.home-view::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.1) 0px,
    rgba(0, 0, 0, 0.1) 1px,
    transparent 1px,
    transparent 3px
  );
  pointer-events: none;
  z-index: 1;
}

.header {
  text-align: center;
  padding: 50px 20px;
  position: relative;
  z-index: 2;
}

.header-decoration {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  height: 150px;
  background: radial-gradient(ellipse at center, rgba(0, 255, 65, 0.1) 0%, transparent 70%);
  pointer-events: none;
}

.header-content {
  position: relative;
}

.header::before,
.header::after {
  content: '';
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 150px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0, 255, 65, 0.5));
}

.header::before {
  right: calc(50% + 180px);
}

.header::after {
  left: calc(50% + 180px);
}

.title {
  font-size: 3rem;
  font-weight: 700;
  color: #00ff41;
  text-shadow: 0 0 30px rgba(0, 255, 65, 0.5);
  letter-spacing: 15px;
  margin-bottom: 15px;
  font-family: 'JetBrains Mono', monospace;
}

.title-line {
  width: 200px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #00ff41, transparent);
  margin: 0 auto 15px;
}

.subtitle {
  font-size: 1rem;
  color: #6a7a6a;
  letter-spacing: 5px;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  position: relative;
  z-index: 2;
}

.section-title {
  font-size: 1rem;
  color: #00ff41;
  text-transform: uppercase;
  letter-spacing: 3px;
  margin-bottom: 25px;
  font-family: 'JetBrains Mono', monospace;
  display: flex;
  align-items: center;
  gap: 15px;
}

.section-title::after {
  content: '';
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, rgba(0, 255, 65, 0.3), transparent);
}

.categories-section {
  margin-bottom: 50px;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 15px;
}

.category-card {
  position: relative;
  background: linear-gradient(135deg, rgba(20, 30, 25, 0.9), rgba(10, 15, 12, 0.95));
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 25px 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  overflow: hidden;
}

.category-card:hover {
  border-color: var(--cat-color);
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
}

.category-card:hover .category-glow {
  opacity: 1;
}

.category-card:hover .category-icon {
  transform: scale(1.2);
}

.category-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: linear-gradient(to bottom, color-mix(in srgb, var(--cat-color) 20%, transparent), transparent);
  opacity: 0;
  transition: opacity 0.3s;
}

.category-icon {
  display: block;
  font-size: 2.5rem;
  margin-bottom: 12px;
  transition: transform 0.3s;
}

.category-name {
  font-size: 0.9rem;
  color: #c4c4c4;
  letter-spacing: 2px;
}

.recent-section {
  margin-bottom: 50px;
}

.recent-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 15px;
}

.recent-card {
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 15px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
}

.recent-card:hover {
  border-color: #ffd700;
  transform: translateY(-3px);
}

.recent-card img {
  width: 100%;
  height: 80px;
  object-fit: contain;
  margin-bottom: 10px;
}

.recent-name {
  display: block;
  font-size: 0.75rem;
  color: #8a9a8a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.footer {
  text-align: center;
  padding: 30px;
  border-top: 1px solid rgba(0, 255, 65, 0.1);
  position: relative;
  z-index: 2;
}

.footer p {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  color: #4a5a4a;
  letter-spacing: 3px;
}

@media (max-width: 800px) {
  .recent-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .title {
    font-size: 2rem;
    letter-spacing: 8px;
  }
  
  .header::before,
  .header::after {
    display: none;
  }
}

@media (max-width: 500px) {
  .categories-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .recent-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
