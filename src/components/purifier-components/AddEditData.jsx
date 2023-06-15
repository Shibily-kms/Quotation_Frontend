import React, { useState } from 'react'
import '../test-report-source/addEditData.scss'
import { userAxios } from '../../config/axios';
import { toast } from 'react-toastify'

function AddEditData({ setData, setModel, current }) {
    const [value, setValue] = useState({ name: current?.name || null, brand: current?.brand || null })

    const handleChange = (e) => {
        if (!(current && e.target.name === 'name')) {
            setValue({
                ...value,
                [e.target.name]: e.target.value
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (current) {
            userAxios.put('/purifier-component', { nameId: current.nameId, brandId: current.brandId, ...value }).then((response) => {
                setData((state) => {
                    return state.map((obj) => {
                        if (obj.brandId === current.brandId) {
                            return {
                                nameId: current.nameId, brandId: current.brandId,
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
            userAxios.post('/purifier-component', value).then((response) => {
                setData((state) => {
                    let obj = {
                        nameId: response.data.newValue._id,
                        name: response.data.newValue.item,
                        brandId: response.data.newValue.brands[0]._id,
                        brand: response.data.newValue.brands[0].brand
                    }
                    return [...state, obj]
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
                        <label htmlFor="name">NAME</label>
                        <input type="text" name='name' id='name' className={current ? 'readonly' : ''} value={value?.name} required onChange={handleChange} />
                    </div>
                    <div className="input-div">
                        <label htmlFor="brand">BRAND</label>
                        <input type="text" name='brand' id='brand' value={value?.brand} required onChange={handleChange} />
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