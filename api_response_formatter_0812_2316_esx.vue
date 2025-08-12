// 代码生成时间: 2025-08-12 23:16:20
import { defineComponent, ref } from 'vue';

interface ApiResponse {
  [key: string]: any;
}

export default defineComponent({
  name: 'ApiFormatter',
  setup() {
    const apiResponse = ref<string>('');
    const formattedResponse = ref<string>('');
    const error = ref<string>('');

    const formatResponse = () => {
      try {
        const parsedResponse = JSON.parse(apiResponse.value);
        formattedResponse.value = JSON.stringify(parsedResponse, null, 2);
      } catch (e) {
        error.value = 'Invalid JSON format';
      }
    };

    return {
      apiResponse,
      formattedResponse,
      error,
      formatResponse,
    };
  },
});
</script>

<style scoped>
.formatted-response pre {
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  padding: 10px;
  white-space: pre-wrap;
}

.error-message {
  color: red;
}
</style>
