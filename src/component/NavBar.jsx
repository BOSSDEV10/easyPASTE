import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { NavLink } from 'react-router-dom'

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
    <div className="w-full h-20 bg-white/2 backdrop-blur-2xl flex items-center px-6 md:px-20 lg:px-50 gap-4 md:gap-7 sticky top-0 left-0 navlinks border-b-3 border-white/30 shadow-2xl shadow-white/5">
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

  )
}

export default NavBar