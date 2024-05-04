import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import useSWR from 'swr';
import Spinner from './Spinner.jsx';
import SortingList from './SortingList.jsx';

const magnifyingGlassSvg = <FontAwesomeIcon icon={faMagnifyingGlass} />;

const regex = /^(?!\s*$)[a-zA-Z0-9\s]+$/g;

function LandingPage({searchFilter}) {

  const fetcher = url => axios.get(url).then(res => res.data);
  const {data, isLoading} = useSWR(searchFilter, fetcher);
  
  const [countries, setCountries] = useState([]);
  const [filterIsOpen, setFilterIsOpen] = useState(false);
  const [sortingIsOpen, setSortingIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [menuOptions, setMenuOptions] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  
  const filterMenuHandler = () => {
    setFilterIsOpen(!filterIsOpen);
    setMenuOptions(["Africa","America","Asia","Europe","Oceania"]);
  }
  
  const sortingMenuHandler = () => {
    setSortingIsOpen(!sortingIsOpen);
    setMenuOptions(["Default", "Alphabetical order", "Most populated", "Less populated"]);
  }

  const searchCountry = (event) => {
    setInputVal(event);
    if(regex.test(inputVal)){
      const filteredCountries = countries.filter((country) => country.name.common.toLowerCase().includes(inputVal));
      setCountries(filteredCountries);
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
        setCountries(quickSort(dataCopy, 0, dataCopy.length - 1, true).reverse());
        break;
      case "Most populated":
        setCountries(quickSort(dataCopy).reverse());
        break;
      case "Less populated":
        setCountries(quickSort(dataCopy));
        break;
      default:
        setCountries(Array.from(data));
    }
  }

  const quickSort = (arr, left = 0, right = arr.length - 1, alphabeticalOrder = false) => {
    if (left >= right) {
      return;
    }
    
    let pivotIndex = partition(arr, left, right, alphabeticalOrder);
    quickSort(arr, left, pivotIndex - 1, alphabeticalOrder);
    quickSort(arr, pivotIndex + 1, right, alphabeticalOrder);
  
    return arr;
  }
  
  const partition = (arr, left, right, alphabeticalOrder) => {
    let pivotValue = arr[right];
    let partitionIndex = left;

    if(alphabeticalOrder){
      for (let i = left; i < right; i++) {
        if (arr[i].name.common.charCodeAt(0) > pivotValue.name.common.charCodeAt(0)) {
          swap(arr, i, partitionIndex);
          partitionIndex++;
        }
      }
    }else{
      for (let i = left; i < right; i++) {
        if (arr[i].population < pivotValue.population) {
          swap(arr, i, partitionIndex);
          partitionIndex++;
        }
      }
    }
    swap(arr, right, partitionIndex);

    return partitionIndex;
  }
  
  const swap = (arr, firstIndex, secondIndex) => {
    let temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
  }

  const scrollToTop = () => {
    window.scrollTo({top: 0, left: 0, behavior: "smooth"});
  }


  useEffect(() => { //sets the default value to an array of fetched data
    if (data && inputVal == "") setCountries(Array.from(data));
  },[data, inputVal])


  const mappedCountries =  countries.slice(pageNumber, pageNumber + 20).map(country => 
    <div className='grid grid-rows-2 max-w-72 bg-white rounded-md shadow' key={`${country.ccn3}`}>
        <Link to={`/${country.cca3}`}>
            <img className='h-full w-full max-h-60 object-fit object-top rounded-t-md' src={`${country.flags.png}`} alt={`${country.flags.alt}`}/>
        </Link>
        <div className='px-6 pt-6 pb-12'>
          <Link to={`/${country.cca3}`}>
              <p className='mb-4 text-xl font-bold' >{country.name.common}</p>
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
        <nav className='flex justify-center my-10'>
          <ul className='flex gap-4 items-center justify-center'>
            <li className='flex items-center justify-center w-12 h-12 p-4 text-white font-semibold rounded-full bg-cta'><button onClick={() => {setPageNumber(0); scrollToTop()}}>1</button></li>
            <li className='flex items-center justify-center w-12 h-12 p-4 text-white font-semibold rounded-full bg-cta'><button onClick={() => {setPageNumber(20); scrollToTop()}}>2</button></li>
            <li className='flex items-center justify-center w-12 h-12 p-4 text-white font-semibold rounded-full bg-cta'><button onClick={() => {setPageNumber(40); scrollToTop()}}>3</button></li>
            <li className='flex items-center justify-center w-12 h-12 p-4 text-white font-semibold rounded-full bg-cta'><button onClick={() => {setPageNumber(60); scrollToTop()}}>4</button></li>
            <li className='flex items-center justify-center w-12 h-12 p-4 text-white font-semibold rounded-full bg-cta'><button onClick={() => {setPageNumber(80); scrollToTop()}}>5</button></li>
            <li className='flex items-center justify-center w-12 h-12 p-4 text-white font-semibold rounded-full bg-cta'><button onClick={() => {setPageNumber(100); scrollToTop()}}>6</button></li>
            <li className='flex items-center justify-center w-12 h-12 p-4 text-white font-semibold rounded-full bg-cta'><button onClick={() => {setPageNumber(120); scrollToTop()}}>7</button></li>
            <li className='flex items-center justify-center w-12 h-12 p-4 text-white font-semibold rounded-full bg-cta'><button onClick={() => {setPageNumber(140); scrollToTop()}}>8</button></li>
            <li className='flex items-center justify-center w-12 h-12 p-4 text-white font-semibold rounded-full bg-cta'><button onClick={() => {setPageNumber(160); scrollToTop()}}>9</button></li>
            <li className='flex items-center justify-center w-12 h-12 p-4 text-white font-semibold rounded-full bg-cta'><button onClick={() => {setPageNumber(180); scrollToTop()}}>10</button></li>
            <li className='flex items-center justify-center w-12 h-12 p-4 text-white font-semibold rounded-full bg-cta'><button onClick={() => {setPageNumber(200); scrollToTop()}}>11</button></li>
            <li className='flex items-center justify-center w-12 h-12 p-4 text-white font-semibold rounded-full bg-cta'><button onClick={() => {setPageNumber(220); scrollToTop()}}>12</button></li>
            <li className='flex items-center justify-center w-12 h-12 p-4 text-white font-semibold rounded-full bg-cta'><button onClick={() => {setPageNumber(240); scrollToTop()}}>13</button></li>
          </ul>
        </nav>
      </main>
    </>
  )
}

  export default LandingPage