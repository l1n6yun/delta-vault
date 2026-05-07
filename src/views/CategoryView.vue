<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import ItemCard from '../components/ItemCard.vue'
import ItemDetail from '../components/ItemDetail.vue'
import NavTabs from '../components/NavTabs.vue'

const route = useRoute()

const props = defineProps({
  category: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: '#00ff41'
  }
})

const items = ref([])
const loading = ref(true)
const searchQuery = ref('')
const selectedGrade = ref(0)
const selectedItem = ref(null)

const filteredItems = computed(() => {
  let result = items.value
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(item => 
      item.objectName.toLowerCase().includes(query) ||
      item.desc?.toLowerCase().includes(query)
    )
  }
  
  if (selectedGrade.value > 0) {
    result = result.filter(item => item.grade === selectedGrade.value)
  }
  
  return result
})

const grades = [1, 2, 3, 4, 5, 6]
const gradeNames = ['普通', '优秀', '精良', '史诗', '传说', '神话']
const showGradeFilter = computed(() => !['weapons', 'items'].includes(props.category))

const loadData = async () => {
  loading.value = true
  searchQuery.value = ''
  selectedGrade.value = 0
  try {
    const data = await import(`../data/${props.category}.json`)
    items.value = data.default
  } catch (e) {
    console.error('Failed to load data:', e)
    items.value = []
  }
  loading.value = false
}

onMounted(loadData)

// 监听路由变化，重新加载数据
watch(() => props.category, loadData)

const openDetail = (item) => {
  selectedItem.value = item
  document.body.style.overflow = 'hidden'
}

const closeDetail = () => {
  selectedItem.value = null
  document.body.style.overflow = ''
}
</script>

<template>
  <div class="category-view" :style="{ '--accent': color }">
    <header class="header">
      <div class="header-content">
        <h1 class="title">{{ title }}</h1>
        <p class="subtitle">DELTA FORCE · EQUIPMENT DATABASE</p>
      </div>
    </header>
    
    <NavTabs />
    
    <div class="main-content">
      <div class="toolbar">
        <div class="search-box">
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="搜索装备..." 
            class="search-input"
          />
        </div>
        
        <div class="grade-filter" v-if="showGradeFilter">
          <button 
            v-for="grade in grades" 
            :key="grade"
            :class="['grade-btn', { active: selectedGrade === grade }]"
            @click="selectedGrade = selectedGrade === grade ? 0 : grade"
          >
            {{ gradeNames[grade - 1] }}
          </button>
        </div>
        
        <div class="result-count">
          共 {{ filteredItems.length }} 件装备
        </div>
      </div>
      
      <div v-if="loading" class="loading">
        <div class="loading-spinner"></div>
        数据加载中...
      </div>
      
      <div v-else-if="filteredItems.length === 0" class="empty-state">
        <div class="empty-icon">📦</div>
        <p>没有找到匹配的装备</p>
      </div>
      
      <div v-else class="items-grid">
        <ItemCard 
          v-for="item in filteredItems" 
          :key="item.id"
          :item="item"
          :accent-color="color"
          @click="openDetail(item)"
        />
      </div>
    </div>
    
    <Teleport to="body">
      <ItemDetail 
        v-if="selectedItem"
        :item="selectedItem"
        :accent-color="color"
        @close="closeDetail"
      />
    </Teleport>
  </div>
</template>

<style scoped>
.category-view {
  min-height: 100vh;
  background: #0e1215;
}

.header {
  text-align: center;
  padding: 30px 20px;
  background: linear-gradient(135deg, rgba(20, 30, 25, 0.95), rgba(10, 15, 12, 0.98));
  border-bottom: 1px solid var(--accent);
  position: relative;
}

.header::before,
.header::after {
  content: '';
  position: absolute;
  width: 40px;
  height: 40px;
  border: 2px solid var(--accent);
}

.header::before {
  top: 15px;
  left: 15px;
  border-right: none;
  border-bottom: none;
}

.header::after {
  top: 15px;
  right: 15px;
  border-left: none;
  border-bottom: none;
}

.title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--accent);
  text-shadow: 0 0 20px color-mix(in srgb, var(--accent) 50%, transparent);
  margin-bottom: 10px;
  letter-spacing: 5px;
}

.subtitle {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  color: #6a7a6a;
  letter-spacing: 3px;
}

.main-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 25px 20px;
}

.toolbar {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 25px;
  flex-wrap: wrap;
}

.search-box {
  flex: 1;
  min-width: 250px;
}

.search-input {
  width: 100%;
  padding: 12px 18px;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #c4c4c4;
  font-size: 0.9rem;
  outline: none;
  transition: all 0.3s;
}

.search-input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 15px color-mix(in srgb, var(--accent) 20%, transparent);
}

.search-input::placeholder {
  color: #5a6a5a;
}

.grade-filter {
  display: flex;
  gap: 8px;
}

.grade-btn {
  padding: 8px 16px;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #8a9a8a;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;
}

.grade-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.grade-btn.active {
  background: var(--accent);
  border-color: var(--accent);
  color: #000;
  font-weight: 600;
}

.result-count {
  font-size: 0.85rem;
  color: #6a7a6a;
  font-family: 'JetBrains Mono', monospace;
  white-space: nowrap;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  color: #6a7a6a;
  gap: 20px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  color: #6a7a6a;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 15px;
  opacity: 0.5;
}

.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}

@media (max-width: 600px) {
  .toolbar {
    flex-direction: column;
    align-items: stretch;
  }
  
  .grade-filter {
    justify-content: center;
  }
  
  .title {
    font-size: 1.5rem;
  }
}
</style>
