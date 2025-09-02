// 代码生成时间: 2025-09-02 20:09:41
import { defineComponent, reactive, onMounted } from 'vue';

interface SortableArray extends Array<number> {
    temp?: boolean;
}

export default defineComponent({
    name: 'SortingAlgorithm',
    setup() {
        const state = reactive({
            array: new Array(100).fill(0).map(() => Math.floor(Math.random() * 100) + 1),
            delay: 100,
        });

        const bubbleSort = (): void => {
            let swapped: boolean;
            do {
                swapped = false;
                for (let i = 0; i < state.array.length - 1; i++) {
                    if (state.array[i] > state.array[i + 1]) {
                        swap(i, i + 1);
                        swapped = true;
                    }
                }
            } while (swapped);
        };

        const selectionSort = (): void => {
            for (let i = 0; i < state.array.length - 1; i++) {
                let minIndex = i;
                for (let j = i + 1; j < state.array.length; j++) {
                    if (state.array[j] < state.array[minIndex]) {
                        minIndex = j;
                    }
                }
                swap(i, minIndex);
            }
        };

        const insertionSort = (): void => {
            for (let i = 1; i < state.array.length; i++) {
                let key = state.array[i];
                let j = i - 1;
                while (j >= 0 && state.array[j] > key) {
                    state.array[j + 1] = state.array[j];
                    j--;
                }
                state.array[j + 1] = key;
            }
        };

        const swap = (index1: number, index2: number): void => {
            if (index1 !== index2) {
                state.array[index1].temp = true;
                state.array[index2].temp = true;
                setTimeout(() => {
                    let temp = state.array[index1];
                    state.array[index1] = state.array[index2];
                    state.array[index2] = temp;
                    state.array[index1].temp = false;
                    state.array[index2].temp = false;
                }, state.delay);
            }
        };

        onMounted(() => {
            console.log('Sorting Algorithm Component Mounted');
        });

        return {
            ...state,
            bubbleSort,
            selectionSort,
            insertionSort,
        };
    },
});
</script>

<style scoped>
li {
    list-style-type: none;
    background-color: #3498db;
    color: white;
    text-align: center;
    line-height: 40px;
    margin: 5px;
}
</style>
