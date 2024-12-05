<template>
  <div class="text-left rtl:text-right"></div>
  <div v-if="loading" class="text-center">
    <div role="status">
      <svg
        aria-hidden="true"
        class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span class="sr-only">Loading...</span>
    </div>
  </div>
  <div class="text-right rtl:text-left"></div>

  <div class="w-full flex flex-col items-center justify-center py-4">
    <div v-if="errorMessage" class="error">
      <p class="text-red-600">Error: {{ errorMessage }}</p>
    </div>
    <div class="md:w-[43%] w-[65%] py-3 rounded-lg">
      <label for="country" class="block text-sm font-medium text-gray-700">
        Currency Summary
      </label>
      <select
        id="country"
        v-model="currencyData"
        class="mt-1 block w-full border py-3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
      <div class="flex flex-col">
        <div>
          <h1>
            Total Amount:<b class="text-blue-500 ml-1">{{
              totalAmountOfData?.total
            }}</b>
          </h1>
          <h1>
            Currency:<b class="text-red-500 ml-1">{{
              totalAmountOfData?.baseCurrency
            }}</b>
          </h1>
        </div>
        <div>
          <div class="flex justify-end -mt-10">
            <button
              @click="addSummary"
              class="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              Summary
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    class="overflow-x-auto flex-col container flex items-center justify-center w-full"
  >
    <table
      class="min-w-[43%] table-auto border-collapse border border-gray-300"
    >
      <thead>
        <tr class="bg-gray-100">
          <th class="px-4 py-2 border border-gray-300 text-left">Amount</th>
          <th class="px-4 py-2 border border-gray-300 text-left">Currency</th>
          <th class="px-4 py-2 border border-gray-300 text-left">
            Description
          </th>
        </tr>
      </thead>
      <tbody>
        <!-- Loop through the table data -->
        <tr
          v-for="(data, index) in alldata"
          :key="index"
          class="hover:bg-gray-50"
        >
          <td class="px-4 py-2 border border-gray-300">{{ data.amount }}</td>
          <td class="px-4 py-2 border border-gray-300">{{ data.currency }}</td>
          <td class="px-4 py-2 border border-gray-300">
            {{ data.description }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import axios from "axios";
interface Expenses {
  amount: number | null;
  description: string;
  currency: string;
}
interface ExpensesTotal {
  total: number | null;
  baseCurrency: string;
}
export default defineComponent({
  name: "GetAllExpenseComponent",
  setup() {
    const alldata = ref<Expenses[]>([]);
    const totalAmountOfData = ref<ExpensesTotal>({
      total: 0 || null,
      baseCurrency: "",
    });
    const loading = ref<boolean>(false);
    const errorMessage = ref<string | null>(null);
    const currencyData = ref<string | null>(null);
    const currencies = ["USD", "EUR", "BDT", "JPY"];
    const fetchData = async () => {
      loading.value = true;
      try {
        const response = await axios.get("https://node-vue-currency.onrender.com/api/expense/");
        alldata.value = response.data?.allExpenses;
      } catch (error:unknown) {
        if (axios.isAxiosError(error)) {
          errorMessage.value = error.response?.data?.message || "An unknown error occurred";
        } else {
          errorMessage.value = "An unexpected error occurred";
        }
        loading.value = false;
      } finally {
        loading.value = false;
      }
    };
    onMounted(fetchData);

    const addSummary = async () => {
      loading.value = true;
      try {
        const response = await axios.get(
          `https://node-vue-currency.onrender.com/api/summary/?baseCurrency=${currencyData.value}`
        );
        totalAmountOfData.value = response.data;
      } catch (error:unknown) {
        if (axios.isAxiosError(error)) {
          errorMessage.value = error.response?.data?.message || "An unknown error occurred";
        } else {
          errorMessage.value = "An unexpected error occurred";
        }
        loading.value = false;
      } finally {
        loading.value = false;
      }
    };

    return {
      alldata,
      errorMessage,
      loading,
      currencies,
      currencyData,
      totalAmountOfData,
      addSummary,
    };
  },
});
</script>
