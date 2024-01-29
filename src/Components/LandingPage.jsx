/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Spinner from './Spinner.jsx'
import axios from 'axios'
import useSWR from 'swr'

const magnifyingGlassSvg = <FontAwesomeIcon icon={faMagnifyingGlass} />
const chevronDownSvg = <FontAwesomeIcon icon={faChevronDown} />
const regex = /^(?!\s*$)[a-zA-Z0-9\s]+$/g

function LandingPage({searchFilterHandler, searchFilter}) {

    const fetcher = url => axios.get(url).then(res => res.data)
    const {data, isLoading} = useSWR(searchFilter, fetcher)

    const [countries, setCountries] = useState([])
    const [inputVal, setInputVal] = useState('') 
    const [isOpen, setIsOpen] = useState(false)
    const inputRef = useRef(null)

    const menuHandler = () => {
      setIsOpen(!isOpen)
    }

    const fisrtCharToUpperCase = () => {
      if(regex.test(inputVal)){
        const nameArr = inputVal.split('')
        const uppercaseChar = nameArr[0].toUpperCase()
        nameArr.splice(0, 1, uppercaseChar)
        const newName = nameArr.join('')
        const filteredCountries = countries.filter((country) => newName === country.name.common)
        setCountries(filteredCountries) 
      }else{
        setCountries(Array.from(data))
      }
      inputRef.current.value = '' 
      setInputVal("")
    }

    const enterKeyHandler = (key) => {
      if(key === 'Enter'){
        fisrtCharToUpperCase()
      }
    }

    useEffect(() => {
      if (data) setCountries(Array.from(data))
    },[data])

    const mappedCountries =  countries.map(country => 
      <div className='grid grid-rows-2 max-w-72 bg-white rounded-md shadow' key={`${country.ccn3}`}>
          <Link to={`/frontendMentor-Challenge16/info/${country.name.common}`}>
              <img className='h-full w-full max-h-60 object-fit object-top rounded-t-md' src={`${country.flags.png}`} alt={`${country.flags.alt}`} onClick={()=>(searchFilterHandler(`https://restcountries.com/v3.1/name/${country.name.common}`))}/>
          </Link>
          <div className='px-6 pt-6 pb-12'>
            <Link to={`/frontendMentor-Challenge16/info/${country.name.common}`}>
                <p className='mb-4 text-xl font-bold' onClick={()=>(searchFilterHandler(`https://restcountries.com/v3.1/name/${country.name.common}`))}>{country.name.common}</p>
            </Link>  
            <p className='mb-2 text-sm'><span className='font-bold'>Population:</span> {country.population}</p>
            <p className='mb-2 text-sm'><span className='font-bold'>Region:</span> {country.region}</p>
            <p className='mb-2 text-sm'><span className='font-bold'>Capital:</span> {country.capital}</p>
          </div>
      </div>
    ) 

    if(isLoading) return <Spinner/>

    return (
      <>
        <header className='relative left-1/2 -z-10 w-screen -translate-x-1/2 px-3 py-6 bg-white shadow-md'>
          <div className='relative left-1/2 max-w-screen-xl -translate-x-1/2 flex justify-between items-center'>
            <p className='text-xl font-bold'>Where in the world?</p>
          </div>
        </header>
        <main className='mt-4 px-3 lg:px-0'>
          <div className='flex flex-col lg:flex-row lg:justify-between lg:items-center' > 
            <div className='relative flex items-center w-full shadow-md lg:w-4/12'>
              <div className='p-4 bg-white rounded-s-md outline-none cursor-pointer' onClick={fisrtCharToUpperCase}>
                {magnifyingGlassSvg}
              </div>
              <input className= 'p-4 w-full rounded-e-md outline-none' ref={inputRef} onChange={() => {setInputVal(inputRef.current.value)}} onKeyDown={(e)=> {enterKeyHandler(e.key)}} type='text' placeholder='Search for a country'/>
            </div>
            <div className='relative'>
              <div className='flex justify-between items-center gap-12 p-4 mt-10 mb-2 w-fit bg-white rounded-md cursor-pointer shadow-md
              lg:mt-0' onClick={menuHandler}>
                  <p>Filter by Region</p>
                  {chevronDownSvg}
              </div>
              <div className={`absolute -bottom-48 z-50 ${isOpen === true ? 'block': 'hidden'} w-52 bg-white rounded-md shadow-md
              lg:bottom-auto`}>
                <ul className='flex flex-col gap-2 p-4'>
                  <li className='cursor-pointer' onClick={()=>{searchFilterHandler('https://restcountries.com/v3.1/region/africa')}}>Africa</li>
                  <li className='cursor-pointer' onClick={()=>{searchFilterHandler('https://restcountries.com/v3.1/region/america')}}>America</li>
                  <li className='cursor-pointer' onClick={()=>{searchFilterHandler('https://restcountries.com/v3.1/region/asia')}}>Asia</li>
                  <li className='cursor-pointer' onClick={()=>{searchFilterHandler('https://restcountries.com/v3.1/region/europe')}}>Europe</li>
                  <li className='cursor-pointer' onClick={()=>{searchFilterHandler('https://restcountries.com/v3.1/region/oceania')}}>Oceania</li>
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