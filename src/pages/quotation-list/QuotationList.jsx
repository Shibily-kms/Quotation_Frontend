import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import Title from '../../components/title/Title';
import { IoTrashOutline, IoTrashBin } from 'react-icons/io5';
import { FiDownload, FiEdit2 } from 'react-icons/fi';
import { BiLoaderAlt } from 'react-icons/bi';
import { userAxios } from '../../config/axios'
// eslint-disable-next-line
import { saveAs } from 'file-saver';
import { pdf } from '@react-pdf/renderer';
import BuildPdf from '../../components/build-pdf/BuildPdf';
import { useNavigate } from 'react-router-dom'
import IconWithMessage from '../../components/spinners/SpinWithMessage'

function QuotationList() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState('')
    const navigate = useNavigate()

    const downloadPDF = async (data, index) => {

        setLoading(index)

        const pdfDoc = (<BuildPdf data={data} />);
        const pdfBlob = await pdf(pdfDoc).toBlob();

        // Create a temporary URL for the PDF blob
        const pdfUrl = URL.createObjectURL(pdfBlob);

        // Create an anchor element
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';

        // Trigger the download programmatically
        if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
            // For iPhone/iPad devices, use the 'click' event instead of 'download'
            const clickEvent = new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: false
            });
            link.dispatchEvent(clickEvent);
            // } else if (navigator.userAgent.match(/Android/i)) {
            //     // For Android devices, use the 'navigator.share()' API to trigger download
            //     if (navigator.share) {
            //         try {
            //             await navigator.share({
            //                 title: 'Download PDF',
            //                 url: pdfUrl
            //             });
            //         } catch (error) {
            //             // Handle any error that may occur during sharing
            //             console.error('Sharing failed:', error);
            //             // Fallback for older Android versions without share() support
            //             window.open(pdfUrl, '_blank');
            //         }
            //     } else {
            //         // Fallback for older Android versions without share() support
            //         window.open(pdfUrl, '_blank');
            //     }
        } else {
            // For other devices, set the 'download' attribute and click the link
            link.download = `${data.quotation_srl_no}.pdf`;
            link.click();
        }


        setLoading('')
    }

    useEffect(() => {
        setLoading('getData')
        userAxios.get('/quotation').then((response) => {
            setData(response.data.data)
            setLoading('')
        })
    }, [])

    const handleDelete = (slNo) => {
        let check = window.confirm('Are you delete quotation ?')
        if (check) {
            setLoading(slNo)
            userAxios.delete(`/quotation?slno=${slNo}`).then((response) => {
                if (response) {
                    setData((prev) => {
                        return prev.filter((obj) => obj.quotation_srl_no !== slNo)
                    })
                    setLoading('')
                }
            })
        }
    }

    const handleEdit = (formData) => {
        if (formData.type) {
            navigate(`/quotation/${formData.type}`, { state: formData })
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
                                {data?.[0] ? <>
                                    <table id="list">
                                        <tr>
                                            <th>Idx No</th>
                                            <th>Name</th>
                                            <th>Enquiry Srl No</th>
                                            <th>Qtn Srl No</th>
                                            <th>Type</th>
                                            <th>Control</th>
                                        </tr>
                                        {data.map((value, index) => {
                                            return <tr key={value._id}>
                                                <td>{index + 1}</td>
                                                <td>{value.customer.name}</td>
                                                <td>{value.enquiry_srl_no}</td>
                                                <td>{value.quotation_srl_no}</td>
                                                <td>{value.type}</td>
                                                <td>
                                                    <div>
                                                        <button title='Download PDF' className="create pdf" onClick={() => downloadPDF(value, index)}>
                                                            {loading === index ? <span className='loading-icon'><BiLoaderAlt /></span> : <FiDownload />}   </button>
                                                        <button title='Edit' className="edit" onClick={() => handleEdit(value)}>
                                                            <FiEdit2 />  </button>
                                                        <button title='remove' className="delete" onClick={() => handleDelete(value.quotation_srl_no)}>
                                                            {loading === value.quotation_srl_no ? <span className='loading-icon'><BiLoaderAlt /></span> : <IoTrashOutline />}</button>
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
        </div>
    )
}


export default QuotationList