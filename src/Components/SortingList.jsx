/* eslint-disable react/prop-types */
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const chevronDownSvg = <FontAwesomeIcon icon={faChevronDown} />

const SortingList = ({callback, menuHandler, isOpen, menuTitle, menuOptions}) => {

    const options = menuOptions.map((option) => <li key={option} className='cursor-pointer' onClick={() => {callback(option)}}>{option}</li>)

    return(
        <div className='relative mt-2' onMouseEnter={menuHandler} onMouseLeave={menuHandler}>
            <div className='flex justify-between items-center gap-12 p-4 mb-2 w-fit bg-white rounded-md cursor-pointer shadow-md
            lg:mt-0' >
                <p>{menuTitle}</p>
                {chevronDownSvg}
            </div>
            <div className={`absolute z-50 ${isOpen === true ? 'block': 'hidden'} w-52 bg-white rounded-md shadow-md
            lg:bottom-auto`}>
              <ul className='flex flex-col gap-2 p-4'>
                {options}
              </ul>
            </div>
        </div>
    )
}

export default SortingList