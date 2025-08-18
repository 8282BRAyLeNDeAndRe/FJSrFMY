// 代码生成时间: 2025-08-19 06:52:40
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  name: 'SortingAlgorithm',
  setup() {
    // State to hold the array to be sorted and the sorted array
    const array = ref<number[]>(Array.from({length: 50}, () => Math.floor(Math.random() * 100) + 1));
    const sortedArray = ref<number[]>([]);

    // Bubble Sort Function
    function bubbleSort(): void {
      let swapped: boolean = false;
      do {
        swapped = false;
        for (let i = 0; i < array.value.length - 1; i++) {
          if (array.value[i] > array.value[i + 1]) {
            const tmp = array.value[i];
            array.value[i] = array.value[i + 1];
            array.value[i + 1] = tmp;
            swapped = true;
          }
        }
      } while (swapped);
      sortedArray.value = [...array.value];
    }

    // Selection Sort Function
    function selectionSort(): void {
      for (let i = 0; i < array.value.length - 1; i++) {
        let minimumIndex = i;
        for (let j = i + 1; j < array.value.length; j++) {
          if (array.value[j] < array.value[minimumIndex]) {
            minimumIndex = j;
          }
        }
        if (minimumIndex !== i) {
          const tmp = array.value[i];
          array.value[i] = array.value[minimumIndex];
          array.value[minimumIndex] = tmp;
        }
      }
      sortedArray.value = [...array.value];
    }

    // Insertion Sort Function
    function insertionSort(): void {
      for (let i = 1; i < array.value.length; i++) {
        let current = array.value[i];
        let j = i - 1;
        while (j >= 0 && array.value[j] > current) {
          array.value[j + 1] = array.value[j];
          j--;
        }
        array.value[j + 1] = current;
      }
      sortedArray.value = [...array.value];
    }

    // Watcher to update UI when the array changes
    watch(array, (newArray) => {
      sortedArray.value = [...newArray];
    }, { deep: true });

    // On component mounted, initialize the array
    onMounted(() => {
      sortedArray.value = [...array.value];
    });

    return {
      array,
      bubbleSort,
      selectionSort,
      insertionSort,
      sortedArray,
    };
  },
});
</script>

<style scoped>
.array-item {
  display: inline-block;
  margin: 4px;
  padding: 4px;
  background-color: #f0f0f0;
}
.array-item:not(:last-child) {
  margin-right: 10px;
}
</style>
