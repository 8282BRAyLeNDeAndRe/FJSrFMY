// 代码生成时间: 2025-08-03 21:21:19
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'HashCalculator',
  setup() {
    const inputText = ref<string>('');
    const hashResult = ref<string | null>(null);
    const errorMessage = ref<string | null>(null);

    function calculateHash(): void {
      try {
        const encoder = new TextEncoder();
        const data = encoder.encode(inputText.value);
        const hashBuffer = crypto.subtle.digest('SHA-256', data)
          .then((hashBuffer) => {
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            hashResult.value = hashArray
              .map(b => b.toString(16).padStart(2, '0'))
              .join('');
          })
          .catch((error) => {
            throw error;
          });
      } catch (error: any) {
        errorMessage.value = error.message;
        hashResult.value = null;
      }
    }

    return {
      inputText,
      hashResult,
      errorMessage,
      calculateHash,
    };
  },
});
</script>

<style>
.hash-calculator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.result, .error {
  color: red;
}
</style>
