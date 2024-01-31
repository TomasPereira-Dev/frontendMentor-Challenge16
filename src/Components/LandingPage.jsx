/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import useSWR from 'swr'
import Spinner from './Spinner.jsx'
import SortingList from './SortingList.jsx'

const magnifyingGlassSvg = <FontAwesomeIcon icon={faMagnifyingGlass} />

const regex = /^(?!\s*$)[a-zA-Z0-9\s]+$/g

function LandingPage({searchFilterHandler, searchFilter}) {

    const fetcher = url => axios.get(url).then(res => res.data)
    const {data, isLoading} = useSWR(searchFilter, fetcher)
    
    const [countries, setCountries] = useState([])
    const [filterIsOpen, setFilterIsOpen] = useState(false)
    const [sortingIsOpen, setSortingIsOpen] = useState(false)
    const [inputVal, setInputVal] = useState("")
    const [menuOptions, setMenuOptions] = useState([])

    const filterMenuHandler = () => {
      setFilterIsOpen(!filterIsOpen)
      setMenuOptions(["Africa","America","Asia","Europe","Oceania"])
    }

    const sortingMenuHandler = () => {
      setSortingIsOpen(!sortingIsOpen)
      setMenuOptions(["Default", "Alphabetical order", "Most populated", "Less populated"])
    }

    const searchCountry = (event) => {
      setInputVal(event)
      if(regex.test(inputVal)){
        const filteredCountries = countries.filter((country) => country.name.common.toLowerCase().includes(inputVal))
        setCountries(filteredCountries)
      }
    }

    const filterByRegion = (region) => {
        const filteredCountries = Array.from(data).filter((country) => country.region.includes(region))
        setCountries(filteredCountries)
    }

    const sortingHandler = (sort) => {
      let dataCopy = data.slice()
      switch(sort) {
        case "Alphabetical order":
          console.log(sort)
          break;
        case "Most populated":
          for(let i = 0; i < dataCopy.length; i++){
            for(let j = 0; j < dataCopy.length -1; j++){
                const temp = dataCopy[j]
                if(dataCopy[j].population < dataCopy[j + 1].population){
                  console.log(dataCopy[j].population)
                  dataCopy[j] = dataCopy[j + 1]
                  dataCopy[j + 1] = temp
                }
              }
            }  
          setCountries(dataCopy)
          break;
        case "Less populated":
          console.log(sort)
          break;
        default:
          console.log(sort) 
      }
    }

    useEffect(() => { //sets the default value to an array of fetched data
      if (data && inputVal == "") setCountries(Array.from(data))
      console.log(data)
    },[data, inputVal])


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
              <div className='p-4 bg-white rounded-s-md outline-none'>
                {magnifyingGlassSvg}
              </div>
              <input className= 'p-4 w-full rounded-e-md outline-none' onChange={(e) => {searchCountry(e.target.value)}} type='text' placeholder='Search for a country'/>
            </div>
            <div className='flex flex-col lg:flex-row lg:gap-4'>
              <SortingList callback={sortingHandler} menuHandler={sortingMenuHandler} menuTitle={"Sort by"} menuOptions={menuOptions}  isOpen={sortingIsOpen}/>
              <SortingList callback={filterByRegion} menuHandler={filterMenuHandler}  menuTitle={"Filter by region"} menuOptions={menuOptions} isOpen={filterIsOpen}/>
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