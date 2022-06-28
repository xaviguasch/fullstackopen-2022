import React from 'react'

const CountryList = ({ countriesData, onShowCountryCardHandler }) => {
  const buttonClickHandler = (countryName) => {
    onShowCountryCardHandler(countryName)
  }

  return (
    <div>
      {countriesData.map((country) => (
        <div className='country-list-item' key={country.name.common}>
          <p>{country.name.common}</p>
          <button onClick={() => buttonClickHandler(country.name.common)}>Show</button>
        </div>
      ))}
    </div>
  )
}

export default CountryList
