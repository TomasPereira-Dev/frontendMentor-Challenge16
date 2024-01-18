import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon } from '@fortawesome/free-regular-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const moonSvg = <FontAwesomeIcon icon={faMoon}/>
const magnifyingGlassSvg = <FontAwesomeIcon icon={faMagnifyingGlass} />

function App() {

  return (
    <>
      <header className="flex justify-between items-center px-4 py-8 bg-white">
        <p className="text-lg font-bold">Where in the world?</p>
        <div className="flex items-center gap-2">
          {moonSvg}
          <button className='font-semibold'>Dark Mode</button>
        </div>
      </header>
      <main className='mt-4 px-4'>
        <div className='flex' > 
          <div className='p-4 bg-white rounded-s-md'>
            {magnifyingGlassSvg}
          </div>
          <input className='p-4 w-full rounded-e-md' type="text" placeholder="Search for a country"/>
          <select name="regions">
            <option value="Placeholder">Filter by Region</option>
            <option value="Africa">Africa</option>
            <option value="America">America</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
      </main>
    </>
  )
}

export default App
