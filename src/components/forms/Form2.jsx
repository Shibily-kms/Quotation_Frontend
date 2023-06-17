import React, { useEffect, useState } from 'react'
import './form.scss'
import DynamicListTable from '../../components/dynamic-list-table/DynamicListTable'
import { userAxios } from '../../config/axios'
import { toast } from 'react-toastify'
import { form2Validate } from '../../assets/js/validate-function'
import { setQuotationInput, setFill } from '../../redux/features/quotationSlice'
import { useDispatch, useSelector } from 'react-redux'


function Form2({ type, setPage }) {
    const dispatch = useDispatch()
    const { quotation } = useSelector((state) => state.inputData)
    const [preferred, setPreferred] = useState(quotation?.preferred_solution || [])
    const [custPreferred, setCustPreferred] = useState(quotation?.cust_preferred_solution || [])
    const [materials, setMaterials] = useState(quotation?.materials || [])
    const [vfs, setVfs] = useState(quotation?.vfs_component || [])
    const [purifier, setPurifier] = useState(quotation?.purifier_component || [])
    const [solutions, setSolutions] = useState([])
    const [materialsInput, setMaterialsInput] = useState([])
    const [vfsInput, setVfsInput] = useState([])
    const [purifierInput, setPurifierInput] = useState([])

    // Preferred
    useEffect(() => {
        dispatch(setQuotationInput({
            preferred_solution: preferred
        }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [preferred])

    // custPreferred
    useEffect(() => {
        dispatch(setQuotationInput({
            cust_preferred_solution: custPreferred
        }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [custPreferred])

    // materials
    useEffect(() => {
        if (type === 'whole-house' || type === 'wh-and-purifier') {
            dispatch(setQuotationInput({
                materials: materials
            }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [materials])

    // vfs
    useEffect(() => {
        if (type === 'whole-house' || type === 'wh-and-purifier') {
            dispatch(setQuotationInput({
                vfs_component: vfs
            }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vfs])

    // purifier
    useEffect(() => {
        if (type === 'purifier' || type === 'wh-and-purifier') {
            dispatch(setQuotationInput({
                purifier_component: purifier
            }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [purifier])

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response1 = [], response2 = [];
                if (type === 'purifier' || type === 'wh-and-purifier') {
                    response1 = await userAxios.get('/purifier-solution-model');
                    response1 = response1?.data?.items?.data ? response1?.data?.items?.data : []
                }
                if (type === 'whole-house' || type === 'wh-and-purifier') {
                    response2 = await userAxios.get('/wh-solution-model');
                    response2 = response2?.data?.items?.data ? response2?.data?.items?.data : []
                }
                setSolutions([...response1, ...response2]);
                if (type === 'whole-house' || type === 'wh-and-purifier') {
                    const response3 = await userAxios.get('/vfs-materials');
                    setMaterialsInput([...materialsInput, ...response3.data.items.data]);
                }
                if (type === 'whole-house' || type === 'wh-and-purifier') {
                    const response4 = await userAxios.get('/vfs-component');
                    setVfsInput([...vfsInput, ...response4.data.items.data]);
                }
                if (type === 'purifier' || type === 'wh-and-purifier') {
                    const response5 = await userAxios.get('/purifier-component');
                    setPurifierInput(response5.data.items.data);
                }

            } catch (error) {
                // Handle any errors that occur during the API calls
                console.error(error);
            }
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Handles

    const handleWarranty = (e) => {
        dispatch(setFill({ two: false }))
        dispatch(setQuotationInput({
            warranty: {
                ...quotation.warranty,
                [e.target.name]: e.target.value
            }
        }))
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const validate = form2Validate(quotation, type)

        if (validate.status) {
            setPage(3)
            dispatch(setFill({ two: true }))
        } else {
            toast.error(validate.message)
        }
    }


    return (
        <div>
            <div className="form-div">
                <form action="" onSubmit={handleSubmit}>


                    {/* Preferred */}
                    <div className="section-div">
                        <div className="header">
                            <h5>Preferred Solutions</h5>
                        </div>
                        <DynamicListTable data={preferred} setData={setPreferred} input={solutions} multi={false} type={'preferred'} />
                    </div>

                    {/* Customer Selected */}
                    <div className="section-div">
                        <div className="header">
                            <h5>Customer Selected Solutions</h5>
                        </div>
                        <DynamicListTable data={custPreferred} setData={setCustPreferred} input={solutions} multi={false} type={'customer'} />
                    </div>

                    {/* Material for VFS */}
                    {type === 'whole-house' || type === 'wh-and-purifier' ? <>
                        <div className="section-div">
                            <div className="header">
                                <h5>Materials In Vessel Filter</h5>
                            </div>
                            <DynamicListTable data={materials} setData={setMaterials} input={materialsInput} multi={true} />
                        </div>
                    </> : ''}
                    {/* VFS Components*/}
                    {type === 'whole-house' || type === 'wh-and-purifier' ? <>
                        <div className="section-div">
                            <div className="header">
                                <h5>Vessel Filter Components</h5>
                            </div>
                            <DynamicListTable data={vfs} setData={setVfs} input={vfsInput} multi={true} />
                        </div>
                    </> : ''}
                    {/* Purifier Components */}
                    {type === 'purifier' || type === 'wh-and-purifier' ? <>
                        <div className="section-div">
                            <div className="header">
                                <h5>Purifier Components</h5>
                            </div>
                            <DynamicListTable data={purifier} setData={setPurifier} input={purifierInput} multi={true} />
                        </div>
                    </> : ''}

                    {/* Warranty */}
                    <div className="section-div">
                        <div className="header">
                            <h5>Warranty</h5>
                        </div>
                        <div className="forms">
                            {type === 'purifier' || type === 'wh-and-purifier' ? <>
                                <div className="nor-input-div">
                                    <input type="text" id='pws' name='pws' value={quotation?.warranty?.pws} required onChange={handleWarranty} />
                                    <label htmlFor="pws">Purifier System</label>
                                </div>
                            </> : ''}
                            {type === 'whole-house' || type === 'wh-and-purifier' ? <>
                                <div className="nor-input-div">
                                    <input type="text" id='vfws' name='vfws' value={quotation?.warranty?.vfws} required onChange={handleWarranty} />
                                    <label htmlFor="vfws">Vessel Filtration System</label>
                                </div>
                            </> : ''}

                        </div>
                    </div>



                    <div className="button-div">
                        <button type='button' onClick={() => setPage(1)} className='skip'>Previous</button>
                        <button type='button' onClick={() => setPage(3)} className='skip'>Skip</button>
                        <button type='submit' className='next'>Next</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Form2