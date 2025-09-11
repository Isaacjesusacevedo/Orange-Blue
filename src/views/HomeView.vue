<template>
  <main class="outer-frame">
    <!-- Cartel superior izquierdo -->
    <div class="status-badge">
      <span>Error de conexión por<br>ondas electromagnéticas</span>
      <p class="message">{{ currentMessage }}</p>
    </div>

    <!-- Riel izquierdo -->
    <nav class="rail rail--left">
      <template v-for="(btn, i) in leftButtons" :key="'left-' + i">
        <router-link v-if="btn.to" class="slot" :to="btn.to">
          <button class="slot__btn" :title="btn.label">
            <el-icon v-if="btn.component" class="el-icon-xl" size="50">
              <component :is="btn.component" />
            </el-icon>
            <img v-else-if="btn.icon" :src="btn.icon" :alt="btn.label" />
          </button>
        </router-link>
        <button v-else class="slot" :title="btn.label" @click="onAction(btn.action)">
          <span class="slot__btn">
            <el-icon v-if="btn.component" class="el-icon-xl">
              <component :is="btn.component" />
            </el-icon>
            <img v-else-if="btn.icon" :src="btn.icon" :alt="btn.label" />
          </span>
        </button>
      </template>
    </nav>

    <!-- Panel central -->
    <section class="center-wrap">
  <div class="center-panel">
    <!-- Video: solo visible mientras NO se mostró el remember -->
    <transition name="fade-video">
      <video
        v-if="!showRemember"
        ref="player"
        :src="videoSrc"
        autoplay
        muted
        playsinline
        @ended="showRemember = true"
      ></video>
    </transition>

    <!-- Mensaje con glitch -->
    <transition name="fade-remember">
      <p
        v-if="showRemember"
        class="remember glitch"
        :data-text="rememberText"
      >
        {{ rememberText }}
      </p>
    </transition>
  </div>
</section>

    <!-- Riel derecho -->
    <nav class="rail rail--right">
      <template v-for="(btn, i) in rightButtons" :key="'right-' + i">
        <router-link v-if="btn.to" class="slot" :to="btn.to">
          <button class="slot__btn" :title="btn.label">
            <el-icon v-if="btn.component" class="el-icon-xl" size="50">
              <component :is="btn.component" />
            </el-icon>
            <img v-else-if="btn.icon" :src="btn.icon" :alt="btn.label" />
          </button>
        </router-link>
        <button v-else class="slot" :title="btn.label" @click="onAction(btn.action)">
          <span class="slot__btn">
            <el-icon v-if="btn.component" class="el-icon-xl">
              <component :is="btn.component" />
            </el-icon>
            <img v-else-if="btn.icon" :src="btn.icon" :alt="btn.label" />
          </span>
        </button>
      </template>
    </nav>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, type Component } from 'vue'
import { useRouter } from 'vue-router'
import { Document, VideoPlay, Lock, Hide, Location, Coordinate, Notebook } from '@element-plus/icons-vue'

const showRemember = ref(false)
const rememberText = 'RECUERDA'

const videoSrc = new URL('../components/logos/Reporte1.mp4', import.meta.url).href

/* Mensajes rotativos */
const messages = ['No', 'mires', 'el', 'cielo']
const currentMessage = ref(messages[0])
onMounted(() => {
  let i = 0
  setInterval(() => {
    i = (i + 1) % messages.length
    currentMessage.value = messages[i]
  }, 900)
})

type Btn = {
  label: string
  action: string
  icon?: string
  component?: Component
  to?: string
}

const leftButtons: Btn[] = [
  { label: 'Satelites',  component: Location as Component,  action: 'satelites',  to: '/satelites' },
  { label: 'Mapeados',   component: Coordinate as Component, action: 'mapeados',   to: '/mapeados' },
  { label: 'Alejandria', component: Notebook as Component,   action: 'alejandria', to: '/alejandria' },
]

const rightButtons: Btn[] = [
  { label: 'Documento',   component: Document as Component,  action: 'documento',   to: '/documentos' },
  { label: 'Video',       component: VideoPlay as Component, action: 'video',       to: '/video' },
  { label: 'Encriptados', component: Lock as Component,      action: 'encriptados', to: '/encriptados' },
  { label: 'Medicina',    component: Hide as Component,      action: 'medicina',    to: '/medicina' },
]

const router = useRouter()
function onAction(action: string) {
  const routeMap: Record<string, string> = {
    documento: '/documentos',
    video: '/video',
    terminal: '/encriptados',
    inyeccion: '/inyeccion',
    satelites: '/buscar',
    mapa: '/mapa',
    bitacora: '/bitacora'
  }
  if (routeMap[action]) router.push(routeMap[action])
}
</script>
