import React from 'react'
import Header from '../../components/header/Header'
import MaterialsComp from '../../components/materials/Materials'

function Materials() {
  return (
    <div>
      <div className="header-div">
        <Header />
      </div>

      <div className="first-page-div">
        <MaterialsComp />
      </div>
    </div>
  )
}

export default Materials