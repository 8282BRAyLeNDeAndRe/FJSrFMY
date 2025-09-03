// 代码生成时间: 2025-09-04 01:55:53
import { defineComponent, ref } from 'vue';
import * as CryptoJS from 'crypto-js';

export default defineComponent({
  name: 'HashCalculator',
  setup() {
    const inputValue = ref('');
    const hashValue = ref('');
    const error = ref('');

    function calculateHash(): void {
      try {
        const hash = CryptoJS.SHA256(inputValue.value).toString();
        hashValue.value = hash;
        error.value = '';
      } catch (e: any) {
        error.value = e.message;
        hashValue.value = '';
      }
    }

    return {
      inputValue,
      calculateHash,
      hashValue,
      error
    };
  }
});
</script>

<style scoped>
.hash-calculator {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

input,
button {
  margin: 10px;
  padding: 10px;
}
</style>
