// 代码生成时间: 2025-09-18 15:14:35
// Import necessary Vue components
import { defineComponent } from 'vue';

// Define a type for a sortable array of numbers
type SortableArray = number[];

// Define a component that includes sorting functionality
const SortAlgorithmComponent = defineComponent({
  data() {
    return {
      arrayToSort: [] as SortableArray,
      sortedArray: [] as SortableArray,
      error: '' as string
    };
  },
  methods: {
    // Method to sort the array using the Bubble Sort algorithm
    bubbleSort(array: SortableArray): SortableArray {
      try {
        let swapped: boolean;
        for (let i = 0; i < array.length; i++) {
          swapped = false;
          for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
              // Swap elements
              [array[j], array[j + 1]] = [array[j + 1], array[j]];
              swapped = true;
            }
          }
          // If no elements were swapped, the array is sorted
          if (!swapped) {
            break;
          }
        }
        return array;
      } catch (error) {
        this.error = 'Error during sorting: ' + error;
        throw error;
      }
    },
    // Method to sort the array using the Quick Sort algorithm
    quickSort(array: SortableArray): SortableArray {
      try {
        if (array.length <= 1) {
          return array;
        }
        const pivot = array[array.length - 1];
        const left: SortableArray = [];
        const right: SortableArray = [];
        for (let i = array.length - 2; i >= 0; i--) {
          if (array[i] < pivot) {
            left.unshift(array[i]);
          } else {
            right.push(array[i]);
          }
        }
        return [...this.quickSort(left), pivot, ...this.quickSort(right)];
      } catch (error) {
        this.error = 'Error during sorting: ' + error;
        throw error;
      }
    },
    // Method to sort the array using the Insertion Sort algorithm
    insertionSort(array: SortableArray): SortableArray {
      try {
        for (let i = 1; i < array.length; i++) {
          let current = array[i];
          let j = i - 1;
          while (j >= 0 && array[j] > current) {
            array[j + 1] = array[j];
            j--;
          }
          array[j + 1] = current;
        }
        return array;
      } catch (error) {
        this.error = 'Error during sorting: ' + error;
        throw error;
      }
    }
  },
  mounted() {
    // Example usage: sorting an array of numbers
    this.arrayToSort = [5, 3, 8, 4, 2];
    this.sortedArray = this.bubbleSort([...this.arrayToSort]);
  }
});

export default SortAlgorithmComponent;