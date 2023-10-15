<template>
  <div class="px-20 pt-10 space-y-5">
    <button @click="openModal('Nuevo Hotel')"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Registrar Nuevo Hotel
    </button>

    <Modal :show="modalVisible" @close="closeModal">
      <FormHotel textTitle="Nuevo" textButton="Guardar" />
    </Modal>
    <TableHotel :hoteles="hoteles" />
  </div>
</template>

<script setup>
import TableHotel from '../components/TableHotel.vue';
import Modal from '../components/Modal.vue';
import FormHotel from '../components/FormHotel.vue';
import { ref } from 'vue';
import hoteles from '../data/hoteles'

const modalVisible = ref(false);
const modalTitle = ref('');

const openModal = (title) => {
  modalTitle.value = title;
  modalVisible.value = true;
  console.log("Modal abierto");
};

const closeModal = () => {
  modalVisible.value = false;
  console.log("Modal cerrado");
};
</script>
