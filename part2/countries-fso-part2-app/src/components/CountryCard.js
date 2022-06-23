import React from 'react'

import Weather from './Weather'

const CountryCard = ({ countryData, weatherData }) => {
  return (
    <div>
      <h2>{countryData.name}</h2>
      <p>capital {countryData.capital}</p>
      <p>area {countryData.area}</p>

      <h3>languages</h3>

      <ul>
        {countryData.languages.map((lang) => (
          <li key={lang.name}>{lang.name}</li>
        ))}
      </ul>

      <img src={countryData.flag} alt='' />

      {/* {weatherData && (
        <Weather
          city={countryData.capital}
          temperature={weatherData.main.temp}
          iconCode={weatherData.weather[0].icon}
          wind={weatherData.wind.speed}
        />
      )} */}
    </div>
  )
}

export default CountryCard
