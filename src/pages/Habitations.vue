<template>
  <div class="md:px-20 px-2 pt-10 space-y-10 min-h-screen flex flex-col items-center justify-center">
    <!-- Botones iniciales -->
    <div class="flex space-x-10 w-full h-full items-center justify-center mb-10">
      <button @click="mostrarFormulario"
        class="bg-blue-500 hover:bg-blue-700 animate-bounce text-white font-bold py-2 px-4 rounded">
        Registrar habitacion
      </button>
      <button @click="mostrarBusqueda"
        class="bg-green-500 hover:bg-green-700 animate-bounce text-white font-bold py-2 px-4 rounded">
        Buscar Habitación
      </button>
    </div>

    <!-- Div para buscar habitación -->
    <form @submit.prevent="submitForm" class="flex space-x-12 shadow rounded-3xl p-5 bg-slate-300/70" v-if="showButton">
      <div class="space-x-3">
        <label for="id" class="font-bold">ID habitación</label>
        <input class="p-2 rounded-md" type="text" id="id" v-model="formData.id" required />
      </div>
      <button class="p-2 w-32  rounded-xl bg-gradient-to-br from-blue-400 bg-sky-700 text-white font-bold
       hover:bg-blue-400 hover:from-sky-700" type="submit"
        >Buscar</button>
    </form>

    <!-- Botones Ver y Editar -->
    <div class="space-x-10" v-if="showButtons">
      <button class="p-2 w-32 bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded capitalize" @click="mostrarDetalles">Ver</button>
      <button class="p-2 w-32 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded capitalize" @click="mostrarEdicion">Editar</button>
    </div>

    <!-- Mostrar formulario o detalles -->
    <div class="flex py-10">
      <div class="col-span-1" v-if="showFormulario">
        <FormHabitations textTitle="Nueva" textButton="Guardar" @close-modal="closeModal" @hotel-creado="actualizarTabla"
          :dataEdit="dataEdit" />
      </div>
      <div class="col-span-1" v-if="showDetalles">
        <DetailHabitation :data="data" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { getItemById } from '../services/habitantions';
import Swal from 'sweetalert2';
import FormHabitations from '../components/FormHabitations.vue';
import DetailHabitation from '../components/detailHabitation.vue';

export default {
  setup() {
    const showButton = ref(false);
    const showFormulario = ref(false);
    const showDetalles = ref(false);
    const showButtons = ref(false);
    const formData = ref({ id: '' });
    const data = ref(null);
    const dataEdit = ref(null);
    const formSubmitting = ref(false);

    const submitForm = async () => {
      const roomId = formData.value.id;
      formSubmitting.value = true;
      try {
        const result = await getItemById(roomId);
        if (result.data != null) {

          const newEdit = {
            "id": result.data.id,
            "hotel_id": result.data.hotel_id,
            "room_type_id": result.data.room_type_id,
            "accommodation_id": result.data.accommodation_id,
            "quantity": result.data.quantity,
          }

          data.value = result.data;
          dataEdit.value = newEdit;
          showButtons.value = true;
          showFormulario.value = false;
          showDetalles.value = false;
        }
      }
      catch (error) {
        if (error.message) {
          Swal.fire({
            title: 'No se pudo encontrar el id '.roomId,
            text: `Advertencia ${error.response.data.message}`,
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      }
      formSubmitting.value = false;
    };
    const mostrarBusqueda = () => {
      showButton.value = true;
      showFormulario.value = false;
      showDetalles.value = false;
      showButtons.value = false;
      data.value = null;
      dataEdit.value = null;
    };
    const mostrarFormulario = () => {
      dataEdit.value = null;
      showFormulario.value = true;
      showButton.value = false;
      showDetalles.value = false;
      showButtons.value = false;
      data.value = null;
      dataEdit.value = null;
    };
    const mostrarDetalles = () => {
      showDetalles.value = true;
      showButtons.value = true;
      showFormulario.value = false;
    };
    const mostrarEdicion = () => {
      showDetalles.value = false;
      showButtons.value = true;
      showFormulario.value = true;
    };
    return {
      showButton,
      showFormulario,
      showDetalles,
      showButtons,
      formData,
      data,
      dataEdit,
      formSubmitting,
      submitForm,
      mostrarBusqueda,
      mostrarFormulario,
      mostrarDetalles,
      mostrarEdicion,
    };
  },
  components: { FormHabitations, DetailHabitation }
};
</script>
