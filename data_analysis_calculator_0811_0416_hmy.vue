// 代码生成时间: 2025-08-11 04:16:13
import { defineComponent, ref } from 'vue';

interface Result {
  mean: number;
  median: number;
  mode: number[];
  range: number;
}

// Helper function to calculate mean
function calculateMean(data: number[]): number {
  const sum = data.reduce((acc, val) => acc + val, 0);
  return sum / data.length;
}

// Helper function to calculate median
function calculateMedian(data: number[]): number {
  const sortedData = [...data].sort((a, b) => a - b);
  const middleIndex = Math.floor(sortedData.length / 2);
  if (sortedData.length % 2 === 0) {
    return (sortedData[middleIndex] + sortedData[middleIndex - 1]) / 2;
  }
  return sortedData[middleIndex];
}

// Helper function to calculate mode
function calculateMode(data: number[]): number[] {
  const frequencyMap = data.reduce((map, value) => {
    map[value] = (map[value] || 0) + 1;
    return map;
  }, {} as Record<number, number>);
  const maxFrequency = Math.max(...Object.values(frequencyMap));
  return Object.keys(frequencyMap).filter(key => frequencyMap[key] === maxFrequency).map(Number);
}

// Helper function to calculate range
function calculateRange(data: number[]): number {
  return Math.max(...data) - Math.min(...data);
}

export default defineComponent({
  name: 'DataAnalysisCalculator',
  setup() {
    const inputData = ref<string>('');
    const results = ref<Result[]>([]);

    function calculate() {
      try {
        if (!inputData.value) {
          throw new Error('No data provided.');
        }
        
        const numbers = inputData.value.split(',').map(item => parseFloat(item.trim()));
        if (numbers.some(isNaN)) {
          throw new Error('Data contains non-numeric values.');
        }
        
        const mean = calculateMean(numbers);
        const median = calculateMedian(numbers);
        const mode = calculateMode(numbers);
        const range = calculateRange(numbers);
        
        results.value = [{ mean, median, mode, range }];
      } catch (error) {
        console.error(error);
        // Handle error by showing a message to the user
        alert(error instanceof Error ? error.message : 'An error occurred.');
      }
    }

    return {
      inputData,
      results,
      calculate,
    };
  },
});
</script>

<style>
/* Add your styles here */
</style>
