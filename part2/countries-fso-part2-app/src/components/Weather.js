import { useState, useEffect } from 'react'

const Weather = ({ city, temperature, iconCode, wind }) => {
  const celciusTemp = (temperature - 273.15).toFixed(2)

  return (
    <div>
      <h2>Weather</h2>
      <h3>Weather in {city}</h3>
      <p>temperature {celciusTemp} Celcius</p>

      <img src={`http://openweathermap.org/img/wn/${iconCode}@2x.png`} alt='' />
      <p>wind {wind} m/s</p>
    </div>
  )
}

export default Weather
