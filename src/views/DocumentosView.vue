<template>
  <el-card class="doc-shell" shadow="hover">
    <header class="doc-header">
      <h2>DOCUMENTO</h2>
      <div class="doc-badge">Leer bajo los acuerdos de la sangre</div>
    </header>

    <div class="doc-frame">
      <iframe :src="finalSrc" title="Informe Clasificado" class="pdf-iframe"></iframe>
      <object :data="finalSrc" type="application/pdf" class="pdf-iframe">
        <a :href="finalSrc" target="_blank" rel="noopener">Abrir documento</a>
      </object>
    </div>

    <footer class="doc-footer">
      <small>DOCUMENTO CLASIFICADO • DIFUSIÓN PROHIBIDA • NIVEL Ω</small>
    </footer>
  </el-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
// importa el asset desde src (nota: ruta RELATIVA al .vue actual)
import pdfBundled from '../components/logos/CLASIFICADO.pdf'

// si además quieres permitir que el padre pase un src, lo priorizas:
const props = defineProps<{ src?: string }>()
const finalSrc = computed(() => (props.src && props.src.trim()) ? props.src : pdfBundled)
</script>


<style scoped>
.doc-shell{
  background: radial-gradient(1200px 600px at 75% 60%, #1a1412 0%, #0d0f12 60%, #0a0c0e 100%);
  border: 1px solid rgba(255,255,255,.08);
  color: #e8e6e3;
  padding: 0;
}

.doc-header{
  display:flex; align-items:center; justify-content:space-between;
  padding: 16px 20px;
}
.doc-header h2{
  margin:0; letter-spacing:.04em; font-weight:800; text-transform:uppercase;
}
.doc-badge{
  font-size:.8rem; padding:8px 12px;
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(255,255,255,.08);
  box-shadow: 0 0 24px rgba(255,120,0,.07) inset, 0 0 12px rgba(255,120,0,.06);
  backdrop-filter: blur(2px);
}

.doc-frame{
  height: calc(100vh - 220px); /* ajusta según tu layout/nav */
  margin: 0 20px 20px;
  border: 1px solid rgba(255,255,255,.08);
  box-shadow: 0 0 0 1px rgba(255,255,255,.03) inset, 0 0 60px rgba(255,120,0,.05) inset;
  position: relative;
  overflow: hidden;
}

.pdf-iframe{
  width:100%; height:100%; border:0;
  filter: contrast(1.02) saturate(1.02);
}

.doc-empty{
  display:grid; place-items:center; height:100%;
  font-weight:700; letter-spacing:.08em; text-transform:uppercase;
  color: rgba(255,255,255,.6);
}

.doc-footer{
  padding: 10px 20px 16px; text-align:center; opacity:.75;
  border-top: 1px solid rgba(255,255,255,.06);
}
</style>
