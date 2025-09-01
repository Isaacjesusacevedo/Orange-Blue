<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
    <NavBar />
  <RouterView />
</template>

<style scoped>
#app {
  display: flex;
  place-items: center;
}
body {
  margin: 0;
}
</style>
