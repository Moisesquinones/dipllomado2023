<template>
  <div class=" rounded-md p-2">

    <Modal :show="modalVisible" @close="closeModal">
      <FormHotel textTitle="Nuevo" textButton="Actualizar" :modelData="modelo" />
    </Modal>

    <h2 class="text-2xl font-black  p-2">Lista de Hoteles</h2>
    <table class="min-w-full shadow-xl shadow-slate-400">
      <thead>
        <tr>
          <th class="py-2 px-4 border-b">Nombre del Hotel</th>
          <th class="py-2 px-4 border-b">Ciudad</th>
          <th class="py-2 px-4 border-b">NIT</th>
          <th class="py-2 px-4 border-b">Dirección</th>
          <th class="py-2 px-4 border-b">Máximo de Habitantes</th>
          <th class="py-2 px-4 border-b">accions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(hotel, index) in hoteles" :key="index">
          <td class="py-2 px-4 border-b text-center">{{ hotel.nombre }}</td>
          <td class="py-2 px-4 border-b text-center">{{ hotel.ciudad }}</td>
          <td class="py-2 px-4 border-b text-center">{{ hotel.nit }}</td>
          <td class="py-2 px-4 border-b text-center">{{ hotel.direccion }}</td>
          <td class="py-2 px-4 border-b text-center">{{ hotel.maxHabitantes }}</td>
          <td class="py-2 px-4 border-b text-center space-x-4">
            <button @click="editarModelo(hotel)">
              Editar
            </button>
            <button @click="eliminarHotel(hotel)">
              Eliminar
            </button>
            <button @click="verDetalles(hotel)">
              Detalles
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script >
import { ref } from 'vue';
import Modal from '../components/Modal.vue';
import FormHotel from '../components/FormHotel.vue';

export default {
  name: 'TableHotel',
  props: {
    hoteles: {
      type: Array,
      required: true,
    }
  }, data() {
    return {
      modalVisible: false,
      modalTitle: '',
    };
  },
  methods: {
    editarModelo(modelo) {
      console.log('Modelo editado.', modelo);

      const modalVisible = ref(false);
      const modalTitle = ref('');
      modalVisible.value = true;

      this.modelo = { ...modelo }
      this.openModal()
    },
    eliminarModelo() {
      console.log('Modelo editado.');
    },
    detallesModelo() {
      console.log('Modelo editado.');
    },
    openModal() {
      console.log('Modal abierto');
    },
    closeModal() {
      this.modalVisible = false;
      console.log('Modal cerrado');
    },
  },
};

const modalVisible = ref(false);
const modalTitle = ref('');
</script>
  