<!-- Navbar.vue -->

<template>
  <nav class="bg-blue-500 p-4 h-16 flex flex-col justify-center items-center">
    <ul class="flex space-x-8">
      <li><router-link to="/" class="text-white hover:text-white/70 text-xl">Inicio</router-link></li>
      <li><router-link to="/hotel" class="text-white hover:text-white/70 text-xl">Hoteles</router-link></li>
      <li><router-link to="/resumen" class="text-white hover:text-white/70 text-xl">Resumen</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Navbar'
};
</script>
