<template>
  <div class="bg-slate-300/50 p-3 rounded-md shadow-2xl shadow-slate-500 m-3 -mt-2">
    <h1 class="py-1 text-xl font-bold text-center mb-2">{{ localHotelData.id != '' ? "Editar" : "Nueva" }} Habitacion</h1>

    <form @submit.prevent="submitForm" class="grid grid-cols-2 gap-3">

      <div class="flex flex-col space-y-1 " v-if="localHotelData.id !== ''">
        <label for="id" class="font-bold">Id</label>
        <input type="text" v-model="localHotelData.id" required class="border p-1 rounded-md" readonly>
      </div>

      <div class="flex flex-col space-y-1">
        <label for="name" class="font-bold">Hotel</label>
        <input type="text" v-model="localHotelData.hotel_id" required class="border p-1 rounded-md">
      </div>

      <div class="flex flex-col space-y-1">
        <label for="city_id" class="font-bold">Type</label>
        <select v-model="localHotelData.room_type_id" required class="border p-1 rounded-md bg-white h-9">
          <option value="" disabled selected>Selecciona un tipo</option>
          <option v-for="roomType in roomTypes" :value="roomType.id" :key="roomType.id">{{ roomType.name }}</option>
        </select>
      </div>


      <div class="flex flex-col space-y-1">
        <label for="city_id" class="font-bold">Acomodacion</label>
        <select v-model="localHotelData.accommodation_id" required class="border p-1 rounded-md bg-white h-9">
          <option value="" disabled selected>Selecciona una ciudad</option>
          <option v-for="acommodation in acommodations" :value="acommodation.id" :key="acommodation.id">{{
            acommodation.name }}</option>
        </select>
      </div>

      <div class="flex flex-col space-y-1">
        <label for="nit" class="font-bold">Cantidad</label>
        <input type="text" v-model="localHotelData.quantity" required class="border p-1 rounded-md">
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
import { getAllTypes, getAllAccommodation } from '../services/habAcom';
import { createItem, updateItem } from '../services/habitantions'

export default {
  name: 'FormHabitations',
  props: {
    textTitle: {
      type: String,
      default: '',
    },
    textButton: {
      type: String,
      default: '',
    },
    dataEdit: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      localHotelData: this.dataEdit ? { ...this.dataEdit } : {
        id: "",
        hotel_id: "",
        room_type_id: "",
        accommodation_id: "",
        quantity: "",
      },
      roomTypes: [],
      acommodations: [],
    };
  }, async mounted() {
    try {
      const acommodationData = await getAllAccommodation();
      this.acommodations = acommodationData;
    } catch (error) {
      console.error('Error al obtener la lista de acomodaciones:', error);
    }

    try {
      const types = await getAllTypes();
      this.roomTypes = types;
    } catch (error) {
      console.error('Error al obtener la lista de tipos:', error);
    }
  },
  watch: {
    dataEdit(newHotelData) {
      this.localHotelData = { ...newHotelData };
    },
  },
  methods: {
    submitForm() {
      const createHabitations = {
        id: this.localHotelData.id,
        hotel_id: this.localHotelData.hotel_id,
        room_type_id: this.localHotelData.room_type_id,
        accommodation_id: this.localHotelData.accommodation_id,
        quantity: this.localHotelData.quantity,
      }

      if (this.localHotelData.id === '') {

        createItem(createHabitations)
          .then(() => {
            Swal.fire({
              title: 'Registrado',
              text: '¡Se registró con éxito!',
              icon: 'success',
              confirmButtonText: 'OK',
            });

            this.localHotelData = {
              id: "",
              hotel_id: "",
              room_type_id: "",
              accommodation_id: "",
              quantity: "",
            };

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

        updateItem(this.localHotelData.id, createHabitations)
          .then(() => {
            Swal.fire({
              title: 'Actualizado',
              text: '¡Se actualizo con éxito!',
              icon: 'success',
              confirmButtonText: 'OK',
            });
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
      }
    },
    cancelForm() {
      this.localHotelData = {
        id: "",
        hotel_id: "",
        room_type_id: "",
        accommodation_id: "",
        quantity: "",
      };
    },
  },
};
</script>
  