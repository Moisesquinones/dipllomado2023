<template>
  <canvas class="w-full h-full" ref="chartCanvas"></canvas>
</template>
  
<script>
import Chart from 'chart.js/auto';

export default {
  props: {
    hoteles: {
      type: Array,
      required: true,
    },
  }, data() {
    return {
      localData: this.hoteles ? { ...this.hoteles } : [],
      chart: null,
    }
  },
  computed: {
    habitacionesPorCiudad() {
      const totalPorCiudad = {};

      this.hoteles.forEach((hotel) => {
        const ciudad = hotel.city.name;
        const habitantes = hotel.num_rooms;

        if (!totalPorCiudad[ciudad]) {
          totalPorCiudad[ciudad] = habitantes; // Inicializa con el valor de habitantes
        } else {
          totalPorCiudad[ciudad] += habitantes; // Suma habitantes al valor existente
        }
      });

      const resultado = Object.keys(totalPorCiudad).map((ciudad) => ({
        ciudad,
        cantidad: totalPorCiudad[ciudad],
      }));

      return resultado;
    },

  },
  watch: {
    habitacionesPorCiudad: {
      handler(newVal) {
        if (this.chart) {
          this.chart.destroy();
        }
        this.renderChart();
      },
      deep: true,
    },
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      const ctx = this.$refs.chartCanvas.getContext('2d');

      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.habitacionesPorCiudad.map((item) => item.ciudad),
          datasets: [{
            label: 'Total de Habitaciones por Ciudad',
            data: this.habitacionesPorCiudad.map((item) => item.cantidad),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          }],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    },
  },
};
</script>
  
<style scoped>
/* Estilos personalizados si es necesario */
</style>
  