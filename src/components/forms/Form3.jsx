import React, { useEffect, useState } from 'react'
import './form.scss';
import DynamicTextList from '../dynamic-text-list/DynamicTextList';
import { userAxios } from '../../config/axios'
import { toast } from 'react-hot-toast'
import SignCanvas from '../signatureCanvas/SignCanvas';
import { form3Validate } from '../../assets/js/validate-function';
import { useNavigate } from 'react-router-dom';
import { setQuotationInput, reset, setFill } from '../../redux/features/quotationSlice'
import { useDispatch, useSelector } from 'react-redux'
import IconWithMessage from '../spinners/SpinWithMessage'

function Form3({ type, setPage }) {
    const dispatch = useDispatch()
    const { quotation, fill } = useSelector((state) => state.inputData)
    const [tac, setTac] = useState(quotation?.tac || [])
    const navigate = useNavigate()
    const [loading, setLoading] = useState('')

    useEffect(() => {
        dispatch(setQuotationInput({
            tac: tac
        }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tac])

    const handleChange = (e) => {
        dispatch(setFill({ three: false }))
        dispatch(setQuotationInput({
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading('Validating...')

        let validate = null
        if (fill.validation) {
            validate = form3Validate(quotation, fill)
        } else {
            validate = { status: true }
        }

        if (validate.status) {
            dispatch(setFill({ three: true }))
            if (quotation?.index) {
                // Update Quotation
                setLoading('Updating...')
                userAxios.put('/quotation', quotation).then((response) => {
                    dispatch(reset())
                    navigate('/quotations-list')
                    toast.success('Quotation updated !')
                    setLoading('')
                }).catch((error) => {
                    if (error?.response) {
                        toast.error(error.response?.data?.message)
                    } else {
                        toast.error('Server Down!!!')
                    }
                    setLoading('')
                })
            } else {
                setLoading('Submiting...')
                // Create Quotation
                userAxios.post('/quotation', quotation).then((response) => {
                    dispatch(reset())
                    navigate('/quotation', { state: response.data.data })
                    setLoading('')
                }).catch((error) => {
                    if (error?.response) {
                        toast.error(error.response?.data?.message)
                    } else {
                        toast.error('Server Down!!!')
                    }
                    setLoading('')
                })
            }

        } else {
            setLoading('')
            toast.error(validate.message)
        }
    }


    return (
        <div>
            <div className="form-div">
                <form action="" onSubmit={handleSubmit}>

                    {/* TAC */}
                    <div className="section-div">
                        <div className="header">
                            <h5>Terms and Conditions</h5>
                        </div>
                        <DynamicTextList data={tac} setData={setTac} />
                        <div className="forms" style={{ marginTop: '15px' }}>
                            {type === 'purifier' || type === 'wh-and-purifier' ?
                                <div className="nor-input-div">
                                    <input type="number" step="0.1" id='purifier_max_usage' name='purifier_max_usage' value={quotation?.purifier_max_usage} required={fill.validation ? true : false} onChange={handleChange} />
                                    <label htmlFor="purifier_max_usage">Purifier Daily Usage (Liters / Day)</label>
                                </div>
                                : ''}
                            {type === 'whole-house' || type === 'wh-and-purifier' ?
                                <div className="nor-input-div">
                                    <input type="number" step="0.1" id='vfs_max_usage' name='vfs_max_usage' value={quotation?.vfs_max_usage} required={fill.validation ? true : false} onChange={handleChange} />
                                    <label htmlFor="vfs_max_usage">VFS Daily Usage (Liters / Day)</label>
                                </div>
                                : ""}
                            <div className="nor-input-div">
                                <input type="date" id='expr_date' name='expr_date' value={quotation?.expr_date} required={fill.validation ? true : false} onChange={handleChange} />
                                <label htmlFor="expr_date">Quotation Expiry Date</label>
                            </div>
                        </div>
                    </div>

                    {/* Sign */}
                    <div className="section-div">
                        <div className="header">
                            <h5>Signature</h5>
                        </div>
                        <div className="forms">
                            <div className="sign-canvas-div">
                                <div className="canvas-div">
                                    <SignCanvas type={'customer'} />
                                </div>
                                <label htmlFor="">Customer Signature</label>
                            </div>
                        </div>
                    </div>


                    <div className="button-div">
                        <button type='button' onClick={() => setPage(2)} className='skip'>Prev</button>
                        {loading ?
                            <button button type='button' className='submit' >{quotation?.index ? 'Updating...' : "Submitting..."}</button>
                            :
                            <button type='submit' className='submit' >{quotation?.index ? 'Update' : "Submit"}</button>
                        }
                    </div>
                </form>
                {loading && 
                <div className="loading-div">
                    <div>
                        <IconWithMessage message={loading}/>
                    </div>
                </div>
                }
            </div >
        </div >
    )
}

export default Form3