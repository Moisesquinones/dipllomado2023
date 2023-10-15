<template>
  <div class="bg-slate-300/50 p-3 rounded-md shadow-2xl shadow-slate-500 m-3 -mt-2">
    <h1 class="py-1 text-xl font-bold text-center mb-2">{{ textTitle }} Hotel</h1>

    <form @submit.prevent="submitForm" class="grid grid-cols-2 gap-3">
      <div class="flex flex-col space-y-1">
        <label for="nombre" class="font-bold">Nombre</label>
        <input type="text" v-model="localHotelData.nombre" required class="border p-1 rounded-md">
      </div>

      <div class="flex flex-col space-y-1">
        <label for="ciudad" class="font-bold">Ciudad</label>
        <input type="text" v-model="localHotelData.ciudad" required class="border p-1 rounded-md">
      </div>

      <div class="flex flex-col space-y-1">
        <label for="nit" class="font-bold">NIT</label>
        <input type="text" v-model="localHotelData.nit" required class="border p-1 rounded-md">
      </div>

      <div class="flex flex-col space-y-1">
        <label for="direccion" class="font-bold">Dirección</label>
        <input type="text" v-model="localHotelData.direccion" required class="border p-1 rounded-md">
      </div>

      <div class="flex flex-col space-y-1">
        <label for="maxHabitantes" class="font-bold">Número máximo de habitantes</label>
        <input type="text" v-model="localHotelData.maxHabitantes" required class="border p-1 rounded-md">
      </div>

      <button
        class="p-2 rounded-xl border col-span-2 bg-gradient-to-tr bg-blue-400 from-slate-800 text-white font-bold text-xl shadow-emerald-900 hover:shadow-2xl hover:bg-gradient-to-tr hover:bg-slate-400 hover:from-blue-800"
        type="submit">
        {{ textButton }}
      </button>

      <button
        class="p-2 rounded-xl border col-span-2 bg-gradient-to-tr bg-red-400 from-orange-500 text-white font-bold text-xl shadow-emerald-900 hover:shadow-2xl hover:bg-gradient-to-tr hover:bg-from-orange-500 hover:from-red-800"
        type="button" @click="cancelForm">
        Cancelar
      </button>
    </form>
  </div>
</template>
  
<script>
import Swal from 'sweetalert2';

export default {
  name: 'FormHotel',
  props: {
    textTitle: {
      type: String,
      default: '',
    },
    textButton: {
      type: String,
      default: '',
    },
    hotelData: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      localHotelData: { ...this.hotelData },
    };
  },
  watch: {
    hotelData(newHotelData) {
      this.localHotelData = { ...newHotelData };
    },
  },
  methods: {
    submitForm() {
      if (this.hotelData === null) {
        // Crear un nuevo hotel
        Swal.fire({
          title: `Registrado`,
          text: `'Se registro con exito.`,
          icon: 'success',
          confirmButtonText: 'OK'
        });
        console.log('Nuevo hotel:', this.localHotelData);
      } else {
        Swal.fire({
          title: `Actualizado`,
          text: `${this.localHotelData.nombre} Actualizo con exito.`,
          icon: 'success',
          confirmButtonText: 'OK'
        });
        // Editar hotel existente
        console.log('Hotel editado:', this.localHotelData);
      }
    },
    cancelForm() {
      this.$emit('close-modal');
      // Agrega aquí la lógica para cancelar la acción si es necesario
    },
  },
};
</script>
  