// 代码生成时间: 2025-08-25 23:34:20
import { defineComponent, ref, computed } from 'vue';
import ThemeToggler from './components/ThemeToggler.vue';
import ContentDisplay from './components/ContentDisplay.vue';

export default defineComponent({
  name: 'ThemeSwitcher',
  components: {
    ThemeToggler,
    ContentDisplay
  },
  setup() {
    const themes = ['light', 'dark'];
    const currentTheme = ref<string>('light');

    // Computed property to determine the current theme class
    const currentThemeClass = computed(() => {
      return `theme-${currentTheme.value}`;
    });

    // Function to toggle between themes
    function toggleTheme() {
      if (!themes.includes(currentTheme.value)) {
        console.error('Invalid theme');
        return;
      }
      const nextThemeIndex = (themes.indexOf(currentTheme.value) + 1) % themes.length;
      currentTheme.value = themes[nextThemeIndex];
    }

    return {
      currentTheme,
      currentThemeClass,
      toggleTheme
    };
  }
});
</script>

<style scoped>
/* Define base styles for light and dark themes */
.theme-light {
  background-color: #fff;
  color: #333;
}

.theme-dark {
  background-color: #333;
  color: #fff;
}
</style>
