import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './Components/LandingPage'
import InfoPage from './Components/InfoPage'


function App() {

  const [searchFilter, setSearchFilter] = useState("https://restcountries.com/v3.1/all");

  return (
    <>
    
    <Routes>
      <Route path='/' element={<LandingPage searchFilter={searchFilter}
       searchFilterHandler={setSearchFilter} />} />
      <Route path='/:countryId' element={<InfoPage searchFilter={searchFilter}/>} />
    </Routes>
    </>
  )
}

export default App
