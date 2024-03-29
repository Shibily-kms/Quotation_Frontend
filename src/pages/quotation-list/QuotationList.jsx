import React, { useEffect, useState } from 'react'
import './quotation-list.scss'
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
import TableFilter from '../../components/table-filter/TableFilter'
import { toast } from 'react-hot-toast'
import { useSelector } from 'react-redux';

function QuotationList() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState('')
    const { user } = useSelector((state) => state.userAuth)
    const navigate = useNavigate()

    const downloadPDF = (id, index) => {

        setLoading(index)
        userAxios.get(`/quotation?id=${id}`).then(async (response) => {
            const data = response.data.data
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
        }).catch((error) => {
            toast.error('Try now !')
            setLoading('')
        })

    }

    useEffect(() => {
        setLoading('getData')
        userAxios.get('/quotation').then((response) => {
            setData(response.data.data)
            setLoading('')
        }).catch((error) => {
            toast.error(error.response.data.message)
        })
    }, [])

    const handleEdit = (id) => {
        if (id) {
            setLoading(id)
            userAxios.get(`/quotation?id=${id}`).then((response) => {
                navigate(`/quotation/${response?.data?.data?.type}`, { state: response?.data?.data })
                setLoading('')
            })
        }
    }



    return (
        <div className='solution-model quotation-list'>
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
                                    <TableFilter srlNo={true}>
                                        <table id="list">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Enquiry Srl No</th>
                                                    <th>Qtn Srl No</th>
                                                    <th>Type</th>
                                                    <th>Control</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.map((value, index) => {
                                                    return <tr key={value._id}>
                                                        <td>{value.customer.name}</td>
                                                        <td>{value.enquiry_srl_no}</td>
                                                        <td>{value.quotation_srl_no}</td>
                                                        <td>{value.type}</td>
                                                        <td>
                                                            <div>
                                                                <button title='Download PDF' className="create pdf" onClick={() => downloadPDF(value._id, index)}>
                                                                    {loading === index ? <span className='loading-icon'><BiLoaderAlt /></span> : <FiDownload />}   </button>
                                                                {user?.designation?.allow_origins?.includes('SalesPro') && <>
                                                                    <button title='Edit' className="edit" onClick={() => handleEdit(value._id)}>
                                                                        {loading === value._id ? <span className='loading-icon'><BiLoaderAlt /></span> : <FiEdit2 />}  </button>
                                                                </>}
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
        </div>
    )
}


export default QuotationList