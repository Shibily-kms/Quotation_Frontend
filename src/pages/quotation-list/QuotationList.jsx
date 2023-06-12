import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import Title from '../../components/title/Title';

import { IoTrashOutline } from 'react-icons/io5';
import { FiEdit2, FiDownload } from 'react-icons/fi';
import { userAxios } from '../../config/axios'
import { toast } from 'react-toastify'

function QuatationList() {
    const [data, setData] = useState([])



    useEffect(() => {
        userAxios.get('/quotation').then((response) => {
            setData(response.data.quotations)
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
                            <Title header={'Quotation List'} />
                        </div>
                        <div className="content">

                            <div className="table-div">
                                <table id="list">
                                    {data?.[0] ? <>
                                        <tr>
                                            <th>Sl no</th>
                                            <th>Type</th>
                                            <th>Quotation Id</th>
                                            <th>Control</th>
                                        </tr>
                                        {data.map((value, index) => {
                                            return <tr key={value._id}>
                                                <td>{index + 1}</td>
                                                <td>{value.type}</td>
                                                <td>{value.quotationId}</td>
                                                <td>
                                                    <div>
                                                        <button title='view' className="view" /* onClick={() => handleEdit(value)}*/>
                                                            <FiDownload /></button>
                                                        <button title='edit' className="edit" /* onClick={() => handleEdit(value)}*/>
                                                            <FiEdit2 /></button>
                                                        <button title='remove' className="delete" /*onClick={() => handleDelete(value)}*/>
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

        </div>
    )
}


export default QuatationList