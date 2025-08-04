// 代码生成时间: 2025-08-04 14:48:34
import { defineComponent, ref } from 'vue';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

interface ZipFileEntry {
  filename: string;
  data: Blob;
}

export default defineComponent({
  name: 'UnzipTool',
  props: {},
  setup() {
    const unzipStatus = ref(''); // Holds the current status of the unzip process
    const filesToUnzip = ref<File[]>([]); // Holds the files selected for unzipping
    const unzippedFiles = ref<ZipFileEntry[]>([]); // Holds the unzipped files data

    const handleFiles = (event: Event) => {
      const files = (event.target as HTMLInputElement).files;
      if (files) {
        filesToUnzip.value = Array.from(files);
      }
    };

    const unzipFiles = async () => {
      unzipStatus.value = 'Unzipping...';

      try {
        const zip = new JSZip();
        for (const file of filesToUnzip.value) {
          await zip.loadAsync(file);
        }

        const zipEntries = zip.file(/\.zip$/);
        if (!zipEntries.length) {
          throw new Error('No zip files found to unzip.');
        }

        for (const entry of zipEntries) {
          const content = await entry.async('blob');
          unzippedFiles.value.push({
            filename: entry.name,
            data: content
          });
        }

        unzipStatus.value = 'Unzipping complete.';
      } catch (error) {
        unzipStatus.value = 'Error: ' + (error as Error).message;
      }
    };

    const downloadUnzippedFiles = () => {
      unzippedFiles.value.forEach(async (fileEntry) => {
        const content = await fileEntry.data;
        saveAs(content, fileEntry.filename);
      });
    };

    return {
      handleFiles,
      unzipFiles,
      downloadUnzippedFiles,
      unzipStatus,
      filesToUnzip,
      unzippedFiles
    };
  },
  template: `
    <div>
      <input type="file" multiple @change="handleFiles($event)"/>
      <button @click="unzipFiles">Unzip Files</button>
      <button @click="downloadUnzippedFiles" :disabled="unzippedFiles.length === 0">Download Unzipped Files</button>
      <p>{{ unzipStatus }}</p>
      <ul v-if="unzippedFiles.length">
        <li v-for="file in unzippedFiles">{{ file.filename }}</li>
      </ul>
    </div>
  `
});
