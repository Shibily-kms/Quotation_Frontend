import React from 'react'
import Header from '../../components/header/Header'
import Title from '../../components/title/Title'
import { useNavigate } from 'react-router-dom'
import './quotation.scss'

function Quotation() {
    const navigate = useNavigate();

    return (
        <div>
            <div className="header-div">
                <Header />
            </div>

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
        </div>
    )
}

export default Quotation