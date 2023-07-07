import React, { useEffect, useState } from 'react'
import './dynamic-list-table.scss'
import { createRandomId } from '../../assets/js/help-functions'
import { BsTrash3 } from 'react-icons/bs'
import { toast } from 'react-toastify'

function DynamicListTable({ data, setData, total, setTotal, input, multi, type }) {
    const [inputs, setInputs] = useState([])
    const [choose, setChoose] = useState({})
    const [brandInput, setBrandInput] = useState([])

    useEffect(() => {
        let markInput = input.map((one) => {
            const matching = data.find((element) => element.item === one.item)
            if (matching) {
                return { ...one, use: true }
            }
            return one
        })
        setInputs(markInput)

    }, [input, data])

    const handleChange = (e) => {

        let chooses = null

        if (e.target.name === 'item') {
            chooses = inputs.filter((obj) => obj.item === e.target.value)
            multi && setBrandInput(chooses[0].brands)
        }

        if (multi) {
            setChoose({ ...choose, [e.target.name]: e.target.value })
        } else {
            setChoose({
                item: e.target.value,
                price: chooses[0].price
            })
        }
    }


    const handleSubmit = () => {

        if (choose?.item) {
            if (multi && !choose?.brand) {
                toast.error('Must choose a brand')
                return;
            }
            setData([...data, { id: createRandomId(4), ...choose }])
            setInputs((prev) => prev.map((obj) => {
                if (obj.item === choose.item) {
                    return { ...obj, use: true }
                }
                return obj
            }))
            setChoose({})
            setBrandInput([])
            if (choose?.price) {
                setTotal(total + choose?.price)
            }
        }
    }

    const removeList = (item) => {
        setData((state) => state.filter((value) => {
            if (value.item === item) {
                if (value?.price) {
                    setTotal(state.length > 1 ? total - value?.price : 0)
                }
                return false
            }
            return true
        }))
        setInputs((prev) => prev.map((obj) => {

            if (obj.item === item) {
                return { ...obj, use: false }
            }
            return obj;
        }))

    }

    const handleChangeTotal = (e) => {
        setTotal(Number(e.target.value))
    }

    return (
        <div className='dynamic-table'>
            <div className="dynamic-form-div">
                <form action="">
                    <div className="nor-input-div">
                        <select id={`item${inputs?.[0]?.item + type}`} name="item" required onChange={handleChange} >
                            <option value={''}>{inputs?.[0] ? 'Choose...' : 'Loading...'}</option>
                            {inputs?.[0] ? <>
                                {inputs.map((value) => {
                                    if (!value?.use && value?.brands?.length > 0) {
                                        return <option key={value.item} value={value.item}>{value.item}</option>
                                    } else if (!value?.use && value?.price) {
                                        return <option key={value.item} value={value.item}>{value.item}</option>
                                    }
                                    return null;
                                })}
                            </> : ''}
                        </select>
                        <label htmlFor={`item${inputs?.[0]?.item + type}`}>{multi ? 'Name' : "Model Name"}</label>
                    </div>

                    {multi && <div className="nor-input-div">
                        <select id={`brand${brandInput?.[0]?.brand + type}`} name="brand" required onChange={handleChange} >
                            <option value={''}>Choose...</option>
                            {brandInput?.[0] ? <>
                                {brandInput.map((value) => {
                                    return <option key={value.brand} value={value.brand}>{value.brand}</option>
                                })}
                            </> : ''}
                        </select>
                        <label htmlFor={`brand${brandInput?.[0]?.brand + type}`}>Brand</label>
                    </div>}


                    <div className="botton-div">
                        <button type='button' onClick={handleSubmit}>Add to List</button>
                    </div>
                </form>
            </div>
            {data?.[0] ?
                <div className="table-div">
                    <table>
                        {data.map((value, index) => {
                            return <tr>
                                <td>{index + 1} </td>
                                <td>{value.item}</td>
                                <td>{value?.brand || value?.price}</td>
                                <td><span onClick={() => removeList(value.item)}><BsTrash3 /></span></td>
                            </tr>
                        })}
                        {!multi &&
                            <tr>
                                <td></td>
                                <td className='total'>TOTAL</td>
                                <td><input type='number' className='total-input' value={total} onChange={handleChangeTotal} /></td>
                                <td></td>
                            </tr>
                        }
                    </table>
                </div>
                : <div className="table-div mob">
                    <p>Select data!</p>
                </div>}
        </div>
    )
}

export default DynamicListTable