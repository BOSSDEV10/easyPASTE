import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { NavLink } from 'react-router-dom'
import logo from "/easyPASTE.svg"

const NavBar = () => {

  useGSAP(() => {
    gsap.from('.navlinks *', {
      y: -20,
      opacity: 0,
      duration: .5,
      stagger: .1
    })
    gsap.from('.navlinks', {
      y: -20,
      duration: .5,
    })
  })

  return (
    <div className="w-full h-25 bg-white/2 backdrop-blur-2xl flex items-center justify-between px-6 md:px-20 lg:px-50 gap-4 md:gap-7 sticky top-0 left-0 navlinks border-b-3 border-white/30 shadow-2xl shadow-white/5">
      <div className="logo h-7/10 aspect-square flex items-center justify-center p-1.5">
        <img src={logo} alt="" className='h-full object-cover'/>
      </div>
      <div className="flex items-center gap-5">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "active-line" : "inactive-link"
          }
        >
          Add Paste
        </NavLink>

        <NavLink
          to="/paste"
          className={({ isActive }) =>
            isActive ? "active-line" : "inactive-link"
          }
        >
          All Pastes
        </NavLink>
      </div>

    </div>

  )
}

export default NavBar