import React from 'react'
import './modal.scss'
import { AiOutlineClose } from 'react-icons/ai'

function Modal({ modal = { content: null, title: null, status: false, width: '350px' }, setModal }) {
    return (
        <>
            {modal?.status &&
                <div div className='modal-div' >
                    <div className="modal-boarder">
                        <div className="modal-shadow-div" onClick={() => setModal({ ...modal, status: false })}></div>
                        <div className="modal-content" style={{ width: modal?.width ? modal.width : '350px' }}>
                            <div className="modal-top">
                                <div className="left">
                                    <h4>{modal.title}</h4>
                                </div>
                                <div className="right" onClick={() => setModal({ status: false })}>
                                    <span className='close-icon'><AiOutlineClose /></span>
                                </div>
                            </div>
                            <div className="model-center">
                                {modal.content}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Modal