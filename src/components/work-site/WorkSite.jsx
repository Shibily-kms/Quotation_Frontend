import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import Title from '../title/Title'
import Model from '../model/Model'
import AddEditData from './AddEditData'
import '../test-report-source/testReport.scss';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoTrashOutline } from 'react-icons/io5';
import { FiEdit2 } from 'react-icons/fi';
import { userAxios } from '../../config/axios'
import { toast } from 'react-hot-toast'

function WorkSite() {
    const [model, setModel] = useState(null)
    const [pass, setPass] = useState(null)
    const [data, setData] = useState([])

    const handleAdd = () => {
        setModel('ADD NEW SITE')
        setPass(<AddEditData setData={setData} setModel={setModel} />)
    }

    const handleEdit = (current) => {
        setModel('EDIT SITE')
        setPass(<AddEditData setData={setData} setModel={setModel} current={current} />)
    }

    const handleDelete = (current) => {
        let check = window.confirm('Delete This Item ?')
        if (check) {
            userAxios.delete(`/work-sites?id=${current._id}`).then(() => {
                setData((state) => {
                    return state.filter((obj) => obj._id !== current._id)
                })
            }).catch((error) => {
                toast.error(error.response.data.message)
            })
        }
    }


    useEffect(() => {
        userAxios.get('/work-sites').then((response) => {
            response?.data?.source && setData(response.data.source.data)
        })
    }, [])


    return (
        <div className='workSite'>
            <div>
                <div className="header-div">
                    <Header />
                </div>
                <div className="test-report-div">
                    <div className="container">
                        <div className="title">
                            <Title header={'WORK SITES'} />
                        </div>
                        <div className="content">
                            <div className="top">
                                <button onClick={handleAdd}><AiOutlinePlus /> Add New</button>
                            </div>
                            <div className="table-div">
                                <table id="list">
                                    {data?.[0] ? <>
                                        <tr>
                                            <th>Sl no</th>
                                            <th>Sites</th>
                                            <th>Control</th>
                                        </tr>
                                        {data.map((value, index) => {
                                            return <tr key={value._id}>
                                                <td>{index + 1}</td>
                                                <td>{value.item}</td>
                                                <td>
                                                    <div>
                                                        <button title='edit' className="edit" onClick={() => handleEdit(value)}>
                                                            <FiEdit2 /></button>
                                                        <button title='remove' className="delete" onClick={() => handleDelete(value)}>
                                                            <IoTrashOutline /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        })}
                                    </>
                                        : <>
                                            <tr>
                                                <td style={{ textAlign: 'center' }}>no data</td>
                                            </tr>
                                        </>}
                                </table>
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

export default WorkSite