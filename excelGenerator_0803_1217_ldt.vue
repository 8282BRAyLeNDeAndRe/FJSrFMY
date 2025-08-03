// 代码生成时间: 2025-08-03 12:17:51
// <template>
//   <div>
//     <button @click="generateExcel">Generate Excel</button>
//   </div>
// </template>

// <script lang="ts">
import { defineComponent } from 'vue';
import { Workbook } from 'exceljs'; // 引入ExcelJS库
import fs from 'fs'; // 引入文件系统模块
import path from 'path';

// 定义组件
export default defineComponent({
  name: 'ExcelGenerator',

  // 组件方法
  methods: {
    // 生成Excel文件的方法
    async generateExcel() {
      try {
        // 创建一个新的工作簿
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet('My Sheet');

        // 向工作表中添加数据
        worksheet.columns = [
          { header: 'ID', key: 'id', width: 10 },
          { header: 'Name', key: 'name', width: 32 },
          { header: 'D.O.B.', key: 'dob', width: 10 },
          // 可以继续添加更多的列
        ];

        // 添加一些示例数据
        worksheet.addRow({ id: 1, name: 'John Doe', dob: '1990-01-01' });
        worksheet.addRow({ id: 2, name: 'Jane Doe', dob: '1991-02-02' });

        // 保存工作簿为.xlsx文件
        const buffer = await workbook.xlsx.writeBuffer();
        const filePath = path.join(__dirname, 'output.xlsx');
        fs.writeFileSync(filePath, buffer);

        // 提示用户文件已生成
        alert('Excel file has been generated successfully!');
      } catch (error) {
        // 错误处理
        console.error('Error generating Excel file:', error);
        alert('Failed to generate Excel file.');
      }
    },
  },

  // 设置组件的mounted生命周期钩子
  mounted() {
    // 这里可以放置一些初始化代码，例如检查文件系统权限等
  },
});
// </script>

// <style scoped>
//   /* 组件的样式 */
// </style>