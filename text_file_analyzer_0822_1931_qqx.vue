// 代码生成时间: 2025-08-22 19:31:02
import { defineComponent, ref } from 'vue';

interface AnalysisResult {
    totalLines: number;
    totalWords: number;
    totalCharacters: number;
    longestLine: number;
}

export default defineComponent({
    name: 'TextFileAnalyzer',
    setup() {
        const fileContent = ref<string | null>(null);
        const analysisResult = ref<AnalysisResult | null>(null);
        const error = ref<string | null>(null);

        function handleFileUpload(event: Event): void {
            const target = event.target as HTMLInputElement;
            if (target.files) {
                const file = target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        if (e.target && e.target.result) {
                            fileContent.value = e.target.result as string;
                            error.value = null;
                            analyzeTextFile(fileContent.value);
                        }
                    };
                    reader.onerror = () => {
                        error.value = '文件读取失败';
                        fileContent.value = null;
                    };
                    reader.readAsText(file);
                } else {
                    error.value = '未选择文件';
                }
            } else {
                error.value = '没有文件';
            }
        }

        function analyzeTextFile(content: string): void {
            const lines = content.split('
');
            const totalLines = lines.length;
            const totalWords = lines.reduce((sum, line) => sum + line.split(' ').length, 0);
            const totalCharacters = content.length;
            const longestLine = lines.reduce((max, line) => Math.max(max, line.length), 0);

            analysisResult.value = {
                totalLines,
                totalWords,
                totalCharacters,
                longestLine
            };
        }

        return {
            fileContent,
            analysisResult,
            error,
            handleFileUpload
        };
    }
});
</script>

<style scoped>
.error {
    color: red;
}
</style>

<!-- 文档说明 -->

/**
 * 组件：TextFileAnalyzer
 * 功能：文本文件内容分析器
 * 描述：允许用户上传文本文件，并分析文件内容，显示总行数、总字数、总字符数以及最长行的长度。
 * 错误处理：如果读取文件失败或没有选择文件，会显示相应的错误信息。
 */