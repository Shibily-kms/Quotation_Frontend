import React, { useEffect, useState } from 'react'
import './dynamic-list-table.scss'
import { createRandomId } from '../../assets/js/help-functions'
import { BsTrash3 } from 'react-icons/bs'

function DynamicListTable({ data, setData, input, multi }) {

    const [inputs, setInputs] = useState([])
    const [choose, setChoose] = useState({})
    const [brandInput, setBrandInput] = useState([])

    useEffect(() => {
        setInputs(input)
    }, [input])

    const handleChange = (e) => {

        let choosed = null

        if ([e.target.name] == 'item') {
            choosed = inputs.filter((obj) => obj.item === e.target.value)
            multi && setBrandInput(choosed[0].brands)
        }

        if (multi) {
            setChoose({ ...choose, [e.target.name]: e.target.value })
        } else {
            setChoose({
                item: e.target.value,
                price: choosed[0].price
            })
        }
    }

    const handleSubmit = () => {

        if (choose?.item) {
            setData([...data, { id: createRandomId(4), ...choose }])
            setInputs((prev) => prev.map((obj) => {
                if (obj.item === choose.item) {
                    return { ...obj, use: true }
                }
                return obj
            }))
            setChoose({})
            setBrandInput([])
        }
    }

    const removeList = (item) => {
        setData((state) => state.filter((value) => {
            return value.item !== item
        }))
        setInputs((prev) => prev.map((obj) => {

            if (obj.item === item) {
                return { ...obj, use: false }
            }
            return obj;
        }))
    }

    return (
        <div className='dynamic-table'>
            <div className="dynamic-form-div">
                <form action="">
                    <div className="nor-input-div">
                        <select id="item" name="item" required onChange={handleChange} >
                            <option value={null}>{inputs?.[0] ? 'Choose...' : 'Loading...'}</option>
                            {inputs?.[0] ? <>
                                {inputs.map((value) => {
                                    if (!value?.use) {
                                        return <option key={value.item} value={value.item}>{value.item}</option>
                                    }
                                })}
                            </> : ''}
                        </select>
                        <label htmlFor="item">{multi ? 'Name' : "Model Name"}</label>
                    </div>

                    {multi && <div className="nor-input-div">
                        <select id="brand" name="brand" required onChange={handleChange} >
                            <option value={null}>Choose...</option>
                            {brandInput?.[0] ? <>
                                {brandInput.map((value) => {
                                    return <option key={value.brand} value={value.brand}>{value.brand}</option>
                                })}
                            </> : ''}
                        </select>
                        <label htmlFor="brand">Brand</label>
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
                    </table>
                </div>
                : <div className="table-div mob">
                    <p>Select data!</p>
                </div>}
        </div>
    )
}

export default DynamicListTable