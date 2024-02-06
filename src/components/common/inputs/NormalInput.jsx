import React from 'react'
import './normal-input.scss'

function NormalInput({
    label = 'Label',
    name = 'name',
    id,
    type,
    onChangeFun,
    value = '',
    colorCode,
    placeholder,
    isRequired = true,
    min = null,
    max = null,
    step
}) {
    return (
        <div className='input-model-div normal-input'>
            <div>
                <input
                    type={type ? type : "text"}
                    name={name}
                    id={id || name}
                    value={value}
                    placeholder={placeholder}
                    required={isRequired}
                    onChange={onChangeFun}
                    min={min}
                    max={max}
                    step={step}
                />
                <label htmlFor={id || name}>{label}</label>
            </div>
        </div>
    )
}

export default NormalInput