// 代码生成时间: 2025-08-03 08:02:12
import { defineComponent, ref } from 'vue';
import { fs, path } from 'fs';
import { promisify } from 'util';
import { existsSync, mkdirSync, readdir, readFileSync, copyFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';

// Define promisified versions of fs functions
const readdirAsync = promisify(readdir);
const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);
const mkdirAsync = promisify(mkdir);

export default defineComponent({
  name: 'FileBackupSyncTool',
  data() {
    return {
      sourcePath: '',
      targetPath: '',
      message: '' as string | null,
    };
  },
  methods: {
    async backupAndSync() {
      try {
        if (!this.sourcePath || !this.targetPath) {
          throw new Error('Source and target directories must be specified.');
        }

        await this.ensureDirectoryExists(this.targetPath);
        const files = await readdirAsync(this.sourcePath);

        for (const file of files) {
          const sourceFile = join(this.sourcePath, file);
          const targetFile = join(this.targetPath, file);

          if (existsSync(targetFile)) {
            // If the file exists in the target, replace it with the source file contents
            await this.replaceFile(sourceFile, targetFile);
          } else {
            // If the file does not exist in the target, copy it over
            await this.copyFile(sourceFile, targetFile);
          }
        }

        this.message = 'Backup and sync completed successfully.';
      } catch (error: any) {
        this.message = error.message;
      }
    },
    async ensureDirectoryExists(directory: string) {
      try {
        await mkdirAsync(directory, { recursive: true });
      } catch (error) {
        throw new Error(`Unable to create directory: ${error.message}`);
      }
    },
    async copyFile(source: string, target: string) {
      try {
        await mkdirAsync(dirname(target), { recursive: true });
        await writeFileAsync(target, await readFileAsync(source));
      } catch (error) {
        throw new Error(`Unable to copy file: ${error.message}`);
      }
    },
    async replaceFile(source: string, target: string) {
      try {
        await this.copyFile(source, target);
      } catch (error) {
        throw new Error(`Unable to replace file: ${error.message}`);
      }
    },
  },
  watch: {
    sourcePath: {
      immediate: true,
      handler(newVal) {
        if (!path.isAbsolute(newVal)) {
          this.message = 'Source path must be an absolute path.';
        }
      },
    },
    targetPath: {
      immediate: true,
      handler(newVal) {
        if (!path.isAbsolute(newVal)) {
          this.message = 'Target path must be an absolute path.';
        }
      },
    },
  },
  mounted() {
    // Additional initialization if necessary
  },
});
</script>

<style scoped>
.message {
  color: red;
}
</style>
