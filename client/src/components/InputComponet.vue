<template>
  <div
    class="min-h-80 bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-2xl w-full bg-white p-6 rounded-lg shadow-lg">
      <div v-if="errorMessage" class="error">
        <p class="text-red-600">Error: {{ errorMessage }}</p>
      </div>
      <div v-if="successMessage">
        <p class="text-green-500 font-serif">{{ successMessage }}</p>
      </div>
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- input Field : Amount -->
          <div>
            <label for="amount" class="block text-sm font-medium text-gray-700">
              Amount
            </label>
            <input
              id="amount"
              v-model="formData.amount"
              type="number"
              placeholder="Enter your amount"
              class="mt-1 block w-full py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>

          <!-- Input Field: Name -->
          <div>
            <label
              for="name"
              class="block py-2 text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <input
              id="description"
              v-model="formData.description"
              type="text"
              placeholder="Enter your description"
              class="mt-1 block w-full py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>

          <!-- Select Field: Country -->
          <div>
            <label
              for="country"
              class="block text-sm font-medium text-gray-700"
            >
              Currency
            </label>
            <select
              id="country"
              v-model="formData.currency"
              class="mt-1 block w-full py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            >
              <option value="" disabled>Select Your Currency</option>
              <option
                v-for="(currency, index) in currencies"
                :key="index"
                :value="currency"
              >
                {{ currency }}
              </option>
            </select>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-end">
          <button
            type="submit"
            class="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from "vue";
import axios from "axios";

interface FormData {
  amount: number | null;
  description: string;
  currency: string;
}

export default defineComponent({
  name: "InputComponet",
  setup() {
    // Reactive form data
    const errorMessage = ref<string>("");
    const successMessage = ref<string>("");
    const formData = reactive<FormData>({
      amount: null,
      description: "",
      currency: "",
    });
    // List of countries for the select field
    const currencies = ["USD", "EUR", "BDT", "JPY"];
    watch(successMessage, async () => {
      if (successMessage) {
        formData.amount = null;
        formData.description = "";
        formData.currency = "";
      }
    });
    // Form submission handler
    const handleSubmit = async () => {
      try{

      errorMessage.value = "";
      successMessage.value = "";
      const response = await axios.post("http://localhost:5000/api/expense/", formData);
      successMessage.value = response.data.message;
      }catch(error: unknown){
        if (axios.isAxiosError(error)) {
            errorMessage.value =
              error.response?.data?.message || "An unknown error occurred";
          } else {
            errorMessage.value = "An unexpected error occurred";
          }
      }finally {
        
      }

    };

    return {
      formData,
      currencies,
      handleSubmit,
      errorMessage,
      successMessage,
    };
  },
});
</script>

<style>
/* Add any custom styles here if needed */
</style>
