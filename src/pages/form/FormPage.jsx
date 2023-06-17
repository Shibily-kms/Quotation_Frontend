import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import Title from '../../components/title/Title'
import { useSearchParams, useParams } from 'react-router-dom'
import './formPage.scss'
import { FaCheck } from 'react-icons/fa'
import Form1 from '../../components/forms/Form1'
import Form2 from '../../components/forms/Form2'
import Form3 from '../../components/forms/Form3'
import { useSelector } from 'react-redux'


function FormPage() {
    const { fill } = useSelector((state) => state.inputData)
    const [searchParams] = useSearchParams();
    const [page, setPage] = useState(1)
    // const [fill, setFill] = useState({ one: false, two: false, three: false })
    const { type } = useParams()
    const [line, setLine] = useState('0%')

    useEffect(() => {
        searchParams.set('page', page);
        setLine(100 / 3 * page + "%")
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])
    
    useEffect(() => {
        if (fill?.one && fill?.two) {
            setPage(3)
        } else if (fill?.one) {
            setPage(2)
        } else {
            setPage(1)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])




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
                                    <div className={page === 1 || page === 2 || page === 3 || fill?.one ? "page-number-div fill" : "page-number-div "}
                                        onClick={() => setPage(1)}>
                                        <h5>{fill?.one ? <FaCheck /> : "1"}</h5>
                                    </div>
                                    <div className={page === 2 || page === 3 || fill?.two ? "page-number-div fill" : "page-number-div "}
                                        onClick={() => setPage(2)}>
                                        <h5>{fill?.two ? <FaCheck /> : "2"}</h5>
                                    </div>
                                    <div className={page === 3 || fill?.three ? "page-number-div fill" : "page-number-div "} onClick={() => setPage(3)}>
                                        <h5>{fill?.three ? <FaCheck /> : "3"}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="content">
                                {page === 1 && <Form1 type={type} setPage={setPage} />}
                                {page === 2 && <Form2 type={type} setPage={setPage} />}
                                {page === 3 && <Form3 type={type} setPage={setPage} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default FormPage