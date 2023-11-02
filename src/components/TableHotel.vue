
<script setup>
import { onMounted, ref } from 'vue';
import FormHotel from '../components/FormHotel.vue';
import Modal from '../components/Modal.vue';
import { deleteItem, getAll } from '../services/hotels';

const hotelData = ref([]);
const editHotelData = ref(null);
const modalVisible = ref(false);
const isLoading = ref(true);
const tablaKey = ref(0);

const openModalUpdate = (hotel) => {
  editHotelData.value = hotel;
  modalVisible.value = true;
};

const closeModalUpdate = () => {
  modalVisible.value = false;
};

const actualizarTabla = async () => {
  isLoading.value = true;
  console.log("actualizando tabla desde tabla")
  try {
    const data = await getAll();
    hotelData.value = data.data;
  } catch (error) {
    console.error('Error al obtener elementos:', error);
  }
  isLoading.value = false;
  tablaKey.value += 1;
}

onMounted(actualizarTabla);

</script>


<template>
  <div class=" rounded-md p-2 pb-20">

    <Modal :show="modalVisible" @close="closeModalUpdate">
      <FormHotel textTitle="Editar" textButton="Actualizar" :hotelData="editHotelData" @close-modal="closeModalUpdate"
        @hotel-actualizado="actualizarTabla" />
    </Modal>

    <h2 class="text-2xl font-black  p-2">Lista de Hoteles</h2>

    <template v-if="isLoading">
      <p class="font-extralight text-2xl capitalize text-center">Cargando ...</p>
    </template>

    <template v-else>
      <template v-if="hotelData.length > 0">

        <table class="md:min-w-full shadow-xl shadow-slate-400">
          <thead>
            <tr class="capitalize ">
              <th class="py-2 px-4 font-semibold   border-b">Id</th>
              <th class="py-2 px-4 font-semibold   border-b">Nombre del Hotel</th>
              <th class="py-2 px-4 font-semibold   border-b">Ciudad</th>
              <th class="py-2 px-4 font-semibold   border-b">NIT</th>
              <th class="py-2 px-4 font-semibold   border-b">Dirección</th>
              <th class="py-2 px-4 font-semibold   border-b">Máximo de Habitantes</th>
              <th class="py-2 px-4 font-semibold   border-b">accions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(hotel, index) in hotelData" :key="`${index}-${tablaKey}`">
              <td class="py-2 px-4 border-b text-center">{{ hotel.id }}</td>
              <td class="py-2 px-4 border-b text-center">{{ hotel.name }}</td>
              <td class="py-2 px-4 border-b text-center">{{ hotel.city ? hotel.city.name : 'N/A' }}</td>
              <td class="py-2 px-4 border-b text-center">{{ hotel.nit }}</td>
              <td class="py-2 px-4 border-b text-center">{{ hotel.address }}</td>
              <td class="py-2 px-4 border-b text-center">{{ hotel.num_rooms }}</td>
              <td
                class="py-2 px-4 border-b text-center space-x-4 flex flex-col gap-3 md:flex-row md:gap-0 justify-center">
                <button class="p-2 rounded-md bg-gradient-to-l 
            bg-blue-700 hover:bg-blue-700/60 from-green-400 text-white" @click="openModalUpdate(hotel)">
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
      </template>
      <template v-else>
        <h3 class="text-center py-10 text-black font-bold text-2xl">La lista está vacía</h3>
      </template>
    </template>

  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  name: 'TableHotel',
  props: {
    hotelData: {
      type: Array,
      required: true,
    },
  }, data() {
    return {
      modalVisible: ref(false),
    };
  }, watch: {
    hotelData: {
      handler() {
      }, deep: true
    }
  },
  methods: {
    editarModelo(modelo) {
      this.hotelData = modelo;
      this.modalVisible = true;
    },
    eliminarHotel(modelo) {
       Swal.fire({
         title: '¿Estás seguro?',
         text: `¿Quieres eliminar '${modelo.name}'?`,
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#d33',
         cancelButtonColor: '#3085d6',
         confirmButtonText: 'Sí, eliminar',
         cancelButtonText: 'Cancelar',
       }).then(async (result) => {
         if (result.isConfirmed) {
           try {
             await deleteItem(modelo.id);
             Swal.fire({
               title: 'Eliminado',
               text: `'${modelo.name}' Eliminado con éxito.`,
               icon: 'success',
               confirmButtonText: 'OK',
              });
              this.$emit('hotel-actualizado');              
           } catch (error) {
             console.log(error)
             if (error.response) {
               if (error.response.status === 422) {
                 Swal.fire({
                   title: 'No se pudo eliminar',
                   text: `${error.response.data.message}`,
                   icon: 'info',
                   confirmButtonText: 'OK',
                 });
               } else {
                 Swal.fire({
                   title: 'No se pudo eliminar',
                   text: `Ocurrio un error al eliminar '${modelo.name}'.`,
                   icon: 'error',
                   confirmButtonText: 'OK',
                 });
               }
             } else {
               Swal.fire({
                 title: 'No se pudo eliminar',
                 text: `Ocurrio un error al eliminar '${modelo.name}'.`,
                 icon: 'error',
                 confirmButtonText: 'OK',
               });
             }
           }
         }
       });
      
    },
    initializeHotelData() {
      return {
        name: this.modelData ? this.modelData.name : '',
        city: this.modelData ? this.modelData.city.name : '',
        nit: this.modelData ? this.modelData.nit : '',
        address: this.modelData ? this.modelData.address : '',
        num_rooms: this.modelData ? this.modelData.num_rooms : '',
      }
    },
    cancelForm() {
      this.$emit('close-modal');
    }
  },

};

const modalVisible = ref(true);
</script>
  