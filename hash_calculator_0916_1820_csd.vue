// 代码生成时间: 2025-09-16 18:20:20
import { defineComponent, ref } from 'vue';
import { createHash } from 'crypto';

export default defineComponent({
  name: 'HashCalculator',
  props: {},
  setup(props, { emit }) {
    const inputData = ref('');
    const hashResult = ref('');
    const error = ref('');

    const calculateHash = () => {
      try {
        if (!inputData.value) {
          throw new Error('Input data cannot be empty.');
        }

        const hash = createHash('sha256');
        hash.update(inputData.value);
        hashResult.value = hash.digest('hex');
        error.value = '';
      } catch (e: any) {
        hashResult.value = '';
        error.value = e.message;
      }
    };

    return {
      inputData,
      hashResult,
      error,
      calculateHash,
    };
  },
  data() {
    return {};
  },
  methods: {},
  components: {},
  computed: {},
  watch: {},
  mounted() {},
  beforeDestroy() {},
});
</script>

<style scoped>
.error {
  color: red;
}
</style>
