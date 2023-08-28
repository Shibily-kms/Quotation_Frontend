import React, { useEffect, useState } from 'react'
import Header from '../header/Header'
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
import TableFilter from '../../components/table-filter/TableFilter'

function VfsMaterials
    () {
    const [model, setModel] = useState(null)
    const [pass, setPass] = useState(null)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState('')

    const handleAdd = () => {
        setModel('ADD NEW MATERIAL')
        setPass(<AddEditData setData={setData} setModel={setModel} />)
    }

    const handleEdit = (current) => {
        setModel('EDIT MATERIAL')
        setPass(<AddEditData setData={setData} setModel={setModel} current={current} />)
    }

    const handleDelete = (current) => {
        let check = window.confirm('Delete This Item ?')
        if (check) {
            setLoading(current.brandId)
            userAxios.delete(`/vfs-materials?nameId=${current.nameId}&&brandId=${current.brandId}`).then(() => {
                setData((state) => {
                    return state.filter((obj) => obj.brandId !== current.brandId)
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
        userAxios.get('/vfs-materials').then((response) => {
            response?.data?.data && setData((state) => {
                let arr = []
                response.data.data?.data.forEach((obj) => {
                    obj?.brands.forEach((subObj) => {
                        arr.push({
                            nameId: obj._id, brandId: subObj._id,
                            name: obj.item, brand: subObj.brand,
                        })
                        return
                    })
                })
                return arr;
            })
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
                            <Title header={'VFS MATERIALS'} />
                        </div>
                        <div className="content">
                            <div className="table-div">
                                {data?.[0] ? <>
                                    <TableFilter srlNo={true} topRight={<button className='add-button' onClick={handleAdd}><AiOutlinePlus /> Add New</button>}>
                                        <table id="list">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Brand</th>
                                                    <th>Control</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.map((value, index) => {
                                                    return <tr key={value.brandId}>
                                                        <td>{value.name}</td>
                                                        <td>{value.brand}</td>
                                                        <td>
                                                            <div>
                                                                <button title='edit' className="edit" onClick={() => handleEdit(value)}>
                                                                    <FiEdit2 /></button>
                                                                <button title='remove' className="delete" onClick={() => handleDelete(value)}>
                                                                    {loading === value.brandId ? <span className='loading-icon'><BiLoaderAlt /></span> : <IoTrashOutline />} </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                })}
                                            </tbody>
                                        </table>
                                    </TableFilter>
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


export default VfsMaterials
