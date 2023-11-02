<script setup>
import { ref, watch } from 'vue';

const hatitationsData = ref([]);
const modalVisible = ref(false);

watch(hatitationsData, () => {
  // Puedes agregar lógica de manejo de cambios en hatitationsData aquí
});

</script>

<template>
  <div class=" w-full h-full flex flex-col items-center justify-center">
    <div class="flex text-2xl space-x-3 w-72 items-center justify-center shadow-2xl pb-5 rounded-3xl">
      <h2 class="font-black capitalize">habitación</h2><span>{{ data.id }}</span>
    </div>

    <div class="shadow-2xl rounded-3xl p-10 w-72 space-y-3">
      <h2 class="text-center font-black">Datos del Hotel</h2>
      <div class="flex flex-col space-y-2">
        <div class="flex space-x-3 font-extrabold text-lg">
          <span>Id</span>
          <p>{{ data.hotel.id }}</p>
        </div>

        <div class="font-bold flex space-x-1">
          <h3>Hotel</h3>
          <span class="font-bold">{{ data.hotel.name }}</span>
        </div>
        <div class="flex space-x-2">
          <span class="font-semibold">Nit</span>
          <p class="text-black/50">{{ data.hotel.nit }}</p>
        </div>
        <div>
          <span class="font-semibold">Direccion </span>
          <p class="font-semibold text-black/50">{{ data.hotel.address }}</p>
        </div>

        <div class="font-semibold">
          <span>Numero Habitaciones</span>
          <p class="text-black/50">{{ data.hotel.num_rooms }}</p>
        </div>

      </div>
    </div>

    <div class="shadow-xl p-10 space-y-2 rounded-full w-96">
      <h2 class="text-center font-black">Datos Habitacion</h2>
      <div class="flex  justify-around">
        <div class="space-y-3">
          <span class="font-bold">Tipo</span>
          <p class="text-center">{{ data.type.name }}</p>
        </div>

        <div class="space-y-3">
          <span class="font-bold">Acomodacion</span>
          <p class="text-center">{{ data.accommodation.name }}</p>
        </div>

        <div class="space-y-3">
          <span class="font-bold">Cantidad</span>
          <p class="text-center">{{ data.quantity }}</p>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    data: Object, // Define 'data' como una propiedad de tipo objeto
  },
};
</script>