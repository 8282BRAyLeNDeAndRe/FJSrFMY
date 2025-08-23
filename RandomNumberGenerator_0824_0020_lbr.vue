// 代码生成时间: 2025-08-24 00:20:52
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'RandomNumberGenerator',
  setup() {
    // State for the minimum and maximum values
    const min = ref<number | null>(null);
    const max = ref<number | null>(null);
    // State to store the generated random number
    const randomNumber = ref<number | null>(null);
    
    // Function to generate a random number
    const generate = () => {
      if (min.value === null || max.value === null || min.value >= max.value) {
        console.error('Error: Invalid range. Please provide valid minimum and maximum values.');
        return;
      }
      // Generate a random number between min and max (inclusive)
      randomNumber.value = Math.floor(Math.random() * (max.value! - min.value! + 1)) + min.value!;
    };
    
    // Computed property to determine if the generate button should be enabled
    const isGenerateButtonEnabled = () => {
      return min.value !== null && max.value !== null && min.value < max.value;
    };
    
    return {
      min,
      max,
      randomNumber,
      generate,
      isGenerateButtonEnabled
    };
  }
});
</script>

<style scoped>
/* Styles for the Random Number Generator Component */
input[type="number"] {
  margin-right: 10px;
}
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
