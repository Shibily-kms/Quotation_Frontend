import React, { useEffect, useState } from 'react'
import './form.scss'
import { YYYYMMDDFormat } from '../../assets/js/help-functions'
import DynamicListTable from '../../components/dynamic-list-table/DynamicListTable'
import { userAxios } from '../../config/axios'
import { toast } from 'react-toastify'
import { form2Validate } from '../../assets/js/validate-function'


function Form2({ type, data, setData, setPage, setFill }) {
    const [preferred, setPreferred] = useState(data?.preferred || [])
    const [custPreferred, setCustPreferred] = useState(data?.custPreferred || [])
    const [materials, setMaterials] = useState(data?.materials || [])
    const [vfc, setVfc] = useState(data?.vfcComponent || [])
    const [purifier, setPurifier] = useState(data?.purifierComponent || [])
    const [solutions, setSolutions] = useState([])
    const [materialsInput, setMaterialsInput] = useState([])
    const [vfcInput, setVfcInput] = useState([])
    const [purifierInput, setPurifierInput] = useState([])

    // Preferred
    useEffect(() => {
        setData({
            ...data,
            preferred: preferred
        })
    }, [preferred])

    // custPreferred
    useEffect(() => {
        setData({
            ...data,
            custPreferred: custPreferred
        })
    }, [custPreferred])

    // materials
    useEffect(() => {
        if (type === 'whole-house' || type === 'wh-and-perifier') {
            setData({
                ...data,
                materials: materials
            })
        }
    }, [materials])

    // vfc
    useEffect(() => {
        if (type === 'whole-house' || type === 'wh-and-perifier') {
            setData({
                ...data,
                vfcComponent: vfc
            })
        }
    }, [vfc])

    // purifier
    useEffect(() => {
        if (type === 'purifier' || type === 'wh-and-perifier') {
            setData({
                ...data,
                purifierComponent: purifier
            })
        }
    }, [purifier])

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (type === 'purifier' || type === 'wh-and-perifier') {
                    const response1 = await userAxios.get('/purifier-solution-model');
                    setSolutions([...solutions, ...response1.data.items.data]);
                }
                // if (type === 'whole-house' || type === 'wh-and-perifier') {
                //     const response1 = await userAxios.get('/solution-model');
                //     setSolutions([...solutions, response1.data.items.data]);
                // }
                // if (type === 'whole-house' || type === 'wh-and-perifier') {
                //     const response1 = await userAxios.get('/materials-for-wh');
                //     setMaterialsInput([...materialsInput, response1.data.items.data]);
                // }
                // if (type === 'whole-house' || type === 'wh-and-perifier') {
                //     const response1 = await userAxios.get('/vfs-components');
                //     setVfcInput([...vfcInput, response1.data.items.data]);
                // }
                if (type === 'purifier' || type === 'wh-and-perifier') {
                    const response5 = await userAxios.get('/purifier-component');
                    setPurifierInput(response5.data.items.data);
                }

            } catch (error) {
                // Handle any errors that occur during the API calls
                console.error(error);
            }
        };

        fetchData();
    }, [])

    // Handles

    const handleWarranty = (e) => {
        setData({
            ...data,
            warranty: {
                ...data.warranty,
                [e.target.name]: e.target.value
            }
        })
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const validate = form2Validate(data, type)

        if (validate.status) {
            setPage(3)
            setFill((state) => {
                return { ...state, two: true }
            })
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
                        <DynamicListTable data={preferred} setData={setPreferred} input={solutions} multi={false} />
                    </div>

                    {/* Customer Selected */}
                    <div className="section-div">
                        <div className="header">
                            <h5>Customer Selected Solutions</h5>
                        </div>
                        <DynamicListTable data={custPreferred} setData={setCustPreferred} input={solutions} multi={false} />
                    </div>

                    {/* Material for VFS */}
                    {type === 'whole-house' || type === 'wh-and-perifier' ? <>
                        <div className="section-div">
                            <div className="header">
                                <h5>Materials In Vessel Filter</h5>
                            </div>
                            <DynamicListTable data={materials} setData={setMaterials} input={materialsInput} multi={true} />
                        </div>
                    </> : ''}
                    {/* VFS Components*/}
                    {type === 'whole-house' || type === 'wh-and-perifier' ? <>
                        <div className="section-div">
                            <div className="header">
                                <h5>Vessel Filter Components</h5>
                            </div>
                            <DynamicListTable data={vfc} setData={setVfc} input={vfcInput} multi={true} />
                        </div>
                    </> : ''}
                    {/* Purifier Components */}
                    {type === 'purifier' || type === 'wh-and-perifier' ? <>
                        <div className="section-div">
                            <div className="header">
                                <h5>Purifier Components</h5>
                            </div>
                            <DynamicListTable data={purifier} setData={setPurifier} input={purifierInput} multi={true} />
                        </div>
                    </> : ''}

                    {/* Quotation To */}
                    <div className="section-div">
                        <div className="header">
                            <h5>Warranty</h5>
                        </div>
                        <div className="forms">
                            {type === 'purifier' || type === 'wh-and-perifier' ? <>
                                <div className="nor-input-div">
                                    <input type="text" id='pws' name='pws' value={data?.warranty?.pws} required onChange={handleWarranty} />
                                    <label htmlFor="pws">Purifier System</label>
                                </div>
                            </> : ''}
                            {type === 'whole-house' || type === 'wh-and-perifier' ? <>
                                <div className="nor-input-div">
                                    <input type="text" id='vfws' name='vfws' value={data?.warranty?.vfws} required onChange={handleWarranty} />
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