import React, { useState } from 'react'
import './dynamic-text-list.scss'
import { createRandomId } from '../../assets/js/help-functions'
import { BsTrash3 } from 'react-icons/bs'

function DynamicTextList({ data, setData }) {

    const [text, setText] = useState('')

    const handleChange = (e) => {
        setText(e.target.value)

    }

    const handleSubmit = () => {
        if (text !== '') {
            setData([...data, { id: createRandomId(4), text }])
            setText('')
        }
    }

    const removeList = (id) => {
        setData((state) => state.filter((value) => {
            // eslint-disable-next-line
            return (value.id || value._id) != id
        }))
    }

    return (
        <div className='dynamic-text'>
            <div className="dynamic-form-div">
                <form action="">
                    <div className="dtl-input-div">
                        <textarea name="text" id="text" cols="30" rows="5" onChange={handleChange} value={text} required></textarea>
                        <label htmlFor="text">Enter text</label>
                    </div>
                    <div className="botton-div">
                        <button type='button' onClick={handleSubmit}>Add to List</button>
                    </div>
                </form>
            </div>
            {data?.[0] ?
                <div className="text-div">
                    <ol>
                        {data.map((value, index) => {
                            return <li key={index}>
                                <div className="list">
                                    <div>{value.text}</div>
                                    <div><span onClick={() => removeList(value.id || value._id)}><BsTrash3 /></span></div>
                                </div>
                            </li>
                        })}
                    </ol>
                </div>
                : <div className="text-div mob">
                    <p>Enter data!</p>
                </div>}
        </div>
    )
}

export default DynamicTextList