<script setup>
import { computed } from 'vue'
import GradeBadge from './GradeBadge.vue'
import StatBar from './StatBar.vue'

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

defineEmits(['close'])

const isEquipment = computed(() => props.item.primaryClass === 'protect')
const isAccessory = computed(() => props.item.primaryClass === 'acc')
const isWeapon = computed(() => props.item.primaryClass === 'gun')
const isAmmo = computed(() => props.item.primaryClass === 'ammo')
const isCollectible = computed(() => {
  return !isEquipment.value && !isAccessory.value && !isWeapon.value && !isAmmo.value
})

const ammoDetails = computed(() => {
  if (!isAmmo.value || !props.item.ammoDetail) return []
  const detail = props.item.ammoDetail
  const details = []
  
  if (detail.penetrationLevel !== undefined) {
    details.push({ label: '穿透等级', value: detail.penetrationLevel })
  }
  if (detail.harmRatio !== undefined) {
    details.push({ label: '伤害倍率', value: detail.harmRatio + '%' })
  }
  if (detail.armorHarmLevel) {
    details.push({ label: '护甲伤害', value: detail.armorHarmLevel })
  }
  
  return details
})

const protectDetails = computed(() => {
  if (!isEquipment.value || !props.item.protectDetail) return []
  const detail = props.item.protectDetail
  const details = []
  
  if (detail.durability !== undefined) {
    details.push({ label: '耐久度', value: detail.durability })
  }
  if (detail.protectLevel !== undefined) {
    details.push({ label: '防护等级', value: detail.protectLevel })
  }
  if (detail.capacity !== undefined) {
    details.push({ label: '容量', value: detail.capacity })
  }
  if (detail.aimSpeed?.percent !== undefined) {
    details.push({ label: '瞄准速度', value: detail.aimSpeed.percent + '%' })
  }
  if (detail.moveSpeed?.percent !== undefined) {
    details.push({ label: '移动速度', value: detail.moveSpeed.percent + '%' })
  }
  if (detail.soundEffect?.percent !== undefined) {
    details.push({ label: '拾音能力', value: detail.soundEffect.percent + '%' })
  }
  if (detail.faceMask) {
    details.push({ label: '面部防护', value: detail.faceMask.value || detail.faceMask })
  }
  if (detail.protectArea) {
    details.push({ label: '防护区域', value: detail.protectArea })
  }
  if (detail.repairEfficiency) {
    details.push({ label: '修复效率', value: detail.repairEfficiency })
  }
  
  return details
})

const accessoryStats = computed(() => {
  if (!isAccessory.value || !props.item.accDetail) return []
  const detail = props.item.accDetail
  const stats = []
  
  if (detail.bombCapacity !== undefined) {
    stats.push({ label: '容弹量', value: detail.bombCapacity, max: 100 })
  }
  if (detail.controlSpeed !== undefined) {
    stats.push({ label: '操控速度', value: detail.controlSpeed, max: 10, color: 'red' })
  }
  if (detail.controlStable !== undefined) {
    stats.push({ label: '据枪稳定性', value: detail.controlStable, max: 10, color: 'red' })
  }
  
  return stats
})

const advantages = computed(() => {
  if (!props.item.accDetail?.advantage?.effectList) return []
  return props.item.accDetail.advantage.effectList
})

const disadvantages = computed(() => {
  if (!props.item.accDetail?.disadvantage?.effectList) return []
  return props.item.accDetail.disadvantage.effectList
})

const weaponStats = computed(() => {
  if (!isWeapon.value || !props.item.gunDetail) return []
  const detail = props.item.gunDetail
  const stats = []
  
  if (detail.meatHarm !== undefined) {
    stats.push({ label: '基础伤害', value: detail.meatHarm, max: 100 })
  }
  if (detail.shootDistance !== undefined) {
    stats.push({ label: '优势射程', value: detail.shootDistance, max: 100 })
  }
  if (detail.recoil !== undefined) {
    stats.push({ label: '后坐力控制', value: detail.recoil, max: 100 })
  }
  if (detail.control !== undefined) {
    stats.push({ label: '操控速度', value: detail.control, max: 100 })
  }
  if (detail.stable !== undefined) {
    stats.push({ label: '武器稳定性', value: detail.stable, max: 100 })
  }
  if (detail.hipShot !== undefined) {
    stats.push({ label: '腰射精度', value: detail.hipShot, max: 100 })
  }
  
  return stats
})

const weaponDetails = computed(() => {
  if (!isWeapon.value || !props.item.gunDetail) return []
  const detail = props.item.gunDetail
  const details = []
  
  if (detail.armorHarm !== undefined) {
    details.push({ label: '护甲伤害', value: detail.armorHarm })
  }
  if (detail.fireSpeed !== undefined) {
    details.push({ label: '射速', value: detail.fireSpeed })
  }
  if (detail.capacity !== undefined) {
    details.push({ label: '容量', value: detail.capacity })
  }
  if (detail.fireMode) {
    details.push({ label: '开火模式', value: detail.fireMode })
  }
  if (detail.muzzleVelocity) {
    details.push({ label: '枪口初速', value: detail.muzzleVelocity + ' m/s' })
  }
  if (detail.soundDistance) {
    details.push({ label: '枪声传播', value: detail.soundDistance + ' m' })
  }
  if (detail.caliber) {
    details.push({ label: '口径', value: detail.caliber })
  }
  
  return details
})

const cellValue = computed(() => {
  if (!props.item.avgPrice || !props.item.length || !props.item.width) return 0
  const cells = props.item.length * props.item.width
  if (cells <= 0) return 0
  return Math.round(props.item.avgPrice / cells)
})
</script>

<template>
  <div class="detail-overlay" @click.self="$emit('close')">
    <div class="detail-modal" :style="{ '--accent': accentColor }">
      <button class="close-btn" @click="$emit('close')">&times;</button>
      
      <div class="detail-header">
        <div class="detail-image">
          <img :src="item.pic" :alt="item.objectName" />
        </div>
        <div class="detail-info">
          <div class="detail-meta">
            <GradeBadge :grade="item.grade" />
            <span class="detail-class">{{ item.secondClassCN }}</span>
            <span class="detail-size">{{ item.length }}×{{ item.width }}</span>
          </div>
          <h2 class="detail-title">{{ item.objectName }}</h2>
          <p class="detail-desc">{{ item.desc }}</p>
          <div class="detail-stats-row">
            <span class="stat-item">
              <span class="stat-label">ID</span>
              <span class="stat-value">{{ item.id }}</span>
            </span>
            <span class="stat-item">
              <span class="stat-label">重量</span>
              <span class="stat-value">{{ item.weight }} kg</span>
            </span>
            <span class="stat-item" v-if="item.avgPrice > 0">
              <span class="stat-label">均价</span>
              <span class="stat-value price">{{ item.avgPrice.toLocaleString() }}</span>
            </span>
            <span class="stat-item" v-if="isCollectible && cellValue > 0">
              <span class="stat-label">单格价值</span>
              <span class="stat-value price">{{ cellValue.toLocaleString() }}</span>
            </span>
          </div>
        </div>
      </div>

      <div class="detail-body" v-if="isEquipment">
        <h3 class="section-title">防护属性</h3>
        <div class="protect-details" v-if="protectDetails.length > 0">
          <div v-for="detail in protectDetails" :key="detail.label" class="detail-item">
            <span class="detail-label">{{ detail.label }}</span>
            <span class="detail-value">{{ detail.value }}</span>
          </div>
        </div>
      </div>

      <div class="detail-body" v-if="isAccessory">
        <div class="stats-grid" v-if="accessoryStats.length > 0">
          <div v-for="stat in accessoryStats" :key="stat.label" class="stat-row">
            <span class="stat-name">{{ stat.label }}</span>
            <div class="stat-bar-container">
              <div class="stat-bar-bg">
                <div 
                  class="stat-bar-fill" 
                  :style="{ 
                    width: `${Math.abs(stat.value) / stat.max * 100}%`,
                    backgroundColor: stat.value > 0 ? '#00ff41' : '#ff4444'
                  }"
                ></div>
              </div>
              <span class="stat-num">{{ stat.value }}</span>
            </div>
          </div>
        </div>

        <div class="effects-section" v-if="advantages.length > 0 || disadvantages.length > 0">
          <div class="effect-group" v-if="advantages.length > 0">
            <h4 class="effect-title advantage">优势</h4>
            <div class="effect-list">
              <div v-for="(eff, idx) in advantages" :key="idx" class="effect-item advantage">
                <span class="effect-dot"></span>
                {{ eff.value }}
              </div>
            </div>
          </div>
          
          <div class="effect-group" v-if="disadvantages.length > 0">
            <h4 class="effect-title disadvantage">劣势</h4>
            <div class="effect-list">
              <div v-for="(eff, idx) in disadvantages" :key="idx" class="effect-item disadvantage">
                <span class="effect-dot"></span>
                {{ eff.value }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="detail-body" v-if="isWeapon">
        <h3 class="section-title">武器属性</h3>
        <div class="stats-grid">
          <div v-for="stat in weaponStats" :key="stat.label" class="stat-row">
            <span class="stat-name">{{ stat.label }}</span>
            <div class="stat-bar-container">
              <div class="stat-bar-bg">
                <div 
                  class="stat-bar-fill" 
                  :style="{ 
                    width: `${Math.abs(stat.value) / stat.max * 100}%`,
                    backgroundColor: '#00ff41'
                  }"
                ></div>
              </div>
              <span class="stat-num">{{ stat.value }}</span>
            </div>
          </div>
        </div>
        
        <div class="protect-details" v-if="weaponDetails.length > 0">
          <div v-for="detail in weaponDetails" :key="detail.label" class="detail-item">
            <span class="detail-label">{{ detail.label }}</span>
            <span class="detail-value">{{ detail.value }}</span>
          </div>
        </div>
      </div>

      <div class="detail-body" v-if="isAmmo">
        <h3 class="section-title">弹药属性</h3>
        <div class="protect-details" v-if="ammoDetails.length > 0">
          <div v-for="detail in ammoDetails" :key="detail.label" class="detail-item">
            <span class="detail-label">{{ detail.label }}</span>
            <span class="detail-value">{{ detail.value }}</span>
          </div>
        </div>
      </div>

      <div class="detail-footer">
        <span class="object-id">OBJECT ID: {{ item.objectID }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.detail-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.detail-modal {
  position: relative;
  background: linear-gradient(135deg, rgba(20, 30, 25, 0.98), rgba(10, 15, 12, 0.99));
  border: 1px solid var(--accent);
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 0 50px color-mix(in srgb, var(--accent) 30%, transparent);
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #888;
  font-size: 24px;
  width: 36px;
  height: 36px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.detail-header {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 25px;
  padding: 30px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.detail-image {
  background: rgba(0, 0, 0, 0.4);
  padding: 20px;
}

.detail-image img {
  width: 100%;
  height: 200px;
  object-fit: contain;
}

.detail-meta {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 15px;
  flex-wrap: wrap;
}

.detail-class {
  padding: 3px 10px;
  background: var(--accent);
  color: #000;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 1px;
}

.detail-size {
  font-size: 0.75rem;
  color: #6a7a6a;
  font-family: 'JetBrains Mono', monospace;
  padding: 2px 6px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.detail-title {
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 10px;
  font-weight: 600;
}

.detail-desc {
  color: #8a9a8a;
  line-height: 1.6;
  margin-bottom: 15px;
}

.detail-stats-row {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-item .stat-label {
  font-size: 0.7rem;
  color: #6a7a6a;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.stat-item .stat-value {
  font-family: 'JetBrains Mono', monospace;
  color: #fff;
}

.stat-item .stat-value.price {
  color: #ffd700;
}

.detail-body {
  padding: 25px 30px;
}

.section-title {
  font-size: 0.9rem;
  color: var(--accent);
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-family: 'JetBrains Mono', monospace;
}

.stats-grid {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
}

.stat-row {
  display: flex;
  align-items: center;
  gap: 15px;
}

.stat-name {
  min-width: 80px;
  font-size: 0.8rem;
  color: #8a9a8a;
}

.stat-bar-container {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
}

.stat-bar-bg {
  flex: 1;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
}

.stat-bar-fill {
  height: 100%;
  transition: width 0.3s;
}

.stat-num {
  min-width: 40px;
  text-align: right;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
  color: #fff;
}

.protect-details {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
  padding-top: 15px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.detail-label {
  font-size: 0.7rem;
  color: #6a7a6a;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.detail-value {
  font-size: 0.85rem;
  color: #fff;
}

.effects-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
}

.effect-title {
  font-size: 0.85rem;
  margin-bottom: 12px;
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 1px;
}

.effect-title.advantage {
  color: #00ff41;
}

.effect-title.disadvantage {
  color: #ff4444;
}

.effect-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.effect-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.85rem;
  color: #c4c4c4;
}

.effect-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.effect-item.advantage .effect-dot {
  background: #00ff41;
  box-shadow: 0 0 8px #00ff41;
}

.effect-item.disadvantage .effect-dot {
  background: #ff4444;
  box-shadow: 0 0 8px #ff4444;
}

.detail-footer {
  padding: 15px 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
}

.object-id {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  color: #4a5a4a;
  letter-spacing: 2px;
}

@media (max-width: 700px) {
  .detail-header {
    grid-template-columns: 1fr;
  }
  
  .effects-section {
    grid-template-columns: 1fr;
  }
}
</style>
