import { useState, useEffect } from 'react'

import axios from 'axios'

import Search from './components/Search'
import CountryCard from './components/CountryCard'
import CountryList from './components/CountryList'

import './App.css'

function App() {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [tooManyMatches, setTooManyMatches] = useState(false)
  const [showCard, setShowCard] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState({})

  const getCountriesFromAPI = (searchTerm) => {
    if (searchTerm.length >= 1) {
      axios.get(`https://restcountries.com/v2/name/${searchTerm}`).then((response) => {
        if (response.data.length > 10) {
          setShowCard(false)
          setTooManyMatches(true)
          setCountries([])
        } else if (response.data.length === 1) {
          setTooManyMatches(false)
          setShowCard(true)
          setCountries(response.data)
          setSelectedCountry(response.data[0])
        } else {
          setTooManyMatches(false)
          setShowCard(false)
          setCountries(response.data)
        }
      })
    }
  }

  const handleSearchChange = (searchInput) => {
    if (searchInput.length === 0) {
      setTooManyMatches(false)
    }

    setSearchTerm(searchInput)
    getCountriesFromAPI(searchInput)
  }

  const showCountryCardHandler = (countryName) => {
    setTooManyMatches(false)

    const singleCountryArr = countries.filter((c) => c.name === countryName)

    setSelectedCountry(...singleCountryArr)
    setShowCard(true)
  }

  return (
    <div className='App'>
      <h1>Countries</h1>

      <Search onSearchTerm={searchTerm} onHandleSearchChange={handleSearchChange} />

      {tooManyMatches && <p>Too many matches, specify another filter</p>}

      {countries.length > 1 && !tooManyMatches && !showCard && (
        <CountryList
          countriesData={countries}
          onShowCountryCardHandler={showCountryCardHandler}
        />
      )}

      {showCard && (
        <CountryCard key={selectedCountry.name} countryData={selectedCountry} />
      )}
    </div>
  )
}

export default App
