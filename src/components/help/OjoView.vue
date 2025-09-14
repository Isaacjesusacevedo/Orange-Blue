<template>
  <div>
    <transition-group name="fade" tag="div">
      <div
        v-for="m in messages"
        :key="m.id"
        class="Ojo-message"
        :style="{ top: m.y+'%', left: m.x+'%' }"
      >
        <a
          href="https://www.youtube.com/watch?v=aNXmtBJbt3E&t=2s"
          target="_blank"
          rel="noopener"
        >
          <el-icon class="el-icon-xl">
            <View />
          </el-icon>
        </a>
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElIcon } from 'element-plus'
import { View } from '@element-plus/icons-vue'

type Msg = { id: number; x: number; y: number }

const messages = ref<Msg[]>([])
let counter = 0

function spawnMessage() {
  const x = Math.floor(Math.random() * 90)
  const y = Math.floor(Math.random() * 90)
  const id = counter++

  messages.value.push({ id, x, y })
  setTimeout(() => {
    messages.value = messages.value.filter(m => m.id !== id)
  }, 1000)
}

onMounted(() => {
  setInterval(spawnMessage, 5000)
})
</script>

<style scoped>
.Ojo-message {
  position: fixed;
  transform: translate(-50%, -50%);
  z-index: 9999;
  pointer-events: auto;
}

.el-icon-xl {
  font-size: 10px;
  color: #2a2828;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
