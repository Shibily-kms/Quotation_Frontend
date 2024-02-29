import React from 'react'
import './spin-with-message.scss'
import { BiLoaderAlt } from 'react-icons/bi'

function SpinWithMessage({ icon, message = '', spin = true, bottomContent, width, height }) {

    return (
        <div className='spin-with-message' style={{
            width: width || '100%',
            height: height || '80vh'
        }}>
            <div className="spinner-body">
                <div className='t-icon'>
                    <div className={spin ? "load-div spin-div" : "load-div"}>
                        {icon ? icon : <BiLoaderAlt />}
                    </div>
                    {message && <div className="message">
                        <p>{message}</p>
                    </div>
                    }
                </div>
                {bottomContent && <div className="bottom-div">
                    {bottomContent}
                </div>}
            </div>
        </div>
    )
}

export default SpinWithMessage