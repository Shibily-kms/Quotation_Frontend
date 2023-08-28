import React from 'react'
import './header.scss'
import { RiLogoutCircleLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/features/authSlice'
import { useNavigate } from 'react-router-dom';


function Header() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.userAuth)

    const handleLogOut = () => {
        dispatch(logOut())
        window.location.href = 'http://192.168.204.221:3001/'
    }

    return (
        <div className='header'>
            <div className="boarder">
                <div className="left">
                    <h3 style={{ cursor: 'pointer' }} onClick={() => navigate(`/?id=${user?._id}`)}>Sales Quotation</h3>
                </div>
                <div className="right">
                    <button onClick={handleLogOut}><RiLogoutCircleLine /> Quit</button>
                </div>
            </div>
        </div>
    )
}

export default Header