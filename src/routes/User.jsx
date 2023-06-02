import React from 'react'
import { useSelector } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/home/Home'

function User() {
    let isAuthenticated = false
    const { user } = useSelector((state) => state.userAuth)

    if (user?.token) {
        isAuthenticated = true
    }

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
    ) : (
        window.location.href = 'http://localhost:3001'
    )
}

export default User