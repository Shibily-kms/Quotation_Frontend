import React, { useState } from 'react'
import '../test-report-source/addEditData.scss'
import { userAxios } from '../../config/axios';
import { toast } from 'react-hot-toast'
import { BiLoaderAlt } from 'react-icons/bi'

function AddEditData({ setData, setModel, current }) {
    const [value, setValue] = useState({ name: current?.name || null, brand: current?.brand || null })
    const [loading, setLoading] = useState(false)

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
            setLoading(true)
            userAxios.put('/vfs-materials', { nameId: current.nameId, brandId: current.brandId, ...value }).then((response) => {
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
                setLoading(false)
            }).catch((error) => {
                toast.error(error.response.data.message)
                setLoading(false)
            })
        } else {
            setLoading(true)
            userAxios.post('/vfs-materials', value).then((response) => {
                setData((state) => {
                    let obj = {
                        nameId: response.data.data._id,
                        name: response.data.data.item,
                        brandId: response.data.data.brands[0]._id,
                        brand: response.data.data.brands[0].brand
                    }
                    return [...state, obj]
                })
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
                        <label htmlFor="name">NAME</label>
                        <input type="text" name='name' id='name' className={current ? 'readonly' : ''} value={value?.name} required onChange={handleChange} />
                    </div>
                    <div className="input-div">
                        <label htmlFor="brand">BRAND</label>
                        <input type="text" name='brand' id='brand' value={value?.brand} required onChange={handleChange} />
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