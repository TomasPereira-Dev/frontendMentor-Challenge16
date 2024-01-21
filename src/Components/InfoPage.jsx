import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";

const arrowLeftSvg = <FontAwesomeIcon icon={faArrowLeft}/>

const InfoPage = () => {
    const params = useParams()
    console.log(params.countryId)
    return(
        <>
            <div className="bg-black">
                <button type="button">{arrowLeftSvg} Back</button>
            </div>
        </>
    )
}

export default InfoPage;
