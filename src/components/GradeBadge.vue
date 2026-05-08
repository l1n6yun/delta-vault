<script setup>
defineProps({
  grade: {
    type: Number,
    required: true
  }
})

const gradeColors = {
  1: '#6a7a6a',
  2: '#5a8a3a',
  3: '#4a7a9a',
  4: '#8a7a2a',
  5: '#aa5a2a',
  6: '#ca2a4a'
}

const gradeNames = {
  1: '普通',
  2: '优秀',
  3: '精良',
  4: '史诗',
  5: '传说',
  6: '神话'
}
</script>

<template>
  <span
    class="grade-badge"
    :style="{
      backgroundColor: gradeColors[grade] + '20',
      borderColor: gradeColors[grade],
      color: gradeColors[grade]
    }"
  >
    {{ gradeNames[grade] || '普通' }}
  </span>
</template>

<style scoped>
.grade-badge {
  display: inline-block;
  padding: 3px 8px;
  border: 1px solid;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 1px;
  font-family: 'JetBrains Mono', monospace;
}
</style>
