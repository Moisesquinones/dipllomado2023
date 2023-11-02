<template>
  <div class="md:px-20 px-2  pt-10 space-y-5">
    <button @click="openModal('Nuevo Hotel')"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Registrar Nuevo Hotel
    </button>

    <Modal :show="modalVisible" @close="closeModal">
      <FormHotel textTitle="Nuevo" textButton="Guardar" @close-modal="closeModal" @hotel-creado="actualizarTabla" />
    </Modal>

    <TableHotel :hotelData="hotelData" :key="tablaKey" @hotel-actualizado="actualizarTabla" />

</div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import FormHotel from '../components/FormHotel.vue';
import Modal from '../components/Modal.vue';
import TableHotel from '../components/TableHotel.vue';
import { getAll } from '../services/hotels';

const tablaKey = ref(0); 
const hotelData = ref([]);
const modalVisible = ref(false);
const modalTitle = ref('');
const isLoading = ref(true);

const openModal = (title) => {
  modalTitle.value = title;
  modalVisible.value = true;
};

const closeModal = () => {
  modalVisible.value = false;
};

const listar = async () => {
  isLoading.value = true;
  try {
    const data = await getAll();
    hotelData.value = data.data;
    console.log(data.data)
  } catch (error) {
    console.error('Error al obtener elementos:', error);
  }
  isLoading.value = false;
};

const actualizarTabla = () => {
  tablaKey.value += 1;
  listar();
  onMounted(listar);
};

onMounted(listar);
</script>
