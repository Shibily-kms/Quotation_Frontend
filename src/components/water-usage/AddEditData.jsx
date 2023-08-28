import React, { useState } from 'react'
import '../test-report-source/addEditData.scss'
import { userAxios } from '../../config/axios';
import { toast } from 'react-hot-toast'
import { BiLoaderAlt } from 'react-icons/bi'

function AddEditData({ setData, setModel, current }) {
    const [value, setValue] = useState(current?.item || null)
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (current) {
            setLoading(true)
            userAxios.put('/water-usage', { _id: current._id, item: value }).then((response) => {
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
                setLoading(false)
            }).catch((error) => {
                toast.error(error.response.data.message)
                setLoading(false)
            })
        } else {
            setLoading(true)
            userAxios.post('/water-usage', { item: value }).then((response) => {
                setData((state) => {
                    return [...state, response.data.data]
                })
                toast.success('Item added')
                setModel(null)
                setLoading(false)
            }).catch((error) => {
                toast.error(error.response.data.message)
                setLoading(false)
            })
        }

    }

    return (
        <div className="add-edit-div">
            <div className="inputs">
                <form onSubmit={handleSubmit}>
                    <div className="input-div">
                        <label htmlFor="input">TITLE</label>
                        <input type="text" name='input' id='input' value={value} required onChange={handleChange} />
                    </div>
                    <div className="button-div">
                        <button type='submit'>{loading ? <span className='loading-icon'><BiLoaderAlt /></span> : "Submit"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddEditData