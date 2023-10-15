<template>
    <div class="p-44 flex">
        <div v-for="(hotel, index) in hoteles" :key="index">
            <Card :nombre="hotel.nombre" :ciudad="hotel.ciudad" :nit="hotel.nit" :direccion="hotel.direccion"
                :maxHabitantes="hotel.maxHabitantes" :imagen="hotel.imagen" />
        </div>
    </div>
</template>
  
<script setup>
import hoteles from '../data/listHoteles.js'
import Card from '../components/Card.vue';
</script>
  