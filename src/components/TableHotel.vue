
<script setup>
import { ref } from 'vue';
import FormHotel from '../components/FormHotel.vue';
import Modal from '../components/Modal.vue';
import hoteles from '../data/hoteles';
const hotelData = ref(null);
const modalVisible = ref(false);
const modalTitle = ref('');

const openModal = (hotel) => {
  console.log(hotel)
  hotelData.value = hotel;
  modalVisible.value = true;
};

const closeModal = () => {
  modalVisible.value = false;
};
</script>


<template>
  <div class=" rounded-md p-2 pb-20">

    <Modal :show="modalVisible" @close="closeModal">
      <FormHotel textTitle="Nuevo" textButton="Actualizar" :hotelData="hotelData" @close-modal="closeModal" />
    </Modal>

    <h2 class="text-2xl font-black  p-2">Lista de Hoteles</h2>
    <table class="md:min-w-full shadow-xl shadow-slate-400">
      <thead>
        <tr class="capitalize ">
          <th class="py-2 px-4 font-semibold   border-b">Nombre del Hotel</th>
          <th class="py-2 px-4 font-semibold   border-b">Ciudad</th>
          <th class="py-2 px-4 font-semibold   border-b">NIT</th>
          <th class="py-2 px-4 font-semibold   border-b">Dirección</th>
          <th class="py-2 px-4 font-semibold   border-b">Máximo de Habitantes</th>
          <th class="py-2 px-4 font-semibold   border-b">accions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(hotel, index) in hoteles" :key="index">
          <td class="py-2 px-4 border-b text-center">{{ hotel.nombre }}</td>
          <td class="py-2 px-4 border-b text-center">{{ hotel.ciudad }}</td>
          <td class="py-2 px-4 border-b text-center">{{ hotel.nit }}</td>
          <td class="py-2 px-4 border-b text-center">{{ hotel.direccion }}</td>
          <td class="py-2 px-4 border-b text-center">{{ hotel.maxHabitantes }}</td>
          <td class="py-2 px-4 border-b text-center space-x-4 flex flex-col gap-3 md:flex-row md:gap-0 justify-center">
            <button class="p-2 rounded-md bg-gradient-to-l 
            bg-blue-700 hover:bg-blue-700/60 from-green-400 text-white" @click="openModal(hotel)">
              Editar
            </button>
            <button class="p-2 rounded-md bg-gradient-to-br 
            bg-orange-700 hover:bg-orange-700/60 from-red-400 text-white" @click="eliminarHotel(hotel)">
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import { ref } from 'vue';

export default {
  name: 'TableHotel',
  props: {
    hoteles: {
      type: Array,
      required: true,
    }
  }, data() {
    return {
      modalVisible: ref(false),
      modalTitle: '',
      hotelData: this.initializeHotelData(),
    };
  },
  methods: {
    editarModelo(modelo) {
      this.hotelData = modelo;
      this.modalVisible = true;
    },
    eliminarHotel(modelo) {
      Swal.fire({
        title: `Eliminado`,
        text: `'${modelo.nombre}' Eliminado con exito.`,
        icon: 'success',
        confirmButtonText: 'OK'
      });
    },
    verDetalles() {
      console.log('Modelo editado.');
    },
    openModal() {
      console.log('Modal abierto');
    },
    closeModal() {
      this.modalVisible = false;
      console.log('Modal cerrado');
    },
    initializeHotelData() {
      return {
        nombre: this.modelData ? this.modelData.nombre : '',
        ciudad: this.modelData ? this.modelData.ciudad : '',
        nit: this.modelData ? this.modelData.nit : '',
        direccion: this.modelData ? this.modelData.direccion : '',
        numMaxHabitante: this.modelData ? this.modelData.numMaxHabitante : '',
      }
    }

  },
};

const modalVisible = ref(true);
const modalTitle = ref('');
</script>
  