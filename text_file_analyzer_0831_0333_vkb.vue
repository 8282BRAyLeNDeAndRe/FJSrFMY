// 代码生成时间: 2025-08-31 03:33:11
import { defineComponent, ref, computed } from 'vue';

export default defineComponent({
  name: 'TextFileAnalyzer',
  setup() {
    const fileContent = ref<string>('');
    const error = ref<string>('');
    const fileName = ref<string>('');

    const handleFileChange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files) {
        const file = target.files[0];
        fileName.value = file.name;
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          fileContent.value = e.target?.result as string;
          analyzeText(fileContent.value);
        };
        reader.onerror = (errorEvent) => {
          error.value = 'Error reading file';
        };
        reader.readAsText(file);
      }
    };

    const analyzeText = (text: string) => {
      error.value = '';
      const words = text.split(/\s+/);
      const wordCount = words.length;
      console.log('Word count:', wordCount);
      fileContent.value = text; // Update content for display
    };

    return {
      fileContent,
      error,
      fileName,
      handleFileChange,
      wordCount: computed(() => fileContent.value.split(/\s+/).length),
    };
  },
});
</script>

<style scoped>
.text-file-analyzer {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  max-width: 400px;
  margin: 0 auto;
}

.error {
  color: red;
  margin-bottom: 10px;
}

.content {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 4px;
}
</style>
