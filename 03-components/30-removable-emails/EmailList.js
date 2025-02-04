import { defineComponent } from 'vue'
import EmailListItem from './EmailListItem.js'

export default defineComponent({
  name: 'EmailList',

  components: {
    EmailListItem,
  },

  props: {
    emails: {
      type: Array,
      required: true,
    },
  },

  emits: ['remove-email'],

  setup(props, { emit }) {

    const removeEmailHandler = (index) => {
      emit('removeEmail', index)
    }

    return {
      removeEmailHandler
    }
  },

  template: `
    <ul class="emails-list unstyled-list" aria-label="Emails">
      <email-list-item
        v-for="({ email, isMarked }, index) in emails"
        :key="email"
        :email="email"
        :marked="isMarked"
        @remove-email="removeEmailHandler(index)"
      />
    </ul>
  `,
})
