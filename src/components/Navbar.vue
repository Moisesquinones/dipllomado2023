<!-- Navbar.vue -->

<template>
  <nav class="bg-blue-500 p-4">
    <ul class="flex space-x-4">
      <li><router-link to="/" class="text-white">Inicio</router-link></li>
      <li><router-link to="/hotel" class="text-white">Hoteles</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Navbar'
};
</script>
