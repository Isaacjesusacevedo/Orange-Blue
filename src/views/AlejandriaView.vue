<template>
  <section class="cards">
  <article class="card" v-for="(carta, i) in cartas" :key="i" :class="{ open: openIndex === i }">
    <header class="card-header" @click="toggle(i)">
      <h2>{{ carta.titulo }}</h2>
      <el-icon class="arrow" :class="{ open: openIndex === i }"><ArrowDown /></el-icon>
    </header>

    <!-- cuerpo en overlay absoluto: no altera el alto de la card -->
    <div class="card-body" v-show="openIndex === i">
      <p v-for="(texto, j) in carta.textos" :key="j">{{ texto }}</p>
    </div>
  </article>
</section>

</template>
<script setup lang="ts">
import { ref } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'

const openIndex = ref<number|null>(null)
const toggle = (i:number) => { openIndex.value = openIndex.value === i ? null : i }

const cartas = [
  {
    titulo: 'La sangre del que fluye',
    textos: [
      '“Los buenos hombres nacen entre la tierra y el cielo; los malos, entre el cielo y el infierno...”',
      '“Los mortales son piezas en un ajedrez cuyo objetivo no es la victoria, sino el roce...”',
      '“Los dioses moran en el vacío y los hombres en la carne...”',
      '“La esperanza germina en quienes lo han perdido todo...”',
      'Sujeto Número [ ] [ ] [ ] Yeshu'
    ]
  },
  {
    titulo: 'Cerebeo humano',
    textos: [
      'Cerebro humano conservado hace 2500 años. El informe menciona que aún late débilmente...'
    ]
  },
  {
    titulo: 'Anomalías históricas',
    textos: [
      'Fenómenos imposibles de explicar: lluvias rojas como sangre, cielos ardientes, desaparición de satélites...'
    ]
  }
]

</script>
