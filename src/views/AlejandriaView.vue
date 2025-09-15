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
import CielosHorribles from '@/components/logos/CielosHorribles.png'
import Cerebro from '@/components/logos/Cerebro.png'
import CartaLucian from '@/components/logos/CartaLucian.png'
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
    image: null
  },
  {
  titulo: 'Cerebro humano',
  textos: [
    'Fragmento encefálico conservado en un ánfora sellada hace más de dos milenios.',
    'Los tejidos, lejos de descomponerse, palpitan con un ritmo tenue, como si respondieran a mareas invisibles.',
    'No existe registro de a quién perteneció: no hay cráneo, no hay genealogía, sólo este órgano anónimo que rehúsa morir.',
    'El informe de laboratorio advierte que algunas sinapsis emiten descargas eléctricas espontáneas, con patrones semejantes a un lenguaje cifrado.',
    'Los custodios lo llaman “el huésped sin nombre”.'
  ],
  image: { src: Cerebro, alt:'Cerebro', caption: 'Anomalias y pulsos electricos indican que hay ondas electromacneticas activas' }
},
  {
  titulo: 'Anomalías históricas',
  textos: [
    'En distintos escritos se a registrado sucesos antes del fenomeno: caida de lluvia roja; al secarse dejaron olor férrico y filamentos que imitaban células pero no eran vida.',
    'El cielo se abrió como una herida y las constelaciones se reordenaron por minutos, deletreando nombres que nadie recuerda al despertar.',
    'Monasterios costeros reportaron campanas sonando bajo el mar; las mareas respondieron con intervalos regulares, como latidos.',
    'Manadas enteras alzaron el rostro al cenit y guardaron silencio; a medianoche, sus sombras se estiraron hacia occidente.',
    'Cientos soñaron la misma escalera de cobre ascendiendo a un vacío naranja; al día siguiente hallaron polvo metálico bajo las uñas.',
    'Mapas antiguos registran ciudades que nunca existieron, pero sus ruinas aparecen en fotografías aéreas cada vez que el cielo vira a ámbar.'
  ],
  image: { src: CielosHorribles, alt: 'monstruos', caption: 'Representaciones del firmamento durante episodios de resplandor.' }
},

{
  titulo: 'Lucian de Sangris',
  textos: [
    'En el año 1723 durante la demolición de una mansión olvidada en las afueras de Tracia, los obreros dieron aviso de una cripta subterránea sellada por muros de mármol y símbolos arcaicos.',
    'La Fundación, ya alertada por rumores de que en aquel lugar podían hallarse referencias a la Anomalía, intervino de inmediato antes de que las autoridades locales interfirieran.',
    'Dentro de la cripta fueron recuperados:',
    'Doce monedas de oro corroídas, cada una grabada con un mensaje:',
    '“Espero veros de nuevo, y contaros más aventuras.”',
    'También se halló una carta casi ilegible por el paso del tiempo; se estima que proviene del 312 a.C.',
    'En la carta se puede leer: Yo, Lucian de Sangris, dejo constancia de mi ser, pues ningún otro hombre es digno de narrarlo. Los pobres mortales tiemblan ante el cielo anaranjado, mas yo río, porque ese resplandor no es castigo ni milagro: es espejo, y en él me reconozco único. He visto a sabios balbucear, a clérigos persignarse, a reyes ocultarse tras sus muros… y yo, en cambio, me erijo como quien entiende lo que ninguno osa mirar. Soy el Polimorfo, porque no tengo una sola forma ni un solo rostro. Puedo ser lo que me plazca, y a su tiempo, todos recordarán este nombre. La luz azul, débil para los cobardes, es en mí una voz que me susurra: ‘Tú decides si el mundo avanza o se pudre’. ¿No es acaso un poder reservado a los dioses? Yo, Lucian, lo porto en mi pecho. Si algún día este escrito llega a manos de otro, que lo lean como testimonio de mi grandeza. El fenómeno que los demás llaman maldición es mi corona. Cuando el resplandor ocurra otra vez —y lo hará—, recordad que fue Lucian de Sangris quien lo empujó a continuar. Y si no lo recordáis, peor para vosotros, pues vuestra historia no será más que la sombra de la mía.',
    'Entre los trazos desvaídos se descifra un añadido infantil: ἀγαπῶ σε, πάτερ (Te quiero, padre).'
  ],
  image: {
    src: CartaLucian,
    alt: 'CartaLucian',
    caption: 'El pergamino original atribuido a Lucian de Sangris, con trazos de griego koiné y fragmentos ilegibles por la humedad.'
  }
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
