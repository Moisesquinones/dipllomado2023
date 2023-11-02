
<script setup>
import { ref } from 'vue';

</script>


<template></template>

<script>

export default {
  name: 'TableHabitations',
  props: {
    hatitationsData: {
      type: Array,
      required: true,
    },
  }, data() {
    return {
      modalVisible: ref(false),
    };
  }, watch: {
    hatitationsData: {
      handler() {
      }, deep: true
    }
  },
  methods: {},

};

</script>
  