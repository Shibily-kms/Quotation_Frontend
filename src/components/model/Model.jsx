import React from 'react'
import './model.scss';
import { IoCloseCircleOutline } from 'react-icons/io5';



function Model({ model, setModel, element }) {
    return (
        <div className="model" >
            <div className="boarder">
                <div className="shadow" onClick={() => setModel(null)}></div>
                <div className="box">
                    <div className="header">
                        <div className="title">
                            <h5>{model}</h5>
                        </div>
                        <div className="close-icon" onClick={() => setModel(null)}>
                            <IoCloseCircleOutline />
                        </div>
                    </div>
                    <div className="content">
                        {element}
                        {/* {model === 'ADD NEW DESIGNATION' ? <Add_designation setModel={setModel} /> : ""}
                        {model === 'SELECT DESIGNATION' ? <Select_designation setModel={setModel} /> : ""}
                        {model === 'SELECT DATES' ? <Choose_dates setModel={setModel} /> : ""} */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Model