<template>
   <div>
     <InputComponet/>
     <GetAllExpenseComponent/>
   </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import InputComponet from './components/InputComponet.vue';
import GetAllExpenseComponent from './components/GetAllExpenseComponent.vue';
export default {
  name: 'App',
  components: {
    InputComponet,
    GetAllExpenseComponent
  },
  
};
</script>

<style>
/* Add any custom styles here if needed */
</style>
