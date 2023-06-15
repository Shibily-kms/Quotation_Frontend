import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import Title from '../../components/title/Title';
import { IoTrashOutline } from 'react-icons/io5';
import { FiDownload } from 'react-icons/fi';
import { BsThreeDots } from 'react-icons/bs';
import { userAxios } from '../../config/axios'
import { saveAs } from 'file-saver';
import { pdf } from '@react-pdf/renderer';
import BuildPdf from '../../components/build-pdf/BuildPdf';

function QuatationList() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState('')

    const downloadPDF = async (data, index) => {

        setLoading(index)

        const pdfDoc = (<BuildPdf data={data} />)
        const pdfBlob = await pdf(pdfDoc).toBlob();
        saveAs(pdfBlob, `${data.quotation_srl_no}.pdf`);

        setLoading('')
    }

    useEffect(() => {
        userAxios.get('/quotation').then((response) => {
            setData(response.data.quotations)
        })
    }, [])

    const handleDelete = (slNo) => {
        let check = window.confirm('Are you delete quotation ?')
        if(check){
            userAxios.delete(`/quotation?slno=${slNo}`).then((response) => {
                if (response) {
                    setData((prev) => {
                        return prev.filter((obj) => obj.quotation_srl_no !== slNo)
                    })
                }
            })
        }
    }


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
                                            <th>Srl No</th>
                                            <th>Control</th>
                                        </tr>
                                        {data.map((value, index) => {
                                            return <tr key={value._id}>
                                                <td>{index + 1}</td>
                                                <td>{value.type}</td>
                                                <td>{value.quotation_srl_no}</td>
                                                <td>
                                                    <div>
                                                        <button title='view' className="view pdf" onClick={() => downloadPDF(value, index)}>
                                                            {loading === index ? <BsThreeDots /> : <FiDownload />}  </button>
                                                        <button title='remove' className="delete" onClick={() => handleDelete(value.quotation_srl_no)}>
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