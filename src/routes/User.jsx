import React from 'react'
import { useEffect } from 'react';
import { loginUser } from '../redux/features/authSlice'
import { Routes, Route, Navigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Home from '../pages/home/Home'
import Materials from '../pages/materials/Materials';
import TestReport from '../components/test-report-source/TestReport';
import WorkSite from '../components/work-site/WorkSite';
import WaterUsage from '../components/water-usage/WaterUsage';
import InstallationMode from '../components/installation-mode/InstallationMode';
import SolutionModel from '../components/solution-model/SolutionModel';
import PurifierComponents from '../components/purifier-components/PurifierComponents';

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
            <Route path='/raw-materials/work-site' element={<PrivateRoute element={<WorkSite />} isAuthenticated={isAuthenticated} />} />
            <Route path='/raw-materials/water-usage' element={<PrivateRoute element={<WaterUsage />} isAuthenticated={isAuthenticated} />} />
            <Route path='/raw-materials/installation-mode' element={<PrivateRoute element={<InstallationMode />} isAuthenticated={isAuthenticated} />} />
            <Route path='/raw-materials/solution-models' element={<PrivateRoute element={<SolutionModel />} isAuthenticated={isAuthenticated} />} />
            <Route path='/raw-materials/purifier-components' element={<PrivateRoute element={<PurifierComponents />} isAuthenticated={isAuthenticated} />} />
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