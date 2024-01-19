import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon } from '@fortawesome/free-regular-svg-icons'
import { faMagnifyingGlass, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

const moonSvg = <FontAwesomeIcon icon={faMoon}/>
const magnifyingGlassSvg = <FontAwesomeIcon icon={faMagnifyingGlass} />
const chevronDownSvg = <FontAwesomeIcon icon={faChevronDown} />


function App() {

  const [isOpen, setIsOpen] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState("All")

  const menuHandler = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <header className="flex justify-between items-center px-4 py-8 bg-white">
        <p className="text-lg font-bold">Where in the world?</p>
        <div className="flex items-center gap-2">
          {moonSvg}
          <button className='font-semibold'>Dark Mode</button>
        </div>
      </header>
      <main className='mt-4 px-4'>
        <div className='flex flex-col' > 
          <div className='flex'>
            <div className='p-4 bg-white rounded-s-md cursor-pointer'>
              {magnifyingGlassSvg}
            </div>
            <input className='p-4 w-full rounded-e-md' type="text" placeholder="Search for a country"/>
          </div>
            <div className='w-fit'>
              <div className='flex justify-between items-center gap-12 p-4 mt-10 bg-white rounded-md cursor-pointer' onClick={menuHandler}>
                  <p>{selectedRegion !== "All" ? selectedRegion : "Filter by Region"}</p>
                  {chevronDownSvg}
              </div>
              <div className={`${isOpen === true ? 'block': 'hidden'} bg-white rounded-md`}>
                  <ul className='flex flex-col gap-2 p-4'>
                    <li className='cursor-pointer' onClick={()=>{setSelectedRegion("Africa")}}>Africa</li>
                    <li className='cursor-pointer' onClick={()=>{setSelectedRegion("America")}}>America</li>
                    <li className='cursor-pointer' onClick={()=>{setSelectedRegion("Asia")}}>Asia</li>
                    <li className='cursor-pointer' onClick={()=>{setSelectedRegion("Europe")}}>Europe</li>
                    <li className='cursor-pointer' onClick={()=>{setSelectedRegion("Oceania")}}>Oceania</li>
                  </ul>
              </div>
            </div>
        </div>
      </main>
    </>
  )
}

export default App
