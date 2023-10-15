<template>
    <div class="relative">

        <div class="flex bg-blue-400">
            <img class=" w-full h-full absolute inset-0 z-10 opacity-20" src="src/assets/hotel1.jpg"
                alt="Descripción de la imagen" />
        </div>

        <div class="absolute z-30 mt-16 left-0 right-0 text-center font-bold md:text-6xl text-2xl text-white uppercase">
            <h1>Los mejores hoteles de colombia</h1>
        </div>

        <div class=" px-20 z-20 py-40 w-full flex flex-col md:flex-row gap-20 bg-sky-600 bg-gradient-to-tr from-zinc-800 md:grid-cols-3">
            <div v-for="(hotel, index) in hoteles" :key="index">
                <Card :nombre="hotel.nombre" :ciudad="hotel.ciudad" :nit="hotel.nit" :direccion="hotel.direccion"
                    :maxHabitantes="hotel.maxHabitantes" :imagen="hotel.imagen" />
            </div>
        </div>

    </div>
    <Section></Section>
</template>
  
<script setup>
import hoteles from '../data/listHoteles.js'
import Card from '../components/Card.vue';
import Section from '../components/Section.vue'
</script>
  