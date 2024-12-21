import { defineComponent, ref } from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'

export default defineComponent({
  name: 'WeatherApp',

  setup() {
    const weatherData = ref(getWeatherData())

    const kelvinToCelsius = temp => {
      return (temp - 273.15).toFixed(1)
    }

    const isNightTime = (currentDt, sunrise, sunset) => {
      return currentDt < sunrise || currentDt >= sunset
    }

    return {
      weatherData,
      kelvinToCelsius,
      WeatherConditionIcons,
      isNightTime,
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul class="weather-list unstyled-list">
        <li class="weather-card" :class="{
            'weather-card--night': isNightTime(region.current.dt, region.current.sunrise, region.current.sunset)
          }" v-for="(region, index) in weatherData"
        :key="index">
          <div class="weather-alert" v-if="region.alert">
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">
              {{ region.alert.sender_name }}: {{ region.alert.description }}
            </span>
          </div>
          <div>
            <h2 class="weather-card__name">
            {{ region.geographic_name }}
            </h2>
            <div class="weather-card__time">
            {{ region.current.dt }}
            </div>
          </div>
          <div class="weather-conditions">
          <div class="weather-conditions__icon" :title="region.current.weather.description">
              {{ WeatherConditionIcons[region.current.weather.id] }}
            </div>
            <div class="weather-conditions__temp">{{ kelvinToCelsius(region.current.temp) }} °C</div>
          </div>
          <div class="weather-details">
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">{{ (region.current.pressure / 1.333).toFixed(0) }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">{{ region.current.humidity }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">{{ region.current.clouds }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">{{ region.current.wind_speed }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
})
