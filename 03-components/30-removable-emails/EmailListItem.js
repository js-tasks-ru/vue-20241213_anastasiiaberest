import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EmailListItem',

  props: {
    email: {
      type: String,
      required: true,
    },

    marked: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    handleRemove() {
      this.$emit('remove-email');  
    }
  },

  template: `
    <li :class="{ marked }">
      {{ email }}
      <button type="button" aria-label="Удалить"  @click.stop="handleRemove">❌</button>
    </li>
  `,
})
