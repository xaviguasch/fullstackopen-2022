import { useState, useEffect } from 'react'

import axios from 'axios'

import Search from './components/Search'
import CountryCard from './components/CountryCard'

import './App.css'

function App() {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [tooManyMatches, setTooManyMatches] = useState(false)

  const getCountriesFromAPI = (searchTerm) => {
    if (searchTerm.length >= 1) {
      axios.get(`https://restcountries.com/v2/name/${searchTerm}`).then((response) => {
        if (response.data.length > 10) {
          setTooManyMatches(true)
          setCountries([])
        } else {
          setTooManyMatches(false)
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

  return (
    <div className='App'>
      <h1>Countries</h1>

      <Search onSearchTerm={searchTerm} onHandleSearchChange={handleSearchChange} />

      {tooManyMatches && <p>Too many matches, specify another filter</p>}
      {countries.length > 1 &&
        !tooManyMatches &&
        countries.map((c) => <p key={c.name}>{c.name}</p>)}

      {countries.length === 1 &&
        countries.map((c) => <CountryCard key={c.name} countryData={c} />)}
    </div>
  )
}

export default App
