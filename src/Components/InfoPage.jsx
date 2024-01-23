/* eslint-disable react/prop-types */
import { faArrowLeft, faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import useSWR from "swr";

const arrowLeftSvg = <FontAwesomeIcon icon={faArrowLeft}/>
const moonSvg = <FontAwesomeIcon icon={faMoon} />

const InfoPage = ({ searchFilter }) => { 

    const fetcher = url => axios.get(url).then(res => res.data)
    const {data, isLoading} = useSWR(searchFilter, fetcher, {revalidateOnMount: true})
    const countries = isLoading ? [] : Array.from(data)

    if (isLoading) return(
        <>
            <h1>loading</h1>
        </>
    )
     return (
        <>
            {console.log(countries[0].currencies[Object.keys(countries[0].currencies)[0]].name)}
            <header className="flex justify-between items-center px-4 py-8 bg-white">
              <p className="text-lg font-bold">Where in the world?</p>
              <div className="flex items-center gap-2">
                {moonSvg}
                <button className='font-semibold'>Dark Mode</button>
              </div>
            </header>
            <main>
                <div>
                    <button type="button">{arrowLeftSvg} Back</button>
                </div>
                <div className="flex">
                    <div>
                        <img src={countries[0].flags.svg} alt=" flag" />
                    </div>
                    <ul>
                        <li>{countries[0].name.common}</li>
                        <li>Native Name:  {countries[0].name.nativeName[Object.keys(countries[0].name.nativeName)[0]].common}</li>
                        <li>Population: {countries[0].population}</li>
                        <li>Region: {countries[0].region}</li>
                        <li>Sub Region: {countries[0].subregion}</li>
                        <li>Capital: {countries[0].capital}</li>
                        <li>Top Level Domain: {countries[0].tld}</li>
                        <li>Languages: {countries[0].languages[Object.keys(countries[0].languages)[0]]}</li>
                        <li>Currency: {countries[0].currencies[Object.keys(countries[0].currencies)[0]].name}</li>
                    </ul>
                </div>
            </main>
        </>
        
    )   
}

export default InfoPage;
