import React, { useEffect, useState } from 'react'
import './form.scss'
import DynamicTextList from '../dynamic-text-list/DynamicTextList'
import { userAxios } from '../../config/axios'
import { toast } from 'react-toastify'
import { form1Validate } from '../../assets/js/validate-function'
import { setQuotationInput, setFill } from '../../redux/features/quotationSlice'
import { useDispatch, useSelector } from 'react-redux'


function Form1({ type, setPage }) {
    const dispatch = useDispatch()
    const { quotation, fill } = useSelector((state) => state.inputData)
    const [findings, setFindings] = useState(quotation?.findings || [])
    const [source, setSource] = useState([])
    const [site, setSite] = useState([])
    const [usage, setUsage] = useState([])
    const [iMode, setIMode] = useState([])


    useEffect(() => {
        dispatch(setQuotationInput({ findings }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [findings])

    useEffect(() => {
        setFindings(quotation?.findings || [])
    }, [quotation])

    useEffect(() => {

        const fetchData = async () => {
            try {

                const response1 = await userAxios.get('/water-test-report-source');
                setSource(response1.data.source.data);

                const response2 = await userAxios.get('/work-sites');
                setSite(response2.data.source.data);

                const response3 = await userAxios.get('/water-usage');
                setUsage(response3.data.source.data);

                const response4 = await userAxios.get('/installation-mode');
                setIMode(response4.data.source.data);

            } catch (error) {
                // Handle any errors that occur during the API calls
                console.error(error);
            }
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Handles
    const handleChange = (e) => {
        dispatch(setFill({ one: false }))
        dispatch(setQuotationInput({ [e.target.name]: e.target.value }))
    }
    const handleQuotationTo = (e) => {
        dispatch(setFill({ one: false }))
        dispatch(setQuotationInput({
            customer: {
                ...quotation?.customer,
                [e.target.name]: e.target.value
            }
        }))
    }
    const handleTestReport = (e) => {
        dispatch(setFill({ one: false }))
        dispatch(setQuotationInput({
            test_report: {
                ...quotation.test_report,
                [e.target.name]: e.target.value
            }
        }))
    }
    const handlePWSReport = (e) => {
        dispatch(setFill({ one: false }))
        if (type === 'wh-and-purifier' && e.target.name === 'site') {
            dispatch(setQuotationInput({
                vfs_report: {
                    ...quotation.vfs_report,
                    [e.target.name]: e.target.value
                },
                pws_report: {
                    ...quotation.pws_report,
                    [e.target.name]: e.target.value
                }
            }))
        } else {
            dispatch(setQuotationInput({
                pws_report: {
                    ...quotation.pws_report,
                    [e.target.name]: e.target.value
                }
            }))
        }
    }
    const handleVFSReport = (e) => {
        dispatch(setFill({ one: false }))
        if (type === 'wh-and-purifier' && e.target.name === 'site') {
            dispatch(setQuotationInput({
                pws_report: {
                    ...quotation.pws_report,
                    [e.target.name]: e.target.value
                },
                vfs_report: {
                    ...quotation.vfs_report,
                    [e.target.name]: e.target.value
                }
            }))
        } else {
            dispatch(setQuotationInput({
                vfs_report: {
                    ...quotation.vfs_report,
                    [e.target.name]: e.target.value
                }
            }))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let validate = null
        if (fill.validation) {
            validate = form1Validate(quotation, type)
        } else {
            validate = { status: true }
        }

        if (validate.status) {
            setPage(2)
            dispatch(setFill({ one: true }))
        } else {
            toast.error(validate.message)
        }
    }


    return (
        <div>
            <div className="form-div">
                <form action="" onSubmit={handleSubmit}>
                    {/* Visit Date */}
                    <div className="section-div">
                        <div className="forms">
                            <div className="nor-input-div">
                                <input type="date" id='visit' name='visit_date' onChange={handleChange} value={quotation?.visit_date} required={fill.validation ? true : false} />
                                <label htmlFor="visit">Visit Date</label>
                            </div>
                            <div className="nor-input-div">
                                <input type="text" id='Enquiry' name='enquiry_srl_no' onChange={handleChange} value={quotation?.enquiry_srl_no} placeholder='Enquiry Serial Number' />
                                <label htmlFor="Enquiry">Enquiry Srl No</label>
                            </div>
                        </div>
                    </div>

                    {/* Quotation To */}
                    <div className="section-div">
                        <div className="header">
                            <h5>Quotation To</h5>
                        </div>
                        <div className="forms">
                            <div className="nor-input-div">
                                <input type="text" id='name' name='name' value={quotation?.customer?.name} required={fill.validation ? true : false} onChange={handleQuotationTo} />
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="nor-input-div">
                                <input type="text" id='address' name='address' value={quotation?.customer?.address} required={fill.validation ? true : false} onChange={handleQuotationTo} />
                                <label htmlFor="address">Address</label>
                            </div>
                            <div className="nor-input-div">
                                <input type="text" id='place' name='place' value={quotation?.customer?.place} required={fill.validation ? true : false} onChange={handleQuotationTo} />
                                <label htmlFor="place">Place</label>
                            </div>
                            <div className="nor-input-div">
                                <input type="text" id='post' name='post' value={quotation?.customer?.post} required={fill.validation ? true : false} onChange={handleQuotationTo} />
                                <label htmlFor="post">Post Office</label>
                            </div>
                            <div className="nor-input-div">
                                <input type="number" step="0.1" id='pin' name='pin' required={fill.validation ? true : false} value={quotation?.customer?.pin} onChange={handleQuotationTo} minLength={6} maxLength={6} />
                                <label htmlFor="pin">Pin Code </label>
                            </div>
                            <div className="nor-input-div">
                                <input type="text" id='dt' name='dt' value={quotation?.customer?.dt} required={fill.validation ? true : false} onChange={handleQuotationTo} />
                                <label htmlFor="dt">District</label>
                            </div>
                            <div className="nor-input-div">
                                <input type="number" step="0.1" id='mobile' name='mobile' value={quotation?.customer?.mobile} required={fill.validation ? true : false} onChange={handleQuotationTo} minLength={10} />
                                <label htmlFor="mobile">Contact No</label>
                            </div>
                        </div>
                    </div>

                    {/* Water Test Report */}
                    <div className="section-div">
                        <div className="header">
                            <h5>Water Test Report</h5>
                        </div>
                        <div className="forms">
                            <div className="nor-input-div">
                                <select id="source" name="source" required={fill.validation ? true : false} onChange={handleTestReport} >
                                    <option value={''}>{source[0] ? 'Choose...' : 'Loading...'}</option>
                                    {source?.[0] ? <>
                                        {source.map((value) => {
                                            return <option key={value.id || value._id} selected={value.item === quotation?.test_report?.source ? true : false}
                                                value={value.item}>{value.item}</option>
                                        })}
                                    </> : ''}
                                </select>
                                <label htmlFor="source">Source</label>
                            </div>
                            <div className="nor-input-div">
                                <input type="number" step="0.1" id='TDS' name='tds' value={quotation?.test_report?.tds} required={fill.validation ? true : false} onChange={handleTestReport} />
                                <label htmlFor="TDS">TDS (mg/L)</label>
                            </div>
                            <div className="nor-input-div">
                                <input type="number" step="0.1" id='PH' name='ph' value={quotation?.test_report?.ph} required={fill.validation ? true : false} onChange={handleTestReport} />
                                <label htmlFor="PH">PH (mg/L)</label>
                            </div>
                            <div className="nor-input-div">
                                <input type="number" step="0.1" id='iron' name='fe' value={quotation?.test_report?.fe} required={fill.validation ? true : false} onChange={handleTestReport} />
                                <label htmlFor="iron">Iron (mg/L)</label>
                            </div>
                            <div className="nor-input-div">
                                <input type="number" step="0.1" id='calcium' name='ca' value={quotation?.test_report?.ca} required={fill.validation ? true : false} onChange={handleTestReport} />
                                <label htmlFor="calcium">Calcium (mg/L)</label>
                            </div>

                        </div>
                    </div>

                    {/* Findings */}
                    <div className="section-div">
                        <div className="header">
                            <h5>Additional Findings</h5>
                        </div>

                        <DynamicTextList data={findings} setData={setFindings} />

                    </div>

                    {/* PWS Report */}
                    {type === 'purifier' || type === 'wh-and-purifier' ?
                        <>
                            <div className="section-div">
                                <div className="header">
                                    <h5>Purifier - Work Site Report (PWS Report)</h5>
                                </div>
                                <div className="forms">
                                    {/* Site */}
                                    <div className="nor-input-div">
                                        <select id="site" name="site" required={fill.validation ? true : false} onChange={handlePWSReport} >
                                            <option value={''}>{site[0] ? 'Choose...' : 'Loading...'}</option>
                                            {site?.[0] ? <>
                                                {site.map((value) => {
                                                    return <option key={value.id || value._id} selected={value.item === quotation?.pws_report?.site ? true : false}
                                                        value={value.item}>{value.item}</option>
                                                })}
                                            </> : ''}
                                        </select>
                                        <label htmlFor="site">Site</label>
                                    </div>
                                    {/* Usage */}
                                    <div className="nor-input-div">
                                        <select id="usage1" name="usage" required={fill.validation ? true : false} onChange={handlePWSReport} >
                                            <option value={''}>{usage[0] ? 'Choose...' : 'Loading...'}</option>
                                            {usage?.[0] ? <>
                                                {usage.map((value) => {
                                                    return <option key={value.id || value._id} selected={value.item === quotation?.pws_report?.usage ? true : false}
                                                        value={value.item}>{value.item}</option>
                                                })}
                                            </> : ''}
                                        </select>
                                        <label htmlFor="usage1">Usage</label>
                                    </div>
                                    {/* I Mode */}
                                    <div className="nor-input-div">
                                        <select id="iMode" name="iMode" required={fill.validation ? true : false} onChange={handlePWSReport} >
                                            <option value={''}>{iMode[0] ? 'Choose...' : 'Loading...'}</option>
                                            {iMode?.[0] ? <>
                                                {iMode.map((value) => {
                                                    return <option key={value.id || value._id} selected={value.item === quotation?.pws_report?.iMode ? true : false}
                                                        value={value.item}>{value.item}</option>
                                                })}
                                            </> : ''}
                                        </select>
                                        <label htmlFor="iMode">Installation Mode</label>
                                    </div>
                                    {/* Water Point */}
                                    <div className="nor-input-div">
                                        <select id="waterPoint" name="water_point" required={fill.validation ? true : false} onChange={handlePWSReport} >
                                            <option value={''}>Choose...</option>
                                            <option selected={"true" === String(quotation?.pws_report?.water_point)}
                                                value={true}>Yes</option>
                                            <option selected={"false" === String(quotation?.pws_report?.water_point)}
                                                value={false}>No</option>
                                        </select>
                                        <label htmlFor="waterPoint">Water Point</label>
                                    </div>
                                    {/* Usage */}
                                    <div className="nor-input-div">
                                        <select id="plugPoint" name="plug_point" required={fill.validation ? true : false} onChange={handlePWSReport} >
                                            <option value={''}>Choose...</option>
                                            <option selected={"true" === String(quotation?.pws_report?.plug_point)}
                                                value={true}>Yes</option>
                                            <option selected={"false" === String(quotation?.pws_report?.plug_point)}
                                                value={false}>No</option>
                                        </select>
                                        <label htmlFor="plugPoint">Plug Point</label>
                                    </div>

                                </div>
                            </div>
                        </> : ''}

                    {/* VFS Report */}
                    {type === 'whole-house' || type === 'wh-and-purifier' ?
                        <>
                            <div className="section-div">
                                <div className="header">
                                    <h5>Vessel Filter - Work Site Report  (VFS Report)</h5>
                                </div>
                                <div className="forms">
                                    {/* Site */}
                                    <div className="nor-input-div">
                                        <select id="site" name="site" required={fill.validation ? true : false} onChange={handleVFSReport} >
                                            <option value={''}>{site[0] ? 'Choose...' : 'Loading...'}</option>
                                            {site?.[0] ? <>
                                                {site.map((value) => {
                                                    return <option key={value.id || value._id} selected={value.item === quotation?.vfs_report?.site ? true : false}
                                                        value={value.item}>{value.item}</option>
                                                })}
                                            </> : ''}
                                        </select>
                                        <label htmlFor="site">Site</label>
                                    </div>
                                    {/* Usage */}
                                    <div className="nor-input-div">
                                        <select id="usage2" name="usage" required={fill.validation ? true : false} onChange={handleVFSReport} >
                                            <option value={''}>{usage[0] ? 'Choose...' : 'Loading...'}</option>
                                            {usage?.[0] ? <>
                                                {usage.map((value) => {
                                                    return <option key={value || value._id} selected={value.item === quotation?.vfs_report?.usage ? true : false}
                                                        value={value.item}>{value.item}</option>
                                                })}
                                            </> : ''}
                                        </select>
                                        <label htmlFor="usage2">Usage</label>
                                    </div>
                                    <div className="nor-input-div">
                                        <input type="number" step="0.1" id='tankCapasity' name='tank_capasity' value={quotation?.vfs_report?.tank_capasity} required={fill.validation ? true : false} onChange={handleVFSReport} />
                                        <label htmlFor="tankCapasity">Tank Capasity (L)</label>
                                    </div>
                                    <div className="nor-input-div">
                                        <input type="text" id='motor' name='motor_details' value={quotation?.vfs_report?.motor_details} required={fill.validation ? true : false} onChange={handleVFSReport} />
                                        <label htmlFor="motor">Motor Details</label>
                                    </div>
                                    <div className="nor-input-div">
                                        <input type="text" id='floor' name='floor_details' value={quotation?.vfs_report?.floor_details} required={fill.validation ? true : false} onChange={handleVFSReport} />
                                        <label htmlFor="floor">Floor Details</label>
                                    </div>
                                    <div className="nor-input-div">
                                        <input type="number" step="0.1" id='floorHeight' name='floor_hight' value={quotation?.vfs_report?.floor_hight} required={fill.validation ? true : false} onChange={handleVFSReport} />
                                        <label htmlFor="floorHeight">Floor Height (Feet)</label>
                                    </div>

                                    {/* Inlet */}
                                    <div className="nor-input-div">
                                        <select id="inlet" name="inlet" required={fill.validation ? true : false} onChange={handleVFSReport} >
                                            <option value={''}>Choose...</option>
                                            {["16", "24", "32", "40", "48", "56", "64", "72", "80", "88", "96", "104",
                                                "112", "120", "128", "136", "144", "152", "160", "168", "176", "184", "192"]
                                                .map((optn) => {
                                                    return <option selected={optn == quotation?.vfs_report?.inlet ? true : false}
                                                        value={optn}>{optn} mm</option>
                                                })}
                                        </select>
                                        <label htmlFor="inlet">Inlet</label>
                                    </div>
                                    {/* Inlet */}
                                    <div className="nor-input-div">
                                        <select id="outlet" name="outlet" required={fill.validation ? true : false} onChange={handleVFSReport} >
                                            <option value={''}>Choose...</option>
                                            {["16", "24", "32", "40", "48", "56", "64", "72", "80", "88", "96", "104",
                                                "112", "120", "128", "136", "144", "152", "160", "168", "176", "184", "192"]
                                                .map((optn) => {
                                                    return <option selected={optn == quotation?.vfs_report?.outlet ? true : false}
                                                        value={optn}>{optn} mm</option>
                                                })}
                                        </select>
                                        <label htmlFor="outlet">Outlet</label>
                                    </div>
                                    {/* Bathroom InTop */}
                                    <div className="nor-input-div">
                                        <select id="BRInTop" name="bathroom_in_top" required={fill.validation ? true : false} onChange={handleVFSReport} >
                                            <option value={''}>Choose...</option>
                                            {[
                                                "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"
                                            ].map((optn) => {
                                                return <option selected={optn == quotation?.vfs_report?.bathroom_in_top ? true : false}
                                                    value={optn}>{optn}</option>
                                            })}
                                        </select>
                                        <label htmlFor="BRInTop">Bathroom In Top</label>
                                    </div>
                                </div>
                            </div>
                        </> : ''}

                    <div className="button-div">
                        <button type='button' onClick={() => setPage(2)} className='skip'>Skip</button>
                        <button type='submit' className='next'>Next</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Form1