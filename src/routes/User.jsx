import React from 'react'
import { useEffect } from 'react';
import { loginUser } from '../redux/features/authSlice'
import { Routes, Route, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Home from '../pages/home/Home'
import Materials from '../pages/materials/Materials';
import TestReport from '../components/test-report-source/TestReport';
import WorkSite from '../components/work-site/WorkSite';
import WaterUsage from '../components/water-usage/WaterUsage';
import InstallationMode from '../components/installation-mode/InstallationMode';
import PurifierSolutionModel from '../components/purifier-solution-model/SolutionModel';
import PurifierComponents from '../components/purifier-components/PurifierComponents';
import Quotation from '../pages/quotation/Quotation';
import FormPage from '../pages/form/FormPage';
import QuotationList from '../pages/quotation-list/QuotationList';
import WhSolutionModel from '../components/wh-solution-model/SolutionModel'
import VfsComponents from '../components/vfs-components/VfsComponents'
import VfsMaterials from '../components/vfs-materials/VfsMaterials'
import NotFound from '../components/404Page/NotFound';
import Installation from '../pages/installation/Installation';
import ReInstallation from '../pages/installation/ReInstallaton';

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
        if (!id && !user?._id) {
            window.location.href = `https://www.staff.alliancewatersolutions.com/`
        } else if (id) {
            dispatch(loginUser(id))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Routes>
            <Route path='/' element={<PrivateRoute element={<Home />} isAuthenticated={isAuthenticated} />} />
            {/* Materials */}
            {user?.designation?.allow_origins?.includes('SalesPro') && <>
                <Route path='/raw-materials' element={<PrivateRoute element={<Materials />} isAuthenticated={isAuthenticated} />} />
                <Route path='/raw-materials/test-report-source' element={<PrivateRoute element={<TestReport />} isAuthenticated={isAuthenticated} />} />
                <Route path='/raw-materials/work-site' element={<PrivateRoute element={<WorkSite />} isAuthenticated={isAuthenticated} />} />
                <Route path='/raw-materials/water-usage' element={<PrivateRoute element={<WaterUsage />} isAuthenticated={isAuthenticated} />} />
                <Route path='/raw-materials/installation-mode' element={<PrivateRoute element={<InstallationMode />} isAuthenticated={isAuthenticated} />} />
                <Route path='/raw-materials/purifier-solution-models' element={<PrivateRoute element={<PurifierSolutionModel />} isAuthenticated={isAuthenticated} />} />
                <Route path='/raw-materials/purifier-components' element={<PrivateRoute element={<PurifierComponents />} isAuthenticated={isAuthenticated} />} />
                <Route path='/raw-materials/wh-solution-models' element={<PrivateRoute element={<WhSolutionModel />} isAuthenticated={isAuthenticated} />} />
                <Route path='/raw-materials/vfs-components' element={<PrivateRoute element={<VfsComponents />} isAuthenticated={isAuthenticated} />} />
                <Route path='/raw-materials/vfs-materials' element={<PrivateRoute element={<VfsMaterials />} isAuthenticated={isAuthenticated} />} />
            </>}

            {(user?.designation?.allow_origins?.includes('SalesPro') || user?.designation?.allow_origins?.includes('Sales')) &&
                <>
                    {/* Quotation */}
                    <Route path='/quotation' element={<PrivateRoute element={<Quotation />} isAuthenticated={isAuthenticated} />} />
                    <Route path='/quotation/:type' element={<PrivateRoute element={<FormPage />} isAuthenticated={isAuthenticated} />} />

                    {/* Quotation List */}
                    <Route path='/quotations-list' element={<PrivateRoute element={<QuotationList />} isAuthenticated={isAuthenticated} />} />
                </>
            }

            {/* Installation */}
            {user?.designation?.allow_origins?.includes('Installation') &&
                <>
                    <Route path='/installation' element={<PrivateRoute element={<Installation />} isAuthenticated={isAuthenticated} />} />
                    <Route path='/re-installation' element={<PrivateRoute element={<ReInstallation />} isAuthenticated={isAuthenticated} />} />
                </>
            }


            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />

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