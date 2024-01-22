/* eslint-disable react/prop-types */
import { faArrowLeft, faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const arrowLeftSvg = <FontAwesomeIcon icon={faArrowLeft}/>
const moonSvg = <FontAwesomeIcon icon={faMoon} />

const InfoPage = ({ countries, searchFilter}) => { 

    return (
        <>
        
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
                        <img src={countries.flags.svg} alt=" flag" />
                    </div>
                    
                    <ul>
                        <li>{countries.name.common}</li>
                        <li>Native Name:  {countries.name.nativeName.cat.common}</li>
                        <li>Population: {countries.population}</li>
                        <li>Region: {countries.region}</li>
                        <li>Sub Region: {countries.subregion}</li>
                        <li>Capital: {countries.capital}</li>
                        <li>Top Level Domain: {countries.tld}</li>
                        <li>Languages: {countries.languages.cat}</li>
                    </ul>
                </div>
            </main>
        </>
    ) 
}

export default InfoPage;
