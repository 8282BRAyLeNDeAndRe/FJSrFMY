// 代码生成时间: 2025-09-13 09:46:15
import { defineComponent } from 'vue';

interface LogEntry {
  message: string;
  timestamp: Date;
}

export default defineComponent({
  name: 'LogParser',
  data() {
    return {
      logEntries: [] as LogEntry[],
      error: '' as string,
    };
  },
  methods: {
    parseLogContent(file: File): LogEntry[] {
      try {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          const content = e.target?.result as string;
          const lines = content.split('
');
          const entries: LogEntry[] = lines.map(line => {
            const parts = line.split(' ');
            const timestamp = new Date(parts[0] + ' ' + parts[1]);
            const message = parts.slice(2).join(' ');
            return { message, timestamp };
          });
          this.logEntries = entries;
        };
        reader.onerror = (e) => {
          this.error = '读取文件时发生错误';
        };
        reader.readAsText(file);
      } catch (error) {
        this.error = '解析日志时发生错误: ' + error.message;
      }
      return [];
    },
    handleFileUpload(event: Event) {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        const file = input.files[0];
        if (file.type !== 'text/plain') {
          this.error = '不支持的文件类型，只支持文本日志文件';
          return;
        }
        this.parseLogContent(file);
     }
    },
  },
});
</script>

<style scoped>
.error {
  color: red;
}
</style>
