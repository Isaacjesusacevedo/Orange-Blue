<template>
  <main class="Pergamino-bg perga-stage">
    <!-- wrapper que define el ancho real del carrusel -->
    <div class="perga-wrap">
      <el-carousel
        ref="carousel"
        height="88vh"
        :autoplay="false"
        :loop="true"
        indicator-position="outside"
        arrow="never"
        @change="onChange"
      >
        <el-carousel-item v-for="(p,i) in pergaminos" :key="p.alt">
          <div class="perga-center">
            <img class="perga-img" :src="p.src" :alt="p.alt" @click="openPreview(i)" />
            <button class="zoom" @click="openPreview(i)" aria-label="Ampliar">
              <el-icon><Search /></el-icon>
            </button>
          </div>
        </el-carousel-item>
      </el-carousel>

      <!-- Flechas flotantes (relativas al wrapper) -->
      <button class="nav nav--prev" @click="prev" aria-label="Anterior">
        <el-icon><ArrowLeft /></el-icon>
      </button>
      <button class="nav nav--next" @click="next" aria-label="Siguiente">
        <el-icon><ArrowRight /></el-icon>
      </button>
    </div>

    <!-- Visor a pantalla completa -->
    <el-image-viewer
      v-if="viewerVisible"
      :url-list="srcList"
      :initial-index="activeIndex"
      hide-on-click-modal
      teleported
      @close="viewerVisible = false"
    />
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElCarousel, ElImageViewer } from 'element-plus'
import { ArrowLeft, ArrowRight, Search } from '@element-plus/icons-vue'

const carousel = ref<InstanceType<typeof ElCarousel> | null>(null)
const activeIndex = ref(0)
const viewerVisible = ref(false)

const pergaminos = [
  { src: new URL('@/components/logos/1.png', import.meta.url).href, alt: 'Pergamino 1' },
  { src: new URL('@/components/logos/2.png', import.meta.url).href, alt: 'Pergamino 2' },
  { src: new URL('@/components/logos/3.png', import.meta.url).href, alt: 'Pergamino 3' },
]
const srcList = pergaminos.map(p => p.src)

const onChange = (current: number) => { activeIndex.value = current }
const openPreview = (i: number) => { activeIndex.value = i; viewerVisible.value = true }
const next = () => carousel.value?.next()
const prev = () => carousel.value?.prev()
</script>

<style scoped>
/* 1) La escena ocupa toda la pantalla y centra el wrapper */
.perga-stage{
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding-inline: clamp(8px, 2vw, 24px);
}

/* 2) Wrapper con ancho útil (centrado) */
.perga-wrap{
  position: relative;
  width: min(96vw, 1200px);   /* 👈 evita “franja” angosta */
  margin: 0 auto;
}

/* 3) Asegura que el carrusel ocupe todo el ancho del wrapper */
.perga-wrap :deep(.el-carousel){ width: 100%; }
.perga-wrap :deep(.el-carousel__container){ width: 100%; }  /* no tocar display */

/* 4) Centrado del contenido de cada slide */
.perga-center{
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;   /* vertical */
  justify-content: center; /* horizontal */
  position: relative;
}

/* 5) Imagen grande y cercana, sin recorte */
.perga-img{
  max-height: 84vh;
  max-width: 100%;      /* 👈 relativo al wrapper */
  width: auto;
  height: auto;
  display: block;
  border-radius: 14px;
  box-shadow: 0 14px 36px rgba(0,0,0,.55);
  user-select: none;
  cursor: zoom-in;
  transition: transform .15s ease, box-shadow .15s ease;
}
.perga-img:hover{ transform: scale(1.02); box-shadow: 0 18px 44px rgba(0,0,0,.65); }

/* 6) Lupa */
.zoom{
  position: absolute;
  right: clamp(10px, 2vw, 22px);
  bottom: clamp(10px, 2vw, 22px);
  width: 52px; height: 52px; border-radius: 50%;
  display: grid; place-items: center;
  border: 2px solid rgba(255,255,255,.12);
  background: rgba(15,16,22,.78);
  cursor: pointer; opacity: .9;
  transition: transform .12s ease, box-shadow .12s ease, border-color .12s ease, opacity .12s ease;
}
.zoom:hover{ transform: scale(1.05); border-color: rgba(255,140,80,.35); box-shadow: 0 0 18px rgba(255,106,0,.18); }

/* 7) Flechas relativas al wrapper (no a toda la pantalla) */
.nav{
  position: absolute;
  top: 50%; transform: translateY(-50%);
  width: 56px; height: 56px; border-radius: 50%;
  display: grid; place-items: center;
  border: 2px solid rgba(255,255,255,.12);
  background: rgba(15,16,22,.82); cursor: pointer;
  transition: transform .12s ease, box-shadow .12s ease, border-color .12s ease;
}
.nav--prev{ left: clamp(10px, 2vw, 22px); }
.nav--next{ right: clamp(10px, 2vw, 22px); }
.nav:hover{ transform: translateY(-50%) scale(1.04); border-color: rgba(255,140,80,.35); box-shadow: 0 0 18px rgba(255,106,0,.18); }

/* Indicador activo con resplandor anómalo */
:deep(.el-carousel__indicator.is-active button){ background-color: #ff6a00; }
</style>
