import React from 'react'
import { useEffect } from 'react';
import { loginUser } from '../redux/features/authSlice'
import { Routes, Route, Navigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Home from '../pages/home/Home'
import Materials from '../pages/materials/Materials';
import TestReport from '../components/test-report-source/TestReport';

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
        if (!id && !user._id) {
            window.location.href = `http://localhost:3001`
        } else if (id) {
            dispatch(loginUser(id))
        }
    }, [])

    return (
        <Routes>
            <Route path='/' element={<PrivateRoute element={<Home />} isAuthenticated={isAuthenticated} />} />
            <Route path='/raw-materials' element={<PrivateRoute element={<Materials />} isAuthenticated={isAuthenticated} />} />
            <Route path='/raw-materials/test-report-source' element={<PrivateRoute element={<TestReport />} isAuthenticated={isAuthenticated} />} />
            <Route path='/raw-materials/solution-models' element={<PrivateRoute element={<Materials />} isAuthenticated={isAuthenticated} />} />
            <Route path='/raw-materials/purifier-models' element={<PrivateRoute element={<Materials />} isAuthenticated={isAuthenticated} />} />
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