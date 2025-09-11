<template>
  <main class="alejandria-bg">
    <section class="folio">
      <section class="cards">
        <article class="card" v-for="(carta, i) in cartas" :key="i">
          <header class="card-header">
            <h2>{{ carta.titulo }}</h2>
            <button class="card-button card-button--primary" @click.stop="openFS(i)">
              Leer documento
            </button>
          </header>
        </article>
      </section>
    </section>
  </main>

  <!-- Overlay full-screen -->
  <teleport to="body">
    <transition name="veil">
      <div v-if="current" class="fs-overlay" tabindex="0" @keydown.esc="closeFS">
        <div class="fs-backdrop" @click="closeFS"></div>

        <section class="fs-panel" role="dialog" aria-modal="true">
          <header class="fs-header">
            <h3>{{ current.titulo }}</h3>
            <button class="card-button card-button--icon" @click="closeFS" aria-label="Cerrar">✕</button>
          </header>

          <div class="fs-content">
            <p v-for="(t, j) in current.textos" :key="j">{{ t }}</p>

            <!-- Imagen única (si existe) -->
            <figure v-if="current.image" class="fs-media">
              <img
                :src="current.image.src"
                :alt="current.image.alt || current.titulo"
                loading="lazy"
              />
              <figcaption v-if="current.image?.caption">
                {{ current.image.caption }}
              </figcaption>
            </figure>
          </div>
        </section>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeUnmount } from 'vue'
import LAG1 from '@/components/logos/LAG1.png'
import MundoDeMonstruos from '@/components/logos/MundoDeMonstruos.webp'

// Tipos
type CartaImage = {
  src: string
  alt?: string
  caption?: string
}
type Carta = {
  titulo: string
  textos: string[]
  image?: CartaImage | null
}

const fsIndex = ref<number|null>(null)
const cartas = ref<Carta[]>([
  {
    titulo: 'La sangre del que fluye',
    textos: [
      '“Los buenos hombres nacen entre la tierra y el cielo; los malos, entre el cielo y el infierno...”',
      '“Los mortales son piezas en un ajedrez cuyo objetivo no es la victoria, sino el roce...”',
      '“Los dioses moran en el vacío y los hombres en la carne...”',
      '“La esperanza germina en quienes lo han perdido todo...”',
      'Sujeto Número [ ] [ ] [ ] Yeshu'
    ],
    image: { src: LAG1, alt: 'Corte axial' }
  },
  {
    titulo: 'Cerebeo humano',
    textos: ['Cerebro humano conservado hace 2500 años. El informe menciona que aún late débilmente...'],
    image: null
  },
  {
    titulo: 'Anomalías históricas',
    textos: ['Fenómenos imposibles de explicar: lluvias rojas como sangre, cielos ardientes, desaparición de satélites...'],
    image: { src: MundoDeMonstruos, alt: 'montruos'}
  },
  {
    titulo: 'Lucian de sangris',
    textos: ['Yo, Lucian de Sangris, dejo constancia de mi ser, pues ningún otro hombre es digno de narrarlo.Los pobres mortales tiemblan ante el cielo anaranjado, mas yo río, porque ese resplandor no es castigo ni milagro: es espejo, y en él me reconozco único. He visto a sabios balbucear, a clérigos persignarse, a reyes ocultarse tras sus muros… y yo, en cambio, me erijo como quien entiende lo que ninguno osa mirar. Soy el Polimorfo, porque no tengo una sola forma ni un solo rostro. Puedo ser lo que me plazca, y a su tiempo, todos recordarán este nombre.La luz azul, débil para los cobardes, es en mí una voz que me susurra: ‘Tú decides si el mundo avanza o se pudre’. ¿No es acaso un poder reservado a los dioses? Yo, Lucian, lo porto en mi pecho. Si algún día este escrito llega a manos de otro, que lo lean como testimonio de mi grandeza. El fenómeno que los demás llaman maldición es mi corona. Cuando el resplandor ocurra otra vez —y lo hara—, recordad que fue Lucian de Sangris quien lo empujó a continuar. Y si no lo recordáis, peor para vosotros, pues vuestra historia no será más que la sombra de la mía'],
    image: null
  }
])

const current = computed<Carta | null>(() =>
  fsIndex.value !== null ? cartas.value[fsIndex.value] : null
)

const openFS = (i:number) => {
  fsIndex.value = i
  requestAnimationFrame(() => {
    (document.querySelector('.fs-overlay') as HTMLElement)?.focus()
  })
  document.documentElement.style.overflow = 'hidden'
}
const closeFS = () => {
  fsIndex.value = null
  document.documentElement.style.overflow = ''
}
onBeforeUnmount(() => { document.documentElement.style.overflow = '' })
</script>

<style scoped src="@/assets/css/alejandria.css"></style>
