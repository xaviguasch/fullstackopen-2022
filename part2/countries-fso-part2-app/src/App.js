import { useState, useEffect } from 'react'

import axios from 'axios'

import Search from './components/Search'
import CountryList from './components/CountryList'

function App() {
  const [countries, setCountries] = useState([])
  const [countriesInSearch, setCountriesInSearch] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      setCountries(response.data)
    })
  }, [])

  console.log(searchTerm, ' from app')

  const getCountriesFromState = (searchTerm) => {
    setCountriesInSearch(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm)
      )
    )
  }

  const handleSearchChange = (searchInput) => {
    setSearchTerm(searchInput)
    getCountriesFromState(searchInput)
  }

  const showCountryCardHandler = (countryName) => {
    const singleCountryArr = countries.filter((c) => c.name.common === countryName)

    setCountriesInSearch(singleCountryArr)
  }

  return (
    <div className='App'>
      <Search onSearchTerm={searchTerm} onHandleSearchChange={handleSearchChange} />

      {searchTerm && (
        <CountryList
          countriesData={countriesInSearch}
          onShowCountryCardHandler={showCountryCardHandler}
        />
      )}
    </div>
  )
}

export default App
