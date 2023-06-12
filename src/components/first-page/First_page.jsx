import React from 'react'
import './first-page.scss'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Title from '../title/Title'

function First_page() {
    const { user } = useSelector((state) => state.userAuth)
    const navigate = useNavigate()




    return (
        <div className='first-page-user'>
            <div className="container">
                <div className="title">
                    <Title designation={`Designation : ${user?.designation?.designation}`}
                        username={`User name : ${user?.user_name}`} />
                </div>

                <div className="bottom">
                    <div className="boader">
                        <div className="button-div">
                            <button onClick={() => navigate('/quotation')}>BUILD QUOTATION</button>
                        </div>
                        <div className="button-div">
                            <button onClick={() => navigate('/raw-materials')}>ENTER RAW MATERIALS</button>
                        </div>
                        <div className="button-div">
                            <button onClick={() => navigate('/quotations-list')}>ALL QUOTATIONS</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default First_page