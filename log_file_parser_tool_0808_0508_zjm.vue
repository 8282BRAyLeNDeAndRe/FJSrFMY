// 代码生成时间: 2025-08-08 05:08:28
import { defineComponent, ref } from 'vue';

// Interface for Log Entry
interface LogEntry {
    timestamp: string;
    level: string;
    message: string;
}

export default defineComponent({
    name: 'LogFileParserTool',
    components: {},
    props: {},
    setup() {
        const parsedLogEntries = ref<string[]>([]);

        const handleFileUpload = async (event: Event) => {
            try {
                const file = (event.target as HTMLInputElement).files?.[0];
                if (file && file.name.endsWith('.log')) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        try {
                            const result = e.target?.result as string;
                            if (result) {
                                const logEntries = parseLog(result);
                                parsedLogEntries.value = logEntries;
                            }
                        } catch (error) {
                            console.error('Error parsing log file:', error);
                        }
                    };
                    reader.onerror = (e) => {
                        console.error('Error reading file:', e);
                    };
                    reader.readAsText(file);
                } else {
                    console.error('Please upload a .log file.');
                }
            } catch (error) {
                console.error('Error handling file upload:', error);
            }
        };

        // Function to parse the log file content into an array of LogEntry objects
        const parseLog = (content: string): LogEntry[] => {
            const lines = content.split('
');
            return lines.map(line => {
                // Assuming the log format is 'timestamp level: message'
                const parts = line.split(' ');
                if (parts.length < 2) return null;
                const timestamp = parts[0];
                const level = parts[1];
                const message = parts.slice(2).join(' ');
                return { timestamp, level, message } as LogEntry;
            }).filter(entry => entry !== null);
        };

        return {
            handleFileUpload,
            parsedLogEntries,
        };
    },
});
</script>

<style scoped>
    /* Add your styles here */
</style>
