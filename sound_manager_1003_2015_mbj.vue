// 代码生成时间: 2025-10-03 20:15:51
import { defineComponent, ref } from 'vue';

interface SoundManagerState {
  sound: HTMLAudioElement | null;
  isPlaying: boolean;
  isSoundReady: boolean;
  error: string | null;
  soundFilePath: string;
}

export default defineComponent({
  name: 'SoundManager',
  data(): SoundManagerState {
    return {
      sound: null,
      isPlaying: false,
      isSoundReady: false,
      error: null,
      soundFilePath: '',
    };
  },
  methods: {
    loadSound(): void {
      this.error = null;
      try {
        const newSound = new Audio(this.soundFilePath);
        newSound.oncanplaythrough = () => {
          this.sound = newSound;
          this.isSoundReady = true;
        };
        newSound.onerror = () => {
          this.error = 'Failed to load sound file';
          this.isSoundReady = false;
        };
      } catch (e) {
        this.error = 'Error loading sound file';
      }
    },
    playSound(): void {
      if (this.sound && this.sound.readyState === 4) {
        this.sound.play().catch(() => {
          this.error = 'Error playing sound';
          this.isPlaying = false;
        });
        this.isPlaying = true;
      } else {
        this.error = 'Sound file is not ready';
      }
    },
    stopSound(): void {
      if (this.sound) {
        this.sound.pause();
        this.sound.currentTime = 0;
        this.isPlaying = false;
      }
    },
  },
  watch: {
    'soundFilePath': function (newPath, oldPath) {
      if (newPath !== oldPath) {
        this.isSoundReady = false;
      }
    },
  },
  beforeUnmount() {
    if (this.sound) {
      this.sound.pause();
      this.sound = null;
    }
  },
  mounted() {
    // Optionally, you can load a default sound file here.
  },
  computed: {
    isSoundReady: {
      get: function () {
        return this.data().isSoundReady;
      },
      set: function (value) {
        this.data().isSoundReady = value;
      },
    }
  },
});
</script>

<style scoped>
.error {
  color: red;
}
</style>
