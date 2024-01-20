import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon } from '@fortawesome/free-regular-svg-icons'
import { faMagnifyingGlass, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { useState, useRef, useEffect, useCallback } from 'react'
import axios from 'axios'

const moonSvg = <FontAwesomeIcon icon={faMoon}/>
const magnifyingGlassSvg = <FontAwesomeIcon icon={faMagnifyingGlass} />
const chevronDownSvg = <FontAwesomeIcon icon={faChevronDown} />


function App() {

  const [inputVal, setInputVal] = useState("") 
  const [searchFilter, setSearchFilter] = useState("https://restcountries.com/v3.1/all")
  const [countries, setCountries] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef(null)
  
  const mappedCountries = countries.map(country => 
    <div className='grid grid-rows-2 max-w-72 bg-white rounded-md' key={`${country.ccn3}`}>
      <img className='h-full w-full max-h-60 object-fit object-top rounded-t-md' src={`${country.flags.png}`} alt={`${country.flags.alt}`}/>
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

  const searchFilterHandler = useCallback(() => {
    axios.get(searchFilter)
    .then((res) => {
      setCountries(res.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }, [searchFilter])

  const fisrtCharToUpperCase = () => {
    const nameArr = inputVal.split("")
    const uppercaseChar = nameArr[0].toUpperCase()
    nameArr.splice(0, 1, uppercaseChar)
    const newName = nameArr.join("")
    setSearchFilter(`https://restcountries.com/v3.1/name/${newName}`)
  }

  useEffect(() => {
    searchFilterHandler()
  }, [searchFilterHandler])

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
        <div className='flex flex-col lg:flex-row lg:justify-between lg:items-center' > 
          <div className='flex items-center w-full lg:w-4/12'>
            <div className='p-4 bg-white rounded-s-md cursor-pointer' onClick={() => {fisrtCharToUpperCase()}}>
              {magnifyingGlassSvg}
            </div>
            <input className='p-4 w-full rounded-e-md' ref={inputRef} onChange={() => {setInputVal(inputRef.current.value)}} type="text" placeholder="Search for a country"/>
          </div>
          <div className='relative'>
            <div className='flex justify-between items-center gap-12 p-4 mt-10 w-fit bg-white rounded-md cursor-pointer
            lg:mt-0' onClick={menuHandler}>
                <p>Filter by Region</p>
                {chevronDownSvg}
            </div>
            <div className={`absolute -bottom-48 z-50 ${isOpen === true ? 'block': 'hidden'} w-52 bg-white rounded-md
            lg:bottom-auto`}>
              <ul className='flex flex-col gap-2 p-4'>
                <li className='cursor-pointer' onClick={()=>{setSearchFilter("https://restcountries.com/v3.1/region/africa")}}>Africa</li>
                <li className='cursor-pointer' onClick={()=>{setSearchFilter("https://restcountries.com/v3.1/region/america")}}>America</li>
                <li className='cursor-pointer' onClick={()=>{setSearchFilter("https://restcountries.com/v3.1/region/asia")}}>Asia</li>
                <li className='cursor-pointer' onClick={()=>{setSearchFilter("https://restcountries.com/v3.1/region/europe")}}>Europe</li>
                <li className='cursor-pointer' onClick={()=>{setSearchFilter("https://restcountries.com/v3.1/region/oceania")}}>Oceania</li>
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
