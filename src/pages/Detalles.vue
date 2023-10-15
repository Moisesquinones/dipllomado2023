<template>
    <div class="bg-slate-300/50 p-3 rounded-md shadow-2xl shadow-slate-500 m-3 -mt-2">
        <h1 class="py-1 text-xl font-bold text-center mb-2">Detalles del {{ localHotelData.nombre }}</h1>
        <div class="">
            <div v-if="hotel.showDetails">
                <h3>Detalles del Hotel</h3>
                <p><strong>Nombre:</strong> {{ hotel.nombre }}</p>
                <p><strong>Ciudad:</strong> {{ hotel.ciudad }}</p>
                <p><strong>NIT:</strong> {{ hotel.nit }}</p>
                <p><strong>Dirección:</strong> {{ hotel.direccion }}</p>
                <p><strong>Máximo de Habitantes:</strong> {{ hotel.maxHabitantes }}</p>
            </div>
        </div>
        <button
            class="p-2 rounded-xl border col-span-2 bg-gradient-to-tr bg-red-400 from-orange-500 text-white font-bold text-xl shadow-emerald-900 hover:shadow-2xl hover:bg-gradient-to-tr hover:bg-from-orange-500 hover:from-red-800"
            type="button" @click="cancelForm">
            Cancelar
        </button>
    </div>
</template>
  
<script>
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
                console.log('Nuevo hotel:', this.localHotelData);
            } else {
                // Editar hotel existente
                console.log('Hotel editado:', this.localHotelData);
            }
        },
        cancelForm() {
            // Agrega aquí la lógica para cancelar la acción si es necesario
        },
    },
};
</script>
  