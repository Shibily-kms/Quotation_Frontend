import React, { useRef, useState } from 'react'
import SignatureCanvas from 'react-signature-canvas';
import { toast } from 'react-toastify'
import './sign-canvas.scss'

function SignCanvas({ data, setData, type }) {
    const signatureRef = useRef(null);
    const [image, setImage] = useState('')

    const handleReset = () => {
        signatureRef.current.clear();
    };

    const handleShow = () => {
        setData((prev) => {
            return {
                ...prev,
                sign: {
                    ...prev?.sign,
                    [type]: null
                }
            }
        })
    }

    const handleSave = () => {
        if (signatureRef.current.isEmpty()) {
            toast.error('Signature is empty')
            return;
        }

        const dataUrl = signatureRef.current.toDataURL(); // Get the image data URL
        setImage(dataUrl)
        setData((prev) => {
            return {
                ...prev,
                sign: {
                    ...prev?.sign,
                    [type]: dataUrl
                }
            }
        })
    };


    return (
        <div className='signCanvas-div'>
            {!data?.sign?.[type] && <p>Sign here</p>}
            {!data?.sign?.[type] && <SignatureCanvas ref={signatureRef} canvasProps={{ className: 'signCanvas' }} />}
            {data?.sign?.[type] && <img src={data?.sign?.[type] || image} />}
            <div className="buttons">
                <button type='button' onClick={data?.sign?.[type] ? handleShow : handleReset}>Retry</button>
                <button type='button' onClick={handleSave}>{data?.sign?.[type] ? 'Saved' : 'Save'}</button>
            </div>
        </div>

    )
}

export default SignCanvas