import React from 'react'
import Header from '../../components/header/Header'
import { useNavigate } from 'react-router-dom'
import Title from '../../components/title/Title'
import './materials.scss'

function Materials() {
  const navigate = useNavigate()
  return (
    <div>
      <div className="header-div">
        <Header />
      </div>

      <div className="materials-div">
        <div className="container">
          <div className="title">
            <Title title={'RAW Materials'} />
          </div>
          <div className="bottom">

            <div className="section" style={{ marginTop: '20px' }}>
              <div className="title sub" >
                <Title title={'Common'} />
              </div>
              <div className="boarder">
                <div className="button-div">
                  <button onClick={() => navigate('/raw-materials/test-report-source')}>TEST REPORT SOURCE</button>
                </div>
                <div className="button-div">
                  <button onClick={() => navigate('/raw-materials/work-site')}>WORK SITE</button>
                </div>
                <div className="button-div">
                  <button onClick={() => navigate('/raw-materials/water-usage')}>WATER USAGES</button>
                </div>

              </div>
            </div>

            <div className="section" style={{ marginTop: '20px' }}>
              <div className="title sub" >
                <Title title={'Purifier'} />
              </div>
              <div className="boarder">

                <div className="button-div">
                  <button onClick={() => navigate('/raw-materials/installation-mode')}>INSTALLATION MODES</button>
                </div>
                <div className="button-div">
                  <button onClick={() => navigate('/raw-materials/purifier-solution-models')}>SOLUTION MODELS</button>
                </div>
                <div className="button-div">
                  <button onClick={() => navigate('/raw-materials/purifier-components')}>PURIFIER COMPONENTS</button>
                </div>

              </div>
            </div>

            <div className="section" style={{ marginTop: '20px' }}>
              <div className="title sub" >
                <Title title={'Whole House'} />
              </div>
              <div className="boarder">

                <div className="button-div">
                  <button onClick={() => navigate('/raw-materials/wh-solution-models')}>SOLUTION MODELS</button>
                </div>
                <div className="button-div">
                  <button onClick={() => navigate('/raw-materials/vfs-materials')}>VFS MATERIALS</button>
                </div>
                <div className="button-div">
                  <button onClick={() => navigate('/raw-materials/vfs-components')}>VFS COMPONENTS</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Materials