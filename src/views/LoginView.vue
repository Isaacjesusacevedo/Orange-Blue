<template>
  <section class="login page">
    <Help />
    <div class="card">
      <!-- 👇 icono encima del título -->
      <el-icon size="72" class="login-icon">
        <Suitcase />
      </el-icon>

      <h1 class="glitch" data-text="ACCESO RESTRINGIDO">ACCESO RESTRINGIDO</h1>
      <small class="mono">BASE 03 — [SEÑAL INESTABLE]</small>

      <form class="form" @submit.prevent="onSubmit">
        <label>
          evento
          <input v-model="username" type="text" placeholder="solo el decendiente sabra" />
        </label>
        <label>
          Contraseña
          <input v-model="password" type="password" placeholder="••••" />
        </label>
        <button type="submit">Ingresar</button>
      </form>

      <p v-if="error" class="err">{{ error }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Suitcase } from '@element-plus/icons-vue'
import Help from '@/components/help/HelpEveryone.vue'

const username = ref('')
const password = ref('')
const error = ref('clama el cielo y la tierra')
const router = useRouter()

function onSubmit() {
  if (username.value === 'orangeblue' && password.value === '1652') {
    localStorage.setItem('auth.v1', '1')
    router.push('/')
  } else {
    error.value = 'Credenciales inválidas. No eres el decendiente...'
  }
}
</script>
