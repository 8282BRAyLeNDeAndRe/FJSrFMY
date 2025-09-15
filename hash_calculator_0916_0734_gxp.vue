// 代码生成时间: 2025-09-16 07:34:51
    <input v-model="inputString" type="text" placeholder="Enter text to hash"/>

    <!-- 下拉菜单，用于选择哈希算法 -->
    <select v-model="selectedHashAlgorithm">
      <option value="sha256">SHA-256</option>
      <option value="md5">MD5</option>
      <option value="sha512">SHA-512</option>
    </select>

    <!-- 按钮，用于触发哈希计算 -->
    <button @click="calculateHash">Calculate Hash</button>

    <!-- 显示计算结果 -->
    <div v-if="hashResult" class="result">
      Hash Result: {{ hashResult }}
    </div>

    <!-- 显示错误信息 -->
    <div v-if="error" class="error">
      Error: {{ error }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import * as CryptoJS from 'crypto-js';

export default defineComponent({
  name: 'HashCalculator',

  data() {
    return {
      inputString: '',
      selectedHashAlgorithm: 'sha256',
      hashResult: null,
      error: null,
    };
  },

  methods: {
    // 计算哈希值的方法
    calculateHash() {
      try {
        const algorithm = this.selectedHashAlgorithm;
        let hash;

        switch (algorithm) {
          case 'sha256':
            hash = CryptoJS.SHA256(this.inputString).toString();
            break;
          case 'md5':
            hash = CryptoJS.MD5(this.inputString).toString();
            break;
          case 'sha512':
            hash = CryptoJS.SHA512(this.inputString).toString();
            break;
          default:
            throw new Error('Unsupported hash algorithm');
        }

        this.hashResult = hash;
        this.error = null;
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'An unknown error occurred';
        this.hashResult = null;
      }
    },
  },

  setup() {
    // 组件逻辑可以在这里定义
  },
});
</script>

<style scoped>
.hash-calculator {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

input, select, button {
  margin: 10px;
  padding: 10px;
}

.result, .error {
  color: #333;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #ccc;
}

.error {
  color: red;
}
</style>
