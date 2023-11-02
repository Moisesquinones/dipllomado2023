<template>
    <div class="px-40 pt-20 pb-40 flex flex-col items-center justify-center space-y-6">
        <div>
            <h1 class="text-2xl font-bold">Diagrama de Habitaciones por ciudad</h1>
        </div>
        <div class="w-[300px] h-[400px] md:w-[600px] md:h-[500px] flex items-center justify-center">
            <HabitacionChart :hoteles="hoteles"></HabitacionChart>
        </div>
    </div>
</template>
  
<script>
import HabitacionChart from '../components/HabitacionChart.vue';
import { ref, onMounted } from 'vue';
import { getAll } from '../services/hotels';

export default {
    setup() {
        const hoteles = ref([]);

        onMounted(async () => {
            try {
                const response = await getAll();
                if (response.data) {
                    hoteles.value = response.data;
                }
            } catch (error) {
                console.error('Error al obtener los datos de los hoteles', error);
            }
        });

        return {
            hoteles,
        };
    },
    components: { HabitacionChart }

};
</script>
  