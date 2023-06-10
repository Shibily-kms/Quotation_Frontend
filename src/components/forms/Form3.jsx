import React, { useEffect, useState } from 'react'
import './form.scss';
import DynamicTextList from '../dynamic-text-list/DynamicTextList';
import { userAxios } from '../../config/axios'
import { toast } from 'react-toastify'
import SignCanvas from '../signatureCanvas/SignCanvas';
import { form3Validate } from '../../assets/js/validate-function';

function Form3({ type, data, setData, setPage, fill, setFill }) {
    const [tac, setTac] = useState(data?.tac || [])

    useEffect(() => {
        setData({
            ...data,
            tac: tac
        })
    }, [tac])

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const validate = form3Validate(data, fill)

        if (validate.status) {
            setFill((state) => {
                return { ...state, three: true }
            })
            userAxios.post('/quotation', data).then((response) => {
                toast.info('Submited')
            }).catch((error) => {
                toast.error(error.response.data.message)
            })

        } else {
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
                            <div className="nor-input-div">
                                <input type="number" step="0.1" id='dailyUsageLitter' name='dailyUsageLitter' value={data?.dailyUsageLitter} required onChange={handleChange} />
                                <label htmlFor="dailyUsageLitter">Daily Usage (Liters / Day)</label>
                            </div>
                            <div className="nor-input-div">
                                <input type="date" id='exDate' name='exprDate' value={data?.exprDate} required onChange={handleChange} />
                                <label htmlFor="exDate">Quatation Expiry Date</label>
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
                                    <SignCanvas data={data} setData={setData} type={'customer'} />
                                </div>
                                <label htmlFor="">Customer Signature</label>
                            </div>
                            <div className="sign-canvas-div">
                                <div className="canvas-div">
                                    <SignCanvas data={data} setData={setData} type={'authorized'} />
                                </div>
                                <label htmlFor="">Authorized Signature</label>
                            </div>
                        </div>
                    </div>


                    <div className="button-div">
                        <button type='button' onClick={() => setPage(2)} className='skip'>Previous</button>
                        <button type='submit' className='submit' >Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Form3