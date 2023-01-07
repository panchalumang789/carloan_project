import React, { useState } from 'react'

import hamburgerIcon from '../../assest/images/hamburgerIcon.svg'
import crossIcon from '../../assest/images/crossIcon.svg'

const Navbar = () => {
    const [Navbar, setNavbar] = useState({ navbar: '-right-full', icon: hamburgerIcon })
    const toggleNav = () => {
        let open = { navbar: 'right-0', icon: crossIcon }
        let close = { navbar: '-right-full', icon: hamburgerIcon }
        setNavbar(Navbar.navbar === '-right-full' ? open : close)

    }
    return (
        <>
            <div>
                <div className='fixed top-8 right-16 p-2'>
                    <button onClick={toggleNav} >
                        <img src={Navbar.icon} alt='navIcon' className='h-10 w-10' />
                    </button>
                </div>
            </div>
            <div className={Navbar.navbar + ' fixed max-w-xl w-full transition-all duration-700 bg-red-400 -z-10'}>
                <div className='flex max-w-md w-full h-screen '>
                    <div className='  text-white'>Navbar</div>
                </div >
            </div>
        </>
    )
}

export default Navbar