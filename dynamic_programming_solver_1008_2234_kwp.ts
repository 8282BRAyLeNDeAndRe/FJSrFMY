// 代码生成时间: 2025-10-08 22:34:48
import { defineComponent, ref } from 'vue';

/**
 * 动态规划解决器组件
 * 该组件提供动态规划算法的实现和展示
 * 它允许用户输入动态规划问题的相关参数，如目标状态、转移关系等，并展示求解过程和结果。
 */
export default defineComponent({
    name: 'DynamicProgrammingSolver',
    setup() {
        // 定义状态和变量
        const dpTable = ref<Array<Array<number>>>([]);
        const stateCount = ref<number>(0); // 状态总数
        const targetState = ref<number>(0); // 目标状态
        const transitions = ref<Array<Array<number>>>([[]]); // 转移关系

        /**
         * 执行动态规划算法
         * 根据输入的参数，计算动态规划表并展示结果
         */
        function executeDynamicProgramming(): void {
            try {
                // 检查输入参数是否合理
                if (stateCount.value < 1 || targetState.value >= stateCount.value || transitions.value.length !== stateCount.value) {
                    throw new Error('输入参数不合理');
                }

                // 初始化动态规划表
                dpTable.value = Array.from({ length: stateCount.value }, () =>
                    Array(stateCount.value).fill(-1)
                );

                // 执行动态规划算法
                for (let i = 0; i < stateCount.value; i++) {
                    dpTable.value[i][i] = 0;
                }

                for (let gap = 1; gap < stateCount.value; gap++) {
                    for (let i = 0; i < stateCount.value - gap; i++) {
                        let minimum = Number.MAX_SAFE_INTEGER;
                        for (let j = i; j < i + gap; j++) {
                            if (dpTable.value[i][j] !== -1 && dpTable.value[j + 1][i + gap] !== -1) {
                                minimum = Math.min(minimum, dpTable.value[i][j] + dpTable.value[j + 1][i + gap] + transitions.value[i][j]);
                            }
                        }
                        dpTable.value[i][i + gap] = minimum === Number.MAX_SAFE_INTEGER ? -1 : minimum;
                    }
                }

                // 展示结果
                console.log('动态规划表:', dpTable.value);
                console.log(`从状态0到状态${targetState.value}的最短路径长度为: ${dpTable.value[0][targetState.value]}`);

            } catch (error) {
                console.error('动态规划算法执行错误:', error);
            }
        }

        return {
            dpTable,
            stateCount,
            targetState,
            transitions,
            executeDynamicProgramming
        };
    }
});