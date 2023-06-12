import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import Title from '../../components/title/Title'
import { useSearchParams, useParams } from 'react-router-dom'
import './formPage.scss'
import { FaCheck } from 'react-icons/fa'
import Form1 from '../../components/forms/Form1'
import Form2 from '../../components/forms/Form2'
import Form3 from '../../components/forms/Form3'

function FormPage() {
    const [searchParams] = useSearchParams();
    const [page, setPage] = useState(1)
    const [fill, setFill] = useState({ one: false, two: false, three: false })
    const { type } = useParams()
    const [data, setData] = useState({})
    const [line, setLine] = useState('0%')

    useEffect(() => {
        searchParams.set('page', page);
        setLine(100 / 3 * page + "%")
    }, [page])


    return (
        <div>
            <div className="header-div">
                <Header />
            </div>

            <div className="formPage-div">
                <div className="container">
                    <div className="title">
                        <Title title={`${type} Form`} />
                    </div>
                    <div className="bottom">
                        <div className="boader">
                            <div className="top">
                                <div className='page-number-main-div'>
                                    <div className="line" ><div style={{ width: line }}></div ></div>
                                    <div className={page === 1 || page === 2 || page === 3 || fill.one ? "page-number-div fill" : "page-number-div "}
                                        onClick={() => setPage(1)}>
                                        <h5>{fill.one ? <FaCheck /> : "1"}</h5>
                                    </div>
                                    <div className={page === 2 || page === 3 || fill.two ? "page-number-div fill" : "page-number-div "}
                                        onClick={() => setPage(2)}>
                                        <h5>{fill.two ? <FaCheck /> : "2"}</h5>
                                    </div>
                                    <div className={page === 3 || fill.three ? "page-number-div fill" : "page-number-div "} onClick={() => setPage(3)}>
                                        <h5>{fill.three ? <FaCheck /> : "3"}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="content">
                                {page === 1 && <Form1 type={type} data={data} setData={setData}
                                    setPage={setPage} setFill={setFill} />}
                                {page === 2 && <Form2 type={type} data={data} setData={setData}
                                    setPage={setPage} setFill={setFill} />}
                                {page === 3 && <Form3 type={type} data={data} setData={setData}
                                    setPage={setPage} fill={fill} setFill={setFill} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default FormPage