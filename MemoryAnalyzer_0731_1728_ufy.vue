// 代码生成时间: 2025-07-31 17:28:57
import { defineComponent, onMounted, ref } from 'vue';
import { getMemoryUsage } from './services/memoryService';

export default defineComponent({
  name: 'MemoryAnalyzer',

  // Component setup
  setup() {
    const memoryUsage = ref<{ used: number; total: number } | null>(null);

    onMounted(async () => {
      try {
        memoryUsage.value = await getMemoryUsage();
      } catch (error) {
        console.error('Failed to fetch memory usage:', error);
      }
    });

    const memoryUsageUsedPercentage = computed(() => {
      if (memoryUsage.value) {
        return (memoryUsage.value.used / memoryUsage.value.total * 100).toFixed(2);
      }
      return 0;
    });

    return {
      memoryUsage,
      memoryUsageUsedPercentage
    };
  }
});
</script>

<style scoped>
/* Add your styles here */
</style>