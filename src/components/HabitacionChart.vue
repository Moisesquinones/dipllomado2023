<template>
    <div>
      <canvas ref="chartCanvas"></canvas>
    </div>
  </template>
  
  <script>
  import Chart from 'chart.js/auto';
  
  export default {
    props: {
      hoteles: {
        type: Array,
        required: true,
      },
    },
    computed: {
      habitacionesPorCiudad() {
        const totalPorCiudad = {};
  
        this.hoteles.forEach((hotel) => {
          const ciudad = hotel.ciudad;
          const habitantes = hotel.maxHabitantes;
  
          if (!totalPorCiudad[ciudad]) {
            totalPorCiudad[ciudad] = 0;
          }
  
          totalPorCiudad[ciudad] += habitantes;
        });
  
        return totalPorCiudad;
      },
    },
    watch: {
      habitacionesPorCiudad: {
        handler() {
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
  
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: Object.keys(this.habitacionesPorCiudad),
            datasets: [{
              label: 'Total de Habitaciones por Ciudad',
              data: Object.values(this.habitacionesPorCiudad),
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
  