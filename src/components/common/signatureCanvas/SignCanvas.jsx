import React, { useRef, useState } from 'react'
import SignatureCanvas from 'react-signature-canvas';
import { toast } from 'react-hot-toast'
import './sign-canvas.scss'

function SignCanvas({ signImg, saveSign, resetSign, isRequired }) {

    const signatureRef = useRef(null);
    const [image, setImage] = useState('')

    const handleReset = () => {
        signatureRef.current.clear();
    };

    const handleSave = () => {
        if (signatureRef?.current?.isEmpty()) {
            toast.error('Signature is empty')
            return;
        }

        const dataUrl = signatureRef.current.toDataURL(); // Get the image data URL
        setImage(dataUrl)
        saveSign(dataUrl)
    };


    return (
        <div className='signCanvas-div'>
            {!signImg && <p>Sign here</p>}
            {!signImg && <SignatureCanvas ref={signatureRef} canvasProps={{ className: 'signCanvas' }} />}
            {signImg && <img alt='signature' src={signImg || image} />}
            <div className="buttons">
                <button type='button' onClick={signImg ? resetSign : handleReset}>Retry</button>
                <button type='button' onClick={handleSave}>{signImg ? 'Saved' : 'Save'}</button>
            </div>
        </div>

    )
}

export default SignCanvas