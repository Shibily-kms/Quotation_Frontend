import React, { useState } from 'react'
import '../test-report-source/addEditData.scss'
import { userAxios } from '../../config/axios';
import { toast } from 'react-toastify'

function AddEditData({ setData, setModel, current }) {
    const [value, setValue] = useState(current?.item || null)

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (current) {
            userAxios.put('/work-sites', { _id: current._id, item: value }).then((response) => {
                setData((state) => {
                    return state.map((obj) => {
                        if (obj._id === current._id) {
                            return {
                                _id: current._id,
                                item: value
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
            userAxios.post('/work-sites', { item: value }).then((response) => {
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
                        <label htmlFor="input">SITE NAME</label>
                        <input type="text" name='input' id='input' value={value} required onChange={handleChange} />
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