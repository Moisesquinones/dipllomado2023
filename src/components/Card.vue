<template>
    <div class=" border p-10 rounded-3xl shadow-xl shadow-slate-500
    flex flex-col items-center justify-center font-serif 
    space-y-1 bg-gradient-to-b bg-sky-950 from-purple-400
    ">
        <p class="text-2xl">Nit: {{ nit }}</p>
        <h3 class="text-3xl font-bold">{{ nombre }}</h3>
        <p class="text-xl">{{ maxHabitantes }} habitantes</p>
        <div class="mt-4 space-y-2">
            <img class="rounded-md" :src="imagen" alt="Descripción de la imagen" />
            <div class="grid grid-cols-2 text-white">
                <p class="text-xl">{{ ciudad }}</p>
                <p class="text-xl">{{ direccion }}</p>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'Card',
    props: {
        nombre: {
            type: String,
            required: true,
        },
        ciudad: {
            type: String,
            required: true,
        },
        nit: {
            type: String,
            required: true,
        },
        direccion: {
            type: String,
            required: true,
        },
        maxHabitantes: {
            type: Number,
            required: true,
        },
        imagen: {
            type: String,
            required: true,
        },
    },
};
</script>
  