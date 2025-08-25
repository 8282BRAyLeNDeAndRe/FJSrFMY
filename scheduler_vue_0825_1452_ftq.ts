// 代码生成时间: 2025-08-25 14:52:57
 * It creates a simple interface to add tasks with a specified interval
 * and then runs them at the given interval.
 */

import { defineComponent, ref, onUnmounted } from 'vue';

interface Task {
  id: number;
  action: () => void;
  interval: number;
}

export default defineComponent({
  name: 'Scheduler',
  props: {
    // Define props for the component
  },
  setup(props) {
    // State to hold the tasks
    const tasks = ref<Task[]>([]);
    let timeoutIds = new Map<number, NodeJS.Timeout>();
    
    // Function to add a task
    const addTask = (action: () => void, interval: number) => {
      const id = tasks.value.length + 1;
      const task: Task = { id, action, interval };
      tasks.value.push(task);
      timeoutIds.set(id, setInterval(action, interval));
      return id;
    };
    
    // Function to remove a task
    const removeTask = (id: number) => {
      const index = tasks.value.findIndex(task => task.id === id);
      if (index !== -1) {
        clearInterval(timeoutIds.get(id) as NodeJS.Timeout);
        timeoutIds.delete(id);
        tasks.value.splice(index, 1);
      }
    };
    
    // Cleanup function to clear all intervals on component unmount
    const cleanup = () => {
      for (const timeoutId of timeoutIds.values()) {
        clearInterval(timeoutId);
      }
      timeoutIds.clear();
    };
    
    onUnmounted(cleanup);
    
    // Expose these functions to the template
    return {
      tasks,
      addTask,
      removeTask,
    };
  },
  template: `
    <div>
      <h1>Task Scheduler</h1>
      <button @click="addTask(() => console.log('Task executed.'), 2000)">Add Task</button>
      <ul>
        <li v-for="task in tasks" :key="task.id">
          Task ID: {{ task.id }} - Interval: {{ task.interval }}ms
          <button @click="removeTask(task.id)">Remove Task</button>
        </li>
      </ul>
    </div>
  `,
});