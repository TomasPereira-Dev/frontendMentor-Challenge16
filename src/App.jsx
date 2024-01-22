import { useState, useEffect, useCallback } from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './Components/LandingPage'
import InfoPage from './Components/InfoPage'
import axios from 'axios'

function App() {

  const [countries, setCountries] = useState([])
  const [searchFilter, setSearchFilter] = useState("https://restcountries.com/v3.1/all")

  const searchFilterHandler = (filter) => {
    setSearchFilter(filter)
  }

  useEffect(() => {
    axios.get(searchFilter)
    .then((res) => {
      setCountries(res.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }, [searchFilter])
  console.log(countries, searchFilter)
  return (
    <>
    <Routes>
      <Route path='/frontendMentor-Challenge16' element={<LandingPage countries={countries} searchFilter={searchFilter}
       searchFilterHandler={searchFilterHandler} />} />
      <Route path='/frontendMentor-Challenge16/info/:countryId' element={<InfoPage countries={countries} searchFilter={searchFilter} />} />
    </Routes>
    </>
  )
}

export default App
