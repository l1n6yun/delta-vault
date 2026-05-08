<script setup>
import { computed } from 'vue'
import GradeBadge from './GradeBadge.vue'

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  accentColor: {
    type: String,
    default: '#00ff41'
  }
})

defineEmits(['click'])

const cellValue = computed(() => {
  if (!props.item.avgPrice || !props.item.length || !props.item.width) return 0
  const cells = props.item.length * props.item.width
  if (cells <= 0) return 0
  return Math.round(props.item.avgPrice / cells)
})
</script>

<template>
  <div class="item-card" @click="$emit('click', item)" :style="{ '--accent': accentColor }">
    <div class="card-image">
      <img :src="item.prePic || item.pic" :alt="item.objectName" loading="lazy" />
      <div class="card-overlay"></div>
    </div>
    <div class="card-content">
      <div class="card-header">
        <GradeBadge :grade="item.grade" />
        <span class="card-size">{{ item.length }}×{{ item.width }}</span>
      </div>
      <h3 class="card-title">{{ item.objectName }}</h3>
      <p class="card-desc" v-if="item.desc">{{ item.desc }}</p>
      <div class="card-footer">
        <div class="card-prices" v-if="item.avgPrice > 0">
          <span class="card-price">{{ item.avgPrice.toLocaleString() }}</span>
          <span class="card-cell-value" v-if="cellValue > 0">/{{ cellValue.toLocaleString() }}</span>
        </div>
        <span class="card-weight">{{ item.weight }} kg</span>
      </div>
    </div>
    <div class="card-glow"></div>
  </div>
</template>

<style scoped>
.item-card {
  position: relative;
  background: linear-gradient(135deg, rgba(20, 30, 25, 0.95), rgba(10, 15, 12, 0.98));
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
}

.item-card:hover {
  border-color: var(--accent);
  transform: translateY(-5px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5), 0 0 20px color-mix(in srgb, var(--accent) 30%, transparent);
}

.item-card:hover .card-glow {
  opacity: 1;
}

.item-card:hover .card-image img {
  transform: scale(1.05);
}

.card-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: linear-gradient(to bottom, color-mix(in srgb, var(--accent) 20%, transparent), transparent);
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
}

.card-image {
  position: relative;
  width: 100%;
  height: 160px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.3);
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 15px;
  transition: transform 0.3s;
}

.card-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 30px;
  background: linear-gradient(to top, rgba(10, 15, 12, 0.9), transparent);
}

.card-content {
  padding: 15px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.card-size {
  font-size: 0.7rem;
  color: #6a7a6a;
  font-family: 'JetBrains Mono', monospace;
  padding: 2px 6px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.card-title {
  font-size: 0.95rem;
  color: #fff;
  margin-bottom: 8px;
  line-height: 1.3;
  font-weight: 500;
}

.card-desc {
  font-size: 0.75rem;
  color: #6a7a6a;
  line-height: 1.4;
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.card-prices {
  display: flex;
  align-items: baseline;
  gap: 2px;
}

.card-price {
  font-size: 0.8rem;
  color: #ffd700;
  font-family: 'JetBrains Mono', monospace;
}

.card-cell-value {
  font-size: 0.65rem;
  color: #ff9f43;
  font-family: 'JetBrains Mono', monospace;
}

.card-weight {
  font-size: 0.7rem;
  color: #6a7a6a;
  font-family: 'JetBrains Mono', monospace;
}
</style>
