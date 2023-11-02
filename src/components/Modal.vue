<template>
    <div v-if="show" class="fixed inset-0 flex items-center justify-center z-50 
    shadow-2xl shadow-slate-500">
        <div class="modal-overlay"></div>
        <div class="modal-container bg-gradient-to-tr bg-slate-300 from-sky-200 w-1/2 mx-auto rounded shadow-lg z-50">
            <div class="modal-content text-left">
                <div class="flex justify-between items-center">
                    <button @click="closeModal" class="modal-close relative top-8 pl-5">
                        <svg class="fill-current h-6 w-6 border rounded-full bg-blue-700 text-white" role="button"
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <title>Close</title>
                            <path fill-rule="evenodd"
                                d="M6.293 6.293a1 1 0 011.414 0L10 10.586l2.293-2.293a1 1 0 111.414 1.414L11.414 12l2.293 2.293a1 1 0 11-1.414 1.414L10 13.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 12 6.293 9.707a1 1 0 010-1.414z"
                                clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>
                <slot></slot>
            </div>
        </div>
    </div>
</template>
  
<script>
import { ref, watch } from 'vue';

export default {
    name: 'Modal',
    props: { show: Boolean, modalTitle: String, },
    methods: {
        closeModal() {
            this.$emit('close');
        }
    }
};
</script>
  
<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.75);
    z-index: 40;
}

.modal-container {
    max-height: 80%;
}

.modal-content {
    max-height: calc(100% - 1.25rem);
    overflow-y: auto;
}
</style>
  