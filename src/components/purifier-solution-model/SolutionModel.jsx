import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import Title from '../title/Title'
import Model from '../model/Model'
import AddEditData from './AddEditData'
import '../test-report-source/testReport.scss';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoTrashOutline, IoTrashBin } from 'react-icons/io5';
import { FiEdit2 } from 'react-icons/fi';
import { BiLoaderAlt } from 'react-icons/bi'
import { userAxios } from '../../config/axios'
import { toast } from 'react-hot-toast'
import IconWithMessage from '../spinners/SpinWithMessage'

function SolutionModel() {
    const [model, setModel] = useState(null)
    const [pass, setPass] = useState(null)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState('')

    const handleAdd = () => {
        setModel('ADD NEW MODEL')
        setPass(<AddEditData setData={setData} setModel={setModel} />)
    }

    const handleEdit = (current) => {
        setModel('EDIT MODEL')
        setPass(<AddEditData setData={setData} setModel={setModel} current={current} />)
    }

    const handleDelete = (current) => {
        let check = window.confirm('Delete This Item ?')
        if (check) {
            setLoading(current._id)
            userAxios.delete(`/purifier-solution-model?id=${current._id}`).then(() => {
                setData((state) => {
                    return state.filter((obj) => obj._id !== current._id)
                })
                setLoading('')
            }).catch((error) => {
                toast.error(error.response.data.message)
                setLoading('')
            })
        }
    }


    useEffect(() => {
        setLoading('getData')
        userAxios.get('/purifier-solution-model').then((response) => {
            response?.data?.data && setData(response.data.data.data)
            setLoading('')
        })
    }, [])


    return (
        <div className='solution-model'>
            <div>
                <div className="header-div">
                    <Header />
                </div>
                <div className="test-report-div">
                    <div className="container">
                        <div className="title">
                            <Title header={'PURIFIER SOLUTION MODELS'} />
                        </div>
                        <div className="content">
                            <div className="top">
                                <button onClick={handleAdd}><AiOutlinePlus /> Add New</button>
                            </div>
                            <div className="table-div">
                                    {data?.[0] ? <>
                                <table id="list">
                                        <tr>
                                            <th>Sl no</th>
                                            <th>Model</th>
                                            <th>Price</th>
                                            <th>Control</th>
                                        </tr>
                                        {data.map((value, index) => {
                                            return <tr key={value._id}>
                                                <td>{index + 1}</td>
                                                <td>{value.item}</td>
                                                <td>{value.price}</td>
                                                <td>
                                                    <div>
                                                        <button title='edit' className="edit" onClick={() => handleEdit(value)}>
                                                            <FiEdit2 /></button>
                                                        <button title='remove' className="delete" onClick={() => handleDelete(value)}>
                                                        {loading === value._id ? <span className='loading-icon'><BiLoaderAlt /></span> : <IoTrashOutline />} </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        })}
                                </table>
                                    </>
                                        : <>
                                              <div className='no-data'>
                                            <IconWithMessage icon={loading !== 'getData' && <IoTrashBin />}
                                                message={loading === 'getData' ? 'Loading...' : 'No Data'}
                                                spin={loading === 'getData' ? true : false} />
                                        </div>
                                        </>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="popup">
                {model && <Model model={model} setModel={setModel} element={pass} />}
            </div>
        </div>
    )
}

export default SolutionModel