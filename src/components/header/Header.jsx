import React from 'react'
import './header.scss'
import { RiLogoutCircleLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/features/authSlice'


function Header() {
    const dispatch = useDispatch()

    const handleLogOut = () => {
        dispatch(logOut())
        window.location.href = 'https://www.staff.alliancewatersolutions.com/'
    }

    return (
        <div className='header'>
            <div className="boader">
                <div className="left">
                    <h3>Company</h3>
                </div>
                <div className="right">
                    <button onClick={handleLogOut}><RiLogoutCircleLine /> LogOut In Sales</button>
                </div>
            </div>
        </div>
    )
}

export default Header