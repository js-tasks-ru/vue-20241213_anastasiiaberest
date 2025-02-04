import { defineComponent, ref} from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'
import './WeatherApp.css'
import WeatherList from './WeatherList.vue'

export default defineComponent({
  name: 'WeatherApp',

  components: { WeatherList },

  setup() {
    const weatherData = ref(getWeatherData())
   
    return {
      weatherData,
    }
  },

  template: `
    <div>
    <h1 class="title">Погода в Средиземье</h1>

    <ul class="weather-list unstyled-list">
      <WeatherList 
        v-for="(region, index) in weatherData" 
        :key="index" 
        :region="region" 
      />
    </ul>
    </div>
  `,
})
