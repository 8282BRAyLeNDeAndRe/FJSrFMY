// 代码生成时间: 2025-08-26 15:59:16
import { defineComponent, onMounted, onUnmounted, ref } from 'vue';

interface Task {
  callback: () => void;
  interval: number;
}

export default defineComponent({
  name: 'SchedulerComponent',
  props: {
    tasks: {
      type: Array,
      required: true,
    }
  },
  setup(props) {
    const activeIntervals = ref<{[key: string]: NodeJS.Timeout}>({});

    // Function to start a task
    function startTask(task: Task): void {
      const intervalId = setInterval(() => {
        task.callback();
      }, task.interval);
      activeIntervals.value[task.callback.name] = intervalId;
    }

    // Function to stop a task
    function stopTask(task: Task): void {
      const intervalId = activeIntervals.value[task.callback.name];
      if (intervalId) {
        clearInterval(intervalId);
        delete activeIntervals.value[task.callback.name];
      } else {
        console.error(`No active interval found for task: ${task.callback.name}`);
      }
    }

    // Start all tasks when the component is mounted
    onMounted(() => {
      props.tasks.forEach(task => {
        startTask(task);
      });
    });

    // Stop all tasks when the component is unmounted
    onUnmounted(() => {
      Object.keys(activeIntervals.value).forEach((key) => {
        stopTask({ callback: () => {}, interval: 0 } as Task); // Using a dummy task to stop intervals
      });
    });

    return {
      startTask,
      stopTask,
    };
  },
});