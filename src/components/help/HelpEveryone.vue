<template>
  <div>
    <transition-group name="fade" tag="div">
      <div
        v-for="m in messages"
        :key="m.id"
        class="help-message"
        :style="{ top: m.y+'%', left: m.x+'%' }"
      >
        <RouterLink :to="{ name: 'Pergaminos' }">
          {{ m.text }}
        </RouterLink>
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'

type Msg = { id: number; text: string; x: number; y: number }

const pool = [
  'TE ODIO','CREO EN TI','MUERETE','NO TE RINDAS','NO LLEGARAS','FALTAS TU',
  'NO MIRES EL CEREBRO','ESTE NO ES EL PRIMERO','LOS PACILLOS SUBTERRANEOS EST',
  'BUSCA LA CAPITAL','NO MIRES EL CIELO','CANAL 03 — SIN RESPUESTA'
]

const messages = ref<Msg[]>([])
let counter = 0
let timer: number | undefined

function spawnMessage() {
  const text = pool[Math.floor(Math.random() * pool.length)]
  const x = Math.floor(Math.random() * 90)
  const y = Math.floor(Math.random() * 90)
  const id = counter++
  messages.value.push({ id, text, x, y })
  setTimeout(() => {
    messages.value = messages.value.filter(m => m.id !== id)
  }, 4500)
}

onMounted(() => { timer = window.setInterval(spawnMessage, 1000) })
onUnmounted(() => { if (timer) clearInterval(timer) })
</script>

<style scoped>
.help-message {
  position: fixed;
  font-size: 0.60rem;
  font-family: monospace;
  opacity: 0.8;
  text-shadow: 0 0 6px rgb(106, 60, 12);
  transform: translate(-50%, -50%);
  z-index: 9999;
  pointer-events: auto;
}
.help-message a{
  text-decoration: none;
  color: aliceblue;
  padding: 6px 10px;
  display: inline-block;
}
.fade-enter-active, .fade-leave-active { transition: opacity 0.8s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
