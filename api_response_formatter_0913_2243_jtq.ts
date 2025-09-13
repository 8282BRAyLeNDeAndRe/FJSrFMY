// 代码生成时间: 2025-09-13 22:43:17
 * This component provides a user interface to format API responses.
 * It can be easily integrated into existing Vue applications.
 */

import { defineComponent } from 'vue';

// Type definitions for API response
interface ApiResponse {
  status: 'success' | 'error';
  data?: any;
  error?: string;
}

export default defineComponent({
  name: 'ApiResponseFormatter',
  props: {
    response: {
      type: Object as () => ApiResponse,
      required: true,
    },
  },
  data() {
    return {
      formattedResponse: '',
      error: null,
    };
  },
  methods: {
    formatResponse() {
      try {
        const { status, data, error } = this.response;
        if (status === 'success') {
          this.formattedResponse = JSON.stringify(data, null, 2);
          this.error = null;
        } else {
          this.error = error;
          this.formattedResponse = '';
        }
      } catch (e) {
        this.error = 'Failed to format response: ' + e instanceof Error ? e.message : String(e);
        this.formattedResponse = '';
      }
    },
  },
  watch: {    
    response: {
      handler(newValue) {
        this.formatResponse();
      },
      deep: true,
    },
  },
  mounted() {
    this.formatResponse();
  },
  template: `<div>
    <h2>Formatted API Response</h2>
    <pre v-if="formattedResponse">{{ formattedResponse }}</pre>
    <p v-if="error" class="error">{{ error }}</p>
  </div>`,
});