/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon } from '@fortawesome/free-regular-svg-icons'
import { faMagnifyingGlass, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import useSWR from 'swr'

const moonSvg = <FontAwesomeIcon icon={faMoon}/>
const magnifyingGlassSvg = <FontAwesomeIcon icon={faMagnifyingGlass} />
const chevronDownSvg = <FontAwesomeIcon icon={faChevronDown} />

function LandingPage({searchFilterHandler, searchFilter}) {

    const [inputVal, setInputVal] = useState("") 
    const [isOpen, setIsOpen] = useState(false)
    const inputRef = useRef(null)

    const fetcher = url => axios.get(url).then(res => res.data)
    const {data, isLoading} = useSWR(searchFilter, fetcher)
    const countries = isLoading  ? [] : Array.from(data)
  
    const menuHandler = () => {
      setIsOpen(!isOpen)
    }
  
    const fisrtCharToUpperCase = () => {
      const nameArr = inputVal.split("")
      const uppercaseChar = nameArr[0].toUpperCase()
      nameArr.splice(0, 1, uppercaseChar)
      const newName = nameArr.join("")
      searchFilterHandler(`https://restcountries.com/v3.1/name/${newName}`)
    }

    const mappedCountries = countries.map(country => 
      <div className='grid grid-rows-2 max-w-72 bg-white rounded-md' key={`${country.ccn3}`}>
          <Link to={`/frontendMentor-Challenge16/info/${country.name.common}`}>
              <img className='h-full w-full max-h-60 object-fit object-top rounded-t-md' src={`${country.flags.png}`} alt={`${country.flags.alt}`} onClick={()=>(searchFilterHandler(`https://restcountries.com/v3.1/name/${country.name.common}`))}/>
          </Link>
          <div className='px-6 pt-6 pb-12'>
              <Link to={`/frontendMentor-Challenge16/info/${country.name.common}`}>
                  <p className='mb-4 text-xl font-bold'>{country.name.common}</p>
              </Link>  
              <p className='mb-2 text-sm'><span className='font-bold'>Population:</span> {country.population}</p>
              <p className='mb-2 text-sm'><span className='font-bold'>Region:</span> {country.region}</p>
              <p className='mb-2 text-sm'><span className='font-bold'>Capital:</span> {country.capital}</p>
          </div>
      </div>
  )
  
    if (!data) return(
      <h1>loading</h1>
    )

    return (
      <>
        <header className="relative left-1/2 -z-10 w-screen -translate-x-1/2 px-4 py-8 bg-white">
          <div className='relative left-1/2 max-w-screen-xl -translate-x-1/2 flex justify-between items-center'>
            <p className="text-lg font-bold">Where in the world?</p>
            <div className="flex items-center gap-2">
              {moonSvg}
              <button className='font-semibold'>Dark Mode</button>
            </div>
          </div>
        </header>
        <main className='mt-4 px-4 lg:px-0'>
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
                  <li className='cursor-pointer' onClick={()=>{searchFilterHandler("https://restcountries.com/v3.1/region/africa")}}>Africa</li>
                  <li className='cursor-pointer' onClick={()=>{searchFilterHandler("https://restcountries.com/v3.1/region/america")}}>America</li>
                  <li className='cursor-pointer' onClick={()=>{searchFilterHandler("https://restcountries.com/v3.1/region/asia")}}>Asia</li>
                  <li className='cursor-pointer' onClick={()=>{searchFilterHandler("https://restcountries.com/v3.1/region/europe")}}>Europe</li>
                  <li className='cursor-pointer' onClick={()=>{searchFilterHandler("https://restcountries.com/v3.1/region/oceania")}}>Oceania</li>
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

  export default LandingPage