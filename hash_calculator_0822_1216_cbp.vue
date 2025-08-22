// 代码生成时间: 2025-08-22 12:16:28
import { defineComponent, ref } from 'vue';
import * as CryptoJS from 'crypto-js';

export default defineComponent({
    name: 'HashCalculator',
    components: {},
    props: {},
    setup() {
        const inputText = ref('');
        const selectedAlgorithm = ref('sha256');
        const hashResult = ref<string | null>(null);
        const error = ref<string | null>(null);

        function calculateHash(): void {
            try {
                const hash = CryptoJS[selectedAlgorithm.value](inputText.value).toString();
                hashResult.value = hash;
                error.value = null;
            } catch (e: any) {
                hashResult.value = null;
                error.value = e.message;
            }
        }

        return {
            inputText,
            selectedAlgorithm,
            hashResult,
            error,
            calculateHash,
        };
    },
});
</script>

<style scoped>
.error {
    color: red;
}
</style>

<!--
组件说明：
这个Vue组件是一个简单的哈希值计算工具。它允许用户输入文本，并选择一个哈希算法来计算输入文本的哈希值。
用户可以选择SHA-256、MD5和SHA-1等算法。点击计算按钮后，组件将显示计算出的哈希值或错误信息。
-->