import React from 'react'

import Weather from './Weather'

const CountryCard = ({ countryData, weatherData }) => {
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

      {weatherData && (
        <Weather
          city={countryData.capital}
          temperature={weatherData.main.temp}
          iconCode={weatherData.weather[0].icon}
          wind={weatherData.wind.speed}
        />
      )}
    </div>
  )
}

export default CountryCard
