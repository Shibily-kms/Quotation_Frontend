import React from 'react'
import { useNavigate } from 'react-router-dom'
import Title from '../title/Title'
import '../first-page/first-page.scss'


function Materials() {
    const navigate = useNavigate()

    return (
        <div className='first-page-user'>
            <div className="container">
                <div className="title">
                    <Title title={'RAW Materials'} />
                </div>
                <div className="bottom">
                    <div className="boader">
                        <div className="button-div">
                            <button onClick={() => navigate('/raw-materials/test-report-source')}>WATER TEST REPORT SOURCE</button>
                        </div>
                        <div className="button-div">
                            <button onClick={() => navigate('/raw-materials/work-site')}>WORK SITE</button>
                        </div>
                        <div className="button-div">
                            <button onClick={() => navigate('/raw-materials/water-usage')}>WATER USAGES</button>
                        </div>
                        <div className="button-div">
                            <button onClick={() => navigate('/raw-materials/installation-mode')}>INSTALLATION MODES</button>
                        </div>
                        <div className="button-div">
                            <button onClick={() => navigate('/raw-materials/solution-models')}>SOLUTION MODELS</button>
                        </div>
                        <div className="button-div">
                            <button onClick={() => navigate('/raw-materials/purifier-components')}>PURIFIER COMPONENTS</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Materials