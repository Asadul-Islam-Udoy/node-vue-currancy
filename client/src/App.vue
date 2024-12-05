<template>
   <div>
     <InputComponet/>
     <GetAllExpenseComponent/>
   </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import InputComponet from './components/InputComponet.vue';
import GetAllExpenseComponent from './components/GetAllExpenseComponent.vue';
export default defineComponent({
  name: 'App',
  components: {
    InputComponet,
    GetAllExpenseComponent
  },
  
});
</script>

<style>
/* Add any custom styles here if needed */
</style>
