import { useMemo, useEffect, useState } from "react";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate, useParams } from "react-router-dom";
import Spinner from "./Spinner.jsx";
import useSWR from "swr";
import axios from "axios";
import { createApi } from "unsplash-js";

const arrowLeftSvg = <FontAwesomeIcon icon={faArrowLeft}/>;

const InfoPage = ({ searchFilter }) => {
    
    const {countryId} = useParams(); 
    const navigate = useNavigate();
    const fetcher = url => axios.get(url).then(res => res.data);
    const {data} = useSWR(searchFilter, fetcher);
    const countries = useMemo(() => data.filter((country) => countryId.toLocaleLowerCase() === country.cca3.toLocaleLowerCase()), [countryId, data]);
    const borderCountries = countries !== undefined && countries.length > 0 ? countries[0].borders : null;
    const wikiData = useSWR(`https://en.wikipedia.org/api/rest_v1/page/summary/${countries[0].name.common}`, fetcher);

    const [countryImages, setCountryImages] = useState(null);

    const mappedBorders = borderCountries ? borderCountries.map(border => 
        <div key={border}>
            <Link to={`/${border}`} className="bg-white px-8 py-2 shadow-md" 
             type="button">{border}</Link>
        </div>
    ) : <p className="bg-white px-6 py-2 text-center shadow-md">None</p>




    useEffect(() => {
        const unsplashApi = createApi({
            accessKey: "MDMSF70AivLLiRE1GcMLpBMdX4qWUgDn5SRruAwtCtI"
        })

        unsplashApi.search.getPhotos({query: countries[0].name.common, orientation:"landscape", perPage: "6"})
        .then(result => {
            setCountryImages(result)
        })
        .catch(() => {
            console.log("something went wrong with the country images")
        })
    }, [countries])

    const ImageComp = ({image}) => {

        const {urls, user} = image;

        return(
            <>
                <img className="w-full h-full aspect-square object-fit rounded-lg" src={urls.regular} alt={`Photo made by: ${user.name}`} />
                <a className="credit" target="_blank" href={`https://unsplash.com/@${user.username}`} rel="noreferrer">
                  <p className="text-sm italic">Credit: {user.name}</p>
                </a>
            </>
        )
    }


    if(!data) return <Spinner/>

     return(
        <>
            <header className="relative left-1/2 -z-10 w-screen -translate-x-1/2 px-3 py-6 bg-white shadow-md">
                <div className="relative left-1/2 max-w-screen-xl -translate-x-1/2 flex justify-between items-center">
                    <p className="text-lg font-bold">Where in the world?</p>
                </div> 
            </header>
            <main className="flex flex-col gap-12 px-4 py-8 lg:px-0">
                <div className="shadow-md w-fit">
                    <div className="flex items-center gap-2 bg-white px-8 py-2 w-fit cursor-pointer" onClick={() => navigate(-1)}>
                        {arrowLeftSvg}
                        <p>Back</p> 
                    </div>
                </div>
                <section>
                    <div className="flex flex-col gap-12 mt-12 lg:flex-row lg:items-center">
                        <div>
                            <img className="max-h-80" src={countries[0].flags.svg} alt="flag" />
                        </div>
                        <div className="flex flex-col gap-6 lg:justify-between lg:gap-4">
                            <h2 className="text-2xl font-bold mb-6 lg:text-3xl">{countries[0].name.common}</h2>
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
                </section>
                <section className="grid gap-4">
                    <h2 className="text-center text-2xl font-bold mb-4 md:text-left lg:text-3xl">About</h2>
                    <p className="max-w-[68ch]">{wikiData.data && wikiData.data.extract}</p>
                </section>
                <section>
                    <h2 className="text-center text-2xl font-bold mb-4 md:text-left lg:text-3xl">Gallery</h2>
                    <ul className="grid  md:grid-cols-3 gap-8">
                        {countryImages && countryImages.response.results.map(image => (
                            <li key={image.id}>
                                <ImageComp image={image}/>
                            </li>
                        ))}
                    </ul>
                </section>

            </main>
        </> 
    )   
}

export default InfoPage;
