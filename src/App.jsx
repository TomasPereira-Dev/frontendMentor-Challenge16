import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon } from '@fortawesome/free-regular-svg-icons'
import { faMagnifyingGlass, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { useState, useRef, useEffect } from 'react'
import axios from 'axios'

const moonSvg = <FontAwesomeIcon icon={faMoon}/>
const magnifyingGlassSvg = <FontAwesomeIcon icon={faMagnifyingGlass} />
const chevronDownSvg = <FontAwesomeIcon icon={faChevronDown} />


function App() {

  const [inputVal, setInputVal] = useState("") 
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [countries, setCountries] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef(null)
  
  const mappedCountries = countries.map(country => 
    <div className='grid grid-rows-2 max-w-72 bg-white rounded-md' key={`${country.ccn3}`}>
      <img className='rounded-t-md h-full w-full object-fit object-top' src={`${country.flags.png}`} alt={`${country.flags.alt}`}/>
      <div className='px-6 pt-6 pb-12'>
        <p className='mb-4 text-xl font-bold'>{country.name.common}</p>
        <p className='mb-2 text-sm'><span className='font-bold'>Population:</span> {country.population}</p>
        <p className='mb-2 text-sm'><span className='font-bold'>Region:</span> {country.region}</p>
        <p className='mb-2 text-sm'><span className='font-bold'>Capital:</span> {country.capital}</p>
      </div>
    </div>
  )

  const menuHandler = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    axios.get(`https://restcountries.com/v3.1/${selectedRegion}`)
    .then((res) => {
      setCountries(res.data)
      
    })
    .catch((error) => {
      console.log(error)
    })
  }, [selectedRegion])
  console.log(countries)
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
        <div className='flex flex-col' > 
          <div className='flex'>
            <div className='p-4 bg-white rounded-s-md cursor-pointer'>
              {magnifyingGlassSvg}
            </div>
            <input className='p-4 w-full rounded-e-md' ref={inputRef} onKeyDown={() => {setInputVal(inputRef.current.value)}} type="text" placeholder="Search for a country"/>
          </div>
          <div className='relative'>
            <div className='flex justify-between items-center gap-12 p-4 mt-10 w-fit bg-white rounded-md cursor-pointer' onClick={menuHandler}>
                <p>Filter by Region</p>
                {chevronDownSvg}
            </div>
            <div className={`absolute -bottom-48 z-50 ${isOpen === true ? 'block': 'hidden'} w-52 bg-white rounded-md`}>
              <ul className='flex flex-col gap-2 p-4'>
                <li className='cursor-pointer' onClick={()=>{setSelectedRegion("region/africa")}}>Africa</li>
                <li className='cursor-pointer' onClick={()=>{setSelectedRegion("region/america")}}>America</li>
                <li className='cursor-pointer' onClick={()=>{setSelectedRegion("region/asia")}}>Asia</li>
                <li className='cursor-pointer' onClick={()=>{setSelectedRegion("region/europe")}}>Europe</li>
                <li className='cursor-pointer' onClick={()=>{setSelectedRegion("region/oceania")}}>Oceania</li>
              </ul>
            </div>
          </div>
        </div>
        <div className='grid justify-center gap-10 mt-10 lg:grid-cols-4'>
          {mappedCountries}
        </div>
      </main>
    </>
  )
}

export default App
