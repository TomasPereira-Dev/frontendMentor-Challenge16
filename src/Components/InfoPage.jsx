/* eslint-disable react/prop-types */
import { faArrowLeft, faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Link } from "react-router-dom";
import useSWR from "swr";

const arrowLeftSvg = <FontAwesomeIcon icon={faArrowLeft}/>
const moonSvg = <FontAwesomeIcon icon={faMoon} />

const InfoPage = ({ searchFilter, searchFilterHandler }) => { 

    const fetcher = url => axios.get(url).then(res => res.data)
    const {data, isLoading} = useSWR(searchFilter, fetcher, {revalidateOnMount: true})
    const countries = isLoading ? [] : Array.from(data)
    const borderCountries = countries !== undefined && countries.length > 0 ? countries[0].borders : null

    const mappedBorders = borderCountries ? borderCountries.map(border => 
        <div key={border}>
                <button className="bg-white px-8 py-2" onClick={()=> {searchFilterHandler(`https://restcountries.com/v3.1/alpha/${border}`)}}
                 type="button">{border}</button>
        </div>
    ) : <p className="bg-white px-6 py-2">None</p>

    if (isLoading) return(
        <>
            <h1>loading</h1>
        </>
    )
     return (
        <>
            <header className="flex justify-between items-center px-4 py-8 bg-white">
              <p className="text-lg font-bold">Where in the world?</p>
              <div className="flex items-center gap-2">
                {moonSvg}
                <button className='font-semibold'>Dark Mode</button>
              </div>
            </header>
            <main className="px-4 py-8">
                <div>
                    <Link to="/frontendMentor-Challenge16/">
                        <button className="bg-white px-8 py-2" onClick={()=> {searchFilterHandler("https://restcountries.com/v3.1/all")}} type="button">{arrowLeftSvg} Back</button>
                    </Link> 
                </div>
                <div className="flex flex-col gap-12 mt-12">
                    {console.log(countries[0])}
                    <div>
                        <img src={countries[0].flags.svg} alt=" flag" />
                    </div>
                    <ul>
                        <li className="text-2xl font-bold mb-6">{countries[0].name.common}</li>
                        <li><span className="font-semibold">Native Name:</span>  {countries[0].name.nativeName[Object.keys(countries[0].name.nativeName)[0]].common}</li>
                        <li><span className="font-semibold">Population:</span> {countries[0].population}</li>
                        <li><span className="font-semibold">Region:</span> {countries[0].region}</li>
                        <li><span className="font-semibold">Sub Region:</span> {countries[0].subregion}</li>
                        <li><span className="font-semibold">Capital:</span> {countries[0].capital}</li>
                    </ul>
                    <ul>
                        <li><span className="font-semibold">Top Level Domain:</span> {countries[0].tld}</li>
                        <li><span className="font-semibold">Languages:</span> {countries[0].languages[Object.keys(countries[0].languages)[0]]}</li>
                        <li><span className="font-semibold">Currency:</span> {countries[0].currencies[Object.keys(countries[0].currencies)[0]].name}</li>
                    </ul>
                    <div>
                        <p className="text-lg font-semibold">Border Countries:</p>
                        <div className="grid grid-cols-3 gap-4 lg:flex lg:gap-4">
                            {mappedBorders}
                        </div>
                    </div>
                </div>
            </main>
        </>
        
    )   
}

export default InfoPage;
