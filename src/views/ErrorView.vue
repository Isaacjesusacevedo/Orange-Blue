<template>
  <main class="err-wrap">
    <!-- cartel -->
    <div class="badge">
      <span>ERROR DE CONEXIÓN<br>POR ONDAS ELECTROMAGNÉTICAS</span>
    </div>

    <!-- centro -->
    <section class="panel">
      <h1 class="title glitch" :data-text="headline">{{ headline }}</h1>
      <p class="sub">
        {{ subtitle }}
        <small v-if="code">Código: <strong>{{ code }}</strong></small>
      </p>

      <div class="actions">
        <el-button type="primary" @click="retry">Reintentar</el-button>
        <el-button @click="goHome">Volver al inicio</el-button>
      </div>
    </section>

    <!-- ruido/scanlines -->
    <div class="fx fx--vignette"></div>
    <div class="fx fx--scan"></div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route  = useRoute()

// Puedes pasar ?msg=...&code=... en la navegación
const headline = ref((route.query.msg as string) || 'SEÑAL INTERFERIDA')
const subtitle = ref('El vacío responde con silencio. Verifica tu conexión o intenta nuevamente.')
const code     = ref(route.query.code as string | undefined)

function retry(){
  // intenta recargar la ruta previa si vino con ?next=...
  const next = route.query.next as string | undefined
  if (next) router.replace(next)
  else location.reload()
}
function goHome(){
  router.push({ name: 'home' })
}
</script>
