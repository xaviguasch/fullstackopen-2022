import React from 'react'

const CountryList = ({ countriesData, onShowCountryCardHandler }) => {
  const buttonClickHandler = (countryName) => {
    onShowCountryCardHandler(countryName)
  }

  return (
    <div>
      {countriesData.map((c) => (
        <div key={c.name}>
          <p>{c.name}</p>
          <button onClick={() => buttonClickHandler(c.name)}>Show</button>
        </div>
      ))}
    </div>
  )
}

export default CountryList
