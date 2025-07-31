// 代码生成时间: 2025-08-01 07:06:34
import { defineComponent } from 'vue';

interface FolderStructure {
    path: string;
    files: string[];
    subFolders: FolderStructure[];
}

export default defineComponent({
    name: 'FolderStructureOrganizer',
    data() {
        return {
            files: [],
            folders: [] as FolderStructure[],
            error: '' as string | null,
        };
    },
    methods: {
        async handleFileInput(event: Event) {
            const input = event.target as HTMLInputElement;
            if (!input.files) {
                this.error = 'No files selected';
                return;
            }
            this.files = Array.from(input.files);
        },
        async organizeStructure() {
            try {
                this.folders = await this.buildFolderStructure(this.files);
                this.error = null;
            } catch (error) {
                this.error = 'Error organizing folder structure';
            }
        },
        async buildFolderStructure(files: File[]): Promise<FolderStructure[]> {
            const structure: FolderStructure[] = [];
            for (const file of files) {
                const folderPath = file.webkitRelativePath;
                const folderStructure = this.findFolder(folderPath, structure);
                folderStructure.files.push(file.name);
            }
            return structure;
        },
        findFolder(path: string, structure: FolderStructure[]): FolderStructure {
            let folder = structure.find(f => f.path === path);
            if (!folder) {
                const parts = path.split('/');
                let currentStructure = structure;
                for (let i = 0; i < parts.length - 1; i++) {
                    const part = parts[i];
                    const subFolder = currentStructure.find(f => f.path === part);
                    if (!subFolder) {
                        subFolder = { path: part, files: [], subFolders: [] };
                        currentStructure.push(subFolder);
                    }
                    currentStructure = subFolder.subFolders;
                }
                folder = { path: parts[parts.length - 1], files: [], subFolders: [] };
                currentStructure.push(folder);
            }
            return folder;
        },
    },
});
</script>

<style scoped>
.error-message {
    color: red;
}
.output pre {
    white-space: pre-wrap;
}
</style>
