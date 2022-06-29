import React from 'react'

import CountryCard from './CountryCard'

const CountryList = ({ countriesData, onShowCountryCardHandler }) => {
  const buttonClickHandler = (countryName) => {
    onShowCountryCardHandler(countryName)
  }

  return (
    <div>
      {countriesData.length > 10 && <p>Too many matches, specify another filter</p>}

      {countriesData.length > 1 &&
        countriesData.length <= 10 &&
        countriesData.map((country) => (
          <div className='country-list-item' key={country.name.common}>
            <p>{country.name.common}</p>
            <button onClick={() => buttonClickHandler(country.name.common)}>Show</button>
          </div>
        ))}

      {countriesData.length === 1 && (
        <CountryCard key={countriesData[0].name.common} countryData={countriesData[0]} />
      )}
    </div>
  )
}

export default CountryList
