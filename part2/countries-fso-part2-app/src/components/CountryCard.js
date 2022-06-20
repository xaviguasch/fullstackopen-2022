import React from 'react'

const CountryCard = ({ countryData }) => {
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
    </div>
  )
}

export default CountryCard
