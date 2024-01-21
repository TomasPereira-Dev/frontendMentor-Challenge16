import { Route, Routes } from 'react-router-dom'
import LandingPage from './Components/LandingPage'
import InfoPage from './Components/InfoPage'

function App() {

  return (
    <>
    <Routes>
      <Route path='/frontendMentor-Challenge16' element={<LandingPage />} />
      <Route path='/frontendMentor-Challenge16/info/:countryId' element={<InfoPage />} />
    </Routes>
    </>
  )
}

export default App
