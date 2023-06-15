import React, { useEffect, useState } from 'react'
import './form.scss'
import { YYYYMMDDFormat } from '../../assets/js/help-functions'
import DynamicTextList from '../dynamic-text-list/DynamicTextList'
import { userAxios } from '../../config/axios'
import { toast } from 'react-toastify'
import { form1Validate } from '../../assets/js/validate-function'


function Form1({ type, data, setData, setPage, setFill }) {
    const [findings, setFindings] = useState(data?.findings || [])
    const [source, setSource] = useState([])
    const [site, setSite] = useState([])
    const [usage, setUsage] = useState([])
    const [iMode, setIMode] = useState([])


    useEffect(() => {
        setData({
            ...data,
            findings: findings
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [findings])

    useEffect(() => {
        const fetchData = async () => {
            try {
                setData((prevData) => ({
                    ...prevData,
                    type,
                    visit_date: prevData?.visit_date ? prevData.visit_date : YYYYMMDDFormat(new Date())
                }));

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
    const handlevisit_date = (e) => {
        setData({ ...data, visit_date: e.target.value })
    }
    const handleQutationTo = (e) => {
        setData({
            ...data,
            customer: {
                ...data.customer,
                [e.target.name]: e.target.value
            }
        })
    }
    const handleTestReport = (e) => {
        setData({
            ...data,
            test_report: {
                ...data.test_report,
                [e.target.name]: e.target.value
            }
        })
    }
    const handlePWSReport = (e) => {

        if (type === 'wh-and-purifier' && e.target.name === 'site') {
            setData({
                ...data,
                vfws_report: {
                    ...data.vfws_report,
                    [e.target.name]: e.target.value
                },
                pws_report: {
                    ...data.pws_report,
                    [e.target.name]: e.target.value
                }
            })
        } else {
            setData({
                ...data,
                pws_report: {
                    ...data.pws_report,
                    [e.target.name]: e.target.value
                }
            })
        }
    }
    const handleVFWSReport = (e) => {
        if (type === 'wh-and-purifier' && e.target.name === 'site') {
            setData({
                ...data,
                pws_report: {
                    ...data.pws_report,
                    [e.target.name]: e.target.value
                },
                vfws_report: {
                    ...data.vfws_report,
                    [e.target.name]: e.target.value
                }
            })
        } else {
            setData({
                ...data,
                vfws_report: {
                    ...data.vfws_report,
                    [e.target.name]: e.target.value
                }
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const validate = form1Validate(data, type)


        if (validate.status) {
            setPage(2)
            setFill((state) => {
                return { ...state, one: true }
            })
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
                                <input type="date" id='visit' name='visit_date' onChange={handlevisit_date} value={data.visit_date} required />
                                <label htmlFor="visit">Visit Date</label>
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
                                <input type="text" id='name' name='name' value={data?.customer?.name} required onChange={handleQutationTo} />
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="nor-input-div">
                                <input type="text" id='address' name='address' value={data?.customer?.address} required onChange={handleQutationTo} />
                                <label htmlFor="address">Address</label>
                            </div>
                            <div className="nor-input-div">
                                <input type="text" id='place' name='place' value={data?.customer?.place} required onChange={handleQutationTo} />
                                <label htmlFor="place">Place</label>
                            </div>
                            <div className="nor-input-div">
                                <input type="text" id='post' name='post' value={data?.customer?.post} required onChange={handleQutationTo} />
                                <label htmlFor="post">Post Office</label>
                            </div>
                            <div className="nor-input-div">
                                <input type="number" step="0.1" id='pin' name='pin' required value={data?.customer?.pin} onChange={handleQutationTo} minLength={6} maxLength={6} />
                                <label htmlFor="pin">Pin Code </label>
                            </div>
                            <div className="nor-input-div">
                                <input type="text" id='dt' name='dt' value={data?.customer?.dt} required onChange={handleQutationTo} />
                                <label htmlFor="dt">District</label>
                            </div>
                            <div className="nor-input-div">
                                <input type="number" step="0.1" id='mobile' name='mobile' value={data?.customer?.mobile} required onChange={handleQutationTo} minLength={10} />
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
                                <select id="source" name="source" required onChange={handleTestReport} >
                                    <option value={''}>{source[0] ? 'Choose...' : 'Loading...'}</option>
                                    {source?.[0] ? <>
                                        {source.map((value) => {
                                            return <option key={value.id} selected={value.item === data?.test_report?.source ? true : false}
                                                value={value.item}>{value.item}</option>
                                        })}
                                    </> : ''}
                                </select>
                                <label htmlFor="source">Source</label>
                            </div>
                            <div className="nor-input-div">
                                <input type="number" step="0.1" id='TDS' name='tds' value={data?.test_report?.tds} required onChange={handleTestReport} />
                                <label htmlFor="TDS">TDS (ppm)</label>
                            </div>
                            <div className="nor-input-div">
                                <input type="number" step="0.1" id='PH' name='ph' value={data?.test_report?.ph} required onChange={handleTestReport} />
                                <label htmlFor="PH">PH</label>
                            </div>
                            <div className="nor-input-div">
                                <input type="number" step="0.1" id='iron' name='fe' value={data?.test_report?.fe} required onChange={handleTestReport} />
                                <label htmlFor="iron">Iron (ppm)</label>
                            </div>
                            <div className="nor-input-div">
                                <input type="number" step="0.1" id='calcium' name='ca' value={data?.test_report?.ca} required onChange={handleTestReport} />
                                <label htmlFor="calcium">Calcium </label>
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
                                        <select id="site" name="site" required onChange={handlePWSReport} >
                                            <option value={''}>{site[0] ? 'Choose...' : 'Loading...'}</option>
                                            {site?.[0] ? <>
                                                {site.map((value) => {
                                                    return <option key={value.id} selected={value.item === data?.pws_report?.site ? true : false}
                                                        value={value.item}>{value.item}</option>
                                                })}
                                            </> : ''}
                                        </select>
                                        <label htmlFor="site">Site</label>
                                    </div>
                                    {/* Usage */}
                                    <div className="nor-input-div">
                                        <select id="usage" name="usage" required onChange={handlePWSReport} >
                                            <option value={''}>{usage[0] ? 'Choose...' : 'Loading...'}</option>
                                            {usage?.[0] ? <>
                                                {usage.map((value) => {
                                                    return <option key={value.id} selected={value.item === data?.pws_report?.usage ? true : false}
                                                        value={value.item}>{value.item}</option>
                                                })}
                                            </> : ''}
                                        </select>
                                        <label htmlFor="usage">Usage</label>
                                    </div>
                                    {/* I Mode */}
                                    <div className="nor-input-div">
                                        <select id="iMode" name="iMode" required onChange={handlePWSReport} >
                                            <option value={''}>{iMode[0] ? 'Choose...' : 'Loading...'}</option>
                                            {iMode?.[0] ? <>
                                                {iMode.map((value) => {
                                                    return <option key={value.id} selected={value.item === data?.pws_report?.iMode ? true : false}
                                                        value={value.item}>{value.item}</option>
                                                })}
                                            </> : ''}
                                        </select>
                                        <label htmlFor="iMode">Installation Mode</label>
                                    </div>
                                    {/* Water Point */}
                                    <div className="nor-input-div">
                                        <select id="waterPoint" name="water_point" required onChange={handlePWSReport} >
                                            <option value={''}>Choose...</option>
                                            <option selected={'true' === data?.pws_report?.water_point ? true : false}
                                                value={true}>Yes</option>
                                            <option selected={'false' === data?.pws_report?.water_point ? true : false}
                                                value={false}>No</option>
                                        </select>
                                        <label htmlFor="waterPoint">Water Point</label>
                                    </div>
                                    {/* Usage */}
                                    <div className="nor-input-div">
                                        <select id="plugPoint" name="plug_point" required onChange={handlePWSReport} >
                                            <option value={''}>Choose...</option>
                                            <option selected={'true' === data?.pws_report?.plug_point ? true : false}
                                                value={true}>Yes</option>
                                            <option selected={'false' === data?.pws_report?.plug_point ? true : false}
                                                value={false}>No</option>
                                        </select>
                                        <label htmlFor="plugPoint">Plug Point</label>
                                    </div>

                                </div>
                            </div>
                        </> : ''}

                    {/* VFWS Report */}
                    {type === 'whole-house' || type === 'wh-and-purifier' ?
                        <>
                            <div className="section-div">
                                <div className="header">
                                    <h5>Vessel Filter - Work Site Report  (VFWS Report)</h5>
                                </div>
                                <div className="forms">
                                    {/* Site */}
                                    <div className="nor-input-div">
                                        <select id="site" name="site" required onChange={handleVFWSReport} >
                                            <option value={''}>{site[0] ? 'Choose...' : 'Loading...'}</option>
                                            {site?.[0] ? <>
                                                {site.map((value) => {
                                                    return <option key={value.id} selected={value.item === data?.vfws_report?.site ? true : false}
                                                        value={value.item}>{value.item}</option>
                                                })}
                                            </> : ''}
                                        </select>
                                        <label htmlFor="site">Site</label>
                                    </div>
                                    {/* Usage */}
                                    <div className="nor-input-div">
                                        <select id="usage" name="usage" required onChange={handleVFWSReport} >
                                            <option value={''}>{usage[0] ? 'Choose...' : 'Loading...'}</option>
                                            {usage?.[0] ? <>
                                                {usage.map((value) => {
                                                    return <option key={value.id} selected={value.item === data?.vfws_report?.usage ? true : false}
                                                        value={value.item}>{value.item}</option>
                                                })}
                                            </> : ''}
                                        </select>
                                        <label htmlFor="usage">Usage</label>
                                    </div>
                                    <div className="nor-input-div">
                                        <input type="number" step="0.1" id='tankCapasity' name='tank_capasity' value={data?.vfws_report?.tank_capasity} required onChange={handleVFWSReport} />
                                        <label htmlFor="tankCapasity">Tank Capasity (L)</label>
                                    </div>
                                    <div className="nor-input-div">
                                        <input type="text" id='motor' name='motor_details' value={data?.vfws_report?.motor_details} required onChange={handleVFWSReport} />
                                        <label htmlFor="motor">Motor Details</label>
                                    </div>
                                    <div className="nor-input-div">
                                        <input type="text" id='floor' name='floor_details' value={data?.vfws_report?.floor_details} required onChange={handleVFWSReport} />
                                        <label htmlFor="floor">Floor Details</label>
                                    </div>
                                    <div className="nor-input-div">
                                        <input type="number" step="0.1" id='floorHeight' name='floor_hight' value={data?.vfws_report?.floor_hight} required onChange={handleVFWSReport} />
                                        <label htmlFor="floorHeight">Floor Height</label>
                                    </div>

                                    {/* Inlet */}
                                    <div className="nor-input-div">
                                        <select id="inlet" name="inlet" required onChange={handleVFWSReport} >
                                            <option value={''}>Choose...</option>
                                            {["0.5", "0.75", "1", "1.25", "1.5", "1.75", "2", "2.25", "2.5", "2.75", "3", "3.25",
                                                "3.5", "3.75", "4", "4.25", "4.5", "4.75", "5", "5.25", "5.5", "5.75", "6"]
                                                .map((optn) => {
                                                    return <option selected={optn === data?.vfws_report?.inlet ? true : false}
                                                        value={optn}>{optn} Inch</option>
                                                })}
                                        </select>
                                        <label htmlFor="inlet">Inlet</label>
                                    </div>
                                    {/* Inlet */}
                                    <div className="nor-input-div">
                                        <select id="outlet" name="outlet" required onChange={handleVFWSReport} >
                                            <option value={''}>Choose...</option>
                                            {["0.5", "0.75", "1", "1.25", "1.5", "1.75", "2", "2.25", "2.5", "2.75", "3", "3.25",
                                                "3.5", "3.75", "4", "4.25", "4.5", "4.75", "5", "5.25", "5.5", "5.75", "6"]
                                                .map((optn) => {
                                                    return <option selected={optn === data?.vfws_report?.outlet ? true : false}
                                                        value={optn}>{optn} Inch</option>
                                                })}
                                        </select>
                                        <label htmlFor="outlet">Outlet</label>
                                    </div>
                                    {/* Bathroom InTop */}
                                    <div className="nor-input-div">
                                        <select id="BRInTop" name="bathroom_in_top" required onChange={handleVFWSReport} >
                                            <option value={''}>Choose...</option>
                                            {[
                                                "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"
                                            ].map((optn) => {
                                                return <option selected={optn === data?.vfws_report?.bathroom_in_top ? true : false}
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