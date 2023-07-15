import React, { useState } from 'react'
import '../test-report-source/addEditData.scss'
import { userAxios } from '../../config/axios';
import { toast } from 'react-hot-toast'

function AddEditData({ setData, setModel, current }) {
    const [value, setValue] = useState({ item: current?.item || null, price: current?.price || null })

    const handleChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (current) {
            userAxios.put('/purifier-solution-model', { _id: current._id, ...value }).then((response) => {
                setData((state) => {
                    return state.map((obj) => {
                        if (obj._id === current._id) {
                            return {
                                _id: current._id,
                                ...value
                            }
                        }
                        return obj
                    })
                })
                setModel(null)
            }).catch((error) => {
                toast.error(error.response.data.message)
            })
        } else {
            userAxios.post('/purifier-solution-model', value).then((response) => {
                setData((state) => {
                    return [...state, response.data.newValue]
                })
                setModel(null)
            }).catch((error) => {
                toast.error(error.response.data.message)
            })
        }

    }

    return (
        <div className="add-edit-div">
            <div className="inputs">
                <form onSubmit={handleSubmit}>
                    <div className="input-div">
                        <label htmlFor="input">TITLE</label>
                        <input type="text" name='item' id='input' value={value?.item} required onChange={handleChange} />
                    </div>
                    <div className="input-div">
                        <label htmlFor="price">PRICE</label>
                        <input type="number" step="0.1" name='price' id='price' value={value?.price} required onChange={handleChange} />
                    </div>
                    <div className="button-div">
                        <button type='submit'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddEditData