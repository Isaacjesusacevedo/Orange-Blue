<template>
  <div>
    <transition-group name="fade" tag="div">
      <div
        v-for="m in messages"
        :key="m.id"
        class="help-message"
        :style="{ top: m.y+'%', left: m.x+'%' }"
      >
        <a
          href="https://www.youtube.com/watch?v=APfszb7_y7Y&list=RDAPfszb7_y7Y&start_radio=1"
          target="_blank"
          rel="noopener"
        >
          {{ m.text }}
        </a>
      </div>
    </transition-group>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue'

/** Tipo de mensaje */
type Msg = { id: number; text: string; x: number; y: number }

/** Lista de frases que van a aparecer */
const pool = [
  'TE ODIO',
  'CREO EN TI',
  'MUERETE',
  'NO TE RINDAS',
  'NO LLEGARAS',
  'FALTAS TU',
  'NO MIRES EL CEREBRO',
  'ESTE NO ES EL PRIMERO',
  'LOS PACILLOS SUBTERRANEOS EST',
  'BUSCA LA CAPITAL',
  'NO MIRES EL CIELO',
  'CANAL 03 — SIN RESPUESTA'
]

const messages = ref<Msg[]>([])
let counter = 0

function spawnMessage() {
  const text = pool[Math.floor(Math.random() * pool.length)]
  const x = Math.floor(Math.random() * 90)   // posición horizontal en % (0–90%)
  const y = Math.floor(Math.random() * 90)   // posición vertical en % (0–90%)
  const id = counter++

  messages.value.push({ id, text, x, y })

  // Se elimina después de 2 segundos
  setTimeout(() => {
    messages.value = messages.value.filter(m => m.id !== id)
  }, 500)
}

onMounted(() => {
  // Cada 3 segundos aparece uno
  setInterval(spawnMessage, 400)
})
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
