import { defineComponent, ref, onMounted, onUnmounted } from 'vue';

export default defineComponent({
  name: 'UiClock',

  setup() {
    const time = ref('');

    const updateTime = () => {
      const currentTime = new Date();
      time.value = currentTime.toLocaleTimeString(navigator.language, { timeStyle: 'medium' });
    };

    let intervalId;

    onMounted(() => {
      updateTime(); 
      intervalId = setInterval(updateTime, 1000); 
    });

    onUnmounted(() => {
      clearInterval(intervalId);
    });

    return {
      time,
    };
  },

  template: `<div class="clock">{{ time }}</div>`,
});
