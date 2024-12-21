import { defineComponent, ref, watchEffect, onMounted } from 'vue'
import { getMeetup } from './meetupsService.ts'

export default defineComponent({
  name: 'SelectedMeetupApp',

  setup() {
    const selectedMeetupId = ref(1)
    const meetupTitle = ref('')
    const loading = ref(false)
    const error = ref('')

    const fetchMeetupTitle = async id => {
      loading.value = true
      error.value = ''
      try {
        const meetup = await getMeetup(id)
        meetupTitle.value = meetup ? meetup.title : 'Unknown Meetup'
      } catch (err) {
        error.value = 'Error fetching meetup data!!!'
        console.error(err)
      } finally {
        loading.value = false
      }
    }

    watchEffect(() => {
      fetchMeetupTitle(selectedMeetupId.value)
    })

    const goToPrevious = () => {
      if (selectedMeetupId.value === undefined || selectedMeetupId.value === null) {
        selectedMeetupId.value = 1
      } else if (selectedMeetupId.value > 1) {
        selectedMeetupId.value -= 1
      }
      fetchMeetupTitle(selectedMeetupId.value)
    }

    const goToNext = () => {
      if (selectedMeetupId.value === undefined || selectedMeetupId.value === null) {
        selectedMeetupId.value = 1
      } else if (selectedMeetupId.value < 5) {
        selectedMeetupId.value += 1
      }
      fetchMeetupTitle(selectedMeetupId.value)
    }

    const handleRadioChange = () => {
      selectedMeetupId.value = Number(selectedMeetupId.value)
    }

    onMounted(() => {
      fetchMeetupTitle(selectedMeetupId.value)
    })

    return {
      selectedMeetupId,
      meetupTitle,
      loading,
      error,
      goToPrevious,
      goToNext,
      handleRadioChange,
    }
  },

  template: `
    <div class="meetup-selector">
      <div class="meetup-selector__control">
        <button
          class="button button--secondary"
          type="button"
          :disabled="selectedMeetupId === 1"
          @click="goToPrevious"
        >
          Предыдущий
        </button>

        <div class="radio-group" role="radiogroup">
          <div class="radio-group__button">
            <input
              id="meetup-id-1"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              :value="1"
              v-model="selectedMeetupId"
              @change="handleRadioChange"
            />
            <label
              for="meetup-id-1"
              class="radio-group__label"
              :class="{ 'radio-group__label--selected': selectedMeetupId === 1 }"
            >
              1
            </label>
          </div>
          <div class="radio-group__button">
            <input
              id="meetup-id-2"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              :value="2"
              v-model="selectedMeetupId"
              @change="handleRadioChange"
            />
            <label
              for="meetup-id-2"
              class="radio-group__label"
              :class="{ 'radio-group__label--selected': selectedMeetupId === 2 }"
            >
              2
            </label>
          </div>
          <div class="radio-group__button">
            <input
              id="meetup-id-3"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              :value="3"
              v-model="selectedMeetupId"
              @change="handleRadioChange"
            />
            <label
              for="meetup-id-3"
              class="radio-group__label"
              :class="{ 'radio-group__label--selected': selectedMeetupId === 3 }"
            >
              3
            </label>
          </div>
          <div class="radio-group__button">
            <input
              id="meetup-id-4"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              :value="4"
              v-model="selectedMeetupId"
              @change="handleRadioChange"
            />
            <label
              for="meetup-id-4"
              class="radio-group__label"
              :class="{ 'radio-group__label--selected': selectedMeetupId === 4 }"
            >
              4
            </label>
          </div>
          <div class="radio-group__button">
            <input
              id="meetup-id-5"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              :value="5"
              v-model="selectedMeetupId"
              @change="handleRadioChange"
            />
            <label
              for="meetup-id-5"
              class="radio-group__label"
              :class="{ 'radio-group__label--selected': selectedMeetupId === 5 }"
            >
              5
            </label>
          </div>
        </div>

        <button
          class="button button--secondary"
          type="button"
          :disabled="selectedMeetupId === 5"
          @click="goToNext"
        >
          Следующий
        </button>
      </div>

      <div class="meetup-selector__cover">
        <div class="meetup-cover">
          <h1 class="meetup-cover__title">
            <span v-if="loading">Loading...</span>
            <span v-else>{{ meetupTitle }}</span>
          </h1>
          <p v-if="error" class="error">{{ error }}</p>
        </div>
      </div>
    </div>
  `,
})
