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

function QuotationList() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [download, setDownload] = useState('')

    const downloadPDF = async (data, index) => {

        setDownload(index)

        setDownload(index);

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


        setDownload('')
    }

    useEffect(() => {
        setLoading(true)
        userAxios.get('/quotation').then((response) => {
            setData(response.data.quotations)
            setLoading(false)
        })
    }, [])

    const handleDelete = (slNo) => {
        let check = window.confirm('Are you delete quotation ?')
        if (check) {
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
                                                            {download === index ? <BsThreeDots /> : <FiDownload />}  </button>
                                                        <button title='remove' className="delete" onClick={() => handleDelete(value.quotation_srl_no)}>
                                                            <IoTrashOutline /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        })}
                                    </>
                                        : <>
                                            <tr>
                                                <td style={{ textAlign: 'center' }}>{loading ? "Loading..." : 'No data'}</td>
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


export default QuotationList