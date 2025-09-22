// 代码生成时间: 2025-09-23 00:44:31
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'JsonDataFormatter',
  setup() {
    const inputData = ref('');
    const formattedData = ref('');
    const error = ref('');

    function formatJSON(): void {
      try {
        const parsed = JSON.parse(inputData.value);
        formattedData.value = JSON.stringify(parsed, null, 2);
        error.value = '';
      } catch (e) {
        error.value = 'Invalid JSON';
        formattedData.value = '';
      }
    }

    return {
      inputData,
      formattedData,
      error,
      formatJSON
    };
  }
});
</script>

<style scoped>
  .error {
    color: red;
  }
</style>

/*
 * JSON Data Formatter Vue Component
 * This component allows users to input JSON data,
 * and then format it into a more readable form.
 *
 * @author Your Name
 * @version 1.0
 * @license MIT
 */