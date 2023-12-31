<template>
  <div class="bg-slate-300/50 p-3 rounded-md shadow-2xl shadow-slate-500 m-3 -mt-2">
    <h1 class="py-1 text-xl font-bold text-center mb-2">{{ textTitle }} Hotel</h1>

    <form @submit.prevent="submitForm" class="grid grid-cols-2 gap-3">

      <div class="flex flex-col space-y-1 " v-if="textTitle === 'Editar'">
        <label for="id" class="font-bold">Id</label>
        <input type="text" v-model="localHotelData.id" required class="border p-1 rounded-md" readonly>
      </div>

      <div class="flex flex-col space-y-1">
        <label for="name" class="font-bold">Nombre</label>
        <input type="text" v-model="localHotelData.name" required class="border p-1 rounded-md">
      </div>

      <div class="flex flex-col space-y-1">
        <label for="city_id" class="font-bold">Ciudad</label>
        <select v-model="localHotelData.city_id" required class="border p-1 rounded-md">
          <option value="" disabled selected>Selecciona una ciudad</option>
          <option v-for="city in cities" :value="city.id" :key="city.id">{{ city.name }}</option>
        </select>
      </div>


      <div class="flex flex-col space-y-1">
        <label for="nit" class="font-bold">NIT</label>
        <input type="text" v-model="localHotelData.nit" required class="border p-1 rounded-md">
      </div>

      <div class="flex flex-col space-y-1">
        <label for="address" class="font-bold">Dirección</label>
        <input type="text" v-model="localHotelData.address" required class="border p-1 rounded-md">
      </div>

      <div class="flex flex-col space-y-1">
        <label for="num_rooms" class="font-bold">Número máximo de habitaciones</label>
        <input type="text" v-model="localHotelData.num_rooms" required class="border p-1 rounded-md">
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
import { getAll, } from '../services/cities';
import { createItem, updateItem } from '../services/hotels';

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
      localHotelData: this.hotelData ? { ...this.hotelData } : {
        name: '',
        city_id: null,
        nit: '',
        address: '',
        num_rooms: null
      },
      cities: [],
    };
  }, async mounted() {

    try {
      const cityData = await getAll();
      this.cities = cityData;
    } catch (error) {
      console.error('Error al obtener la lista de ciudades:', error);
    }
  },
  watch: {
    hotelData(newHotelData) {
      this.localHotelData = { ...newHotelData };
    },
  },
  methods: {
    submitForm() {
      if (this.hotelData === null) {
        const newHotelData = {
          name: this.localHotelData.name,
          city_id: this.localHotelData.city_id,
          nit: this.localHotelData.nit,
          address: this.localHotelData.address,
          num_rooms: this.localHotelData.num_rooms,
        };
        createItem(newHotelData) // Llama a la función para crear un hotel
          .then(() => {
            Swal.fire({
              title: 'Registrado',
              text: '¡Se registró con éxito!',
              icon: 'success',
              confirmButtonText: 'OK',
            });
            this.$emit('hotel-creado');
            this.$emit('close-modal');
          })
          .catch((error) => {
            if (error.response.status === 422) {
              if (error.message) {
                Swal.fire({
                  title: 'No se pudo registrar',
                  text: `Advertencia ${error.response.data.message}`,
                  icon: 'info',
                  confirmButtonText: 'OK',
                });
              }
            } else {
              if (error.response) {
                Swal.fire({
                  title: 'Error',
                  text: `Ocurrió un error al registrar el hotel: ${error}`,
                  icon: 'error',
                  confirmButtonText: 'OK',
                })
              }
            }
          });
      } else {

        const editHotelData = {
          id: this.localHotelData.id,
          name: this.localHotelData.name,
          city_id: this.localHotelData.city_id,
          nit: this.localHotelData.nit,
          address: this.localHotelData.address,
          num_rooms: this.localHotelData.num_rooms,
        };

        updateItem(this.localHotelData.id, editHotelData) // Llama a la función para crear un hotel
          .then(() => {
            Swal.fire({
              title: "Actualizado",
              text: `${this.localHotelData.name} actualizo con exito.`,
              icon: 'success',
              confirmButtonText: 'OK'
            });
            this.$emit('hotel-actualizado');
            this.$emit('close-modal');
          })
          .catch((error) => {
            if (error.response.status === 422) {
              if (error.message) {
                Swal.fire({
                  title: 'No se pudo actualizar',
                  text: `Advertencia ${error.response.data.message}`,
                  icon: 'info',
                  confirmButtonText: 'OK',
                });
              }
            } else {
              if (error.response) {
                Swal.fire({
                  title: 'Error',
                  text: `Ocurrió un error al actualizar el hotel: ${error}`,
                  icon: 'error',
                  confirmButtonText: 'OK',
                })
              }
            }
          });
      }
    },
    cancelForm() {
      this.$emit('close-modal');
    },
  },
};
</script>
  