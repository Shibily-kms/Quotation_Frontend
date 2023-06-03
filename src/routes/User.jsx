import React from 'react'
import { Routes, Route, Navigate, useSearchParams } from 'react-router-dom'
import Home from '../pages/home/Home'
import { useEffect } from 'react';
import { loginUser } from '../redux/features/authSlice'
import { useDispatch, useSelector } from 'react-redux'

function User() {
    const { user } = useSelector((state) => state.userAuth)
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch()
    let isAuthenticated = false

    if (user?.token) {
        isAuthenticated = true
    }

    useEffect(() => {
        const id = searchParams.get('id');
        console.log(id, 'id');
        if (id) {
            console.log('yes');
            dispatch(loginUser(id))
        } else if (!user?._id) {
            console.log('no');
            window.location.href = 'http://localhost:3001'
        } else {
            window.location.href = `http://localhost:3000?id=${user._id}`
        }
    }, [])

    return (
        <Routes>
            <Route path='/' element={<PrivateRoute element={<Home />} isAuthenticated={isAuthenticated} />} />
        </Routes>
    )
}

function PrivateRoute({ element, isAuthenticated }) {
    return isAuthenticated ? (
        <Routes>
            <Route path='/' element={element} />
        </Routes>
    ) : ""
}

export default User