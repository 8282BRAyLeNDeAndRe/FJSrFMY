// 代码生成时间: 2025-09-29 18:07:57
import axios from 'axios';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'LoadTestTool',
  data() {
    return {
      url: '',
      concurrency: 0,
      duration: 0,
      loading: false,
      error: null,
    };
  },
  methods: {
    async startLoadTest() {
      if (!this.url || !this.concurrency || !this.duration) {
        this.error = '请填写所有字段';
        return;
      }
      this.error = null;
      this.loading = true;
      try {
        const startTime = Date.now();
        const endTime = startTime + (this.duration * 1000);
        const promises: Promise<void>[] = [];
        for (let i = 0; i < this.concurrency; i++) {
          promises.push(this.makeRequest());
        }
        await Promise.all(promises);
        const duration = Date.now() - startTime;
        this.loading = false;
        console.log(`测试完成，持续时间：${duration}毫秒`);
      } catch (e) {
        this.error = e instanceof Error ? e.message : '未知错误';
        this.loading = false;
      }
    },
    async makeRequest() {
      while (Date.now() < endTime) {
        try {
          await axios.get(this.url);
        } catch (error) {
          console.error('请求失败:', error);
        }
      }
    },
  },
});
</script>

<style scoped>
.load-test-tool {
  text-align: center;
}
.error {
  color: red;
}
.loading {
  font-style: italic;
}
</style>