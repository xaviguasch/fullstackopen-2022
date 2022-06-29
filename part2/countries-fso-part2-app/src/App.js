import { useState, useEffect } from 'react'

import axios from 'axios'

import Search from './components/Search'
import CountryCard from './components/CountryCard'
import CountryList from './components/CountryList'

function App() {
  const [countries, setCountries] = useState([])
  const [countriesInSearch, setCountriesInSearch] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [APIWeatherData, setAPIWeatherData] = useState({})
  // SelectedCountry and showCard shouldn't be states
  const [selectedCountry, setSelectedCountry] = useState({})
  const [showCard, setShowCard] = useState(false)

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      setCountries(response.data)
    })
  }, [])

  console.log(searchTerm, ' from app')

  // helper function, checks if an object is empty
  const isEmpty = (obj) => Object.keys(obj).length === 0

  const showData = () => {
    console.log(searchTerm, ' from useEffect')
    if (countriesInSearch.length === 1) {
      setSelectedCountry(countriesInSearch[0])
      setShowCard(true)
    } else {
      setShowCard(false)
      setSelectedCountry({})
    }
  }

  // Only when the searchTerm changes, showData will fire
  useEffect(showData, [searchTerm])

  const getWeatherDataFromAPI = () => {
    if (!isEmpty(selectedCountry)) {
      // console.log('weather api firing!!!')
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${selectedCountry.capital[0]}&appid=${process.env.REACT_APP_API_KEY}`
        )
        .then((response) => {
          setAPIWeatherData(response.data)
        })
    }
  }

  // Only when the selectedCountry changes, getWeatherDataFromAPI will fire
  useEffect(getWeatherDataFromAPI, [selectedCountry])

  const getCountriesFromState = (searchTerm) => {
    setShowCard(false)
    // selectedCountry gets updated too frequently, YOU MUST CORRECT!!!!
    setSelectedCountry({})

    setCountriesInSearch(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm)
      )
    )

    // IT'S REDUNDANT!!!!
    // showData()
  }

  const handleSearchChange = (searchInput) => {
    setSearchTerm(searchInput)
    getCountriesFromState(searchInput)
  }

  const showCountryCardHandler = (countryName) => {
    const singleCountryArr = countries.filter((c) => c.name.common === countryName)

    setSelectedCountry(singleCountryArr[0])

    setShowCard(true)
  }

  return (
    <div className='App'>
      <Search onSearchTerm={searchTerm} onHandleSearchChange={handleSearchChange} />

      {countriesInSearch.length > 10 && searchTerm.length > 0 && (
        <p>Too many matches, specify another filter</p>
      )}

      {searchTerm && countriesInSearch.length <= 10 && !showCard && (
        <CountryList
          countriesData={countriesInSearch}
          onShowCountryCardHandler={showCountryCardHandler}
        />
      )}

      {showCard && !isEmpty(APIWeatherData) && (
        <CountryCard
          key={selectedCountry.name.common}
          countryData={selectedCountry}
          weatherData={APIWeatherData}
        />
      )}
    </div>
  )
}

export default App
