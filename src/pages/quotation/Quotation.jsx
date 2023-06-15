import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import Title from '../../components/title/Title'
import { useLocation, useNavigate } from 'react-router-dom'
import './quotation.scss'
import { FiCheckCircle } from 'react-icons/fi'
import { saveAs } from 'file-saver';
import { pdf } from '@react-pdf/renderer';
import BuildPdf from '../../components/build-pdf/BuildPdf';

function Quotation() {
    const navigate = useNavigate();
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)
    const location = useLocation()

    useEffect(() => {

        if (location?.state) {
            setData(location.state)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const downloadPDF = async () => {

        setLoading(true)
        if (data.type) {
            const pdfDoc = (<BuildPdf data={data} />)
            const pdfBlob = await pdf(pdfDoc).toBlob();
            saveAs(pdfBlob, `${data.quotation_srl_no}.pdf`);
        } else {
            window.alert('Download failed')
        }

        setLoading(false)
    }

    return (
        <div>
            <div className="header-div">
                <Header />
            </div>
            {data?.type ? <>
                <div className="success-div">
                    <div className="box">
                        <div className="icon-div">
                            <FiCheckCircle />
                        </div>
                        <h2>Success!</h2>
                        <h4>Quotation Submitted.</h4>
                        <div className="button-div">
                            <button onClick={downloadPDF}>{loading ? 'Loading...' : `Download`}</button>
                            <button onClick={()=> navigate('/')}>Home</button>
                        </div>
                    </div>
                </div>
            </> :
                <div className="quotation-div">
                    <div className="container">
                        <div className="title">
                            <Title title={'Quotations'} />
                        </div>
                        <div className="bottom">
                            <div className="boader">
                                <div className="button-div">
                                    <button onClick={() => navigate('/quotation/purifier')}>PURIFIER</button>
                                </div>
                                <div className="button-div">
                                    <button onClick={() => navigate('/quotation/whole-house')}>WHOLE HOUSE FILTER</button>
                                </div>
                                <div className="button-div">
                                    <button onClick={() => navigate('/quotation/wh-and-purifier')}>WH & PURIFIER</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

        </div>
    )
}

export default Quotation