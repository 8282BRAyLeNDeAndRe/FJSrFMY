// 代码生成时间: 2025-08-29 01:16:57
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'RandomNumberGenerator',
    components: {},
    props: {},
    setup() {
        const min = ref<number>(1);
        const max = ref<number>(10);
        const randomNumber = ref<number | null>(null);

        const generateRandomNumber = (): void => {
            if (min.value < 0 || max.value < 0) {
                console.error('Minimum and Maximum values must be non-negative.');
                return;
            }
            if (max.value < min.value) {
                console.error('Maximum value must be greater than or equal to the minimum value.');
                return;
            }
            randomNumber.value = Math.floor(Math.random() * (max.value - min.value + 1)) + min.value;
        };

        return {
            min,
            max,
            randomNumber,
            generateRandomNumber,
        };
    },
});
</script>

<style scoped>
/* Add styles here */
</style>
