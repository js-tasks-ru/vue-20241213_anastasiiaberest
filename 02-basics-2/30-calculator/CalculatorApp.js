import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  name: 'CalculatorApp',

  setup() {
    const operand1 = ref(0)
    const operand2 = ref(0)
    const operator = ref('sum')

    const result = computed(() => {
      let res = 0
      switch (operator.value) {
        case 'sum':
          res = operand1.value + operand2.value
          break
        case 'subtract':
          res = operand1.value - operand2.value
          break
        case 'multiply':
          res = operand1.value * operand2.value
          break
        case 'divide':
          if (operand2.value === 0) {
            res = 'Error'
          } else {
            res = operand1.value / operand2.value
          }
          break
        default:
          res = 0
          break
      }
      return res
    })

    return {
      operand1,
      operand2,
      operator,
      result,
    }
  },

  template: `
   <div class="calculator">
      <input type="number" v-model="operand1" aria-label="First operand" />

      <div class="calculator__operators">
        <label>
          <input type="radio" name="operator" value="sum" v-model="operator" /> ➕
        </label>
        <label>
          <input type="radio" name="operator" value="subtract" v-model="operator" /> ➖
        </label>
        <label>
          <input type="radio" name="operator" value="multiply" v-model="operator" /> ✖
        </label>
        <label>
          <input type="radio" name="operator" value="divide" v-model="operator" /> ➗
        </label>
      </div>

      <input type="number" v-model="operand2" aria-label="Second operand" />

      <div>=</div>

      <output>{{ result }}</output>
    </div>
  `,
})
