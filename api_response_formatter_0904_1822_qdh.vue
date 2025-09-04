// 代码生成时间: 2025-09-04 18:22:47
// api_response_formatter.vue
<template>
  <div>
    <h1>API Response Formatter</h1>
    <textarea v-model="apiResponse" rows="10" cols="50"></textarea>
    <button @click="formatResponse">Format Response</button>
    <div v-if="formattedResponse">{{ formattedResponse }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  name: 'ApiResponseFormatter',
  setup() {
    const apiResponse = ref<string>('\'); // Holds the raw API response
    const formattedResponse = ref<string>('\'); // Holds the formatted API response

    // Function to format the API response
    function formatResponse(): void {
      try {
        // Attempt to parse the JSON response
        const parsedResponse = JSON.parse(apiResponse.value);
        // Format the JSON response
        formattedResponse.value = JSON.stringify(parsedResponse, null, 2);
      } catch (error) {
        // Handle parsing errors
        console.error('Error formatting response:', error);
        formattedResponse.value = 'Invalid JSON response';
      }
    }

    // Return the reactive state and methods to the template
    return {
      apiResponse,
      formattedResponse,
      formatResponse,
    };
  },
});
</script>

<style scoped>
/* Add your CSS styles here */
</style>
