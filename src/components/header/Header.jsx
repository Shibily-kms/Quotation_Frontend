import React from 'react'
import './header.scss'
import { RiLogoutCircleLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/features/authSlice'


function Header() {
    const dispatch = useDispatch()

    const handleLogOut = () => {
        dispatch(logOut())
        window.location.href = 'http://localhost:3001/'
    }

    return (
        <div className='header'>
            <div className="boarder">
                <div className="left">
                    <h3>Sales Quotation</h3>
                </div>
                <div className="right">
                    <button onClick={handleLogOut}><RiLogoutCircleLine /> Quit</button>
                </div>
            </div>
        </div>
    )
}

export default Header