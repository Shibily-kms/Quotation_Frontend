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
import { toast } from 'react-hot-toast'

function QuotationList() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState('')
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
        }).catch(() => {
            toast.error('Try now !')
            setLoading('')
        })

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

    const handleEdit = (id) => {
        if (id) {
            setLoading(id)
            userAxios.get(`/quotation?id=${id}`).then((response) => {
                navigate(`/quotation/${response?.data?.data?.type}`, { state: response?.data?.data })
                setLoading('')
            })
        }
    }

    const deFilter = (e) => {
        setLoading('filter')
        const regex = new RegExp(e.target.value, 'i');
        // eslint-disable-next-line
        const filteredData = data.map((item) => ({
            ...item,
            hide: !regex.test(item.customer.name) && !regex.test(item.enquiry_srl_no)
                && !regex.test(item.quotation_srl_no) && !regex.test(item.type)
        }))
        setData(filteredData)
        setLoading('')
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
                        {data?.[0] &&
                            <div className="filter-div">
                                <div className="input-div">
                                    <input type="text" name='search' id='search' required onChange={deFilter} />
                                    <label htmlFor="search">Search</label>
                                    <div className="icon loading-icon">{loading === 'filter' && <BiLoaderAlt />}</div>
                                </div>
                            </div>
                        }
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
                                            if (!value?.hide) {
                                                return <tr key={value._id}>
                                                    <td>{index + 1}</td>
                                                    <td>{value.customer.name}</td>
                                                    <td>{value.enquiry_srl_no}</td>
                                                    <td>{value.quotation_srl_no}</td>
                                                    <td>{value.type}</td>
                                                    <td>
                                                        <div>
                                                            <button title='Download PDF' className="create pdf" onClick={() => downloadPDF(value._id, index)}>
                                                                {loading === index ? <span className='loading-icon'><BiLoaderAlt /></span> : <FiDownload />}   </button>
                                                            <button title='Edit' className="edit" onClick={() => handleEdit(value._id)}>
                                                                {loading === value._id ? <span className='loading-icon'><BiLoaderAlt /></span> : <FiEdit2 />}  </button>
                                                            <button title='remove' className="delete" onClick={() => handleDelete(value.quotation_srl_no)}>
                                                                {loading === value.quotation_srl_no ? <span className='loading-icon'><BiLoaderAlt /></span> : <IoTrashOutline />}</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            }
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