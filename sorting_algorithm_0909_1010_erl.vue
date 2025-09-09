// 代码生成时间: 2025-09-09 10:10:22
import { defineComponent } from "vue";

export default defineComponent({
  name: "SortingAlgorithm",

  data() {
    return {
      originalData: [5, 3, 8, 4, 2, 9, 1, 6, 7],
      sortedData: [] as number[]
    };
  },

  methods: {
    // Sorts the data using the bubble sort algorithm
    sortData() {
      const data = [...this.originalData]; // Create a copy of the original data
      try {
        this.bubbleSort(data);
        this.sortedData = data;
      } catch (error) {
        console.error("An error occurred during sorting: ", error);
      }
    },

    // Bubble Sort algorithm implementation
    bubbleSort(arr: number[]): void {
      const len = arr.length;
      for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - i - 1; j++) {
          if (arr[j] > arr[j + 1]) {
            // Swap elements
            const temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
          }
        }
      }
    }
  },

  mounted() {
    // Initialize sortedData with a copy of originalData
    this.sortedData = [...this.originalData];
  }
});
</script>

<style scoped>
div {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
}

div > div {
  width: 20px;
  margin: 2px;
  background-color: #42b983;
  color: white;
  text-align: center;
}
</style>
