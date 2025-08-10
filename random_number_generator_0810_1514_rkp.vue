// 代码生成时间: 2025-08-10 15:14:45
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'RandomNumberGenerator',
  setup() {
    const min = ref<number | null>(null);
    const max = ref<number | null>(null);
    const randomNumber = ref<number | null>(null);

    // Generates a random number between min and max
    const generateRandomNumber = () => {
      if (min.value === null || max.value === null) {
        alert('Please enter both minimum and maximum values.');
        return;
      }

      if (min.value >= max.value) {
        alert('Minimum value must be less than the maximum value.');
        return;
      }

      randomNumber.value = Math.floor(Math.random() * (max.value - min.value + 1)) + min.value;
    };

    return {
      min,
      max,
      randomNumber,
      generateRandomNumber
    };
  }
});
</script>

<style scoped>
/* Add your styles here */
</style>
