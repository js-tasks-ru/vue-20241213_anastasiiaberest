import { defineComponent, ref, watch } from 'vue'
import { UiButton } from '@shgk/vue-course-ui'
import './UiCounter.css'

export default defineComponent({
  name: 'UiCounter',

  components: {
    UiButton,
  },

  props: {
    count: {
      type: Number,
      required: true,
    },

    min: {
      type: Number,
      default: 0,
    },

    max: {
      type: Number,
      default: Infinity,
    },
  },

  setup(props, { emit }) {
    // Рекомендуется для практики реализовать обработку событий внутри setup, а не непосредственно в шаблоне
    const counter = ref(props.count);

    watch(
      () => props.count,
      (newCount) => {
        counter.value = newCount;
      }
    );

    const increment = () => {
      if (counter.value < props.max) {
        counter.value++;
      }
    };

    const decrement = () => {
      if (counter.value > props.min) {
        counter.value--;
      }
    };

    watch(counter, (newCount) => {
      emit('update:count', newCount);
    });


    return {
      counter,
      increment,
      decrement,
    };
  },

  template: `
    <div class="counter">
      <UiButton 
        aria-label="Decrement" 
        :disabled="counter <= min" 
        @click="decrement">
        ➖
      </UiButton>
      <span class="count" data-testid="count">{{ counter }}</span>
      <UiButton 
        aria-label="Increment" 
        :disabled="counter >= max" 
        @click="increment">
        ➕
      </UiButton>
    </div>
  `,
})
