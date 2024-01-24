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
            <header className="relative left-1/2 -z-10 w-screen -translate-x-1/2 px-4 py-8 bg-white">
                <div className="relative left-1/2 max-w-screen-xl -translate-x-1/2 flex justify-between items-center">
                    <p className="text-lg font-bold">Where in the world?</p>
                    <div className="flex items-center gap-2">
                      {moonSvg}
                      <button className='font-semibold'>Dark Mode</button>
                    </div>
                </div> 
            </header>
            <main className="px-4 py-8 lg:px-0">
                <div>
                    <Link to="/frontendMentor-Challenge16/">
                        <div className="flex items-center gap-2 bg-white px-8 py-2 w-fit">
                            {arrowLeftSvg}
                            <button onClick={()=> {searchFilterHandler("https://restcountries.com/v3.1/all")}} type="button">Back</button>
                        </div>
                    </Link> 
                </div>
                <div className="flex flex-col gap-12 mt-12 lg:flex-row lg:items-center">
                    {console.log(countries[0])}
                    <div>
                        <img src={countries[0].flags.svg} alt=" flag" />
                    </div>
                    <div className="flex flex-col gap-6 lg:justify-between lg:gap-4">
                        <p className="text-2xl font-bold mb-6 lg:text-3xl">{countries[0].name.common}</p>
                        <div className="lg:grid lg:grid-cols-2">
                            <ul>  
                                <li><span className="font-semibold">Native Name:</span>  {countries[0].name.nativeName[Object.keys(countries[0].name.nativeName)[0]].common}</li>
                                <li><span className="font-semibold">Population:</span> {countries[0].population}</li>
                                <li><span className="font-semibold">Region:</span> {countries[0].region}</li>
                                <li><span className="font-semibold">Sub Region:</span> {countries[0].subregion}</li>
                                <li><span className="font-semibold">Capital:</span> {countries[0].capital}</li>
                            </ul>
                            <ul className="mt-4 lg:mt-0">
                                <li><span className="font-semibold">Top Level Domain:</span> {countries[0].tld}</li>
                                <li><span className="font-semibold">Languages:</span> {countries[0].languages[Object.keys(countries[0].languages)[0]]}</li>
                                <li><span className="font-semibold">Currency:</span> {countries[0].currencies[Object.keys(countries[0].currencies)[0]].name}</li>
                            </ul>
                        </div>
                        <div>
                            <p className="text-lg font-semibold mb-6">Border Countries:</p>
                            <div className="grid grid-cols-3 gap-8 md:grid-cols-5">
                                {mappedBorders}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
        
    )   
}

export default InfoPage;
