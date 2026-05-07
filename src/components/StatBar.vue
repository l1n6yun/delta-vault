<script setup>
defineProps({
  value: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 5
  },
  color: {
    type: String,
    default: 'green'
  },
  label: {
    type: String,
    default: ''
  }
})

const getColor = (color, index) => {
  const colors = {
    green: '#00ff41',
    red: '#ff4444',
    yellow: '#ffd700'
  }
  return colors[color] || colors.green
}
</script>

<template>
  <div class="stat-bar" v-if="value !== 0">
    <span class="stat-label" v-if="label">{{ label }}</span>
    <div class="battery-container">
      <div
        v-for="i in max"
        :key="i"
        class="battery-cell"
        :class="{
          filled: i <= Math.abs(value),
          positive: value > 0,
          negative: value < 0
        }"
        :style="{
          backgroundColor: i <= Math.abs(value)
            ? (value > 0 ? '#00ff41' : '#ff4444')
            : 'rgba(255,255,255,0.1)'
        }"
      ></div>
    </div>
    <span class="stat-value" :style="{ color: value > 0 ? '#00ff41' : '#ff4444' }">
      {{ value > 0 ? '+' : '' }}{{ value }}
    </span>
  </div>
</template>

<style scoped>
.stat-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.75rem;
}

.stat-label {
  min-width: 60px;
  color: #6a7a6a;
}

.battery-container {
  display: flex;
  gap: 2px;
}

.battery-cell {
  width: 12px;
  height: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.2s;
}

.stat-value {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  min-width: 30px;
}
</style>
