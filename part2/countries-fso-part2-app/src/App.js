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
  const [APIWeatherData, setAPIWeatherData] = useState({})

  const getCountriesFromAPI = (searchTerm) => {
    console.log('testing')
    if (searchTerm.length >= 1) {
      axios.get(`https://restcountries.com/v2/name/${searchTerm}`).then((response) => {
        console.log('more testing')
        if (response.data.length > 10) {
          setCountries([])
          setShowCard(false)
          setTooManyMatches(true)
        } else if (response.data.length === 1) {
          setCountries(response.data)
          setSelectedCountry(response.data[0])
          getWeatherDataFromAPI(response.data[0].capital)
          setTooManyMatches(false)
          setShowCard(true)
        } else {
          setCountries(response.data)
          setTooManyMatches(false)
          setShowCard(false)
        }
      })
    }
  }

  const getWeatherDataFromAPI = (city) => {
    console.log(city)
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        console.log('more testing')
        setAPIWeatherData(response.data)
      })
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

    setSelectedCountry(singleCountryArr[0])
    getWeatherDataFromAPI(singleCountryArr[0].capital)

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
        <CountryCard
          key={selectedCountry.name}
          countryData={selectedCountry}
          weatherData={APIWeatherData}
        />
      )}
    </div>
  )
}

export default App
