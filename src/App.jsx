import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './Components/LandingPage'
import InfoPage from './Components/InfoPage'


function App() {

  const [searchFilter, setSearchFilter] = useState("https://restcountries.com/v3.1/all")

  const searchFilterHandler = (filter) => {
    setSearchFilter(filter)
  }

  return (
    <>
    <Routes>
      <Route path='/frontendMentor-Challenge16' element={<LandingPage searchFilter={searchFilter}
       searchFilterHandler={searchFilterHandler} />} />
      <Route path='/frontendMentor-Challenge16/info/:countryId' element={<InfoPage searchFilter={searchFilter} searchFilterHandler={searchFilterHandler}/>} />
    </Routes>
    </>
  )
}

export default App
