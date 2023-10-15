<template>
    <div class="bg-slate-300/50 p-3 rounded-md shadow-2xl shadow-slate-500 m-3 -mt-2
    ">
        <h1 class="py-1 text-xl font-bold text-center mb-2">{{ textTitle }} Hotel</h1>

        <form @submit.prevent="submitForm" class="grid grid-cols-2 gap-3">
            <div class="flex flex-col space-y-1">
                <label for="nombre" class="font-bold">Nombre</label>
                <input type="text" v-model="nombre" required class="border p-1 rounded-md">
            </div>

            <div class="flex flex-col space-y-1">
                <label for="ciudad" class="font-bold">Ciudad</label>
                <input type="text" v-model="ciudad" required class="border p-1 rounded-md">
            </div>

            <div class="flex flex-col space-y-1">
                <label for="nit" class="font-bold">Nit</label>
                <input type="text" v-model="nit" required class="border p-1 rounded-md">
            </div>

            <div class="flex flex-col space-y-1">
                <label for="direccion" class="font-bold">Direccion</label>
                <input type="text" v-model="direccion" required class="border p-1 rounded-md">
            </div>

            <div class="flex flex-col space-y-1">
                <label for="numMaxHabitante" class="font-bold">Numero max Habitante</label>
                <input type="text" v-model="numMaxHabitante" required class="border p-1 rounded-md">
            </div>


            <button class="p-2 rounded-xl border col-span-2 
        bg-gradient-to-tr bg-blue-400 from-slate-800 text-white font-bold text-xl
        shadow-emerald-900 hover:shadow-2xl
        hover:bg-gradient-to-tr hover:bg-slate-400 hover:from-blue-800" type="submit">
                {{ textButton }}
            </button>

            <button class="p-2 rounded-xl border col-span-2 
        bg-gradient-to-tr bg-red-400 from-orange-500 text-white font-bold text-xl
        shadow-emerald-900 hover:shadow-2xl
        hover:bg-gradient-to-tr hover:bg-from-orange-500 hover:from-red-800" type="button" @click="cancelForm">
                Cancelar
            </button>

        </form>
    </div>
</template>
  
<script>
export default {
    name: 'FormHotel',
    props: {
        modelData: {
            type: Object,
            default: null,
        }, textTitle: {
            type: String,
            default: '',
        }, textButton: {
            type: String,   
            default: '',
        }
    },
    data() {
        return {
            modelData: this.initializeHotelData(),
        }
    },
    computed: {
        isEditing() {
            return this.hotel !== null;
        },
    },
    methods: {
        initializeHotelData() {
            return {
                nombre: this.hotel ? this.hotel.nombre : '',
                ciudad: this.hotel ? this.hotel.ciudad : '',
                nit: this.hotel ? this.hotel.nit : '',
                direccion: this.hotel ? this.hotel.direccion : '',
                numMaxHabitante: this.hotel ? this.hotel.numMaxHabitante : '',
            };
        }, submitForm() {
            console.log('Formulario enviado:', this.hotelData);
        }, cancelForm() {
            // Puedes agregar lógica aquí para cancelar la acción
        },

    },
    watch: {
        hotel: {
            handler(newHotel) {
                this.hotelData = this.initializeHotelData();
            },
            immediate: true,
        },
    },
};
</script>
  