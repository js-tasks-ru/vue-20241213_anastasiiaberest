import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CounterApp',

  setup() {
    const counter = ref(0)

    const increment = () => {
      if (counter.value < 5) {
        counter.value += 1
      }
    }

    const decrement = () => {
      if (counter.value > 0) {
        counter.value -= 1
      }
    }

    return {
      counter,
      increment,
      decrement,
    }
  },

  template: `
    <div class="counter">
      <button
        class="button button--secondary"
        type="button"
        aria-label="Decrement"
        :disabled="counter <= 0"
         @click="decrement"
      >➖</button>

      <span class="count" data-testid="count">{{ counter }}</span>

      <button
        class="button button--secondary"
        type="button"
        aria-label="Increment"
        :disabled="counter >= 5"
        @click="increment"
      >➕</button>
    </div>
  `,
})
