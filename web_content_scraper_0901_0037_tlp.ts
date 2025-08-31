// 代码生成时间: 2025-09-01 00:37:12
import Vue from 'vue';
import axios from 'axios';

interface ScrapedContent {
  url: string;
  content: string;
  error?: string;
}

const app = new Vue({
  el: '#app',
  data: {
    urlInput: '',
    scrapedContent: '' as string,
    error: '',
  },
  methods: {
    async fetchContent(): Promise<void> {
      try {
        // Reset scraped content and error message
        this.scrapedContent = '';
        this.error = '';

        // Validate URL input
        if (!this.urlInput) {
          throw new Error('URL input is required.');
        }

        // Fetch content from the specified URL
        const response = await axios.get(this.urlInput);
        this.scrapedContent = response.data;
      } catch (error) {
        // Handle any errors that occur during the fetch
        this.error = error instanceof Error ? error.message : 'An unknown error occurred.';
      }
    },
  },
  computed: {
    scrapedContentObj(): ScrapedContent {
      return {
        url: this.urlInput,
        content: this.scrapedContent,
        error: this.error,
      };
    },
  },
  watch: {
    // Re-fetch content when the URL input changes
    urlInput(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.fetchContent();
      }
    },
  },
});
