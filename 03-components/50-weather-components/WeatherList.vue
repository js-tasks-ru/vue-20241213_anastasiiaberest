<script>
import { WeatherConditionIcons } from './weather.service.ts'

export default {
  name: "WeatherList",
  props: {
    region: {
      required: true,
      type: Object,
    },
  },

  setup(props) {
    const weatherConditionIcons = WeatherConditionIcons || {};

    const kelvinToCelsius = (temp) => {
      return (temp - 273.15).toFixed(1);
    };

    const isNightTime = (currentTime, sunrise, sunset) => {
      return currentTime < sunrise || currentTime > sunset;
    };

    return {
      weatherConditionIcons,
      kelvinToCelsius,
      isNightTime,
      region: props.region,  
    };
  },

};
</script>

<template>
  <li class="weather-card"
    :class="{ 'weather-card--night': isNightTime(region.current.dt, region.current.sunrise, region.current.sunset) }">
    <div class="weather-alert" v-if="region.alert">
      <span class="weather-alert__icon">⚠️</span>
      <span class="weather-alert__description">{{ region.alert.sender_name }} {{ region.alert.description }}</span>
    </div>
    <div>
      <h2 class="weather-card__name">{{ region.geographic_name }}</h2>
      <div class="weather-card__time">{{ region.current.dt }}</div>
    </div>
    <div class="weather-conditions">
      <div class="weather-conditions__icon" :title="region.current.weather.description">
        {{ weatherConditionIcons[region.current.weather.id] || '' }}
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
</template>

<style scoped></style>
