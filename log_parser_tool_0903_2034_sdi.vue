// 代码生成时间: 2025-09-03 20:34:19
import { defineComponent, ref } from 'vue';

interface LogEntry {
  timestamp: string;
  level: string;
  message: string;
}

export default defineComponent({
  name: 'LogParserTool',
  setup() {
    const errorMessage = ref<string>('');
    const parsedLogs = ref<string[]>([]);

    function parseLogFile(file: File): LogEntry[] {
      try {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            const text = e.target.result as string;
            const lines = text.split('\
');
            const parsedLines: LogEntry[] = lines.map((line) => {
              const parts = line.split(' '); // Assuming the log format is space-separated
              return {
                timestamp: parts[0],
                level: parts[1],
                message: parts.slice(2).join(' '),
              };
            });
            parsedLogs.value = JSON.stringify(parsedLines, null, 2);
          }
        };
        reader.readAsText(file);
      } catch (error) {
        errorMessage.value = '解析日志文件时出错: ' + error.message;
      }
    }

    function handleFileUpload(event: Event): void {
      const inputElement = event.target as HTMLInputElement;
      if (inputElement.files) {
        const file = inputElement.files[0];
        if (!file) {
          errorMessage.value = '请选择一个文件';
          return;
        }
        parseLogFile(file);
      }
    }

    return {
      errorMessage,
      parsedLogs,
      handleFileUpload,
    };
  },
});
</script>

<style scoped>
.error-message {
  color: red;
}
.parsed-logs pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
