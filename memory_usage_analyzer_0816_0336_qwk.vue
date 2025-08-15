// 代码生成时间: 2025-08-16 03:36:48
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import Chart from 'chart.js';

// Define the MemoryUsageAnalyzer component
export default defineComponent({
  name: 'MemoryUsageAnalyzer',
  setup() {
    const loading = ref<boolean>(true);
    const error = ref<string>(null);
    const memoryInfo = ref<{ total: number, used: number, free: number }>({ total: 0, used: 0, free: 0 });

    // Function to fetch memory usage data
    async function fetchMemoryUsage() {
      try {
        const response = await fetch('/api/memory-usage');
        if (!response.ok) throw new Error('Failed to fetch memory usage data');
        const data = await response.json();
        memoryInfo.value = data;
      } catch (e) {
        error.value = e.message;
      } finally {
        loading.value = false;
      }
    }

    // Set up the chart
    function setupChart() {
      const ctx = document.getElementById('memoryChart') as HTMLCanvasElement;
      const memoryChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Used', 'Free'],
          datasets: [{
            data: [memoryInfo.value.used, memoryInfo.value.free],
            backgroundColor: ['#FF6384', '#36A2EB'],
          }],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
          },
        },
      });
    }

    onMounted(() => {
      fetchMemoryUsage();
      setupChart();
    });

    onUnmounted(() => {
      // Handle any cleanup if needed, e.g., destroying the chart instance
    });

    return {
      loading,
      error,
      memoryInfo,
    };
  },
});
</script>

<style scoped>
.memory-usage-analyzer {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.memory-chart {
  margin-top: 20px;
  width: 100%;
  max-width: 500px;
  height: 300px;
}
</style>
