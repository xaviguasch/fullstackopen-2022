import { useState, useEffect } from 'react'

import axios from 'axios'

const CountryCard = ({ countryData }) => {
  const [APIWeatherData, setAPIWeatherData] = useState({})

  // helper function, checks if an object is empty
  const isEmpty = (obj) => Object.keys(obj).length === 0

  let celciusTemp

  const getWeatherDataFromAPI = () => {
    if (!isEmpty(countryData)) {
      // console.log('weather api firing!!!')
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${countryData.capital[0]}&appid=${process.env.REACT_APP_API_KEY}`
        )
        .then((response) => {
          setAPIWeatherData(response.data)
        })
    }
  }

  useEffect(getWeatherDataFromAPI, [])

  if (!isEmpty(APIWeatherData)) {
    celciusTemp = (APIWeatherData.main.temp - 273.15).toFixed(2)
  }

  const langs = Object.values(countryData.languages)

  return (
    <div>
      <h2>{countryData.name.common}</h2>
      <p>capital {countryData.capital}</p>
      <p>area {countryData.area}</p>

      <h3>languages</h3>

      <ul>
        {langs.map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>

      <img src={countryData.flags.svg} alt='' />

      {!isEmpty(APIWeatherData) && (
        <div>
          <h2>Weather</h2>
          <h3>Weather in {countryData.capital}</h3>
          <p>temperature {celciusTemp} Celcius</p>

          <img
            src={`http://openweathermap.org/img/wn/${APIWeatherData.weather[0].icon}@2x.png`}
            alt=''
          />
          <p>wind {APIWeatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  )
}

export default CountryCard
