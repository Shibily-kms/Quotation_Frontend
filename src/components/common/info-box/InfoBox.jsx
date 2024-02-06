import React from 'react'
import './info-box.scss'
import { FaRegDotCircle, FaCheckCircle, FaInfoCircle } from "react-icons/fa";
import { IoIosWarning, IoIosCloseCircle } from "react-icons/io";


const InfoBox = ({ type = 'info', title, description }) => {
    return (
        <div className={`info-box-div ${type}`}>
            <div className="left-div">
                {type === 'error' && <IoIosCloseCircle />}
                {type === 'warning' && <IoIosWarning />}
                {type === 'info' && < FaInfoCircle />}
                {type === 'success' && <FaCheckCircle />}
            </div>
            <div className="center-div">
                {title && <h5>{title}</h5>}
                {description && <p>{description}</p>}
            </div>
            {/* <div className="right-div">
                <FaRegDotCircle />
            </div> */}
        </div>
    )
}

export default InfoBox