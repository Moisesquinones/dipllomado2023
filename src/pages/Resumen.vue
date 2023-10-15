<template>
    <div class="px-40 pt-20 pb-40 flex flex-col items-center justify-center space-y-6">
        <div>
            <h1 class="text-2xl font-bold">Diagrama de Habitaciones por ciudad</h1>
        </div>
        <div class="h-full w-3/5">
            <HabitacionChart :hoteles="hoteles"></HabitacionChart>
        </div>
    </div>
</template>
  
<script setup>
import HabitacionChart from '../components/HabitacionChart.vue'
import hoteles from '../data/hoteles'
</script>
  