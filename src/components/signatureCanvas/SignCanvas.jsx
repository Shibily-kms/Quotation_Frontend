import React, { useRef, useState } from 'react'
import SignatureCanvas from 'react-signature-canvas';
import { toast } from 'react-toastify'
import './sign-canvas.scss'
import { setQuotationInput } from '../../redux/features/quotationSlice'
import { useDispatch, useSelector } from 'react-redux'

function SignCanvas({ type }) {
    const dispatch = useDispatch()
    const { quotation } = useSelector((state) => state.inputData)
    const signatureRef = useRef(null);
    const [image, setImage] = useState('')

    const handleReset = () => {
        signatureRef.current.clear();
    };

    const handleShow = () => {
        dispatch(setQuotationInput({
            sign: {
                ...quotation?.sign,
                [type]: { url: null }
            }
        }))
    }

    const handleSave = () => {
        if (signatureRef.current.isEmpty()) {
            toast.error('Signature is empty')
            return;
        }

        const dataUrl = signatureRef.current.toDataURL(); // Get the image data URL
        setImage(dataUrl)
        dispatch(setQuotationInput({
            sign: {
                ...quotation?.sign,
                [type]: { url: dataUrl }
            }
        }))
    };


    return (
        <div className='signCanvas-div'>
            {!quotation?.sign?.[type]?.url && <p>Sign here</p>}
            {!quotation?.sign?.[type]?.url && <SignatureCanvas ref={signatureRef} canvasProps={{ className: 'signCanvas' }} />}
            {quotation?.sign?.[type]?.url && <img alt='signature' src={quotation?.sign?.[type]?.url || image} />}
            <div className="buttons">
                <button type='button' onClick={quotation?.sign?.[type]?.url ? handleShow : handleReset}>Retry</button>
                <button type='button' onClick={handleSave}>{quotation?.sign?.[type]?.url ? 'Saved' : 'Save'}</button>
            </div>
        </div>

    )
}

export default SignCanvas